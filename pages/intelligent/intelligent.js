// pages/personal/personal.js
//获取应用实例
const app = getApp()
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first:true,
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    innerAudioContext.autoplay = true;
    innerAudioContext.obeyMuteSwitch = false;
    innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=%25E4%25B8%25BB%25E4%25BA%25BA%252C%25E8%25AF%25B7%25E9%2597%25AE%25E6%259C%2589%25E4%25BB%2580%25E4%25B9%2588%25E5%258F%25AF%25E4%25BB%25A5%25E5%25B8%25AE%25E5%258A%25A9%25E6%2582%25A8%2521%25E6%25AF%2594%25E5%25A6%2582%25E5%25AF%25B9%25E6%2588%2591%25E8%25AF%25B4%2522%25E7%25AC%2591%25E8%25AF%259D%2522&lan=zh&cuid=7881c2c7-9645-4895-8812-61bcc3fe7b87&ctp=1&tok=24.917d46f09194aad70aefa5e7108521fd.2592000.1537931791.282335-11635960&per=0'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      that.setData({
        loadingHidden: true
      })
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
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
    var that = this
    that.setData({
      loadingHidden: true
    })
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
  binx: function () {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  },
  //开始录音的时候
  start: function () {
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //暂停录音
  pause: function () {
    recorderManager.onPause();
    console.log('暂停录音')
  },
  //停止录音
  stop: function () {
    var that = this;
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
      that.upload();
      that.setData({
        loadingHidden: false
      })
    })
  },



  
  //上传录音
  upload: function () {
    console.log("123"+app.globalData.openId);
    var that = this//不要漏了这句，很重要
    wx.uploadFile({
      url: "https://www.zhuyao.xin/fileUpload",//演示域名、自行配置
      filePath: this.tempFilePath,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
          openId: app.globalData.openId //附加信息为用户ID
      },
      
      success: function (res) {
        var jsonStr = res.data;
        console.log(jsonStr);
        console.log(res.data);
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        that.setData({
          result: res.data,
          first: false,
          loadingHidden: true
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
        // wx.showToast({
        //   title: '上传成功',
        //   icon: 'success',
        //   duration: 2000
        // })
        try{
          that.play(res.data.data.url);
        }catch(e){
          loadingHidden: true
        }
        

      },
      fail: function (res) {
        console.log("12321321");
        
      },
      complete: function (res) {

      }
    })
  },
  bindTouchStart: function (e) {
    var that = this;
    that.start();
    console.log("开始录音！");
  },
  bindTouchEnd: function (e) {
    var that = this;
    that.stop();
    console.log("停止录音");
  },
  //播放声音
  play: function (e) {
    innerAudioContext.autoplay = true
    innerAudioContext.obeyMuteSwitch = false;
    innerAudioContext.src = e,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  }
})
