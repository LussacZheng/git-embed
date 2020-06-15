'use strict'

const fs = require('fs')
const path = require('path')

const fse = require('fs-extra')

/**
 * @param {String} filePath Use absolute path!
 * @param {Number} fileSize size in bytes
 * @returns {Boolean}
 */
function isDownloaded(filePath, fileSize) {
  const isExisting = fs.existsSync(filePath)
  if (isExisting) {
    const isSameSize = fs.statSync(filePath).size === fileSize ? true : false
    if (isSameSize) {
      return true
    }
  }
  return false
}

/**
 * Ensures that the directory exists.
 * If the directory structure does not exist, it is created.
 * @async
 * @param {String} dirPath Use absolute path!
 * @description Just a wrapper for `fs-extra.ensureDir`
 */
async function ensureDir(dirPath) {
  // if (!fs.existsSync(dirPath)) {
  //   fs.mkdirSync(dirPath, { recursive: true })
  // }
  try {
    await fse.ensureDir(dirPath)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Ensures that a directory is empty.
 * Deletes directory contents if the directory is not empty.
 * If the directory does not exist, it is created.
 * The directory itself is not deleted.
 * @async
 * @param {String} dirPath Use absolute path!
 * @description Just a wrapper for `fs-extra.emptyDir`
 */
async function emptyDir(dirPath) {
  try {
    await fse.emptyDir(dirPath)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Removes a file or directory. The directory can have contents.
 * If the path does not exist, silently does nothing.
 * @async
 * @param {String} path Use absolute path!
 * @description Just a wrapper for `fs-extra.remove`
 */
async function remove(path) {
  try {
    await fse.remove(path)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Copy everything inside of this directory,
 * not the entire directory itself.
 * (but copy the empty folders inside this directory)
 * @async
 * @param {String} sourceDir
 * @param {String} destDir
 * @description Just a wrapper for `fs-extra.copy`
 */
async function copy(sourceDir, destDir) {
  try {
    await fse.copy(sourceDir, destDir)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Copy a single file to the target directory.
 * If the directory does not exist, it is created.
 * If `newFilename` is given, rename that file.
 * @async
 * @param {String} filePath
 * @param {String} destDir
 * @param {String} newFilename
 */
async function copyFile(filePath, destDir, newFilename = undefined) {
  try {
    const filename = newFilename || path.basename(filePath)
    await fse.copy(filePath, path.join(destDir, filename))
  } catch (err) {
    console.error(err)
  }
}

module.exports = { isDownloaded, ensureDir, emptyDir, remove, copy, copyFile }
