//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//classes
import {ExampleClass} from './ExampleClass'

//react elements
import {TestElement} from './TestElement'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    //render react test element
    ReactDOM.render(
        <TestElement name={'React Element'}/>,
        document.getElementById('react-test')
    )

    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
