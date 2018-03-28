import { Options } from '../../Options';

function BingMapsLayer(options) {
    options = options || {};
    var provider = new Cesium.BingMapsImageryProvider({
        url: Options.bingMapServerUrl,
        key: Options.bingMapKey,
        mapStyle: options.mapStyle || Cesium.BingMapsStyle.AERIAL,
        culture: 'zh-Hans'
    })
    Cesium.ImageryLayer.call(this, provider, options);
}

BingMapsLayer.prototype = Object.create(Cesium.ImageryLayer.prototype);
BingMapsLayer.prototype.constructor = BingMapsLayer;

export { BingMapsLayer };