import { BaseCommand } from '../BaseCommand';
import { OpenSceneWin } from '../../editor/window/OpenSceneWin';

var ID = -1;

function AddPolylineCommand(options) {
    BaseCommand.call(this, options);
}

AddPolylineCommand.prototype = Object.create(BaseCommand.prototype);
AddPolylineCommand.prototype.constructor = AddPolylineCommand;

AddPolylineCommand.prototype.start = function () {
    var _this = this;
    this.app.on('addPolyline', function () {
        _this.run();
    });
};

AddPolylineCommand.prototype.run = function () {
    var _this = this;
    this.app.on('click.AddPolylineCommand', function (evt) {
        _this.click(evt);
    });
    this.app.on('contextmenu.AddPolylineCommand', function (evt) {
        _this.onContextMenu(evt);
    });
};

AddPolylineCommand.prototype.click = function (evt) {
    var world = this.app.screenToWorld(evt.offsetX, evt.offsetY);
    if (this.polyline == null) {
        this.polyline = this.app.viewer.entities.add({
            name: 'polyline' + ID--,
            polyline: {
                hierarchy: [
                    world
                ],
                height: 0,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        });
    } else {
        debugger
    }

};

AddPolylineCommand.prototype.onContextMenu = function (evt) {
    this.app.on('click.AddPolylineCommand', null);
    this.polyline = null;
};

export { AddPolylineCommand };