#!/bin/bash
rm -rf out
pnpm build
find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.txt' -o -name '*.svg' \) \
    -exec /bin/sh -c 'brotli -q 11 -o "$1.br" "$1"' /bin/sh {} \;

find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.txt' -o -name '*.svg' \) \
    -exec /bin/sh -c 'gzip -v -f -9 -c "$1" > "$1.gz"' /bin/sh {} \;

find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.txt' -o -name '*.svg' \) \
    -exec /bin/sh -c 'zstd -v -f --ultra --long --adapt -22 "$1" -o "$1.zst"' /bin/sh {} \;

rsync -zvah --delete --progress out/ root@192.168.0.1:/srv/docker/caddy/site/www/
