import * as React from 'react'
import * as ReactDOM from 'react-dom'

/**
 * An example element that takes a name and displays Hello {name}
 * @param name the name to be used
 */
export class TestElement extends React.Component<{name:string}> {

    /**
     * Constructs a TestElement
     * @param props the object's properties
     */
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
      }

      /**
       * Renders the element
       * This is where you put the tsx
       */
      render() {
        return (
            <div>
                <h1>Hello {this.props.name}</h1>
            </div>
        )
    }
}
