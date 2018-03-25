import { Control } from '../../ui/Control';

function Scene(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.name = options.name || 'Scene';
    this.width = options.width || '900px';
    this.height = options.height || '500px';
    this.app.sceneWidth = this.width;
    this.app.sceneHeight = this.height;
}

Scene.prototype = Object.create(Control.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.getName = function () {
    return this.name;
};

Scene.prototype.setName = function (name) {
    this.name = name;
};

Scene.prototype.start = function () {

};

Scene.prototype.pause = function () {

};

Scene.prototype.stop = function () {

};

Scene.prototype.save = function () {

};

Scene.prototype.load = function () {

};

export { Scene };