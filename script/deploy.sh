#!/bin/bash
set -e

# 필수 환경변수 확인
if ! [[ "$APP_ENV" == "test" || "$APP_ENV" == "prod" ]]; then
  echo "APP_ENV 는 'test' 또는 'prod' 으로 입력해주세요. (APP_ENV = '$APP_ENV')"
  exit 1
fi

# 백엔드 API URL 조회
BACKEND_API_URL=$(aws ssm get-parameter \
  --name "/code/delivery/$APP_ENV/backend/cloudfront/distribution/url" \
  --query "Parameter.Value" \
  --output text)

if [ -z "$BACKEND_API_URL" ]; then
  echo "Error: Backend URL 을 찾을 수 없습니다."
  exit 1
fi

# React APP 빌드 (with 백엔드 URL 환경변수)
VITE_BACKEND_API_URL=$BACKEND_API_URL npm run build

# 빌드 폴더 이름 변경
BUILD_OUTPUT_DIR=$(date +%Y-%m-%d_%H-%M-%S)
mv dist "$BUILD_OUTPUT_DIR"

# S3 업로드
S3_BUCKET=$(aws ssm get-parameter --name "/code/delivery/$APP_ENV/frontend/s3/bucket/name" --query "Parameter.Value" --output text)
echo "Uploading to S3 bucket: $S3_BUCKET..."
aws s3 cp "$BUILD_OUTPUT_DIR" "s3://$S3_BUCKET/$BUILD_OUTPUT_DIR" --recursive

# 빌드 폴더 삭제
rm -rf "$BUILD_OUTPUT_DIR"

echo "S3 업로드 완료"