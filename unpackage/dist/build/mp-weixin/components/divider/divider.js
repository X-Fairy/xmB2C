(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/divider/divider"],{"00e9":function(e,t,r){"use strict";var n=r("bcd9"),a=r.n(n);a.a},"1ed2":function(e,t,r){"use strict";var n,a=function(){var e=this,t=e.$createElement,r=(e._self._c,e.getBgColor(e.gradual,e.gradualColor,e.dividerColor));e.$mp.data=Object.assign({},{$root:{m0:r}})},u=[];r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return u})),r.d(t,"a",(function(){return n}))},8130:function(e,t,r){"use strict";r.r(t);var n=r("efea"),a=r.n(n);for(var u in n)"default"!==u&&function(e){r.d(t,e,(function(){return n[e]}))}(u);t["default"]=a.a},bcd9:function(e,t,r){},c301:function(e,t,r){"use strict";r.r(t);var n=r("1ed2"),a=r("8130");for(var u in a)"default"!==u&&function(e){r.d(t,e,(function(){return a[e]}))}(u);r("00e9");var o,i=r("f0c5"),d=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=d.exports},efea:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"tuiDivider",props:{height:{type:Number,default:100},width:{type:String,default:"100%"},dividerColor:{type:String,default:"#e5e5e5"},color:{type:String,default:"#999"},size:{type:Number,default:24},bold:{type:Boolean,default:!1},bgcolor:{type:String,default:"#fafafa"},gradual:{type:Boolean,default:!1},gradualColor:{type:Array,default:function(){return["#eee","#ccc"]}}},methods:{getBgColor:function(e,t,r){var n=r;return e&&(n="linear-gradient(to right,"+t[0]+","+t[1]+","+t[1]+","+t[0]+")"),n}}};t.default=n}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/divider/divider-create-component',
    {
        'components/divider/divider-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c301"))
        })
    },
    [['components/divider/divider-create-component']]
]);
