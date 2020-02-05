import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {TestElement} from './TestElement'
import {ExampleClass} from './ExampleClass'

/**
 * Renders the TestElement in the div with id="react-test"
 * @param name the name to be displayed
 */
const renderReact = function(name:string) : void {
    ReactDOM.render(
        <TestElement name={name}/>,
        document.getElementById('react-test')
    )
}

document.addEventListener('DOMContentLoaded', () => {
    renderReact('test');
})
