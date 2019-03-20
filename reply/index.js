const sha1 = require('sha1');
const { getUserDataAsync, parseXMLData, formatJsData } = require('../utils/tools');
const template = require('./template');
const handleResponse = require('./handleResponse');

module.exports = () => {
  return async (req, res) => {

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
  
      const userData = formatJsData(jsData);

      const options = handleResponse(userData);

      const replyMessage = template(options);
      console.log(replyMessage)
      res.send(replyMessage);
  
    } else {
      res.end('error');
    }
  }
}