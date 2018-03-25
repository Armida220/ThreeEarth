import { Control } from '../Control';

function Slider(options) {
    Control.call(this, options);
    options = options || {};
    this.width = options.width || '200px';
}

Slider.prototype = Object.create(Control.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.render = function () {
    this.el.div = document.createElement('div');
    this.el.div.style.width = this.width;
    this.parent.appendChild(this.el.div);
    $(this.el.div).slider();
};

export { Slider };