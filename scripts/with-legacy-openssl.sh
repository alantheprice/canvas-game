#!/bin/sh
# webpack 4 hashes modules with MD4, which Node 17+ rejects unless the legacy
# OpenSSL provider is enabled. Set the flag here so every build path works on
# modern Node without callers having to remember it.
NODE_OPTIONS="$NODE_OPTIONS --openssl-legacy-provider"
export NODE_OPTIONS
exec "$@"
