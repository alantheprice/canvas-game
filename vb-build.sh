#!/bin/bash
npm install
npx webpack --config webpack.config.js --production
mkdir ./build
cp -r ./public/ ./build/
cp sw.js ./build/sw.js
cp -r ./dist/ ./build/
