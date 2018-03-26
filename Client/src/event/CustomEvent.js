import { dispatch } from '../third_party';
import { CustomEventNames } from './CustomEventNames';
import { BaseEvent } from './BaseEvent';

function CustomEvent(options) {
    BaseEvent.call(this, options);
    this.dispatch = dispatch.apply(dispatch, CustomEventNames);
    this.events = [
        //new HoverObjectEvent3D(app),
        //new SelectObjectEvent3D(app),
    ];
    this.app.CustomEventNames = CustomEventNames;
    this.app.events = this.events;
    this.app.dispatch = this.dispatch;
}

CustomEvent.prototype.start = function () {
    this.events.forEach(function (n) {
        if (!n instanceof BaseEvent) {
            throw 'CustomEvent: n is not an instance of BaseEvent.';
        }
        n.start();
    });
};

CustomEvent.prototype.stop = function () {
    this.events.forEach(function (n) {
        n.stop();
    });
};

CustomEvent.prototype.call = function (eventName) {
    var args = [arguments[0], this];
    for (var i = 1; i < arguments.length; i++) {
        args[i + 1] = arguments[i];
    }
    this.dispatch.call.apply(this.dispatch, args);
};

CustomEvent.prototype.on = function (eventName, callback) {
    this.dispatch.on(eventName, callback);
};

CustomEvent.prototype.addEvent = function (event) {
    if (!event instanceof BaseEvent) {
        throw 'CustomEvent: event is not an instanceof BaseEvent.';
    }
    this.events.push(event);
};

CustomEvent.prototype.removeEvent = function (event) {
    var index = this.events.indexOf(event);
    if (index > -1) {
        this.events.splice(index, 1);
    }
};

export { CustomEvent };