// pages/crity/crity.js

var app = getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    icoUrls:[
      { "name": "简介", "button": "introduction", "image":"../../images/简介.png"},
      { "name": "生活", "button": "life", "image": "../../images/生活.png" },
      { "name": "特产", "button": "specialty", "image": "../../images/特产.png" },
      { "name": "旅游", "button": "travel", "image": "../../images/旅游.png" }
    ],

    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.crity);
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://www.zhuyao.xin/api/crityinfo',
      data: {
        crity: options.crity
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          crityinfo: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
        // console.log(res.data);
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    });
    wx.request({
      url: 'https://www.zhuyao.xin/api/critymainpicture',
      data: {
        crity: options.crity
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          critymainpicture: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
        // console.log(res.data);
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  blackbotton:function () {
    wx.reLaunch({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/location/location'
    })
  },
  introduction: function () {
    var that = this//不要漏了这句，很重要
    console.log(app.globalData.crityinfo)
    wx.request({
      url: 'https://www.zhuyao.xin/api/crityinfo',
      data: {
        crity: app.globalData.crityinfo
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          crityinfo: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
        console.log(res.data);
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    });
  },
  life: function(){
    wx.navigateTo({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/life/life?crity=' + getApp().globalData.crityinfo
    })
  },
  specialty: function(){
    wx.navigateTo({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/specialty/specialty?crity=' + getApp().globalData.crityinfo
    })
  },
  travel: function(){
    console.log(getApp().globalData.crityinfo);
    wx.navigateTo({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/travel/travel?crity=' + getApp().globalData.crityinfo
    })
  }
})