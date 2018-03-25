import { Interaction } from '../Interaction';
import { Control } from '../Control';
import { UiHelper } from '../UiHelper';

function Selectable(options) {
    Interaction.call(this, options);
    options = options || {};
    UiHelper.addCssRule('.ui-selecting', ' background: #FECA40; ');
    UiHelper.addCssRule('.ui-selected', ' background: #F39814; color: white; ');
}

Selectable.prototype = Object.create(Interaction.prototype);
Selectable.prototype.constructor = Selectable;

Selectable.prototype.apply = function (control) {
    this.target = control instanceof Control ? control.el : control;
    $(this.target).selectable();
};

export { Selectable };