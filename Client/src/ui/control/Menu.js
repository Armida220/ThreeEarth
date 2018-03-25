import { dispatch } from '../../third_party';
import { Control } from '../Control';

function Menu(options) {
    Control.call(this, options);
    options = options || {};
    this.width = options.width || null;
    this.cls = options.cls || '';
    this.direction = options.direction || 'vertical'; // horizontal, vertical
    this.children = options.children || [];
    this.dispatch = dispatch('blur', 'create', 'focus', 'select');
}

Menu.prototype = Object.create(Control.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.blur = function () {
    $(this.el.ul).menu('blur');
};

Menu.prototype.collapse = function () {
    $(this.el.ul).menu('collapse');
};

Menu.prototype.collapseAll = function () {
    $(this.el.ul).menu('collapseAll');
};

Menu.prototype.destroy = function () {
    $(this.el.ul).menu('destroy');
};

Menu.prototype.disable = function () {
    $(this.el.ul).menu('disable');
};

Menu.prototype.enable = function () {
    $(this.el.ul).menu('enable');
};

Menu.prototype.expand = function () {
    $(this.el.ul).menu('expand');
};

Menu.prototype.render = function () {
    this.el.ul = document.createElement('ul');
    this.el.ul.className = this.cls;
    if (this.direction == 'horizontal') {
        this.el.ul.className = ' ui-menu-horizontal';
    }
    this.el.ul.style.width = this.width;
    this.parent.appendChild(this.el.ul);
    var _this = this;
    this.children.forEach(function (n) {
        n.parent = _this.el.ul;
        n.render.call(n);
    });
    if (this.direction == 'vertical') {
        $(this.el.ul).menu({
            blur: function (event, ui) {
                _this.dispatch.call('blur', _this, event, ui);
            },
            create: function (event, ui) {
                _this.dispatch.call('create', _this, event, ui);
            },
            focus: function (event, ui) {
                _this.dispatch.call('focus', _this, event, ui);
            },
            select: function (event, ui) {
                _this.dispatch.call('select', _this, event, ui);
            }
        });
    } else {
        $(this.el.ul).menu({
            icons: {
                submenu: 'ui-icon-caret-1-s'
            },
            position: {
                my: 'left top',
                at: 'left bottom'
            },
            blur: function (event, ui) {
                _this.dispatch.call('blur', _this, event, ui);
            },
            create: function (event, ui) {
                _this.dispatch.call('create', _this, event, ui);
            },
            focus: function (event, ui) {
                _this.dispatch.call('focus', _this, event, ui);
            },
            select: function (event, ui) {
                _this.dispatch.call('select', _this, event, ui);
            }
        });
    }
};

Menu.prototype.on = function (eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { Menu };