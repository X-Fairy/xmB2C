(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/confirmation"],{"0cd6":function(i,t,o){"use strict";(function(i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{userProvider:"",word:[],id:"",secret:{},buylist:[],goodsPrice:0,payPrice:0,payLing:0,sumPrice:0,freight:5,note:"",int:1200,deduction:0,disShow:!1,discountList:[],mjtype:"",mjPrice:"",tips:"",minprice:0,recinfo:{},items:[],ship_name:"",shipmoney:"",store:"",ordersn:"",goods:[],goodsIdList:[],couponid:"",group:"",paySucess:!1}},onLoad:function(i){this.userProvider=this.$xm.userProvider(),this.store=i.store,this.ordersn=i.ordersn,i.proid&&(this.goods=[i.proid,i.pronum]),this.goodsIdList=[i.goods_list],i&&i.type&&(this.group=i,this.freight=0),console.log(this.group),this.getAddress()},onShow:function(){var t=this;this.loadData(),i.getStorage({key:"selectAddress",success:function(i){console.log(i),t.recinfo=i.data}})},filters:{toFixed:function(i){return parseFloat(i).toFixed(2)}},methods:{getAddress:function(){var i=this;this.$xm.post("/Order/getDefAdr/","",(function(t){console.log(t),i.recinfo=t}))},loadData:function(){var t=this,o={store:this.store};this.ordersn?o.order_sn=this.ordersn:this.goods.length>0?o.goods=this.goods:this.goodsIdList&&(o.goods_list=this.goodsIdList),"group"!=this.group.type&&"join"!=this.group.type||(o.isgroup=1),"isBargain"==this.group.type&&(o.isBargain=1),this.$xm.post("/cart/order",o,(function(o){if(0==o.s)i.showToast({title:o.msg,icon:"none"});else{t.word=o.word,t.buylist=o.prolist,t.$xm.requestImg(t.buylist),t.minprice=Number(o.minprice),t.tips=o.tips,t.goodsPrice=Number(o.allprice);var s=[];for(var e in o.discount_list){var r=o.discount_list[e];switch(e){case"BOGO":e="买一送一";break;case"dis_price":e="折扣优惠";break;case"sec_price":e="秒杀优惠";break;case"bar_price":e="砍价优惠";break;case"mm":e="免单优惠";break}var n={disType:e,disPrice:r};s.push(n)}t.discountList=s,console.log(t.discountList);var c=[];c=t.buylist.map((function(i){return i.proid+"/"+i.pronum})),t.discounts(c)}}))},discounts:function(i){var t=this,o={store:this.store,goods_list:i};"group"!=this.group.type&&"join"!=this.group.type||(o.isgroup=1),"isBargain"==this.group.type&&(o.isBargain=1),this.$xm.post("/Coupon/match_optimalss",o,(function(i){if(2e3==i.code?t.disShow=!0:t.disShow=!1,i.data){2==i.data.type&&(t.couponid=i.data.id),t.sumPrice=i.data.money;var o=i.data.money;t.payLing=Number(o),t.minprice>t.payLing&&(t.sumPrice=t.payLing+t.freight),t.tips=i.data.msg,t.mjPrice=i.data.cut,t.mjtype=i.data.type,t.getship()}}))},getship:function(){var t=this;if(this.recinfo){var o={shipid:this.recinfo.id,allprice:this.payLing,store:this.store};"group"==this.group.type||"join"==this.group.type?o.isgroup=1:"isBargain"==this.group.type&&(o.isBargain=1),this.$xm.post("/Order/getShipMoney",o,(function(i){void 0!==i.data&&(i.data.constructor==Array?(t.items=i.data,t.items.forEach((function(i){i.checked=""})),t.items[0].checked=!0,t.ship_name=t.items[0].name,t.shipmoney=t.items[0].price,t.freight=t.items[0].price):(t.items=[],t.freight=i.data.price,t.shipmoney=i.data.price,t.ship_name=i.data.name))}))}else i.showToast({title:"请选择收件地址！",icon:"none"})},shipChange:function(i){var t;this.ship_name=i.detail.value,"普通快递"==i.detail.value?(t=0,this.shipmoney=5):"顺丰快递"==i.detail.value?(t=1,this.shipmoney=15):i.detail.value.includes("包邮")&&(t=0,this.shipmoney=0),this.freight=this.items[t].price,this.sumPrice=(this.payLing+this.freight).toFixed(2)},toPay:function(){var t,o=this;if(this.paySucess=!0,t=i.getStorageSync("scene")?i.getStorageSync("scene"):"",this.recinfo){var s={shipid:this.recinfo.id,shipmoney:this.shipmoney,ship_name:this.ship_name,memo:this.note,couponid:this.couponid,store:this.store,scene:t};this.ordersn?s.order=this.ordersn:this.goods.length>0?s.goods=this.goods:this.goodsIdList&&(s.goods_list=this.goodsIdList),"group"==this.group.type&&(s.isgroup=1,s.gid=this.group.sid),"join"==this.group.type&&(s.isgroup=1,s.gid=this.group.sid,s.groupid=this.group.groupid),"isBargain"==this.group.type&&(s.isBargain=1,s.mid=this.group.mid),console.log(this.userProvider),"weixin"==this.userProvider?wx.requestSubscribeMessage({tmplIds:["Tq1zoW5_X4aokfmiG1OWVjq6AHuM9PDYAmociqqkIIE","LQ-y5nQFBJwpT-UcwVogzumUoxHJRVsQF5RUFDGlqR8","R3UHttvPZqGuAt97I4bFezelaT9ZJuKQi32cuWLc3bg","R3UHttvPZqGuAt97I4bFezelaT9ZJuKQi32cuWLc3bg"],success:function(t){console.log(t),o.$xm.post("/Order/saveOrder",s,(function(t){if(t){o.paySucess=!1;var e=t.data;1==t.s?i.requestPayment({timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success:function(i){console.log(i)},fail:function(i){console.log(i)},complete:function(t){"requestPayment:ok"==t.errMsg?i.showModal({title:"支付成功！",content:"",showCancel:!1,confirmText:"确  定",confirmColor:"#2c2c2c",success:function(t){i.redirectTo({url:"../user/order_list/order_list?tbIndex=1"})}}):i.showModal({title:"支付失败！",content:"",showCancel:!1,confirmText:"确  定",confirmColor:"#2c2c2c",success:function(t){if(t.confirm)if(s.isgroup){var r={order_sn:e.out_trade_no};o.$xm.post("/groupbuy/del_group_order",r,(function(t){"ok"==t&&i.switchTab({url:"../index/index"})}))}else wx.redirectTo({url:"../user/order_list/order_list?tbIndex=0"})}})}}):i.showToast({title:t.msg,icon:"none"})}}))},fail:function(i){console.error(i)}}):(console.log("支付"),this.$xm.post("/Order/saveOrder",s,(function(t){console.log(t);t.data;1==t.s||i.showToast({title:t.msg,icon:"none"})})))}},selectAddress:function(){i.navigateTo({url:"../user/address/address?type=select"})},togoods:function(t){console.log(t.proid),i.navigateTo({url:"../goods/goods?gid="+t.proid})}}};t.default=o}).call(this,o("543d")["default"])},"284c":function(i,t,o){},"2c03":function(i,t,o){"use strict";o.r(t);var s=o("c109"),e=o("cc71");for(var r in e)"default"!==r&&function(i){o.d(t,i,(function(){return e[i]}))}(r);o("d879");var n,c=o("f0c5"),a=Object(c["a"])(e["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],n);t["default"]=a.exports},c109:function(i,t,o){"use strict";var s={modal:function(){return o.e("components/modal/modal").then(o.bind(null,"0b6c"))}},e=function(){var i=this,t=i.$createElement;i._self._c},r=[];o.d(t,"b",(function(){return e})),o.d(t,"c",(function(){return r})),o.d(t,"a",(function(){return s}))},cae8:function(i,t,o){"use strict";(function(i){o("7f00");s(o("66fd"));var t=s(o("2c03"));function s(i){return i&&i.__esModule?i:{default:i}}i(t.default)}).call(this,o("543d")["createPage"])},cc71:function(i,t,o){"use strict";o.r(t);var s=o("0cd6"),e=o.n(s);for(var r in s)"default"!==r&&function(i){o.d(t,i,(function(){return s[i]}))}(r);t["default"]=e.a},d879:function(i,t,o){"use strict";var s=o("284c"),e=o.n(s);e.a}},[["cae8","common/runtime","common/vendor"]]]);