#!/bin/bash
set -eux

function cleanup {
    killall node
}
trap cleanup EXIT

rm -rf ssr/

npm run generate-sitemap
npm run build
npm run server
npm run scrape

mv ssr/index.html build/