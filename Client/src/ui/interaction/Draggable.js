import { Interaction } from '../Interaction';
import { Control } from '../Control';

function Draggable(options) {
    Interaction.call(this, options);
    options = options || {};

    this.dispatch = d3.dispatch('start', 'drag', 'stop');

    this.scroll = options.scroll || true;
    this.scrollSensitivity = options.scrollSensitivity || null;
    this.scrollSpeed = options.scrollSpeed || null;
    this.axis = options.axis || null; // 'x' or 'y'
    this.containment = options.containment || null; // '#containment-wrapper' or 'parent'
    this.cursor = options.cursor || null; // 'move', 'crosshair', ...
    this.cursorAt = options.cursorAt || null; // { left: -5, top: -5 } or { bottom: 0 }
}

Draggable.prototype = Object.create(Interaction.prototype);
Draggable.prototype.constructor = Draggable;

Draggable.prototype.apply = function (control) {
    var el = control instanceof Control ? control.el : control;
    var _this = this;
    $(el).draggable({
        scroll: this.scroll,
        scrollSensitivity: this.scrollSensitivity,
        scrollSpeed: this.scrollSpeed,
        axis: this.axis,
        containment: this.containment,
        cursor: this.cursor,
        cursorAt: this.cursorAt,
        start: function () {
            _this.dispatch.call('start', _this);
        },
        drag: function () {
            _this.dispatch.call('drag', _this);
        },
        stop: function () {
            _this.dispatch.call('stop', _this);
        }
    });
};

Draggable.prototype.on = function (eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { Draggable };