import * as Material from 'materialize-css'
import * as React from 'react'

import {ApiCall} from './Call'
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
            events: []
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
     * Lets a user create an event
     * @param event event to be created
     */
    private createEvent(event:Event) {
        //local events
        let events:Event[] = this.state.events
        events.push(event)
        this.setState({events: events})

        //api call
        let call:ApiCall = new ApiCall(this.state.username)
        const date = event.date.split('-')
        const slots = event.timeSlots.map(slot => '' + slot)
        call.createEvent(event.name, event.description, date, slots)

        //confirmations
        Material.toast({html: 'Event Created!'})
        this.setState({mode: 'events'})
    }


    /**
     * Adds a user to an event
     * @param name name of the event to join
     * @param creator name of event creator for id purposes
     * @param slots slots when this user is available for the event
     */
    private joinEvent(name:string, creator:string, slots:number[]) : void {
        //construct event
        let searchEvent:Event
        for(let event of this.state.events) {
            if(event.creatorName === creator && event.name === name) {
                searchEvent = event
                searchEvent.members.push({
                    name: this.state.username,
                    availability: slots
                })
                break
            }
        }

        if(searchEvent == undefined) {
            //show failure
            Material.toast({
                html: `failed to join ${name}`,
                classes: 'red'
            })
        }

        ///////////////////////////////////////
        // JOIN EVENT
        ///////////////////////////////////////

        //confirm that the user has joined
        Material.toast({
            html: `joined ${name}`,
            classes: 'green'
        })
        //log it
        console.log('joining', name, 'from', creator, 'slots:', slots)
    }

    /**
     * Signs a user in
     * @param username user to sign in
     */
    private signIn(username:string) : void {
        this.setState({username: username})

        ///////////////////////////////////////
        // SIGN IN FUNCTIONALITY
        ///////////////////////////////////////

        //display a green notification indicating that the sign in worked
        Material.toast({
            html: `${username} signed in`,
            classes: 'green'
        })
        //switch mode to events, since it would be weird to stay on this page
        this.changeState('events')
        //log it
        console.log('signed in:', username)
    }

    /**
     * Signs a user out
     */
    private signOut() : void {

        //////////////////////////
        // SIGN OUT FUNCTION
        /////////////////////////

        //sets the username to the empty string
        this.setState({username: ''})
        //give green confirmation
        Material.toast({
            html: `signed out`,
            classes: 'green'
        })
        //set state to log in
        this.setState({mode: 'signin'})
        //log it
        console.log('signed out')
    }

    /**
     * Attempts to register a user
     * @param username username to try and register
     */
    private signUp(username:string) : void {
        this.setState({username: username})

        ///////////////////////////////////////
        // SIGN UP FUNCTIONALITY
        ///////////////////////////////////////

        let signInSuccess = true //indicates success

        if(signInSuccess) {
            //if sign in was a success, show green confirmation
            Material.toast({
                html: `${username} signed up`,
                classes: 'green'
            })
            //switch to events view
            this.changeState('events')
            //log it
            console.log('sucessfully signed up:', username)
        } else {
            //if sign in fails, show red warning
            Material.toast({
                html: `${username} already exists!`,
                classes: 'red'
            })
            //log it
            console.log('failed to sign up:', username)
        }
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
                            <SignIn
                                onSignin={this.signIn.bind(this)}
                                onSignup={this.signUp.bind(this)}
                            />
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar
                                username={this.state.username}
                                signOut={this.signOut.bind(this)}
                                stateChange={this.changeState.bind(this)}
                            />
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
                            <EventsView
                                username={this.state.username}
                                events={this.state.events}
                                onJoin={this.joinEvent.bind(this)}
                            />
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar
                                username={this.state.username}
                                signOut={this.signOut.bind(this)}
                                stateChange={this.changeState.bind(this)}
                            />
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
                            <CreateEvent
                                username={this.state.username}
                                createObject={this.createEvent.bind(this)}
                            />
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar
                                username={this.state.username}
                                signOut={this.signOut.bind(this)}
                                stateChange={this.changeState.bind(this)}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            )
        }
    }
}
