import { Control } from '../../ui/Control';
import { Fieldset } from '../../ui/control/Fieldset';
import { CheckboxField } from '../../ui/control/CheckboxField';
import { ColorField } from '../../ui/control/ColorField';
import { NumberField } from '../../ui/control/NumberField';

function SettingPanel(options) {
    Control.call(this, options);
}

SettingPanel.prototype = Object.create(Control.prototype);
SettingPanel.prototype.constructor = SettingPanel;

SettingPanel.prototype.render = function () {

};

export { SettingPanel };