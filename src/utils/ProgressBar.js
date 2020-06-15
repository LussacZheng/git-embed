'use strict'

const cliProgress = require('cli-progress')

/**
 * @class
 */
class ProgressBar {
  constructor() {
    this.bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  }

  /**
   * @param {Number} totalValue
   * @param {Number} startValue
   */
  start(totalValue = 100, startValue = 0) {
    this.bar.start(totalValue, startValue)
  }

  /**
   * @param {Number} current
   */
  update(current) {
    this.bar.update(current)
  }

  stop() {
    this.bar.stop()
  }
}

/**
 * Style of the decompressing progress bar:
 *
 * `    MinGit-2.26.2-64-bit.zip | 50% [=========>          ]`
 * @param {String} filename
 */
function getDecompressBar(filename) {
  const bar = new cliProgress.SingleBar({
    format: `    ${filename} | {percentage}% [{bar}]`,
    barCompleteChar: '=',
    barIncompleteChar: ' ',
    barsize: 30,
    hideCursor: true,
    autopadding: true,
  })
  return bar
}

/**
 * Style of the downloading progress bar: (wget-style)
 *
 * `muTbIs.gif |  50% [=========>          ] 2.49/4.97MB  180.20KB/s  eta: 1m20s`
 * @param {String} filename
 */
function getDownloadBar(filename) {
  const bar = new cliProgress.SingleBar({
    format: `  ${filename} | {percentage}% [{bar}] {receivedSize}/{totalSize}{unit}  {speed}{speedUnit}/s  eta: {eta_formatted}`,
    barCompleteChar: '=',
    barIncompleteChar: ' ',
    barGlue: '>',
    // Since the "glue" character will increase the barsize, -1.
    barsize: 29,
    hideCursor: true,
    autopadding: true,
  })
  return bar
}

class DecompressProgressBar extends ProgressBar {
  /**
   * @param {String} filename
   */
  constructor(filename) {
    super()
    this.bar = getDecompressBar(filename)
  }
}

class DownloadProgressBar extends ProgressBar {
  /**
   * @param {String} filename
   */
  constructor(filename) {
    super()
    this.bar = getDownloadBar(filename)
  }

  /**
   * @param {Number} totalBytes such as `7654321`
   * @param {Array<String>} totalSizeWithUnit such as `[ '7.30', 'MB' ]`
   */
  start(totalBytes, totalSizeWithUnit) {
    this.bar.start(totalBytes, 0, {
      receivedSize: '0',
      totalSize: totalSizeWithUnit[0],
      unit: totalSizeWithUnit[1],
      speed: 'N/A',
      speedUnit: 'B',
    })
  }

  /**
   * @param {Number} receivedBytes such as `2345678`
   * @param {Array<String>} receivedSize such as `[ '2.24', 'MB' ]`
   * @param {Array<String>} speedWithUnit such as `[ '187', 'KB/s' ]`
   */
  update(receivedBytes, receivedSize, speedWithUnit) {
    this.bar.update(receivedBytes, {
      receivedSize: receivedSize,
      speed: speedWithUnit[0],
      speedUnit: speedWithUnit[1],
    })
  }
}

module.exports = { DecompressProgressBar, DownloadProgressBar }
