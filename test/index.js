var express = require('express'); // web框架
const app = express();
//解析form-data参数
var multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
app.use(multipartMiddleware);
app.use(express.json({ limit: '50mb' })); // 解析 application/json 参数
app.use(express.urlencoded({ limit: '50mb', extended: true })); // 解析 www-form-urlencoded 参数
const path = require('path');
app.use('/', express.static(path.join(__dirname, 'demo')));
app.use('/file', express.static(path.join(__dirname, 'file')));

app.get('/api/test', (req, res) => {
  console.log(req.query);
  res.json({
    code: 200,
    data: '111',
  });
});

app.post('/api/user', multipartMiddleware, (req, res) => {
  console.log(req.body);
  res.json({
    code: 200,
    data: {
      name: 'xiaoming',
      age: 18,
    },
  });
});

const port = 12013;
app.listen(port, function() {
  console.log('http listening on ' + port);
});
