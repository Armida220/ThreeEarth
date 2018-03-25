import { Control } from './Control';

function Container(options) {
    Control.call(this, options);

    options = options || {};
    this.children = options.children || [];
}

Container.prototype = Object.create(Control.prototype);
Container.prototype.constructor = Container;

Container.prototype.add = function (control) {
    this.children.push(control);
};

Container.prototype.insert = function (index, control) {
    this.children.splice(index, 0, control);
};

Container.prototype.remove = function (control) {
    var index = this.children.indexOf(control);
    if (index > -1) {
        this.removeAt(index);
    }
};

Container.prototype.removeAt = function (index) {
    this.children.splice(index, 1);
};

Container.prototype.render = function () {
    this.el = document.createElement('div');
    var _this = this;
    this.children.forEach(function (n, i) {
        n.parent = _this.el;
        n.render.call(n);
    });
};

export { Container };