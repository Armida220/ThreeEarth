import { BaseCommand } from '../BaseCommand';
import { OpenSceneWin } from '../../editor/window/OpenSceneWin';

var ID = -1;

function AddPointCommand(options) {
    BaseCommand.call(this, options);
}

AddPointCommand.prototype = Object.create(BaseCommand.prototype);
AddPointCommand.prototype.constructor = AddPointCommand;

AddPointCommand.prototype.start = function () {
    var _this = this;
    this.app.on('addPoint', function () {
        _this.run();
    });
};

AddPointCommand.prototype.run = function () {
    var _this = this;
    this.app.on('click.AddPointCommand', function (evt) {
        _this.click(evt);
    });
    this.app.on('contextmenu.AddPointCommand', function (evt) {
        _this.onContextMenu(evt);
    });
};

AddPointCommand.prototype.click = function (evt) {
    var world = this.app.screenToWorld(evt.offsetX, evt.offsetY);
    var point = this.app.viewer.entities.add({
        name: 'Point' + ID--,
        position: world,
        point: {
            pixelSize: 5,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
        }
    });
};

AddPointCommand.prototype.onContextMenu = function (evt) {
    this.app.on('click.AddPointCommand', null);
};

export { AddPointCommand };