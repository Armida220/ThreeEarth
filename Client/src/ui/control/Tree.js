import { dispatch } from '../../third_party';
import { Control } from '../Control';

var ID = -1;

function Tree(options) {
    Control.call(this, options);
    options = options || {};
    this.id = options.id || 'tree' + ID--;
    this.dispatch = dispatch('click');
    var _this = this;
    this.setting = options.setting || {
        treeId: this.id,
        callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
                _this.dispatch.call('click', _this, event, treeId, treeNode, clickFlag);
            }
        }
    };
    this.data = options.data || [];
}

Tree.prototype = Object.create(Control.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.render = function () {
    this.el.ul = document.createElement('ul');
    this.el.ul.className = 'ztree';
    //this.el.ul.setAttribute('id', this.id);
    this.parent.appendChild(this.el.ul);
    $.fn.zTree.init($(this.el.ul), this.setting, this.data);
};

Tree.prototype.on = function (eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { Tree };