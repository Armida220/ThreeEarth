import { BaseCommand } from '../BaseCommand';
import { OpenSceneWin } from '../../editor/window/OpenSceneWin';

var ID = -1;

function AddPolygonCommand(options) {
    BaseCommand.call(this, options);
}

AddPolygonCommand.prototype = Object.create(BaseCommand.prototype);
AddPolygonCommand.prototype.constructor = AddPolygonCommand;

AddPolygonCommand.prototype.start = function () {
    var _this = this;
    this.app.on('addPolygon', function () {
        _this.run();
    });
};

AddPolygonCommand.prototype.run = function () {
    var _this = this;
    this.app.on('click.AddPolygonCommand', function (evt) {
        _this.onClick(evt);
    });
    this.app.on('mousemove.AddPolygonCommand', function (evt) {
        _this.onMouseMove(evt);
    });
    this.app.on('contextmenu.AddPolygonCommand', function (evt) {
        _this.onContextMenu(evt);
    });
};

AddPolygonCommand.prototype.onClick = function (evt) {
    var world = this.app.screenToWorld(evt.offsetX, evt.offsetY);
    if (this.polygon == null) {
        this.polygon = this.app.viewer.entities.add({
            name: 'polygon' + ID--,
            polygon: {
                hierarchy: [
                    world,
                    world
                ],
                height: 0,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        });
    } else {
        var hierarchy = this.polygon.polygon.hierarchy.getValue();
        hierarchy.splice(hierarchy.length - 1, 0, world);
        this.polygon.polygon.hierarchy.setValue(hierarchy);
        this.polygon.polygon.show = true;
    }
};

AddPolygonCommand.prototype.onMouseMove = function (evt) {
    var world = this.app.screenToWorld(evt.offsetX, evt.offsetY);
    if (this.polygon != null) {
        var hierarchy = this.polygon.polygon.hierarchy.getValue();
        hierarchy.splice(hierarchy.length - 1, 1, world);
        this.polygon.polygon.hierarchy.setValue(hierarchy);
        this.polygon.polygon.show = true;
    }
};

AddPolygonCommand.prototype.onContextMenu = function (evt) {
    this.app.on('click.AddPolygonCommand', null);
    this.polygon = null;
};

export { AddPolygonCommand };