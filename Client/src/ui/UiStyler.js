
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

export { UiStyler };