import * as React from 'react'
import * as ReactDOM from 'react-dom'

export class TestElement extends React.Component<{name:string}> {
    constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
      }

      render() {
        return (
            <div>
                <h1>Hello {this.props.name}</h1>
            </div>
        )
    }
}
