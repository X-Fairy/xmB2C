(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods-list/goods-list"],{"2a50":function(t,e,o){"use strict";o.r(e);var i=o("88ce"),s=o("63af");for(var r in s)"default"!==r&&function(t){o.d(e,t,function(){return s[t]})}(r);o("b557");var n,a=o("f0c5"),c=Object(a["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],n);e["default"]=c.exports},"5ac2":function(t,e,o){},"63af":function(t,e,o){"use strict";o.r(e);var i=o("dfa6"),s=o.n(i);for(var r in i)"default"!==r&&function(t){o.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},"7f47":function(t,e,o){"use strict";(function(t){o("e146"),o("921b");i(o("66fd"));var e=i(o("2a50"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("f266")["createPage"])},"88ce":function(t,e,o){"use strict";var i,s=function(){var t=this,e=t.$createElement;t._self._c},r=[];o.d(e,"b",function(){return s}),o.d(e,"c",function(){return r}),o.d(e,"a",function(){return i})},b557:function(t,e,o){"use strict";var i=o("5ac2"),s=o.n(i);s.a},dfa6:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onShareAppMessage:function(t){return{title:this.key,path:"pages/goods/goods-list/goods-list?key="+this.key,success:function(t){console.log(t)},fail:function(t){console.log(t)}}},data:function(){return{key:"",secret:"",goodsList:[],loadingText:"正在加载中...",headerTop:"0px",headerPosition:"fixed",orderbyList:[{text:"销量",selected:!0,orderbyicon:!1,orderby:0},{text:"价格",selected:!1,orderbyicon:["sheng","jiang"],orderby:0},{text:"好评",selected:!1,orderbyicon:!1,orderby:0}],orderby:"sheng",pageCount:1,pageid:1}},onLoad:function(e){var o=this;this.key=e.key,t.setNavigationBarTitle({title:e.key}),t.getStorage({key:"user",success:function(t){o.secret=t.data,o.reload()}})},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){var e=this;setTimeout(function(){e.reload(),t.stopPullDownRefresh()},1e3)},onReachBottom:function(){if(this.pageid++,this.pageid>this.pageCount)return this.loadingText="到底了",!1;this.reload(),this.loadingText="正在加载..."},methods:{reload:function(){var t=this,e={key:this.key,store:10001,xopenid:this.secret.openid,pageid:this.pageid,secret:this.secret.secret,timestamp:this.secret.timestamp};this.$xm.post("/Product/search",e,function(e){0==e.count?t.loadingText="没有找到您要搜索的商品！":(e.prolist.map(function(t){t.pro_sn="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300",t.pro_name=t.pro_name.slice(0,15)+"..."}),t.goodsList=t.goodsList.concat(e.prolist),t.pageCount=e.count,1==t.pageCount&&(t.loadingText="到底了"))})},toSearch:function(){t.setNavigationBarTitle({title:this.key}),this.reload()},toGoods:function(e){t.navigateTo({url:"../../goods/goods?gid="+e.id})},joinCart:function(e){var o={proid:e.id,pronum:1,xopenid:this.secret.openid,store:10001,secret:this.secret.secret,timestamp:this.secret.timestamp};this.$xm.post("/Cart/add",o,function(e){var o=e.msg;t.showToast({title:o})})},select:function(e){var o=this.orderbyList[e].text+"排序 ";if(this.orderbyList[e].orderbyicon){var i=0==this.orderbyList[e].orderby?"升序":"降序";this.orderbyList[e].selected&&(i=0==this.orderbyList[e].orderby?"降序":"升序",this.orderbyList[e].orderby=0==this.orderbyList[e].orderby?1:0),o+=i}this.orderbyList[e].selected=!0;for(var s=this.orderbyList.length,r=0;r<s;r++)r!=e&&(this.orderbyList[r].selected=!1);t.showToast({title:o,icon:"none"})}}};e.default=o}).call(this,o("f266")["default"])}},[["7f47","common/runtime","common/vendor"]]]);