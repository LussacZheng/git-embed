# git-embed

![platform](https://img.shields.io/badge/platform-Windows-brightgreen?logo=windows)
![GitHub release](https://img.shields.io/github/v/release/LussacZheng/git-embed?include_prereleases&label=build)
[![Latest version of Git](https://img.shields.io/github/v/release/git-for-windows/git?label=git&color=f14e32&logo=git)](https://github.com/git-for-windows/git)
[![GitHub All Releases](https://img.shields.io/github/downloads/LussacZheng/git-embed/total?color=green&logo=github)](https://github.com/LussacZheng/git-embed/releases)

在 Windows 上构建嵌入式的 git 以用于 `git clone` 和 `git pull` 。

## 使用方法

从 [Releases 页面](https://github.com/LussacZheng/git-embed/releases) 下载最新发布的重新打包的 Git 。

### 构建类型

#### mini

程序包 "mini" 是在 Windows 上运行 `git clone` 和 `git pull` 所需的最小程序集。

但它**不**支持 HTTPS 。不过你可以在运行 `git clone` 时将 `https://` 替换为 `git://` ：

```bash
# 可行
git clone git://github.com/LussacZheng/git-embed.git

# 无效
git clone https://github.com/LussacZheng/git-embed.git
```

#### ssl

程序包 "ssl" 包含 "mini" 的所有内容，并含有一些额外的用于 HTTPS 支持的 DLL 文件。

```bash
# 照常使用
git clone https://github.com/LussacZheng/git-embed.git
```

但 "ssl" 包的文件大小 (\~16 MB) 会远大于 "mini" (\~5 MB) 。

### 开始使用

在 Release 文件中，以 "ssl" 程序包 (win64) 为例：

```shell
$ tree
.
├── bin                          # git 的二进制程序和 DLL 文件
│   ├── ca-bundle.crt                # SSL 证书
│   ├── git.exe
│   ├── git-remote-http.exe          # HTTP 支持
│   ├── git-remote-https.exe         # HTTPS 支持
│   ├── libbrotlicommon.dll
│   ├── libbrotlidec.dll
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
│   ├── libzstd.dll
│   └── zlib1.dll
├── doc                          # 文档
│   ├── LICENSE                      # 该代码仓库 (git-embed) 的 MIT 许可证
│   └── README.cn.md                 # 说明 (简体中文)
├── add-git-to-path.cmd          # 将 `bin/` 目录添加到环境变量 `%PATH%`
├── git.cmd                      #* `git` 命令的主入口点
├── git-debug.cmd                # 以先打印 Debug 信息的模式 运行 `git` (并非 `git <command> --verbose`)
├── LICENSE.txt                  # MinGit 的 GPLv2 许可证
└── README.md                    # 此文件
```

### 注意事项

- 由于 Windows 批处理 ( `.cmd` 、 `.bat` ) 的语法限制，这些文件的绝对路径中不能含有 `()!@$;%^&` 等特殊符号。  
  如不可避免，请使用其他编程语言重写 `git.cmd` ，即使用其他语言完成 `git.cmd` 的主要功能，如 设置环境变量 和 调用 `bin/git.exe` 等。

## 开发者指引

### 准备

- [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/)
- (可选) [Git](https://git-scm.com/)

### 构建和发布

尽管发行的软件包仅用于 Windows ，但是构建过程可以在 Linux 或 macOS 上进行。

```bash
# 克隆此代码仓库 或 直接下载源代码
git clone https://github.com/LussacZheng/git-embed.git
cd git-embed

# 安装必要的依赖项
npm install

# 构建和发布
npm run dist
```

重新打包后的 Git 程序包位于 `dist/` 目录下。

如需保留这些程序包，请将它们移动到 `dist/released/` 目录下，以防止其在下次构建时被删除。

### MinGit

- MinGit 是什么？  
  [MinGit · git-for-windows/git Wiki · GitHub](https://github.com/git-for-windows/git/wiki/MinGit)

- 在 Windows 上运行 `git clone` 和 `git pull` 所需的最小程序集是哪些？  
  [doc/Minimum Set of Git](Minimum-Set-of-Git.md)

## License

This program is distributed under the [MIT license](https://github.com/LussacZheng/git-embed/blob/master/LICENSE).

**Notice:** The scripts of this repository is used to re-package the released binaries of [MinGit](https://github.com/git-for-windows/git). MinGit is released under the [GPLv2 license](https://github.com/git-for-windows/git/blob/master/COPYING).

## TODO

当前项目只是处于勉强可以使用的状态。

- 应改进异常处理流程。
- 能够构建指定版本的 MinGit 。
- 重构为命令行程序(cli)。
- ...
