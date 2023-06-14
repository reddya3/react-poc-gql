import { connect } from 'react-redux'

import SecureApp from './SecureApp'

const mapStateToProps = ({ user: { loggedOut } }) => ({
  loggedOut
})

const ConnectedSecureApp = connect(mapStateToProps)(SecureApp)

export default ConnectedSecureApp
export { SecureStates } from './SecureApp'
