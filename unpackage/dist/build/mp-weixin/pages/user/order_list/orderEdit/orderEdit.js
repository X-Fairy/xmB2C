(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/order_list/orderEdit/orderEdit"],{"153b":function(t,n,e){"use strict";e.r(n);var o=e("dbcd"),i=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,(function(){return o[t]}))}(s);n["default"]=i.a},"3edd":function(t,n,e){"use strict";e.r(n);var o=e("b9b7"),i=e("153b");for(var s in i)"default"!==s&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("7a7f");var a,r=e("f0c5"),d=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=d.exports},"492d":function(t,n,e){"use strict";(function(t){e("7f00");o(e("66fd"));var n=o(e("3edd"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"7a7f":function(t,n,e){"use strict";var o=e("e95f"),i=e.n(o);i.a},b9b7:function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},s=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return o}))},dbcd:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{unionid:"",editType:"edit",id:"",name:"",tel:"",isDefault:!1,themeColor:"#007AFF",region:["","",""],location:{lat:"",lng:""},address:"",country:"",sn:""}},onLoad:function(t){t&&(this.sn=t.sn,this.loadData(t.sn))},methods:{loadData:function(t){var n=this,e={order_sn:t};this.$xm.post("/Order/getOrderInfo",e,(function(t){var e=t.contact;n.address=e.address,n.tel=e.phone,n.region=[e.province,e.city,e.town],n.country=e.country,n.name=e.name,n.id=e.id}))},bindRegionChange:function(t){this.region=t.detail.value,this.country="中国",this.location=""},save:function(){console.log(this.isDefault);var n={address:this.address,country:"中国",id:this.id,name:this.name,order_sn:this.sn,phone:this.tel,province:this.region[0],city:this.region[1],town:this.region[2],zip:""};if(n.name)if(n.phone){var e=/^[1][3,4,5,7,8][0-9]{9}$/;e.test(n.phone)?0!=this.region.length?n.address?this.getEdit(n):t.showToast({title:"请输入收件人详细地址",icon:"none"}):t.showToast({title:"请选择收件地址",icon:"none"}):t.showToast({title:"请输入正确的手机号码！",icon:"none"})}else t.showToast({title:"请输入收件人电话号码",icon:"none"});else t.showToast({title:"请输入收件人姓名",icon:"none"})},isDefaultChange:function(){this.isDefault=!this.isDefault},getEdit:function(n){this.$xm.post("/Order/orderaddr",n,(function(n){2e3==n.code?(t.showToast({title:"提交成功",icon:"none"}),t.hideLoading(),t.navigateBack()):t.showToast({title:n.msg,icon:"none"})}))}}};n.default=e}).call(this,e("543d")["default"])},e95f:function(t,n,e){}},[["492d","common/runtime","common/vendor"]]]);