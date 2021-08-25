'use strict'

const { updateGitInfo } = require('../src/network/github')
const GitInfo = require('../src/store/git.info')

async function test_updateGitInfo() {
  // No such function, because it has been hidden.
  // console.log(GitInfo.inner())

  // Get the hidden hook function form the Class "GitInfo"
  const methods = Reflect.ownKeys(GitInfo)
  const inner = methods.find(method => method.toString() === 'Symbol(inner)')

  const fake_git_info = {
    _api: 'https://api.github.com/repos/git-for-windows/git/releases/latest',
    version: 'v0.0.0',
    file: {
      win32: {
        name: 'FakeName-32.tar.gz',
        size: 3232,
        url: 'fake://fake-v0.0.0-32-bit.zip',
      },
      win64: {
        name: 'FakeName-64.tar.gz',
        size: 6464,
        url: 'fake://fake-v0.0.0-64-bit.zip',
      },
    },
  }
  GitInfo[inner](fake_git_info)

  console.log(1, 'fake_info =', GitInfo[inner]())

  const status = await updateGitInfo()
  if (!status) {
    console.error('Network Error when accessing GitHub API!')
    return
  }

  console.log(2, 'maybe_right_info =', GitInfo[inner]())
}

test_updateGitInfo()
