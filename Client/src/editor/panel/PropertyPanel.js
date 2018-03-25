import { Control } from '../../ui/Control';
import { TabPanel } from '../../ui/control/TabPanel';
import { TabItem } from '../../ui/control/TabItem';
import { Tree } from '../../ui/control/Tree';
import { SettingPanel } from './SettingPanel';

function PropertyPanel(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app;
    this.cls = 'right-panel ui-widget-content';

    this.hierarchyPanel = new Tree({
        data: [{
            name: '相机'
        }, {
            name: '光源'
        }]
    });
    this.app.hierarchyPanel = this.hierarchyPanel;

    this.settingPanel = new SettingPanel({ app: this.app });
    this.app.settingPanel = this.settingPanel;

    this.topPanel = new TabPanel({
        fit: true,
        children: [
            new TabItem({
                title: '层次',
                overflow: 'scroll',
                children: [
                    this.hierarchyPanel
                ]
            }),
            new TabItem({
                title: '设置',
                overflow: 'scroll',
                children: [
                    this.settingPanel
                ]
            }),
        ]
    });

    this.bottomPanel = new TabPanel({
        fit: true,
        children: [
            new TabItem({
                title: '属性',
                overflow: 'scroll',
                children: []
            }),
            new TabItem({
                title: '动画',
                overflow: 'scroll',
                html: 'content 2'
            }),
        ]
    });

    this.app.topPanel = this.topPanel;
    this.app.bottomPanel = this.bottomPanel;
}

PropertyPanel.prototype = Object.create(Control.prototype);
PropertyPanel.prototype.constructor = PropertyPanel;

PropertyPanel.prototype.render = function () {
    this.el.div = document.createElement('div');
    this.el.div.className = this.cls;
    this.parent.appendChild(this.el.div);

    this.el.topDiv = document.createElement('div');
    this.el.topDiv.style.height = '50%';
    this.el.div.appendChild(this.el.topDiv);

    this.el.bottomDiv = document.createElement('div');
    this.el.bottomDiv.style.height = '50%';
    this.el.div.appendChild(this.el.bottomDiv);

    this.topPanel.parent = this.el.topDiv;
    this.topPanel.render();

    this.bottomPanel.parent = this.el.bottomDiv;
    this.bottomPanel.render();
};

export { PropertyPanel };