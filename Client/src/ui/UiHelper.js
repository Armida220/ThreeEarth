
function UiHelper() {

};

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

export { UiHelper };