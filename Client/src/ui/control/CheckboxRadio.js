import { Control } from '../Control';

function CheckboxRadio(options) {
    Control.call(this, options);
    options = options || {};
    this.text = options.text || 'Label';
    this.type = options.type || 'radio'; // radio, checkbox
}

CheckboxRadio.prototype = Object.create(Control.prototype);
CheckboxRadio.prototype.constructor = CheckboxRadio;

CheckboxRadio.prototype.render = function () {
    var index = CheckboxRadio.index++;
    this.el.label = document.createElement('label');
    this.el.label.setAttribute('for', this.type + index);
    this.el.label.innerHTML = this.text;
    this.parent.appendChild(this.el.label);

    this.el.input = document.createElement('input');
    this.el.input.type = this.type;
    this.el.input.id = this.type + index;
    this.el.input.name = this.type + index;
    this.parent.appendChild(this.el.input);

    $(this.el.input).checkboxradio();
};

CheckboxRadio.index = 1;

export { CheckboxRadio };