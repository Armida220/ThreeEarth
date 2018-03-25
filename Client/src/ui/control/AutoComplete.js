import { Control } from '../Control';

function AutoComplete(options) {
    Control.call(this, options);
    options = options || {};
    this.source = options.source || []; // [ 'text1', 'text2' ]
}

AutoComplete.prototype = Object.create(Control.prototype);
AutoComplete.prototype.constructor = AutoComplete;

AutoComplete.prototype.render = function () {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).autocomplete({
        source: this.source
    });
};

export { AutoComplete };