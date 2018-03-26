import { Control } from '../../ui/Control';
import { Menu } from '../../ui/control/Menu'
import { MenuItem } from '../../ui/control/MenuItem'
import { NavMenuNames } from './NavMenuNames';

function NavMenu(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app;
    this.menu = new Menu({
        app: this.app,
        cls: 'main-menu',
        direction: 'horizontal',
        children: []
    });
    var _this = this;
    NavMenuNames.forEach(function (n) {
        var item = new MenuItem({
            text: n.text,
            event: n.event,
            children: []
        });
        if (n.children) {
            n.children.forEach(function (m) {
                var subitem = new MenuItem({
                    text: m.text,
                    event: m.event
                });
                item.children.push(subitem);
            });
        }
        _this.menu.children.push(item);
    });
    this.app.menu = this.menu;
}

NavMenu.prototype = Object.create(Control.prototype);
NavMenu.prototype.constructor = NavMenu;

NavMenu.prototype.render = function () {
    this.el.div = document.createElement('div');
    this.el.div.className = 'nav';
    this.parent.appendChild(this.el.div);

    this.menu.parent = this.el.div;
    this.menu.render();

    var _this = this;
    this.menu.on('select', function (event, ui) {
        var event = ui.item[0].event;
        if (event != null) {
            _this.app.event.call(event);
            _this.menu.collapseAll();
        }
    });
};

export { NavMenu };