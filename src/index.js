'use strict'

const { prepare } = require('./prepare')
const { clean } = require('./clean')
const { build } = require('./build')

;(async () => {
  try {
    await prepare()

    console.log('\n')

    await clean()

    console.log('\n')

    await build()
  } catch (error) {
    console.error(error)
  }
})()
