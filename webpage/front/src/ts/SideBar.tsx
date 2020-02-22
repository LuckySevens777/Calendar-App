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
                <a className="collection-item" onClick={() => this.props.stateChange('overview')}>
                    Overview
                </a>
                <a className="collection-item" onClick={() => this.props.stateChange('events')}>
                    Events
                </a>
                <a className="collection-item" onClick={() => this.props.stateChange('events')}>
                    Create
                </a>
            </div>
        )
    }
}
