import express from 'express';
import { join } from 'path';
import { roles } from './router';

const app = express();

//跨域
app.all('*', (req, res, next) => {
  res.set({
    'Access-Control-Allow-Credentials': true, //cookie
    'Access-Control-Allow-Origin': '*', //任意域名都可以访问,或者基于我请求头里面的域
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
    'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
  });
  next();
});

//圖片請求頭
app.use(/^\/.*(\.png)$/, (req, res, next) => {
  res.type('png');
  next();
});
//音頻請求頭
app.use(/^\/.*(\.wav)$/, (req, res, next) => {
  res.type('wav');
  next();
});
//静态文件
app.use('/data', express.static(join(__dirname, 'data')));

app.use(roles);


app.listen(3002, () => {
  console.log('http://localhost:3002');
});