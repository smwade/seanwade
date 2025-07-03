#!/bin/bash

echo "Starting S3 deployment..."

# Sync current directory to S3 bucket, excluding unnecessary files and deleting old ones
aws s3 sync . s3://seanwade.com --delete \
  --exclude ".git/*" \
  --exclude ".DS_Store" \
  --exclude "*.swp"

if [ $? -eq 0 ]; then
  echo "S3 deployment completed successfully."
else
  echo "S3 deployment failed."
  exit 1
fi
