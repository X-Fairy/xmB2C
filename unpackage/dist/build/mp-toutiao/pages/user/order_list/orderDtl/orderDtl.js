(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/order_list/orderDtl/orderDtl"],{"29ea":function(t,e,o){"use strict";o.r(e);var i=o("7f5a"),n=o("e6c1");for(var r in n)"default"!==r&&function(t){o.d(e,t,function(){return n[t]})}(r);o("b6c8");var c,s=o("f0c5"),u=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=u.exports},"2ae0":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return o.e("components/list-cell/list-cell").then(o.bind(null,"2061"))},n=function(){return o.e("components/icon/icon").then(o.bind(null,"be58"))},r={components:{tuiListCell:i,tuiIcon:n},data:function(){return{id:"",secret:{},type:"",time:"",shipname:"",buylist:[],goodsPrice:0,sumPrice:0,freight:0,orderShipSn:"",note:"",int:0,deduction:0,recinfo:{},totalPrice:0,logisticShow:!1,oid:"",traces:[]}},onLoad:function(t){this.id=t.id,this.getdetails()},onShow:function(){},onHide:function(){},onBackPress:function(){},filters:{toFixed:function(t){return parseFloat(t).toFixed(2)}},methods:{getlogistic:function(){var t=this,e={id:this.oid};this.$xm.post("/Index/getordership",e,function(e){console.log(e),e.Traces.length>0?(t.logisticShow=!0,t.traces=e.Traces[e.Traces.length-1]):t.logisticShow=!1,t.shipname=e.order_ship})},getdetails:function(){var t=this,e={order_sn:this.id};this.$xm.post("/Order/getOrderInfo",e,function(e){switch(e.order_state){case"6":e.order_state="已删除";break;case"8":e.order_state="已退款";break;default:}t.oid=e.id,t.getlogistic(),t.type=e.order_state,t.recinfo=e.contact,e.pro.map(function(t){t.pro_sn="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300"}),t.buylist=e.pro,t.time=e.order_time,t.shipname=e.order_ship,t.goodsPrice=e.actually_amt,t.freight=e.order_ship_price,t.sumPrice=Number(t.goodsPrice)+Number(t.freight),t.deduction=e.discount_amt,t.totalPrice=e.order_amt,t.orderShipSn=e.order_ship_sn})},clearOrder:function(){var e=this;t.removeStorage({key:"buylist",success:function(t){e.buylist=[]}})},togoods:function(e){console.log(e.id),t.navigateTo({url:"../../../goods/goods?gid="+e.id})},toTrack:function(){t.navigateTo({url:"../../../logisticsTrack/track?id="+this.oid})},toround:function(e){t.showToast({title:"内容正在完善中",icon:"none"})}}};e.default=r}).call(this,o("f266")["default"])},"7f5a":function(t,e,o){"use strict";var i,n=function(){var t=this,e=t.$createElement,o=(t._self._c,t._f("toFixed")(t.deduction)),i=t._f("toFixed")(t.totalPrice),n=t._f("toFixed")(t.freight),r=t._f("toFixed")(t.deduction),c=t._f("toFixed")(t.sumPrice),s=t._f("toFixed")(t.sumPrice);t.$mp.data=Object.assign({},{$root:{f0:o,f1:i,f2:n,f3:r,f4:c,f5:s}})},r=[];o.d(e,"b",function(){return n}),o.d(e,"c",function(){return r}),o.d(e,"a",function(){return i})},8644:function(t,e,o){"use strict";(function(t){o("e146"),o("921b");i(o("66fd"));var e=i(o("29ea"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("f266")["createPage"])},b6c8:function(t,e,o){"use strict";var i=o("c59b"),n=o.n(i);n.a},c59b:function(t,e,o){},e6c1:function(t,e,o){"use strict";o.r(e);var i=o("2ae0"),n=o.n(i);for(var r in i)"default"!==r&&function(t){o.d(e,t,function(){return i[t]})}(r);e["default"]=n.a}},[["8644","common/runtime","common/vendor"]]]);