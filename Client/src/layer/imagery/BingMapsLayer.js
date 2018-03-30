import { Options } from '../../Options';

function BingMapsLayer(options) {
    options = options || {};
    this.app = options.app;
    var provider = new Cesium.BingMapsImageryProvider({
        url: this.app.options.bingMapServerUrl,
        key: this.app.options.bingMapKey,
        mapStyle: options.mapStyle || Cesium.BingMapsStyle.AERIAL,
        culture: 'zh-Hans'
    })
    Cesium.ImageryLayer.call(this, provider, options);
}

BingMapsLayer.prototype = Object.create(Cesium.ImageryLayer.prototype);
BingMapsLayer.prototype.constructor = BingMapsLayer;

export { BingMapsLayer };