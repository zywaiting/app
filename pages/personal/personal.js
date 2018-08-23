//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cardConfig: false,
    inputConfig:true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tip:'',
    userCard:null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://www.zhuyao.xin/api/selectusercard',
      data: {
        openId: app.globalData.openId
      },
      success: function (res) {
        console.log(res.data.data);
        if (res.data.code===200){
          console.log("--------success--------");
          that.setData({
            userCard : res.data.data,
            cardConfig : true,
            inputConfig : false
          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })






    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },




  formBindsubmit: function (e) {
    var that = this//不要漏了这句，很重要
    if (e.detail.value.name.length == 0 || e.detail.value.mobile.length == 0) {
      this.setData({
        tip: '提示：用户名和手机不能为空！',
      })
    } else if (e.detail.value.mobile.length != 11){
      this.setData({
        tip: '提示：请填11位手机号！',
      })
    }else{
      console.log(e.detail.value)
      wx.request({
        url: 'https://www.zhuyao.xin/api/createusercard',
        data: {
          data: e.detail.value,
          openId: app.globalData.openId
        },
        success: function (res) {
          that.setData({
            userCard: res.data.data,
            cardConfig: true,
            inputConfig: false
          })
        },
        fail: function (res) {
          console.log("--------fail--------");
        }
      })
    }
  },
  formReset: function () {
    this.setData({
      tip: ''
    })
  }
})
