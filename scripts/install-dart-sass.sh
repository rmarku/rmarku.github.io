#!/usr/bin/env bash
# Fetch the same Dart Sass build CI uses into a gitignored .tools/ dir, so local
# and deployed CSS come from one compiler. Temporary: the theme is moving to
# plain CSS, after which this and the CI install step both go away.
set -euo pipefail

VERSION="1.102.0"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.tools"

case "$(uname -s)" in
  Darwin) OS="macos" ;;
  Linux)  OS="linux" ;;
  *) echo "unsupported OS: $(uname -s)" >&2; exit 1 ;;
esac
case "$(uname -m)" in
  arm64|aarch64) ARCH="arm64" ;;
  x86_64)        ARCH="x64" ;;
  *) echo "unsupported arch: $(uname -m)" >&2; exit 1 ;;
esac

if [ -x "$DEST/dart-sass/sass" ] && [ "$("$DEST/dart-sass/sass" --version)" = "$VERSION" ]; then
  echo "dart-sass $VERSION already present"
  exit 0
fi

mkdir -p "$DEST"
URL="https://github.com/sass/dart-sass/releases/download/${VERSION}/dart-sass-${VERSION}-${OS}-${ARCH}.tar.gz"
echo "fetching $URL"
curl -sSfL "$URL" | tar -xz -C "$DEST"
"$DEST/dart-sass/sass" --version
