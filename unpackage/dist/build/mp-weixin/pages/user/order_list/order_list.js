(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/order_list/order_list"],{2004:function(t,e,o){},"4b4f":function(t,e,o){"use strict";var n=o("2004"),r=o.n(n);r.a},"55ab":function(t,e,o){"use strict";o.r(e);var n=o("920c"),r=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(e,t,(function(){return n[t]}))}(s);e["default"]=r.a},"78e1":function(t,e,o){"use strict";o.r(e);var n=o("c6af"),r=o("55ab");for(var s in r)"default"!==s&&function(t){o.d(e,t,(function(){return r[t]}))}(s);o("4b4f");var i,a=o("f0c5"),c=Object(a["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=c.exports},"808b":function(t,e,o){"use strict";(function(t){o("7f00");n(o("66fd"));var e=n(o("78e1"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"920c":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){o.e("components/modal/modal").then(function(){return resolve(o("0b6c"))}.bind(null,o)).catch(o.oe)},r={components:{modal:n},data:function(){return{gid:"",pageid:1,status:"",headerPosition:"fixed",headerTop:"0px",orderType:[{name:"全部",sort:"s"},{name:"待付款",sort:"0"},{name:"待发货",sort:"1"},{name:"配货中",sort:"2"},{name:"待收货",sort:"3"},{name:"已收货",sort:"4"},{name:"已退款",sort:"8"}],orderList:[],list:[],tabbarIndex:0,scrollLeft:0,txt:"",txtmodal:!1,refundList:[],loadingText:"正在加载中...",top:0,listscrollLeft:0}},onLoad:function(t){this.tabbarIndex=t.tbIndex,this.getlist()},onShow:function(){},onPageScroll:function(t){this.top=t.scrollTop},methods:{scroll:function(t){this.listscrollLeft=t.detail.scrollLeft},getlist:function(){var t=this,e={pageid:this.pageid,status:"s"!=this.tabbarIndex?this.tabbarIndex:""};this.$xm.post("/Order/getList",e,(function(e){e.orderlist.length>0&&e.orderlist.forEach((function(e){switch(t.$xm.requestImg(e.pro),e.amtprice=parseFloat(e.actually_amt)+parseFloat(e.order_ship_price),e.order_state){case"0":e.tips="未付款";break;case"1":e.tips="已付款";break;case"2":e.tips="配货中";break;case"3":e.tips="已发货";break;case"4":e.tips="已收货";break;case"5":e.tips="已作废";break;case"6":e.tips="已删除";break;case"7":e.tips="待退款";break;case"8":e.tips="已退款";break;default:}})),t.list=e.orderlist,t.loadingText="到底了"}))},showType:function(t){t||(t="s"),this.tabbarIndex=t,this.getlist()},toOrderDtl:function(e){t.navigateTo({url:"./orderDtl/orderDtl?id="+e})},toConfirm:function(e){var o=this,n={order_sn:e};this.$xm.post("/Order/received",n,(function(e){t.showToast({title:e.msg,icon:"none"}),2e3==e.code&&o.getlist()}))},showLogistics:function(e){t.navigateTo({url:"../../logisticsTrack/track?id="+e.id})},buyAgain:function(e){var o;o=t.getStorageSync("store").store_code?t.getStorageSync("store").store_code:10001,t.navigateTo({url:"../../order/confirmation?store="+o+"&ordersn="+e.order_sn})},edit:function(e){console.log(e),t.navigateTo({url:"./orderEdit/orderEdit?sn="+e.order_sn})},modalShow:function(t){this.txtmodal=!0,this.refundList=t},refund:function(){var e=this;console.log(this.refundList),this.txtmodal=!1;var o=this;t.showModal({title:"确定要申请退款吗",content:"申请后不可恢复",success:function(n){if(n.confirm){var r={status:7,ordersn:e.refundList.order_sn,memo:e.txt};e.$xm.post("/Order/changeStatus",r,(function(e){1==e.s?(t.showToast({title:"申请成功"}),setTimeout((function(){o.getlist()}),500)):t.showToast({title:"申请失败"})}))}else n.cancel&&t.showToast({title:"申请失败"})}})},del:function(e){var o=this;t.showModal({title:"确定删除订单？",content:"删除之后不可恢复",success:function(n){if(n.confirm){var r={ordersn:e.order_sn,status:"6"};o.$xm.post("/Order/changeStatus",r,(function(e){1==e.s&&(o.getlist(),t.showToast({title:"删除成功"}))}))}}})},remindDeliver:function(e){t.showToast({title:"已提醒商家发货"})},cancelOrder:function(e){var o=this;t.showModal({title:"取消订单",content:"确定取消此订单？",success:function(t){t.confirm?(console.log("用户点击确定"),o.doCancelOrder(e.ordersn)):t.cancel&&console.log("用户点击取消")}})},doCancelOrder:function(t){for(var e=this.orderList.length,o=0;o<e;o++){var n=this.orderList[o],r=n.length;if(r>0&&"unpaid"==n[0].type)for(var s=0;s<r;s++)if(this.orderList[o][s].ordersn==t){this.orderList[o][s].type="cancelled";break}}},toPayment:function(e){var o={order_sn:e.order_sn};this.$xm.post("/Order/rePay",o,(function(e){if(1==e.s){var o=e.data;t.requestPayment({timeStamp:o.timeStamp,nonceStr:o.nonceStr,package:o.package,signType:o.signType,paySign:o.paySign,success:function(t){console.log(t)},fail:function(t){console.log(t)},complete:function(e){"requestPayment:ok"==e.errMsg?t.showModal({title:"支付成功！",content:"",showCancel:!1,confirmText:"确  定",confirmColor:"#2c2c2c",success:function(t){that.getlist()}}):t.showModal({title:"支付失败！",content:"",showCancel:!1,confirmText:"确  定",confirmColor:"#2c2c2c",success:function(t){t.confirm}})}})}else t.showToast({title:e.msg,icon:"none"})}))},toPage:function(){t.navigateTo({url:"./orderDtl/orderDtl"})},toGroup:function(e){t.navigateTo({url:"../../seckill/join/join?sn="+e.order_sn+"&groupid="+e.group_id})}}};e.default=r}).call(this,o("543d")["default"])},c6af:function(t,e,o){"use strict";var n={modal:function(){return o.e("components/modal/modal").then(o.bind(null,"0b6c"))}},r=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.txtmodal=!1})},s=[];o.d(e,"b",(function(){return r})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return n}))}},[["808b","common/runtime","common/vendor"]]]);