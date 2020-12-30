'use strict'

const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const stream = require('stream')
const pipeline = promisify(stream.pipeline)

const got = require('got')

const { ensureDir } = require('../fs/fs.utils')
const { DownloadProgressBar } = require('../utils/ProgressBar')
const Bytes = require('../utils/Bytes')
const { formatLocaleString, formatTotalTime, printWithSpace } = require('../utils/helper')

/**
 * @async
 * @param {String} url
 * @param {String} destDir Use absolute path!
 */
async function download(url, destDir) {
  const filename = url.split('/').pop()
  const filePath = path.resolve(destDir, filename)

  const bar = new DownloadProgressBar(filename)
  let startTime = 0
  let totalBytes = 0
  let totalSize = []
  let receivedBytes = 0

  const myStream = got.stream(url)

  myStream.on('response', (response) => {
    const headers = response.headers
    // console.log(headers['last-modified'])

    startTime = Date.now()
    totalBytes = parseInt(headers['content-length'], 10)
    totalSize = Bytes.formatBytes(totalBytes)

    printWithSpace(formatLocaleString(startTime))

    bar.start(totalBytes, totalSize)
  })

  myStream.on('downloadProgress', (progress) => {
    // console.log(progress)
    let nowTime = Date.now()
    receivedBytes = progress.transferred
    let receivedSize = Bytes.formatBytesByUnit(progress.transferred, totalSize[1])
    let speed = Bytes.getSpeed(progress.transferred, startTime, nowTime)

    bar.update(receivedBytes, receivedSize, speed)
  })

  myStream.on('error', (err) => {
    bar.stop()
    throw new Error(err.message)
  })

  await ensureDir(destDir)
  const fileStream = fs.createWriteStream(filePath)

  await pipeline(myStream, fileStream)

  bar.stop()
  const endTime = Date.now()
  const averageSpeed = Bytes.getSpeed(totalBytes, startTime, endTime)
  const totalTime = formatTotalTime(startTime, endTime)
  printWithSpace(
    `${formatLocaleString(endTime)} (${averageSpeed[0]} ${
      averageSpeed[1]
    }/s) - '${filename}' saved [${receivedBytes}/${totalBytes}]  in ${totalTime}`,
  )
}

module.exports = { download }
