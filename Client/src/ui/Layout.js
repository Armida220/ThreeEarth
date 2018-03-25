import { Container } from './Container';

function Layout(options) {
    Container.call(this, options);
    options = options || {};
}

Layout.prototype = Object.create(Container.prototype);
Layout.prototype.constructor = Layout;

export { Layout };