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
          that.showDialog();
        }
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
    //app.js做登录
    app.onLogin(e);
    // wx.request({
    //   url: 'https://www.zhuyao.xin/updateuserconfig',
    //   data: {
    //     userInfo: e.detail.detail.userInfo
    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     //将获取到的json数据，存在名字叫zhihu的这个数组中
    //     console.log("11111111111"),
    //       that.setData({
    //         //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
    //       })
    //     console.log(res.data);
    //   },
    //   fail: function (res) {
    //     console.log("--------fail--------");
    //   }
    // });
  },
  formSubmit: function (e) {
    console.log("fromId:" + e.detail.formId)
  }
})
