'use strict'

const { parse: parseUrl } = require('url')

const tunnel = require('tunnel')
const { getProxyForUrl } = require('proxy-from-env')

/**
 * Get a proxyAgent according to `process.env.HTTP(S)_PROXY`
 * @param {String} url
 * @returns {Agent}
 * @link https://github.com/sindresorhus/got/issues/1440
 *       https://github.com/koichik/node-tunnel/issues/20
 */
function getProxyAgent(url) {
  const proxyUrl = getProxyForUrl(url)

  if (proxyUrl === '') return null

  const proxyUrl_parsed = parseUrl(proxyUrl)
  const proxyUrl_protocol = proxyUrl_parsed.protocol.slice(0, -1)
  const url_protocol = parseUrl(url).protocol.slice(0, -1)

  // `tunneling` is like 'httpsOverHttp'
  const tunneling = `${url_protocol}Over${capitalizeFirstLetter(proxyUrl_protocol)}`
  const tunnelingAgent = tunnel[tunneling]({
    proxy: {
      host: proxyUrl_parsed.hostname,
      port: proxyUrl_parsed.port,
    },
  })
  return tunnelingAgent
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

module.exports = { getProxyAgent }
