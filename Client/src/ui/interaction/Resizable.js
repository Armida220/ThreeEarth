import { Interaction } from '../Interaction';
import { Control } from '../Control';
import { UiHelper } from '../UiHelper';

function Resizable(options) {
    Interaction.call(this, options);
    options = options || {};
    this.animate = options.animate || true;
    this.helper = options.helper || 'ui-resizable-helper';

    UiHelper.addCssRule('.ui-resizable-helper', ' border: 2px dotted #00F; ');
}

Resizable.prototype = Object.create(Interaction.prototype);
Resizable.prototype.constructor = Resizable;

Resizable.prototype.apply = function (control) {
    this.target = control instanceof Control ? control.el : control;
    $(this.target).resizable({
        animate: this.animate,
        helper: this.helper
    });
};

export { Resizable };