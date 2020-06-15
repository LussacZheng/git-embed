'use strict'

const { prepare } = require('../src/prepare')
const { clean } = require('../src/clean')
const { build } = require('../src/build')
const { updateGitInfo } = require('../src/network/github')

async function tryToUpdate() {
  const status = await updateGitInfo()
  if (!status) {
    throw new Error('Network Error when accessing GitHub API!')
  }
}

async function test_prepare() {
  await prepare()
}

async function test_clean() {
  await tryToUpdate()
  await clean()
}

async function test_build() {
  await tryToUpdate()
  await build()
}

/**
 * Uncomment only one line at a time
 */
;(async () => {
  // await test_prepare()
  await test_clean()
  // await test_build()
})()
