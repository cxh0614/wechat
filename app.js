const express = require('express');
const sha1 = require('sha1');

const app = express();

app.use((req, res) => {

  //1）将token、timestamp、nonce三个参数进行字典序排序 
  //2）将三个参数字符串拼接成一个字符串进行sha1加密 
  //3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信

  const{ signature, echostr, timestamp, nonce } = req.query;
  const token = 'atguiguHTML1128';

  const sortArr = [ token, timestamp, nonce ].sort();

  const sha1Str = sha1(sortArr.join(''));

  if (sha1Str === signature) {
    res.end(echostr);
  } else {
    res.end('error');
  }
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功~');
  else console.log(err);
})