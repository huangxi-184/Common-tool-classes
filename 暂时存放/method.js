// 同步读取本地缓存的办法
// try{
//   // 同步接口立即返回值
//   var value2 = wx.getStorageSync('key2')
// }catch (e) {
//   console.log('读取key2发生错误')
// }
//每个小程序的缓存空间上限为10MB
// 异步写入本地缓存 可以用来存通信的秘钥
// wx.setStorage({
//       key: "key",
//       data: "value1"
//       success: function () {
//         console.log('写入value1成功')
//       },
//       fail: function () {
//         console.log('写入value1发生错误')
//       }
//     }


// 利用本地缓存持久存储用户登录态SessionId
// var app = getApp()
// Page({
//   onLoad: function () {
//     // 调用wx.login获取微信登录凭证
//     wx.login({
//       success: function (res) {
//       // 拿到微信登录凭证之后去自己服务器换取自己的登录凭证
//         wx.request({
//           url: 'https://test.com/login',
//           data: {
//             code: res.code
//           },
//           success: function (res) {
//             var data = res.data
//             // 把 SessionId 和过期时间放在内存中的全局对象和本地缓存里边
//             app.globalData.sessionId = data.sessionId
//             wx.setStorageSync('SESSIONID', data.sessionId)
//             // 假设登录态保持1天
//             var expiredTime = +new Date() + 1 * 24 * 60 * 60 * 1000
//             app.globalData.expiredTime = expiredTime
//             wx.setStorageSync('EXPIREDTIME', expiredTime)
//           }
//         })
//       }
//     })
//   }
// })


// 利用本地缓存恢复用户登录态SessionId
//app.js

// App({
//   onLaunch: function(options) {
//     var sessionId =wx.getStorageSync('SESSIONID')
//     var expiredTime =wx.getStorageSync('EXPIREDTIME')
//     var now = +new Date()
//     if (now - expiredTime <=1*24*60*60*1000) {
//       this.globalData.sessionId = sessionId
//       this.globalData.expiredTime = expiredTime
//     }
//   },

//   globalData: {
//     sessionId: null,
//     expiredTime: 0
//   }
// })

// 为了防止用户极快速度触发两次tap回调，我们还加了一个hasClick的“锁”，
// 在开始请求前检查是否已经发起过请求，如果没有才发起这次请求，等到请求返回之后再把锁的状态恢复回去。
var hasClick = false;

Page({

    tap: function () {

        if (hasClick) {

            return

        }

        hasClick = true

        wx.showLoading()



        wx.request({

            url: 'https://test.com/getinfo',

            method: 'POST',

            header: { 'content-type': 'application/json' },

            data: {},

            success: function (res) {

                if (res.statusCode === 200) {

                    console.log(res.data)// 服务器回包内容

                }

            },

            fail: function (res) {

                wx.showToast({ title: '系统错误' })

            },

            complete: function (res) {

                wx.hideLoading()

                hasClick = false

            }

        })

    }

})