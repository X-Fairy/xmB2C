(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/user/user"],{"2fa5":function(n,t,o){"use strict";var e,u=function(){var n=this,t=n.$createElement;n._self._c},c=[];o.d(t,"b",(function(){return u})),o.d(t,"c",(function(){return c})),o.d(t,"a",(function(){return e}))},"4e48":function(n,t,o){"use strict";o.r(t);var e=o("2fa5"),u=o("c5c7");for(var c in u)"default"!==c&&function(n){o.d(t,n,(function(){return u[n]}))}(c);o("fb18");var r,s=o("f0c5"),i=Object(s["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],r);t["default"]=i.exports},a155:function(n,t,o){"use strict";(function(n){o("7f00");e(o("66fd"));var t=e(o("4e48"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,o("543d")["createPage"])},b840:function(n,t,o){},b851:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){o.e("components/icon/icon").then(function(){return resolve(o("0950"))}.bind(null,o)).catch(o.oe)},u=function(){o.e("components/modal/modal").then(function(){return resolve(o("0b6c"))}.bind(null,o)).catch(o.oe)},c={components:{tuiIcon:e,tuiModal:u},data:function(){return{userProvider:"",userInfo:"",showModal:!0,totalNum:0,orderList:[{text:"待付款",icon:"fukuan",id:"0",num:0},{text:"待发货",icon:"fahuo",id:"1",num:0},{text:"待收货",icon:"shouhuo",id:"3",num:0},{text:"退款",icon:"tuihuo",id:"8",num:0}],mytoolbarList:[{url:"../../user/address/address",text:"收货地址"},{url:"../../user/keep/keep",text:"我的收藏"},{url:"../../seckill/group/group",text:"团购专享"},{url:"",text:"关于我们"}],count:0,cnum:0}},onLoad:function(){this.userProvider=this.$xm.userProvider()},onShow:function(){var t=this;this.getcount(),this.getCoupon(),n.getStorage({key:"cart",success:function(n){t.count=n.data}}),n.getStorage({key:"userInfo",success:function(o){console.log(o),t.userInfo=o.data,t.userInfo?t.showModal=!1:"weixin"==t.userProvider?t.showModal=!0:n.login({success:function(o){if(o.code){o.code;n.getUserInfo({success:function(o){t.userInfo=o.userInfo;var e={encryptedData:o.encryptedData,iv:o.iv};t.$xm.post("/Index/getUnionid",e,(function(t){var o=n.getStorageSync("user");o.unionid=t.unionid,n.setStorage({key:"user",data:o,success:function(n){console.log(n)}})})),n.setStorage({key:"userInfo",data:o.userInfo,success:function(n){console.log(n)}})},fail:function(n){console.log(n)}})}}})}})},methods:{getuserinfo:function(){var t=this;n.login({success:function(o){if(console.log(o),o.code){o.code;n.getUserInfo({success:function(o){t.userInfo=o.userInfo,t.showModal=!1;var e={encryptedData:o.encryptedData,iv:o.iv};t.$xm.post("/Index/getUnionid",e,(function(t){var o=n.getStorageSync("user");o.unionid=t.unionid,n.setStorage({key:"user",data:o,success:function(n){console.log(n)}})})),n.setStorage({key:"userInfo",data:o.userInfo,success:function(n){console.log(n)}})},fail:function(n){console.log(n)}})}}})},toOrderList:function(t){t||(t="s"),console.log(t),n.setStorageSync("tbIndex",t),n.navigateTo({url:"../../user/order_list/order_list?tbIndex="+t})},getcount:function(){var n=this;this.$xm.post("/Mine/index","",(function(t){var o=t.order_state,e=o.map((function(n){return n.order_state}));o.forEach((function(n){Number(n.state)})),e=e.toString().replace(/,/g,""),n.orderList.forEach((function(n){if(-1!==e.indexOf(n.id)){var t=e.indexOf(n.id);n.num=o[t].state}else n.num=0}))}))},getCoupon:function(){var n=this,t={type:1};this.$xm.post("/Coupon/index",t,(function(t){n.cnum=t.data.length}))},toCart:function(){n.switchTab({url:"../cart/cart"})},toPage:function(t){console.log(t),t?n.navigateTo({url:t}):n.showToast({title:"此内容正在开发中",icon:"none"})},close:function(){this.showModal=!1}}};t.default=c}).call(this,o("543d")["default"])},c5c7:function(n,t,o){"use strict";o.r(t);var e=o("b851"),u=o.n(e);for(var c in e)"default"!==c&&function(n){o.d(t,n,(function(){return e[n]}))}(c);t["default"]=u.a},fb18:function(n,t,o){"use strict";var e=o("b840"),u=o.n(e);u.a}},[["a155","common/runtime","common/vendor"]]]);