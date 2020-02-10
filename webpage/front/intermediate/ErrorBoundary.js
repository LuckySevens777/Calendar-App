"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;

/**
 * Replaces a failed element stack with an easier to understand big red square
 * contains a stack trace and the error
 */
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    /**
     * Constructs an ErrorBoundary wrapper
     * @param props should not receive any properties
     */
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            error: null,
            errorInfo: null
        };
        return _this;
    }
    /**
     * Called whenever any error occurs in elements beneath it
     * @param error
     * @param errorInfo
     */
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        //get mad!
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    };
    ErrorBoundary.prototype.render = function () {
        //if it should get mad
        if (this.state.errorInfo) {
            return (React.createElement("div", { className: "card-panel red white-text" },
                React.createElement("h5", null, "React component failed!"),
                React.createElement("details", { style: { whiteSpace: 'pre-wrap' } },
                    this.state.error && this.state.error.toString(),
                    this.state.errorInfo.componentStack)));
        }
        //before being angered, render normally
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
exports.ErrorBoundary = ErrorBoundary;
