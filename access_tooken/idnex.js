const rp = require('request-promise-native');
const { writeFile, readFile } = require('fs')

async function getAccessToken () {
  const appid = 'wxa7d0e8434f3a9581';
  const secret = '6955abcd412cfc327dc3888ded9df964';

  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`

  const result = await rp({method: 'GET', url, json: true});

  result.expires_in = Date.now() + 7200000 - 300000;

  writeFile('./accessToken.txt', JSON.stringify(result), err => {
    if (!err) console.log('文件保存成功~');
    else console.log(err)
  });

  return result;
}

module.exports = function fetchAccessToken () {
  return new Promise((resolve, reject) => {
    readFile('./accessToken', (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
  .then(res => {
    if (res.expires_in < Date.now()) {
      return getAccessToken();
    } else {
      return res;
    }
  })
  .catch(err => {
    return getAccessToken();
  })
}

// (async () => {
//   const result = await fetchAccessToken();
//   console.log(result);
// })()