'use strict'

const { formatLocaleString } = require('../src/utils/helper')

// Current timestamp
const now = Date.now()
// UTC '2020-03-23T20:15:53Z' while '2020/03/24 04:15:53' in 'Asia/Shanghai'
const sometime = 1584994553000
// UTC '2020-12-29T16:30:30Z' while '2020/12/30 00:30:30' in 'Asia/Shanghai'
const hourCycleTest = 1609259430000
// Params for `Date.toLocaleString()`
const locales = {
  formatMatcher: 'best fit',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}

/**
 * Necessity test of 'locales' and 'hourCycle'
 * in utils/helper.formatLocaleString
 */
// No detailed params
let str1 = new Date(now).toLocaleString()
// With detailed params
let str2 = new Date(now).toLocaleString('default', Object.assign({}, locales, { hour12: false }))

console.log('toLocaleString():                 ×', str1)
console.log('toLocaleString(locales, options): √', str2)
console.log()

// hourCycle test
let str3 = new Date(hourCycleTest).toLocaleString(
  'default',
  Object.assign({}, locales, { timeZone: 'Asia/Shanghai', hour12: false }),
)
let str4 = new Date(hourCycleTest).toLocaleString(
  'default',
  Object.assign({}, locales, { timeZone: 'Asia/Shanghai', hourCycle: 'h23' }),
)

console.log('toLocaleString(locales/h24, options): ×', str3)
console.log('toLocaleString(locales/h23, options): √', str4)
console.log(`new Date(${str3}):`, new Date(str3))
console.log(`new Date(${str4}):`, new Date(str4 + ' UTC'))
console.log()

/**
 * Test of utils/helper.formatLocaleString
 */
console.log('utils/helper.formatLocaleString():')
console.log('2020-03-23T20:15:53Z:', formatLocaleString(sometime))
console.log('2020-12-29T16:30:30Z:', formatLocaleString(hourCycleTest))
console.log('now:                 ', formatLocaleString(now))
