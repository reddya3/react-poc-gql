import React from 'react'
import T from 'prop-types'

/**
 * An example component that fetches items from the bff-mock
 */
class Items extends React.Component {
  static propTypes = {
    items: T.arrayOf(
      T.shape({
        name: T.string.isRequired,
        dob: T.instanceOf(Date)
      })
    ).isRequired,
    loading: T.bool.isRequired,
    load: T.func.isRequired
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    return (
      <div>
        {!this.props.loading ? (
          <ul>
            {this.props.items.map(item => (
              <li key={item.name}>
                {item.name} - {item.value}
              </li>
            ))}
          </ul>
        ) : (
          <span id="loadingIndicator">Loading...</span>
        )}
      </div>
    )
  }
}

export default Items
