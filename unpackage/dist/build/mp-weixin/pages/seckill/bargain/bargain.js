(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/seckill/bargain/bargain"],{1725:function(t,n,i){"use strict";i.r(n);var o=i("82a0"),e=i.n(o);for(var c in o)"default"!==c&&function(t){i.d(n,t,(function(){return o[t]}))}(c);n["default"]=e.a},"1c61":function(t,n,i){"use strict";var o,e=function(){var t=this,n=t.$createElement;t._self._c},c=[];i.d(n,"b",(function(){return e})),i.d(n,"c",(function(){return c})),i.d(n,"a",(function(){return o}))},"82a0":function(t,n,i){"use strict";(function(t){function o(t,n,i){return n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i,t}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){i.e("components/countdown/countdown").then(function(){return resolve(i("58c2"))}.bind(null,i)).catch(i.oe)},c=function(){i.e("components/icon/icon").then(function(){return resolve(i("0950"))}.bind(null,i)).catch(i.oe)},a={components:{tuiIcon:c,tuiCountdown:e},data:function(){return{goodsList:[],loadingText:"正在加载中...",tabIndex:"0",tabBar:[{icon:"../../../static/img/seckill/cut.png",iconPath:"../../../static/img/seckill/cut-on.png",text:"砍价商品",id:"0"},{icon:"../../../static/img/seckill/my.png",iconPath:"../../../static/img/seckill/my-on.png",text:"我的砍价",id:"1"}],isSuccess:!0,cutTime:"",bartainlist:[]}},onLoad:function(){},onShow:function(){this.loadData(),this.getbartainlist()},methods:{loadData:function(){var t=this;this.$xm.post("/bargain/getlist","",(function(n){var i=n.list;i&&i.forEach((function(t){t.pro_img="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300",t.dis_price=parseInt(t.dis_price)})),t.goodsList=i,t.goodsList.length>0?t.loadingText="到底了":t.loadingText="暂无砍价商品！"}))},getbartainlist:function(){var t=this;this.$xm.post("/bargain/get_bartain_list","",(function(n){n&&n.forEach((function(t){t.pro_img="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300",t.etime=parseInt(t.etime)-Math.round(new Date/1e3),t.progress=t.price_totle/(t.pro_price-t.dis_price)*100,console.log(t.progress)})),t.bartainlist=n}))},tabChange:function(t){this.tabIndex=t,0==this.tabIndex?this.loadData():1==this.tabIndex&&this.getbartainlist()},toUse:function(n){var i={proid:n.proid,pronum:1};this.$xm.post("/Cart/add",i,(function(n){1==n.s?t.switchTab({url:"../../tabBar/cart/cart"}):0==n.s&&t.showToast({title:n.msg,icon:"none"})}))},toagainCut:function(n){if(n.xopenid&&!n.order_sn)t.showToast({title:"你已经发起该商品的砍价，砍砍别的商品吧",icon:"none"});else if(n.order_sn){var i;t.showModal((i={title:"该商品已经购买，是否跳转到订单",content:"",confirmText:"取  消",cancelColor:"#b2b2b2"},o(i,"confirmText","确  定"),o(i,"confirmColor","#2c2c2c"),o(i,"success",(function(n){n.confirm?t.navigateTo({url:"../../user/order_list/order_list?tbIndex=s"}):console.log("取消")})),i))}else this.$xm.post("/bargain/get_bartain_num","",(function(i){console.log(i),i>1?t.showToast({title:"你今日发起砍价商品已达上限，明天再来吧！",icon:"none"}):t.navigateTo({url:"./cut?bid="+n.id+"&mid="+n.mid})}))},toCut:function(n){t.navigateTo({url:"./cut?bid="+n.id+"&mid="+n.mid})}}};n.default=a}).call(this,i("543d")["default"])},"8b8a":function(t,n,i){"use strict";var o=i("c928"),e=i.n(o);e.a},c928:function(t,n,i){},e88e:function(t,n,i){"use strict";(function(t){i("7f00");o(i("66fd"));var n=o(i("e9c7"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,i("543d")["createPage"])},e9c7:function(t,n,i){"use strict";i.r(n);var o=i("1c61"),e=i("1725");for(var c in e)"default"!==c&&function(t){i.d(n,t,(function(){return e[t]}))}(c);i("8b8a");var a,r=i("f0c5"),s=Object(r["a"])(e["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=s.exports}},[["e88e","common/runtime","common/vendor"]]]);