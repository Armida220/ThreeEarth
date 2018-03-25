import { OpenSceneCommand } from './scene/OpenSceneCommand';

function CommandDispatcher(options) {
    options = options || {};
    this.app = options.app || null;
    this.commands = [
        new OpenSceneCommand({ app: this.app }),
    ];
}

CommandDispatcher.prototype.start = function () {
    this.commands.forEach(function (n) {
        n.start.call(n);
    });
};

export { CommandDispatcher };