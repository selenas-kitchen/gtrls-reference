# -*- coding: utf-8 -*-
"""
Prepare Discord upload batches for GTRLS match-result images.

This script copies images from:
    C:\\Users\\thoma\\Dropbox\\GTRLS\\match_results\\media\\attachments_resized

into:
    C:\\Users\\thoma\\Dropbox\\GTRLS\\match_results\\media\\upload 7-3\\Upload x

Rules:
    - The digits before the first underscore are the series id.
    - Images with the same series id stay together whenever possible.
    - No upload folder should contain more than 20 images.
    - Series buckets should not be mixed:
        1-15
        23
        24-31
        36-49
        50-92, except 78
        78 and anything above 92

The script is safe to rerun. It only clears folders named "Upload x" inside
the destination folder, then rebuilds them and writes a manifest CSV.
"""

from __future__ import annotations

import csv
import re
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


SOURCE_DIR = Path(r"C:\Users\thoma\Dropbox\GTRLS\match_results\media\attachments_resized")
DEST_ROOT = Path(r"C:\Users\thoma\Dropbox\GTRLS\match_results\media\upload 7-3")
MANIFEST_PATH = DEST_ROOT / "upload_7_3_manifest.csv"

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}
MAX_IMAGES_PER_UPLOAD = 20
CLEAR_EXISTING_UPLOAD_FOLDERS = True
DRY_RUN = False


@dataclass(frozen=True)
class ImageFile:
    path: Path
    series_id: int
    bucket_name: str
    sort_key: tuple[int, int, str]


def parse_series_id(path: Path) -> int | None:
    match = re.match(r"^(\d+)_", path.name)
    if not match:
        return None
    return int(match.group(1))


def timestamp_sort_value(path: Path) -> int:
    match = re.match(r"^\d+_(\d+)", path.stem)
    if not match:
        return 0
    return int(match.group(1))


def bucket_for_series(series_id: int) -> str:
    if 1 <= series_id <= 15:
        return "01_series_1_15"
    if series_id == 23:
        return "02_series_23"
    if 24 <= series_id <= 31:
        return "03_series_24_31"
    if 36 <= series_id <= 49:
        return "04_series_36_49"
    if 50 <= series_id <= 92 and series_id != 78:
        return "05_series_50_92_excluding_78"
    if series_id == 78 or series_id > 92:
        return "06_series_78_and_93_plus"
    return "99_other_series"


def discover_images(source_dir: Path) -> list[ImageFile]:
    if not source_dir.exists():
        raise FileNotFoundError(f"Source folder does not exist: {source_dir}")

    images: list[ImageFile] = []
    skipped: list[Path] = []

    for path in source_dir.iterdir():
        if not path.is_file() or path.suffix.lower() not in IMAGE_EXTENSIONS:
            continue

        series_id = parse_series_id(path)
        if series_id is None:
            skipped.append(path)
            continue

        images.append(
            ImageFile(
                path=path,
                series_id=series_id,
                bucket_name=bucket_for_series(series_id),
                sort_key=(series_id, timestamp_sort_value(path), path.name.lower()),
            )
        )

    if skipped:
        print("Skipped files without a leading series id:")
        for path in skipped:
            print(f"  - {path.name}")

    images.sort(key=lambda item: (item.bucket_name, item.sort_key))
    return images


def grouped_by_series(images: Iterable[ImageFile]) -> list[tuple[str, int, list[ImageFile]]]:
    groups: dict[tuple[str, int], list[ImageFile]] = {}
    for image in images:
        groups.setdefault((image.bucket_name, image.series_id), []).append(image)

    ordered: list[tuple[str, int, list[ImageFile]]] = []
    for (bucket_name, series_id), files in sorted(groups.items()):
        ordered.append((bucket_name, series_id, sorted(files, key=lambda item: item.sort_key)))
    return ordered


def create_batches(images: list[ImageFile]) -> list[tuple[str, list[ImageFile]]]:
    batches: list[tuple[str, list[ImageFile]]] = []
    current_bucket = ""
    current_batch: list[ImageFile] = []

    def flush_current() -> None:
        nonlocal current_batch
        if current_batch:
            batches.append((current_bucket, current_batch))
            current_batch = []

    for bucket_name, series_id, files in grouped_by_series(images):
        if len(files) > MAX_IMAGES_PER_UPLOAD:
            flush_current()
            print(
                f"Warning: series {series_id} has {len(files)} images, which is more than "
                f"{MAX_IMAGES_PER_UPLOAD}. It must be split across multiple folders."
            )
            for index in range(0, len(files), MAX_IMAGES_PER_UPLOAD):
                current_bucket = bucket_name
                batches.append((bucket_name, files[index : index + MAX_IMAGES_PER_UPLOAD]))
            continue

        bucket_changed = bool(current_bucket and bucket_name != current_bucket)
        would_exceed_limit = len(current_batch) + len(files) > MAX_IMAGES_PER_UPLOAD

        if bucket_changed or would_exceed_limit:
            flush_current()

        current_bucket = bucket_name
        current_batch.extend(files)

    flush_current()
    return batches


def clear_existing_upload_folders(dest_root: Path) -> None:
    if not dest_root.exists():
        return

    for folder in dest_root.iterdir():
        if folder.is_dir() and re.match(r"^Upload \d+$", folder.name):
            print(f"Removing existing folder: {folder}")
            if not DRY_RUN:
                shutil.rmtree(folder)


def copy_batches(batches: list[tuple[str, list[ImageFile]]]) -> list[dict[str, object]]:
    DEST_ROOT.mkdir(parents=True, exist_ok=True)

    if CLEAR_EXISTING_UPLOAD_FOLDERS:
        clear_existing_upload_folders(DEST_ROOT)

    manifest_rows: list[dict[str, object]] = []

    for batch_index, (bucket_name, files) in enumerate(batches, start=1):
        upload_folder = DEST_ROOT / f"Upload {batch_index}"
        print(f"{upload_folder.name}: {len(files)} image(s) [{bucket_name}]")

        if not DRY_RUN:
            upload_folder.mkdir(parents=True, exist_ok=True)

        for image in files:
            destination = upload_folder / image.path.name
            print(f"  {image.path.name}")

            if not DRY_RUN:
                shutil.copy2(image.path, destination)

            manifest_rows.append(
                {
                    "upload_folder": upload_folder.name,
                    "bucket": bucket_name,
                    "series_id": image.series_id,
                    "source_file": str(image.path),
                    "destination_file": str(destination),
                }
            )

    return manifest_rows


def write_manifest(rows: list[dict[str, object]]) -> None:
    if not rows:
        return

    print(f"Writing manifest: {MANIFEST_PATH}")
    if DRY_RUN:
        return

    with MANIFEST_PATH.open("w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    images = discover_images(SOURCE_DIR)
    print(f"Found {len(images)} image(s).")

    batches = create_batches(images)
    print(f"Created {len(batches)} upload batch(es).")

    rows = copy_batches(batches)
    write_manifest(rows)

    print("\nDone.")
    print(f"Destination: {DEST_ROOT}")
    print(f"Manifest: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
