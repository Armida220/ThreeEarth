
function Control(options) {
    options = options || {};
    this.parent = options.parent || document.body;
    this.el = {};
}

Control.prototype.render = function () {

};

export { Control };