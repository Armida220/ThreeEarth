import { Dialog } from '../../ui/control/Dialog';
import { TextField } from '../../ui/control/TextField';
import { MessageBox } from '../../ui/control/MessageBox';

function SaveSceneWin(options) {
    Dialog.call(this, options);
    this.app = options.app;
    this.title = '保存场景';
    this.width = 250;
    this.height = 180;
    this.bodyStyle = 'padding: 15px 10px';

    this.textField = new TextField({
        label: '名称'
    })

    this.children = [
        this.textField
    ];

    var _this = this;

    this.buttons = [{
        text: '保存',
        click: function () {
            _this.save();
        }
    }]
}

SaveSceneWin.prototype = Object.create(Dialog.prototype);
SaveSceneWin.prototype.constructor = SaveSceneWin;

SaveSceneWin.prototype.render = function () {
    Dialog.prototype.render.call(this);
};

SaveSceneWin.prototype.save = function () {
    var geoJsons = [];
    var _this = this;
    this.app.viewer.entities.values.forEach(function (n) {
        geoJsons = geoJsons.concat(_this.app.entityToGeoJsons(n));
    });
    var _this = this;
    $.post(this.app.options.serverUrl + '/Handler/SaveSceneHandler.ashx', {
        name: _this.textField.getValue(),
        layerName: _this.textField.getValue(),
        data: JSON.stringify(geoJsons)
    }, function () {
        if (_this.msg == null) {
            _this.msg = new MessageBox({
                title: '消息',
                msg: '保存成功！'
            });
        }
        _this.msg.show();
    });
};

export { SaveSceneWin };