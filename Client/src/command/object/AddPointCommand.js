import { BaseCommand } from '../BaseCommand';
import { OpenSceneWin } from '../../editor/window/OpenSceneWin';

function AddPointCommand(options) {
    BaseCommand.call(this, options);
}

AddPointCommand.prototype = Object.create(BaseCommand.prototype);
AddPointCommand.prototype.constructor = AddPointCommand;

AddPointCommand.prototype.start = function () {
    var _this = this;
    this.app.on('click', function (evt) {
        _this.click(evt);
    });
};

AddPointCommand.prototype.click = function (evt) {
    debugger
};

export { AddPointCommand };