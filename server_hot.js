let webpack = require('webpack');
let express = require('express');
let config = require('./webpack.config.hot');
let proxyMiddleware = require('http-proxy-middleware');

let app = express();
let compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    inline: true,
    progress: true,
    stats: {
        colors: true,
    }
}));

//代理服务器
app.use('', proxyMiddleware({
    target: '',
    changeOrigin: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

//将其他路由，全部返回index.html
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8088, function () {
    console.log('正常打开8088端口')
});
