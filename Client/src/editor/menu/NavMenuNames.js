var NavMenuNames = [{
    text: '场景',
    children: [{
        text: '新建场景',
        event: 'newScene',
    }, {
        text: '打开场景',
        event: 'openScene',
    }, {
        text: '保存场景',
        event: 'saveScene',
    }]
}, {
    text: '配置',
    children: [{
        text: '地理要素',
        event: 'mapPropertyConfig'
    }, {
        text: '环境设置',
        event: 'environmentSetting',
    }]
}, {
    text: '物体',
    children: [{
        text: '点',
        event: 'addPoint',
    }, {
        text: '折线',
        event: 'addPolyline',
    }, {
        text: '多边形',
        event: 'addPolygon',
    }, {
        text: '长方形',
        event: 'addRectangle',
    }, {
        text: '椭圆',
        event: 'addEllipse',
    }, {
        text: '走廊',
        event: 'addCorridor',
    }, {
        text: '标签',
        event: 'addLabel',
    }, {
        text: '正方体',
        event: 'addBox',
    }, {
        text: '圆柱体',
        event: 'addCylinder',
    }, {
        text: '管道',
        event: 'addTube',
    }, {
        text: '椭球体',
        event: 'addEllipsoid',
    }, {
        text: '墙',
        event: 'addWall',
    }]
}, {
    text: '工具',
    children: [{
        text: '更新Mongo',
        event: 'refreshMongo',
    }]
}, {
    text: '帮助',
    children: [{
        text: '文档',
        event: 'document',
    }, {
        text: '关于',
        event: 'about',
    }]
}];

export { NavMenuNames };