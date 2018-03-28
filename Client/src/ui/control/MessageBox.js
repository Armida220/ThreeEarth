import { Control } from '../Control';
import { Dialog } from './Dialog';

function MessageBox(options) {
    Control.call(this, options);
    options = options || {};
    this.title = options.title || '消息';
    this.msg = options.msg || '';
    var _this = this;
    this.dialog = new Dialog({
        title: this.title,
        html: this.msg,
        width: 300,
        height: 180,
        bodyStyle: 'padding: 15px;',
        buttons: [{
            text: '关闭',
            click: function () {
                _this.hide();
            }
        }]
    });
    this.dialog.render();
}

MessageBox.prototype = Object.create(Control.prototype);
MessageBox.prototype.constructor = MessageBox;

MessageBox.prototype.show = function () {
    this.dialog.show();
};

MessageBox.prototype.hide = function () {
    this.dialog.hide();
};

export { MessageBox };