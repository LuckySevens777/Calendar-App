//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//react elements
import {ErrorBoundary} from './ErrorBoundary'
import {TimeSlot} from './TimeSlot'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    const cb = (slot:number, state:string) => {
        console.log(`slot number ${slot} is now in state ${state}`)
    }

    //render react test element
    ReactDOM.render(
        <ErrorBoundary>
            <TimeSlot slot={1} defaultState={'Unselected'} onChange={cb}/>
        </ErrorBoundary>,
        document.getElementById('react-test')
    )

    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
