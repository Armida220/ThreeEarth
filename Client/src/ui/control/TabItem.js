import { Control } from '../Control';

var ID = -1;

function TabItem(options) {
    Control.call(this, options);
    options = options || {};
    this.id = options.id || 'tabitem' + ID--;
    this.title = options.title || 'Tab';
    this.html = options.html || null;
    this.children = options.children || [];
    this.overflow = options.overflow || null;
    this.closable = options.closable || false;
    this.tabs = options.tabs || null;
}

TabItem.prototype = Object.create(Control.prototype);
TabItem.prototype.constructor = TabItem;

TabItem.prototype.add = function (control) {
    this.children.push(control);
    control.parent = this.el.div;
    control.render.call(control);
};

TabItem.prototype.insert = function (index, control) {
    this.children.splice(index, 0, control);
    control.parent = this.el.div;
    control.render.call(control);
};

TabItem.prototype.remove = function (control) {
    var index = this.children.indexOf(control);
    if (index > -1) {
        this.children.splice(index, 1);
        $(this.el.div).children().eq(index).remove();
    }
};

TabItem.prototype.removeAt = function (index) {
    this.children.splice(index, 1);
    $(this.el.div).children().eq(index).remove();
};

TabItem.prototype.removeAll = function () {
    this.children = [];
    $(this.el.div).empty();
};

TabItem.prototype.clear = function () {
    this.removeAll();
};

TabItem.prototype.close = function () {
    var index = $(this.el.li).index();
    $(this.el.li).remove();
    $(this.el.div).remove();
    $(this.parent).tabs('refresh');
    if (this.tabs) {
        this.tabs.children.splice(index, 1);
        this.tabs.dispatch.call('close', this.tabs, this);
    }
};

TabItem.prototype.render = function () {
    var _this = this;
    var index = TabItem.index++;
    this.el.li = document.createElement('li');
    this.el.a = document.createElement('a');
    this.el.a.innerHTML = this.title;
    this.el.a.setAttribute('href', '#' + this.id);
    this.el.li.appendChild(this.el.a);
    if (this.closable) {
        this.el.span = document.createElement('span');
        this.el.span.className = 'ui-icon ui-icon-close';
        this.el.span.setAttribute('role', 'presentation');
        this.el.span.innerHTML = 'Remove Tab';
        this.el.span.style.cursor = 'pointer';
        this.el.li.appendChild(this.el.span);
        $(this.el.span).on('click', function () {
            _this.close.call(_this);
        });
    }
    $('ul', this.parent).append(this.el.li);

    this.el.div = document.createElement('div');
    this.el.div.id = this.id;
    if (this.overflow) {
        this.el.div.style.overflow = this.overflow;
    }
    this.parent.appendChild(this.el.div);
    this.el.div.innerHTML = this.html;
    this.children.forEach(function (n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
};

export { TabItem };