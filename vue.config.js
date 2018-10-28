// const vuxLoader = require('vux-loader');

module.exports = {
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: [{name: 'vux-ui'},{
                name: 'less-theme',
                path: 'src/assets/theme.less'
            }]
        })
    },
    devServer: {
        host: '0.0.0.0',
        port: 80
    },
    assetsDir: './',
    productionSourceMap: false, // 生产环境不生成map文件

};