import { Scene } from './Scene';
import { Map } from '../../map/Map';

function GlScene(options) {
    Scene.call(this, options);
    this.map = new Map({
        app: this.app
    });
    this.app.map = this.map;
}

GlScene.prototype = Object.create(Scene.prototype);
GlScene.prototype.constructor = GlScene;

GlScene.prototype.render = function () {
    this.map.parent = this.parent;
    this.map.render();
};

export { GlScene };