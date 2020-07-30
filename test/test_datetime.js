'use strict'

const { formatLocaleString } = require('../src/utils/helper')

const timeStamp = 1584994553000 // UTC '2020-03-23T20:15:53Z'
const now = Date.now()

console.log(formatLocaleString(formatLocaleString(timeStamp)))
console.log(formatLocaleString(now))

let str1 = new Date(now).toLocaleString()
let str2 = new Date(now).toLocaleString('default', {
  formatMatcher: 'best fit',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

console.log(str1)
console.log(str2)
