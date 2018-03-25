import { Control } from '../ui/Control';
import { NavMenu } from './menu/NavMenu';
import { MainPanel } from './panel/MainPanel';
import { PropertyPanel } from './panel/PropertyPanel';

function Editor(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app;

    this.navMenu = new NavMenu({
        app: this.app
    });

    this.mainPanel = new MainPanel({
        app: this.app
    });

    this.propertyPanel = new PropertyPanel({
        app: this.app
    });

    this.app.navMenu = this.navMenu;
    this.app.mainPanel = this.mainPanel;
    this.app.propertyPanel = this.propertyPanel;
}

Editor.prototype = Object.create(Control.prototype);
Editor.prototype.constructor = Editor;

Editor.prototype.render = function () {
    this.navMenu.parent = this.parent;
    this.navMenu.render();

    this.el.box = document.createElement('div');
    this.el.box.className = 'box';
    this.parent.appendChild(this.el.box);

    this.mainPanel.parent = this.el.box;
    this.mainPanel.render();

    this.propertyPanel.parent = this.el.box;
    this.propertyPanel.render();
};

export { Editor };