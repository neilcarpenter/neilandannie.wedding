#!/usr/bin/env node

require('babel-register')({ extensions: [ '.js' ] })

require('./' + process.argv[2])
