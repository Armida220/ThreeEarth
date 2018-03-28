import { Control } from '../Control';

function Dialog(options) {
    Control.call(this, options);
    options = options || {};
    this.title = options.title || 'Dialog';
    this.width = options.width || 300;
    this.height = options.height || 'auto';
    this.html = options.html || null;
    this.children = options.children || [];
    this.buttons = options.buttons || []; // { text: '', icon: '', click: function() {} }
    this.bodyStyle = options.bodyStyle || null;
}

Dialog.prototype = Object.create(Control.prototype);
Dialog.prototype.constructor = Dialog;

Dialog.prototype.render = function () {
    this.el.div = document.createElement('div');
    this.el.div.setAttribute('title', this.title);
    this.el.div.innerHTML = this.html;
    if (this.bodyStyle) {
        this.el.div.style = this.bodyStyle;
    }
    this.parent.appendChild(this.el.div);
    var _this = this;
    this.children.forEach(function (n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
    $(this.el.div).dialog({
        width: this.width,
        height: this.height,
        buttons: this.buttons
    });
};

Dialog.prototype.show = function () {
    $(this.el.div).dialog('open');
};

Dialog.prototype.hide = function () {
    $(this.el.div).dialog('close');
};

export { Dialog };