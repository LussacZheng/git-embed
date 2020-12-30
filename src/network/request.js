'use strict'

const got = require('got')

const { getProxyAgent } = require('./proxy')

const _Options = {
  headers: {
    accept: 'application/json;charset=utf-8',
    'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  },
}

/**
 * @async
 * @param {String} url
 * @param {RequestInit} init
 */
async function get(url, init = _Options) {
  const proxyAgent = getProxyAgent(url)

  const response = await got(
    url,
    Object.assign({}, init, {
      agent: { http: proxyAgent, https: proxyAgent },
    }),
  )
  return gatherResponse(response)
}

/**
 * @param {Response} response
 */
function gatherResponse(response) {
  const { headers } = response
  const contentType = headers['content-type']
  if (contentType.includes('application/json')) {
    return JSON.parse(response.body)
    // } else if (contentType.includes('application/text')) {
    //   return response.body
    // } else if (contentType.includes('text/html')) {
    //   return response.body
  } else {
    return response.body
  }
}

module.exports = { get }
