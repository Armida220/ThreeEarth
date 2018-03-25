import { Interaction } from '../Interaction';
import { Control } from '../Control';
import { UiHelper } from '../UiHelper';

function Sortable(options) {
    Interaction.call(this, options);
    options = options || {};
}

Sortable.prototype = Object.create(Interaction.prototype);
Sortable.prototype.constructor = Sortable;

Sortable.prototype.apply = function (control) {
    this.target = control instanceof Control ? control.el : control;
    $(this.target).sortable();
    $(this.target).disableSelection();
};

export { Sortable };