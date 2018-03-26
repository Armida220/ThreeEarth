import { OpenSceneCommand } from './scene/OpenSceneCommand';
import { AddPointCommand } from './object/AddPointCommand';
import { AddPolylineCommand } from './object/AddPolylineCommand';

function CommandDispatcher(options) {
    options = options || {};
    this.app = options.app || null;

    var params = { app: this.app };
    this.commands = [
        new OpenSceneCommand(params),

        new AddPointCommand(params),
        new AddPolylineCommand(params),
    ];
}

CommandDispatcher.prototype.start = function () {
    this.commands.forEach(function (n) {
        n.start.call(n);
    });
};

export { CommandDispatcher };