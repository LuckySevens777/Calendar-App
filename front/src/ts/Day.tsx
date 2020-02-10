import * as React from 'react'

import {ErrorBoundary} from './ErrorBoundary'
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
    date:Date,

    /**
     * Whether or not to grey out this day
     */
    valid:boolean
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
            date: undefined,
            valid: true
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
        let date = state.date.getDate()
        let ending

        if(date === 1) ending = 'st'
        if(date === 2) ending = 'nd'
        if(date === 3) ending = 'rd'
        if(date > 3) ending = 'th'

        state.title += ' the ' + date + ending

        //generate slot list
        this.slots = []

        for(let hour = 1; hour <= 24; hour++) {
            for(let minute = 0; minute < 60; minute += 20) {

                let now = `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`

                let laterHour = minute + 20 === 60 ? hour + 1 : hour
                let laterMinute = minute + 20 === 60 ? 0 : minute + 20
                let later = `${('0' + laterHour).slice(-2)}:${('0' + (laterMinute)).slice(-2)}`

                this.slots.push(`${now} - ${later}`)
            }
        }

        console.log(this.slots)

        this.state = state
    }

    /**
     * sets entire day's validity
     * @param valid whether or not it is valid
     */
    public setValid(valid:boolean) : void {
        this.setState({valid: valid})
    }

    /**
     *
     * @param slot the slot being chosen
     * @return whether this slot is a valid choice
     */
    private isValid(slot:number) : boolean {

        //full day invalid
        if(!this.state.valid) return false

        //invalid time
        if(slot <= 12) return false
        if(slot >= 68) return false
        if(slot >= 34 && slot <= 36) return false

        //invalid date
        const date = this.state.date
        //Dec 25
        if(date.getMonth() === 11 && date.getDate() === 25) return false
        //Jan 1
        if(date.getMonth() === 0 && date.getDate() === 1) return false
        //July 4
        if(date.getMonth() === 6 && date.getDate() === 4) return false

        return true
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="col s12 m4 l2">
                <div className="card-panel center">
                    <h6>{this.state.title}</h6>
                    <hr/>
                    {this.slots.map((time, slot) =>
                        <ErrorBoundary>
                            <TimeSlot
                                slot={slot+1}
                                key={slot}
                                text={time}
                                defaultState={this.isValid(slot+1) ? 'Unselected' : 'Not-Available'}
                                onChange={()=>{}}
                            />
                        </ErrorBoundary>
                    )}
                </div>
            </div>
        )
    }
}
