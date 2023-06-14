import { connect } from 'react-redux'

import Toolbar from './Toolbar'
import { logout } from '../../state/ducks/user/thunks'

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

const ConnectedToolbar = connect(null, mapDispatchToProps)(Toolbar)

export default ConnectedToolbar
