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
            <TimeSlot slot={1} text="12:00am" defaultState={'Unselected'} onChange={cb}/>
            <TimeSlot slot={2} text="12:20am" defaultState={'Unselected'} onChange={cb}/>
            <TimeSlot slot={3} text="12:40am" defaultState={'Unselected'} onChange={cb}/>
            <TimeSlot slot={4} text="1:00pm" defaultState={'Not-Available'} onChange={cb}/>
        </ErrorBoundary>,
        document.getElementById('react-test')
    )

    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
