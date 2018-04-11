#!/usr/bin/env bash

node_modules/.bin/rimraf ./build

node_modules/.bin/babel -d ./build/server ./server --copy-files
node_modules/.bin/babel -d ./build/shared ./shared --copy-files
node_modules/.bin/babel -d ./build/static ./static --copy-files
node_modules/.bin/babel -d ./build/client ./client --copy-files

# don't use `webpack -p`
# https://github.com/webpack/webpack/issues/1385
NODE_ENV=production TEST_CONTRACT_ADDR=0x38ef42a42d009d1a4d8b9790e4b45a64efaa1174 TOKEN_CONTRACT_ADDR=0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE node_modules/.bin/webpack --config server/configs/webpack.production.js
