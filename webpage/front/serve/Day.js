(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

var ErrorBoundary_1 = require("./ErrorBoundary");
var TimeSlot_1 = require("./TimeSlot");
/**
 * An element that represents an available time slot
 * @param slot the number of this time slot in 20 minute blocks
 * @param defaultState the default state Not-Available/Unselected
 * @callback onChange function run when the internal state changes<br>
 * params: (slot:number, state:string)
 */
var Day = /** @class */ (function (_super) {
    __extends(Day, _super);
    function Day(props) {
        var _this = _super.call(this, props) || this;
        //temporary for constructor
        var state = {
            title: undefined,
            date: undefined,
            valid: true
        };
        //set date
        state.date = _this.props.date;
        switch (state.date.getDay()) {
            case 0:
                state.title = 'Sunday';
                break;
            case 1:
                state.title = 'Monday';
                break;
            case 2:
                state.title = 'Tuesday';
                break;
            case 3:
                state.title = 'Wednesday';
                break;
            case 4:
                state.title = 'Thursday';
                break;
            case 5:
                state.title = 'Friday';
                break;
            case 6:
                state.title = 'Saturday';
                break;
            default: throw new Error("Somehow the Day component was initialized on day number " + state.date.getDay());
        }
        var date = state.date.getDate();
        var ending;
        if (date === 1)
            ending = 'st';
        if (date === 2)
            ending = 'nd';
        if (date === 3)
            ending = 'rd';
        if (date > 3)
            ending = 'th';
        state.title += ' the ' + date + ending;
        //generate slot list
        _this.slots = [];
        for (var hour = 1; hour <= 24; hour++) {
            for (var minute = 0; minute < 60; minute += 20) {
                var now = ('0' + hour).slice(-2) + ":" + ('0' + minute).slice(-2);
                var laterHour = minute + 20 === 60 ? hour + 1 : hour;
                var laterMinute = minute + 20 === 60 ? 0 : minute + 20;
                var later = ('0' + laterHour).slice(-2) + ":" + ('0' + (laterMinute)).slice(-2);
                _this.slots.push(now + " - " + later);
            }
        }
        console.log(_this.slots);
        _this.state = state;
        return _this;
    }
    /**
     * sets entire day's validity
     * @param valid whether or not it is valid
     */
    Day.prototype.setValid = function (valid) {
        this.setState({ valid: valid });
    };
    /**
     *
     * @param slot the slot being chosen
     * @return whether this slot is a valid choice
     */
    Day.prototype.isValid = function (slot) {
        //full day invalid
        if (!this.state.valid)
            return false;
        //invalid time
        if (slot <= 12)
            return false;
        if (slot >= 68)
            return false;
        if (slot >= 34 && slot <= 36)
            return false;
        //invalid date
        var date = this.state.date;
        //Dec 25
        if (date.getMonth() === 11 && date.getDate() === 25)
            return false;
        //Jan 1
        if (date.getMonth() === 0 && date.getDate() === 1)
            return false;
        //July 4
        if (date.getMonth() === 6 && date.getDate() === 4)
            return false;
        return true;
    };
    /**
     * Renders the element
     * This is where you put the tsx
     */
    Day.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "col s12 m4 l2" },
            React.createElement("div", { className: "card-panel center" },
                React.createElement("h6", null, this.state.title),
                React.createElement("hr", null),
                this.slots.map(function (time, slot) {
                    return React.createElement(ErrorBoundary_1.ErrorBoundary, null,
                        React.createElement(TimeSlot_1.TimeSlot, { slot: slot + 1, key: slot, text: time, defaultState: _this.isValid(slot + 1) ? 'Unselected' : 'Not-Available', onChange: function () { } }));
                }))));
    };
    return Day;
}(React.Component));
exports.Day = Day;

},{"./ErrorBoundary":2,"./TimeSlot":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
 * An element that represents an available time slot
 * @param slot the number of this time slot in 20 minute blocks
 * @param defaultState the default state Not-Available/Unselected
 * @callback onChange function run when the internal state changes<br>
 * params: (slot:number, state:string)
 */
var TimeSlot = /** @class */ (function (_super) {
    __extends(TimeSlot, _super);
    /**
     * Constructs a TestElement
     * @param props the object's properties
     */
    function TimeSlot(props) {
        var _this = _super.call(this, props) || this;
        //temporary for constructor
        var state = {
            state: undefined,
            slot: undefined,
            text: undefined
        };
        //check state and set
        if (_this.props.defaultState === 'Not-Available' ||
            _this.props.defaultState === 'Unselected') {
            state.state = _this.props.defaultState;
        }
        else {
            throw new Error("Failed to initialize time slot " + _this.props.slot + ", got defaultState=" + _this.props.defaultState);
        }
        //check slot and set
        if (_this.props.slot >= 1 && _this.props.slot <= 72) {
            state.slot = _this.props.slot;
        }
        else {
            throw new Error("Failed to initialize time slot, slot=" + _this.props.slot + " is not valid. Range: 1..72");
        }
        //check text and set
        if (_this.props.text.length > 0) {
            state.text = _this.props.text;
        }
        else {
            throw new Error("Failed to initialize time slot " + _this.props.slot + ", got text=" + _this.props.text);
        }
        _this.state = state;
        return _this;
    }
    /**
     * @return the color class to be used for this component
     */
    TimeSlot.prototype.getColor = function () {
        if (this.state.state === 'Not-Available')
            return 'grey lighten-1';
        if (this.state.state === 'Unselected')
            return 'white';
        if (this.state.state === 'Selected')
            return 'blue';
        //something must have failed
        throw new Error("Time slot " + this.state.slot + " was in state: " + this.state.state + " somehow");
    };
    /**
     * @return the text color class to be used for this component
     */
    TimeSlot.prototype.getTextColor = function () {
        if (this.state.state === 'Not-Available')
            return 'grey-text text-darken-1';
        if (this.state.state === 'Unselected')
            return 'black-text';
        if (this.state.state === 'Selected')
            return 'white-text';
        //something must have failed
        throw new Error("Time slot " + this.state.slot + " was in state: " + this.state.state + " somehow");
    };
    /**
     * Triggers whenever a mouse goes over this element
     * @param mouseEvent the mouse event from the hover
     */
    TimeSlot.prototype.mouseOver = function (mouseEvent) {
        //check if left click is held down
        //this is to allow a user to drag the mouse over slots to make it easier
        //to select multiple options
        if (mouseEvent.buttons === 1)
            this.onClick(mouseEvent);
    };
    /**
     *
     * @param mouseEvent the mouse event from the click
     */
    TimeSlot.prototype.onClick = function (mouseEvent) {
        if (this.state.state === 'Not-Available') {
            //do nothing if this time slot is not available
        }
        else if (this.state.state === 'Unselected') {
            //set selected
            this.setState({ state: 'Selected' });
            this.props.onChange(this.state.slot, 'Selected');
        }
        else if (this.state.state === 'Selected') {
            //set unselected
            this.setState({ state: 'Unselected' });
            this.props.onChange(this.state.slot, 'Unselected');
        }
    };
    /**
     * Renders the element
     * This is where you put the tsx
     */
    TimeSlot.prototype.render = function () {
        return (React.createElement("div", { className: "timeslot card center\n                    " + (this.state.state === 'Not-Available' ? '' : 'hoverable') + "\n                    " + this.getColor() + "\n                    " + this.getTextColor() + "\n                ", onClick: this.onClick.bind(this), onMouseOver: this.mouseOver.bind(this) },
            React.createElement("span", null, this.state.text)));
    };
    return TimeSlot;
}(React.Component));
exports.TimeSlot = TimeSlot;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbnRlcm1lZGlhdGUvRGF5LmpzIiwiaW50ZXJtZWRpYXRlL0Vycm9yQm91bmRhcnkuanMiLCJpbnRlcm1lZGlhdGUvVGltZVNsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIEVycm9yQm91bmRhcnlfMSA9IHJlcXVpcmUoXCIuL0Vycm9yQm91bmRhcnlcIik7XG52YXIgVGltZVNsb3RfMSA9IHJlcXVpcmUoXCIuL1RpbWVTbG90XCIpO1xuLyoqXG4gKiBBbiBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyBhbiBhdmFpbGFibGUgdGltZSBzbG90XG4gKiBAcGFyYW0gc2xvdCB0aGUgbnVtYmVyIG9mIHRoaXMgdGltZSBzbG90IGluIDIwIG1pbnV0ZSBibG9ja3NcbiAqIEBwYXJhbSBkZWZhdWx0U3RhdGUgdGhlIGRlZmF1bHQgc3RhdGUgTm90LUF2YWlsYWJsZS9VbnNlbGVjdGVkXG4gKiBAY2FsbGJhY2sgb25DaGFuZ2UgZnVuY3Rpb24gcnVuIHdoZW4gdGhlIGludGVybmFsIHN0YXRlIGNoYW5nZXM8YnI+XG4gKiBwYXJhbXM6IChzbG90Om51bWJlciwgc3RhdGU6c3RyaW5nKVxuICovXG52YXIgRGF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEYXksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRGF5KHByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgICAgICAvL3RlbXBvcmFyeSBmb3IgY29uc3RydWN0b3JcbiAgICAgICAgdmFyIHN0YXRlID0ge1xuICAgICAgICAgICAgdGl0bGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbGlkOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIC8vc2V0IGRhdGVcbiAgICAgICAgc3RhdGUuZGF0ZSA9IF90aGlzLnByb3BzLmRhdGU7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUuZGF0ZS5nZXREYXkoKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHN0YXRlLnRpdGxlID0gJ1N1bmRheSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgc3RhdGUudGl0bGUgPSAnTW9uZGF5JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzdGF0ZS50aXRsZSA9ICdUdWVzZGF5JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBzdGF0ZS50aXRsZSA9ICdXZWRuZXNkYXknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHN0YXRlLnRpdGxlID0gJ1RodXJzZGF5JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBzdGF0ZS50aXRsZSA9ICdGcmlkYXknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHN0YXRlLnRpdGxlID0gJ1NhdHVyZGF5JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihcIlNvbWVob3cgdGhlIERheSBjb21wb25lbnQgd2FzIGluaXRpYWxpemVkIG9uIGRheSBudW1iZXIgXCIgKyBzdGF0ZS5kYXRlLmdldERheSgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0ZSA9IHN0YXRlLmRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICB2YXIgZW5kaW5nO1xuICAgICAgICBpZiAoZGF0ZSA9PT0gMSlcbiAgICAgICAgICAgIGVuZGluZyA9ICdzdCc7XG4gICAgICAgIGlmIChkYXRlID09PSAyKVxuICAgICAgICAgICAgZW5kaW5nID0gJ25kJztcbiAgICAgICAgaWYgKGRhdGUgPT09IDMpXG4gICAgICAgICAgICBlbmRpbmcgPSAncmQnO1xuICAgICAgICBpZiAoZGF0ZSA+IDMpXG4gICAgICAgICAgICBlbmRpbmcgPSAndGgnO1xuICAgICAgICBzdGF0ZS50aXRsZSArPSAnIHRoZSAnICsgZGF0ZSArIGVuZGluZztcbiAgICAgICAgLy9nZW5lcmF0ZSBzbG90IGxpc3RcbiAgICAgICAgX3RoaXMuc2xvdHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaG91ciA9IDE7IGhvdXIgPD0gMjQ7IGhvdXIrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgbWludXRlID0gMDsgbWludXRlIDwgNjA7IG1pbnV0ZSArPSAyMCkge1xuICAgICAgICAgICAgICAgIHZhciBub3cgPSAoJzAnICsgaG91cikuc2xpY2UoLTIpICsgXCI6XCIgKyAoJzAnICsgbWludXRlKS5zbGljZSgtMik7XG4gICAgICAgICAgICAgICAgdmFyIGxhdGVySG91ciA9IG1pbnV0ZSArIDIwID09PSA2MCA/IGhvdXIgKyAxIDogaG91cjtcbiAgICAgICAgICAgICAgICB2YXIgbGF0ZXJNaW51dGUgPSBtaW51dGUgKyAyMCA9PT0gNjAgPyAwIDogbWludXRlICsgMjA7XG4gICAgICAgICAgICAgICAgdmFyIGxhdGVyID0gKCcwJyArIGxhdGVySG91cikuc2xpY2UoLTIpICsgXCI6XCIgKyAoJzAnICsgKGxhdGVyTWludXRlKSkuc2xpY2UoLTIpO1xuICAgICAgICAgICAgICAgIF90aGlzLnNsb3RzLnB1c2gobm93ICsgXCIgLSBcIiArIGxhdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5zbG90cyk7XG4gICAgICAgIF90aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0cyBlbnRpcmUgZGF5J3MgdmFsaWRpdHlcbiAgICAgKiBAcGFyYW0gdmFsaWQgd2hldGhlciBvciBub3QgaXQgaXMgdmFsaWRcbiAgICAgKi9cbiAgICBEYXkucHJvdG90eXBlLnNldFZhbGlkID0gZnVuY3Rpb24gKHZhbGlkKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZDogdmFsaWQgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzbG90IHRoZSBzbG90IGJlaW5nIGNob3NlblxuICAgICAqIEByZXR1cm4gd2hldGhlciB0aGlzIHNsb3QgaXMgYSB2YWxpZCBjaG9pY2VcbiAgICAgKi9cbiAgICBEYXkucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbiAoc2xvdCkge1xuICAgICAgICAvL2Z1bGwgZGF5IGludmFsaWRcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnZhbGlkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvL2ludmFsaWQgdGltZVxuICAgICAgICBpZiAoc2xvdCA8PSAxMilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHNsb3QgPj0gNjgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChzbG90ID49IDM0ICYmIHNsb3QgPD0gMzYpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vaW52YWxpZCBkYXRlXG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5zdGF0ZS5kYXRlO1xuICAgICAgICAvL0RlYyAyNVxuICAgICAgICBpZiAoZGF0ZS5nZXRNb250aCgpID09PSAxMSAmJiBkYXRlLmdldERhdGUoKSA9PT0gMjUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vSmFuIDFcbiAgICAgICAgaWYgKGRhdGUuZ2V0TW9udGgoKSA9PT0gMCAmJiBkYXRlLmdldERhdGUoKSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy9KdWx5IDRcbiAgICAgICAgaWYgKGRhdGUuZ2V0TW9udGgoKSA9PT0gNiAmJiBkYXRlLmdldERhdGUoKSA9PT0gNClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRoZSBlbGVtZW50XG4gICAgICogVGhpcyBpcyB3aGVyZSB5b3UgcHV0IHRoZSB0c3hcbiAgICAgKi9cbiAgICBEYXkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImNvbCBzMTIgbTQgbDJcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJjYXJkLXBhbmVsIGNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImg2XCIsIG51bGwsIHRoaXMuc3RhdGUudGl0bGUpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoclwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLm1hcChmdW5jdGlvbiAodGltZSwgc2xvdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChFcnJvckJvdW5kYXJ5XzEuRXJyb3JCb3VuZGFyeSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGltZVNsb3RfMS5UaW1lU2xvdCwgeyBzbG90OiBzbG90ICsgMSwga2V5OiBzbG90LCB0ZXh0OiB0aW1lLCBkZWZhdWx0U3RhdGU6IF90aGlzLmlzVmFsaWQoc2xvdCArIDEpID8gJ1Vuc2VsZWN0ZWQnIDogJ05vdC1BdmFpbGFibGUnLCBvbkNoYW5nZTogZnVuY3Rpb24gKCkgeyB9IH0pKTtcbiAgICAgICAgICAgICAgICB9KSkpKTtcbiAgICB9O1xuICAgIHJldHVybiBEYXk7XG59KFJlYWN0LkNvbXBvbmVudCkpO1xuZXhwb3J0cy5EYXkgPSBEYXk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuLyoqXG4gKiBSZXBsYWNlcyBhIGZhaWxlZCBlbGVtZW50IHN0YWNrIHdpdGggYW4gZWFzaWVyIHRvIHVuZGVyc3RhbmQgYmlnIHJlZCBzcXVhcmVcbiAqIGNvbnRhaW5zIGEgc3RhY2sgdHJhY2UgYW5kIHRoZSBlcnJvclxuICovXG52YXIgRXJyb3JCb3VuZGFyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRXJyb3JCb3VuZGFyeSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIEVycm9yQm91bmRhcnkgd3JhcHBlclxuICAgICAqIEBwYXJhbSBwcm9wcyBzaG91bGQgbm90IHJlY2VpdmUgYW55IHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFcnJvckJvdW5kYXJ5KHByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgZXJyb3JJbmZvOiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIGFueSBlcnJvciBvY2N1cnMgaW4gZWxlbWVudHMgYmVuZWF0aCBpdFxuICAgICAqIEBwYXJhbSBlcnJvclxuICAgICAqIEBwYXJhbSBlcnJvckluZm9cbiAgICAgKi9cbiAgICBFcnJvckJvdW5kYXJ5LnByb3RvdHlwZS5jb21wb25lbnREaWRDYXRjaCA9IGZ1bmN0aW9uIChlcnJvciwgZXJyb3JJbmZvKSB7XG4gICAgICAgIC8vZ2V0IG1hZCFcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICBlcnJvckluZm86IGVycm9ySW5mb1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEVycm9yQm91bmRhcnkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9pZiBpdCBzaG91bGQgZ2V0IG1hZFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lcnJvckluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJjYXJkLXBhbmVsIHJlZCB3aGl0ZS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDVcIiwgbnVsbCwgXCJSZWFjdCBjb21wb25lbnQgZmFpbGVkIVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGV0YWlsc1wiLCB7IHN0eWxlOiB7IHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVycm9yICYmIHRoaXMuc3RhdGUuZXJyb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5lcnJvckluZm8uY29tcG9uZW50U3RhY2spKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9iZWZvcmUgYmVpbmcgYW5nZXJlZCwgcmVuZGVyIG5vcm1hbGx5XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH07XG4gICAgcmV0dXJuIEVycm9yQm91bmRhcnk7XG59KFJlYWN0LkNvbXBvbmVudCkpO1xuZXhwb3J0cy5FcnJvckJvdW5kYXJ5ID0gRXJyb3JCb3VuZGFyeTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG4vKipcbiAqIEFuIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIGFuIGF2YWlsYWJsZSB0aW1lIHNsb3RcbiAqIEBwYXJhbSBzbG90IHRoZSBudW1iZXIgb2YgdGhpcyB0aW1lIHNsb3QgaW4gMjAgbWludXRlIGJsb2Nrc1xuICogQHBhcmFtIGRlZmF1bHRTdGF0ZSB0aGUgZGVmYXVsdCBzdGF0ZSBOb3QtQXZhaWxhYmxlL1Vuc2VsZWN0ZWRcbiAqIEBjYWxsYmFjayBvbkNoYW5nZSBmdW5jdGlvbiBydW4gd2hlbiB0aGUgaW50ZXJuYWwgc3RhdGUgY2hhbmdlczxicj5cbiAqIHBhcmFtczogKHNsb3Q6bnVtYmVyLCBzdGF0ZTpzdHJpbmcpXG4gKi9cbnZhciBUaW1lU2xvdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGltZVNsb3QsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFRlc3RFbGVtZW50XG4gICAgICogQHBhcmFtIHByb3BzIHRoZSBvYmplY3QncyBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gVGltZVNsb3QocHJvcHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XG4gICAgICAgIC8vdGVtcG9yYXJ5IGZvciBjb25zdHJ1Y3RvclxuICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2xvdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGV4dDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIC8vY2hlY2sgc3RhdGUgYW5kIHNldFxuICAgICAgICBpZiAoX3RoaXMucHJvcHMuZGVmYXVsdFN0YXRlID09PSAnTm90LUF2YWlsYWJsZScgfHxcbiAgICAgICAgICAgIF90aGlzLnByb3BzLmRlZmF1bHRTdGF0ZSA9PT0gJ1Vuc2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZSA9IF90aGlzLnByb3BzLmRlZmF1bHRTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplIHRpbWUgc2xvdCBcIiArIF90aGlzLnByb3BzLnNsb3QgKyBcIiwgZ290IGRlZmF1bHRTdGF0ZT1cIiArIF90aGlzLnByb3BzLmRlZmF1bHRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jaGVjayBzbG90IGFuZCBzZXRcbiAgICAgICAgaWYgKF90aGlzLnByb3BzLnNsb3QgPj0gMSAmJiBfdGhpcy5wcm9wcy5zbG90IDw9IDcyKSB7XG4gICAgICAgICAgICBzdGF0ZS5zbG90ID0gX3RoaXMucHJvcHMuc2xvdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplIHRpbWUgc2xvdCwgc2xvdD1cIiArIF90aGlzLnByb3BzLnNsb3QgKyBcIiBpcyBub3QgdmFsaWQuIFJhbmdlOiAxLi43MlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NoZWNrIHRleHQgYW5kIHNldFxuICAgICAgICBpZiAoX3RoaXMucHJvcHMudGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdGF0ZS50ZXh0ID0gX3RoaXMucHJvcHMudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplIHRpbWUgc2xvdCBcIiArIF90aGlzLnByb3BzLnNsb3QgKyBcIiwgZ290IHRleHQ9XCIgKyBfdGhpcy5wcm9wcy50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gdGhlIGNvbG9yIGNsYXNzIHRvIGJlIHVzZWQgZm9yIHRoaXMgY29tcG9uZW50XG4gICAgICovXG4gICAgVGltZVNsb3QucHJvdG90eXBlLmdldENvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ05vdC1BdmFpbGFibGUnKVxuICAgICAgICAgICAgcmV0dXJuICdncmV5IGxpZ2h0ZW4tMSc7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXRlID09PSAnVW5zZWxlY3RlZCcpXG4gICAgICAgICAgICByZXR1cm4gJ3doaXRlJztcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhdGUgPT09ICdTZWxlY3RlZCcpXG4gICAgICAgICAgICByZXR1cm4gJ2JsdWUnO1xuICAgICAgICAvL3NvbWV0aGluZyBtdXN0IGhhdmUgZmFpbGVkXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbWUgc2xvdCBcIiArIHRoaXMuc3RhdGUuc2xvdCArIFwiIHdhcyBpbiBzdGF0ZTogXCIgKyB0aGlzLnN0YXRlLnN0YXRlICsgXCIgc29tZWhvd1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gdGhlIHRleHQgY29sb3IgY2xhc3MgdG8gYmUgdXNlZCBmb3IgdGhpcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBUaW1lU2xvdC5wcm90b3R5cGUuZ2V0VGV4dENvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ05vdC1BdmFpbGFibGUnKVxuICAgICAgICAgICAgcmV0dXJuICdncmV5LXRleHQgdGV4dC1kYXJrZW4tMSc7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXRlID09PSAnVW5zZWxlY3RlZCcpXG4gICAgICAgICAgICByZXR1cm4gJ2JsYWNrLXRleHQnO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ1NlbGVjdGVkJylcbiAgICAgICAgICAgIHJldHVybiAnd2hpdGUtdGV4dCc7XG4gICAgICAgIC8vc29tZXRoaW5nIG11c3QgaGF2ZSBmYWlsZWRcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGltZSBzbG90IFwiICsgdGhpcy5zdGF0ZS5zbG90ICsgXCIgd2FzIGluIHN0YXRlOiBcIiArIHRoaXMuc3RhdGUuc3RhdGUgKyBcIiBzb21laG93XCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgd2hlbmV2ZXIgYSBtb3VzZSBnb2VzIG92ZXIgdGhpcyBlbGVtZW50XG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQgdGhlIG1vdXNlIGV2ZW50IGZyb20gdGhlIGhvdmVyXG4gICAgICovXG4gICAgVGltZVNsb3QucHJvdG90eXBlLm1vdXNlT3ZlciA9IGZ1bmN0aW9uIChtb3VzZUV2ZW50KSB7XG4gICAgICAgIC8vY2hlY2sgaWYgbGVmdCBjbGljayBpcyBoZWxkIGRvd25cbiAgICAgICAgLy90aGlzIGlzIHRvIGFsbG93IGEgdXNlciB0byBkcmFnIHRoZSBtb3VzZSBvdmVyIHNsb3RzIHRvIG1ha2UgaXQgZWFzaWVyXG4gICAgICAgIC8vdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnNcbiAgICAgICAgaWYgKG1vdXNlRXZlbnQuYnV0dG9ucyA9PT0gMSlcbiAgICAgICAgICAgIHRoaXMub25DbGljayhtb3VzZUV2ZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQgdGhlIG1vdXNlIGV2ZW50IGZyb20gdGhlIGNsaWNrXG4gICAgICovXG4gICAgVGltZVNsb3QucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbiAobW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ05vdC1BdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAvL2RvIG5vdGhpbmcgaWYgdGhpcyB0aW1lIHNsb3QgaXMgbm90IGF2YWlsYWJsZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuc3RhdGUgPT09ICdVbnNlbGVjdGVkJykge1xuICAgICAgICAgICAgLy9zZXQgc2VsZWN0ZWRcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdGF0ZTogJ1NlbGVjdGVkJyB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZS5zbG90LCAnU2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLnN0YXRlID09PSAnU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAvL3NldCB1bnNlbGVjdGVkXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGU6ICdVbnNlbGVjdGVkJyB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZS5zbG90LCAnVW5zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRoZSBlbGVtZW50XG4gICAgICogVGhpcyBpcyB3aGVyZSB5b3UgcHV0IHRoZSB0c3hcbiAgICAgKi9cbiAgICBUaW1lU2xvdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGltZXNsb3QgY2FyZCBjZW50ZXJcXG4gICAgICAgICAgICAgICAgICAgIFwiICsgKHRoaXMuc3RhdGUuc3RhdGUgPT09ICdOb3QtQXZhaWxhYmxlJyA/ICcnIDogJ2hvdmVyYWJsZScpICsgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiICsgdGhpcy5nZXRDb2xvcigpICsgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiICsgdGhpcy5nZXRUZXh0Q29sb3IoKSArIFwiXFxuICAgICAgICAgICAgICAgIFwiLCBvbkNsaWNrOiB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwgb25Nb3VzZU92ZXI6IHRoaXMubW91c2VPdmVyLmJpbmQodGhpcykgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMuc3RhdGUudGV4dCkpKTtcbiAgICB9O1xuICAgIHJldHVybiBUaW1lU2xvdDtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLlRpbWVTbG90ID0gVGltZVNsb3Q7XG4iXX0=
