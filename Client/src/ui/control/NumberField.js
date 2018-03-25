import { TextField } from './TextField';

function NumberField(options) {
    TextField.call(this, options);
    this.type = 'number';
}

NumberField.prototype = Object.create(TextField.prototype);
NumberField.prototype.constructor = NumberField;

export { NumberField };