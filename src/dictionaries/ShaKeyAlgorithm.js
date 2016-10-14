/**
 * Module dependencies
 */
const crypto = require('crypto')
const KeyAlgorithm = require('./KeyAlgorithm')
const {TextEncoder, TextDecoder} = require('text-encoding')
const {OperationError} = require('../errors')

/**
 * ShaKeyAlgorithm
 */
class ShaKeyAlgorithm extends KeyAlgorithm {

  /**
   * dictionaries
   */
  static get dictionaries () {
    return [
      KeyAlgorithm,
      ShaKeyAlgorithm
    ]
  }

  /**
   * members
   */
  static get members () {
    return {}
  }

  /**
   * digest
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {BufferSource} data
   *
   * @returns {Uint8Array}
   */
  digest (algorithm, data) {
    let result
    let {name} = algorithm

    data = Buffer.from(data)

    if (name === 'SHA-1') {
      let hash = crypto.createHash('sha1')
      hash.update(data)
      result = hash.digest()

    } else if (name === 'SHA-256') {
      let hash = crypto.createHash('sha256')
      hash.update(data)
      result = hash.digest()

    } else if (name === 'SHA-384') {
      let hash = crypto.createHash('sha384')
      hash.update(data)
      result = hash.digest()

    } else if (name === 'SHA-512') {
      let hash = crypto.createHash('sha512')
      hash.update(data)
      result = hash.digest()

    } else {
      throw new OperationError(`${name} is not a supported algorithm`)
    }

    return Uint8Array.from(result).buffer
  }
}

/**
 * Export
 */
module.exports = ShaKeyAlgorithm
