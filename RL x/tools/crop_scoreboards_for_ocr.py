# -*- coding: utf-8 -*-
"""
Crop Rocket League screenshots to the center scoreboard area for OCR.

This avoids chat messages and other UI text around the edges of the screenshot.
It does not modify the source images.
"""

from pathlib import Path

from PIL import Image


SOURCE_DIR = Path(r"C:\Users\thoma\Dropbox\GTRLS\match_results\media\attachments_resized")
OUTPUT_DIR = Path(r"C:\Users\thoma\Downloads\rocket_league_scoreboard_crops")
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}


def scoreboard_box(width: int, height: int) -> tuple[int, int, int, int]:
    """Return a central crop box that keeps the full scoreboard."""
    left = int(width * 0.25)
    right = int(width * 0.82)
    top = int(height * 0.13)
    bottom = int(height * 0.66)
    return left, top, right, bottom


def main() -> None:
    if not SOURCE_DIR.exists():
        raise FileNotFoundError(f"Source folder does not exist: {SOURCE_DIR}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    files = sorted(
        path for path in SOURCE_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )

    for path in files:
        with Image.open(path) as image:
            cropped = image.crop(scoreboard_box(*image.size))
            cropped.save(OUTPUT_DIR / path.name)

    print(f"Cropped {len(files)} image(s) into {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
