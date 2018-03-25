var CustomEventNames = [
    // ../Application.js
    'beforeRender',
    'render',
    'applicationStart',

    // ./editor/menu/NavMenu.js
    'newScene',
    'openScene',
    'saveScene',
    'quitEditor',

    'undo',
    'redo',

    'mapPropertyConfig',
    'environmentSetting',

    'debug',
    'play',

    'document',
    'about',

    // ./scene/webgl/GlScene.js
    'beforeAnimate',
    'onAnimate',

    // ./scene/webgl/control/GlGUI.js
    'translateObject',
    'rotateObject',
    'scaleObject',

    // ./scene/webgl/event/GlHoverObject.js
    'hoverObject',

    // ./scene/webgl/event/GlSelectObject.js
    'selectObject',
    'unselectObject',

    // ./lol/Model.js
    'loadMesh',
];

export { CustomEventNames };
