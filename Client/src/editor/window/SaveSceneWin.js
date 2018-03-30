import { Dialog } from '../../ui/control/Dialog';
import { TextField } from '../../ui/control/TextField';

function SaveSceneWin(options) {
    Dialog.call(this, options);
    this.app = options.app;
    this.title = '保存场景';
    this.width = 250;
    this.height = 180;
    this.bodyStyle = 'padding: 15px 10px';

    this.textField = new TextField({
        label: '名称'
    })

    this.children = [
        this.textField
    ];

    var _this = this;

    this.buttons = [{
        text: '保存',
        click: function () {
            _this.save();
        }
    }]
}

SaveSceneWin.prototype = Object.create(Dialog.prototype);
SaveSceneWin.prototype.constructor = SaveSceneWin;

SaveSceneWin.prototype.render = function () {
    Dialog.prototype.render.call(this);
};

SaveSceneWin.prototype.save = function () {
    var geoJsons = [];
    var _this = this;
    this.app.viewer.entities.values.forEach(function (n) {
        _this.parseGeoJson(geoJsons, n);
    });
    debugger
};

SaveSceneWin.prototype.parseGeoJson = function (geoJsons, entity) {
    if (entity.position != null) {
        var coordinates = this.app.viewer.entities.values[0].position._value;
        var geoJson = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [coordinates.x, coordinates.y]
            },
            properties: {
                name: '',
                altitude: coordinates.z
            }
        };
        geoJsons.push(geoJson);
    } else if (entity.polyline != null) {
        var coordinates = this.app.viewer.entities.values[1].polyline.positions.getValue();
        var geoJson = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [coordinates.x, coordinates.y]
            },
            properties: {
                name: '',
                altitude: coordinates.z
            }
        };
        geoJsons.push(geoJson);
    } else if (entity.polygon != null) {
        var coordinates = this.app.viewer.entities.values[2].polygon.hierarchy.getValue();
        var geoJson = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [coordinates.x, coordinates.y]
            },
            properties: {
                name: '',
                altitude: coordinates.z
            }
        };
        geoJsons.push(geoJson);
    }
};

export { SaveSceneWin };