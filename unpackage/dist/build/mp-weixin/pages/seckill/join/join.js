(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/seckill/join/join"],{"3ed6":function(o,n,t){"use strict";var e,u=function(){var o=this,n=o.$createElement;o._self._c},r=[];t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return e}))},5128:function(o,n,t){"use strict";var e=t("ea2c"),u=t.n(e);u.a},"6be9":function(o,n,t){"use strict";(function(o){t("7f00");e(t("66fd"));var n=e(t("ec8d"));function e(o){return o&&o.__esModule?o:{default:o}}o(n.default)}).call(this,t("543d")["createPage"])},"886f":function(o,n,t){"use strict";(function(o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){t.e("components/countdown/countdown").then(function(){return resolve(t("58c2"))}.bind(null,t)).catch(t.oe)},u={components:{tuiCountdown:e},data:function(){return{type:null,user:[],goods:"",info:"",group:"",seckillTime:"",status:!1,userInfo:null,showBtn:!1}},onLoad:function(o){o&&o.type&&(this.type=o.type),this.group=o,this.loadData(o)},onShow:function(){var n=this;o.getStorage({key:"userInfo",success:function(o){console.log(o),n.userInfo=o.data,n.userInfo?n.showBtn=!0:n.showBtn=!1}})},methods:{getuserinfo:function(){var n=this;o.login({success:function(t){if(t.code){t.code;o.getUserInfo({success:function(t){n.userInfo=t.userInfo;var e={encryptedData:t.encryptedData,iv:t.iv};n.$xm.post("/Index/getUnionid",e,(function(t){n.showBtn=!0;var e=o.getStorageSync("user");e.unionid=t.unionid,o.setStorage({key:"user",data:e,success:function(o){console.log(o)}})})),o.setStorage({key:"userInfo",data:t.userInfo,success:function(o){console.log(o)}})},fail:function(o){}})}}})},loadData:function(o){var n=this,t={groupid:o.groupid};this.$xm.post("/groupbuy/get_group_info",t,(function(o){var t=o.group.length,e=o.groupinfo.group_num;n.status=t!=e,n.user=o.group,n.user.length=o.groupinfo.group_num,o.pro.pro_src="http://img.xmvogue.com/thumb/"+o.pro.pro_sn+".jpg?x-oss-process=style/300",n.goods=o.pro,o.groupinfo.amt=o.order_amt,n.info=o.groupinfo,n.seckillTime=parseInt(o.groupinfo.etime)-Math.round(new Date/1e3)}))},jojn:function(){o.navigateTo({url:"../../goods/goods?gid="+this.goods.id+"&type=join&groupid="+this.group.groupid+"&sid="+this.info.gid})}},onShareAppMessage:function(o){var n=Number(this.info.group_num)-1;return o.from,{title:"【还差"+n+'人,拼团】我买了"'+this.goods.pro_name+'"',path:"pages/seckill/join/join?type=group&sn="+this.group.sn+"&groupid="+this.group.groupid,success:function(o){}}}};n.default=u}).call(this,t("543d")["default"])},9422:function(o,n,t){"use strict";t.r(n);var e=t("886f"),u=t.n(e);for(var r in e)"default"!==r&&function(o){t.d(n,o,(function(){return e[o]}))}(r);n["default"]=u.a},ea2c:function(o,n,t){},ec8d:function(o,n,t){"use strict";t.r(n);var e=t("3ed6"),u=t("9422");for(var r in u)"default"!==r&&function(o){t.d(n,o,(function(){return u[o]}))}(r);t("5128");var i,s=t("f0c5"),c=Object(s["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);n["default"]=c.exports}},[["6be9","common/runtime","common/vendor"]]]);