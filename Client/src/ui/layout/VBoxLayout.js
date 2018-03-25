import { Layout } from '../Layout';

function VBoxLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

VBoxLayout.prototype = Object.create(Layout.prototype);
VBoxLayout.prototype.constructor = VBoxLayout;

export { VBoxLayout };