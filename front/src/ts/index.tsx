import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {TestElement} from './TestElement'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <TestElement name="Variable"/>,
        document.getElementById('react-test')
    )
})
