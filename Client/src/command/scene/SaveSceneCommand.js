import { BaseCommand } from '../BaseCommand';
import { SaveSceneWin } from '../../editor/window/SaveSceneWin';

function SaveSceneCommand(options) {
    BaseCommand.call(this, options);
}

SaveSceneCommand.prototype = Object.create(BaseCommand.prototype);
SaveSceneCommand.prototype.constructor = SaveSceneCommand;

SaveSceneCommand.prototype.start = function () {
    var _this = this;
    this.app.on('saveScene', function () {
        _this.run();
    });
};

SaveSceneCommand.prototype.run = function () {
    if (this.win == null) {
        this.win = new SaveSceneWin({
            app: this.app
        });
        this.win.render();
    }
    this.win.show();
};

export { SaveSceneCommand };