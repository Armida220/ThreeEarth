(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.TE = {})));
}(this, (function (exports) { 'use strict';

	var ID = -1;

	function BaseEvent(options) {
	    this.app = options.app || null;
	    this.id = options.id || 'BaseEvent-' + ID--;
	}

	BaseEvent.prototype.start = function () {

	};

	BaseEvent.prototype.stop = function () {

	};

	var CustomEventNames = [
	    // ../Application.js
	    'beforeRender',
	    'render',
	    'applicationStart',

	    // ../editor/menu/NavMenu.js
	    'newScene',
	    'openScene',
	    'saveScene',
	    'quitEditor',

	    'undo',
	    'redo',

	    'mapPropertyConfig',
	    'environmentSetting',

	    'addPoint',
	    'addPolyline',
	    'addPolygon',
	    'addRectangle',
	    'addEllipse',
	    'addCorridor',
	    'addLabel',
	    'addBox',
	    'addCylinder',
	    'addTube',
	    'addEllipsoid',
	    'addWall',

	    'debug',
	    'play',

	    'document',
	    'about',

	    // ../map/Map.js
	    'click',
	    'contextmenu',
	    'dblclick',
	    'keydown',
	    'keyup',
	    'mousedown',
	    'mousemove',
	    'mouseup',
	    'mousewheel'
	];

	var noop = {value: function() {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}

	function CustomEvent(options) {
	    BaseEvent.call(this, options);
	    this.dispatch = dispatch.apply(dispatch, CustomEventNames);
	    this.events = [
	        //new HoverObjectEvent3D(app),
	        //new SelectObjectEvent3D(app),
	    ];
	    this.app.CustomEventNames = CustomEventNames;
	    this.app.events = this.events;
	    this.app.dispatch = this.dispatch;
	}

	CustomEvent.prototype.start = function () {
	    this.events.forEach(function (n) {
	        if (!n instanceof BaseEvent) {
	            throw 'CustomEvent: n is not an instance of BaseEvent.';
	        }
	        n.start();
	    });
	};

	CustomEvent.prototype.stop = function () {
	    this.events.forEach(function (n) {
	        n.stop();
	    });
	};

	CustomEvent.prototype.call = function (eventName) {
	    var args = [arguments[0], this];
	    for (var i = 1; i < arguments.length; i++) {
	        args[i + 1] = arguments[i];
	    }
	    this.dispatch.call.apply(this.dispatch, args);
	};

	CustomEvent.prototype.on = function (eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	CustomEvent.prototype.addEvent = function (event) {
	    if (!event instanceof BaseEvent) {
	        throw 'CustomEvent: event is not an instanceof BaseEvent.';
	    }
	    this.events.push(event);
	};

	CustomEvent.prototype.removeEvent = function (event) {
	    var index = this.events.indexOf(event);
	    if (index > -1) {
	        this.events.splice(index, 1);
	    }
	};

	function Control(options) {
	    options = options || {};
	    this.parent = options.parent || document.body;
	    this.el = {};
	}

	Control.prototype.render = function () {

	};

	function UiHelper() {

	}

	UiHelper.createStyleSheet = function () {
	    var head = document.head || document.getElementsByTagName('head')[0];
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    head.appendChild(style);
	    return style.sheet || style.styleSheet;
	};

	UiHelper.addCssRule = function (selector, rules, index) {
	    index = index || 0;
	    var sheet = UiHelper.createStyleSheet();
	    if (sheet.insertRule) {
	        sheet.insertRule(selector + "{" + rules + "}", index);
	    } else if (sheet.addRule) {
	        sheet.addRule(selector, rules, index);
	    }
	};

	function UiStyler(options) {
	    options = options || {};

	    // Positioning
	    this.position = options.position || null;
	    this.left = options.left || null;
	    this.top = options.top || null;
	    this.right = options.right || null;
	    this.bottom = options.bottom || null;
	    this.zIndex = options.zIndex || null;

	    // Layout
	    this.clear = options.clear || null;
	    this.display = options.display || null;
	    this.float = options.float || null;
	    this.overflow = options.overflow || null;
	    this.overflowX = options.overflowX || null;
	    this.overflowY = options.overflowY || null;
	    this.rotation = options.rotation || null;
	    this.visibility = options.visibility || null;

	    // Flexible-box

	    // Dimension
	    this.width = options.width || null;
	    this.height = options.height || null;
	    this.maxWidth = options.maxWidth || null;
	    this.minWidth = options.minWidth || null;
	    this.maxHeight = options.maxHeight || null;
	    this.minHeight = options.minHeight || null;

	    // Margin
	    this.margin = options.margin || null;
	    this.marginTop = options.Top || null;
	    this.marginRight = options.marginRight || null;
	    this.marginBottom = options.marginBottom || null;
	    this.marginLeft = options.marginLeft || null;

	    // Padding
	    this.padding = options.padding || null;
	    this.paddingTop = options.paddingTop || null;
	    this.paddingRight = options.paddingRight || null;
	    this.paddingBottom = options.paddingBottom || null;
	    this.paddingLeft = options.paddingLeft || null;

	    // Border
	    this.border = options.border || null;
	    this.borderWidth = options.borderWidth || null;
	    this.borderStyle = options.borderStyle || null;
	    this.borderColor = options.borderColor || null;
	    this.borderRadius = options.borderRadius || null;
	    this.borderShadow = options.borderShadow || null;

	    // Background
	    this.background = options.background || null;

	    // Color
	    this.color = options.color || null;
	    this.opacity = options.opacity || null;

	    // Font
	    this.font = options.font || null;

	    // Text
	    this.textAlign = options.textAlign || null;
	    this.lineHeight = options.lineHeight || null;

	    // Text Decoration
	    this.textDecoration = options.textDecoration || null;
	    this.textShadow = options.textShadow || null;

	    // List
	    this.listStyle = options.listStyle || null;

	    // Table
	    this.tableLayout = options.tableLayout || null;
	    this.borderCollapse = options.borderCollapse || null;

	    // Content
	    this.content = options.content || null;

	    // User Interface
	    this.cursor = options.cursor || null;
	    this.boxSizing = options.boxSizing || null;
	}

	UiStyler.prototype.render = function (dom, scope) {
	    var _this = scope || this;
	    dom.style.position = _this.position;

	    // Positioning
	    dom.style.position = _this.position;
	    dom.style.left = _this.left;
	    dom.style.top = _this.top;
	    dom.style.right = _this.right;
	    dom.style.bottom = _this.bottom;
	    dom.style.zIndex = _this.zIndex;

	    // Layout
	    dom.style.clear = _this.clear;
	    dom.style.display = _this.display;
	    dom.style.float = _this.float;
	    dom.style.overflow = _this.overflow;
	    dom.style.overflowX = _this.overflowX;
	    dom.style.overflowY = _this.overflowY;
	    dom.style.rotation = _this.rotation;
	    dom.style.visibility = _this.visibility;

	    // Flexible-box

	    // Dimension
	    dom.style.width = _this.width;
	    dom.style.height = _this.height;
	    dom.style.maxWidth = _this.maxWidth;
	    dom.style.minWidth = _this.minWidth;
	    dom.style.maxHeight = _this.maxHeight;
	    dom.style.minHeight = _this.minHeight;

	    // Margin
	    dom.style.margin = _this.margin;
	    dom.style.marginTop = _this.Top;
	    dom.style.marginRight = _this.marginRight;
	    dom.style.marginBottom = _this.marginBottom;
	    dom.style.marginLeft = _this.marginLeft;

	    // Padding
	    dom.style.padding = _this.padding;
	    dom.style.paddingTop = _this.paddingTop;
	    dom.style.paddingRight = _this.paddingRight;
	    dom.style.paddingBottom = _this.paddingBottom;
	    dom.style.paddingLeft = _this.paddingLeft;

	    // Border
	    dom.style.border = _this.border;
	    dom.style.borderWidth = _this.borderWidth;
	    dom.style.borderStyle = _this.borderStyle;
	    dom.style.borderColor = _this.borderColor;
	    dom.style.borderRadius = _this.borderRadius;
	    dom.style.borderShadow = _this.borderShadow;

	    // Background
	    dom.style.background = _this.background;

	    // Color
	    dom.style.color = _this.color;
	    dom.style.opacity = _this.opacity;

	    // Font
	    dom.style.font = _this.font;

	    // Text
	    dom.style.textAlign = _this.textAlign;
	    dom.style.lineHeight = _this.lineHeight;

	    // Text Decoration
	    dom.style.textDecoration = _this.textDecoration;
	    dom.style.textShadow = _this.textShadow;

	    // List
	    dom.style.listStyle = _this.listStyle;

	    // Table
	    dom.style.tableLayout = _this.tableLayout;
	    dom.style.borderCollapse = _this.borderCollapse;

	    // Content
	    dom.style.content = _this.content;

	    // User Interface
	    dom.style.cursor = _this.cursor;
	    dom.style.boxSizing = _this.boxSizing;
	};

	function Container(options) {
	    Control.call(this, options);

	    options = options || {};
	    this.children = options.children || [];
	}

	Container.prototype = Object.create(Control.prototype);
	Container.prototype.constructor = Container;

	Container.prototype.add = function (control) {
	    this.children.push(control);
	};

	Container.prototype.insert = function (index, control) {
	    this.children.splice(index, 0, control);
	};

	Container.prototype.remove = function (control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.removeAt(index);
	    }
	};

	Container.prototype.removeAt = function (index) {
	    this.children.splice(index, 1);
	};

	Container.prototype.render = function () {
	    this.el = document.createElement('div');
	    var _this = this;
	    this.children.forEach(function (n, i) {
	        n.parent = _this.el;
	        n.render.call(n);
	    });
	};

	function FixedContainer(options) {
	    Container.call(this, options);
	    this.children = options.children || [];
	    this.width = options.width || '220px';
	    this.height = options.height || '120px';
	    this.margin = options.margin || '10px';
	    this.padding = options.padding || '2px';
	    this.display = options.display || 'block';
	    this.borderWidth = options.borderWidth || '2px';
	    this.borderColor = options.borderColor || 'black';
	    this.borderStyle = options.borderStyle || 'solid';
	    this.float = options.float || null;
	    this.html = options.html || null;
	    this.cls = options.cls || null;
	}

	FixedContainer.prototype = Object.create(Container.prototype);
	FixedContainer.prototype.constructor = FixedContainer;

	FixedContainer.prototype.render = function () {
	    this.el = document.createElement('div');
	    this.el.style.width = this.width;
	    this.el.style.height = this.height;
	    this.el.style.borderWidth = this.borderWidth;
	    this.el.style.borderColor = this.borderColor;
	    this.el.style.borderStyle = this.borderStyle;
	    this.el.style.margin = this.margin;
	    this.el.style.padding = this.padding;
	    this.el.style.display = this.display;
	    this.el.style.float = this.float;
	    this.el.className = this.cls;
	    this.el.innerHTML = this.html;
	    this.parent.append(this.el);
	    var _this = this;
	    this.children.forEach(function (n, i) {
	        n.parent = _this.el;
	        n.render.call(n);
	    });
	};

	function Interaction(options) {
	    options = options || {};
	}

	Interaction.prototype.apply = function () {

	};

	function Draggable(options) {
	    Interaction.call(this, options);
	    options = options || {};

	    this.dispatch = d3.dispatch('start', 'drag', 'stop');

	    this.scroll = options.scroll || true;
	    this.scrollSensitivity = options.scrollSensitivity || null;
	    this.scrollSpeed = options.scrollSpeed || null;
	    this.axis = options.axis || null; // 'x' or 'y'
	    this.containment = options.containment || null; // '#containment-wrapper' or 'parent'
	    this.cursor = options.cursor || null; // 'move', 'crosshair', ...
	    this.cursorAt = options.cursorAt || null; // { left: -5, top: -5 } or { bottom: 0 }
	}

	Draggable.prototype = Object.create(Interaction.prototype);
	Draggable.prototype.constructor = Draggable;

	Draggable.prototype.apply = function (control) {
	    var el = control instanceof Control ? control.el : control;
	    var _this = this;
	    $(el).draggable({
	        scroll: this.scroll,
	        scrollSensitivity: this.scrollSensitivity,
	        scrollSpeed: this.scrollSpeed,
	        axis: this.axis,
	        containment: this.containment,
	        cursor: this.cursor,
	        cursorAt: this.cursorAt,
	        start: function () {
	            _this.dispatch.call('start', _this);
	        },
	        drag: function () {
	            _this.dispatch.call('drag', _this);
	        },
	        stop: function () {
	            _this.dispatch.call('stop', _this);
	        }
	    });
	};

	Draggable.prototype.on = function (eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	function Droppable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	    this.dispatch = d3.dispatch('drop');
	    this.accept = options.accept || '*';
	    this.classes = options.classes || {
	        "ui-droppable-active": "ui-state-active",
	        "ui-droppable-hover": "ui-state-hover"
	    };
	}

	Droppable.prototype = Object.create(Interaction.prototype);
	Droppable.prototype.constructor = Droppable;

	Droppable.prototype.apply = function (control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).droppable();

	    var _this = this;
	    $(this.target).droppable({
	        accept: this.accept,
	        classes: this.classes,
	        drop: function (event, ui) {
	            _this.dispatch.call('drop', _this, event, ui);
	        }
	    });
	};

	Droppable.prototype.on = function (eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	function Resizable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	    this.animate = options.animate || true;
	    this.helper = options.helper || 'ui-resizable-helper';

	    UiHelper.addCssRule('.ui-resizable-helper', ' border: 2px dotted #00F; ');
	}

	Resizable.prototype = Object.create(Interaction.prototype);
	Resizable.prototype.constructor = Resizable;

	Resizable.prototype.apply = function (control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).resizable({
	        animate: this.animate,
	        helper: this.helper
	    });
	};

	function Selectable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	    UiHelper.addCssRule('.ui-selecting', ' background: #FECA40; ');
	    UiHelper.addCssRule('.ui-selected', ' background: #F39814; color: white; ');
	}

	Selectable.prototype = Object.create(Interaction.prototype);
	Selectable.prototype.constructor = Selectable;

	Selectable.prototype.apply = function (control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).selectable();
	};

	function Sortable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	}

	Sortable.prototype = Object.create(Interaction.prototype);
	Sortable.prototype.constructor = Sortable;

	Sortable.prototype.apply = function (control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).sortable();
	    $(this.target).disableSelection();
	};

	function Layout(options) {
	    Container.call(this, options);
	    options = options || {};
	}

	Layout.prototype = Object.create(Container.prototype);
	Layout.prototype.constructor = Layout;

	function BorderLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	BorderLayout.prototype = Object.create(Layout.prototype);
	BorderLayout.prototype.constructor = BorderLayout;

	function CenterLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	CenterLayout.prototype = Object.create(Layout.prototype);
	CenterLayout.prototype.constructor = CenterLayout;

	function FormLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	FormLayout.prototype = Object.create(Layout.prototype);
	FormLayout.prototype.constructor = FormLayout;

	function HBoxLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	HBoxLayout.prototype = Object.create(Layout.prototype);
	HBoxLayout.prototype.constructor = HBoxLayout;

	function TableLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	TableLayout.prototype = Object.create(Layout.prototype);
	TableLayout.prototype.constructor = TableLayout;

	function VBoxLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	VBoxLayout.prototype = Object.create(Layout.prototype);
	VBoxLayout.prototype.constructor = VBoxLayout;

	function Accordion(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || null;
	    this.cls = options.cls || null;
	    this.fit = options.fit || null;
	    this.children = options.children || [];
	}

	Accordion.prototype = Object.create(Control.prototype);
	Accordion.prototype.constructor = Accordion;

	Accordion.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.el.div.style.width = this.width;
	    this.parent.appendChild(this.el.div);
	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.div;
	        n.render.call(n);
	    });
	    $(this.el.div).accordion({
	        heightStyle: this.fit ? 'fill' : null
	    });
	};

	function AccordionItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.title = options.title || 'Tab';
	    this.html = options.html || null;
	    this.children = options.children || [];
	}

	AccordionItem.prototype = Object.create(Control.prototype);
	AccordionItem.prototype.constructor = AccordionItem;

	AccordionItem.prototype.render = function () {
	    this.el.title = document.createElement('h3');
	    this.el.title.innerHTML = this.title;
	    this.parent.appendChild(this.el.title);

	    this.el.body = document.createElement('div');
	    this.el.body.innerHTML = this.html;
	    this.parent.appendChild(this.el.body);

	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.body;
	        n.render.call(n);
	    });
	};

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

	function Button(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.text = options.text || 'Button';
	}

	Button.prototype = Object.create(Control.prototype);
	Button.prototype.constructor = Button;

	Button.prototype.render = function () {
	    this.el.button = document.createElement('button');
	    this.el.button.innerHTML = this.text;
	    this.parent.appendChild(this.el.button);
	    $(this.el.button).button();
	};

	function CheckBox(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.label = options.label || null;
	    this.value = options.value || null;
	}

	CheckBox.prototype = Object.create(Control.prototype);
	CheckBox.prototype.constructor = CheckBox;

	CheckBox.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.parent.appendChild(this.el.div);
	    if (this.label) {
	        this.el.label = document.createElement('label');
	        this.el.label.innerHTML = this.label;
	        this.el.div.appendChild(this.el.label);
	    }
	    this.el.input = document.createElement('input');
	    this.el.input.setAttribute('type', 'checkbox');
	    this.el.input.setAttribute('value', this.value);
	    this.el.div.appendChild(this.el.input);
	    $(this.el.div).controlgroup();
	};

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

	function CheckboxField(options) {
	    TextField.call(this, options);
	    this.type = 'checkbox';
	}

	CheckboxField.prototype = Object.create(TextField.prototype);
	CheckboxField.prototype.constructor = CheckboxField;

	CheckboxField.prototype.getValue = function () {
	    return this.el.input.checked;
	};

	function CheckboxRadio(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.text = options.text || 'Label';
	    this.type = options.type || 'radio'; // radio, checkbox
	}

	CheckboxRadio.prototype = Object.create(Control.prototype);
	CheckboxRadio.prototype.constructor = CheckboxRadio;

	CheckboxRadio.prototype.render = function () {
	    var index = CheckboxRadio.index++;
	    this.el.label = document.createElement('label');
	    this.el.label.setAttribute('for', this.type + index);
	    this.el.label.innerHTML = this.text;
	    this.parent.appendChild(this.el.label);

	    this.el.input = document.createElement('input');
	    this.el.input.type = this.type;
	    this.el.input.id = this.type + index;
	    this.el.input.name = this.type + index;
	    this.parent.appendChild(this.el.input);

	    $(this.el.input).checkboxradio();
	};

	CheckboxRadio.index = 1;

	function ColorField(options) {
	    TextField.call(this, options);
	    this.type = 'color';
	}

	ColorField.prototype = Object.create(TextField.prototype);
	ColorField.prototype.constructor = ColorField;

	function ControlGroup(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.children = options.children || [];
	    this.direction = options.direction || 'vertical'; // horizontal, vertical
	}

	ControlGroup.prototype = Object.create(Control.prototype);
	ControlGroup.prototype.constructor = ControlGroup;

	ControlGroup.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.parent.appendChild(this.el.div);
	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.div;
	        n.render.call(n);
	    });
	    $(this.el.div).ControlGroup({
	        direction: this.direction
	    });
	};

	function DateField(options) {
	    TextField.call(this, options);
	    this.type = 'date';
	}

	DateField.prototype = Object.create(TextField.prototype);
	DateField.prototype.constructor = DateField;

	function DatePicker(options) {
	    Control.call(this, options);
	    options = options || {};
	}

	DatePicker.prototype = Object.create(Control.prototype);
	DatePicker.prototype.constructor = DatePicker;

	DatePicker.prototype.render = function () {
	    this.el.input = document.createElement('input');
	    this.parent.appendChild(this.el.input);
	    $(this.el.input).datepicker();
	};

	function Dialog(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.title = options.title || 'Dialog';
	    this.width = options.width || 300;
	    this.height = options.height || 'auto';
	    this.html = options.html || null;
	    this.children = options.children || [];
	}

	Dialog.prototype = Object.create(Control.prototype);
	Dialog.prototype.constructor = Dialog;

	Dialog.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.el.div.setAttribute('title', this.title);
	    this.el.div.innerHTML = this.html;
	    this.parent.appendChild(this.el.div);
	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.div;
	        n.render.call(n);
	    });
	    $(this.el.div).dialog({
	        width: this.width,
	        height: this.height
	    });
	};

	Dialog.prototype.show = function () {
	    $(this.el.div).dialog('open');
	};

	Dialog.prototype.hide = function () {
	    $(this.el.div).dialog('close');
	};

	function Fieldset(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.title = options.title || null;
	    this.children = options.children || [];
	}

	Fieldset.prototype = Object.create(Control.prototype);
	Fieldset.prototype.constructor = Fieldset;

	Fieldset.prototype.add = function (control) {
	    control.parent = this.el.fieldset;
	    this.children.push(control);
	    control.render.call(control);
	};

	Fieldset.prototype.render = function () {
	    this.el.fieldset = document.createElement('fieldset');
	    this.parent.appendChild(this.el.fieldset);

	    if (this.title) {
	        this.el.legend = document.createElement('legend');
	        this.el.legend.innerHTML = this.title;
	        this.el.fieldset.appendChild(this.el.legend);
	    }

	    var _this = this;
	    this.children.forEach(function (n, i) {
	        n.parent = _this.el.fieldset;
	        n.render.call(n);
	    });
	};

	var ID$1 = -1;

	function GridPanel(options) {
	    Control.call(this, options);
	    options = options || {};

	    this.id = options.id || 'GridPanel' + ID$1--;
	    this.url = options.url;
	    this.caption = options.caption || null;
	    this.colNames = options.colNames || ['Inv No', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'];
	    this.colModel = options.colModel || [
	        { name: 'id', index: 'id', width: 55 },
	        { name: 'invdate', index: 'invdate', width: 90 },
	        { name: 'name', index: 'name asc, invdate', width: 100 },
	        { name: 'amount', index: 'amount', width: 80, align: "right" },
	        { name: 'tax', index: 'tax', width: 80, align: "right" },
	        { name: 'total', index: 'total', width: 80, align: "right" },
	        { name: 'note', index: 'note', width: 150, sortable: false }
	    ];
	    this.width = options.width || '300px';
	    this.height = options.height || '120px';

	    this.rowNum = options.rowNum || 10;
	    this.rowList = options.rowList || [10, 20, 50, 100];
	    this.pager = options.pager === false ? false : true;
	    this.dispatch = dispatch('afterInsertRow', 'beforeRequest', 'beforeSelectRow', 'gridComplete', 'loadComplete', 'loadError',
	        'cellSelect', 'dblClickRow', 'headerClick', 'paging', 'rightClickRow', 'selectAll', 'selectRow', 'sortCol', 'resizeStart',
	        'resizeStop', 'serializeGridData');
	}

	GridPanel.prototype = Object.create(Control.prototype);
	GridPanel.prototype.constructor = GridPanel;

	GridPanel.prototype.render = function () {
	    this.el.table = document.createElement('table');
	    this.el.table.id = this.id;
	    this.el.table.style.width = this.width;
	    this.el.table.style.height = this.height;
	    this.parent.appendChild(this.el.table);

	    if (this.pager) {
	        this.el.pager = document.createElement('div');
	        this.el.pager.id = this.id + '-pager';
	        this.parent.appendChild(this.el.pager);
	    }

	    var _this = this;
	    $('#' + this.id).jqGrid({
	        width: this.width,
	        height: this.height,
	        url: this.url,
	        datatype: "json",
	        colNames: this.colNames,
	        colModel: this.colModel,
	        rowNum: this.rowNum,
	        rowList: this.rowList,
	        pager: this.pager ? '#' + this.id + '-pager' : null,
	        //sortname: 'id',
	        mtype: 'post',
	        viewrecords: true,
	        //sortorder: 'desc',
	        //caption: this.caption,
	        //autowidth: true,
	        rownumbers: true,
	        //shrinkToFit: true
	        beforeSelectRow: function (rowid, e) {
	            _this.dispatch.call('beforeSelectRow', _this, rowid, e);
	        },
	        loadComplete: function (xhr) {
	            _this.dispatch.call('loadComplete', _this, xhr);
	        },
	        loadError: function (xhr, status, error) {
	            _this.dispatch.call('loadError', _this, xhr, status, error);
	        },
	        onCellSelect: function (rowid, iCol, cellcontent, e) {
	            _this.dispatch.call('cellSelect', _this, rowid, iCol, cellcontent, e);
	        },
	        ondblClickRow: function (rowid, iRow, iCol, e) {
	            _this.dispatch.call('dblClickRow', _this, rowid, iRow, iCol, e);
	        },
	        onSelectRow: function (rowid, status) {
	            _this.dispatch.call('selectRow', _this, rowid, status);
	        }
	    });
	    // $('#' + this.id).setGridWidth(this.el.table.clientWidth);
	    // $('#' + this.id).setGridHeight(this.el.table.clientHeight);
	};

	GridPanel.prototype.on = function (eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	GridPanel.prototype.getCell = function (rowid, iCol) {
	    return $('#' + this.id).jqGrid('getCell', rowid, iCol);
	};

	GridPanel.prototype.getRowData = function (rowid) {
	    return $('#' + this.id).jqGrid('getRowData', rowid);
	};

	GridPanel.prototype.reload = function () {
	    $('#' + this.id).trigger('reloadGrid');
	};

	function List(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || '100px';
	    this.height = options.height || 'auto';
	    this.children = options.children || []; // [ 'item1', 'item2', 'item3' ]
	    this.style = options.style || 'list-style: none; margin: 0; -webkit-padding-start: 0;';
	    this.itemStyle = options.itemStyle || 'border: 1px solid #ccc; margin: 1px;';
	}

	List.prototype = Object.create(Control.prototype);
	List.prototype.constructor = List;

	List.prototype.render = function () {
	    this.el = document.createElement('ul');
	    this.el.style = this.style;
	    this.parent.appendChild(this.el);
	    this.el.items = [];
	    var _this = this;
	    this.children.forEach(function (n) {
	        var item = document.createElement('li');
	        item.innerHTML = n;
	        item.style = _this.itemStyle;
	        _this.el.appendChild(item);
	        _this.el.items.push(item);
	    });

	};

	function Menu(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || null;
	    this.cls = options.cls || '';
	    this.direction = options.direction || 'vertical'; // horizontal, vertical
	    this.children = options.children || [];
	    this.dispatch = dispatch('blur', 'create', 'focus', 'select');
	}

	Menu.prototype = Object.create(Control.prototype);
	Menu.prototype.constructor = Menu;

	Menu.prototype.blur = function () {
	    $(this.el.ul).menu('blur');
	};

	Menu.prototype.collapse = function () {
	    $(this.el.ul).menu('collapse');
	};

	Menu.prototype.collapseAll = function () {
	    $(this.el.ul).menu('collapseAll');
	};

	Menu.prototype.destroy = function () {
	    $(this.el.ul).menu('destroy');
	};

	Menu.prototype.disable = function () {
	    $(this.el.ul).menu('disable');
	};

	Menu.prototype.enable = function () {
	    $(this.el.ul).menu('enable');
	};

	Menu.prototype.expand = function () {
	    $(this.el.ul).menu('expand');
	};

	Menu.prototype.render = function () {
	    this.el.ul = document.createElement('ul');
	    this.el.ul.className = this.cls;
	    if (this.direction == 'horizontal') {
	        this.el.ul.className = ' ui-menu-horizontal';
	    }
	    this.el.ul.style.width = this.width;
	    this.parent.appendChild(this.el.ul);
	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.ul;
	        n.render.call(n);
	    });
	    if (this.direction == 'vertical') {
	        $(this.el.ul).menu({
	            blur: function (event, ui) {
	                _this.dispatch.call('blur', _this, event, ui);
	            },
	            create: function (event, ui) {
	                _this.dispatch.call('create', _this, event, ui);
	            },
	            focus: function (event, ui) {
	                _this.dispatch.call('focus', _this, event, ui);
	            },
	            select: function (event, ui) {
	                _this.dispatch.call('select', _this, event, ui);
	            }
	        });
	    } else {
	        $(this.el.ul).menu({
	            icons: {
	                submenu: 'ui-icon-caret-1-s'
	            },
	            position: {
	                my: 'left top',
	                at: 'left bottom'
	            },
	            blur: function (event, ui) {
	                _this.dispatch.call('blur', _this, event, ui);
	            },
	            create: function (event, ui) {
	                _this.dispatch.call('create', _this, event, ui);
	            },
	            focus: function (event, ui) {
	                _this.dispatch.call('focus', _this, event, ui);
	            },
	            select: function (event, ui) {
	                _this.dispatch.call('select', _this, event, ui);
	            }
	        });
	    }
	};

	Menu.prototype.on = function (eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	function MenuItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.id = options.id || 'menuitem' + MenuItem.index--;
	    this.text = options.text || 'Menu Item';
	    this.cls = options.cls || null;
	    this.subCls = options.subCls || null;
	    this.children = options.children || [];
	}

	MenuItem.prototype = Object.create(Control.prototype);
	MenuItem.prototype.constructor = MenuItem;

	MenuItem.prototype.render = function () {
	    this.el.li = document.createElement('li');
	    this.el.li.setAttribute('id', this.id);
	    this.el.li.className = this.cls;
	    this.el.div = document.createElement('div');
	    this.el.div.innerHTML = this.text;
	    this.el.li.appendChild(this.el.div);
	    this.parent.appendChild(this.el.li);
	    if (this.children.length == 0) {
	        return;
	    }
	    this.el.ul = document.createElement('ul');
	    if (this.subCls) {
	        this.el.ul.className = this.subCls;
	    }
	    this.el.li.appendChild(this.el.ul);
	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.ul;
	        n.render.call(n);
	    });
	};

	MenuItem.index = -1;

	function NumberField(options) {
	    TextField.call(this, options);
	    this.type = 'number';
	}

	NumberField.prototype = Object.create(TextField.prototype);
	NumberField.prototype.constructor = NumberField;

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

	function RangeField(options) {
	    TextField.call(this, options);
	    this.type = 'range';
	}

	RangeField.prototype = Object.create(TextField.prototype);
	RangeField.prototype.constructor = RangeField;

	function SelectMenu(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.children = options.children || [];
	}

	SelectMenu.prototype = Object.create(Control.prototype);
	SelectMenu.prototype.constructor = SelectMenu;

	SelectMenu.prototype.render = function () {
	    this.el.select = document.createElement('select');
	    this.parent.appendChild(this.el.select);
	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.select;
	        n.render.call(n);
	    });
	    $(this.el.select).selectmenu();
	};

	function SelectMenuItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.text = options.text || 'Item';
	}

	SelectMenuItem.prototype = Object.create(Control.prototype);
	SelectMenuItem.prototype.constructor = SelectMenuItem;

	SelectMenuItem.prototype.render = function () {
	    this.el.option = document.createElement('option');
	    this.el.option.innerHTML = this.text;
	    this.parent.appendChild(this.el.option);
	};

	function Slider(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || '200px';
	}

	Slider.prototype = Object.create(Control.prototype);
	Slider.prototype.constructor = Slider;

	Slider.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.el.div.style.width = this.width;
	    this.parent.appendChild(this.el.div);
	    $(this.el.div).slider();
	};

	function Spinner(options) {
	    Control.call(this, options);
	    options = options || {};
	}

	Spinner.prototype = Object.create(Control.prototype);
	Spinner.prototype.constructor = Spinner;

	Spinner.prototype.render = function () {
	    this.el.input = document.createElement('input');
	    this.parent.appendChild(this.el.input);
	    $(this.el.input).spinner();
	};

	var ID$2 = -1;

	function TabItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.id = options.id || 'tabitem' + ID$2--;
	    this.title = options.title || 'Tab';
	    this.html = options.html || null;
	    this.children = options.children || [];
	    this.overflow = options.overflow || null;
	    this.closable = options.closable || false;
	    this.tabs = options.tabs || null;
	}

	TabItem.prototype = Object.create(Control.prototype);
	TabItem.prototype.constructor = TabItem;

	TabItem.prototype.add = function (control) {
	    this.children.push(control);
	    control.parent = this.el.div;
	    control.render.call(control);
	};

	TabItem.prototype.insert = function (index, control) {
	    this.children.splice(index, 0, control);
	    control.parent = this.el.div;
	    control.render.call(control);
	};

	TabItem.prototype.remove = function (control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.children.splice(index, 1);
	        $(this.el.div).children().eq(index).remove();
	    }
	};

	TabItem.prototype.removeAt = function (index) {
	    this.children.splice(index, 1);
	    $(this.el.div).children().eq(index).remove();
	};

	TabItem.prototype.removeAll = function () {
	    this.children = [];
	    $(this.el.div).empty();
	};

	TabItem.prototype.clear = function () {
	    this.removeAll();
	};

	TabItem.prototype.close = function () {
	    var index = $(this.el.li).index();
	    $(this.el.li).remove();
	    $(this.el.div).remove();
	    $(this.parent).tabs('refresh');
	    if (this.tabs) {
	        this.tabs.children.splice(index, 1);
	        this.tabs.dispatch.call('close', this.tabs, this);
	    }
	};

	TabItem.prototype.render = function () {
	    var _this = this;
	    var index = TabItem.index++;
	    this.el.li = document.createElement('li');
	    this.el.a = document.createElement('a');
	    this.el.a.innerHTML = this.title;
	    this.el.a.setAttribute('href', '#' + this.id);
	    this.el.li.appendChild(this.el.a);
	    if (this.closable) {
	        this.el.span = document.createElement('span');
	        this.el.span.className = 'ui-icon ui-icon-close';
	        this.el.span.setAttribute('role', 'presentation');
	        this.el.span.innerHTML = 'Remove Tab';
	        this.el.span.style.cursor = 'pointer';
	        this.el.li.appendChild(this.el.span);
	        $(this.el.span).on('click', function () {
	            _this.close.call(_this);
	        });
	    }
	    $('ul', this.parent).append(this.el.li);

	    this.el.div = document.createElement('div');
	    this.el.div.id = this.id;
	    if (this.overflow) {
	        this.el.div.style.overflow = this.overflow;
	    }
	    this.parent.appendChild(this.el.div);
	    this.el.div.innerHTML = this.html;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.div;
	        n.render.call(n);
	    });
	};

	function TabPanel(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.children = options.children || [];
	    this.width = options.width || null;
	    this.cls = options.cls || null;
	    this.fit = options.fit || false;
	    this.sortable = options.sortable || true;
	    this.dispatch = dispatch('activate', 'beforeActivate', 'beforeLoad', 'create', 'load', 'close');
	}

	TabPanel.prototype = Object.create(Control.prototype);
	TabPanel.prototype.constructor = TabPanel;

	TabPanel.prototype.refresh = function () {
	    $(this.el.div).tabs('refresh');
	};

	TabPanel.prototype.add = function (control) {
	    this.children.push(control);
	    control.parent = this.el.div;
	    control.tabs = this;
	    control.render.call(control);
	    this.refresh();
	    $(this.el.div).tabs('option', 'active', this.children.length - 1);
	    this.refresh();
	};

	TabPanel.prototype.insert = function (index, control) {
	    this.children.splice(index, 0, control);
	    control.parent = this.el.div;
	    control.tabs = this;
	    control.render.call(control);
	    this.refresh();
	    $(this.el.div).tabs('option', 'active', index);
	    this.refresh();
	};

	TabPanel.prototype.remove = function (control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.children.splice(index, 1);
	        control.close();
	        this.refresh();
	    }
	};

	TabPanel.prototype.removeAt = function (index) {
	    var control = this.children[index];
	    control.close();
	    this.children.splice(index, 1);
	    this.refresh();
	};

	TabPanel.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.el.div.style.width = this.width;
	    this.parent.appendChild(this.el.div);
	    this.el.ul = document.createElement('ul');
	    this.el.div.appendChild(this.el.ul);
	    var _this = this;
	    this.children.forEach(function (n) {
	        n.parent = _this.el.div;
	        n.tabs = _this;
	        n.render.call(n);
	    });
	    $(this.el.div).tabs({
	        heightStyle: this.fit ? "fill" : null,
	        activate: function (event, ui) {
	            _this.dispatch.call('activate', _this, event, ui);
	        },
	        beforeActivate: function (event, ui) {
	            _this.dispatch.call('beforeActivate', _this, event, ui);
	        },
	        beforeLoad: function (event, ui) {
	            _this.dispatch.call('beforeLoad', _this, event, ui);
	        },
	        create: function (event, ui) {
	            _this.dispatch.call('create', _this, event, ui);
	        },
	        load: function (event, ui) {
	            _this.dispatch.call('load', _this, event, ui);
	        },
	    });
	    if (this.sortable) {
	        var _this = this;
	        $(this.el.div).find('.ui-tabs-nav').sortable({
	            axis: 'x',
	            stop: function () {
	                $(_this.el.div).tabs('refresh');
	            }
	        });
	    }
	};

	TabPanel.prototype.on = function (eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	function Tooltip(options) {
	    Control.call(this, options);
	    options = options || {};
	}

	Tooltip.prototype = Object.create(Control.prototype);
	Tooltip.prototype.constructor = Tooltip;

	Tooltip.prototype.render = function () {
	    $(document).tooltip();
	};

	var ID$3 = -1;

	function Tree(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.id = options.id || 'tree' + ID$3--;
	    this.dispatch = dispatch('click');
	    var _this = this;
	    this.setting = options.setting || {
	        treeId: this.id,
	        callback: {
	            onClick: function (event, treeId, treeNode, clickFlag) {
	                _this.dispatch.call('click', _this, event, treeId, treeNode, clickFlag);
	            }
	        }
	    };
	    this.data = options.data || [];
	}

	Tree.prototype = Object.create(Control.prototype);
	Tree.prototype.constructor = Tree;

	Tree.prototype.render = function () {
	    this.el.ul = document.createElement('ul');
	    this.el.ul.className = 'ztree';
	    //this.el.ul.setAttribute('id', this.id);
	    this.parent.appendChild(this.el.ul);
	    $.fn.zTree.init($(this.el.ul), this.setting, this.data);
	};

	Tree.prototype.on = function (eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	var NavMenuNames = [{
	    text: '场景',
	    children: [{
	        id: 'newScene',
	        text: '新建场景',
	    }, {
	        id: 'openScene',
	        text: '打开场景'
	    }, {
	        id: 'saveScene',
	        text: '保存场景',
	    }, {
	        id: 'quitEditor',
	        text: '退出'
	    }]
	}, {
	    text: '编辑',
	    children: [{
	        id: 'undo',
	        text: '取消'
	    }, {
	        id: 'redo',
	        text: '重做'
	    }]
	}, {
	    text: '配置',
	    children: [{
	        id: 'mapPropertyConfig',
	        text: '地理要素'
	    }, {
	        id: 'environmentSetting',
	        text: '环境设置'
	    }]
	}, {
	    text: '物体',
	    children: [{
	        id: 'addPoint',
	        text: '点'
	    }, {
	        id: 'addPolyline',
	        text: '折线'
	    }, {
	        id: 'addPolygon',
	        text: '多边形'
	    }, {
	        id: 'addRectangle',
	        text: '长方形'
	    }, {
	        id: 'addEllipse',
	        text: '椭圆'
	    }, {
	        id: 'addCorridor',
	        text: '走廊'
	    }, {
	        id: 'addLabel',
	        text: '标签'
	    }, {
	        id: 'addBox',
	        text: '正方体'
	    }, {
	        id: 'addCylinder',
	        text: '圆柱体'
	    }, {
	        id: 'addTube',
	        text: '管道'
	    }, {
	        id: 'addEllipsoid',
	        text: '椭球体'
	    }, {
	        id: 'addWall',
	        text: '墙'
	    }]
	}, {
	    text: '运行',
	    children: [{
	        id: 'debug',
	        text: '调试'
	    }, {
	        id: 'play',
	        text: '运行'
	    }]
	}, {
	    text: '工具',
	    children: [{
	        id: 'refreshMongo',
	        text: '更新Mongo'
	    }]
	}, {
	    text: '帮助',
	    children: [{
	        id: 'document',
	        text: '文档'
	    }, {
	        id: 'about',
	        text: '关于'
	    }]
	}];

	function NavMenu(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app;
	    this.menu = new Menu({
	        app: this.app,
	        cls: 'main-menu',
	        direction: 'horizontal',
	        children: []
	    });
	    var _this = this;
	    NavMenuNames.forEach(function (n) {
	        var item = new MenuItem({
	            id: n.id,
	            text: n.text,
	            children: []
	        });
	        if (n.children) {
	            n.children.forEach(function (m) {
	                var subitem = new MenuItem({
	                    id: m.id,
	                    text: m.text
	                });
	                item.children.push(subitem);
	            });
	        }
	        _this.menu.children.push(item);
	    });
	    this.app.menu = this.menu;
	}

	NavMenu.prototype = Object.create(Control.prototype);
	NavMenu.prototype.constructor = NavMenu;

	NavMenu.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.el.div.className = 'nav';
	    this.parent.appendChild(this.el.div);

	    this.menu.parent = this.el.div;
	    this.menu.render();

	    var _this = this;
	    this.menu.on('select', function (event, ui) {
	        var id = ui.item[0].id;
	        if (id != null) {
	            _this.app.event.call(id);
	            _this.menu.collapseAll();
	        }
	    });
	};

	function Scene(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.name = options.name || 'Scene';
	    this.width = options.width || '900px';
	    this.height = options.height || '500px';
	    this.app.sceneWidth = this.width;
	    this.app.sceneHeight = this.height;
	}

	Scene.prototype = Object.create(Control.prototype);
	Scene.prototype.constructor = Scene;

	Scene.prototype.getName = function () {
	    return this.name;
	};

	Scene.prototype.setName = function (name) {
	    this.name = name;
	};

	Scene.prototype.start = function () {

	};

	Scene.prototype.pause = function () {

	};

	Scene.prototype.stop = function () {

	};

	Scene.prototype.save = function () {

	};

	Scene.prototype.load = function () {

	};

	var Options = new (function () {
	    this.bingMapKey = 'Amvk_1DmXPpb7VB7JIXtWHBIpXdK8ABDN7E2xiK8olFovcy5KcVjVfpsW8rxoeVZ';
	});

	function Map(options) {
	    Control.call(this, options);
	    this.app = options.app;
	    this.app.map = this;
	    Cesium.BingMapsApi.defaultKey = Options.bingMapKey;
	}

	Map.prototype = Object.create(Control.prototype);
	Map.prototype.constructor = Map;

	Map.prototype.render = function () {
	    this.container = document.createElement('div');
	    this.container.style.width = '100%';
	    this.container.style.height = '100%';
	    this.parent.appendChild(this.container);
	    this.app.mapContainer = this.container;

	    var _this = this;
	    this.app.on('applicationStart', function () {
	        _this.start();
	    });
	};

	Map.prototype.start = function () {
	    var creditContainer = document.createElement('div');
	    this.viewer = new Cesium.Viewer(this.container, {
	        animation: false,
	        fullscreenButton: false,
	        geocoder: false,
	        homeButton: false,
	        infoBox: false,
	        selectionIndicator: false,
	        timeline: false,
	        navigationHelpButton: false,
	        navigationInstructionsInitiallyVisible: false,
	        creditContainer: creditContainer,
	        // terrainProvider: Cesium.createWorldTerrain()
	    });
	    this.app.viewer = this.viewer;
	    this.app.viewer.camera.setView({
	        destination: new Cesium.Cartesian3(-2722888.5452312864, 4839584.616677277, 4092247.0954614747)
	    });
	    this.addEventListeners();
	};

	Map.prototype.stop = function () {

	};

	Map.prototype.addEventListeners = function () {
	    var _this = this;
	    this.viewer.canvas.addEventListener('click', function (evt) {
	        _this.app.call('click', evt);
	    });
	    this.viewer.canvas.addEventListener('contextmenu', function (evt) {
	        _this.app.call('contextmenu', evt);
	    });
	    this.viewer.canvas.addEventListener('dblclick', function (evt) {
	        _this.app.call('dblclick', evt);
	    });
	    this.viewer.canvas.addEventListener('keydown', function (evt) {
	        _this.app.call('keydown', evt);
	    });
	    this.viewer.canvas.addEventListener('keyup', function (evt) {
	        _this.app.call('keyup', evt);
	    });
	    this.viewer.canvas.addEventListener('mousedown', function (evt) {
	        _this.app.call('mousedown', evt);
	    });
	    this.viewer.canvas.addEventListener('mousemove', function (evt) {
	        _this.app.call('mousemove', evt);
	    });
	    this.viewer.canvas.addEventListener('mouseup', function (evt) {
	        _this.app.call('mouseup', evt);
	    });
	    this.viewer.canvas.addEventListener('mousewheel', function () {
	        _this.app.call('mousewheel', evt);
	    });
	};

	function GlScene(options) {
	    Scene.call(this, options);
	    this.map = new Map({
	        app: this.app
	    });
	    this.app.map = this.map;
	}

	GlScene.prototype = Object.create(Scene.prototype);
	GlScene.prototype.constructor = GlScene;

	GlScene.prototype.render = function () {
	    this.map.parent = this.parent;
	    this.map.render();
	};

	function LogScene(options) {
	    Scene.call(this, options);
	}

	LogScene.prototype = Object.create(Scene.prototype);
	LogScene.prototype.constructor = LogScene;

	LogScene.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.el.div.style.width = this.width + 'px';
	    this.el.div.style.height = this.height + 'px';
	    this.parent.appendChild(this.el.div);
	    var _this = this;
	    this.app.log = function (html) {
	        _this.log.call(_this, html);
	    };
	    this.app.warn = function (html) {
	        _this.warn.call(_this, html);
	    };
	    this.app.error = function (html) {
	        _this.error.call(_this, html);
	    };
	};

	LogScene.prototype.start = function () {
	    this.log('欢迎使用ThreeEarth！');
	};

	LogScene.prototype.log = function (html) {
	    var span = document.createElement('span');
	    span.style.color = 'white';
	    span.innerHTML = html + '<br />';
	    this.el.div.appendChild(span);
	};

	LogScene.prototype.warn = function (html) {
	    var span = document.createElement('span');
	    span.style.color = 'pink';
	    span.innerHTML = html + '<br />';
	    this.el.div.appendChild(span);
	};

	LogScene.prototype.error = function (html) {
	    var span = document.createElement('span');
	    span.style.color = 'red';
	    span.innerHTML = html + '<br />';
	    this.el.div.appendChild(span);
	};

	function MainPanel(options) {
	    TabPanel.call(this, options);
	    options = options || {};
	    this.app = options.app;

	    this.sceneTab = new TabItem({
	        id: 'sceneTab',
	        title: '场景',
	        children: [

	        ]
	    });
	    this.app.sceneTab = this.sceneTab;

	    this.logTab = new TabItem({
	        id: 'logTab',
	        title: '日志',
	        children: [

	        ]
	    });
	    this.app.logTab = this.logTab;

	    this.children = [
	        this.sceneTab,
	        this.logTab,
	    ];
	    this.cls = 'left-panel';
	    this.fit = true;
	}

	MainPanel.prototype = Object.create(TabPanel.prototype);
	MainPanel.prototype.constructor = MainPanel;

	MainPanel.prototype.render = function () {
	    var _this = this;
	    this.on('create', function (event, ui) {
	        _this.onCreateTabs.call(_this, event, ui);
	    });
	    this.on('activate', function (event, ui) {
	        _this.onActivateTab.call(_this, event, ui);
	    });
	    this.on('close', function (tabitem) {
	        _this.onCloseTab.call(_this, tabitem);
	    });
	    TabPanel.prototype.render.apply(this, arguments);
	};

	MainPanel.prototype.onCreateTabs = function (event, ui) {
	    this.glScene = new GlScene({
	        app: this.app,
	        parent: this.sceneTab.el.div,
	        width: ui.panel[0].clientWidth,
	        height: ui.panel[0].clientHeight,
	    });
	    this.app.glScene = this.glScene;
	    this.sceneTab.add(this.glScene);
	    this.glScene.start();

	    this.logScene = new LogScene({
	        app: this.app,
	        parent: this.logTab.el.div,
	        width: ui.panel[0].clientWidth,
	        height: ui.panel[0].clientHeight,
	    });
	    this.app.logScene = this.logScene;
	    this.logTab.add(this.logScene);
	    this.logScene.start();
	};

	MainPanel.prototype.onActivateTab = function (event, ui) {

	};

	MainPanel.prototype.onCloseTab = function (tabitem) {

	};

	function SettingPanel(options) {
	    Control.call(this, options);
	}

	SettingPanel.prototype = Object.create(Control.prototype);
	SettingPanel.prototype.constructor = SettingPanel;

	SettingPanel.prototype.render = function () {

	};

	function PropertyPanel(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app;
	    this.cls = 'right-panel ui-widget-content';

	    this.hierarchyPanel = new Tree({
	        data: [{
	            name: '相机'
	        }, {
	            name: '光源'
	        }]
	    });
	    this.app.hierarchyPanel = this.hierarchyPanel;

	    this.settingPanel = new SettingPanel({ app: this.app });
	    this.app.settingPanel = this.settingPanel;

	    this.topPanel = new TabPanel({
	        fit: true,
	        children: [
	            new TabItem({
	                title: '层次',
	                overflow: 'scroll',
	                children: [
	                    this.hierarchyPanel
	                ]
	            }),
	            new TabItem({
	                title: '设置',
	                overflow: 'scroll',
	                children: [
	                    this.settingPanel
	                ]
	            }),
	        ]
	    });

	    this.bottomPanel = new TabPanel({
	        fit: true,
	        children: [
	            new TabItem({
	                title: '属性',
	                overflow: 'scroll',
	                children: []
	            }),
	            new TabItem({
	                title: '动画',
	                overflow: 'scroll',
	                html: 'content 2'
	            }),
	        ]
	    });

	    this.app.topPanel = this.topPanel;
	    this.app.bottomPanel = this.bottomPanel;
	}

	PropertyPanel.prototype = Object.create(Control.prototype);
	PropertyPanel.prototype.constructor = PropertyPanel;

	PropertyPanel.prototype.render = function () {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.parent.appendChild(this.el.div);

	    this.el.topDiv = document.createElement('div');
	    this.el.topDiv.style.height = '50%';
	    this.el.div.appendChild(this.el.topDiv);

	    this.el.bottomDiv = document.createElement('div');
	    this.el.bottomDiv.style.height = '50%';
	    this.el.div.appendChild(this.el.bottomDiv);

	    this.topPanel.parent = this.el.topDiv;
	    this.topPanel.render();

	    this.bottomPanel.parent = this.el.bottomDiv;
	    this.bottomPanel.render();
	};

	function Editor(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app;

	    this.navMenu = new NavMenu({
	        app: this.app
	    });

	    this.mainPanel = new MainPanel({
	        app: this.app
	    });

	    this.propertyPanel = new PropertyPanel({
	        app: this.app
	    });

	    this.app.navMenu = this.navMenu;
	    this.app.mainPanel = this.mainPanel;
	    this.app.propertyPanel = this.propertyPanel;
	}

	Editor.prototype = Object.create(Control.prototype);
	Editor.prototype.constructor = Editor;

	Editor.prototype.render = function () {
	    this.navMenu.parent = this.parent;
	    this.navMenu.render();

	    this.el.box = document.createElement('div');
	    this.el.box.className = 'box';
	    this.parent.appendChild(this.el.box);

	    this.mainPanel.parent = this.el.box;
	    this.mainPanel.render();

	    this.propertyPanel.parent = this.el.box;
	    this.propertyPanel.render();
	};

	function HierarchyPanel(options) {

	}

	function BaseCommand(options) {
	    options = options || {};
	    this.app = options.app || null;
	}

	BaseCommand.prototype.start = function () {

	};

	function OpenSceneWin(options) {
	    Dialog.call(this, options);
	    this.app = options.app;
	    this.title = '加载场景';
	    this.width = 920;
	    this.height = 500;

	    this.grid = new GridPanel({
	        app: this.app,
	        width: '910px',
	        height: '420px',
	        url: 'http://127.0.0.1:8080/Service/FeatureSummaryService.ashx',
	        colNames: ['创建时间', '数据集', '经度', '纬度', '点数', '线数', '面数', '未知要素数', '总要素数'],
	        colModel: [
	            { name: 'CreateTime', index: 'CreateTime', width: 90 },
	            { name: 'CollectionName', index: 'CollectionName', width: 120 },
	            { name: 'CenterLongitude', index: 'CenterLongitude', width: 120 },
	            { name: 'CenterLatitude', index: 'CenterLatitude', width: 120 },
	            { name: 'PointNum', index: 'PointNum', width: 70, align: "right" },
	            { name: 'LineStringNum', index: 'LineStringNum', width: 70, align: "right" },
	            { name: 'PolygonNum', index: 'PolygonNum', width: 70, align: "right" },
	            { name: 'UnknownNum', index: 'UnknownNum', width: 70, align: "right" },
	            { name: 'TotalNum', index: 'TotalNum', width: 70, align: "right" }
	        ],
	        rowNum: -1,
	        pager: false
	    });

	    this.children = [
	        this.grid
	    ];
	}

	OpenSceneWin.prototype = Object.create(Dialog.prototype);
	OpenSceneWin.prototype.constructor = OpenSceneWin;

	OpenSceneWin.prototype.render = function () {
	    Dialog.prototype.render.call(this);
	    var _this = this;
	    this.grid.on('dblClickRow', function (rowid, iRow, iCol, e) {
	        var record = this.getRowData(rowid);
	        var collectionName = record['CollectionName'];
	        var lon = record['CenterLongitude'];
	        var lat = record['CenterLatitude'];
	        var wyoming = _this.app.viewer.entities.add({
	            name: 'Wyoming',
	            polygon: {
	                hierarchy: Cesium.Cartesian3.fromDegreesArray([
	                    -109.080842, 45.002073,
	                    -105.91517, 45.002073,
	                    -104.058488, 44.996596,
	                    -104.053011, 43.002989,
	                    -104.053011, 41.003906,
	                    -105.728954, 40.998429,
	                    -107.919731, 41.003906,
	                    -109.04798, 40.998429,
	                    -111.047063, 40.998429,
	                    -111.047063, 42.000709,
	                    -111.047063, 44.476286,
	                    -111.05254, 45.002073]),
	                height: 100,
	                material: Cesium.Color.RED.withAlpha(0.5),
	                outline: true,
	                outlineColor: Cesium.Color.BLACK
	            }
	        });

	        _this.app.viewer.zoomTo(wyoming);
	    });
	};

	function OpenSceneCommand(options) {
	    BaseCommand.call(this, options);
	}

	OpenSceneCommand.prototype = Object.create(BaseCommand.prototype);
	OpenSceneCommand.prototype.constructor = OpenSceneCommand;

	OpenSceneCommand.prototype.start = function () {
	    var _this = this;
	    this.app.on('openScene', function () {
	        _this.run();
	    });
	};

	OpenSceneCommand.prototype.run = function () {
	    if (this.win == null) {
	        this.win = new OpenSceneWin({
	            app: this.app
	        });
	        this.win.render();
	    }
	    this.win.show();
	};

	function AddPointCommand(options) {
	    BaseCommand.call(this, options);
	}

	AddPointCommand.prototype = Object.create(BaseCommand.prototype);
	AddPointCommand.prototype.constructor = AddPointCommand;

	AddPointCommand.prototype.start = function () {
	    var _this = this;
	    this.app.on('click', function (evt) {
	        _this.click(evt);
	    });
	};

	AddPointCommand.prototype.click = function (evt) {
	    debugger
	};

	function CommandDispatcher(options) {
	    options = options || {};
	    this.app = options.app || null;

	    var params = { app: this.app };
	    this.commands = [
	        new OpenSceneCommand(params),
	        new AddPointCommand(params),
	    ];
	}

	CommandDispatcher.prototype.start = function () {
	    this.commands.forEach(function (n) {
	        n.start.call(n);
	    });
	};

	function Application(options) {
	    this.event = new CustomEvent({
	        app: this
	    });
	    this.call = function (eventName) {
	        this.event.call.apply(this.event, arguments);
	    };
	    this.on = function (eventName, callback) {
	        this.event.on(eventName, callback);
	    };
	    this.editor = new Editor({
	        app: this
	    });
	    this.commandDispatcher = new CommandDispatcher({
	        app: this
	    });
	}

	Application.prototype.start = function () {
	    this.event.call('beforeRender', this);
	    this.editor.render();
	    this.event.call('render', this);
	    this.event.call('applicationStart', this);
	    this.commandDispatcher.start();
	};

	exports.Application = Application;
	exports.BaseEvent = BaseEvent;
	exports.CustomEventNames = CustomEventNames;
	exports.CustomEvent = CustomEvent;
	exports.Control = Control;
	exports.UiHelper = UiHelper;
	exports.UiStyler = UiStyler;
	exports.Container = Container;
	exports.FixedContainer = FixedContainer;
	exports.Interaction = Interaction;
	exports.Draggable = Draggable;
	exports.Droppable = Droppable;
	exports.Resizable = Resizable;
	exports.Selectable = Selectable;
	exports.Sortable = Sortable;
	exports.Layout = Layout;
	exports.BorderLayout = BorderLayout;
	exports.CenterLayout = CenterLayout;
	exports.FormLayout = FormLayout;
	exports.HBoxLayout = HBoxLayout;
	exports.TableLayout = TableLayout;
	exports.VBoxLayout = VBoxLayout;
	exports.Accordion = Accordion;
	exports.AccordionItem = AccordionItem;
	exports.AutoComplete = AutoComplete;
	exports.Button = Button;
	exports.CheckBox = CheckBox;
	exports.CheckboxField = CheckboxField;
	exports.CheckboxRadio = CheckboxRadio;
	exports.ColorField = ColorField;
	exports.ControlGroup = ControlGroup;
	exports.DateField = DateField;
	exports.DatePicker = DatePicker;
	exports.Dialog = Dialog;
	exports.Fieldset = Fieldset;
	exports.GridPanel = GridPanel;
	exports.List = List;
	exports.Menu = Menu;
	exports.MenuItem = MenuItem;
	exports.NumberField = NumberField;
	exports.ProgressBar = ProgressBar;
	exports.RangeField = RangeField;
	exports.SelectMenu = SelectMenu;
	exports.SelectMenuItem = SelectMenuItem;
	exports.Slider = Slider;
	exports.Spinner = Spinner;
	exports.TabItem = TabItem;
	exports.TabPanel = TabPanel;
	exports.TextField = TextField;
	exports.Tooltip = Tooltip;
	exports.Tree = Tree;
	exports.Editor = Editor;
	exports.NavMenu = NavMenu;
	exports.NavMenuNames = NavMenuNames;
	exports.HierarchyPanel = HierarchyPanel;
	exports.MainPanel = MainPanel;
	exports.PropertyPanel = PropertyPanel;
	exports.SettingPanel = SettingPanel;
	exports.Scene = Scene;
	exports.GlScene = GlScene;
	exports.LogScene = LogScene;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
