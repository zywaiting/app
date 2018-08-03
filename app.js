//app.js
App({
  onLaunch: function () {
    var that = this//不要漏了这句，很重要
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.globalData.location = res
      }
    })
    wx.login({
      success:res => {
        wx.request({
          url: 'https://www.zhuyao.xin/onLogin',
          data: {
            code: res.code,
            express: 'word',
            name: 'LoginUrl',
            location: that.globalData.location
          },
          success: function (res) {
            console.log(res.data.data);
            console.log(that.globalData.location);
            that.globalData.openId = res.data.data
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
  },
  globalData: {
    crityinfo: null,
    location: null,
    openId: null
  },
  onLogin: function (e) {
    var that = this//不要漏了这句，很重要
    console.log(e)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //发起网络请求
        wx.request({
          url: 'https://www.zhuyao.xin/onLogin',
          data: {
            code: res.code,
            express: 'word',
            name: 'LoginUrl',
            userInfo: e.detail.detail.userInfo
          },
          success: function (res) {
            // that.setData({
            //   //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
            // })
            console.log(res.data);
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
  }
})