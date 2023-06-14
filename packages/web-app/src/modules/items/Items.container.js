import { connect } from 'react-redux'

import { load } from '../../state/ducks/items'
import Items from './Items'

const mapStateToProps = ({ items }) => ({
  ...items
})

const mapDispatchToProps = dispatch => ({
  load: () => {
    dispatch(load())
  }
})

const ConnectedItems = connect(mapStateToProps, mapDispatchToProps)(Items)

ConnectedItems.propTypes = {}

export default ConnectedItems
