import * as React from 'react'

interface SideBarProps {
    stateChange:Function
}

interface SideBarState {}

export class SideBar extends React.Component<SideBarProps, SideBarState> {
    public readonly state:SideBarState

    /**
     * Constructs a
     * @param props the object's properties
     */
    public constructor(props:SideBarProps) {
        super(props)

        //temporary for constructor
        let state:SideBarState = {}

        this.state = state
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="collection" id="sidebar">
                {true /* only run if not signed in */ ? <a className="collection-item blue-text" onClick={() => this.props.stateChange('signin')}>
                    Sign In / Sign Up
                </a> : <div></div>}
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
