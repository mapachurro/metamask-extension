// next version number
const version = 30
const clone = require('clone')

/*
* The purpose of this migration is to
*/
module.exports = {
  version,

  migrate: async function (originalVersionedData) {
    const versionedData = clone(originalVersionedData)
    versionedData.meta.version = version
    const state = versionedData.data
    const newState = transformState(state)
    versionedData.data = newState
    return versionedData
  },
}

function transformState (state) {
  const { KeyringController, PreferencesController } = state

  if (KeyringController && PreferencesController) {
    const { vault } = KeyringController
    PreferencesController.completedOnboarding = Boolean(vault)
  }

  return state
}
