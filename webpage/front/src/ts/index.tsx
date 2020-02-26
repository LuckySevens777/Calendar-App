//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//react elements
import {ErrorBoundary} from './ErrorBoundary'
import {Page} from './Page'
import {ApiCall} from './Call'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
		let call = new ApiCall("henry");
		call.signUp();

    let now = new Date()

    //render react test element
    ReactDOM.render(
        <div className="row">
            <ErrorBoundary>
                <Page/>
            </ErrorBoundary>
        </div>,
        document.getElementById('react-root')
    )

    //initialize material items

    Material.updateTextFields()
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
