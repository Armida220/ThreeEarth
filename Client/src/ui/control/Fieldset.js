import { Control } from '../Control';

function Fieldset(options) {
    Control.call(this, options);
    options = options || {};
    this.title = options.title || null;
    this.children = options.children || [];
}

Fieldset.prototype = Object.create(Control.prototype);
Fieldset.prototype.constructor = Fieldset;

Fieldset.prototype.add = function (control) {
    control.parent = this.el.fieldset;
    this.children.push(control);
    control.render.call(control);
};

Fieldset.prototype.render = function () {
    this.el.fieldset = document.createElement('fieldset');
    this.parent.appendChild(this.el.fieldset);

    if (this.title) {
        this.el.legend = document.createElement('legend');
        this.el.legend.innerHTML = this.title;
        this.el.fieldset.appendChild(this.el.legend);
    }

    var _this = this;
    this.children.forEach(function (n, i) {
        n.parent = _this.el.fieldset;
        n.render.call(n);
    });
};

export { Fieldset };