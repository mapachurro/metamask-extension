const assert = require('assert')
const migration30 = require('../../../app/scripts/migrations/030')

describe('migration #30', () => {
  it('should set completedOnboarding to true if vault exists', done => {
    const oldStorage = {
      'meta': {},
      'data': {
        'PreferencesController': {
          'tokens': [{address: '0xa', symbol: 'A', decimals: 4}, {address: '0xb', symbol: 'B', decimals: 4}],
          'identities': {
            '0x6d14': {},
            '0x3695': {},
          },
        },
        'KeyringController': {
          'vault': {
            'data': 'test0',
            'iv': 'test1',
            'salt': 'test2',
          },
        },
      },
    }

    migration30.migrate(oldStorage)
      .then(newStorage => {
        assert.equal(newStorage.data.PreferencesController.completedOnboarding, true)
        done()
      })
      .catch(done)
  })

  it('should set completedOnboarding to false if vault does not exist', done => {
    const oldStorage = {
      'meta': {},
      'data': {
        'PreferencesController': {
          'tokens': [{address: '0xa', symbol: 'A', decimals: 4}, {address: '0xb', symbol: 'B', decimals: 4}],
          'identities': {
            '0x6d14': {},
            '0x3695': {},
          },
        },
        'KeyringController': {},
      },
    }

    migration30.migrate(oldStorage)
      .then(newStorage => {
        assert.equal(newStorage.data.PreferencesController.completedOnboarding, false)
        done()
      })
      .catch(done)
  })
})
