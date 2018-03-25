import { Control } from '../Control';

function SelectMenu(options) {
    Control.call(this, options);
    options = options || {};
    this.children = options.children || [];
}

SelectMenu.prototype = Object.create(Control.prototype);
SelectMenu.prototype.constructor = SelectMenu;

SelectMenu.prototype.render = function () {
    this.el.select = document.createElement('select');
    this.parent.appendChild(this.el.select);
    var _this = this;
    this.children.forEach(function (n) {
        n.parent = _this.el.select;
        n.render.call(n);
    });
    $(this.el.select).selectmenu();
};

export { SelectMenu };