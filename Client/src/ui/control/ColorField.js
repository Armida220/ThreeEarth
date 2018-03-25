import { TextField } from './TextField';

function ColorField(options) {
    TextField.call(this, options);
    this.type = 'color';
}

ColorField.prototype = Object.create(TextField.prototype);
ColorField.prototype.constructor = ColorField;

export { ColorField };