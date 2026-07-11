#!/bin/bash

echo "Building Next.js static export..."

bun run build

if [ $? -ne 0 ]; then
  echo "Build failed."
  exit 1
fi

echo "Starting S3 deployment..."

aws s3 sync out/ s3://seanwade.com --delete \
  --exclude ".DS_Store" \
  --exclude "misc/*"

if [ $? -eq 0 ]; then
  echo "S3 deployment completed successfully."
else
  echo "S3 deployment failed."
  exit 1
fi

echo "Uploading Misc catalog page..."

aws s3 sync out/misc/ s3://seanwade.com/misc/ \
  --exclude ".registry/*"

if [ $? -ne 0 ]; then
  echo "Misc catalog upload failed."
  exit 1
fi

echo "Creating CloudFront invalidation..."

aws cloudfront create-invalidation --distribution-id E20VQTC0TY7DFQ --paths "/*"

if [ $? -eq 0 ]; then
  echo "CloudFront invalidation completed successfully."
else
  echo "CloudFront invalidation failed."
fi
