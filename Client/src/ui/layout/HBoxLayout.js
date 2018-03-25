import { Layout } from '../Layout';

function HBoxLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

HBoxLayout.prototype = Object.create(Layout.prototype);
HBoxLayout.prototype.constructor = HBoxLayout;

export { HBoxLayout };