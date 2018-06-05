#!/usr/bin/env bash

node_modules/.bin/rimraf ./build

node_modules/.bin/babel -d ./build/server ./server --copy-files
node_modules/.bin/babel -d ./build/shared ./shared --copy-files
node_modules/.bin/babel -d ./build/static ./static --copy-files
node_modules/.bin/babel -d ./build/client ./client --copy-files

export RENDERING=server
export NODE_ENV=production
export TEST_CONTRACT_ADDR=0xB54AFFF5dB6c165548808A9ecfb234bA24bDCeEb
export TOKEN_CONTRACT_ADDR=0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE

node_modules/.bin/webpack -p --config server/configs/webpack.production.js
