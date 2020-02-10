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
 * An example element that takes a name and displays Hello {name}
 * @param name the name to be used
 */
var TestElement = /** @class */ (function (_super) {
    __extends(TestElement, _super);
    /**
     * Constructs a TestElement
     * @param props the object's properties
     */
    function TestElement(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: null
        };
        return _this;
    }
    /**
     * Renders the element
     * This is where you put the tsx
     */
    TestElement.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null,
                "Hello ",
                this.props.name)));
    };
    return TestElement;
}(React.Component));
exports.TestElement = TestElement;
