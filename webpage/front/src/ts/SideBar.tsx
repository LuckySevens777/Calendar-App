import * as React from 'react'

interface SideBarProps {
    /**
     * keeps track of if a user is signed in and needs the sign in option
     */
    signedIn:boolean,
    stateChange:Function
}

interface SideBarState {
    /**
     * keeps track of if a user is signed in and needs the sign in option
     */
    signedIn:boolean
}

export class SideBar extends React.Component<SideBarProps, SideBarState> {
    public readonly state:SideBarState

    /**
     * Constructs a
     * @param props the object's properties
     */
    public constructor(props:SideBarProps) {
        super(props)

        //temporary for constructor
        let state:SideBarState = {
            signedIn: false
        }

        state.signedIn = this.props.signedIn

        this.state = state
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="collection" id="sidebar">
                {!this.state.signedIn ? <a className="collection-item blue-text" onClick={() => this.props.stateChange('signin')}>
                    Sign In / Sign Up
                </a> : <a onClick={() => this.props.stateChange('signin')}>
                    Sign Out
                </a>}
                <a className="collection-item blue-text" onClick={() => this.props.stateChange('events')}>
                    Events
                </a>
                <a className="collection-item blue-text" onClick={() => this.props.stateChange('create')}>
                    Create
                </a>
            </div>
        )
    }
}
