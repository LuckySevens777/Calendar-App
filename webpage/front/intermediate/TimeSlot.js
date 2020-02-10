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
