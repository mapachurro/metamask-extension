import { connect } from 'react-redux'
import {
    getCurrentNetwork,
    getSelectedToken,
    getSendTo,
    getSendToAccounts,
    getSendHexData,
} from '../../send.selectors.js'
import {
    getToDropdownOpen,
    getTokens,
    sendToIsInError,
} from './send-to-row.selectors.js'
import {
    updateSendTo,
} from '../../../../actions'
import {
  updateSendErrors,
  openToDropdown,
  closeToDropdown,
} from '../../../../ducks/send.duck'
import SendToRow from './send-to-row.component'

export default connect(mapStateToProps, mapDispatchToProps)(SendToRow)

function mapStateToProps (state) {
  return {
    hasHexData: Boolean(getSendHexData(state)),
    inError: sendToIsInError(state),
    network: getCurrentNetwork(state),
    selectedToken: getSelectedToken(state),
    to: getSendTo(state),
    toAccounts: getSendToAccounts(state),
    toDropdownOpen: getToDropdownOpen(state),
    tokens: getTokens(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeToDropdown: () => dispatch(closeToDropdown()),
    openToDropdown: () => dispatch(openToDropdown()),
    updateSendTo: (to, nickname) => dispatch(updateSendTo(to, nickname)),
    updateSendToError: (toErrorObject) => {
        dispatch(updateSendErrors(toErrorObject))
    },
  }
}
