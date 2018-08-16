// pages/travel/travel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travelList: [], //会议室列表列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.fetchConferenceData();


    console.log(options.crity);
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://www.zhuyao.xin/api/travel',
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
          travelList: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
        console.log(res.data);
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    });
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

  // 测试
  // fetchConferenceData: function () {  //获取会议室列表
  //   const perpage = 10;
  //   this.setData({
  //     page: this.data.page + 1
  //   })
  //   const page = this.data.page;
  //   const newlist = [];
  //     newlist.push({
  //       "name": "黄山",
  //       "score": "4.5分",
  //       "detail": '黄山归来不看岳，仿佛穿梭在人间与仙境。云海与日出很漂亮，天气好的时候光明顶上景色很美。空气很好有种洗肺的感觉，特别震撼。但是景区的门票很贵，山上的食宿也不便宜。',
  //       "imgurl": "http://wq-zy.oss-cn-hangzhou.aliyuncs.com/applet/travel/huangShan1.jpg"
  //     })
  //   this.setData({
  //     travelList: this.data.travelList.concat(newlist)
  //   })
  // },
})