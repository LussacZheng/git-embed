'use strict'

const { formatTotalTime } = require('../src/utils/helper')

function printTotalTime(millisecond, preferred) {
  const str = formatTotalTime(0, millisecond, preferred)
  const time = millisecond
    .toString()
    .replace(/(\d{3})$/g, '.$1')
    .padStart(9)
  console.log(`${time}s in ${preferred.padEnd(7)}: ${str}`)
}

function printAllKindsOfTotalTime(millisecond) {
  const preferredList = ['auto', 'hour', 'minute', 'second']
  preferredList.forEach(p => {
    printTotalTime(millisecond, p)
  })
}

// General cases:
const timeList = [
  [12345678, 'hour'],
  [12345678, 'minute'],
  [12345678, 'second'],
  [12345678, 'auto'],
  [2345678, 'auto'],
  [75678, 'auto'],
  [45678, 'auto'],
]
timeList.forEach(t => {
  printTotalTime(t[0], t[1])
})

// Some special cases:
const specialTimeList = [10845678, 12599999, 14399999, 3599999, 1799999, 59999]
specialTimeList.forEach(t => {
  console.log('\n------------------------------')
  printAllKindsOfTotalTime(t)
  console.log()
  // -1000 to avoid the carry
  printAllKindsOfTotalTime(t - 1000)
  console.log('------------------------------')
})
