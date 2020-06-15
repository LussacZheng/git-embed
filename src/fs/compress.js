'use strict'

const path = require('path')
const fs = require('fs')

const compressing = require('compressing')
const pump = require('pump')

const { ensureDir } = require('./fs.utils')

/**
 * **Use absolute path!**
 * @async
 * @param {String} sourceDir
 * Every file or folder in this dir will be compressed.
 * (except the dir itself and empty folder)
 * @param {String} destFilePath
 * @returns {Promise<boolean>} success `true` or fail `false`
 */
async function compress(sourceDir, destFilePath) {
  if (!fs.existsSync(sourceDir)) {
    return false
  }
  const destDir = path.dirname(destFilePath)
  await ensureDir(destDir)

  const zipStream = new compressing.zip.Stream()

  const sourceList = fs.readdirSync(sourceDir)
  sourceList.forEach((source) => {
    const sourcePath = path.join(sourceDir, source)
    if (fs.existsSync(sourcePath)) {
      zipStream.addEntry(sourcePath)
    }
  })

  const destStream = fs.createWriteStream(destFilePath)

  pump(zipStream, destStream, (err) => {
    if (err) {
      console.error('Failed when compressing files.\n', err)
      return false
    } else {
      return true
    }
  })
}

// const Seven = require('node-7z')
// const sevenBin = require('7zip-bin')

// async function compress(sourceDir, destDir, archiveName) {
//   return new Promise((resolve, reject) => {
//     const myStream = Seven.add(path.join(destDir, archiveName), sourceDir + '/*.*', {
//       recursive: true,
//       $bin: sevenBin.path7za,
//     })

//     myStream.on('end', function () {
//       console.log(myStream.info.get('Archive size'))
//       resolve()
//     })

//     myStream.on('error', (err) => {
//       console.error(err.stderr)
//       reject()
//     })
//   })
// }

module.exports = compress
