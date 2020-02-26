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

    private selectedSlots:number[]

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
        return slots
    }

    /**
     * Logic for when the Join Event button is pressed
     */
    private joinEvent(name:string, creator:string) : void {
        this.props.onJoin(name, creator, this.selectedSlots)
    }

    private updateSelectedSlots(slots:Slot[]) : void {
        let selected:number[] = []
        for(let i = 0; i < slots.length; i++) {
            if(slots[i].active) selected.push(i)
        }
        this.selectedSlots = selected
        console.log(selected)
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
                                <div className={`collapsible-header`}
                                    onMouseOver={()=>Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})}
                                >
                                    <i className="material-icons">group</i>
                                    <h5>{event.name} | {event.creatorName} | {event.date}</h5>
                                    {
                                    /* if */this.props.username === event.creatorName ?
                                        <span className="badge blue white-text">Your Event</span>
                                    /* else */:
                                        <span></span>
                                    }
                                </div>
                                <div className="collapsible-body">
                                    <h5>Description</h5>
                                    <span>{event.description}</span><br/>
                                    <h5>Members</h5>
                                    <ul className="collapsible">
                                        {event.members.map((member, number) =>
                                            <li key={number}>
                                                <div className="collapsible-header">
                                                    <i className="material-icons">user</i>
                                                    <h5 className="center">{`${member.name}'s availability`}</h5>
                                                </div>
                                                <div className="collapsible-body">
                                                    <ErrorBoundary>
                                                        <EventElement
                                                            date={event.date}
                                                            interactive={false}
                                                            joinMode={false}
                                                            onChange={() => {}}
                                                            color={{
                                                                active: 'blue',
                                                                interactive: 'white',
                                                                inactive: 'grey'
                                                            }}
                                                            slots={this.getSlotsFromNums(member.availability)}
                                                        />
                                                    </ErrorBoundary>
                                                </div>
                                            </li>
                                        )}
                                    </ul>

                                    {
                                    /* if */event.members.map(m=>m.name).indexOf(this.props.username) === -1 &&
                                    this.props.username !== '' ?
                                        <h5>Join</h5>
                                    /* else */:
                                        <div></div>
                                    }
                                    <ErrorBoundary>
                                        <EventElement
                                            date={event.date}
                                            interactive={event.members.map(m=>m.name).indexOf(this.props.username) !== -1}
                                            joinMode={true}
                                            onChange={this.updateSelectedSlots.bind(this)}
                                            color={{
                                                active: 'blue',
                                                interactive: 'white',
                                                inactive: 'grey'
                                            }}
                                            slots={this.getSlotsFromNums(event.timeSlots)}
                                        />
                                        {
                                        /* if */this.props.username !== event.creatorName ?
                                            <a className="btn waves-effect blue white-text" onClick={(() => {
                                                this.joinEvent(event.name, event.creatorName)
                                            }).bind(this)}>Join Event</a>
                                        /* else */:
                                            <div></div>
                                        }
                                    </ErrorBoundary>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                {
                    /* if */this.props.events.length === 0 ?
                        <h3 className="red-text" >None Found</h3>
                    /* else */:
                        <div></div>
                }
            </div>
        )
    }
}
