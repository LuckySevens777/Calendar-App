//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//react elements
import {ErrorBoundary} from './ErrorBoundary'
import {Day} from './Day'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    let now = new Date()

    //render react test element
    ReactDOM.render(
        <div>
            <ErrorBoundary>
                <Day date={now} onChange={()=>{}}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Day date={new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)} onChange={()=>{}}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Day date={new Date(now.getFullYear(), now.getMonth(), now.getDate()+2)} onChange={()=>{}}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Day date={new Date(now.getFullYear(), now.getMonth(), now.getDate()+3)} onChange={()=>{}}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Day date={new Date(now.getFullYear(), now.getMonth(), now.getDate()+4)} onChange={()=>{}}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Day date={new Date(now.getFullYear(), now.getMonth(), now.getDate()+5)} onChange={()=>{}}/>
            </ErrorBoundary>
        </div>,
        document.getElementById('react-root')
    )

    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
