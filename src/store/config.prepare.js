'use strict'

const path = require('path')

const { BUILD } = require('./git.build')
const GitInfo = require('./git.info')

// Generate dynamic settings from './git.build.js' for `../prepare.js`

const __base = path.resolve(__dirname, '../../')
const _downloadDir = path.join(__base, BUILD._common.sourceDir)

/**
 * @description All absolute paths
 * @example
 * const pc = new PrepareConfig()
 * console.log(pc.sourceDir)
 * console.log(pc.archive.win32)
 */
class PrepareConfig {
  // dir "build/download/" to store the downloaded files
  get sourceDir() {
    return _downloadDir
  }

  // path to archive file,
  //   like "build/download/MinGit-2.26.2-32-bit.zip"
  get archive() {
    return {
      win32: path.join(_downloadDir, GitInfo.getFileName('win32')),
      win64: path.join(_downloadDir, GitInfo.getFileName('win64')),
    }
  }
}

module.exports = PrepareConfig
