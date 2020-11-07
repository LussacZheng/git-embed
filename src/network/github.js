'use strict'

const { get } = require('../network/request')
const GitInfo = require('../store/git.info')

/**
 * @async
 * @returns {Boolean} success `true` or fail `false`
 */
async function updateGitInfo() {
  try {
    const data = await get(GitInfo.getAPI())
    let versionInfo = /^Git for Windows ([\d\.]+)(\((\d+)\))?$/i.exec(data.name)
    //      If data.name == "Git for Windows 2.29.2", version = "2.29.2"
    // else if data.name == "Git for Windows 2.29.2(2)", version = "2.29.2.2"
    let version = versionInfo[1] + (versionInfo[3] === undefined ? '' : '.' + versionInfo[3])
    const isReleaseResolvable = GitInfo.setVersion(version)
    if (isReleaseResolvable) {
      return updateFileInfo(data)
    }
  } catch (error) {
    console.error(error)
  }
  return false
}

/**
 * Extract download links from JSON Object
 * @param {JSON} data
 * @returns {Boolean} success `true` or fail `false`
 */
function updateFileInfo(data) {
  let allStatus = []
  const assets = data.assets
  assets.forEach((asset) => {
    if (/MinGit-[\d\.]+-32-bit.zip/i.test(asset.name)) {
      allStatus.push(
        GitInfo.setFileName(asset.name, 'win32'),
        GitInfo.setFileSize(asset.size, 'win32'),
        GitInfo.setDownloadUrl(asset.browser_download_url, 'win32'),
      )
    }
    if (/MinGit-[\d\.]+-64-bit.zip/i.test(asset.name)) {
      allStatus.push(
        GitInfo.setFileName(asset.name, 'win64'),
        GitInfo.setFileSize(asset.size, 'win64'),
        GitInfo.setDownloadUrl(asset.browser_download_url, 'win64'),
      )
    }
  })

  // As long as there is one false in `allStatus`, return `false`
  return allStatus.every((status) => status === true)
}

module.exports = { updateGitInfo }
