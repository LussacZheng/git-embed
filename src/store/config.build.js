'use strict'

const path = require('path')

const { GIT, BUILD } = require('./git.build')
const GitInfo = require('./git.info')
const { tree2path, template } = require('../utils/helper')

// Generate dynamic settings from './git.build.js' for `../build.js`

const __base = path.resolve(__dirname, '../../')
const _DIR = {
  sourceDir: path.join(__base, BUILD._common.sourceDir),
  staticDir: path.join(__base, BUILD._common.staticDir),
  docDir: path.join(__base, BUILD._common.docDir),
  extractDir: path.join(__base, BUILD._common.extractDir),
  distDir: path.join(__base, BUILD._common.distDir),
}
const _SP = {
  readme: path.join(__base, 'README.md'),
  license: path.join(__base, 'LICENSE'),
}

/**
 * @description
 * Absolute path: `archive` `temp*` `staticDir` `docDir` `specialList*` `target` ;
 * Relative path: `extractList*`
 * @example
 * const bc = new BuildConfig()
 * console.log(bc.win32.mini.archive)
 * console.log(bc.win64.ssl.target)
 */
class BuildConfig {
  get win32() {
    return {
      mini: {
        // path to archive file, like "build/download/MinGit-2.26.2-32-bit.zip".
        archive: path.join(_DIR.sourceDir, GitInfo.getFileName('win32')),
        // dir to store the files that will be re-packaged,
        //   like "build/temp/win32-mini/".
        temp: path.join(_DIR.extractDir, BUILD.win32.mini.temp), // also $tempRoot
        // dir to store the extracted binaries,
        //   like "build/temp/win32-mini/bin/".
        tempBin: path.join(_DIR.extractDir, BUILD.win32.mini.tempBin),
        // dir to store the documentation,
        //   like "build/temp/win32-mini/doc/".
        tempDoc: path.join(_DIR.extractDir, BUILD.win32.mini.tempDoc),
        // a list of files which to be extracted from $archive.
        extractList2bin: tree2path(GIT.win32.mini),
        extractList2root: tree2path(GIT.win32._root),
        // dir "build/static/" to store the files that will be copied into $temp.
        staticDir: _DIR.staticDir,
        // dir "doc/" to store the files that will be copied into $tempDoc.
        docDir: _DIR.docDir,
        // define how to copy the special files, such as "README.md", "LICENSE".
        specialListFrom: [_SP.readme, _SP.license],
        specialListTo: [
          path.join(_DIR.extractDir, BUILD.win32.mini.temp),
          path.join(_DIR.extractDir, BUILD.win32.mini.tempDoc),
        ],
        // path to the re-packaged archive file that will be released,
        //   like "dist/git-embed_2.26.2_win32.mini.zip".
        target: path.join(
          _DIR.distDir,
          template(BUILD.win32.mini.release, { version: GitInfo.getVersion() }),
        ),
      },
      ssl: {
        archive: path.join(_DIR.sourceDir, GitInfo.getFileName('win32')),
        temp: path.join(_DIR.extractDir, BUILD.win32.ssl.temp),
        tempBin: path.join(_DIR.extractDir, BUILD.win32.ssl.tempBin),
        tempDoc: path.join(_DIR.extractDir, BUILD.win32.ssl.tempDoc),
        extractList2bin: tree2path(GIT.win32.ssl),
        extractList2root: tree2path(GIT.win32._root),
        staticDir: _DIR.staticDir,
        docDir: _DIR.docDir,
        specialListFrom: [_SP.readme, _SP.license],
        specialListTo: [
          path.join(_DIR.extractDir, BUILD.win32.ssl.temp),
          path.join(_DIR.extractDir, BUILD.win32.ssl.tempDoc),
        ],
        target: path.join(
          _DIR.distDir,
          template(BUILD.win32.ssl.release, { version: GitInfo.getVersion() }),
        ),
      },
    }
  }

  get win64() {
    return {
      mini: {
        archive: path.join(_DIR.sourceDir, GitInfo.getFileName('win64')),
        temp: path.join(_DIR.extractDir, BUILD.win64.mini.temp),
        tempBin: path.join(_DIR.extractDir, BUILD.win64.mini.tempBin),
        tempDoc: path.join(_DIR.extractDir, BUILD.win64.mini.tempDoc),
        extractList2bin: tree2path(GIT.win64.mini),
        extractList2root: tree2path(GIT.win64._root),
        staticDir: _DIR.staticDir,
        docDir: _DIR.docDir,
        specialListFrom: [_SP.readme, _SP.license],
        specialListTo: [
          path.join(_DIR.extractDir, BUILD.win64.mini.temp),
          path.join(_DIR.extractDir, BUILD.win64.mini.tempDoc),
        ],
        target: path.join(
          _DIR.distDir,
          template(BUILD.win64.mini.release, { version: GitInfo.getVersion() }),
        ),
      },
      ssl: {
        archive: path.join(_DIR.sourceDir, GitInfo.getFileName('win64')),
        temp: path.join(_DIR.extractDir, BUILD.win64.ssl.temp),
        tempBin: path.join(_DIR.extractDir, BUILD.win64.ssl.tempBin),
        tempDoc: path.join(_DIR.extractDir, BUILD.win64.ssl.tempDoc),
        extractList2bin: tree2path(GIT.win64.ssl),
        extractList2root: tree2path(GIT.win64._root),
        staticDir: _DIR.staticDir,
        docDir: _DIR.docDir,
        specialListFrom: [_SP.readme, _SP.license],
        specialListTo: [
          path.join(_DIR.extractDir, BUILD.win64.ssl.temp),
          path.join(_DIR.extractDir, BUILD.win64.ssl.tempDoc),
        ],
        target: path.join(
          _DIR.distDir,
          template(BUILD.win64.ssl.release, { version: GitInfo.getVersion() }),
        ),
      },
    }
  }
}

module.exports = BuildConfig
