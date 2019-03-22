const rp = require('request-promise-native');
const { writeFileAsync, readFileAsync } =require('../utils/tools');
const fetchAccessToken = require('./access-token');

async function getTicket () {
  const { access_token } = await fetchAccessToken();

  const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`

  const result = await rp({method: 'GET', url, json: true});

  result.expires_in = Date.now() + 7200000 - 300000;
  const ticket ={
    ticket: result.ticket,
    expires_in: result.expires_in
  }
  await writeFileAsync('./ticket.txt', ticket);
  return ticket;
}

function fetchTicket () {
  return readFileAsync ('./ticket.txt')
  .then(res => {
    if (res.expires_in < Date.now()) {
      return getTicket();
    } else {
      return res;
    }
  })
  .catch(err => {
    return getTicket();
  })
}

(async () => {
  const result = await fetchTicket();
  console.log(result);
})()

module.exports = fetchTicket;