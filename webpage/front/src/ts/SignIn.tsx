import * as React from 'react'

import {ErrorBoundary} from './ErrorBoundary'

interface SignInProps {
    /**
     * function to be run when a user hits the sign in button
     * passes the name of the user as an argument
     */
    onsSignin:Function,

    /**
     * function to run when the user hits the sign up button
     * passes the name of the user as an argument
     */
    onSignup:Function
}

interface SignInState {
    /**
     * yes, that's it. Ain't nobody got time for security
     */
    username:string
}

export class SignIn extends React.Component<SignInProps, SignInState> {
    public readonly state:SignInState

    /**
     * Constructs an SignIn
     * @param props the object's properties
     */
    public constructor(props:SignInProps) {
        super(props)

        //temporary for constructor
        let state:SignInState = {
            username: undefined
        }

        this.state = state
    }

    /**
     * Signs a user in<br>
     * yes, I know there's no actual security but what do you expect?
     */
    private signIn() {
        this.props.createObject(this.state.username)
    }

    /**
     * Signs a user up for an account
     */
    private signUp() {
        this.props.createObject(this.state.username)
    }

    /**
     * Renders the element
     * This is where you put the tsx
     */
    public render() {
        return (
            <div className="container card">
                <div className="row valign-wrapper">
                    <ErrorBoundary>
                        <div className="input-field col s8">
                            <input className="validate" id="Username" type="text" onChange={((e: React.FormEvent<HTMLInputElement>) => {
                                this.setState({username: e.currentTarget.value})
                            }).bind(this)}></input>
                        </div>
                    </ErrorBoundary>
                    <div className="col s2">
                        <a className="waves-effect blue white-text btn" onClick={this.signIn.bind(this)}>Sign In</a>
                    </div>
                    <div className="col s2">
                        <a className="waves-effect blue white-text btn" onClick={this.signUp.bind(this)}>Sign Up</a>
                    </div>
                </div>
            </div>
        )
    }
}
