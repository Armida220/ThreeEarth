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

export { NavMenuNames };