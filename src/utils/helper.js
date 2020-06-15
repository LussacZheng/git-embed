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
    return treeObj.map((file) => prefix.replace('__this/', '') + file)
  }
  for (const dir in treeObj) {
    const saveCurrentPrefix = prefix
    prefix = prefix + dir + '/'
    tree2path(treeObj[dir], prefix).forEach((path) => {
      results.push(path)
    })
    prefix = saveCurrentPrefix
  }
  return results
}

/**
 * @param {String} templateStr
 * Use `${KEY}` as placeholder
 * @param {Object<string,string>} payload
 * Corresponding to `templateStr`, pass `{ KEY:'VALUE'}`
 * @example
 * const templateStr = 'python.org/${str1}/${str2}/python-${str2}.exe'
 * const payload = {str1: 'ftp/python',str2: '3.8.2'}
 * let result = template(templateStr, payload)
 * @return {String}
 * `python.org/ftp/python/3.8.2/python-3.8.2.exe`
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

  const localeStr = new Date(timeStamp).toLocaleString()
  // now localStr == '2020-3-24 04:15:53'

  // Assume the locale time is UTC time to get ISO string,
  // since ISO string is alway formatted, like: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  let str = new Date(localeStr + ' UTC').toISOString().substr(0, 19)
  // now str == '2020-03-24T04:15:53'

  return str.replace('T', ' ')
}

/**
 * @param {*} message
 * @param {Number} whiteSpaces
 */
function printWithSpace(message, whiteSpaces = 2) {
  console.log(' '.repeat(whiteSpaces - 1), message)
}

module.exports = { tree2path, template, formatLocaleString, printWithSpace }
