import * as React from 'react'
import {ErrorBoundary} from './ErrorBoundary'
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

        state.mode = 'overview'

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
                    <ErrorBoundary>
                        <Overview/>
                    </ErrorBoundary>
                    <SideBar/>
                </div>
            )
        }
        //events view mode
        if(this.state.mode === 'overview') {
            return (
                <div>
                    <ErrorBoundary>
                        <Overview/>
                    </ErrorBoundary>
                    <SideBar/>
                </div>
            )
        }
        //create event mode
        if(this.state.mode === 'overview') {
            return (
                <div>
                    <ErrorBoundary>
                        <Overview/>
                    </ErrorBoundary>
                    <SideBar/>
                </div>
            )
        }
    }
}
