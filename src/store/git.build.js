'use strict'

// Build Configuration

// Files to be extracted from 'MinGit-<version>-<arch>-bit.zip'
// See how this works in `test/test_tree2path.js`
const GIT = {
  win32: {
    // Files into "doc/"
    _root: {
      __this: ['LICENSE.txt'],
    },
    // Files into "bin/"
    mini: {
      // Use quote to distinguish a folder from a property
      mingw32: {
        bin: [
          'git.exe',
          'libiconv-2.dll',
          'libintl-8.dll',
          'libpcre2-8-0.dll',
          'libssp-0.dll',
          'zlib1.dll',
          'libgcc_s_dw2-1.dll',
          'libwinpthread-1.dll',
        ],
      },
    },
    ssl: {
      mingw32: {
        bin: [
          'git.exe',
          'libiconv-2.dll',
          'libintl-8.dll',
          'libpcre2-8-0.dll',
          'libssp-0.dll',
          'zlib1.dll',
          'libgcc_s_dw2-1.dll',
          'libwinpthread-1.dll',
          // The above files are the same as GIT.win32.mini
          'git-remote-http.exe',
          'git-remote-https.exe',
          'libcurl-4.dll',
          'libcrypto-1_1.dll',
          'libidn2-0.dll',
          'libunistring-2.dll',
          'libnghttp2-14.dll',
          'libssh2-1.dll',
          'libssl-1_1.dll',
          'libbrotlidec.dll',
          'libbrotlicommon.dll',
          'libzstd.dll',
        ],
        ssl: {
          certs: ['ca-bundle.crt'],
        },
      },
    },
  },
  win64: {
    _root: {
      __this: ['LICENSE.txt', 'README.portable'],
    },
    mini: {
      mingw64: {
        bin: [
          'git.exe',
          'libiconv-2.dll',
          'libintl-8.dll',
          'libpcre2-8-0.dll',
          'libssp-0.dll',
          'zlib1.dll',
        ],
      },
    },
    ssl: {
      mingw64: {
        bin: [
          'git.exe',
          'libiconv-2.dll',
          'libintl-8.dll',
          'libpcre2-8-0.dll',
          'libssp-0.dll',
          'zlib1.dll',
          // The above files are the same as GIT.win64.mini
          'git-remote-http.exe',
          'git-remote-https.exe',
          'libcurl-4.dll',
          'libwinpthread-1.dll',
          'libcrypto-1_1-x64.dll',
          'libidn2-0.dll',
          'libunistring-2.dll',
          'libnghttp2-14.dll',
          'libssh2-1.dll',
          'libssl-1_1-x64.dll',
          'libbrotlidec.dll',
          'libbrotlicommon.dll',
          'libzstd.dll',
        ],
        ssl: {
          certs: ['ca-bundle.crt'],
        },
      },
    },
  },
}

const BUILD = {
  _common: {
    sourceDir: 'build/download/',
    extractDir: 'build/temp/',
    staticDir: 'build/static/',
    docDir: 'doc/',
    distDir: 'dist/',
  },
  win32: {
    mini: {
      release: 'git-embed_${version}_win32.mini.zip',
      temp: 'win32-mini/',
      tempBin: 'win32-mini/bin/',
      tempDoc: 'win32-mini/doc/',
    },
    ssl: {
      release: 'git-embed_${version}_win32.ssl.zip',
      temp: 'win32-ssl/',
      tempBin: 'win32-ssl/bin/',
      tempDoc: 'win32-ssl/doc/',
    },
  },
  win64: {
    mini: {
      release: 'git-embed_${version}_win64.mini.zip',
      temp: 'win64-mini/',
      tempBin: 'win64-mini/bin/',
      tempDoc: 'win64-mini/doc/',
    },
    ssl: {
      release: 'git-embed_${version}_win64.ssl.zip',
      temp: 'win64-ssl/',
      tempBin: 'win64-ssl/bin/',
      tempDoc: 'win64-ssl/doc/',
    },
  },
}

module.exports = { GIT, BUILD }
