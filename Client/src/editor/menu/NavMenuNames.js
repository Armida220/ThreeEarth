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

export { NavMenuNames };