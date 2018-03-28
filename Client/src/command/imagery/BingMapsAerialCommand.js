import { BaseCommand } from '../BaseCommand';
import { BingMapsLayer } from '../../layer/imagery/BingMapsLayer';

function BingMapsAerialCommand(options) {
    BaseCommand.call(this, options);
}

BingMapsAerialCommand.prototype = Object.create(BaseCommand.prototype);
BingMapsAerialCommand.prototype.constructor = BingMapsAerialCommand;

BingMapsAerialCommand.prototype.start = function () {
    var _this = this;
    this.app.on('bingMapsAerial', function () {
        _this.run();
    });
};

BingMapsAerialCommand.prototype.run = function () {
    this.app.viewer.scene.imageryLayers.removeAll();
    this.app.viewer.scene.imageryLayers.add(new BingMapsLayer());
};

export { BingMapsAerialCommand };