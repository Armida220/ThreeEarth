import { TabPanel } from '../../ui/control/TabPanel';
import { TabItem } from '../../ui/control/TabItem';
import { GlScene } from '../scene/GlScene';
import { LogScene } from '../scene/LogScene';

function MainPanel(options) {
    TabPanel.call(this, options);
    options = options || {};
    this.app = options.app;

    this.sceneTab = new TabItem({
        id: 'sceneTab',
        title: '场景',
        children: [

        ]
    });
    this.app.sceneTab = this.sceneTab;

    this.logTab = new TabItem({
        id: 'logTab',
        title: '日志',
        children: [

        ]
    });
    this.app.logTab = this.logTab;

    this.children = [
        this.sceneTab,
        this.logTab,
    ];
    this.cls = 'left-panel';
    this.fit = true;
}

MainPanel.prototype = Object.create(TabPanel.prototype);
MainPanel.prototype.constructor = MainPanel;

MainPanel.prototype.render = function () {
    var _this = this;
    this.on('create', function (event, ui) {
        _this.onCreateTabs.call(_this, event, ui);
    });
    this.on('activate', function (event, ui) {
        _this.onActivateTab.call(_this, event, ui);
    });
    this.on('close', function (tabitem) {
        _this.onCloseTab.call(_this, tabitem);
    });
    TabPanel.prototype.render.apply(this, arguments);
};

MainPanel.prototype.onCreateTabs = function (event, ui) {
    this.glScene = new GlScene({
        app: this.app,
        parent: this.sceneTab.el.div,
        width: ui.panel[0].clientWidth,
        height: ui.panel[0].clientHeight,
    });
    this.app.glScene = this.glScene;
    this.sceneTab.add(this.glScene);
    this.glScene.start();

    this.logScene = new LogScene({
        app: this.app,
        parent: this.logTab.el.div,
        width: ui.panel[0].clientWidth,
        height: ui.panel[0].clientHeight,
    });
    this.app.logScene = this.logScene;
    this.logTab.add(this.logScene);
    this.logScene.start();
};

MainPanel.prototype.onActivateTab = function (event, ui) {

};

MainPanel.prototype.onCloseTab = function (tabitem) {

};

export { MainPanel };