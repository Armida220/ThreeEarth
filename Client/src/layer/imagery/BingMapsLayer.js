import { Options } from '../../Options';

function BingMapsLayer(options) {
    var provider = new Cesium.BingMapsImageryProvider({
        url: Options.bingMapServerUrl,
        key: Options.bingMapKey,
        mapStyle: Cesium.BingMapsStyle.AERIAL
    })
    Cesium.ImageryLayer.call(this, provider, options);
}

BingMapsLayer.prototype = Object.create(Cesium.ImageryLayer.prototype);
BingMapsLayer.prototype.constructor = BingMapsLayer;

export { BingMapsLayer };