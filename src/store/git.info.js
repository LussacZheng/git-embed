'use strict'

// Set the default info in case network error
const _git_info = {
  _api: 'https://api.github.com/repos/git-for-windows/git/releases/latest',
  version: '2.29.0',
  file: {
    win32: {
      name: 'MinGit-2.29.0-32-bit.zip',
      size: 23102913,
      url:
        'https://github.com/git-for-windows/git/releases/download/v2.29.0.windows.1/MinGit-2.29.0-32-bit.zip',
    },
    win64: {
      name: 'MinGit-2.29.0-64-bit.zip',
      size: 26323704,
      url:
        'https://github.com/git-for-windows/git/releases/download/v2.29.0.windows.1/MinGit-2.29.0-64-bit.zip',
    },
  },
}

class GitInfo {
  /**
   * @returns {String} url of api for 'git-for-windows/git'
   */
  static getAPI() {
    return _git_info._api
  }

  /**
   * @returns {Array<string>} `[ 'win32', 'win64' ]`
   */
  static getPlatforms() {
    return Object.keys(_git_info.file)
  }

  /**
   * @returns {String} version string of git
   */
  static getVersion() {
    return _git_info.version
  }

  /**0
   * @param {String} version
   * @returns {Boolean} success `true` or fail `false`
   */
  static setVersion(version) {
    if (/^[\d\.]{2,}$/.test(version)) {
      _git_info.version = version
      return true
    }
    return false
  }

  /**
   * @param {'win32'|'win64'} platform
   * @returns {Number} size in bytes,
   *  but `throw new TypeError()` for wrong `platform`
   */
  static getFileSize(platform) {
    if (platform in _git_info.file) {
      return _git_info.file[platform].size
    } else {
      throw new TypeError('Please check your input of "getFileSize()"')
    }
  }

  /**
   * @param {Number} bytes
   * @param {'win32'|'win64'} platform
   * @returns {Boolean} success `true` or fail `false`
   */
  static setFileSize(bytes, platform) {
    if (bytes > 0 && Number.isSafeInteger(bytes)) {
      if (platform in _git_info.file) {
        _git_info.file[platform].size = bytes
        return true
      }
    }
    return false
  }

  /**
   * @param {'win32'|'win64'} platform
   * @returns {String} 'MinGit-<version>-<32|64>-bit.zip' ,
   *  but `throw new TypeError()` for wrong `platform`
   */
  static getFileName(platform) {
    if (platform in _git_info.file) {
      return _git_info.file[platform].name
    } else {
      throw new TypeError('Please check your input of "getFileName()"')
    }
  }

  /**
   * @param {String} name
   * @param {'win32'|'win64'} platform
   * @returns {Boolean} success `true` or fail `false`
   */
  static setFileName(name, platform) {
    if (/^\w*-[\d\.]+-(32|64)-bit\.(zip|7z\.exe)$/i.test(name)) {
      if (platform in _git_info.file) {
        _git_info.file[platform].name = name
        return true
      }
    }
    return false
  }

  /**
   * @param {'win32'|'win64'} platform
   * @returns {String} 'MinGit-<version>-<32|64>-bit.zip' ,
   *  but `throw new TypeError()` for wrong `platform`
   */
  static getDownloadUrl(platform) {
    if (platform in _git_info.file) {
      return _git_info.file[platform].url
    } else {
      throw new TypeError('Please check your input of "getDownloadUrl()"')
    }
  }

  /**
   * @param {String} url
   * @param {'win32'|'win64'} platform
   * @returns {Boolean} success `true` or fail `false`
   */
  static setDownloadUrl(url, platform) {
    if (/^https?:\/\/.*\.(zip|7z\.exe)$/i.test(url)) {
      if (platform in _git_info.file) {
        _git_info.file[platform].url = url
        return true
      }
    }
    return false
  }

  /**
   * Hidden hook function used for "test/test_updateGitInfo.js"
   * A getter or setter for `_git_info`
   */
  static [Symbol('inner')](fakeInfo = undefined) {
    if (!fakeInfo) {
      return _git_info
    }
    for (const key in _git_info) {
      if (fakeInfo.hasOwnProperty(key)) {
        _git_info[key] = fakeInfo[key]
      }
    }
  }
}

module.exports = GitInfo
