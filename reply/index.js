const sha1 = require('sha1');
const { getUserDataAsync, parseXMLData, formatJsData } = require('../utils/tools');

module.exports = () => {
  app.use( async (req, res) => {

    //1）将token、timestamp、nonce三个参数进行字典序排序 
    //2）将三个参数字符串拼接成一个字符串进行sha1加密 
    //3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  
    const{ signature, echostr, timestamp, nonce } = req.query;
    const token = 'atguiguHTML1128';
  
    const sha1Str = sha1([ token, timestamp, nonce ].sort().join(''));
  
    if ( req.method === 'GET' ) {
      if (sha1Str === signature) {
        res.end(echostr);
      } else {
        res.end('error');
      }
    } else if ( req.method === 'POST' ) {
      if (sha1Str !== signature) {
        res.end('error');
        return;
      }
      
      const xmlData = await getUserDataAsync(req);
       
      const jsData = parseXMLData(xmlData);
  
      const {xml} = formatJsData(jsData);
  
      let content = '你在说什么？我听不懂';
      if (userData.Content === '1') {
        content = '大吉大利，今晚吃鸡';
      } else if (userData.Content.indexOf('2') !== -1) {
        content = '你属什么? <br> 我属于你';
      }
  
      let replyMessage = `<xml>
      <ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${content}]]></Content>
      </xml>`
    res.send(replyMessage);
  
    } else {
      res.end('error');
    }
  })
}