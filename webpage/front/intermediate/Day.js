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
