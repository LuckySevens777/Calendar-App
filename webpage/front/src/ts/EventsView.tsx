import * as React from 'react'

interface EventsViewProps {}

interface EventsViewState {}

export class EventsView extends React.Component<EventsViewProps, EventsViewState> {
    public readonly state:EventsViewState

    /**
     * Constructs an EventsView
     * @param props the object's properties
     */
    public constructor(props:EventsViewProps) {
        super(props)

        //temporary for constructor
        let state:EventsViewState = {}

        this.state = state
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {

        let now = new Date()

        return (
            <div className="container center">
                <div className="row">
                    Header
                </div>
                <div className="row">
                    <div className="card">
                        <div className="collection">
                            <a href="#!" className="collection-item blue-text">Event 1</a>
                            <a href="#!" className="collection-item blue-text">Event 2</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
