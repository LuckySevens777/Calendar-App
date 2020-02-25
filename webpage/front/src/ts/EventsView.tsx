import * as React from 'react'
import * as Material from 'materialize-css'

import {Slot} from './Slot'

import {ErrorBoundary} from './ErrorBoundary'
import {EventElement} from './EventElement'
import {EVENTS} from './improvisedValues'

interface EventsViewProps {}

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

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {

        let slots:Slot[] = []
        for(let i = 0; i < 72; i++) {
            let slot = new Slot
            slot.interactive = false
            slot.active = EVENTS[0].timeSlots.indexOf(i) != -1 //EVENTS NEEDS TO BE REPLACED WITH SOME ARRAY OF EVENT OBJECTS
            slots[i] = slot
        }

        return (
            <div className="container center">
                <h2 className="row">
                    Header
                </h2>
                <div className="row">
                    <ul className="collapsible">
                        {EVENTS.map((event, number) => //EVENTS NEEDS TO BE REPLACED WITH SOME ARRAY OF EVENT OBJECTS
                            <li key={number}>
                                {/* onMouseover is a hacky way to initialize the container just in time */}
                                <div className="collapsible-header" onMouseOver={()=>Material.Collapsible.init(document.querySelectorAll('.collapsible'), {})}>
                                    <i className="material-icons">group</i>
                                    <h5>{event.name} | {event.creatorName} | {event.date}</h5>
                                </div>
                                <div className="collapsible-body">
                                    <span>{event.description}</span><br/>
                                    <ErrorBoundary>
                                        <EventElement
                                            date={new Date()}
                                            interactive={false}
                                            onChange={(slots:Slot[]) => console.log(slots)}
                                            color={{
                                                active: 'blue',
                                                interactive: 'white',
                                                inactive: 'grey'
                                            }}
                                            slots={slots}
                                        />
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
