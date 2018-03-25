import { Control } from '../Control';

function AccordionItem(options) {
    Control.call(this, options);
    options = options || {};
    this.title = options.title || 'Tab';
    this.html = options.html || null;
    this.children = options.children || [];
}

AccordionItem.prototype = Object.create(Control.prototype);
AccordionItem.prototype.constructor = AccordionItem;

AccordionItem.prototype.render = function () {
    this.el.title = document.createElement('h3');
    this.el.title.innerHTML = this.title;
    this.parent.appendChild(this.el.title);

    this.el.body = document.createElement('div');
    this.el.body.innerHTML = this.html;
    this.parent.appendChild(this.el.body);

    var _this = this;
    this.children.forEach(function (n) {
        n.parent = _this.el.body;
        n.render.call(n);
    });
};

export { AccordionItem };