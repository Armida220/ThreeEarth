import { Container } from '../Container';

function FixedContainer(options) {
    Container.call(this, options);
    this.children = options.children || [];
    this.width = options.width || '220px'
    this.height = options.height || '120px';
    this.margin = options.margin || '10px';
    this.padding = options.padding || '2px';
    this.display = options.display || 'block';
    this.borderWidth = options.borderWidth || '2px';
    this.borderColor = options.borderColor || 'black';
    this.borderStyle = options.borderStyle || 'solid';
    this.float = options.float || null;
    this.html = options.html || null;
    this.cls = options.cls || null;
}

FixedContainer.prototype = Object.create(Container.prototype);
FixedContainer.prototype.constructor = FixedContainer;

FixedContainer.prototype.render = function () {
    this.el = document.createElement('div');
    this.el.style.width = this.width;
    this.el.style.height = this.height;
    this.el.style.borderWidth = this.borderWidth;
    this.el.style.borderColor = this.borderColor;
    this.el.style.borderStyle = this.borderStyle;
    this.el.style.margin = this.margin;
    this.el.style.padding = this.padding;
    this.el.style.display = this.display;
    this.el.style.float = this.float;
    this.el.className = this.cls;
    this.el.innerHTML = this.html;
    this.parent.append(this.el);
    var _this = this;
    this.children.forEach(function (n, i) {
        n.parent = _this.el;
        n.render.call(n);
    });
};

export { FixedContainer };