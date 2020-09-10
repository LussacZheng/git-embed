'use strict'

const { formatLocaleString } = require('../src/utils/helper')

// UTC '2020-03-23T20:15:53Z' while '2020/03/24 04:15:53' in 'Asia/Shanghai'
const sometime = 1584994553000
const now = Date.now()

console.log('formatLocaleString(sometime):', formatLocaleString(sometime))
console.log('formatLocaleString(now):     ', formatLocaleString(now))
console.log()

// No detailed params
let str1 = new Date(now).toLocaleString()
// With detailed params
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

console.log('toLocaleString():                ', str1)
console.log('toLocaleString(locales, options):', str2)
