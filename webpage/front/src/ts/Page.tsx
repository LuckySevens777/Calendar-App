import * as Material from 'materialize-css'
import * as React from 'react'

import {EVENTS} from './improvisedValues'

import {Event} from './Event'

import {CreateEvent} from './CreateEvent'
import {ErrorBoundary} from './ErrorBoundary'
import {EventsView} from './EventsView'
import {SideBar} from './SideBar'
import {SignIn} from './SignIn'

interface PageProps {}

interface PageState {
    mode:string,
    username:string,
    events:Event[]
}

export class Page extends React.Component<PageProps, PageState> {
    public readonly state:PageState

    /**
     * Constructs a Page
     * @param props the object's properties
     */
    public constructor(props:PageProps) {
        super(props)

        //temporary for constructor
        let state:PageState = {
            mode: undefined,
            username: '',
            events: EVENTS
        }

        state.mode = 'signin'

        this.state = state
    }

    /**
     * Changes the main page view to a new mode
     * @param state the state to change to
     */
    private changeState(state:string) {
        switch(state) {
            //valid states
            case 'events':
            case 'create':
            case 'signin':
                this.setState({mode: state})
            //invalid
            default:
        }
    }

    /**
     * signs a user out
     */
    private signOut() {
        //////////////////////////
        // SIGN OUT FUNCTION
        /////////////////////////
        this.setState({username: ''})
        Material.toast({
            html: `signed out`,
            classes: 'green'
        })
        this.setState({mode: 'signin'})
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        if(this.state.mode === 'signin') {
            return (
                <div>
                    <div className="col s12 l10">
                        <ErrorBoundary>
                            <SignIn onSignin={(username => {
                                this.setState({username: username})
                                ///////////////////////////////////////
                                // SIGN IN FUNCTIONALITY
                                ///////////////////////////////////////
                                Material.toast({
                                    html: `${username} signed in`,
                                    classes: 'green'
                                })
                                this.changeState('events')
                            }).bind(this)} onSignup={(username => {
                                this.setState({username: username})
                                ///////////////////////////////////////
                                // SIGN UP FUNCTIONALITY
                                ///////////////////////////////////////
                                let signInSuccess = true

                                if(signInSuccess)
                                    //if sign in was a success, show green confirmation
                                    Material.toast({
                                        html: `${username} signed up`,
                                        classes: 'green'
                                    })
                                else
                                    //if sign in fails, show red warning
                                    Material.toast({
                                        html: `${username} already exists!`,
                                        classes: 'red'
                                    })
                                this.changeState('events')
                            }).bind(this)}/>
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar username={this.state.username} signOut={this.signOut.bind(this)} stateChange={this.changeState.bind(this)}/>
                        </ErrorBoundary>
                    </div>
                </div>
            )
        }
        //events view mode
        if(this.state.mode === 'events') {
            return (
                <div>
                    <div className="col s12 l10">
                        <ErrorBoundary>
                            <EventsView username={this.state.username} events={this.state.events} onJoin={(name:string, creator:string, slots:number[]) => {
                                ////////////////////////////////////////////////
                                // EVENT JOINING FUNCTIONALITY
                                ////////////////////////////////////////////////
                            }}/>
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar username={this.state.username} signOut={this.signOut.bind(this)} stateChange={this.changeState.bind(this)}/>
                        </ErrorBoundary>
                    </div>
                </div>
            )
        }
        //create event mode
        if(this.state.mode === 'create') {
            return (
                <div>
                    <div className="col s12 l10">
                        <ErrorBoundary>
                            <CreateEvent username={this.state.username} createObject={((event:Event) => {
                                //this is called when a user confirms creating an event
                                let events:Event[] = this.state.events
                                events.push(event)
                                this.setState({events: events})
                                ///////////////////////////////////////
                                // CREATE EVENT FUNCTIONALITY
                                ///////////////////////////////////////
                                Material.toast({html: 'Event Created!'})
                                this.setState({mode: 'events'})
                            }).bind(this)}/>
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar username={this.state.username} signOut={this.signOut.bind(this)} stateChange={this.changeState.bind(this)}/>
                        </ErrorBoundary>
                    </div>
                </div>
            )
        }
    }
}
