import { Layout } from '../Layout';

function CenterLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

CenterLayout.prototype = Object.create(Layout.prototype);
CenterLayout.prototype.constructor = CenterLayout;

export { CenterLayout };