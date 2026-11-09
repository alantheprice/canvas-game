#!/bin/bash
rm -fr ./dist
mkdir ./dist
mkdir ./dist/icon
cp public/icon/*.png ./dist/icon/
cp public/manifest.json ./dist/manifest.json
# Copied so the service worker registration in src/index.ts still resolves on the hosted site
cp sw.js ./dist/sw.js
