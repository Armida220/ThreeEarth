import { Control } from '../Control';

function TextField(options) {
    Control.call(this, options);
    options = options || {};
    this.type = options.type || 'text';
    this.label = options.label || null;
    this.labelWidth = options.labelWidth || '45px';
    this.value = options.value || '';
    this.enabled = options.enabled || true;
}

TextField.prototype = Object.create(Control.prototype);
TextField.prototype.constructor = TextField;

TextField.prototype.render = function () {
    // this.el.div = d3.select(this.parent)
    //     .append('div')
    //     .style('margin', '3px 0')
    //     .node();

    // if (this.label) {
    //     this.el.label = d3.select(this.el.div)
    //         .append('label')
    //         .data([this])
    //         .text(function(d) {
    //             return d.label;
    //         })
    //         .style('width', function(d) {
    //             return d.labelWidth;
    //         })
    //         .style('display', 'inline-block')
    //         .style('text-align', 'right')
    //         .node();
    // }

    // this.el.input = d3.select(this.el.div)
    //     .append('input')
    //     .data([this])
    //     .property('type', function(d) {
    //         return d.type;
    //     })
    //     .attr('value', function(d) {
    //         return d.value;
    //     })
    //     .style('margin-left', '10px')
    //     .attr('disabled', function(d) {
    //         if (d.enabled) {
    //             return null;
    //         } else {
    //             return 'disabled';
    //         }
    //     })
    //     .node();
};

TextField.prototype.getValue = function () {
    // return d3.select(this.el.input).property('value');
};

TextField.prototype.setValue = function (value) {
    // this.value = value;
    // d3.select(this.el.input).property('value', this.value);
};

TextField.prototype.on = function (eventName, callback) {
    // if (callback == null) {
    //     d3.select(this.el.input).on(eventName, null);
    // } else if (typeof(callback) == 'function') {
    //     var _this = this;
    //     d3.select(this.el.input).on(eventName, function() {
    //         callback.call(_this, _this.getValue());
    //     });
    // }
};

export { TextField };