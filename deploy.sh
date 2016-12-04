#!/bin/bash

pip install --user awscli
aws s3 sync build s3://nycbrewerymap/ --delete
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id E3N8Q7PC3NRSYR --paths "/*"