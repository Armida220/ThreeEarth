import { BaseCommand } from '../BaseCommand';
import { BingMapsLayer } from '../../layer/imagery/BingMapsLayer';

function BingMapsRoadCommand(options) {
    BaseCommand.call(this, options);
}

BingMapsRoadCommand.prototype = Object.create(BaseCommand.prototype);
BingMapsRoadCommand.prototype.constructor = BingMapsRoadCommand;

BingMapsRoadCommand.prototype.start = function () {
    var _this = this;
    this.app.on('bingMapsRoad', function () {
        _this.run();
    });
};

BingMapsRoadCommand.prototype.run = function () {
    this.app.viewer.scene.imageryLayers.removeAll();
    this.app.viewer.scene.imageryLayers.add(new BingMapsLayer({
        mapStyle: Cesium.BingMapsStyle.ROAD
    }));
};

export { BingMapsRoadCommand };