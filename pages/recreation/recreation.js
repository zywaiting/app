// pages/recreation/recreation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true;
    // innerAudioContext.obeyMuteSwitch = false;
    // innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=%25E6%25AC%25A2%25E8%25BF%258E%25E6%259D%25A5%25E5%2588%25B0%25E6%259C%25B1%25E7%2591%25B6%25E7%259A%2584%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F%252C%25E6%259C%25AC%25E7%25A8%258B%25E5%25BA%258F%25E6%2598%25AF%25E7%2594%25B1%25E9%25BB%2584%25E6%25A1%2583%25E7%25BD%2590%25E5%25A4%25B4%25E5%2586%25A0%25E5%2590%258D%25E8%25B5%2584%25E5%258A%25A9&lan=zh&cuid=705e71da-6740-4ce8-819b-3c47ec73a9dc&ctp=1&tok=24.917d46f09194aad70aefa5e7108521fd.2592000.1537931791.282335-11635960&per=0'
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
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
  joke: function(){
    wx.navigateTo({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/joke/joke'
    })
  },
  intelligent: function(){
    wx.navigateTo({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/intelligent/intelligent'
    })
  }
})