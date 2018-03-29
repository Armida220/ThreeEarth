import { Dialog } from '../../ui/control/Dialog';
import { TextField } from '../../ui/control/TextField';

function SaveSceneWin(options) {
    Dialog.call(this, options);
    this.app = options.app;
    this.title = '保存场景';
    this.width = 920;
    this.height = 500;

    this.textField = new TextField({
        label: '名称'
    })

    this.children = [
        this.textField
    ];
}

SaveSceneWin.prototype = Object.create(Dialog.prototype);
SaveSceneWin.prototype.constructor = SaveSceneWin;

SaveSceneWin.prototype.render = function () {
    Dialog.prototype.render.call(this);
};

export { SaveSceneWin };