'use strict'

const path = require('path')

const BuildConfig = require('./store/config.build')
const GitInfo = require('./store/git.info')
const decompress = require('./fs/decompress')
const compress = require('./fs/compress')
const { copy, copyFile } = require('./fs/fs.utils')

/**
 * @async
 */
async function build() {
  const bc = new BuildConfig()

  console.log(`--- Start building...\n`)

  let index = 1

  for (const platform of GitInfo.getPlatforms()) {
    const buildTypes = bc[platform]
    for (const type in buildTypes) {
      const config = buildTypes[type]
      const {
        archive,
        temp,
        tempBin,
        tempDoc,
        extractList2bin,
        extractList2root,
        staticDir,
        docDir,
        specialListFrom,
        specialListTo,
        target,
      } = config

      console.log(index, `Building "${path.basename(temp)}" ...`)

      console.log('  * Exacting the required executable files into: \n   ', tempBin)
      await decompress(archive, tempBin, extractList2bin)

      console.log('  * Exacting the required document files into: \n   ', temp)
      await decompress(archive, temp, extractList2root)

      console.log('  * Copying the static files from: \n   ', staticDir)
      await copy(staticDir, temp)

      console.log('  * Copying the documentation from: \n   ', docDir)
      await copy(docDir, tempDoc)

      console.log('  * Copying the special files:')
      for (let index = 0; index < specialListFrom.length; index++) {
        console.log(`    "${path.basename(specialListFrom[index])}" to ${specialListTo[index]}`)
        await copyFile(specialListFrom[index], specialListTo[index])
      }

      console.log('  * Packaging all the files into: \n   ', target)
      await compress(temp, target)

      console.log()
      index++
    }
  }

  console.log(`--- All built.`)
}

module.exports = { build }
