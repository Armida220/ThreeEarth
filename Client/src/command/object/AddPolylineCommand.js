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
        _this.onClick(evt);
    });
    this.app.on('mousemove.AddPolylineCommand', function (evt) {
        _this.onMouseMove(evt);
    });
    this.app.on('contextmenu.AddPolylineCommand', function (evt) {
        _this.onContextMenu(evt);
    });
};

AddPolylineCommand.prototype.onClick = function (evt) {
    var world = this.app.screenToWorld(evt.offsetX, evt.offsetY);
    if (this.polyline == null) {
        this.polyline = this.app.viewer.entities.add({
            name: 'polyline' + ID--,
            polyline: {
                positions: [
                    world,
                    world
                ],
                width: 5,
                material: Cesium.Color.RED,
                outlineWidth: 3,
                outlineColor: Cesium.Color.BLACK
            }
        });
    } else {
        var positions = this.polyline.polyline.positions.getValue();
        positions.splice(positions.length - 1, 0, world);
        this.polyline.polyline.positions.setValue(positions);
        this.polyline.polyline.show = true;
    }
};

AddPolylineCommand.prototype.onMouseMove = function (evt) {
    var world = this.app.screenToWorld(evt.offsetX, evt.offsetY);
    if (this.polyline != null) {
        var positions = this.polyline.polyline.positions.getValue();
        positions.splice(positions.length - 1, 1, world);
        this.polyline.polyline.positions.setValue(positions);
        this.polyline.polyline.show = true;
    }
};

AddPolylineCommand.prototype.onContextMenu = function (evt) {
    this.app.on('click.AddPolylineCommand', null);
    this.polyline = null;
};

export { AddPolylineCommand };