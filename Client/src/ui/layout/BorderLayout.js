import { Layout } from '../Layout';

function BorderLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

BorderLayout.prototype = Object.create(Layout.prototype);
BorderLayout.prototype.constructor = BorderLayout;

export { BorderLayout };