import * as React from 'react'

type Props = {
    /**
     * The time slot that this element represents <br>
     * range: 1..72
     */
    slot:number,

    /**
     * Decides whether this slot has been clicked or not, or if it's unavailable <br>
     * <h3>States:</h3><ul><li>'Not-Avalable'</li><li>'Unselected'</li><li>'Selected'</li></ul>
     */
    defaultState:string,

    /**
     * Callback function to be called when the state of this element changes
     * included parameters are: slot, state
     */
    onChange:Function
}

type State = {
    /**
     * Decides whether this slot has been clicked or not, or if it's unavailable <br>
     * <h3>States:</h3><ul><li>'Not-Avalable'</li><li>'Unselected'</li><li>'Selected'</li></ul>
     */
    state:string,

    /**
     * The time slot that this element represents <br>
     * range: 1..72
     */
    slot:number
}

/**
 * An element that represents an available time slot
 * @param slot the number of this time slot in 20 minute blocks
 * @param defaultState the default state Not-Available/Unselected
 * @callback onChange function run when the internal state changes<br>
 * params: (slot:number, state:string)
 */
export class TimeSlot extends React.Component<Props, State> {

    public state:State

    /**
     * Constructs a TestElement
     * @param props the object's properties
     */
    public constructor(props) {
        super(props)

        this.state.slot = 1

        //check state and set
        if(this.props.defaultState === 'Not-Available' ||
        this.props.defaultState === 'Unselected') {
            this.state.state = this.props.defaultState
        } else {
            console.error(`Failed to initialize time slot ${this.props.slot}, got defaultState=${this.props.defaultState}`)
        }

        //check slot and set
        if(this.props.slot >= 1 && this.props.slot <= 72) {
            this.state.slot = this.props.slot
        } else {
            console.error(`Failed to initialize time slot, slot=${this.props.slot} is not valid. Range: 1..72`)
        }

    }

    /**
     *
     * @param e the mouse event from the click
     */
    private onClick(e) : void {

        //do nothing if this time slot is not available
        if(this.state.state === 'Not-Available') return
        if(this.state.state === 'Unselected') this.state.state = 'Selected'
        if(this.state.state === 'Selected') this.state.state = 'Unselected'

        this.props.onChange(this.state.slot, this.state.state)
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div onClick={this.onClick}>
                <h1>Hello {this.props.slot}</h1>
            </div>
        )
    }
}
