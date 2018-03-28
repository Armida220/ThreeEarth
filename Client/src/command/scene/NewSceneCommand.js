import { BaseCommand } from '../BaseCommand';
import { MessageBox } from '../../ui/control/MessageBox';

function NewSceneCommand(options) {
    BaseCommand.call(this, options);
}

NewSceneCommand.prototype = Object.create(BaseCommand.prototype);
NewSceneCommand.prototype.constructor = NewSceneCommand;

NewSceneCommand.prototype.start = function () {
    var _this = this;
    this.app.on('newScene', function () {
        _this.run();
    });
};

NewSceneCommand.prototype.run = function () {
    this.app.viewer.entities.removeAll();
    var msg = new MessageBox({
        title: '消息',
        msg: '新建场景成功！'
    });
    msg.show();
};

export { NewSceneCommand };