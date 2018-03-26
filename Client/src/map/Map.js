import { Control } from '../ui/Control';
import { Options } from '../Options';

function Map(options) {
    Control.call(this, options);
    this.app = options.app;
    this.app.map = this;
    Cesium.BingMapsApi.defaultKey = Options.bingMapKey;
}

Map.prototype = Object.create(Control.prototype);
Map.prototype.constructor = Map;

Map.prototype.render = function () {
    this.container = document.createElement('div');
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.parent.appendChild(this.container);
    this.app.mapContainer = this.container;

    var _this = this;
    this.app.on('applicationStart', function () {
        _this.start();
    });
};

Map.prototype.start = function () {
    var creditContainer = document.createElement('div');
    this.viewer = new Cesium.Viewer(this.container, {
        animation: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        creditContainer: creditContainer,
        // terrainProvider: Cesium.createWorldTerrain()
    });
    this.app.viewer = this.viewer;
    this.app.viewer.camera.setView({
        destination: new Cesium.Cartesian3(-2722888.5452312864, 4839584.616677277, 4092247.0954614747)
    });
    var _this = this;
    this.app.lonlatToWorld = function (lon, lat, alt) {
        return _this.lonlatToWorld(lon, lat, alt);
    };
    this.app.worldToLonlat = function (x, y, z) {
        return _this.worldToLonlat(x, y, z);
    };
    this.app.toRadian = function (degrees) {
        return _this.toRadian(degrees);
    };
    this.app.toDegree = function (radians) {
        return _this.toDegree(radians);
    };
    this.app.screenToWorld = function (x, y) {
        return _this.screenToWorld(x, y);
    };
    this.app.worldToScreen = function (cartesian3) {
        return _this.worldToLonlat(cartesian3);
    };
    this.addEventListeners();
};

Map.prototype.stop = function () {

};

Map.prototype.addEventListeners = function () {
    var _this = this;
    this.viewer.canvas.addEventListener('click', function (evt) {
        _this.app.call('click', evt)
    });
    this.viewer.canvas.addEventListener('contextmenu', function (evt) {
        _this.app.call('contextmenu', evt)
    });
    this.viewer.canvas.addEventListener('dblclick', function (evt) {
        _this.app.call('dblclick', evt)
    });
    this.viewer.canvas.addEventListener('keydown', function (evt) {
        _this.app.call('keydown', evt)
    });
    this.viewer.canvas.addEventListener('keyup', function (evt) {
        _this.app.call('keyup', evt)
    });
    this.viewer.canvas.addEventListener('mousedown', function (evt) {
        _this.app.call('mousedown', evt)
    });
    this.viewer.canvas.addEventListener('mousemove', function (evt) {
        _this.app.call('mousemove', evt)
    });
    this.viewer.canvas.addEventListener('mouseup', function (evt) {
        _this.app.call('mouseup', evt)
    });
    this.viewer.canvas.addEventListener('mousewheel', function () {
        _this.app.call('mousewheel', evt)
    });
};

Map.prototype.lonlatToWorld = function (lon, lat, alt) {
    alt = alt || 0;
    var ellipsoid = this.viewer.scene.globe.ellipsoid;
    var cartographic = Cesium.Cartographic.fromDegrees(lon, lat, alt);
    return ellipsoid.cartographicToCartesian(cartographic);
};

Map.prototype.worldToLonlat = function (x, y, z) {
    var ellipsoid = this.viewer.scene.globe.ellipsoid;
    var cartesian3 = new Cesium.cartesian3(x, y, z);
    var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
    var lon = Cesium.Math.toDegrees(cartograhpinc.longitude);
    var lat = Cesium.Math.toDegrees(cartograhphic.latitude);
    var alt = cartographic.height;
    return [lon, lat, alt];
};

Map.prototype.toRadian = function (degrees) {
    return Cesium.CesiumMath.toRadians(degrees);
};

Map.prototype.toDegree = function (radians) {
    return Cesium.CesiumMath.toDegrees(radians);
};

Map.prototype.screenToWorld = function (x, y) {
    var pick = new Cesium.Cartesian2(x, y);
    return this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(pick), this.viewer.scene);
};

Map.prototype.worldToScreen = function (cartesian3) {
    var screen;
    return Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, cartesian3);
};

export { Map };