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
        host: 'my.jr.jd.com',
        port: 80
    },
    assetsDir: './',
    productionSourceMap: false, // 生产环境不生成map文件

};
