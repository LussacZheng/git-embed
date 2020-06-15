'use strict'

const { emptyDir, remove } = require('./fs/fs.utils')
const CleanConfig = require('./store/config.clean')
const GitInfo = require('./store/git.info')

/**
 * @async
 */
async function clean() {
  const cc = new CleanConfig()

  console.log(`--- Start cleaning...\n`)
  console.log(1, 'Emptying the temp directory:')
  console.log(`  * ${cc.tempDir}\n`)
  await emptyDir(cc.tempDir)

  console.log(2, `Removing the dist files of "${GitInfo.getVersion()}" ...`)

  for (const platform of GitInfo.getPlatforms()) {
    const buildTypes = cc.distFile[platform]
    for (const type in buildTypes) {
      const distFile = buildTypes[type]

      console.log(`  * ${distFile} `)
      await remove(distFile)
    }
  }

  console.log()
  console.log(`--- All cleaned.`)
}

module.exports = { clean }
