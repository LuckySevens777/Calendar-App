import * as React from 'react'

import {TimeSlot} from './TimeSlot'

interface DayProps {
    /**
     * The actual Date object to register this day as
     */
    date:Date,

    /**
     * Callback function to be called when the state of this element changes
     * included parameters are: slot, state
     */
    onChange:Function
}

interface DayState {
    /**
     * The name of the day to display
     */
    title:string,

    /**
     * The actual Date object to register this day as
     */
    date:Date
}

/**
 * An element that represents an available time slot
 * @param slot the number of this time slot in 20 minute blocks
 * @param defaultState the default state Not-Available/Unselected
 * @callback onChange function run when the internal state changes<br>
 * params: (slot:number, state:string)
 */
export class Day extends React.Component<DayProps, DayState> {
    public readonly state:DayState

    private slots:string[]

    public constructor(props:DayProps) {
        super(props)

        //temporary for constructor
        let state:DayState = {
            title: undefined,
            date: undefined
        }

        //set date
        state.date = this.props.date
        switch(state.date.getDay()) {
            case 0: state.title = 'Sunday'
            break
            case 1: state.title = 'Monday'
            break
            case 2: state.title = 'Tuesday'
            break
            case 3: state.title = 'Wednesday'
            break
            case 4: state.title = 'Thursday'
            break
            case 5: state.title = 'Friday'
            break
            case 6: state.title = 'Saturday'
            break

            default: throw new Error(`Somehow the Day component was initialized on day number ${state.date.getDay()}`)
        }

        //make slot list
        this.slots = []

        for(let hour = 1; hour <= 24; hour++) {
            for(let minute = 0; minute < 60; minute += 20) {

                let now = `${hour}:${('0' + minute).slice(-2)}`

                let laterHour = minute + 20 === 60 ? hour + 1 : hour
                let laterMinute = minute + 20 === 60 ? 0 : minute + 20
                let later = `${laterHour}:${('0' + (laterMinute)).slice(-2)}`

                this.slots.push(`${now} - ${later}`)
            }
        }

        console.log(this.slots)

        this.state = state
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="col s6 m4 l2">
                <div className="card-panel center">
                    <h6>{this.state.title}</h6>
                    <hr/>
                    {this.slots.map((time, slot) =>
                        <TimeSlot slot={slot+1} key={slot} text={time} defaultState={'Unselected'} onChange={()=>{}}/>
                    )}
                </div>
            </div>
        )
    }
}
