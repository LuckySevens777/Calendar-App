import * as React from 'react'
import {ErrorBoundary} from './ErrorBoundary'
import {EventsView} from './EventsView'
import {Overview} from './Overview'
import {SideBar} from './SideBar'

interface PageProps {}

interface PageState {
    mode:string
}

export class Page extends React.Component<PageProps, PageState> {
    public readonly state:PageState

    /**
     * Constructs a Page
     * @param props the object's properties
     */
    public constructor(props:PageProps) {
        super(props)

        //temporary for constructor
        let state:PageState = {
            mode: undefined
        }

        state.mode = 'events'

        this.state = state
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        //overview mode
        if(this.state.mode === 'overview') {
            return (
                <div>
                    <div className="center col s12 l10">
                        <ErrorBoundary>
                            <Overview/>
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar/>
                        </ErrorBoundary>
                    </div>
                </div>
            )
        }
        //events view mode
        if(this.state.mode === 'events') {
            return (
                <div>
                    <div className="center col s12 l10">
                        <ErrorBoundary>
                            <EventsView/>
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar/>
                        </ErrorBoundary>
                    </div>
                </div>
            )
        }
        //create event mode
        if(this.state.mode === 'create') {
            return (
                <div>
                    <div className="center col s12 l10">
                        <ErrorBoundary>
                            <Overview/>
                        </ErrorBoundary>
                    </div>
                    <div className="col s12 l2">
                        <ErrorBoundary>
                            <SideBar/>
                        </ErrorBoundary>
                    </div>
                </div>
            )
        }
    }
}
