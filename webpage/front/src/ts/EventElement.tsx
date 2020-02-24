import * as React from 'react'

import {Slot} from './Slot'

import {ErrorBoundary} from './ErrorBoundary'

interface EventElementProps {
    /**
     * The actual Date object to register this EventElement during
     */
    date:Date,

    /**
     * Determines whether this is a static display or a creation menu
     */
    interactive:boolean,

    /**
     * color classes to use
     */
    color:{
        /**
         * slot is selected
         */
        active:string,

        /**
         * slot is able to be made active
         */
        interactive:string

        /**
         * slot is unable to be interacted with
         */
        inactive:string
    }

    /**
     * Callback function to be called when the state of this element changes
     * included parameters are: slots[]
     */
    onChange:Function
}

interface EventElementState {

    /**
     * Determines whether this is a static display or a creation menu
     */
    interactive:boolean,

    /**
     * The name of the EventElement to display
     */
    title:string,

    /**
     * The actual Date object to register this EventElement as
     */
    date:Date,

    /**
     * list of time slots
     */
    slots:Slot[],

    /**
     * what format of times to display
     */
    displayTimes:string[]
}

/**
 * An element that represents an available time slot
 * @param slot the number of this time slot in 20 minute blocks
 * @param defaultState the default state Not-Available/Unselected
 * @callback onChange function run when the internal state changes<br>
 * params: (slot:number, state:string)
 */
export class EventElement extends React.Component<EventElementProps, EventElementState> {
    public readonly state:EventElementState

    private slots:string[]

    public constructor(props:EventElementProps) {
        super(props)

        //temporary for constructor
        let state:EventElementState = {
            interactive: undefined,
            title: undefined,
            date: undefined,
            slots: [],
            displayTimes: []
        }

        //generate blank slots
        for(let i = 0; i < 72; i++) {
            state.slots[i] = new Slot()
            state.slots[i].active = false

            if(i < 12) state.slots[i].interactive = false
            else if(i > 68) state.slots[i].interactive = false
            else if(i >= 33 && i < 36) state.slots[i].interactive = false
            else state.slots[i].interactive = true

            if(state.slots[i].interactive) state.slots[i].color = this.props.color.interactive
            else state.slots[i].color = this.props.color.inactive
        }

        state.displayTimes = [
            '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am', '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 am',
            '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm', '12:00 pm'
        ]

        this.state = state
    }

    /**
     * Called whenever a slot is clicked
     * @param slot the number of the slot being changed
     * @param active the state to change it to
     */
    private setSlot(slot:number, active:boolean) : void {

        let slots = this.state.slots
        slots[slot].active = active

        if(active) slots[slot].color = this.props.color.active
        else slots[slot].color = this.props.color.interactive

        this.setState({slots: slots})

        this.props.onChange(this.state.slots)
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <ErrorBoundary>
                <div className="card-panel row">
                    {this.state.displayTimes.map((time, number) =>
                        <ErrorBoundary>
                            <div className="col">
                                <div className="card row" id="event">
                                    <div className="col s4">
                                        <div className={`time-title`} key={number}><br/>{time}</div>
                                    </div>
                                    <div className="col s8">
                                        <div className={`time-slot ${this.state.slots[number*3].color}`} key={number*3}  onClick={(() => {
                                                if(this.state.slots[number*3].interactive) this.setSlot(number*3, !this.state.slots[number*3].active)
                                            }).bind(this)}><br/>
                                        </div>
                                        <div className={`time-slot ${this.state.slots[number*3+1].color}`} key={number*3+1}  onClick={(() => {
                                                if(this.state.slots[number*3+1].interactive) this.setSlot(number*3+1, !this.state.slots[number*3+1].active)
                                            }).bind(this)}><br/>
                                        </div>
                                        <div className={`time-slot ${this.state.slots[number*3+2].color}`} key={number*3+2}  onClick={(() => {
                                                if(this.state.slots[number*3+2].interactive) this.setSlot(number*3+2, !this.state.slots[number*3+2].active)
                                            }).bind(this)}><br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ErrorBoundary>
                    )}
                </div>
            </ErrorBoundary>
        )
    }
}
