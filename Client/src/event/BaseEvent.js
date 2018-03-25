var ID = -1;

function BaseEvent(options) {
    this.app = options.app || null;
    this.id = options.id || 'BaseEvent-' + ID--;
};

BaseEvent.prototype.start = function () {

};

BaseEvent.prototype.stop = function () {

};

export { BaseEvent };