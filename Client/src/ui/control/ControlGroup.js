import { Control } from '../Control';

function ControlGroup(options) {
    Control.call(this, options);
    options = options || {};
    this.children = options.children || [];
    this.direction = options.direction || 'vertical'; // horizontal, vertical
}

ControlGroup.prototype = Object.create(Control.prototype);
ControlGroup.prototype.constructor = ControlGroup;

ControlGroup.prototype.render = function () {
    this.el.div = document.createElement('div');
    this.parent.appendChild(this.el.div);
    var _this = this;
    this.children.forEach(function (n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
    $(this.el.div).ControlGroup({
        direction: this.direction
    });
};

export { ControlGroup };