#!/bin/bash
rm -fr ./dist
mkdir ./dist
mkdir ./dist/icon
cp public/icon/*.png ./dist/icon/
cp public/manifest.json ./dist/manifest.json
cp public/favicon.ico ./dist/favicon.ico
cp sw.js ./dist/sw.js
