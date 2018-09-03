// pages/movingcar/movingcar.js
var bmap = require('../../lib/bmap-wx.min.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    latitude1: '',
    longitude1: '',
    rgcData: {},
    sugData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'FB3MMlT54hn7AGAxUCkOmk0GGNOzTI7Z'
    });

  
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data)
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.regeocoding({
      fail: fail,
      success: success,
      // iconPath: '../../img/marker_red.png',
      // iconTapPath: '../../img/marker_red.png'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
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
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '17605674666' //仅为示例，并非真实的电话号码
    })
  },
  ballMoveEvent: function (e) {
    console.log(e)
    console.log("1111111111")
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
        that.setData({
          longitude1: res.longitude,
          latitude1: res.latitude
        })
      }
    })
  },
  // 绑定input输入 
  bindKeyInput: function (e) {
    console.log(e)
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'FB3MMlT54hn7AGAxUCkOmk0GGNOzTI7Z'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var sugData = '';
      for (var i = 0; i < data.result.length; i++) {
        sugData = sugData + data.result[i].name + '\n';
      }
      that.setData({
        sugData: sugData
      });
      console.log(sugData)
    }
    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success
    });
  } 
 
})