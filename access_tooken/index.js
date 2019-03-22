const fetchAccessToken = require('./access-token');
const rp = require('request-promise-native');

const URL_PREFIX = 'https://api.weixin.qq.com/cgi-bin/';

const menu = {
  "button":[
    {
      "type":"click",  // 单击菜单
      "name":"首页☀",
      "key":"home"
    },
    {
      "name":"菜单🙏",
      "sub_button":[
        {
          "type":"view",  // 跳转到指定网址
          "name":"官网",
          "url":"http://www.atguigu.com/"
        },
        {
          "type": "scancode_waitmsg",
          "name": "扫码带提示",
          "key": "扫码带提示"
        },
        {
          "type": "scancode_push",
          "name": "扫码推事件",
          "key": "扫码推事件"
        },
        {
          "type": "pic_sysphoto",
          "name": "系统拍照发图",
          "key": "rselfmenu_1_0"
        },
        {
          "type": "pic_photo_or_album",
          "name": "拍照或者相册发图",
          "key": "rselfmenu_1_1"
        },
      ]
    },
    {
      "name":"菜单二💋",
      "sub_button":[
        {
          "type": "pic_weixin",
          "name": "微信相册发图",
          "key": "rselfmenu_1_2"
        },
        {
          "name": "发送位置",
          "type": "location_select",
          "key": "rselfmenu_2_0"
        }
      ]
    },
  ]
}

async function createMenu() {
  const { access_token } = await fetchAccessToken();
  const url = ` ${URL_PREFIX}menu/create?access_token=${access_token}`;

  const result = rp({method: 'POST', url, json: true, body: menu});

  return result;
}


async function deleteMenu() {
  const { access_token } = await fetchAccessToken();
  const url = ` ${URL_PREFIX}menu/delete?access_token=${access_token}`;

  const result = await rp({method: 'GET', url, json: true});

  return result;
}

async function createTag(name) {
  const { access_token } = await fetchAccessToken();
  const url = ` ${URL_PREFIX}tags/create?access_token=${access_token}`;

  return await rp({method: 'POST', url, json: true, body: {tag: {name} }});
}

async function getTagUsers (tagid, next_openid = '') {
  const { access_token } = await fetchAccessToken();
  const url = ` ${URL_PREFIX}user/tag/get?access_token=${access_token}`;

  return await rp({method: 'POST', url, json: true, body: {tagid, next_openid}});
}

async function batchUsersTag (openid_list, tagid) {
  const { access_token } = await fetchAccessToken();
  const url = ` ${URL_PREFIX}tags/members/batchtagging?access_token=${access_token}`;

  return await rp({method: 'POST', url, json: true, body: {openid_list, tagid}});
}

(async () => {
  let result1 = await createTag('01');
  console.log(result1);
  let result2 = await batchUsersTag([
    'odth_5p2SdDmVhbVrtm7ZILprZMs'
  ], result1.tag.id);
  console.log(result2);
  let result3 = await getTagUsers(result1.tag.id);
  console.log(result3);
})()