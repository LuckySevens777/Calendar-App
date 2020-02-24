//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//react elements
import {ErrorBoundary} from './ErrorBoundary'
import {Page} from './Page'
import {call} from './Call'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
		call('/api/');

    let now = new Date()

    //render react test element
    ReactDOM.render(
        /*<div>
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
        </div>*/
        <div className="row">

            {/* <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="col s6">
                            <div className="switch">
                                <label>
                                    Off
                                    <input type="checkbox">
                                    <span className="lever"></span>
                                    On
                                </label>
                            </div>
                        </div>
                        <div className="col s6">
                            <a onclick="M.toast({html: 'Whatever you just did worked!'})" className="btn blue">Display Confirmation</a>
                        </div>

                    </div>
                </div>


                </div>
            </div> */}
            <ErrorBoundary>
                <Page/>
            </ErrorBoundary>
        </div>,
        document.getElementById('react-root')
    )

    //initialize material items

    Material.updateTextFields()
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
