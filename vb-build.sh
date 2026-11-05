#!/bin/bash

npm install
bash scripts/with-legacy-openssl.sh npx webpack --config webpack.config.js --mode production
mkdir ./build
cp sw.js ./build/sw.js
cp -r ./public/* ./build/
cp -r ./dist/* ./build/
