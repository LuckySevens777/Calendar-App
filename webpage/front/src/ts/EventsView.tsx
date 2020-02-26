import * as React from 'react'
import * as Material from 'materialize-css'

import {Event} from './Event'
import {Slot} from './Slot'

import {ErrorBoundary} from './ErrorBoundary'
import {EventElement} from './EventElement'

interface EventsViewProps {
    /**
     * The name of the user signed in
     */
    username:string,

    /**
     * list of events to display
     */
    events:Event[],

    /**
     * callback function to call when an event is joined
     * passes in the name and creator of the event being joined (name, creator, slots)
     */
    onJoin:Function
}

interface EventsViewState {}

export class EventsView extends React.Component<EventsViewProps, EventsViewState> {
    public readonly state:EventsViewState

    /**
     * Constructs an EventsView
     * @param props the object's properties
     */
    public constructor(props:EventsViewProps) {
        super(props)

        //temporary for constructor
        let state:EventsViewState = {}

        this.state = state
    }

    private getSlotsFromNums(nums:number[]) : Slot[] {
        let slots:Slot[] = []
        for(let i = 0; i < 72; i++) {
            let slot = new Slot
            slot.interactive = false
            slot.active = nums.indexOf(i) != -1
            slots[i] = slot
        }
        console.log(nums)
        return slots
    }

    /**
     * Logic for when the Join Event button is pressed
     */
    private joinEvent(name:string, creator:string, slots:number[]) {
        this.props.onJoin(name, creator, slots)
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="container center">
                <h2 className="row">
                    Available Events
                </h2>
                <div className="row">
                    <ul className="collapsible">
                        {this.props.events.map((event, number) =>
                            <li key={number}>
                                {/* onMouseover is a hacky way to initialize the container just in time */}
                                <div className={`collapsible-header`} onMouseOver={()=>Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})}>
                                    <i className="material-icons">group</i>
                                    <h5>{event.name} | {event.creatorName} | {event.date}</h5>
                                    {this.props.username === event.creatorName ? <span className="badge blue white-text">Your Event</span> : <span></span>}
                                </div>
                                <div className="collapsible-body">
                                    <h5>Description</h5>
                                    <span>{event.description}</span><br/>
                                    <h5>Members</h5>
                                    <ul>
                                        {event.members.map((member, number) =>
                                            <li key={number}>{member}</li>
                                        )}
                                    </ul>
                                    <h5>Join</h5>
                                    <ErrorBoundary>
                                        <EventElement
                                            date={event.date}
                                            interactive={this.props.username !== event.creatorName}
                                            onChange={() => {}}
                                            color={{
                                                active: 'blue',
                                                interactive: 'white',
                                                inactive: 'grey'
                                            }}
                                            slots={this.getSlotsFromNums(event.timeSlots)}
                                        />
                                        {this.props.username !== event.creatorName ? <a className="btn waves-effect blue white-text" onClick={(() => {
                                            this.joinEvent(event.name, event.creatorName, event.timeSlots)
                                        }).bind(this)}>Join Event</a> : <div></div>}
                                    </ErrorBoundary>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}
