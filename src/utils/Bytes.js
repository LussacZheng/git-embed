'use strict'

/**
 * @param {Number} bytes
 * @returns {Array<string>}
 * @example
 * formatBytes(2345678) === [ '2.24', 'MB' ]
 */
function formatBytes(bytes, decimals = 2) {
  const dm = decimals < 0 ? 0 : decimals
  let sizeWithUnit = [bytes, 'B']
  if (bytes < 1024) {
    sizeWithUnit[0] = bytes.toString()
  } else if (bytes < 1048576) {
    sizeWithUnit[0] = (bytes / 1024).toFixed(dm)
    sizeWithUnit[1] = 'KB'
  } else if (bytes < 1073741824) {
    sizeWithUnit[0] = (bytes / 1048576).toFixed(dm)
    sizeWithUnit[1] = 'MB'
  } else {
    sizeWithUnit[0] = (bytes / 1073741824).toFixed(dm)
    sizeWithUnit[1] = 'GB'
  }
  // sizeWithUnit[0] = parseFloat(sizeWithUnit[0])
  return sizeWithUnit
}

/**
 * @param {Number} bytes
 * @param {String} unit
 * @returns {String}
 * @example
 * formatBytesByUnit(2345678, 'KB') === '2290.70'
 */
function formatBytesByUnit(bytes, unit = 'MB', decimals = 2) {
  const dm = decimals < 0 ? 0 : decimals
  let size = ''
  unit = unit.toLowerCase()
  switch (unit) {
    case 'b':
      size = bytes.toString()
      break
    case 'kb':
      size = (bytes / 1024).toFixed(dm)
      break
    case 'mb':
      size = (bytes / (1024 * 1024)).toFixed(dm)
      break
    case 'gb':
      size = (bytes / (1024 * 1024 * 1024)).toFixed(dm)
      break
    default:
      size = bytes.toString()
      break
  }
  return size
}

/**
 * @param {Number} bytes
 * @param {Number} startTime TimeStamp or millisecond
 * @param {Number} endTime TimeStamp or millisecond
 * @returns {Array<string>}
 * @example
 * getSpeed(2345678,2000,8000) === [ '381.78', 'KB' ]
 */
function getSpeed(bytes, startTime, endTime, decimals = 2) {
  const time = Math.abs(endTime - startTime) / 1000
  const speedWithUnit = formatBytes(bytes / time, decimals)
  return speedWithUnit
}

const Bytes = {
  formatBytes,
  formatBytesByUnit,
  getSpeed,
}

module.exports = Bytes
