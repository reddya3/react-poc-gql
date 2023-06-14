import React from 'react'
import { render } from 'react-dom'

// Trigger compilation of scss, extracted by webpack into its own css file and injecte dinto output html
import './scss/main.scss'

import { AppRoot } from './modules/app'

render(<AppRoot />, document.querySelector('#root'))
