//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//react elements
import {ErrorBoundary} from './ErrorBoundary'
import {Day} from './Day'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    //render react test element
    ReactDOM.render(
        <ErrorBoundary>
            <Day date={new Date()} onChange={()=>{}}/>
            <Day date={new Date()} onChange={()=>{}}/>
            <Day date={new Date()} onChange={()=>{}}/>
            <Day date={new Date()} onChange={()=>{}}/>
            <Day date={new Date()} onChange={()=>{}}/>
            <Day date={new Date()} onChange={()=>{}}/>
        </ErrorBoundary>,
        document.getElementById('react-root')
    )

    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
