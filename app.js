//app.js
App({
  onLaunch: function () {
    var that = this//不要漏了这句，很重要
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success:code => {
        console.log(code.code);
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            console.log("1111111"+res);
            wx.request({
              url: 'https://www.zhuyao.xin/onLogin',
              data: {
                code: code.code,
                express: 'word',
                name: 'LoginUrl',
                location: res
              },
              success: function (res) {
                console.log(res);
                console.log("--------success--------");
              },
              fail: function (res) {
                console.log("--------fail--------");
              }
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    crityinfo: null,
    openId: null,
    uploadMp3:null,
    userInfo:null
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