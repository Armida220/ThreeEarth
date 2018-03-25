import { Control } from '../Control';

function Tooltip(options) {
    Control.call(this, options);
    options = options || {};
}

Tooltip.prototype = Object.create(Control.prototype);
Tooltip.prototype.constructor = Tooltip;

Tooltip.prototype.render = function () {
    $(document).tooltip();
};

export { Tooltip };