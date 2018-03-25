import { Control } from '../Control';

function Dialog(options) {
    Control.call(this, options);
    options = options || {};
    this.title = options.title || 'Dialog';
    this.width = options.width || 300;
    this.height = options.height || 'auto';
    this.html = options.html || null;
    this.children = options.children || [];
}

Dialog.prototype = Object.create(Control.prototype);
Dialog.prototype.constructor = Dialog;

Dialog.prototype.render = function () {
    this.el.div = document.createElement('div');
    this.el.div.setAttribute('title', this.title);
    this.el.div.innerHTML = this.html;
    this.parent.appendChild(this.el.div);
    var _this = this;
    this.children.forEach(function (n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
    $(this.el.div).dialog({
        width: this.width,
        height: this.height
    });
};

Dialog.prototype.show = function () {
    $(this.el.div).dialog('open');
};

Dialog.prototype.hide = function () {
    $(this.el.div).dialog('close');
};

export { Dialog };