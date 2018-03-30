import { Options } from './Options';
import { Editor } from './editor/Editor';
import { CustomEvent } from './event/CustomEvent';
import { CommandDispatcher } from './command/CommandDispatcher';

function Application(options) {
    this.options = new Options(options);
    this.event = new CustomEvent({
        app: this
    });
    this.call = function (eventName) {
        this.event.call.apply(this.event, arguments);
    };
    this.on = function (eventName, callback) {
        this.event.on(eventName, callback);
    };
    this.editor = new Editor({
        app: this
    });
    this.commandDispatcher = new CommandDispatcher({
        app: this
    });
}

Application.prototype.start = function () {
    this.event.call('beforeRender', this);
    this.editor.render();
    this.event.call('render', this);
    this.event.call('applicationStart', this);
    this.commandDispatcher.start();
};

export { Application };