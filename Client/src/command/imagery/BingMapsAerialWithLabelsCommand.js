import { BaseCommand } from '../BaseCommand';
import { BingMapsLayer } from '../../layer/imagery/BingMapsLayer';

function BingMapsAerialWithLabelsCommand(options) {
    BaseCommand.call(this, options);
}

BingMapsAerialWithLabelsCommand.prototype = Object.create(BaseCommand.prototype);
BingMapsAerialWithLabelsCommand.prototype.constructor = BingMapsAerialWithLabelsCommand;

BingMapsAerialWithLabelsCommand.prototype.start = function () {
    var _this = this;
    this.app.on('bingMapsAerialWithLabels', function () {
        _this.run();
    });
};

BingMapsAerialWithLabelsCommand.prototype.run = function () {
    this.app.viewer.scene.imageryLayers.removeAll();
    this.app.viewer.scene.imageryLayers.add(new BingMapsLayer({
        mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
    }));
};

export { BingMapsAerialWithLabelsCommand };