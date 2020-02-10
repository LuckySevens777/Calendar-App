import * as React from 'react'

interface Props {
    /**
     * The time slot that this element represents <br>
     * range: 1..72
     */
    slot:number,

    /**
     * Text to be displayed in the box
     */
    text:string

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

interface State {
    /**
     * Decides whether this slot has been clicked or not, or if it's unavailable <br>
     * <h3>States:</h3><ul><li>'Not-Avalable'</li><li>'Unselected'</li><li>'Selected'</li></ul>
     */
    state:string,

    /**
     * Text to be displayed in the box
     */
    text:string

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
    public readonly state:State

    /**
     * Constructs a TestElement
     * @param props the object's properties
     */
    public constructor(props:Props) {
        super(props)

        //temporary for constructor
        let state:any = {
            state: undefined,
            slot: undefined,
            text: undefined
        }

        //check state and set
        if(this.props.defaultState === 'Not-Available' ||
        this.props.defaultState === 'Unselected') {
            state.state = this.props.defaultState
        } else {
            throw new Error(`Failed to initialize time slot ${this.props.slot}, got defaultState=${this.props.defaultState}`)
        }

        //check slot and set
        if(this.props.slot >= 1 && this.props.slot <= 72) {
            state.slot = this.props.slot
        } else {
            throw new Error(`Failed to initialize time slot, slot=${this.props.slot} is not valid. Range: 1..72`)
        }

        //check text and set
        if(this.props.text.length > 0) {
            state.text = this.props.text
        } else {
            throw new Error(`Failed to initialize time slot ${this.props.slot}, got text=${this.props.text}`)
        }

        this.state = state
    }

    /**
     * @return the color class to be used for this component
     */
    private getColor() : string {
        if(this.state.state === 'Not-Available') return 'grey'
        if(this.state.state === 'Unselected') return 'white'
        if(this.state.state === 'Selected') return 'blue'

        //something must have failed
        throw new Error(`Time slot ${this.state.slot} was in state: ${this.state.state} somehow`)
    }

    /**
     * @return the text color class to be used for this component
     */
    private getTextColor() : string {
        if(this.state.state === 'Not-Available') return 'grey-text'
        if(this.state.state === 'Unselected') return 'black-text'
        if(this.state.state === 'Selected') return 'white-text'

        //something must have failed
        throw new Error(`Time slot ${this.state.slot} was in state: ${this.state.state} somehow`)
    }

    /**
     *
     * @param e the mouse event from the click
     */
    private onClick(e) : void {

        //do nothing if this time slot is not available
        if(this.state.state === 'Not-Available') return
        if(this.state.state === 'Unselected') this.setState({state: 'Selected'})
        if(this.state.state === 'Selected') this.setState({state: 'Unselected'})

        this.props.onChange(this.state.slot, this.state.state)
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className={`timeslot card center hoverable draggable ${this.getColor()} ${this.getTextColor()}`} onClick={this.onClick.bind(this)}>
                <span>{this.state.text}</span>
            </div>
        )
    }
}
