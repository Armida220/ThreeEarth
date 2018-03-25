import { Control } from '../Control';

function Button(options) {
    Control.call(this, options);
    options = options || {};
    this.text = options.text || 'Button';
}

Button.prototype = Object.create(Control.prototype);
Button.prototype.constructor = Button;

Button.prototype.render = function () {
    this.el.button = document.createElement('button');
    this.el.button.innerHTML = this.text;
    this.parent.appendChild(this.el.button);
    $(this.el.button).button();
};

export { Button };