import { Control } from '../Control';

function DatePicker(options) {
    Control.call(this, options);
    options = options || {};
}

DatePicker.prototype = Object.create(Control.prototype);
DatePicker.prototype.constructor = DatePicker;

DatePicker.prototype.render = function () {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).datepicker();
};

export { DatePicker };