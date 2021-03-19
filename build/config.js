'use strict'

const pkg = require('../package.json')

// Hardcoding here (and not reading from package.json) as the files are built
// before the version is updated in package.json
const version = process.env.VERSION || pkg.version
const mode = process.env.NODE_ENV

const banner = `/*!
  * vue-egret.js v${version}
  * Copyright (c) 2020-${new Date().getFullYear()} Hsuna
  * Released code under the ICU License.
  */`

module.exports = {
  name: 'VueEgret',
  banner,
  version,
  mode,
}
