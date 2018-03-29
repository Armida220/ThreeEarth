import { NewSceneCommand } from './scene/NewSceneCommand';
import { OpenSceneCommand } from './scene/OpenSceneCommand';
import { SaveSceneCommand } from './scene/SaveSceneCommand';

import { AddPointCommand } from './object/AddPointCommand';
import { AddPolylineCommand } from './object/AddPolylineCommand';
import { AddPolygonCommand } from './object/AddPolygonCommand';

import { BingMapsAerialCommand } from './imagery/BingMapsAerialCommand';
import { BingMapsAerialWithLabelsCommand } from './imagery/BingMapsAerialWithLabelsCommand';
import { BingMapsRoadCommand } from './imagery/BingMapsRoadCommand';

function CommandDispatcher(options) {
    options = options || {};
    this.app = options.app || null;

    var params = { app: this.app };
    this.commands = [
        new NewSceneCommand(params),
        new OpenSceneCommand(params),
        new SaveSceneCommand(params),

        new AddPointCommand(params),
        new AddPolylineCommand(params),
        new AddPolygonCommand(params),

        new BingMapsAerialCommand(params),
        new BingMapsAerialWithLabelsCommand(params),
        new BingMapsRoadCommand(params)
    ];
}

CommandDispatcher.prototype.start = function () {
    this.commands.forEach(function (n) {
        n.start.call(n);
    });
};

export { CommandDispatcher };