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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbnRlcm1lZGlhdGUvVGltZVNsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG4vKipcbiAqIEFuIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIGFuIGF2YWlsYWJsZSB0aW1lIHNsb3RcbiAqIEBwYXJhbSBzbG90IHRoZSBudW1iZXIgb2YgdGhpcyB0aW1lIHNsb3QgaW4gMjAgbWludXRlIGJsb2Nrc1xuICogQHBhcmFtIGRlZmF1bHRTdGF0ZSB0aGUgZGVmYXVsdCBzdGF0ZSBOb3QtQXZhaWxhYmxlL1Vuc2VsZWN0ZWRcbiAqIEBjYWxsYmFjayBvbkNoYW5nZSBmdW5jdGlvbiBydW4gd2hlbiB0aGUgaW50ZXJuYWwgc3RhdGUgY2hhbmdlczxicj5cbiAqIHBhcmFtczogKHNsb3Q6bnVtYmVyLCBzdGF0ZTpzdHJpbmcpXG4gKi9cbnZhciBUaW1lU2xvdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGltZVNsb3QsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFRlc3RFbGVtZW50XG4gICAgICogQHBhcmFtIHByb3BzIHRoZSBvYmplY3QncyBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gVGltZVNsb3QocHJvcHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XG4gICAgICAgIC8vdGVtcG9yYXJ5IGZvciBjb25zdHJ1Y3RvclxuICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2xvdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGV4dDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIC8vY2hlY2sgc3RhdGUgYW5kIHNldFxuICAgICAgICBpZiAoX3RoaXMucHJvcHMuZGVmYXVsdFN0YXRlID09PSAnTm90LUF2YWlsYWJsZScgfHxcbiAgICAgICAgICAgIF90aGlzLnByb3BzLmRlZmF1bHRTdGF0ZSA9PT0gJ1Vuc2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZSA9IF90aGlzLnByb3BzLmRlZmF1bHRTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplIHRpbWUgc2xvdCBcIiArIF90aGlzLnByb3BzLnNsb3QgKyBcIiwgZ290IGRlZmF1bHRTdGF0ZT1cIiArIF90aGlzLnByb3BzLmRlZmF1bHRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jaGVjayBzbG90IGFuZCBzZXRcbiAgICAgICAgaWYgKF90aGlzLnByb3BzLnNsb3QgPj0gMSAmJiBfdGhpcy5wcm9wcy5zbG90IDw9IDcyKSB7XG4gICAgICAgICAgICBzdGF0ZS5zbG90ID0gX3RoaXMucHJvcHMuc2xvdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplIHRpbWUgc2xvdCwgc2xvdD1cIiArIF90aGlzLnByb3BzLnNsb3QgKyBcIiBpcyBub3QgdmFsaWQuIFJhbmdlOiAxLi43MlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NoZWNrIHRleHQgYW5kIHNldFxuICAgICAgICBpZiAoX3RoaXMucHJvcHMudGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdGF0ZS50ZXh0ID0gX3RoaXMucHJvcHMudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplIHRpbWUgc2xvdCBcIiArIF90aGlzLnByb3BzLnNsb3QgKyBcIiwgZ290IHRleHQ9XCIgKyBfdGhpcy5wcm9wcy50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gdGhlIGNvbG9yIGNsYXNzIHRvIGJlIHVzZWQgZm9yIHRoaXMgY29tcG9uZW50XG4gICAgICovXG4gICAgVGltZVNsb3QucHJvdG90eXBlLmdldENvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ05vdC1BdmFpbGFibGUnKVxuICAgICAgICAgICAgcmV0dXJuICdncmV5IGxpZ2h0ZW4tMSc7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXRlID09PSAnVW5zZWxlY3RlZCcpXG4gICAgICAgICAgICByZXR1cm4gJ3doaXRlJztcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhdGUgPT09ICdTZWxlY3RlZCcpXG4gICAgICAgICAgICByZXR1cm4gJ2JsdWUnO1xuICAgICAgICAvL3NvbWV0aGluZyBtdXN0IGhhdmUgZmFpbGVkXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbWUgc2xvdCBcIiArIHRoaXMuc3RhdGUuc2xvdCArIFwiIHdhcyBpbiBzdGF0ZTogXCIgKyB0aGlzLnN0YXRlLnN0YXRlICsgXCIgc29tZWhvd1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gdGhlIHRleHQgY29sb3IgY2xhc3MgdG8gYmUgdXNlZCBmb3IgdGhpcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBUaW1lU2xvdC5wcm90b3R5cGUuZ2V0VGV4dENvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ05vdC1BdmFpbGFibGUnKVxuICAgICAgICAgICAgcmV0dXJuICdncmV5LXRleHQgdGV4dC1kYXJrZW4tMSc7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXRlID09PSAnVW5zZWxlY3RlZCcpXG4gICAgICAgICAgICByZXR1cm4gJ2JsYWNrLXRleHQnO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ1NlbGVjdGVkJylcbiAgICAgICAgICAgIHJldHVybiAnd2hpdGUtdGV4dCc7XG4gICAgICAgIC8vc29tZXRoaW5nIG11c3QgaGF2ZSBmYWlsZWRcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGltZSBzbG90IFwiICsgdGhpcy5zdGF0ZS5zbG90ICsgXCIgd2FzIGluIHN0YXRlOiBcIiArIHRoaXMuc3RhdGUuc3RhdGUgKyBcIiBzb21laG93XCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgd2hlbmV2ZXIgYSBtb3VzZSBnb2VzIG92ZXIgdGhpcyBlbGVtZW50XG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQgdGhlIG1vdXNlIGV2ZW50IGZyb20gdGhlIGhvdmVyXG4gICAgICovXG4gICAgVGltZVNsb3QucHJvdG90eXBlLm1vdXNlT3ZlciA9IGZ1bmN0aW9uIChtb3VzZUV2ZW50KSB7XG4gICAgICAgIC8vY2hlY2sgaWYgbGVmdCBjbGljayBpcyBoZWxkIGRvd25cbiAgICAgICAgLy90aGlzIGlzIHRvIGFsbG93IGEgdXNlciB0byBkcmFnIHRoZSBtb3VzZSBvdmVyIHNsb3RzIHRvIG1ha2UgaXQgZWFzaWVyXG4gICAgICAgIC8vdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnNcbiAgICAgICAgaWYgKG1vdXNlRXZlbnQuYnV0dG9ucyA9PT0gMSlcbiAgICAgICAgICAgIHRoaXMub25DbGljayhtb3VzZUV2ZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQgdGhlIG1vdXNlIGV2ZW50IGZyb20gdGhlIGNsaWNrXG4gICAgICovXG4gICAgVGltZVNsb3QucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbiAobW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gJ05vdC1BdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAvL2RvIG5vdGhpbmcgaWYgdGhpcyB0aW1lIHNsb3QgaXMgbm90IGF2YWlsYWJsZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuc3RhdGUgPT09ICdVbnNlbGVjdGVkJykge1xuICAgICAgICAgICAgLy9zZXQgc2VsZWN0ZWRcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdGF0ZTogJ1NlbGVjdGVkJyB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZS5zbG90LCAnU2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLnN0YXRlID09PSAnU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAvL3NldCB1bnNlbGVjdGVkXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGU6ICdVbnNlbGVjdGVkJyB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZS5zbG90LCAnVW5zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRoZSBlbGVtZW50XG4gICAgICogVGhpcyBpcyB3aGVyZSB5b3UgcHV0IHRoZSB0c3hcbiAgICAgKi9cbiAgICBUaW1lU2xvdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGltZXNsb3QgY2FyZCBjZW50ZXJcXG4gICAgICAgICAgICAgICAgICAgIFwiICsgKHRoaXMuc3RhdGUuc3RhdGUgPT09ICdOb3QtQXZhaWxhYmxlJyA/ICcnIDogJ2hvdmVyYWJsZScpICsgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiICsgdGhpcy5nZXRDb2xvcigpICsgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiICsgdGhpcy5nZXRUZXh0Q29sb3IoKSArIFwiXFxuICAgICAgICAgICAgICAgIFwiLCBvbkNsaWNrOiB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwgb25Nb3VzZU92ZXI6IHRoaXMubW91c2VPdmVyLmJpbmQodGhpcykgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMuc3RhdGUudGV4dCkpKTtcbiAgICB9O1xuICAgIHJldHVybiBUaW1lU2xvdDtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLlRpbWVTbG90ID0gVGltZVNsb3Q7XG4iXX0=
