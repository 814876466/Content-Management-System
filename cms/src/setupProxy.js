const httpMiddleware = require('http-proxy-middleware'); //这个软件不用下载

console.log("kerwin-111",httpMiddleware)
// node ,vue
module.exports = function(app) {
  app.use(
    '/ajax',
    httpMiddleware({
      target: 'https://m.maoyan.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/api',
    httpMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );
};

// /api
