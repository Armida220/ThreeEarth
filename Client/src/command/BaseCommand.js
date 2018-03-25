
function BaseCommand(options) {
    options = options || {};
    this.app = options.app || null;
}

BaseCommand.prototype.start = function () {

};

export { BaseCommand };