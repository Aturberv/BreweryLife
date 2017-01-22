#!/bin/bash
set -eux

function cleanup {
    killall node
}
trap cleanup EXIT

export REACT_APP_CI=1
rm -rf ssr/

npm run generate-sitemap
npm run update-breweries
npm run build
npm run server
npm run scrape

mv ssr/index.html build/

npm run generate-serviceworker

# gzip swag
find build \( -iname '*.html' \
              -o  -iname '*.css' \
              -o -iname '*.js' \
              -o -iname '*.json' \
              -o -iname '*.xml' \
              -o -iname '*.txt' \
              -o -iname '*.ico' \
              -o -iname '*.eot' \
              -o -iname '*.ttf' \
              -o -iname '*.woff*' \
              -o -iname '*.svg' \)  -exec gzip -9 -n {} \; -exec mv {}.gz {} \;
find ssr/**/* -exec gzip -9 -n {} \; -exec mv {}.gz {} \;

pip install --user awscli
aws s3 sync build/ s3://nycbrewerymap/ --content-encoding 'gzip' --cache-control max-age=172800 --delete
aws s3 sync ssr/ s3://nycbrewerymap/ --content-type 'text/html' --content-encoding 'gzip' --cache-control max-age=172800
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id E3N8Q7PC3NRSYR --paths "/*"
