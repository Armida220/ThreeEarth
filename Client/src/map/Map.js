import { Control } from '../ui/Control';
import { Options } from '../Options';

function Map(options) {
    Control.call(this, options);
    this.app = options.app;
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
};

export { Map };