'use strict'

const path = require('path')

const { BUILD } = require('./git.build')
const GitInfo = require('./git.info')
const { template } = require('../utils/helper')

// Generate dynamic settings from './git.build.js' for `../clean.js`

const __base = path.resolve(__dirname, '../../')
const _DIR = {
  extractDir: path.join(__base, BUILD._common.extractDir),
  distDir: path.join(__base, BUILD._common.distDir),
}

/**
 * @description All absolute paths
 * @example
 * const cc = new CleanConfig()
 * console.log(cc.tempDir)
 * console.log(cc.distFile.win32.mini)
 */
class CleanConfig {
  // dir to store the all the files that will be re-packaged,
  //   it is "build/temp/".
  get tempDir() {
    return _DIR.extractDir
  }

  // path to the re-packaged archive file that will be released,
  //   like "dist/git-embed_2.26.2_win32.mini.zip".
  get distFile() {
    return {
      win32: {
        // same as "./config.build.js" `new BuildConfig().win32.mini.target`
        mini: path.join(
          _DIR.distDir,
          template(BUILD.win32.mini.release, { version: GitInfo.getVersion() }),
        ),
        ssl: path.join(
          _DIR.distDir,
          template(BUILD.win32.ssl.release, { version: GitInfo.getVersion() }),
        ),
      },
      win64: {
        mini: path.join(
          _DIR.distDir,
          template(BUILD.win64.mini.release, { version: GitInfo.getVersion() }),
        ),
        ssl: path.join(
          _DIR.distDir,
          template(BUILD.win64.ssl.release, { version: GitInfo.getVersion() }),
        ),
      },
    }
  }
}

module.exports = CleanConfig
