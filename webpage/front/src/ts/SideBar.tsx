import * as React from 'react'

interface SideBarProps {
    /**
     * keeps track of if a user is signed in and needs the sign in option
     */
    username:string,
    stateChange:Function,
    signOut:Function
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
                {
                /* if */this.props.username === '' ?
                    <a className="collection-item blue-text"
                        onClick={() => this.props.stateChange('signin')}
                        key={1}
                    >
                        Sign In / Sign Up
                    </a>
                /* else */:
                    <a className="collection-item blue-text"
                        onClick={() => this.props.signOut()}
                        key={1}
                    >
                        Sign Out
                    </a>
                }

                <a className="collection-item blue-text"
                    onClick={() => this.props.stateChange('events')}
                    key={2}
                >
                    Events
                </a>
                {
                /* if */this.props.username !== '' ?
                <a className="collection-item blue-text"
                    onClick={() => this.props.stateChange('create')}
                    key={3}
                >
                    Create Event
                </a>
                /* else */:
                    <div></div>
                }
            </div>
        )
    }
}
