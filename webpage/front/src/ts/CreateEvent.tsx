////////////////////////////////////////////////
// NEEDS INVALID DATE RECOGNITION
////////////////////////////////////////////////
import * as React from 'react'

import {Event} from './Event'
import {Slot} from './Slot'

import {ErrorBoundary} from './ErrorBoundary'
import {EventElement} from './EventElement'
interface CreateEventProps {
    /**
     * the name of the currently logged in user
     */
    username:string,
    /**
     * A callback function to run whenever an event is to be created
     * passes an Event object
     */
    createObject:Function
}

interface CreateEventState {
    /**
     * What this event will be called
     */
    name:string,

    /**
     * A description for this event
     */
    description:string,

    /**
     * The name of the user who created this
     */
    creatorName:string,

    /**
     * The date that this event will be held on
     */
    date:string,

    /**
     * the number of each individual 20 minute time slot that has been selected
     * <br>I know it sounds dumb, but that was easiest in the database
     */
    timeSlots:number[]
}

export class CreateEvent extends React.Component<CreateEventProps, CreateEventState> {
    public readonly state:CreateEventState

    /**
     * Constructs an event creation menu
     * @param props the object's properties
     */
    public constructor(props:CreateEventProps) {
        super(props)

        //temporary for constructor
        let state:CreateEventState = {
            name: undefined,
            description: undefined,
            creatorName: undefined,
            date: undefined,
            timeSlots: []
        }

        this.state = state
    }

    /**
     * creates an Event and runs the callback function with it
     */
    private createEvent() {
        let event:Event = new Event()

        //set attributes
        event.name = this.state.name
        event.description = this.state.description
        event.uniqueID = 'INVALID ID'
        event.creatorName = this.props.username
        event.members = [event.creatorName]
        event.date = this.state.date
        event.timeSlots = this.state.timeSlots

        //run callback
        this.props.createObject(event)
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="card-panel container align-center">
                <div className="row align-center">
                    <h2>
                        Create a new event
                    </h2>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col s2"></div>
                    <div className="input-field col s8">
                        <input id="event-date" type="date" onChange={((e: React.FormEvent<HTMLInputElement>) => {
                            this.setState({date: e.currentTarget.value})
                        }).bind(this)}></input>
                    </div>
                    <div className="col s2"></div>
                </div>
                <div className="row">
                    <div className="col s2"></div>
                    <div className="input-field col s8">
                        <input placeholder="Event Name" id="event-name" type="text" className="validate" onChange={((e: React.FormEvent<HTMLInputElement>) => {
                            this.setState({name: e.currentTarget.value})
                        }).bind(this)}></input>
                    </div>
                    <div className="col s2"></div>
                </div>
                <div className="row">
                    <div className="col s2"></div>
                    <div className="input-field col s8">
                        <input placeholder="Event Description" id="event-description" type="text" className="validate" onChange={((e: React.FormEvent<HTMLInputElement>) => {
                            this.setState({description: e.currentTarget.value})
                        }).bind(this)}></input>
                    </div>
                    <div className="col s2"></div>
                </div>
                <div className="row">
                    <ErrorBoundary>
                        <div className="col s12">
                            <EventElement
                                date={''}
                                interactive={true}
                                onChange={((slots:Slot[]) => {
                                    let timeSlots = []

                                    for(let n in slots) if(slots[n].active) timeSlots.push(n)

                                    this.setState({timeSlots: timeSlots})
                                }).bind(this)}
                                color={{
                                    active: 'blue',
                                    interactive: 'white',
                                    inactive: 'grey'
                                }}
                                slots={[]}
                            />
                        </div>
                    </ErrorBoundary>
                </div>
                <div className="row center">
                    <a className="waves-effect blue white-text btn" onClick={this.createEvent.bind(this)}>Create</a>
                </div>
            </div>
        )
    }
}
