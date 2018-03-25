import { Control } from '../Control';

function ProgressBar(options) {
    Control.call(this, options);
    options = options || {};
    this.width = options.width || null;
    this.value = options.value || 0;
}

ProgressBar.prototype = Object.create(Control.prototype);
ProgressBar.prototype.constructor = ProgressBar;

ProgressBar.prototype.render = function () {
    this.el.div = document.createElement('div');
    this.el.div.style.width = this.width;
    this.parent.appendChild(this.el.div);
    $(this.el.div).progressbar({
        value: this.value
    });
};

export { ProgressBar };