import { BaseCommand } from '../BaseCommand';
import { OpenSceneWin } from '../../editor/window/OpenSceneWin';

function OpenSceneCommand(options) {
    BaseCommand.call(this, options);
}

OpenSceneCommand.prototype = Object.create(BaseCommand.prototype);
OpenSceneCommand.prototype.constructor = OpenSceneCommand;

OpenSceneCommand.prototype.start = function () {
    var _this = this;
    this.app.on('openScene', function () {
        _this.run();
    });
};

OpenSceneCommand.prototype.run = function () {
    if (this.win == null) {
        this.win = new OpenSceneWin({
            app: this.app
        });
        this.win.render();
    }
    this.win.show();
};

export { OpenSceneCommand };