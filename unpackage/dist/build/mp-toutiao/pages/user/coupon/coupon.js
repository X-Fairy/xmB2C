(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/coupon/coupon"],{"51e0":function(t,n,e){},"6c23":function(t,n,e){"use strict";var i,o=function(){var t=this,n=t.$createElement;t._self._c},s=[];e.d(n,"b",function(){return o}),e.d(n,"c",function(){return s}),e.d(n,"a",function(){return i})},"8b60":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{couponValidList:[],couponinvalidList:[],headerTop:0,typeClass:"valid",subState:"",theIndex:null,oldIndex:null,isStop:!1,typeIndex:1}},onPageScroll:function(t){},onPullDownRefresh:function(){setTimeout(function(){t.stopPullDownRefresh()},1e3)},onLoad:function(){this.getCoupon()},methods:{switchType:function(n){var e=this;this.typeIndex="valid"==n?1:2,this.getCoupon(),this.typeClass!=n&&(t.pageScrollTo({scrollTop:0,duration:0}),this.typeClass=n,this.subState=""==this.typeClass?"":"show"+n,setTimeout(function(){e.oldIndex=null,e.theIndex=null,e.subState="valid"==e.typeClass?"":e.subState},200))},touchStart:function(t,n){n.touches.length>1?this.isStop=!0:(this.oldIndex=this.theIndex,this.theIndex=null,this.initXY=[n.touches[0].pageX,n.touches[0].pageY])},touchMove:function(t,n){var e=this;if(n.touches.length>1)this.isStop=!0;else{var i=n.touches[0].pageX-this.initXY[0],o=n.touches[0].pageY-this.initXY[1];this.isStop||Math.abs(i)<5||(Math.abs(o)>Math.abs(i)?this.isStop=!0:i<0?(this.theIndex=t,this.isStop=!0):i>0&&null!=this.theIndex&&this.oldIndex==this.theIndex&&(this.oldIndex=t,this.theIndex=null,this.isStop=!0,setTimeout(function(){e.oldIndex=null},150)))}},touchEnd:function(t,n){this.isStop=!1},getCoupon:function(){var t=this,n={type:this.typeIndex};this.$xm.post("/Coupon/index",n,function(n){n.data.length>0&&n.data.map(function(n){n.start_time=t.$xm.changeDay(1e3*n.start_time),n.end_time=t.$xm.changeDay(1e3*n.end_time)}),1==t.typeIndex?t.couponValidList=n.data:2==t.typeIndex&&(t.couponinvalidList=n.data)})},deleteCoupon:function(t,n){for(var e=n.length,i=0;i<e;i++)if(t==n[i].id){n.splice(i,1);break}this.oldIndex=null,this.theIndex=null},discard:function(){}}};n.default=e}).call(this,e("f266")["default"])},9823:function(t,n,e){"use strict";e.r(n);var i=e("6c23"),o=e("b088");for(var s in o)"default"!==s&&function(t){e.d(n,t,function(){return o[t]})}(s);e("a68a");var u,a=e("f0c5"),l=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);n["default"]=l.exports},a68a:function(t,n,e){"use strict";var i=e("51e0"),o=e.n(i);o.a},aa8d:function(t,n,e){"use strict";(function(t){e("e146"),e("921b");i(e("66fd"));var n=i(e("9823"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("f266")["createPage"])},b088:function(t,n,e){"use strict";e.r(n);var i=e("8b60"),o=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(n,t,function(){return i[t]})}(s);n["default"]=o.a}},[["aa8d","common/runtime","common/vendor"]]]);