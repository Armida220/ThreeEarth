import { TextField } from './TextField';

function CheckboxField(options) {
    TextField.call(this, options);
    this.type = 'checkbox';
}

CheckboxField.prototype = Object.create(TextField.prototype);
CheckboxField.prototype.constructor = CheckboxField;

CheckboxField.prototype.getValue = function () {
    return this.el.input.checked;
};

export { CheckboxField };