import { Layout } from '../Layout';

function TableLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

TableLayout.prototype = Object.create(Layout.prototype);
TableLayout.prototype.constructor = TableLayout;

export { TableLayout };