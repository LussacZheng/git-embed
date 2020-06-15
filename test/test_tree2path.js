'use strict'

const { tree2path } = require('../src/utils/helper')

// This is an example for the file structure from "PortableGit-2.26.2-32-bit.7z.exe"
const _git = {
  etc: {
    'post-install': ['06-windows-files.post', '13-copy-dlls.post'],
    __this: ['gitconfig', 'vimrc'],
  },
  mingw32: {
    bin: ['curl.exe', 'git-lfs.exe'],
    libexec: {
      'git-core': [
        'git.exe',
        'libiconv-2.dll',
        'libintl-8.dll',
        'libpcre2-8-0.dll',
        'libssp-0.dll',
        'libgcc_s_dw2-1.dll',
        'libwinpthread-1.dll',
        'zlib1.dll',
      ],
    },
    ssl: {
      certs: ['ca-bundle.crt'],
      __this: ['openssl.cnf', 'openssl.cnf.dist'],
    },
  },
  // If there are several files and dirs in one folder,
  // imagine that these files are all stored in a dir called "__this/" or "./".
  // So that the Array can always represent the innermost directory.
  __this: ['git-cmd.exe', 'LICENSE.txt'],
}

console.log(tree2path(_git))
console.log(tree2path(_git, 'file://'))

const { GIT } = require('../src/store/git.build')
console.log(1, tree2path(GIT.win32.mini))
console.log(2, tree2path(GIT.win32.ssl))
console.log(3, tree2path(GIT.win64.mini))
console.log(4, tree2path(GIT.win64.ssl))
