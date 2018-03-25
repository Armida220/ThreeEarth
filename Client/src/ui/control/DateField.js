import { TextField } from './TextField';

function DateField(options) {
    TextField.call(this, options);
    this.type = 'date';
}

DateField.prototype = Object.create(TextField.prototype);
DateField.prototype.constructor = DateField;

export { DateField };