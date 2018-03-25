import { Layout } from '../Layout';

function FormLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

FormLayout.prototype = Object.create(Layout.prototype);
FormLayout.prototype.constructor = FormLayout;

export { FormLayout };