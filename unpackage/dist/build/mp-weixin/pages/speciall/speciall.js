(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/speciall/speciall"],{"13f1":function(t,o,n){},"36ba":function(t,o,n){"use strict";var e,i=function(){var t=this,o=t.$createElement;t._self._c},r=[];n.d(o,"b",(function(){return i})),n.d(o,"c",(function(){return r})),n.d(o,"a",(function(){return e}))},"43fb":function(t,o,n){"use strict";n.r(o);var e=n("36ba"),i=n("5f52");for(var r in i)"default"!==r&&function(t){n.d(o,t,(function(){return i[t]}))}(r);n("86b4");var s,a=n("f0c5"),c=Object(a["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],s);o["default"]=c.exports},"5f52":function(t,o,n){"use strict";n.r(o);var e=n("d767"),i=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(o,t,(function(){return e[t]}))}(r);o["default"]=i.a},"86b4":function(t,o,n){"use strict";var e=n("13f1"),i=n.n(e);i.a},b9c5:function(t,o,n){"use strict";(function(t){n("7f00");e(n("66fd"));var o=e(n("43fb"));function e(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,n("543d")["createPage"])},d767:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={onShareAppMessage:function(t){return{title:"五一限时特惠",path:"pages/speciall/speciall",success:function(t){console.log(t)},fail:function(t){console.log(t)}}},data:function(){return{scrollTop:0,headerPosition:"fixed",scrollLeft:0,tabbarIndex:0,tabList:["限时特价","买一送一"],goodsList:[],productList:[],loadingText:"正在加载中..."}},onPageScroll:function(o){var n=this;this.scrollTop=o.scrollTop,this.headerPosition=o.scrollTop>=0?"fixed":"absolute",t.createSelectorQuery().select(".one").boundingClientRect((function(t){o.scrollTop>=t.height-50?n.tabbarIndex=1:o.scrollTop<t.height&&(n.tabbarIndex=0)})).exec()},onPullDownRefresh:function(){this.tabbarIndex,this.getgoodList(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},onReachBottom:function(){},onLoad:function(t){this.tabbarIndex=t.index,0==this.tabbarIndex?this.reload():this.getgoodList()},methods:{reload:function(){var t=this;this.$xm.post("/Product/xsqg","",(function(o){o.data.map((function(t){t.pro_sn="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300",t.pro_name=t.pro_name.slice(0,15)+"..."})),t.goodsList=o.data,t.getgoodList()}))},getgoodList:function(){var t=this;this.$xm.post("/Product/BOGO","",(function(o){o.list.map((function(t){t.pro_sn="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300"})),t.productList=o.list,t.loadingText="到底了！"}))},to:function(o){this.tabbarIndex=o,1==o?t.createSelectorQuery().select(".one").boundingClientRect((function(o){t.pageScrollTo({scrollTop:o.height,duration:200})})).exec():this.goodsList.length>0?t.pageScrollTo({scrollTop:0,duration:200}):this.reload()},toGoods:function(o){t.navigateTo({url:"../goods/goods?gid="+o.id})},joinCart:function(o){var n={proid:o.id,pronum:1};this.$xm.post("/Cart/add",n,(function(o){var n=o.msg;t.showToast({title:n})}))},tobuy:function(o){var n;n=t.getStorageSync("store").store_code?t.getStorageSync("store").store_code:10001,t.navigateTo({url:"../order/confirmation?store="+n+"&proid="+o.id+"&pronum=1"})},goCart:function(){t.switchTab({url:"../tabBar/cart/cart"})}}};o.default=n}).call(this,n("543d")["default"])}},[["b9c5","common/runtime","common/vendor"]]]);