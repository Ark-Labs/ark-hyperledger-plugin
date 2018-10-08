'use strict'

const container = require('@arkecosystem/core-container')
const logger = container.resolvePlugin('logger')

const listener = require('./listener')

/**
 * Hyperledger plugin
 * 
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'hyperledger-plugin',

  async register (container, options) {
    logger.info('Registering Hyperledger Plugin')

    listener.setUp(options)
  },
  async deregister (container, options) {
    logger.info('De-registering Hyperledger Plugin')
  }
}
