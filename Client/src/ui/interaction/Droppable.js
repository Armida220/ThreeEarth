import { Interaction } from '../Interaction';
import { Control } from '../Control';

function Droppable(options) {
    Interaction.call(this, options);
    options = options || {};
    this.dispatch = d3.dispatch('drop');
    this.accept = options.accept || '*';
    this.classes = options.classes || {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
    };
}

Droppable.prototype = Object.create(Interaction.prototype);
Droppable.prototype.constructor = Droppable;

Droppable.prototype.apply = function (control) {
    this.target = control instanceof Control ? control.el : control;
    $(this.target).droppable();

    var _this = this;
    $(this.target).droppable({
        accept: this.accept,
        classes: this.classes,
        drop: function (event, ui) {
            _this.dispatch.call('drop', _this, event, ui);
        }
    });
};

Droppable.prototype.on = function (eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { Droppable };