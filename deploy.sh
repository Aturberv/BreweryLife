#!/bin/bash
set -eux

npm run generate-sitemap
npm run update-breweries
npm run build
# gzip swag
find build \( -iname '*.html' -o  -iname '*.css' -o -iname '*.js' -o -iname '*.json' -o -iname '*.xml' -o -iname '*.txt' -o -iname '*.ico' \-o -iname '*.eot' -o -iname '*.ttf' -o -iname '*.woff*' \)  -exec gzip -9 -n {} \; -exec mv {}.gz {} \;
pip install --user awscli
aws s3 sync build s3://nycbrewerymap/ --content-encoding 'gzip' --delete
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id E3N8Q7PC3NRSYR --paths "/*"