import { Control } from '../Control';

function MenuItem(options) {
    Control.call(this, options);
    options = options || {};
    this.id = options.id || 'menuitem' + MenuItem.index--;
    this.text = options.text || 'Menu Item';
    this.event = options.event || null;
    this.cls = options.cls || null;
    this.subCls = options.subCls || null;
    this.children = options.children || [];
}

MenuItem.prototype = Object.create(Control.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
    this.el.li = document.createElement('li');
    this.el.li.setAttribute('id', this.id);
    this.el.li.className = this.cls;
    this.el.li.event = this.event;
    this.el.div = document.createElement('div');
    this.el.div.innerHTML = this.text;
    this.el.li.appendChild(this.el.div);
    this.parent.appendChild(this.el.li);
    if (this.children.length == 0) {
        return;
    }
    this.el.ul = document.createElement('ul');
    if (this.subCls) {
        this.el.ul.className = this.subCls;
    }
    this.el.li.appendChild(this.el.ul);
    var _this = this;
    this.children.forEach(function (n) {
        n.parent = _this.el.ul;
        n.render.call(n);
    });
};

MenuItem.index = -1;

export { MenuItem };