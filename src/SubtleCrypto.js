/**
 * Local dependencies
 */
const algorithms = require('./algorithms')
const CryptoKey = require('./CryptoKey')
const CryptoKeyPair = require('./CryptoKeyPair')

/**
 * SubtleCrypto
 */
class SubtleCrypto {

  /**
   * encrypt
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {CryptoKey} key
   * @param {BufferSource} data
   *
   * @returns {Promise}
   */
  encrypt (algorithm, key, data) {
    return new Promise()
  }

  /**
   * decrypt
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {CryptoKey} key
   * @param {BufferSource} data
   *
   * @returns {Promise}
   */
  decrypt (algorithm, key, data) {
    return new Promise()
  }

  /**
   * sign
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {CryptoKey} key
   * @param {BufferSource} data
   *
   * @returns {Promise}
   */
  sign (algorithm, key, data) {
    data = data.slice()

    let normalizedAlgorithm = algorithms.normalize('sign', algorithm)

    if (normalizedAlgorithm instanceof Error) {
      return Promise.reject(normalizedAlgorithm)
    }

    return new Promise((resolve, reject) => {
      if (normalizedAlgorithm.name !== key.algorithm.name) {
        throw new InvalidAccessError()
      }

      if (!key.usages.includes('sign')) {
        throw new InvalidAccessError()
      }

      let result = normalizedAlgorithm.sign(key, data)

      resolve(result)
    })
  }

  /**
   * verify
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {CryptoKey} key
   * @param {BufferSource} signature
   * @param {BufferSource} data
   *
   * @returns {Promise}
   */
  verify (alg, key, signature, data) {
    // 2. Let signature be the result of cloning the data of the signature
    //    parameter passed to the verify method.
    signature = signature.slice()

    // 3. Let normalizedAlgorithm be the result of normalizing an
    //    algorithm, with alg set to algorithm and op set to "verify".
    let normalizedAlgorithm = algorithms.normalize('verify', alg)

    if (normalizedAlgorithm instanceof Error) {
      return Promise.reject(normalizedAlgorithm)
    }

    data = data.slice()

    return new Promise((resolve, reject) => {
      if (normalizedAlgorithm.name !== key.algorithm.name) {
        throw new InvalidAccessError()
      }

      if (!key.usages.includes('verify')) {
        throw new InvalidAccessError()
      }

      normalizedAlgorithm.verify()
    })
  }

  /**
   * digest
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {BufferSource} data
   *
   * @returns {Promise}
   */
  digest (algorithm, data) {
    return new Promise()
  }

  /**
   * generateKey
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {Boolean} extractable
   * @param {Array} keyUsages
   *
   * @returns {Promise}
   */
  generateKey (algorithm, extractable, keyUsages) {
    let normalizedAlgorithm = algorithms.normalize('generateKey', algorithm)

    if (normalizedAlgorithm instanceof Error) {
      return Promise.reject(normalizedAlgorithm)
    }

    return new Promise((resolve, reject) => {
      try {
        let result = normalizedAlgorithm.generateKey(algorithm, extractable, keyUsages)

        if (result instanceof CryptoKey) {
          let {type,usages} = result
          let restricted = (type === 'secret' || type === 'private')
          let emptyUsages = (!usages || usages.length === 0)

          if (restricted && emptyUsages) {
            throw new SyntaxError()
          }
        }

        if (result instanceof CryptoKeyPair) {
          let {privateKey:{usages}} = result

          if (!usages || usages.length === 0) {
            throw new SyntaxError()
          }
        }

        resolve(result)
      } catch (error) {
        return reject(error)
      }
    })
  }

  /**
   * deriveKey
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {CryptoKey} baseKey
   * @param {AlgorithmIdentifier} derivedKeyType
   * @param {Boolean} extractable
   * @param {Array} keyUsages
   * @returns {Promise}
   */
  deriveKey (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
    return new Promise()
  }

  /**
   * deriveBits
   *
   * @description
   *
   * @param {AlgorithmIdentifier} algorithm
   * @param {CryptoKey} baseKey
   * @param {number} length
   *
   * @returns {Promise}
   */
  deriveBits (algorithm, baseKey, length) {
    return new Promise()
  }

  /**
   * importKey
   *
   * @description
   *
   * @param {KeyFormat} format
   * @param {BufferSource|JWK} keyData
   * @param {AlgorithmIdentifier} algorithm
   * @param {Boolean} extractable
   * @param {Array} keyUsages
   *
   * @returns {Promise}
   */
  importKey (format, keyData, algorithm, extractable, keyUsages) {
    return new Promise()
  }

  /**
   * exportKey
   *
   * @description
   *
   * @param {KeyFormat} format
   * @param {CryptoKey} key
   *
   * @returns {Promise}
   */
  exportKey (format, key) {
    return new Promise()
  }

  /**
   * wrapKey
   *
   * @description
   *
   * @param {KeyFormat} format
   * @param {CryptoKey} key
   * @param {CryptoKey} wrappingKey
   * @param {AlgorithmIdentifier} wrapAlgorithm
   *
   * @returns {Promise}
   */
  wrapKey (format, key, wrappingKey, wrapAlgorithm) {
    return new Promise()
  }

  /**
   * unwrapKey
   *
   * @description
   *
   * @param {KeyFormat} format
   * @param {BufferSource} wrappedKey
   * @param {CryptoKey} unwrappingKey
   * @param {AlgorithmIdentifier} unwrapAlgorithm
   * @param {AlgorithmIdentifier} unwrappedKeyAlgorithm
   * @param {Boolean} extractable
   * @param {Array} keyUsages
   *
   * @returns {Promise}
   */
  unwrapKey (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, exractable, keyUsages) {
    return new Promise()
  }
}

/**
 * Export
 */
module.exports = SubtleCrypto