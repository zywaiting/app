//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //发起网络请求
        wx.request({
          url: 'https://www.zhuyao.xin:9005/onLogin',
          data: {
            code: res.code,
            express:'word',
            name:'LoginUrl'
          }
        })
      }
    })
  },
  globalData: {
    crityinfo: null,
    userInfo:null
  }
})