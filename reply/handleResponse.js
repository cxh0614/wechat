module.exports = (userData) => {
  let options = {
    toUserName: userData.FromUserName,
    fromUserName: userData.ToUserName,
    createTime: Date.now(),
    type: 'text',
    content: '你在说什么？我听不懂',
  }

  if (userData.MsgType === 'text') {
    if (userData.Content === '1') {
      options.content = '大吉大利，今晚吃鸡';
    } else if (userData.Content.indexOf('2') !== -1) {
      options.content = '你属什么? \n 我属于你';
    }
  } else if (userData.MsgType === 'voice') {
    options.content = userData.Recognition;
  } else if (userData.MsgType === 'location') {
    options.content = `地理位置纬度: ${userData.Location_X}
    \n地理位置经度: ${userData.Location_Y}
    \n地图缩放大小: ${userData.Scale}
    \n地理位置信息: ${userData.Label}`
  } else if (userData.MsgType === 'event') {
    if (userData.Event === 'subscribe') {
      options.content = '欢迎关注公众号~';
      if (userData.EventKey) {
        options.content = '欢迎扫描带参数的二维码关注公共号';
      }
    } else if (userData.Event === 'subscribe') {
      options.content = '';
    }
  } else if (userData.Event === 'CLICK') {
    options.content = '用户点击了菜单';
    if (userData.EventKey === 'home') {
      options.content = '用户点击了home菜单';
    }
  }

  

  

  return options;
}