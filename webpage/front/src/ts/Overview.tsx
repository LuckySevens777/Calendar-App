import * as React from 'react'

import {Slot} from './Slot'

import {ErrorBoundary} from './ErrorBoundary'
import {EventElement} from './EventElement'

interface OverviewProps {
    stateChange:Function
}

interface OverviewState {}

export class Overview extends React.Component<OverviewProps, OverviewState> {
    public readonly state:OverviewState

    /**
     * Constructs an overview
     * @param props the object's properties
     */
    public constructor(props:OverviewProps) {
        super(props)

        //temporary for constructor
        let state:OverviewState = {}

        this.state = state
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s6">
                        <ErrorBoundary>
                            <EventElement
                                date={new Date()}
                                interactive={true}
                                onChange={(slots:Slot[]) => console.log(slots)}
                                color={{
                                    active: 'blue',
                                    interactive: 'white',
                                    inactive: 'grey'
                                }}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        )
    }
}
