import { Control } from '../Control';
import { dispatch } from '../../third_party';

var ID = -1;

function GridPanel(options) {
    Control.call(this, options);
    options = options || {};

    this.id = options.id || 'GridPanel' + ID--;
    this.url = options.url;
    this.caption = options.caption || null;
    this.colNames = options.colNames || ['Inv No', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'];
    this.colModel = options.colModel || [
        { name: 'id', index: 'id', width: 55 },
        { name: 'invdate', index: 'invdate', width: 90 },
        { name: 'name', index: 'name asc, invdate', width: 100 },
        { name: 'amount', index: 'amount', width: 80, align: "right" },
        { name: 'tax', index: 'tax', width: 80, align: "right" },
        { name: 'total', index: 'total', width: 80, align: "right" },
        { name: 'note', index: 'note', width: 150, sortable: false }
    ];
    this.width = options.width || '300px';
    this.height = options.height || '120px';

    this.rowNum = options.rowNum || 10;
    this.rowList = options.rowList || [10, 20, 50, 100];
    this.pager = options.pager === false ? false : true;
    this.dispatch = dispatch('afterInsertRow', 'beforeRequest', 'beforeSelectRow', 'gridComplete', 'loadComplete', 'loadError',
        'cellSelect', 'dblClickRow', 'headerClick', 'paging', 'rightClickRow', 'selectAll', 'selectRow', 'sortCol', 'resizeStart',
        'resizeStop', 'serializeGridData');
}

GridPanel.prototype = Object.create(Control.prototype);
GridPanel.prototype.constructor = GridPanel;

GridPanel.prototype.render = function () {
    this.el.table = document.createElement('table');
    this.el.table.id = this.id;
    this.el.table.style.width = this.width;
    this.el.table.style.height = this.height;
    this.parent.appendChild(this.el.table);

    if (this.pager) {
        this.el.pager = document.createElement('div');
        this.el.pager.id = this.id + '-pager';
        this.parent.appendChild(this.el.pager);
    }

    var _this = this;
    $('#' + this.id).jqGrid({
        width: this.width,
        height: this.height,
        url: this.url,
        datatype: "json",
        colNames: this.colNames,
        colModel: this.colModel,
        rowNum: this.rowNum,
        rowList: this.rowList,
        pager: this.pager ? '#' + this.id + '-pager' : null,
        //sortname: 'id',
        mtype: 'post',
        viewrecords: true,
        //sortorder: 'desc',
        //caption: this.caption,
        //autowidth: true,
        rownumbers: true,
        //shrinkToFit: true
        beforeSelectRow: function (rowid, e) {
            _this.dispatch.call('beforeSelectRow', _this, rowid, e);
        },
        loadComplete: function (xhr) {
            _this.dispatch.call('loadComplete', _this, xhr);
        },
        loadError: function (xhr, status, error) {
            _this.dispatch.call('loadError', _this, xhr, status, error);
        },
        onCellSelect: function (rowid, iCol, cellcontent, e) {
            _this.dispatch.call('cellSelect', _this, rowid, iCol, cellcontent, e);
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {
            _this.dispatch.call('dblClickRow', _this, rowid, iRow, iCol, e);
        },
        onSelectRow: function (rowid, status) {
            _this.dispatch.call('selectRow', _this, rowid, status);
        }
    });
    // $('#' + this.id).setGridWidth(this.el.table.clientWidth);
    // $('#' + this.id).setGridHeight(this.el.table.clientHeight);
};

GridPanel.prototype.on = function (eventName, callback) {
    this.dispatch.on(eventName, callback);
};

GridPanel.prototype.getCell = function (rowid, iCol) {
    return $('#' + this.id).jqGrid('getCell', rowid, iCol);
};

GridPanel.prototype.getRowData = function (rowid) {
    return $('#' + this.id).jqGrid('getRowData', rowid);
};

GridPanel.prototype.reload = function () {
    $('#' + this.id).trigger('reloadGrid');
};

export { GridPanel };