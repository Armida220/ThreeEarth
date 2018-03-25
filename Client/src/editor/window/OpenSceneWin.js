import { Dialog } from '../../ui/control/Dialog';
import { GridPanel } from '../../ui/control/GridPanel';

function OpenSceneWin(options) {
    Dialog.call(this, options);
    this.app = options.app;
    this.title = '加载场景';
    this.width = 920;
    this.height = 500;

    this.grid = new GridPanel({
        app: this.app,
        width: '910px',
        height: '420px',
        url: 'http://127.0.0.1:8080/Service/FeatureSummaryService.ashx',
        colNames: ['创建时间', '数据集', '经度', '纬度', '点数', '线数', '面数', '未知要素数', '总要素数'],
        colModel: [
            { name: 'CreateTime', index: 'CreateTime', width: 90 },
            { name: 'CollectionName', index: 'CollectionName', width: 120 },
            { name: 'CenterLongitude', index: 'CenterLongitude', width: 120 },
            { name: 'CenterLatitude', index: 'CenterLatitude', width: 120 },
            { name: 'PointNum', index: 'PointNum', width: 70, align: "right" },
            { name: 'LineStringNum', index: 'LineStringNum', width: 70, align: "right" },
            { name: 'PolygonNum', index: 'PolygonNum', width: 70, align: "right" },
            { name: 'UnknownNum', index: 'UnknownNum', width: 70, align: "right" },
            { name: 'TotalNum', index: 'TotalNum', width: 70, align: "right" }
        ],
        rowNum: -1,
        pager: false
    });

    this.children = [
        this.grid
    ];
}

OpenSceneWin.prototype = Object.create(Dialog.prototype);
OpenSceneWin.prototype.constructor = OpenSceneWin;

OpenSceneWin.prototype.render = function () {
    Dialog.prototype.render.call(this);
    var _this = this;
    this.grid.on('dblClickRow', function (rowid, iRow, iCol, e) {
        var record = this.getRowData(rowid);
        var collectionName = record['CollectionName'];
        var lon = record['CenterLongitude'];
        var lat = record['CenterLatitude'];
        var wyoming = _this.app.viewer.entities.add({
            name: 'Wyoming',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([
                    -109.080842, 45.002073,
                    -105.91517, 45.002073,
                    -104.058488, 44.996596,
                    -104.053011, 43.002989,
                    -104.053011, 41.003906,
                    -105.728954, 40.998429,
                    -107.919731, 41.003906,
                    -109.04798, 40.998429,
                    -111.047063, 40.998429,
                    -111.047063, 42.000709,
                    -111.047063, 44.476286,
                    -111.05254, 45.002073]),
                height: 100,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        });

        _this.app.viewer.zoomTo(wyoming);
    });
};

export { OpenSceneWin };