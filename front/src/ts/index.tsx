//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//react elements
import {TimeSlot} from './TimeSlot'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    const cb = (slot:number, state:string) => {
        console.log(`slot number ${slot} is now in state ${state}`)
    }

    //render react test element
    ReactDOM.render(
        <TimeSlot slot={0} defaultState={'Unselected'} onChange={cb}/>,
        document.getElementById('react-test')
    )

    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
