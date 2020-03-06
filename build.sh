#!/usr/bin/env bash

BUILD_ENV=${BUILD_ENV:-development}

echo "Build Type: $BUILD_ENV"

rm -rf static
cp -Rv src static

if [[ "$BUILD_ENV" = "production" ]]
then
  api_url='https:\/\/www.pennyguess.com\/api'
else
  api_url='http:\/\/localhost:3000'
fi

for file in $(find static -name "*html")
do
  sed -i '' '
    s/{{API_URL}}/'$api_url'/g
  ' $file
done
