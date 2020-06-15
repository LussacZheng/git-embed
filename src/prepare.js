'use strict'

const { isDownloaded } = require('./fs/fs.utils')
const { updateGitInfo } = require('./network/github')
const { download } = require('./network/download')
const PrepareConfig = require('./store/config.prepare')
const GitInfo = require('./store/git.info')
const Bytes = require('./utils/Bytes')

/**
 * @async
 */
async function prepare() {
  const status = await updateGitInfo()
  if (!status) {
    throw new Error('Network Error when accessing GitHub API!')
  }

  const pc = new PrepareConfig()

  console.log(`--- Start preparing...\n`)

  let index = 1

  for (const platform of GitInfo.getPlatforms()) {
    const url = GitInfo.getDownloadUrl(platform)

    console.log(index, `Downloading "${GitInfo.getFileName(platform)}" ...`)
    console.log(`  * ${url}`)

    const whetherToDownload = !isDownloaded(pc.archive[platform], GitInfo.getFileSize(platform))

    if (whetherToDownload) {
      await download(url, pc.sourceDir)
    } else {
      const filename = GitInfo.getFileName(platform)
      const size = Bytes.formatBytes(GitInfo.getFileSize(platform))
      console.log(`  * "${filename}" has been downloaded. [${size[0]} ${size[1]}]`)
    }

    console.log()
    index++
  }

  console.log(`--- All prepared.`)
}

module.exports = { prepare }
