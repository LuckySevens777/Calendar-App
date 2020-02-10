"use strict";
exports.__esModule = true;
//libraries
var Material = require("materialize-css");


//react elements
var ErrorBoundary_1 = require("./ErrorBoundary");
var Day_1 = require("./Day");
//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    var now = new Date();
    //render react test element
    ReactDOM.render(React.createElement("div", null,
        React.createElement(ErrorBoundary_1.ErrorBoundary, null,
            React.createElement(Day_1.Day, { date: now, onChange: function () { } })),
        React.createElement(ErrorBoundary_1.ErrorBoundary, null,
            React.createElement(Day_1.Day, { date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1), onChange: function () { } })),
        React.createElement(ErrorBoundary_1.ErrorBoundary, null,
            React.createElement(Day_1.Day, { date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2), onChange: function () { } })),
        React.createElement(ErrorBoundary_1.ErrorBoundary, null,
            React.createElement(Day_1.Day, { date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3), onChange: function () { } })),
        React.createElement(ErrorBoundary_1.ErrorBoundary, null,
            React.createElement(Day_1.Day, { date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4), onChange: function () { } })),
        React.createElement(ErrorBoundary_1.ErrorBoundary, null,
            React.createElement(Day_1.Day, { date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5), onChange: function () { } }))), document.getElementById('react-root'));
    //initialize material items
    Material.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    Material.Sidenav.init(document.querySelectorAll('.sidenav'), {});
});
