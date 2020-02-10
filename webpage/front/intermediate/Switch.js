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
//libraries

/**
 * A switch that can be set to true or false
 * @param name the name to be used
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    /**
     * Constructs a TestElement
     * @param props the object's properties
     */
    function Switch(props) {
        var _this = _super.call(this, props) || this;
        _this.DOMRef = React.createRef();
        return _this;
    }
    /**
     * Renders the element
     * This is where you put the tsx
     */
    Switch.prototype.render = function () {
        return (React.createElement("div", { className: "switch", ref: this.DOMRef },
            React.createElement("label", null,
                this.props.offTag,
                React.createElement("input", { type: "checkbox" },
                    React.createElement("span", { className: "lever" })),
                this.props.onTag)));
    };
    return Switch;
}(React.Component));
exports.Switch = Switch;
