(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/countdown/countdown"],{"0d46":function(t,n,e){"use strict";e.r(n);var o=e("1e2f"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=u.a},"1e2f":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"tuiCountdown",props:{width:{type:Number,default:50},height:{type:Number,default:30},bcolor:{type:String,default:"#333"},bgcolor:{type:String,default:"#fff"},size:{type:Number,default:23},color:{type:String,default:"#333"},scale:{type:Boolean,default:!1},colonSize:{type:Number,default:23},colonColor:{type:String,default:"#333"},time:{type:Number,default:0},days:{type:Boolean,default:!1},hours:{type:Boolean,default:!0},minutes:{type:Boolean,default:!0},seconds:{type:Boolean,default:!0},isColon:{type:Boolean,default:!0}},watch:{time:function(t){clearInterval(this.countdown),this.doLoop()}},data:function(){return{countdown:null,d:"0",h:"00",i:"00",s:"00"}},created:function(){this.doLoop()},beforeDestroy:function(){clearInterval(this.countdown),this.countdown=null},methods:{endOfTime:function(){clearInterval(this.countdown),this.countdown=null,this.$emit("end",{})},doLoop:function(){var t=this,n=this.time||0;this.countDown(n),this.countdown=setInterval((function(){n--,n<0?t.endOfTime():t.countDown(n)}),1e3)},countDown:function(t){var n=0,e=0,o=0,u=0;t>0?(n=this.days?Math.floor(t/86400):0,e=Math.floor(t/3600)-24*n,o=Math.floor(t/60)-60*e-24*n*60,u=Math.floor(t)-24*n*60*60-60*e*60-60*o):this.endOfTime(),e=e<10?"0"+e:e,o=o<10?"0"+o:o,u=u<10?"0"+u:u,this.d=n,this.h=e,this.i=o,this.s=u}}};n.default=o},"58c2":function(t,n,e){"use strict";e.r(n);var o=e("656c"),u=e("0d46");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("c261");var a,l=e("f0c5"),c=Object(l["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=c.exports},"656c":function(t,n,e){"use strict";var o,u=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}))},c261:function(t,n,e){"use strict";var o=e("f18b"),u=e.n(o);u.a},f18b:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/countdown/countdown-create-component',
    {
        'components/countdown/countdown-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("58c2"))
        })
    },
    [['components/countdown/countdown-create-component']]
]);
