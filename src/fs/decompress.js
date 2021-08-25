'use strict'

const path = require('path')
const fs = require('fs')

/**
 * The reason for using "node-7z" instead of other libraries:
 * 1. "7za" supports to decompress the `.7z` and `.7z.exe`
 *    archives, besides `.zip`.
 * 2. "node-7z" provides a convenient API to just extract
 *    certain files from an archive.
 */
const Seven = require('node-7z')
const sevenBin = require('7zip-bin')

const { ensureDir } = require('./fs.utils')
const { DecompressProgressBar } = require('../utils/ProgressBar')

/**
 * **Use absolute path for `filePath` & `destDir`!**
 * Use relative path for `requiredFiles`.
 * @async
 * @param {String} filePath
 * @param {String} destDir
 * @param {Array<string>} requiredFiles
 * @returns {Promise<boolean>} success `true` or fail `false`
 * @link https://github.com/quentinrossetti/node-7z/issues/64
 */
async function decompress(filePath, destDir, requiredFiles) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archive file ${filePath} doesn't exist.`)
  }
  await ensureDir(destDir)

  return new Promise((resolve, reject) => {
    const filename = path.basename(filePath)

    // https://github.com/quentinrossetti/node-7z#options
    let options = {
      $progress: true,
      $bin: sevenBin.path7za,
      $cherryPick: requiredFiles,
    }
    // If this file is a Self-Extracting Archive(sfx) archive,
    // add `sfx` into the `options`
    if (/\.7z\.exe$/.test(filename)) {
      options.sfx = ''
    }

    const myStream = Seven.extract(filePath, destDir, options)

    const bar = new DecompressProgressBar(filename)
    bar.start()

    myStream.on('progress', progress => {
      bar.update(progress.percent)
    })

    myStream.on('end', () => {
      bar.update(100)
      bar.stop()
      resolve(true)
    })

    myStream.on('error', err => {
      console.error(err.stderr)
      reject(false)
    })
  })
}

module.exports = decompress
