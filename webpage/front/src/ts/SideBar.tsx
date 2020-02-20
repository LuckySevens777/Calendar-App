import * as React from 'react'

interface SideBarProps {}

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
     *
     * @param mouseEvent the mouse event from the click
     */
    private onClick(mouseEvent) : void {

    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="collection" id="sidebar">
                <a className="collection-item">
                    Events
                </a>
                <a className="collection-item">
                    Pending
                </a>
                <a className="collection-item">
                    Create
                </a>
            </div>
        )
    }
}
