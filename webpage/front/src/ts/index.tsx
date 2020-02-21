//libraries
import * as Material from 'materialize-css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//react elements
import {ErrorBoundary} from './ErrorBoundary'
import {Day} from './Day'
import {SideBar} from './SideBar'
import { Overview } from './Overview'

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

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
            <div className="center col s12 l10">

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

                    <div className="card">
                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header hoverable row">
                                    <a href="#!" className="col s12 grey-text text-darken-2"><span className="new badge red lighten-1">2</span>Event Invitations</a>
                                </div>
                                <div className="collapsible-body">
                                    <div className="collection">
                                        <a href="#!" className="collection-item blue-text">Event 1</a>
                                        <a href="#!" className="collection-item blue-text">Event 2</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
                <ErrorBoundary>
                    <Overview/>
                </ErrorBoundary>
            </div>
            <div className="col s12 l2">
                <ErrorBoundary>
                    <SideBar/>
                </ErrorBoundary>
            </div>
        </div>,
        document.getElementById('react-root')
    )

    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {})
})
