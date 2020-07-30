**| English | [简体中文](doc/README.cn.md) |**

# git-embed

![platform](https://img.shields.io/badge/platform-Windows-brightgreen?logo=windows)
![GitHub release](https://img.shields.io/github/v/release/LussacZheng/git-embed?include_prereleases&label=build)
[![Latest version of Git](https://img.shields.io/github/v/release/git-for-windows/git?label=git&color=f14e32&logo=git)](https://github.com/git-for-windows/git)
[![GitHub All Releases](https://img.shields.io/github/downloads/LussacZheng/git-embed/total?color=green&logo=github)](https://github.com/LussacZheng/git-embed/releases)

Build embeddable git for `git clone` and `git pull` on Windows.

## Usage

Download the latest re-packaged Git from [Releases Page](https://github.com/LussacZheng/git-embed/releases).

### Build type

#### mini

The package “mini” is the minimum set of programs to run `git clone` and `git pull` on Windows.

It does **NOT** support HTTPS. But you could replace `https://` with `git://` while running `git clone` :

```bash
# OK
git clone git://github.com/LussacZheng/git-embed.git

# It won't work
git clone https://github.com/LussacZheng/git-embed.git
```

#### ssl

The package “ssl”, with all the contents of "mini", contains some additional DLLs for HTTPS support.

```bash
# Just use as usual
git clone https://github.com/LussacZheng/git-embed.git
```

But the file size of "ssl" package (\~13 MB) is much larger than that of "mini" (\~5 MB).

### Getting Started

In the released assets, take the "ssl" package (win64) as an example:

```shell
$ tree
.
├── bin                          # Binaries and DLLs of git
│   ├── ca-bundle.crt                # SSL CA file
│   ├── git.exe
│   ├── git-remote-https.exe         # HTTPS support
│   ├── libbrotlicommon.dll
│   ├── libbrotlidec.dll
│   ├── libcrypto-1_1-x64.dll
│   ├── libcurl-4.dll
│   ├── libiconv-2.dll
│   ├── libidn2-0.dll
│   ├── libintl-8.dll
│   ├── libnghttp2-14.dll
│   ├── libpcre2-8-0.dll
│   ├── libssh2-1.dll
│   ├── libssl-1_1-x64.dll
│   ├── libssp-0.dll
│   ├── libunistring-2.dll
│   ├── libwinpthread-1.dll
│   └── zlib1.dll
├── doc                          # Documentation
│   ├── LICENSE                      # MIT license of this repository (git-embed)
│   └── README.cn.md                 # README in Simplified Chinese
├── add-git-to-path.cmd          # Just add `bin\` into the environment variable `%PATH%`
├── git.cmd                      #* Main entry point for `git` command
├── git-debug.cmd                # Run `git` with debug info being printed first (Not `git <command> --verbose`)
├── LICENSE.txt                  # GPLv2 license of MinGit
└── README.md                    # The file you are reading now
```

### Note

- Due to the syntax limitation of Windows batch files ( `.cmd` or `.bat` ), the absolute path of these files should not contain the special symbols, such as `()!@$;%^&`.  
  If it is unavoidable, please rewrite `git.cmd` in other programming languages. That is, complete the main functions of `git.cmd` with other languages, including setting environment variables and calling `bin/git.exe` .

## Developer Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/)
- (Optional) [Git](https://git-scm.com/)

### Build and distribute

Although the released packages is used for Windows, the building process can be carried out on Linux or macOS.

```bash
# Clone this repository or directly download the source code
git clone https://github.com/LussacZheng/git-embed.git
cd git-embed

# Install necessary dependencies
npm install

# Build and distribute
npm run dist
```

Find the re-packaged Git archives in `dist/` .

If you want to keep these packages, move them into `dist/released/` to prevent them from being deleted during the next build.

### MinGit

- What is MinGit?  
  [MinGit · git-for-windows/git Wiki · GitHub](https://github.com/git-for-windows/git/wiki/MinGit)

- What is the minimum set of programs to run `git clone` and `git pull` on Windows?  
  [doc/Minimum Set of Git](doc/Minimum-Set-of-Git.md)

## License

This program is distributed under the [MIT license](https://github.com/LussacZheng/git-embed/blob/master/LICENSE).

**Notice:** The scripts of this repository is used to re-package the released binaries of [MinGit](https://github.com/git-for-windows/git). MinGit is released under the [GPLv2 license](https://github.com/git-for-windows/git/blob/master/COPYING).

## TODO

The current project is just in a state where it can just simply work.

- The exception handling is supposed to be improved.
- Be able to build from a specified version of MinGit.
- Make it became a command-line program.
- ...
