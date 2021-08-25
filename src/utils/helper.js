'use strict'

/**
 * Convert a tree-like Object to an one-dimensional Array of path-like String
 * @param {Object} treeObj See the example in `test/test_tree2path.js`
 * @param {String} prefix
 * @returns {Array<string>}
 */
function tree2path(treeObj, prefix = '') {
  let results = []
  const isInnermostDir = treeObj instanceof Array
  if (isInnermostDir) {
    return treeObj.map(file => prefix.replace('__this/', '') + file)
  }
  for (const dir in treeObj) {
    const saveCurrentPrefix = prefix
    prefix = prefix + dir + '/'
    tree2path(treeObj[dir], prefix).forEach(path => {
      results.push(path)
    })
    prefix = saveCurrentPrefix
  }
  return results
}

/**
 * @param {String} templateStr
 * Use `${KEY}` as placeholder, use `\${KEY}` if in `template literals`
 * @param {Object<string,string>} payload
 * Corresponding to `templateStr`, pass `{ KEY: 'VALUE' }`
 * @example
 * const templateStr = 'python.org/${str1}/${str2}/python-${str2}.exe'
 * const payload = { str1: 'ftp/python', str2: '3.8.2' }
 * let result = template(templateStr, payload)
 * result === 'python.org/ftp/python/3.8.2/python-3.8.2.exe'
 * @return {String}
 */
function template(templateStr, payload) {
  let computed = templateStr.replace(/\$\{(\w+)\}/gi, (match, key) => {
    return payload[key]
  })
  return computed
}

/**
 * @param {Number} timeStamp
 * @example
 * formatLocaleString(1584994553000) === '2020-03-24 04:15:53'
 * // or
 * console.log(formatLocaleString(Date.now()))
 */
function formatLocaleString(timeStamp) {
  // If I am at the timezone of 'Asia/Shanghai',
  // let the locale time is '2020/03/24 04:15:53'.
  // and the `timeStamp` is '1584994553000'
  // So UTC time '2020-03-23T20:15:53Z' now

  const localeStr = new Date(timeStamp).toLocaleString('default', {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    formatMatcher: 'best fit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // hour12: false,
    // https://github.com/moment/luxon/issues/675
    hourCycle: 'h23',
  })
  // now localeStr == '2020/03/24 04:15:53'
  //   If there is no params for `toLocaleString()`,
  //   localeStr will be '2020/3/24 上午4:15:53'

  // Since ISO string is alway formatted, like: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  // To get ISO string, we assume the locale time is just the UTC time.
  let str = new Date(localeStr + ' UTC').toISOString().substr(0, 19)
  // now str == '2020-03-24T04:15:53'

  return str.replace('T', ' ')
}

/**
 * @param {Number} startTime TimeStamp or millisecond
 * @param {Number} endTime TimeStamp or millisecond
 * @param {'auto'|'second'|'minute'|'hour'} preferred Formatted based / Largest allowed units
 * @param {Number} decimals Used for `seconds.toFixed(decimals)`
 * @returns {String} Formatted time string
 * @example
 * formatTotalTime(0,12345678) === '3h 25m 45.68s'
 * formatTotalTime(0,12345678, 'minute', 3) === '205m 45.678s'
 */
function formatTotalTime(startTime, endTime, preferred = 'auto', decimals = 2) {
  const dm = decimals < 0 ? 0 : decimals

  const time = Math.abs(endTime - startTime) / 1000
  let hour = Math.floor(time / 3600)
  let min = Math.floor((time % 3600) / 60)
  // sec is String while hour and min are Number.
  let sec = (time % 60).toFixed(dm)

  // carry, '1h 59m 59.999s' => '2h 0m 0s'
  if (sec.startsWith('60')) {
    min++
    sec = '0'
  }
  if (min === 60) {
    hour++
    min = 0
  }

  // console.log(hour, min, sec)

  if (preferred === 'auto') {
    if (hour === 0) {
      if (min === 0) {
        preferred = 'second'
      } else {
        preferred = 'minute'
      }
    } else {
      preferred = 'hour'
    }
  }

  switch (preferred) {
    case 'second':
      return time.toFixed(dm) + 's'
    case 'minute':
      return `${hour * 60 + min}m ${sec}s`
    case 'hour':
      return `${hour}h ${min}m ${sec}s`
    default:
      return time.toFixed(dm) + 's'
  }
}

/**
 * @param {*} message
 * @param {Number} whiteSpaces
 */
function printWithSpace(message, whiteSpaces = 2) {
  console.log(' '.repeat(whiteSpaces - 1), message)
}

module.exports = {
  tree2path,
  template,
  formatLocaleString,
  formatTotalTime,
  printWithSpace,
}
