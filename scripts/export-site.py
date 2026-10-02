#!/usr/bin/env python3
"""Créer sur le Bureau un ZIP du site, sans Git ni fichiers de développement."""

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


def main():
    root = Path(__file__).resolve().parents[1]
    output = root.parent / "portfolio-site.zip"
    files = list(root.glob("*.html"))
    for directory in ("cs", "js", "img", "cv", "fonts", "icons"):
        files.extend(
            path for path in (root / directory).rglob("*")
            if path.is_file() and not any(
                part.startswith(".") for part in path.relative_to(root).parts
            )
        )

    with ZipFile(output, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
        for path in sorted(files):
            archive.write(path, path.relative_to(root).as_posix())

    size = sum(path.stat().st_size for path in files)
    print(f"Site : {size / 1_000_000:.2f} Mo ({len(files)} fichiers)")
    print(f"ZIP : {output.stat().st_size / 1_000_000:.2f} Mo — {output}")


if __name__ == "__main__":
    main()
