import * as React from 'react'

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
    /**
     * Error information to be passed along, like the stack of elements involved
     */
    errorInfo:any,

    /**
     * The actual error thrown by some element
     */
    error:any
}

/**
 * Replaces a failed element stack with an easier to understand big red square
 * contains a stack trace and the error
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public readonly state:ErrorBoundaryState

    /**
     * Constructs an ErrorBoundary wrapper
     * @param props should not receive any properties
     */
    public constructor(props:ErrorBoundaryProps) {
        super(props)
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    /**
     * Called whenever any error occurs in elements beneath it
     * @param error
     * @param errorInfo
     */
    public componentDidCatch(error, errorInfo) : void {

        //get mad!
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    public render() {
    //if it should get mad
    if(this.state.errorInfo) {
        return (
        <div className="card-panel red white-text">
            <h5>React component failed!</h5>
            <details style={{whiteSpace: 'pre-wrap'}}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}
            </details>
        </div>
        )
    }
    //before being angered, render normally
    return this.props.children
    }
}