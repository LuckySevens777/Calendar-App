import * as React from 'react'

import {Slot} from './Slot'

import {ErrorBoundary} from './ErrorBoundary'

interface EventElementProps {
    /**
     * The actual Date object to register this EventElement during
     */
    date:string,

    /**
     * Determines whether this is a static display or a creation menu
     */
    interactive:boolean,

    /**
     * Display differently if joining this as an event
     */
    joinMode:boolean,

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
        inactive:string,
    }

    /**
     * array of default slots
     */
    slots:Slot[],

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
    displayTimes:string[],

    /**
     * whether or not to display time in 24 hour mode
     */
    time24Hour:boolean,
    times12:string[],
    times24:string[]
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
            displayTimes: [],
            time24Hour: false,
            times12: [
                '01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am', '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 am',
                '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm', '12:00 pm'
            ],
            times24: [
                '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
                '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
            ]
        }

        if(this.props.slots.length != 72) {
            //generate blank slots
            for(let i = 0; i < 72; i++) {
                state.slots[i] = new Slot
                state.slots[i].active = false

                //grey out certain slots
                if(i < 12) state.slots[i].interactive = false
                else if(i > 68) state.slots[i].interactive = false
                else if(i >= 33 && i < 36) state.slots[i].interactive = false
                else state.slots[i].interactive = true

                //set correct colors
                if(state.slots[i].interactive) state.slots[i].color = this.props.color.interactive
                else state.slots[i].color = this.props.color.inactive
            }
        } else {
            if(this.props.joinMode) {
                state.slots = this.props.slots

                for(let i = 0; i < 72; i++) {
                    //change mode
                    state.slots[i].interactive = state.slots[i].active
                    state.slots[i].active = false

                    //set correct colors
                    if(state.slots[i].interactive) {
                        if(state.slots[i].active) state.slots[i].color = this.props.color.active
                        state.slots[i].color = this.props.color.interactive
                    } else state.slots[i].color = this.props.color.inactive
                }
            } else {
                state.slots = this.props.slots

                for(let i = 0; i < 72; i++) {
                    //set correct colors
                    if(state.slots[i].active) state.slots[i].color = this.props.color.active
                    else state.slots[i].color = this.props.color.interactive
                }
            }
        }

        state.displayTimes = state.times12

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
     * sets the time mode
     * @param time24 true for 24 hour time, false for 12
     */
    private setTimeMode(time24:boolean) : void {
        this.setState({time24Hour: time24})
        this.setState({displayTimes: (time24 ? this.state.times24 : this.state.times12)})
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <ErrorBoundary>
                <div className="card-panel row">
                    <div className="row">
                        <div className="switch">
                            <label>
                                12 hour
                                <input type="checkbox"
                                    onChange={((e:React.FormEvent<HTMLInputElement>) =>
                                        this.setTimeMode(e.currentTarget.checked)
                                    ).bind(this)}
                                />
                                <span className="lever"></span>
                                24 hour
                            </label>
                        </div>
                    </div>
                    {this.state.displayTimes.map((time, number) =>
                        <ErrorBoundary key={number}>
                            <div className="col">
                                <div className="card row" id="event">
                                    <div className="col s4">
                                        <div className={`time-title`} key={number}><br/>{time}</div>
                                    </div>
                                    <div className="col s8">
                                        {/* Render time slot boxes */}
                                        <div className={`time-slot ${this.state.slots[number*3].interactive ? 'selectable' : ''} ${this.state.slots[number*3].color}`} key={number*3}  onClick={(() => {
                                                if(this.state.slots[number*3].interactive) this.setSlot(number*3, !this.state.slots[number*3].active)
                                            }).bind(this)}><br/>
                                        </div>
                                        <div className={`time-slot ${this.state.slots[number*3].interactive ? 'selectable' : ''} ${this.state.slots[number*3+1].color}`} key={number*3+1}  onClick={(() => {
                                                if(this.state.slots[number*3+1].interactive) this.setSlot(number*3+1, !this.state.slots[number*3+1].active)
                                            }).bind(this)}><br/>
                                        </div>
                                        <div className={`time-slot ${this.state.slots[number*3].interactive ? 'selectable' : ''} ${this.state.slots[number*3+2].color}`} key={number*3+2}  onClick={(() => {
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
