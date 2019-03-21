const fetchAccessToken = require('./access_token');
const rq = require('request-promise-native');

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
  const url = ` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;

  const result = rq({method: 'POST', url, json: true, body: menu});

  return result;
}


async function deleteMenu() {
  const { access_token } = await fetchAccessToken();
  const url = ` https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;

  const result = rq({method: 'GET', url, json: true});

  return result;
}

(async () => {
  let result = await deleteMenu();
  console.log(result);
  result = await createMenu();
  console.log(result);
})()