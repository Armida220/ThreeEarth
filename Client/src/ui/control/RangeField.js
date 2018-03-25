import { TextField } from './TextField';

function RangeField(options) {
    TextField.call(this, options);
    this.type = 'range';
}

RangeField.prototype = Object.create(TextField.prototype);
RangeField.prototype.constructor = RangeField;

export { RangeField };