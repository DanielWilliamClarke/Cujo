#!/bin/bash

# Detect OS
OS="$(uname)"

echo "Detected OS: $OS"

if [[ "$OS" == "Darwin" ]]; then
    # macOS (BSD find & sed)
    echo "Running on macOS..."
    find src/types/contentful -type f -name "*.ts" -exec sed -i '' 's/Entry</EntrySkeletonType</g' {} \;
    find src/types/contentful -type f -name "*.ts" -exec sed -i '' 's/Entry,/EntrySkeletonType,/g' {} \;
elif [[ "$OS" == "Linux" || "$OS" == "WSL2" || "$OS" == "WSL" ]]; then
    # Linux (including WSL) - Uses GNU sed
    echo "Running on Linux/WSL..."
    find src/types/contentful -type f -name "*.ts" -exec sed -i 's/Entry</EntrySkeletonType</g' {} \;
    find src/types/contentful -type f -name "*.ts" -exec sed -i 's/Entry,/EntrySkeletonType,/g' {} \;
elif [[ "$OS" =~ "MINGW" || "$OS" =~ "MSYS" || "$OS" =~ "CYGWIN" ]]; then
    # Windows (Git Bash / MSYS2 / Cygwin) - Uses GNU sed
    echo "Running on Windows (Git Bash)..."
    find src/types/contentful -type f -name "*.ts" -exec sed -i 's/Entry</EntrySkeletonType</g' {} \;
    find src/types/contentful -type f -name "*.ts" -exec sed -i 's/Entry,/EntrySkeletonType,/g' {} \;
else
    echo "Unsupported OS: $OS"
    exit 1
fi

echo "Replacements complete!"
