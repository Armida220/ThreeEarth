export default {
    input: 'src/main.js',
    output: {
        indent: '\t',
        format: 'umd',
        name: 'TE',
        file: 'dist/ThreeEarth.js'
    },
    external: ['jquery', 'jquery-ui', 'jquery.ztree.all', 'jquery.jqGrid.min']
};