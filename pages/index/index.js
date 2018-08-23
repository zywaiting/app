//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this; 
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("已经授权,不需要弹框!")
        } else {
          console.log("------已经授权,不需要弹框!")
          that.showDialog();
        }
      }
    })
    //不管授不授权我都要自动登录获取openid
    wx.login({
      success: code => {
        console.log(code.code);
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            app.globalData.location = res
          },
          fail: function (res) {
            app.globalData.location = null
          }
        })
        wx.request({
          url: 'https://www.zhuyao.xin/onLogin',
          data: {
            code: code.code,
            express: 'word',
            name: 'LoginUrl',
            location: app.globalData.location
          },
          success: function (res) {
            console.log(res.data);
            console.log("--------success--------");
            app.globalData.openId = res.data.data
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
  },
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  showDialog: function () {
    this.dialog.showDialog();
  },

  confirmEvent: function () {
    this.dialog.hideDialog();
  },

  bindGetUserInfo: function (e) {
    // 用户点击授权后，这里可以做一些登陆操作
    console.log(e.detail.detail.userInfo)
    app.globalData.userInfo = e.detail.detail.userInfo
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
            //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
            console.log(res.data);
            app.globalData.openId = res.data.data
            that.setData({
            //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
            })
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
  },
  formSubmit: function (e) {
    //存储fromId,用于发消息
    wx.request({
      url: 'https://www.zhuyao.xin/api/getfromid',
      data: {
        fromId: e.detail.formId,
        openId: app.globalData.openId
      },
      success: function (res) {

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  }
})
