(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/category/category"],{"16c0":function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},"5be5":function(t,e,n){"use strict";(function(t){n("7f00");o(n("66fd"));var e=o(n("ba7f"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"72c6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n("f93e");var o=function(){n.e("components/icon/icon").then(function(){return resolve(n("0950"))}.bind(null,n)).catch(n.oe)},i={components:{tuiIcon:o},data:function(){return{fid:1,showCategoryIndex:1,showCatename:"家居百货",headerPosition:"fixed",tabbar:[],scrollLeft:0,showHeader:!0,categoryList:[],loadingText:"正在加载中",scrollTop:0,cart:null,top:0,newImg:null,page:1}},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onLoad:function(){this.getbig();var e=t.getStorageSync("cateSelect");e||(1e3==this.showCategoryIndex?this.getnewGoods():this.getList())},onShow:function(){this.getCartnum();var e=t.getStorageSync("cateSelect");console.log(e),e&&(this.tabbar=[],this.showCategoryIndex=e.id,this.showCatename=e.cate_name,this.loadingText="正在加载中...",this.fid=e.id,this.getList())},onHide:function(){t.removeStorageSync("cateSelect")},methods:{getList:function(){var t=this,e={fid:this.fid};this.$xm.post("/Procate/getMid",e,(function(e){t.tabbar=e}))},getbig:function(){var t=this;this.$xm.post("/Procate/getBig","",(function(e){t.categoryList=e}))},showCategory:function(t){this.showCategoryIndex=t.id,this.fid=t.id,this.showCatename=t.cate_name,this.newImg=null,this.getList()},shownewGoods:function(){this.loadingText="正在加载中...",this.showCategoryIndex=1e3,this.showCatename="新品推荐",this.tabbar=[]},getnewGoods:function(){var t=this,e={p:this.page};this.$xm.post("/Index/newpro",e,(function(e){console.log(e),t.newImg=e.img}))},getCartnum:function(){var e=this;this.$xm.post("/Cart","",(function(n){e.count=n.count,null!==e.count&&e.count>0?(e.count=e.count.toString(),t.setTabBarBadge({index:2,text:e.count})):t.removeTabBarBadge({index:2}),t.setStorage({key:"cart",data:e.count,success:function(t){console.log(t)}})}))},toSearch:function(){t.navigateTo({url:"../../search/search/search"})},tocategood:function(e){t.navigateTo({url:"../../categoods/categoods?fid="+this.fid+"&mid="+e+"&name="+this.showCatename})}}};e.default=i}).call(this,n("543d")["default"])},"787f":function(t,e,n){},ba7f:function(t,e,n){"use strict";n.r(e);var o=n("16c0"),i=n("da27");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("e580");var c,s=n("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=r.exports},da27:function(t,e,n){"use strict";n.r(e);var o=n("72c6"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},e580:function(t,e,n){"use strict";var o=n("787f"),i=n.n(o);i.a}},[["5be5","common/runtime","common/vendor"]]]);