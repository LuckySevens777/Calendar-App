import * as React from 'react'
import {Day} from './Day'
import { ErrorBoundary } from './ErrorBoundary'
import { SideBar } from './SideBar'

interface OverviewProps {}

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

        let now = new Date()

        return (
            <div className="container center">
                <div className="row">
                    <div className="col s6">
                        <ErrorBoundary>
                            <Day date={now} onChange={()=>{}}/>
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        )
    }
}
