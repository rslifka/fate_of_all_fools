/*
Copyright 2009+, GM_config Contributors (https://github.com/sizzlemctwizzle/GM_config)

GM_config Contributors:
    Mike Medley <medleymind@gmail.com>
    Joe Simmons
    Izzy Soft
    Marti Martz

GM_config is distributed under the terms of the GNU Lesser General Public License.

    GM_config is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
// ==UserScript==
// @exclude       *
// @author        Mike Medley <medleymind@gmail.com> (https://github.com/sizzlemctwizzle/GM_config)
// @icon          https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png
// ==UserLibrary==
// @name          GM_config
// @description   A lightweight, reusable, cross-browser graphical settings framework for inclusion in user scripts.
// @copyright     2009+, Mike Medley (https://github.com/sizzlemctwizzle)
// @license       LGPL-3.0; https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/LICENSE
// ==/UserScript==
// ==/UserLibrary==
// The GM_config constructor
function GM_configStruct(){
// call init() if settings were passed to constructor
arguments.length&&(GM_configInit(this,arguments),this.onInit())}
// This is the initializer function
function GM_configInit(e,t){if(
// Initialize instance variables
"undefined"==typeof e.fields&&(e.fields={},e.onInit=e.onInit||function(){},e.onOpen=e.onOpen||function(){},e.onSave=e.onSave||function(){},e.onClose=e.onClose||function(){},e.onReset=e.onReset||function(){},e.isOpen=!1,e.title="User Script Settings",e.css={basic:["#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }","#GM_config { background: #FFF; }","#GM_config input[type='radio'] { margin-right: 8px; }","#GM_config .indent40 { margin-left: 40%; }","#GM_config .field_label { font-size: 12px; font-weight: bold; margin-right: 6px; }","#GM_config .radio_label { font-size: 12px; }","#GM_config .block { display: block; }","#GM_config .saveclose_buttons { margin: 16px 10px 10px; padding: 2px 12px; }","#GM_config .reset, #GM_config .reset a, #GM_config_buttons_holder { color: #000; text-align: right; }","#GM_config .config_header { font-size: 20pt; margin: 0; }","#GM_config .config_desc, #GM_config .section_desc, #GM_config .reset { font-size: 9pt; }","#GM_config .center { text-align: center; }","#GM_config .section_header_holder { margin-top: 8px; }","#GM_config .config_var { margin: 0 0 4px; }","#GM_config .section_header { background: #414141; border: 1px solid #000; color: #FFF;"," font-size: 13pt; margin: 0; }","#GM_config .section_desc { background: #EFEFEF; border: 1px solid #CCC; color: #575757; font-size: 9pt; margin: 0 0 6px; }"].join("\n")+"\n",basicPrefix:"GM_config",stylish:""}),1==t.length&&"string"==typeof t[0].id&&"function"!=typeof t[0].appendChild)var n=t[0];else
// loop through GM_config.init() arguments
for(var r,n={},i=0,o=t.length;i<o;++i)
// An element to use as the config window
if(r=t[i],"function"!=typeof r.appendChild)switch(typeof r){case"object":for(var a in r){// could be a callback functions or settings object
if("function"!=typeof r[a]){// we are in the settings object
n.fields=r;// store settings object
break}// otherwise it must be a callback function
n.events||(n.events={}),n.events[a]=r[a]}break;case"function":// passing a bare function is set to open callback
n.events={onOpen:r};break;case"string":// could be custom CSS or the title string
/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(r)?n.css=r:n.title=r}else n.frame=r;
// Set the event callbacks
if(/* Initialize everything using the new settings object */
// Set the id
n.id?e.id=n.id:"undefined"==typeof e.id&&(e.id="GM_config"),
// Set the title
n.title&&(e.title=n.title),
// Set the custom css
n.css&&(e.css.stylish=n.css),
// Set the frame
n.frame&&(e.frame=n.frame),n.events){var s=n.events;for(var u in s)e["on"+u.charAt(0).toUpperCase()+u.slice(1)]=s[u]}
// Create the fields
if(n.fields){var c=e.read(),// read the stored settings
l=n.fields,f=n.types||{},d=e.id;for(var p in l){var h=l[p];
// for each field definition create a field object
h?e.fields[p]=new GM_configField(h,c[p],p,f[h.type],d):e.fields[p]&&delete e.fields[p]}}
// If the id has changed we must modify the default style
e.id!=e.css.basicPrefix&&(e.css.basic=e.css.basic.replace(new RegExp("#"+e.css.basicPrefix,"gm"),"#"+e.id),e.css.basicPrefix=e.id)}function GM_configDefaultValue(e,t){var n;switch(0==e.indexOf("unsigned ")&&(e=e.substring(9)),e){case"radio":case"select":n=t[0];break;case"checkbox":n=!1;break;case"int":case"integer":case"float":case"number":n=0;break;default:n=""}return n}function GM_configField(e,t,n,r,i){
// Store the field's settings
this.settings=e,this.id=n,this.configId=i,this.node=null,this.wrapper=null,this.save="undefined"==typeof e.save||e.save,
// Buttons are static and don't have a stored value
"button"==e.type&&(this.save=!1),
// if a default value wasn't passed through init() then
//   if the type is custom use its default value
//   else use default value for type
// else use the default value passed through init()
this["default"]="undefined"==typeof e["default"]?r?r["default"]:GM_configDefaultValue(e.type,e.options):e["default"],
// Store the field's value
this.value="undefined"==typeof t?this["default"]:t,
// Setup methods for a custom type
r&&(this.toNode=r.toNode,this.toValue=r.toValue,this.reset=r.reset)}!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},r={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,t){for(var n,r=[],i=(o.test(t)?e+"/"+t:t).split("/"),a=0,s=i.length;a<s;a++)n=i[a],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(n){var r=a(s(t),n);return e.require(r,t)}},c=function(e,t){var r=m&&m.createHot(e),i={id:e,exports:{},hot:r};return n[e]=i,t(i.exports,u(e),i),i.exports},l=function(e){return r[e]?l(r[e]):e},f=function(e,t){return l(a(s(e),t))},d=function(e,r){null==r&&(r="/");var o=l(e);if(i.call(n,o))return n[o].exports;if(i.call(t,o))return c(o,t[o]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e};var p=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,g=function(e){if(p.test(e)){var t=e.replace(p,"");i.call(r,t)&&r[t].replace(p,"")!==t+"/index"||(r[t]=e)}if(h.test(e)){var n=e.replace(h,"");i.call(r,n)||(r[n]=e)}};d.register=d.define=function(e,r){if(e&&"object"==typeof e)for(var o in e)i.call(e,o)&&d.register(o,e[o]);else t[e]=r,delete n[e],g(e)},d.list=function(){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e};var m=e._hmr&&new e._hmr(f,d,t,n);d._cache=n,d.hmr=m&&m.wrap,d.brunch=!0,e.require=d}}(),function(){var e,t=("undefined"==typeof window?this:window,function(e,t,n){var r={},i=function(t,n){var o;try{return o=e(n+"/node_modules/"+t)}catch(a){if(a.toString().indexOf("Cannot find module")===-1)throw a;if(n.indexOf("node_modules")!==-1){var s=n.split("/"),u=s.lastIndexOf("node_modules"),c=s.slice(0,u).join("/");return i(t,c)}}return r};return function(o){if(o in t&&(o=t[o]),o){if("."!==o[0]&&n){var a=i(o,n);if(a!==r)return a}return e(o)}}});require.register("blueimp-md5/js/md5.js",function(e,n,r){n=t(n,{},"blueimp-md5"),function(){!function(e){"use strict";/**
   * Add integers, wrapping at 2^32.
   * This uses 16-bit operations internally to work around bugs in interpreters.
   *
   * @param {number} x First integer
   * @param {number} y Second integer
   * @returns {number} Sum
   */
function t(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}/**
   * Bitwise rotate a 32-bit number to the left.
   *
   * @param {number} num 32-bit number
   * @param {number} cnt Rotation count
   * @returns {number} Rotated number
   */
function n(e,t){return e<<t|e>>>32-t}/**
   * Basic operation the algorithm uses.
   *
   * @param {number} q q
   * @param {number} a a
   * @param {number} b b
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
function i(e,r,i,o,a,s){return t(n(t(t(r,e),t(o,s)),a),i)}/**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
function o(e,t,n,r,o,a,s){return i(t&n|~t&r,e,t,o,a,s)}/**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
function a(e,t,n,r,o,a,s){return i(t&r|n&~r,e,t,o,a,s)}/**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
function s(e,t,n,r,o,a,s){return i(t^n^r,e,t,o,a,s)}/**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
function u(e,t,n,r,o,a,s){return i(n^(t|~r),e,t,o,a,s)}/**
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   *
   * @param {Array} x Array of little-endian words
   * @param {number} len Bit length
   * @returns {Array<number>} MD5 Array
   */
function c(e,n){/* append padding */
e[n>>5]|=128<<n%32,e[(n+64>>>9<<4)+14]=n;var r,i,c,l,f,d=1732584193,p=-271733879,h=-1732584194,g=271733878;for(r=0;r<e.length;r+=16)i=d,c=p,l=h,f=g,d=o(d,p,h,g,e[r],7,-680876936),g=o(g,d,p,h,e[r+1],12,-389564586),h=o(h,g,d,p,e[r+2],17,606105819),p=o(p,h,g,d,e[r+3],22,-1044525330),d=o(d,p,h,g,e[r+4],7,-176418897),g=o(g,d,p,h,e[r+5],12,1200080426),h=o(h,g,d,p,e[r+6],17,-1473231341),p=o(p,h,g,d,e[r+7],22,-45705983),d=o(d,p,h,g,e[r+8],7,1770035416),g=o(g,d,p,h,e[r+9],12,-1958414417),h=o(h,g,d,p,e[r+10],17,-42063),p=o(p,h,g,d,e[r+11],22,-1990404162),d=o(d,p,h,g,e[r+12],7,1804603682),g=o(g,d,p,h,e[r+13],12,-40341101),h=o(h,g,d,p,e[r+14],17,-1502002290),p=o(p,h,g,d,e[r+15],22,1236535329),d=a(d,p,h,g,e[r+1],5,-165796510),g=a(g,d,p,h,e[r+6],9,-1069501632),h=a(h,g,d,p,e[r+11],14,643717713),p=a(p,h,g,d,e[r],20,-373897302),d=a(d,p,h,g,e[r+5],5,-701558691),g=a(g,d,p,h,e[r+10],9,38016083),h=a(h,g,d,p,e[r+15],14,-660478335),p=a(p,h,g,d,e[r+4],20,-405537848),d=a(d,p,h,g,e[r+9],5,568446438),g=a(g,d,p,h,e[r+14],9,-1019803690),h=a(h,g,d,p,e[r+3],14,-187363961),p=a(p,h,g,d,e[r+8],20,1163531501),d=a(d,p,h,g,e[r+13],5,-1444681467),g=a(g,d,p,h,e[r+2],9,-51403784),h=a(h,g,d,p,e[r+7],14,1735328473),p=a(p,h,g,d,e[r+12],20,-1926607734),d=s(d,p,h,g,e[r+5],4,-378558),g=s(g,d,p,h,e[r+8],11,-2022574463),h=s(h,g,d,p,e[r+11],16,1839030562),p=s(p,h,g,d,e[r+14],23,-35309556),d=s(d,p,h,g,e[r+1],4,-1530992060),g=s(g,d,p,h,e[r+4],11,1272893353),h=s(h,g,d,p,e[r+7],16,-155497632),p=s(p,h,g,d,e[r+10],23,-1094730640),d=s(d,p,h,g,e[r+13],4,681279174),g=s(g,d,p,h,e[r],11,-358537222),h=s(h,g,d,p,e[r+3],16,-722521979),p=s(p,h,g,d,e[r+6],23,76029189),d=s(d,p,h,g,e[r+9],4,-640364487),g=s(g,d,p,h,e[r+12],11,-421815835),h=s(h,g,d,p,e[r+15],16,530742520),p=s(p,h,g,d,e[r+2],23,-995338651),d=u(d,p,h,g,e[r],6,-198630844),g=u(g,d,p,h,e[r+7],10,1126891415),h=u(h,g,d,p,e[r+14],15,-1416354905),p=u(p,h,g,d,e[r+5],21,-57434055),d=u(d,p,h,g,e[r+12],6,1700485571),g=u(g,d,p,h,e[r+3],10,-1894986606),h=u(h,g,d,p,e[r+10],15,-1051523),p=u(p,h,g,d,e[r+1],21,-2054922799),d=u(d,p,h,g,e[r+8],6,1873313359),g=u(g,d,p,h,e[r+15],10,-30611744),h=u(h,g,d,p,e[r+6],15,-1560198380),p=u(p,h,g,d,e[r+13],21,1309151649),d=u(d,p,h,g,e[r+4],6,-145523070),g=u(g,d,p,h,e[r+11],10,-1120210379),h=u(h,g,d,p,e[r+2],15,718787259),p=u(p,h,g,d,e[r+9],21,-343485551),d=t(d,i),p=t(p,c),h=t(h,l),g=t(g,f);return[d,p,h,g]}/**
   * Convert an array of little-endian words to a string
   *
   * @param {Array<number>} input MD5 Array
   * @returns {string} MD5 string
   */
function l(e){var t,n="",r=32*e.length;for(t=0;t<r;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}/**
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   *
   * @param {string} input Raw input string
   * @returns {Array<number>} Array of little-endian words
   */
function f(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var r=8*e.length;for(t=0;t<r;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}/**
   * Calculate the MD5 of a raw string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
function d(e){return l(c(f(e),8*e.length))}/**
   * Calculates the HMAC-MD5 of a key and some data (raw strings)
   *
   * @param {string} key HMAC key
   * @param {string} data Raw input string
   * @returns {string} Raw MD5 string
   */
function p(e,t){var n,r,i=f(e),o=[],a=[];for(o[15]=a[15]=void 0,i.length>16&&(i=c(i,8*e.length)),n=0;n<16;n+=1)o[n]=909522486^i[n],a[n]=1549556828^i[n];return r=c(o.concat(f(t)),512+8*t.length),l(c(a.concat(r),640))}/**
   * Convert a raw string to a hex string
   *
   * @param {string} input Raw input string
   * @returns {string} Hex encoded string
   */
function h(e){var t,n,r="0123456789abcdef",i="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),i+=r.charAt(t>>>4&15)+r.charAt(15&t);return i}/**
   * Encode a string as UTF-8
   *
   * @param {string} input Input string
   * @returns {string} UTF8 string
   */
function g(e){return unescape(encodeURIComponent(e))}/**
   * Encodes input string as raw MD5 string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
function m(e){return d(g(e))}/**
   * Encodes input string as Hex encoded string
   *
   * @param {string} s Input string
   * @returns {string} Hex encoded string
   */
function v(e){return h(m(e))}/**
   * Calculates the raw HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
function y(e,t){return p(g(e),g(t))}/**
   * Calculates the Hex encoded HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
function b(e,t){return h(y(e,t))}/**
   * Calculates MD5 value for a given string.
   * If a key is provided, calculates the HMAC-MD5 value.
   * Returns a Hex encoded string unless the raw argument is given.
   *
   * @param {string} string Input string
   * @param {string} [key] HMAC key
   * @param {boolean} [raw] Raw output switch
   * @returns {string} MD5 output
   */
function x(e,t,n){return t?n?y(t,e):b(t,e):n?m(e):v(e)}"function"==typeof define&&define.amd?define(function(){return x}):"object"==typeof r&&r.exports?r.exports=x:e.md5=x}(this)}()}),require.register("jquery-toast-plugin/dist/jquery.toast.min.js",function(e,n,r){n=t(n,{},"jquery-toast-plugin"),function(){"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),function(e,t,n,r){"use strict";var i={_positionClasses:["bottom-left","bottom-right","top-right","top-left","bottom-center","top-center","mid-center"],_defaultIcons:["success","error","info","warning"],init:function(t,n){this.prepareOptions(t,e.toast.options),this.process()},prepareOptions:function(t,n){var r={};"string"==typeof t||t instanceof Array?r.text=t:r=t,this.options=e.extend({},n,r)},process:function(){this.setup(),this.addToDom(),this.position(),this.bindToast(),this.animate()},setup:function(){var t="";if(this._toastEl=this._toastEl||e("<div></div>",{"class":"jq-toast-single"}),t+='<span class="jq-toast-loader"></span>',this.options.allowToastClose&&(t+='<span class="close-jq-toast-single">&times;</span>'),this.options.text instanceof Array){this.options.heading&&(t+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),t+='<ul class="jq-toast-ul">';for(var n=0;n<this.options.text.length;n++)t+='<li class="jq-toast-li" id="jq-toast-item-'+n+'">'+this.options.text[n]+"</li>";t+="</ul>"}else this.options.heading&&(t+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),t+=this.options.text;this._toastEl.html(t),this.options.bgColor!==!1&&this._toastEl.css("background-color",this.options.bgColor),this.options.textColor!==!1&&this._toastEl.css("color",this.options.textColor),this.options.textAlign&&this._toastEl.css("text-align",this.options.textAlign),this.options.icon!==!1&&(this._toastEl.addClass("jq-has-icon"),-1!==e.inArray(this.options.icon,this._defaultIcons)&&this._toastEl.addClass("jq-icon-"+this.options.icon)),this.options["class"]!==!1&&this._toastEl.addClass(this.options["class"])},position:function(){"string"==typeof this.options.position&&-1!==e.inArray(this.options.position,this._positionClasses)?"bottom-center"===this.options.position?this._container.css({left:e(t).outerWidth()/2-this._container.outerWidth()/2,bottom:20}):"top-center"===this.options.position?this._container.css({left:e(t).outerWidth()/2-this._container.outerWidth()/2,top:20}):"mid-center"===this.options.position?this._container.css({left:e(t).outerWidth()/2-this._container.outerWidth()/2,top:e(t).outerHeight()/2-this._container.outerHeight()/2}):this._container.addClass(this.options.position):"object"==typeof this.options.position?this._container.css({top:this.options.position.top?this.options.position.top:"auto",bottom:this.options.position.bottom?this.options.position.bottom:"auto",left:this.options.position.left?this.options.position.left:"auto",right:this.options.position.right?this.options.position.right:"auto"}):this._container.addClass("bottom-left")},bindToast:function(){var e=this;this._toastEl.on("afterShown",function(){e.processLoader()}),this._toastEl.find(".close-jq-toast-single").on("click",function(t){t.preventDefault(),"fade"===e.options.showHideTransition?(e._toastEl.trigger("beforeHide"),e._toastEl.fadeOut(function(){e._toastEl.trigger("afterHidden")})):"slide"===e.options.showHideTransition?(e._toastEl.trigger("beforeHide"),e._toastEl.slideUp(function(){e._toastEl.trigger("afterHidden")})):(e._toastEl.trigger("beforeHide"),e._toastEl.hide(function(){e._toastEl.trigger("afterHidden")}))}),"function"==typeof this.options.beforeShow&&this._toastEl.on("beforeShow",function(){e.options.beforeShow()}),"function"==typeof this.options.afterShown&&this._toastEl.on("afterShown",function(){e.options.afterShown()}),"function"==typeof this.options.beforeHide&&this._toastEl.on("beforeHide",function(){e.options.beforeHide()}),"function"==typeof this.options.afterHidden&&this._toastEl.on("afterHidden",function(){e.options.afterHidden()})},addToDom:function(){var t=e(".jq-toast-wrap");if(0===t.length?(t=e("<div></div>",{"class":"jq-toast-wrap"}),e("body").append(t)):(!this.options.stack||isNaN(parseInt(this.options.stack,10)))&&t.empty(),t.find(".jq-toast-single:hidden").remove(),t.append(this._toastEl),this.options.stack&&!isNaN(parseInt(this.options.stack),10)){var n=t.find(".jq-toast-single").length,r=n-this.options.stack;r>0&&e(".jq-toast-wrap").find(".jq-toast-single").slice(0,r).remove()}this._container=t},canAutoHide:function(){return this.options.hideAfter!==!1&&!isNaN(parseInt(this.options.hideAfter,10))},processLoader:function(){if(!this.canAutoHide()||this.options.loader===!1)return!1;var e=this._toastEl.find(".jq-toast-loader"),t=(this.options.hideAfter-400)/1e3+"s",n=this.options.loaderBg,r=e.attr("style")||"";r=r.substring(0,r.indexOf("-webkit-transition")),r+="-webkit-transition: width "+t+" ease-in;                       -o-transition: width "+t+" ease-in;                       transition: width "+t+" ease-in;                       background-color: "+n+";",e.attr("style",r).addClass("jq-toast-loaded")},animate:function(){var e=this;if(this._toastEl.hide(),this._toastEl.trigger("beforeShow"),"fade"===this.options.showHideTransition.toLowerCase()?this._toastEl.fadeIn(function(){e._toastEl.trigger("afterShown")}):"slide"===this.options.showHideTransition.toLowerCase()?this._toastEl.slideDown(function(){e._toastEl.trigger("afterShown")}):this._toastEl.show(function(){e._toastEl.trigger("afterShown")}),this.canAutoHide()){var e=this;t.setTimeout(function(){"fade"===e.options.showHideTransition.toLowerCase()?(e._toastEl.trigger("beforeHide"),e._toastEl.fadeOut(function(){e._toastEl.trigger("afterHidden")})):"slide"===e.options.showHideTransition.toLowerCase()?(e._toastEl.trigger("beforeHide"),e._toastEl.slideUp(function(){e._toastEl.trigger("afterHidden")})):(e._toastEl.trigger("beforeHide"),e._toastEl.hide(function(){e._toastEl.trigger("afterHidden")}))},this.options.hideAfter)}},reset:function(t){"all"===t?e(".jq-toast-wrap").remove():this._toastEl.remove()},update:function(e){this.prepareOptions(e,this.options),this.setup(),this.bindToast()}};e.toast=function(e){var t=Object.create(i);return t.init(e,this),{reset:function(e){t.reset(e)},update:function(e){t.update(e)}}},e.toast.options={text:"",heading:"",showHideTransition:"fade",allowToastClose:!0,hideAfter:3e3,loader:!0,loaderBg:"#9EC600",stack:5,position:"bottom-left",bgColor:!1,textColor:!1,textAlign:"left",icon:!1,beforeShow:function(){},afterShown:function(){},beforeHide:function(){},afterHidden:function(){}}}(jQuery,window,document)}()}),require.register("jquery/dist/jquery.js",function(e,n,r){n=t(n,{},"jquery"),function(){/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
!function(e,t){"use strict";"object"==typeof r&&"object"==typeof r.exports?
// For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
r.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){
// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";function n(e,t,n){n=n||we;var r,i,o=n.createElement("script");if(o.text=e,t)for(r in je)
// Support: Firefox 64+, Edge 18+
// Some browsers don't support the "nonce" property on scripts.
// On the other hand, just using `getAttribute` is not enough as
// the `nonce` attribute is reset to an empty string whenever it
// becomes browsing-context connected.
// See https://github.com/whatwg/html/issues/2369
// See https://html.spec.whatwg.org/#nonce-attributes
// The `node.getAttribute` check was added for the sake of
// `jQuery.globalEval` so that it can fake a nonce-containing node
// via an object.
i=t[r]||t.getAttribute&&t.getAttribute(r),i&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function r(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?pe[he.call(e)]||"object":typeof e}function i(e){
// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var t=!!e&&"length"in e&&e.length,n=r(e);return!be(e)&&!xe(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function o(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}
// Implement the identical functionality for filter and not
function a(e,t,n){
// Single element
// Arraylike of elements (jQuery, arguments, Array)
return be(t)?ke.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?ke.grep(e,function(e){return e===t!==n}):"string"!=typeof t?ke.grep(e,function(e){return de.call(t,e)>-1!==n}):ke.filter(t,e,n)}function s(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}
// Convert String-formatted options into Object-formatted ones
function u(e){var t={};return ke.each(e.match(Re)||[],function(e,n){t[n]=!0}),t}function c(e){return e}function l(e){throw e}function f(e,t,n,r){var i;try{
// Check for promise aspect first to privilege synchronous behavior
e&&be(i=e.promise)?i.call(e).done(t).fail(n):e&&be(i=e.then)?i.call(e,t,n):
// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
t.apply(void 0,[e].slice(r))}catch(e){
// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
n.apply(void 0,[e])}}
// The ready event handler and self cleanup method
function d(){we.removeEventListener("DOMContentLoaded",d),e.removeEventListener("load",d),ke.ready()}
// Used by camelCase as callback to replace()
function p(e,t){return t.toUpperCase()}
// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function h(e){return e.replace(Pe,"ms-").replace(Be,p)}function g(){this.expando=ke.expando+g.uid++}function m(e){
// Only convert to a number if it doesn't change the string
return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Ue.test(e)?JSON.parse(e):e)}function v(e,t,n){var r;
// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace($e,"-$&").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n=m(n)}catch(i){}
// Make sure we set the data so it isn't changed later
We.set(e,t,n)}else n=void 0;return n}function y(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return ke.css(e,t,"")},u=s(),c=n&&n[3]||(ke.cssNumber[t]?"":"px"),
// Starting value computation is required for potential unit mismatches
l=e.nodeType&&(ke.cssNumber[t]||"px"!==c&&+u)&&ze.exec(ke.css(e,t));if(l&&l[3]!==c){for(
// Support: Firefox <=54
// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
u/=2,
// Trust units reported by jQuery.css
c=c||l[3],
// Iteratively approximate from a nonzero starting point
l=+u||1;a--;)
// Evaluate and update our best guess (doubling guesses that zero out).
// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
ke.style(e,t,l+c),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),l/=o;l=2*l,ke.style(e,t,l+c),
// Make sure we update the tween properties later on
n=n||[]}
// Apply relative offset (+=/-=) if specified
return n&&(l=+l||+u||0,i=n[1]?l+(n[1]+1)*n[2]:+n[2],r&&(r.unit=c,r.start=l,r.end=i)),i}function b(e){var t,n=e.ownerDocument,r=e.nodeName,i=Ze[r];return i?i:(t=n.body.appendChild(n.createElement(r)),i=ke.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),Ze[r]=i,i)}function x(e,t){
// Determine new display value for elements that need to change
for(var n,r,i=[],o=0,a=e.length;o<a;o++)r=e[o],r.style&&(n=r.style.display,t?(
// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
// check is required in this first loop unless we have a nonempty display value (either
// inline or about-to-be-restored)
"none"===n&&(i[o]=Ge.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&Je(r)&&(i[o]=b(r))):"none"!==n&&(i[o]="none",
// Remember what we're overwriting
Ge.set(r,"display",n)));
// Set the display of the elements in a second loop to avoid constant reflow
for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}function w(e,t){
// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (#15151)
var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&o(e,t)?ke.merge([e],n):n}
// Mark scripts as having already been evaluated
function j(e,t){for(var n=0,r=e.length;n<r;n++)Ge.set(e[n],"globalEval",!t||Ge.get(t[n],"globalEval"))}function T(e,t,n,i,o){for(var a,s,u,c,l,f,d=t.createDocumentFragment(),p=[],h=0,g=e.length;h<g;h++)if(a=e[h],a||0===a)
// Add nodes directly
if("object"===r(a))
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
ke.merge(p,a.nodeType?[a]:a);else if(it.test(a)){for(s=s||d.appendChild(t.createElement("div")),
// Deserialize a standard representation
u=(tt.exec(a)||["",""])[1].toLowerCase(),c=rt[u]||rt._default,s.innerHTML=c[1]+ke.htmlPrefilter(a)+c[2],
// Descend through wrappers to the right content
f=c[0];f--;)s=s.lastChild;
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
ke.merge(p,s.childNodes),
// Remember the top-level container
s=d.firstChild,
// Ensure the created nodes are orphaned (#12392)
s.textContent=""}else p.push(t.createTextNode(a));for(
// Remove wrapper from fragment
d.textContent="",h=0;a=p[h++];)
// Skip elements already in the context collection (trac-4087)
if(i&&ke.inArray(a,i)>-1)o&&o.push(a);else
// Capture executables
if(l=Ke(a),
// Append to fragment
s=w(d.appendChild(a),"script"),
// Preserve script evaluation history
l&&j(s),n)for(f=0;a=s[f++];)nt.test(a.type||"")&&n.push(a);return d}function k(){return!0}function C(){return!1}
// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function S(e,t){return e===E()==("focus"===t)}
// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function E(){try{return we.activeElement}catch(e){}}function _(e,t,n,r,i,o){var a,s;
// Types can be a map of types/handlers
if("object"==typeof t){
// ( types-Object, selector, data )
"string"!=typeof n&&(
// ( types-Object, data )
r=r||n,n=void 0);for(s in t)_(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(
// ( types, fn )
i=n,r=n=void 0):null==i&&("string"==typeof n?(
// ( types, selector, fn )
i=r,r=void 0):(
// ( types, data, fn )
i=r,r=n,n=void 0)),i===!1)i=C;else if(!i)return e;
// Use same guid so caller can remove using origFn
return 1===o&&(a=i,i=function(e){
// Can use an empty set, since event contains the info
return ke().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=ke.guid++)),e.each(function(){ke.event.add(this,t,i,r,n)})}
// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function D(e,t,n){
// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
// Register the controller as a special universal handler for all event namespaces
return n?(Ge.set(e,t,!1),void ke.event.add(e,t,{namespace:!1,handler:function(e){var r,i,o=Ge.get(this,t);if(1&e.isTrigger&&this[t]){
// Interrupt processing of the outer synthetic .trigger()ed event
// Saved data should be false in such cases, but might be a leftover capture object
// from an async native handler (gh-4350)
if(o.length)(ke.event.special[t]||{}).delegateType&&e.stopPropagation();else if(
// Store arguments for use when handling the inner native event
// There will always be at least one argument (an event object), so this array
// will not be confused with a leftover capture object.
o=ce.call(arguments),Ge.set(this,t,o),
// Trigger the native event and capture its result
// Support: IE <=9 - 11+
// focus() and blur() are asynchronous
r=n(this,t),this[t](),i=Ge.get(this,t),o!==i||r?Ge.set(this,t,!1):i={},o!==i)
// Cancel the outer synthetic event
return e.stopImmediatePropagation(),e.preventDefault(),i.value}else o.length&&(
// ...and capture the result
Ge.set(this,t,{value:ke.event.trigger(
// Support: IE <=9 - 11+
// Extend with the prototype to reset the above stopImmediatePropagation()
ke.extend(o[0],ke.Event.prototype),o.slice(1),this)}),
// Abort handling of the native event
e.stopImmediatePropagation())}})):void(void 0===Ge.get(e,t)&&ke.event.add(e,t,k))}
// Prefer a tbody over its parent table for containing new rows
function A(e,t){return o(e,"table")&&o(11!==t.nodeType?t:t.firstChild,"tr")?ke(e).children("tbody")[0]||e:e}
// Replace/restore the type attribute of script elements for safe DOM manipulation
function N(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function O(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function q(e,t){var n,r,i,o,a,s,u;if(1===t.nodeType){
// 1. Copy private data: events, handlers, etc.
if(Ge.hasData(e)&&(o=Ge.get(e),u=o.events)){Ge.remove(t,"handle events");for(i in u)for(n=0,r=u[i].length;n<r;n++)ke.event.add(t,i,u[i][n])}
// 2. Copy user data
We.hasData(e)&&(a=We.access(e),s=ke.extend({},a),We.set(t,s))}}
// Fix IE bugs, see support tests
function M(e,t){var n=t.nodeName.toLowerCase();
// Fails to persist the checked state of a cloned checkbox or radio button.
"input"===n&&et.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function R(e,t,r,i){
// Flatten any nested arrays
t=le(t);var o,a,s,u,c,l,f=0,d=e.length,p=d-1,h=t[0],g=be(h);
// We can't cloneNode fragments that contain checked, in WebKit
if(g||d>1&&"string"==typeof h&&!ye.checkClone&&ct.test(h))return e.each(function(n){var o=e.eq(n);g&&(t[0]=h.call(this,n,o.html())),R(o,t,r,i)});if(d&&(o=T(t,e[0].ownerDocument,!1,e,i),a=o.firstChild,1===o.childNodes.length&&(o=a),a||i)){
// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(s=ke.map(w(o,"script"),N),u=s.length;f<d;f++)c=o,f!==p&&(c=ke.clone(c,!0,!0),
// Keep references to cloned scripts for later restoration
u&&
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
ke.merge(s,w(c,"script"))),r.call(e[f],c,f);if(u)
// Evaluate executable scripts on first document insertion
for(l=s[s.length-1].ownerDocument,
// Reenable scripts
ke.map(s,O),f=0;f<u;f++)c=s[f],nt.test(c.type||"")&&!Ge.access(c,"globalEval")&&ke.contains(l,c)&&(c.src&&"module"!==(c.type||"").toLowerCase()?
// Optional AJAX dependency, but won't run scripts if not present
ke._evalUrl&&!c.noModule&&ke._evalUrl(c.src,{nonce:c.nonce||c.getAttribute("nonce")},l):n(c.textContent.replace(lt,""),c,l))}return e}function L(e,t,n){for(var r,i=t?ke.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||ke.cleanData(w(r)),r.parentNode&&(n&&Ke(r)&&j(w(r,"script")),r.parentNode.removeChild(r));return e}function H(e,t,n){var r,i,o,a,
// Support: Firefox 51+
// Retrieving style before computed somehow
// fixes an issue with getting wrong values
// on detached elements
s=e.style;
// getPropertyValue is needed for:
//   .css('filter') (IE 9 only, #12537)
//   .css('--customProperty) (#3144)
// A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// https://drafts.csswg.org/cssom/#resolved-values
// Remember the original values
// Put in the new values to get a computed value out
// Revert the changed values
// Support: IE <=9 - 11 only
// IE returns zIndex value as an integer.
return n=n||dt(e),n&&(a=n.getPropertyValue(t)||n[t],""!==a||Ke(e)||(a=ke.style(e,t)),!ye.pixelBoxStyles()&&ft.test(a)&&ht.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function I(e,t){
// Define the hook, we'll check on the first run if it's really needed.
return{get:function(){
// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}
// Return a vendor-prefixed property or undefined
function P(e){for(
// Check for vendor prefixed names
var t=e[0].toUpperCase()+e.slice(1),n=gt.length;n--;)if(e=gt[n]+t,e in mt)return e}
// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function B(e){var t=ke.cssProps[e]||vt[e];return t?t:e in mt?e:vt[e]=P(e)||e}function F(e,t,n){
// Any relative (+/-) values have already been
// normalized at this point
var r=ze.exec(t);
// Guard against undefined "subtract", e.g., when used as in cssHooks
return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function G(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;
// Adjustment may not be necessary
if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)
// Both box models exclude margin
"margin"===n&&(u+=ke.css(e,n+Xe[a],!0,i)),
// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
r?(
// For "content", subtract padding
"content"===n&&(u-=ke.css(e,"padding"+Xe[a],!0,i)),
// For "content" or "padding", subtract border
"margin"!==n&&(u-=ke.css(e,"border"+Xe[a]+"Width",!0,i))):(
// Add padding
u+=ke.css(e,"padding"+Xe[a],!0,i),
// For "border" or "margin", add border
"padding"!==n?u+=ke.css(e,"border"+Xe[a]+"Width",!0,i):s+=ke.css(e,"border"+Xe[a]+"Width",!0,i));
// Account for positive content-box scroll gutter when requested by providing computedVal
// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
// Assuming integer scroll gutter, subtract the rest and round down
return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function W(e,t,n){
// Start with computed style
var r=dt(e),
// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
// Fake content-box until we know it's needed to know the true value.
i=!ye.boxSizingReliable()||n,a=i&&"border-box"===ke.css(e,"boxSizing",!1,r),s=a,u=H(e,t,r),c="offset"+t[0].toUpperCase()+t.slice(1);
// Support: Firefox <=54
// Return a confounding non-pixel value or feign ignorance, as appropriate.
if(ft.test(u)){if(!n)return u;u="auto"}
// Adjust for the element's box model
// Support: IE 9 - 11 only
// Use offsetWidth/offsetHeight for when box sizing is unreliable.
// In those cases, the computed value can be trusted to be border-box.
// Support: IE 10 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Interestingly, in some cases IE 9 doesn't suffer from this issue.
// Fall back to offsetWidth/offsetHeight when value is "auto"
// This happens for inline elements with no explicit setting (gh-3571)
// Support: Android <=4.1 - 4.3 only
// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
// Make sure the element is visible & connected
// Where available, offsetWidth/offsetHeight approximate border box dimensions.
// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
// retrieved value as a content box dimension.
// Normalize "" and auto
// Provide the current computed size to request scroll gutter calculation (gh-3589)
return(!ye.boxSizingReliable()&&a||!ye.reliableTrDimensions()&&o(e,"tr")||"auto"===u||!parseFloat(u)&&"inline"===ke.css(e,"display",!1,r))&&e.getClientRects().length&&(a="border-box"===ke.css(e,"boxSizing",!1,r),s=c in e,s&&(u=e[c])),u=parseFloat(u)||0,u+G(e,t,n||(a?"border":"content"),s,r,u)+"px"}function U(e,t,n,r,i){return new U.prototype.init(e,t,n,r,i)}function $(){Tt&&(we.hidden===!1&&e.requestAnimationFrame?e.requestAnimationFrame($):e.setTimeout($,ke.fx.interval),ke.fx.tick())}
// Animations created synchronously will run synchronously
function V(){return e.setTimeout(function(){jt=void 0}),jt=Date.now()}
// Generate parameters to create a standard animation
function z(e,t){var n,r=0,i={height:e};for(
// If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
t=t?1:0;r<4;r+=2-t)n=Xe[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function X(e,t,n){for(var r,i=(Q.tweeners[t]||[]).concat(Q.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))
// We're done with this property
return r}function Y(e,t,n){var r,i,o,a,s,u,c,l,f="width"in t||"height"in t,d=this,p={},h=e.style,g=e.nodeType&&Je(e),m=Ge.get(e,"fxshow");
// Queue-skipping animations hijack the fx hooks
n.queue||(a=ke._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,d.always(function(){
// Ensure the complete handler is called before this completes
d.always(function(){a.unqueued--,ke.queue(e,"fx").length||a.empty.fire()})}));
// Detect show/hide animations
for(r in t)if(i=t[r],kt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){
// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if("show"!==i||!m||void 0===m[r])continue;g=!0}p[r]=m&&m[r]||ke.style(e,r)}if(
// Bail out if this is a no-op like .hide().hide()
u=!ke.isEmptyObject(t),u||!ke.isEmptyObject(p)){
// Restrict "overflow" and "display" styles during box animations
f&&1===e.nodeType&&(
// Support: IE <=9 - 11, Edge 12 - 15
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY and Edge just mirrors
// the overflowX value there.
n.overflow=[h.overflow,h.overflowX,h.overflowY],
// Identify a display type, preferring old show/hide data over the CSS cascade
c=m&&m.display,null==c&&(c=Ge.get(e,"display")),l=ke.css(e,"display"),"none"===l&&(c?l=c:(
// Get nonempty value(s) by temporarily forcing visibility
x([e],!0),c=e.style.display||c,l=ke.css(e,"display"),x([e]))),
// Animate inline elements as inline-block
("inline"===l||"inline-block"===l&&null!=c)&&"none"===ke.css(e,"float")&&(
// Restore the original display value at the end of pure show/hide animations
u||(d.done(function(){h.display=c}),null==c&&(l=h.display,c="none"===l?"":l)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",d.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),
// Implement show/hide animations
u=!1;for(r in p)
// General show/hide setup for this element animation
u||(m?"hidden"in m&&(g=m.hidden):m=Ge.access(e,"fxshow",{display:c}),
// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
o&&(m.hidden=!g),
// Show elements before animating them
g&&x([e],!0),/* eslint-disable no-loop-func */
d.done(function(){/* eslint-enable no-loop-func */
// The final step of a "hide" animation is actually hiding the element
g||x([e]),Ge.remove(e,"fxshow");for(r in p)ke.style(e,r,p[r])})),
// Per-property setup
u=X(g?m[r]:0,r,d),r in m||(m[r]=u.start,g&&(u.end=u.start,u.start=0))}}function K(e,t){var n,r,i,o,a;
// camelCase, specialEasing and expand cssHook pass
for(n in e)if(r=h(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=ke.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];
// Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function Q(e,t,n){var r,i,o=0,a=Q.prefilters.length,s=ke.Deferred().always(function(){
// Don't match elem in the :animated selector
delete u.elem}),u=function(){if(i)return!1;for(var t=jt||V(),n=Math.max(0,c.startTime+c.duration-t),
// Support: Android 2.3 only
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
r=n/c.duration||0,o=1-r,a=0,u=c.tweens.length;a<u;a++)c.tweens[a].run(o);
// If there's more to do, yield
// If there's more to do, yield
// If this was an empty animation, synthesize a final progress notification
// Resolve the animation and report its conclusion
return s.notifyWith(e,[c,o,n]),o<1&&u?n:(u||s.notifyWith(e,[c,1,0]),s.resolveWith(e,[c]),!1)},c=s.promise({elem:e,props:ke.extend({},t),opts:ke.extend(!0,{specialEasing:{},easing:ke.easing._default},n),originalProperties:t,originalOptions:n,startTime:jt||V(),duration:n.duration,tweens:[],createTween:function(t,n){var r=ke.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(r),r},stop:function(t){var n=0,
// If we are going to the end, we want to run all the tweens
// otherwise we skip this part
r=t?c.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)c.tweens[n].run(1);
// Resolve when we played the last frame; otherwise, reject
return t?(s.notifyWith(e,[c,1,0]),s.resolveWith(e,[c,t])):s.rejectWith(e,[c,t]),this}}),l=c.props;for(K(l,c.opts.specialEasing);o<a;o++)if(r=Q.prefilters[o].call(c,e,l,c.opts))return be(r.stop)&&(ke._queueHooks(c.elem,c.opts.queue).stop=r.stop.bind(r)),r;
// Attach callbacks from options
return ke.map(l,X,c),be(c.opts.start)&&c.opts.start.call(e,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),ke.fx.timer(ke.extend(u,{elem:e,anim:c,queue:c.opts.queue})),c}
// Strip and collapse whitespace according to HTML spec
// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
function J(e){var t=e.match(Re)||[];return t.join(" ")}function Z(e){return e.getAttribute&&e.getAttribute("class")||""}function ee(e){return Array.isArray(e)?e:"string"==typeof e?e.match(Re)||[]:[]}function te(e,t,n,i){var o;if(Array.isArray(t))
// Serialize array item.
ke.each(t,function(t,r){n||Lt.test(e)?
// Treat each array item as a scalar.
i(e,r):
// Item is non-scalar (array or object), encode its numeric index.
te(e+"["+("object"==typeof r&&null!=r?t:"")+"]",r,n,i)});else if(n||"object"!==r(t))
// Serialize scalar item.
i(e,t);else
// Serialize object item.
for(o in t)te(e+"["+o+"]",t[o],n,i)}
// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function ne(e){
// dataTypeExpression is optional and defaults to "*"
return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(Re)||[];if(be(n))
// For each dataType in the dataTypeExpression
for(;r=o[i++];)
// Prepend if requested
"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}
// Base inspection function for prefilters and transports
function re(e,t,n,r){function i(s){var u;return o[s]=!0,ke.each(e[s]||[],function(e,s){var c=s(t,n,r);return"string"!=typeof c||a||o[c]?a?!(u=c):void 0:(t.dataTypes.unshift(c),i(c),!1)}),u}var o={},a=e===Xt;return i(t.dataTypes[0])||!o["*"]&&i("*")}
// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ie(e,t){var n,r,i=ke.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&ke.extend(!0,e,r),e}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function oe(e,t,n){
// Remove auto dataType and get content-type in the process
for(var r,i,o,a,s=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));
// Check if we're dealing with a known content-type
if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}
// Check to see if we have a response for the expected dataType
if(u[0]in n)o=u[0];else{
// Try convertible dataTypes
for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}
// Or just use first one
o=o||a}
// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(o)return o!==u[0]&&u.unshift(o),n[o]}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ae(e,t,n,r){var i,o,a,s,u,c={},
// Work with a copy of dataTypes in case we need to modify it for conversion
l=e.dataTypes.slice();
// Create converters map with lowercased keys
if(l[1])for(a in e.converters)c[a.toLowerCase()]=e.converters[a];
// Convert to each sequential dataType
for(o=l.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),
// Apply the dataFilter if provided
!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=l.shift())
// There's only work to do if current dataType is non-auto
if("*"===o)o=u;else if("*"!==u&&u!==o){
// If none found, seek a pair
if(
// Seek a direct converter
a=c[u+" "+o]||c["* "+o],!a)for(i in c)if(
// If conv2 outputs current
s=i.split(" "),s[1]===o&&(
// If prev can be converted to accepted input
a=c[u+" "+s[0]]||c["* "+s[0]])){
// Condense equivalence converters
a===!0?a=c[i]:c[i]!==!0&&(o=s[0],l.unshift(s[1]));break}
// Apply converter (if not an equivalence)
if(a!==!0)
// Unless errors are allowed to bubble, catch and return them
if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(f){return{state:"parsererror",error:a?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}var se=[],ue=Object.getPrototypeOf,ce=se.slice,le=se.flat?function(e){return se.flat.call(e)}:function(e){return se.concat.apply([],e)},fe=se.push,de=se.indexOf,pe={},he=pe.toString,ge=pe.hasOwnProperty,me=ge.toString,ve=me.call(Object),ye={},be=function(e){
// Support: Chrome <=57, Firefox <=52
// In some browsers, typeof returns "function" for HTML <object> elements
// (i.e., `typeof document.createElement( "object" ) === "function"`).
// We don't want to classify *any* DOM node as a function.
return"function"==typeof e&&"number"!=typeof e.nodeType},xe=function(e){return null!=e&&e===e.window},we=e.document,je={type:!0,src:!0,nonce:!0,noModule:!0},Te="3.5.1",
// Define a local copy of jQuery
ke=function(e,t){
// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new ke.fn.init(e,t)};ke.fn=ke.prototype={
// The current version of jQuery being used
jquery:Te,constructor:ke,
// The default length of a jQuery object is 0
length:0,toArray:function(){return ce.call(this)},
// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function(e){
// Return all the elements in a clean array
// Return all the elements in a clean array
return null==e?ce.call(this):e<0?this[e+this.length]:this[e]},
// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function(e){
// Build a new jQuery matched element set
var t=ke.merge(this.constructor(),e);
// Return the newly-formed element set
// Add the old object onto the stack (as a reference)
return t.prevObject=this,t},
// Execute a callback for every element in the matched set.
each:function(e){return ke.each(this,e)},map:function(e){return this.pushStack(ke.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(ce.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(ke.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(ke.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},
// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:fe,sort:se.sort,splice:se.splice},ke.extend=ke.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,c=!1;for(
// Handle a deep copy situation
"boolean"==typeof a&&(c=a,
// Skip the boolean and the target
a=arguments[s]||{},s++),
// Handle case when target is a string or something (possible in deep copy)
"object"==typeof a||be(a)||(a={}),
// Extend jQuery itself if only one argument is passed
s===u&&(a=this,s--);s<u;s++)
// Only deal with non-null/undefined values
if(null!=(e=arguments[s]))
// Extend the base object
for(t in e)r=e[t],
// Prevent Object.prototype pollution
// Prevent never-ending loop
"__proto__"!==t&&a!==r&&(
// Recurse if we're merging plain objects or arrays
c&&r&&(ke.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],
// Ensure proper type for the source value
o=i&&!Array.isArray(n)?[]:i||ke.isPlainObject(n)?n:{},i=!1,
// Never move original objects, clone them
a[t]=ke.extend(c,o,r)):void 0!==r&&(a[t]=r));
// Return the modified object
return a},ke.extend({
// Unique for each copy of jQuery on the page
expando:"jQuery"+(Te+Math.random()).replace(/\D/g,""),
// Assume jQuery is ready without the ready module
isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;
// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
// Objects with no prototype (e.g., `Object.create( null )`) are plain
// Objects with prototype are plain iff they were constructed by a global Object function
return!(!e||"[object Object]"!==he.call(e))&&(!(t=ue(e))||(n=ge.call(t,"constructor")&&t.constructor,"function"==typeof n&&me.call(n)===ve))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},
// Evaluates a script in a provided context; falls back to the global one
// if not specified.
globalEval:function(e,t,r){n(e,{nonce:t&&t.nonce},r)},each:function(e,t){var n,r=0;if(i(e))for(n=e.length;r<n&&t.call(e[r],r,e[r])!==!1;r++);else for(r in e)if(t.call(e[r],r,e[r])===!1)break;return e},
// results is for internal usage only
makeArray:function(e,t){var n=t||[];return null!=e&&(i(Object(e))?ke.merge(n,"string"==typeof e?[e]:e):fe.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:de.call(t,e,n)},
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){
// Go through the array, only saving the items
// that pass the validator function
for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)r=!t(e[o],o),r!==s&&i.push(e[o]);return i},
// arg is for internal usage only
map:function(e,t,n){var r,o,a=0,s=[];
// Go through the array, translating each of the items to their new values
if(i(e))for(r=e.length;a<r;a++)o=t(e[a],a,n),null!=o&&s.push(o);else for(a in e)o=t(e[a],a,n),null!=o&&s.push(o);
// Flatten any nested arrays
return le(s)},
// A global GUID counter for objects
guid:1,
// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:ye}),"function"==typeof Symbol&&(ke.fn[Symbol.iterator]=se[Symbol.iterator]),
// Populate the class2type map
ke.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){pe["[object "+t+"]"]=t.toLowerCase()});var Ce=/*!
 * Sizzle CSS Selector Engine v2.3.5
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2020-03-14
 */
function(e){function t(e,t,n,r){var i,o,a,s,u,c,l,d=t&&t.ownerDocument,
// nodeType defaults to 9, since context defaults to document
h=t?t.nodeType:9;
// Return early from calls with invalid selector or context
if(n=n||[],"string"!=typeof e||!e||1!==h&&9!==h&&11!==h)return n;
// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!r&&(O(t),t=t||q,R)){
// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(11!==h&&(u=be.exec(e)))
// ID selector
if(i=u[1]){
// Document context
if(9===h){if(!(a=t.getElementById(i)))return n;
// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(a.id===i)return n.push(a),n}else
// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(d&&(a=d.getElementById(i))&&P(t,a)&&a.id===i)return n.push(a),n}else{if(u[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((i=u[3])&&j.getElementsByClassName&&t.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(i)),n}
// Take advantage of querySelectorAll
if(j.qsa&&!z[e+" "]&&(!L||!L.test(e))&&(
// Support: IE 8 only
// Exclude object elements
1!==h||"object"!==t.nodeName.toLowerCase())){
// qSA considers elements outside a scoping root when evaluating child or
// descendant combinators, which is not what we want.
// In such cases, we work around the behavior by prefixing every selector in the
// list with an ID selector referencing the scope context.
// The technique has to be used as well when a leading combinator is used
// as such selectors are not recognized by querySelectorAll.
// Thanks to Andrew Dupont for this technique.
if(l=e,d=t,1===h&&(fe.test(e)||le.test(e))){for(
// Expand context for sibling selectors
d=xe.test(e)&&f(t.parentNode)||t,
// We can use :scope instead of the ID hack if the browser
// supports it & if we're not changing the context.
d===t&&j.scope||(
// Capture the context ID, setting it first if necessary
(s=t.getAttribute("id"))?s=s.replace(Te,ke):t.setAttribute("id",s=B)),
// Prefix every selector in the list
c=S(e),o=c.length;o--;)c[o]=(s?"#"+s:":scope")+" "+p(c[o]);l=c.join(",")}try{return Z.apply(n,d.querySelectorAll(l)),n}catch(g){z(e,!0)}finally{s===B&&t.removeAttribute("id")}}}
// All others
return _(e.replace(ue,"$1"),t,n,r)}/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function n(){function e(n,r){
// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
// Only keep the most recent entries
return t.push(n+" ")>T.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function r(e){return e[B]=!0,e}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function i(e){var t=q.createElement("fieldset");try{return!!e(t)}catch(n){return!1}finally{
// Remove from its parent by default
t.parentNode&&t.parentNode.removeChild(t),
// release memory in IE
t=null}}/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function o(e,t){for(var n=e.split("|"),r=n.length;r--;)T.attrHandle[n[r]]=t}/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;
// Use IE sourceIndex if available on both nodes
if(r)return r;
// Check if b follows a
if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function c(e){
// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
return function(t){
// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
// Check for inherited disabledness on relevant non-disabled elements:
// * listed form-associated elements in a disabled fieldset
//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
// * option elements in a disabled optgroup
//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
// All such elements have a "form" property.
// Option elements defer to a parent optgroup if present
// Where there is no isDisabled, check manually
/* jshint -W018 */
return"form"in t?t.parentNode&&t.disabled===!1?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&Se(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function l(e){return r(function(t){return t=+t,r(function(n,r){
// Match elements found at the specified indexes
for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function f(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}
// Easy API for creating new setFilters
function d(){}function p(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function h(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=W++;
// Check against closest ancestor/preceding element
// Check against all ancestor/preceding elements
return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var c,l,f,d=[G,s];
// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(u){for(;t=t[r];)if((1===t.nodeType||a)&&e(t,n,u))return!0}else for(;t=t[r];)if(1===t.nodeType||a)if(f=t[B]||(t[B]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((c=l[o])&&c[0]===G&&c[1]===s)
// Assign to newCache so results back-propagate to previous elements
return d[2]=c[2];
// A match means we're done; a fail means we have to keep checking
if(
// Reuse newcache so results back-propagate to previous elements
l[o]=d,d[2]=e(t,n,u))return!0}return!1}}function g(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(e,n,r){for(var i=0,o=n.length;i<o;i++)t(e,n[i],r);return r}function v(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,c=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),c&&t.push(s)));return a}function y(e,t,n,i,o,a){return i&&!i[B]&&(i=y(i)),o&&!o[B]&&(o=y(o,a)),r(function(r,a,s,u){var c,l,f,d=[],p=[],h=a.length,
// Get initial elements from seed or context
g=r||m(t||"*",s.nodeType?[s]:s,[]),
// Prefilter to get matcher input, preserving a map for seed-results synchronization
y=!e||!r&&t?g:v(g,d,e,s,u),b=n?
// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
o||(r?e:h||i)?
// ...intermediate processing is necessary
[]:
// ...otherwise use results directly
a:y;
// Apply postFilter
if(
// Find primary matches
n&&n(y,b,s,u),i)for(c=v(b,p),i(c,[],s,u),
// Un-match failing elements by moving them back to matcherIn
l=c.length;l--;)(f=c[l])&&(b[p[l]]=!(y[p[l]]=f));if(r){if(o||e){if(o){for(
// Get the final matcherOut by condensing this intermediate into postFinder contexts
c=[],l=b.length;l--;)(f=b[l])&&
// Restore matcherIn since elem is not yet a final match
c.push(y[l]=f);o(null,b=[],c,u)}for(
// Move matched elements from seed to results to keep them synchronized
l=b.length;l--;)(f=b[l])&&(c=o?te(r,f):d[l])>-1&&(r[c]=!(a[c]=f))}}else b=v(b===a?b.splice(h,b.length):b),o?o(null,a,b,u):Z.apply(a,b)})}function b(e){for(var t,n,r,i=e.length,o=T.relative[e[0].type],a=o||T.relative[" "],s=o?1:0,
// The foundational matcher ensures that elements are reachable from top-level context(s)
u=h(function(e){return e===t},a,!0),c=h(function(e){return te(t,e)>-1},a,!0),l=[function(e,n,r){var i=!o&&(r||n!==D)||((t=n).nodeType?u(e,n,r):c(e,n,r));
// Avoid hanging onto element (issue #299)
return t=null,i}];s<i;s++)if(n=T.relative[e[s].type])l=[h(g(l),n)];else{
// Return special upon seeing a positional matcher
if(n=T.filter[e[s].type].apply(null,e[s].matches),n[B]){for(
// Find the next relative operator (if any) for proper handling
r=++s;r<i&&!T.relative[e[r].type];r++);
// If the preceding token was a descendant combinator, insert an implicit any-element `*`
return y(s>1&&g(l),s>1&&p(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(ue,"$1"),n,s<r&&b(e.slice(s,r)),r<i&&b(e=e.slice(r)),r<i&&p(e))}l.push(n)}return g(l)}function x(e,n){var i=n.length>0,o=e.length>0,a=function(r,a,s,u,c){var l,f,d,p=0,h="0",g=r&&[],m=[],y=D,
// We must always have either seed elements or outermost context
b=r||o&&T.find.TAG("*",c),
// Use integer dirruns iff this is the outermost matcher
x=G+=null==y?1:Math.random()||.1,w=b.length;
// Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(c&&(
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
D=a==q||a||c);h!==w&&null!=(l=b[h]);h++){if(o&&l){for(f=0,
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
a||l.ownerDocument==q||(O(l),s=!R);d=e[f++];)if(d(l,a||q,s)){u.push(l);break}c&&(G=x)}
// Track unmatched elements for set filters
i&&(
// They will have gone through all possible matchers
(l=!d&&l)&&p--,
// Lengthen the array for every element, matched or not
r&&g.push(l))}
// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(
// `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
p+=h,i&&h!==p){for(f=0;d=n[f++];)d(g,m,a,s);if(r){
// Reintegrate element matches to eliminate the need for sorting
if(p>0)for(;h--;)g[h]||m[h]||(m[h]=Q.call(u));
// Discard index placeholder values to get only actual matches
m=v(m)}
// Add matches to results
Z.apply(u,m),
// Seedless set matches succeeding multiple successful matchers stipulate sorting
c&&!r&&m.length>0&&p+n.length>1&&t.uniqueSort(u)}
// Override manipulation of globals by nested matchers
return c&&(G=x,D=y),g};return i?r(a):a}var w,j,T,k,C,S,E,_,D,A,N,
// Local document vars
O,q,M,R,L,H,I,P,
// Instance-specific data
B="sizzle"+1*new Date,F=e.document,G=0,W=0,U=n(),$=n(),V=n(),z=n(),X=function(e,t){return e===t&&(N=!0),0},
// Instance methods
Y={}.hasOwnProperty,K=[],Q=K.pop,J=K.push,Z=K.push,ee=K.slice,
// Use a stripped-down indexOf as it's faster than native
// https://jsperf.com/thor-indexof-vs-for/5
te=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},ne="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
// Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
re="[\\x20\\t\\r\\n\\f]",
// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
ie="(?:\\\\[\\da-fA-F]{1,6}"+re+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
oe="\\["+re+"*("+ie+")(?:"+re+
// Operator (capture 2)
"*([*^$|!~]?=)"+re+
// "Attribute values must be CSS identifiers [capture 5]
// or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ie+"))|)"+re+"*\\]",ae=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",
// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
se=new RegExp(re+"+","g"),ue=new RegExp("^"+re+"+|((?:^|[^\\\\])(?:\\\\.)*)"+re+"+$","g"),ce=new RegExp("^"+re+"*,"+re+"*"),le=new RegExp("^"+re+"*([>+~]|"+re+")"+re+"*"),fe=new RegExp(re+"|>"),de=new RegExp(ae),pe=new RegExp("^"+ie+"$"),he={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie+"|[*])"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+ae),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+re+"*(even|odd|(([+-]|)(\\d*)n|)"+re+"*(?:([+-]|)"+re+"*(\\d+)|))"+re+"*\\)|)","i"),bool:new RegExp("^(?:"+ne+")$","i"),
// For use in libraries implementing .is()
// We use this for POS matching in `select`
needsContext:new RegExp("^"+re+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+re+"*((?:-\\d)?\\d*)"+re+"*\\)|)(?=[^-]|$)","i")},ge=/HTML$/i,me=/^(?:input|select|textarea|button)$/i,ve=/^h\d$/i,ye=/^[^{]+\{\s*\[native \w/,
// Easily-parseable/retrievable ID or TAG or CLASS selectors
be=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xe=/[+~]/,
// CSS escapes
// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
we=new RegExp("\\\\[\\da-fA-F]{1,6}"+re+"?|\\\\([^\\r\\n\\f])","g"),je=function(e,t){var n="0x"+e.slice(1)-65536;
// Strip the backslash prefix from a non-hex escape sequence
// Replace a hexadecimal escape sequence with the encoded Unicode code point
// Support: IE <=11+
// For values outside the Basic Multilingual Plane (BMP), manually construct a
// surrogate pair
return t?t:n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320)},
// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
Te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ke=function(e,t){
// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},
// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
Ce=function(){O()},Se=h(function(e){return e.disabled===!0&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});
// Optimize for push.apply( _, NodeList )
try{Z.apply(K=ee.call(F.childNodes),F.childNodes),
// Support: Android<4.0
// Detect silently failing push.apply
// eslint-disable-next-line no-unused-expressions
K[F.childNodes.length].nodeType}catch(Ee){Z={apply:K.length?
// Leverage slice if possible
function(e,t){J.apply(e,ee.call(t))}:
// Support: IE<9
// Otherwise append directly
function(e,t){
// Can't trust NodeList.length
for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}
// Expose support vars for convenience
j=t.support={},/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
C=t.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;
// Support: IE <=8
// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
// https://bugs.jquery.com/ticket/4833
return!ge.test(t||n&&n.nodeName||"HTML")},/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
O=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:F;
// Return early if doc is invalid or already selected
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
// Return early if doc is invalid or already selected
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
// Update global variables
// Support: IE 9 - 11+, Edge 12 - 18+
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
// Support: IE 11, Edge
// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
// Safari 4 - 5 only, Opera <=11.6 - 12.x only
// IE/Edge & older browsers don't support the :scope pseudo-class.
// Support: Safari 6.0 only
// Safari 6.0 supports :scope but it's an alias of :root there.
/* Attributes
	---------------------------------------------------------------------- */
// Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
/* getElement(s)By*
	---------------------------------------------------------------------- */
// Check if getElementsByTagName("*") returns only elements
// Support: IE<9
// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set names,
// so use a roundabout getElementsByName test
// ID filter and find
// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
// Tag
// Class
/* QSA/matchesSelector
	---------------------------------------------------------------------- */
// QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See https://bugs.jquery.com/ticket/13378
// Build QSA regex
// Regex strategy adopted from Diego Perini
/* Contains
	---------------------------------------------------------------------- */
// Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
/* Sorting
	---------------------------------------------------------------------- */
// Document order sorting
return r!=q&&9===r.nodeType&&r.documentElement?(q=r,M=q.documentElement,R=!C(q),F!=q&&(n=q.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Ce,!1):n.attachEvent&&n.attachEvent("onunload",Ce)),j.scope=i(function(e){return M.appendChild(e).appendChild(q.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),j.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),j.getElementsByTagName=i(function(e){return e.appendChild(q.createComment("")),!e.getElementsByTagName("*").length}),j.getElementsByClassName=ye.test(q.getElementsByClassName),j.getById=i(function(e){return M.appendChild(e).id=B,!q.getElementsByName||!q.getElementsByName(B).length}),j.getById?(T.filter.ID=function(e){var t=e.replace(we,je);return function(e){return e.getAttribute("id")===t}},T.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&R){var n=t.getElementById(e);return n?[n]:[]}}):(T.filter.ID=function(e){var t=e.replace(we,je);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},T.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&R){var n,r,i,o=t.getElementById(e);if(o){if(
// Verify the id attribute
n=o.getAttributeNode("id"),n&&n.value===e)return[o];for(
// Fall back on getElementsByName
i=t.getElementsByName(e),r=0;o=i[r++];)if(n=o.getAttributeNode("id"),n&&n.value===e)return[o]}return[]}}),T.find.TAG=j.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):j.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,
// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
o=t.getElementsByTagName(e);
// Filter out possible comments
if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},T.find.CLASS=j.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&R)return t.getElementsByClassName(e)},H=[],L=[],(j.qsa=ye.test(q.querySelectorAll))&&(i(function(e){var t;
// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// https://bugs.jquery.com/ticket/12359
M.appendChild(e).innerHTML="<a id='"+B+"'></a><select id='"+B+"-\r\\' msallowcapture=''><option selected=''></option></select>",
// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
e.querySelectorAll("[msallowcapture^='']").length&&L.push("[*^$]="+re+"*(?:''|\"\")"),
// Support: IE8
// Boolean attributes and "value" are not treated correctly
e.querySelectorAll("[selected]").length||L.push("\\["+re+"*(?:value|"+ne+")"),
// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
e.querySelectorAll("[id~="+B+"-]").length||L.push("~="),
// Support: IE 11+, Edge 15 - 18+
// IE 11/Edge don't find elements on a `[name='']` query in some cases.
// Adding a temporary attribute to the document before the selection works
// around the issue.
// Interestingly, IE 10 & older don't seem to have the issue.
t=q.createElement("input"),t.setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||L.push("\\["+re+"*name"+re+"*="+re+"*(?:''|\"\")"),
// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
e.querySelectorAll(":checked").length||L.push(":checked"),
// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails
e.querySelectorAll("a#"+B+"+*").length||L.push(".#.+[+~]"),
// Support: Firefox <=3.6 - 5 only
// Old Firefox doesn't throw on a badly-escaped identifier.
e.querySelectorAll("\\\f"),L.push("[\\r\\n\\f]")}),i(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var t=q.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),
// Support: IE8
// Enforce case-sensitivity of name attribute
e.querySelectorAll("[name=d]").length&&L.push("name"+re+"*[*^$|!~]?="),
// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
2!==e.querySelectorAll(":enabled").length&&L.push(":enabled",":disabled"),
// Support: IE9-11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
M.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&L.push(":enabled",":disabled"),
// Support: Opera 10 - 11 only
// Opera 10-11 does not throw on post-comma invalid pseudos
e.querySelectorAll("*,:x"),L.push(",.*:")})),(j.matchesSelector=ye.test(I=M.matches||M.webkitMatchesSelector||M.mozMatchesSelector||M.oMatchesSelector||M.msMatchesSelector))&&i(function(e){
// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
j.disconnectedMatch=I.call(e,"*"),
// This should fail with an exception
// Gecko does not error, returns false instead
I.call(e,"[s!='']:x"),H.push("!=",ae)}),L=L.length&&new RegExp(L.join("|")),H=H.length&&new RegExp(H.join("|")),t=ye.test(M.compareDocumentPosition),P=t||ye.test(M.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},X=t?function(e,t){
// Flag for duplicate removal
if(e===t)return N=!0,0;
// Sort on method existence if only one input has compareDocumentPosition
var n=!e.compareDocumentPosition-!t.compareDocumentPosition;
// Calculate position if both inputs belong to the same document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
// Otherwise we know they are disconnected
// Disconnected nodes
// Choose the first element that is related to our preferred document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
return n?n:(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!j.sortDetached&&t.compareDocumentPosition(e)===n?e==q||e.ownerDocument==F&&P(F,e)?-1:t==q||t.ownerDocument==F&&P(F,t)?1:A?te(A,e)-te(A,t):0:4&n?-1:1)}:function(e,t){
// Exit early if the nodes are identical
if(e===t)return N=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,s=[e],u=[t];
// Parentless nodes are either documents or disconnected
if(!i||!o)
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
/* eslint-disable eqeqeq */
/* eslint-enable eqeqeq */
return e==q?-1:t==q?1:i?-1:o?1:A?te(A,e)-te(A,t):0;if(i===o)return a(e,t);for(
// Otherwise we need full lists of their ancestors for comparison
n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);
// Walk down the tree looking for a discrepancy
for(;s[r]===u[r];)r++;
// Do a sibling check if the nodes have a common ancestor
// Otherwise nodes in our document sort first
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
/* eslint-disable eqeqeq */
/* eslint-enable eqeqeq */
return r?a(s[r],u[r]):s[r]==F?-1:u[r]==F?1:0},q):q},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if(O(e),j.matchesSelector&&R&&!z[n+" "]&&(!H||!H.test(n))&&(!L||!L.test(n)))try{var r=I.call(e,n);
// IE 9's matchesSelector returns false on disconnected nodes
if(r||j.disconnectedMatch||
// As well, disconnected nodes are said to be in a document
// fragment in IE 9
e.document&&11!==e.document.nodeType)return r}catch(i){z(n,!0)}return t(n,q,null,[e]).length>0},t.contains=function(e,t){
// Set document vars if needed
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
return(e.ownerDocument||e)!=q&&O(e),P(e,t)},t.attr=function(e,t){
// Set document vars if needed
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
(e.ownerDocument||e)!=q&&O(e);var n=T.attrHandle[t.toLowerCase()],
// Don't get fooled by Object.prototype properties (jQuery #13807)
r=n&&Y.call(T.attrHandle,t.toLowerCase())?n(e,t,!R):void 0;return void 0!==r?r:j.attributes||!R?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.escape=function(e){return(e+"").replace(Te,ke)},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(
// Unless we *know* we can detect duplicates, assume their presence
N=!j.detectDuplicates,A=!j.sortStable&&e.slice(0),e.sort(X),N){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}
// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
return A=null,e},/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
k=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){
// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if("string"==typeof e.textContent)return e.textContent;
// Traverse its children
for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else
// If no nodeType, this is expected to be an array
for(;t=e[r++];)
// Do not traverse comment nodes
n+=k(t);
// Do not include comment or processing instruction nodes
return n},T=t.selectors={
// Can be adjusted by the user
cacheLength:50,createPseudo:r,match:he,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){
// Move the given value to match[3] whether quoted or unquoted
return e[1]=e[1].replace(we,je),e[3]=(e[3]||e[4]||e[5]||"").replace(we,je),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
// nth-* requires argument
// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];
// Accept quoted arguments as-is
// Get excess from tokenize (recursively)
// advance to the next closing parenthesis
// excess is a negative index
return he.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&de.test(n)&&(t=S(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(we,je).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=U[e+" "];return t||(t=new RegExp("(^|"+re+")"+e+"("+re+"|$)"))&&U(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:!n||(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(se," ")+" ").indexOf(r)>-1:"|="===n&&(o===r||o.slice(0,r.length+1)===r+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;
// Shortcut for :nth-*(n)
return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var c,l,f,d,p,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,v=s&&t.nodeName.toLowerCase(),y=!u&&!s,b=!1;if(m){
// :(first|last|only)-(child|of-type)
if(o){for(;g;){for(d=t;d=d[g];)if(s?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;
// Reverse direction for :only-* (if we haven't yet done so)
h=g="only"===e&&!h&&"nextSibling"}return!0}
// non-xml :nth-child(...) stores cache data on `parent`
if(h=[a?m.firstChild:m.lastChild],a&&y){for(
// Seek `elem` from a previously-cached index
// ...in a gzip-friendly way
d=m,f=d[B]||(d[B]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[d.uniqueID]||(f[d.uniqueID]={}),c=l[e]||[],p=c[0]===G&&c[1],b=p&&c[2],d=p&&m.childNodes[p];d=++p&&d&&d[g]||(
// Fallback to seeking `elem` from the start
b=p=0)||h.pop();)
// When found, cache indexes on `parent` and break
if(1===d.nodeType&&++b&&d===t){l[e]=[G,p,b];break}}else
// xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(
// Use previously-cached element index if available
y&&(
// ...in a gzip-friendly way
d=t,f=d[B]||(d[B]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[d.uniqueID]||(f[d.uniqueID]={}),c=l[e]||[],p=c[0]===G&&c[1],b=p),b===!1)
// Use the same loop as above to seek `elem` from the start
for(;(d=++p&&d&&d[g]||(b=p=0)||h.pop())&&((s?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++b||(
// Cache the index of each encountered element
y&&(f=d[B]||(d[B]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[d.uniqueID]||(f[d.uniqueID]={}),l[e]=[G,b]),d!==t)););
// Incorporate the offset, then check against cycle size
return b-=i,b===r||b%r===0&&b/r>=0}}},PSEUDO:function(e,n){
// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var i,o=T.pseudos[e]||T.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// But maintain support for old signatures
return o[B]?o(n):o.length>1?(i=[e,e,"",n],T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=te(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{
// Potentially complex pseudos
not:r(function(e){
// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var t=[],n=[],i=E(e.replace(ue,"$1"));return i[B]?r(function(e,t,n,r){
// Match elements unmatched by `matcher`
for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){
// Don't keep the element (issue #299)
return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(we,je),function(t){return(t.textContent||k(t)).indexOf(e)>-1}}),
// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
lang:r(function(e){
// lang value must be a valid identifier
return pe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(we,je).toLowerCase(),function(t){var n;do if(n=R?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),
// Miscellaneous
target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===M},focus:function(e){return e===q.activeElement&&(!q.hasFocus||q.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},
// Boolean properties
enabled:c(!1),disabled:c(!0),checked:function(e){
// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){
// Accessing this property makes selected-by-default
// options in Safari work properly
// eslint-disable-next-line no-unused-expressions
return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},
// Contents
empty:function(e){
// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},
// Element/input types
header:function(e){return ve.test(e.nodeName)},input:function(e){return me.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;
// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},
// Position-in-collection
first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[n<0?n+t:n]}),even:l(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var r=n<0?n+t:n>t?t:n;--r>=0;)e.push(r);return e}),gt:l(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;
// Add button/input type pseudos
for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[w]=s(w);for(w in{submit:!0,reset:!0})T.pseudos[w]=u(w);/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
// One-time assignments
// Sort stability
// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
// Initialize against the default document
// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
// Support: IE<9
// Use defaultValue in place of getAttribute("value")
// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
return d.prototype=T.filters=T.pseudos,T.setFilters=new d,S=t.tokenize=function(e,n){var r,i,o,a,s,u,c,l=$[e+" "];if(l)return n?0:l.slice(0);for(s=e,u=[],c=T.preFilter;s;){
// Comma and first run
r&&!(i=ce.exec(s))||(i&&(
// Don't consume trailing commas as valid
s=s.slice(i[0].length)||s),u.push(o=[])),r=!1,
// Combinators
(i=le.exec(s))&&(r=i.shift(),o.push({value:r,
// Cast descendant combinators to space
type:i[0].replace(ue," ")}),s=s.slice(r.length));
// Filters
for(a in T.filter)!(i=he[a].exec(s))||c[a]&&!(i=c[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}
// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
// Cache the tokens
return n?s.length:s?t.error(e):$(e,u).slice(0)},E=t.compile=function(e,t){var n,r=[],i=[],o=V[e+" "];if(!o){for(
// Generate a function of recursive functions that can be used to check each element
t||(t=S(e)),n=t.length;n--;)o=b(t[n]),o[B]?r.push(o):i.push(o);
// Cache the compiled function
o=V(e,x(i,r)),
// Save selector and tokenization
o.selector=e}return o},_=t.select=function(e,t,n,r){var i,o,a,s,u,c="function"==typeof e&&e,l=!r&&S(e=c.selector||e);
// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(n=n||[],1===l.length){if(
// Reduce context if the leading compound selector is an ID
o=l[0]=l[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&R&&T.relative[o[1].type]){if(t=(T.find.ID(a.matches[0].replace(we,je),t)||[])[0],!t)return n;c&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(
// Fetch a seed set for right-to-left matching
i=he.needsContext.test(e)?0:o.length;i--&&(a=o[i],!T.relative[s=a.type]);)if((u=T.find[s])&&(r=u(a.matches[0].replace(we,je),xe.test(o[0].type)&&f(t.parentNode)||t))){if(
// If seed is empty or no tokens remain, we can return early
o.splice(i,1),e=r.length&&p(o),!e)return Z.apply(n,r),n;break}}
// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
return(c||E(e,l))(r,t,!R,n,!t||xe.test(e)&&f(t.parentNode)||t),n},j.sortStable=B.split("").sort(X).join("")===B,j.detectDuplicates=!!N,O(),j.sortDetached=i(function(e){
// Should return 1, but returns 4 (following)
return 1&e.compareDocumentPosition(q.createElement("fieldset"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),j.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(ne,function(e,t,n){var r;if(!n)return e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);ke.find=Ce,ke.expr=Ce.selectors,
// Deprecated
ke.expr[":"]=ke.expr.pseudos,ke.uniqueSort=ke.unique=Ce.uniqueSort,ke.text=Ce.getText,ke.isXMLDoc=Ce.isXML,ke.contains=Ce.contains,ke.escapeSelector=Ce.escape;var Se=function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&ke(e).is(n))break;r.push(e)}return r},Ee=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},_e=ke.expr.match.needsContext,De=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;ke.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ke.find.matchesSelector(r,e)?[r]:[]:ke.find.matches(e,ke.grep(t,function(e){return 1===e.nodeType}))},ke.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(ke(e).filter(function(){for(t=0;t<r;t++)if(ke.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)ke.find(e,i[t],n);return r>1?ke.uniqueSort(n):n},filter:function(e){return this.pushStack(a(this,e||[],!1))},not:function(e){return this.pushStack(a(this,e||[],!0))},is:function(e){
// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
return!!a(this,"string"==typeof e&&_e.test(e)?ke(e):e||[],!1).length}});
// Initialize a jQuery object
// A central reference to the root jQuery(document)
var Ae,
// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
// Shortcut simple #id case for speed
Ne=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,Oe=ke.fn.init=function(e,t,n){var r,i;
// HANDLE: $(""), $(null), $(undefined), $(false)
if(!e)return this;
// Handle HTML strings
if(
// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
n=n||Ae,"string"==typeof e){
// Match html or make sure no context is specified for #id
if(
// Assume that strings that start and end with <> are HTML and skip the regex check
r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:Ne.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);
// HANDLE: $(html) -> $(array)
if(r[1]){
// HANDLE: $(html, props)
if(t=t instanceof ke?t[0]:t,
// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
ke.merge(this,ke.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:we,!0)),De.test(r[1])&&ke.isPlainObject(t))for(r in t)
// Properties of context are called as methods if possible
be(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}
// Inject the element directly into the jQuery object
return i=we.getElementById(r[2]),i&&(this[0]=i,this.length=1),this}
// Execute immediately if ready is not present
return e.nodeType?(this[0]=e,this.length=1,this):be(e)?void 0!==n.ready?n.ready(e):e(ke):ke.makeArray(e,this)};
// Give the init function the jQuery prototype for later instantiation
Oe.prototype=ke.fn,
// Initialize central reference
Ae=ke(we);var qe=/^(?:parents|prev(?:Until|All))/,
// Methods guaranteed to produce a unique set when starting from a unique set
Me={children:!0,contents:!0,next:!0,prev:!0};ke.fn.extend({has:function(e){var t=ke(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(ke.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&ke(e);
// Positional selectors never match, since there's no _selection_ context
if(!_e.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)
// Always skip document fragments
if(n.nodeType<11&&(a?a.index(n)>-1:
// Don't pass non-elements to Sizzle
1===n.nodeType&&ke.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?ke.uniqueSort(o):o)},
// Determine the position of an element within the set
index:function(e){
// No argument, return index in parent
// No argument, return index in parent
// Index in selector
// If it receives a jQuery object, the first element is used
return e?"string"==typeof e?de.call(ke(e),this[0]):de.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(ke.uniqueSort(ke.merge(this.get(),ke(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ke.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return Se(e,"parentNode")},parentsUntil:function(e,t,n){return Se(e,"parentNode",n)},next:function(e){return s(e,"nextSibling")},prev:function(e){return s(e,"previousSibling")},nextAll:function(e){return Se(e,"nextSibling")},prevAll:function(e){return Se(e,"previousSibling")},nextUntil:function(e,t,n){return Se(e,"nextSibling",n)},prevUntil:function(e,t,n){return Se(e,"previousSibling",n)},siblings:function(e){return Ee((e.parentNode||{}).firstChild,e)},children:function(e){return Ee(e.firstChild)},contents:function(e){
// Support: IE 11+
// <object> elements with no `data` attribute has an object
// `contentDocument` with a `null` prototype.
// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
// Treat the template element as a regular one in browsers that
// don't support it.
return null!=e.contentDocument&&ue(e.contentDocument)?e.contentDocument:(o(e,"template")&&(e=e.content||e),ke.merge([],e.childNodes))}},function(e,t){ke.fn[e]=function(n,r){var i=ke.map(this,t,n);
// Remove duplicates
// Reverse order for parents* and prev-derivatives
return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=ke.filter(r,i)),this.length>1&&(Me[e]||ke.uniqueSort(i),qe.test(e)&&i.reverse()),this.pushStack(i)}});var Re=/[^\x20\t\r\n\f]+/g;/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
ke.Callbacks=function(e){
// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
e="string"==typeof e?u(e):ke.extend({},e);var// Flag to know if list is currently firing
t,
// Last fire value for non-forgettable lists
n,
// Flag to know if list was already fired
i,
// Flag to prevent firing
o,
// Actual callback list
a=[],
// Queue of execution data for repeatable lists
s=[],
// Index of currently firing callback (modified by add/remove as needed)
c=-1,
// Fire callbacks
l=function(){for(
// Enforce single-firing
o=o||e.once,
// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
i=t=!0;s.length;c=-1)for(n=s.shift();++c<a.length;)
// Run callback and check for early termination
a[c].apply(n[0],n[1])===!1&&e.stopOnFalse&&(
// Jump to end and forget the data so .add doesn't re-fire
c=a.length,n=!1);
// Forget the data if we're done with it
e.memory||(n=!1),t=!1,
// Clean up if we're done firing for good
o&&(
// Keep an empty list if we have data for future add calls
a=n?[]:"")},
// Actual Callbacks object
f={
// Add a callback or a collection of callbacks to the list
add:function(){
// If we have memory from a past run, we should fire after adding
return a&&(n&&!t&&(c=a.length-1,s.push(n)),function i(t){ke.each(t,function(t,n){be(n)?e.unique&&f.has(n)||a.push(n):n&&n.length&&"string"!==r(n)&&
// Inspect recursively
i(n)})}(arguments),n&&!t&&l()),this},
// Remove a callback from the list
remove:function(){return ke.each(arguments,function(e,t){for(var n;(n=ke.inArray(t,a,n))>-1;)a.splice(n,1),
// Handle firing indexes
n<=c&&c--}),this},
// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function(e){return e?ke.inArray(e,a)>-1:a.length>0},
// Remove all callbacks from the list
empty:function(){return a&&(a=[]),this},
// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function(){return o=s=[],a=n="",this},disabled:function(){return!a},
// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function(){return o=s=[],n||t||(a=n=""),this},locked:function(){return!!o},
// Call all callbacks with the given context and arguments
fireWith:function(e,n){return o||(n=n||[],n=[e,n.slice?n.slice():n],s.push(n),t||l()),this},
// Call all the callbacks with the given arguments
fire:function(){return f.fireWith(this,arguments),this},
// To know if the callbacks have already been called at least once
fired:function(){return!!i}};return f},ke.extend({Deferred:function(t){var n=[
// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",ke.Callbacks("memory"),ke.Callbacks("memory"),2],["resolve","done",ke.Callbacks("once memory"),ke.Callbacks("once memory"),0,"resolved"],["reject","fail",ke.Callbacks("once memory"),ke.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},
// Keep pipe for back-compat
pipe:function(){var e=arguments;return ke.Deferred(function(t){ke.each(n,function(n,r){
// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var i=be(e[r[4]])&&e[r[4]];
// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&be(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){function o(t,n,r,i){return function(){var s=this,u=arguments,f=function(){var e,f;
// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(!(t<a)){
// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if(e=r.apply(s,u),e===n.promise())throw new TypeError("Thenable self-resolution");
// Support: Promises/A+ sections 2.3.3.1, 3.5
// https://promisesaplus.com/#point-54
// https://promisesaplus.com/#point-75
// Retrieve `then` only once
f=e&&(
// Support: Promises/A+ section 2.3.4
// https://promisesaplus.com/#point-64
// Only check objects and functions for thenability
"object"==typeof e||"function"==typeof e)&&e.then,
// Handle a returned thenable
be(f)?
// Special processors (notify) just wait for resolution
i?f.call(e,o(a,n,c,i),o(a,n,l,i)):(
// ...and disregard older resolution values
a++,f.call(e,o(a,n,c,i),o(a,n,l,i),o(a,n,c,n.notifyWith))):(
// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
r!==c&&(s=void 0,u=[e]),
// Process the value(s)
// Default process is resolve
(i||n.resolveWith)(s,u))}},
// Only normal processors (resolve) catch and reject exceptions
d=i?f:function(){try{f()}catch(e){ke.Deferred.exceptionHook&&ke.Deferred.exceptionHook(e,d.stackTrace),
// Support: Promises/A+ section 2.3.3.3.4.1
// https://promisesaplus.com/#point-61
// Ignore post-resolution exceptions
t+1>=a&&(
// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
r!==l&&(s=void 0,u=[e]),n.rejectWith(s,u))}};
// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
t?d():(
// Call an optional hook to record the stack, in case of exception
// since it's otherwise lost when execution goes async
ke.Deferred.getStackHook&&(d.stackTrace=ke.Deferred.getStackHook()),e.setTimeout(d))}}var a=0;return ke.Deferred(function(e){
// progress_handlers.add( ... )
n[0][3].add(o(0,e,be(i)?i:c,e.notifyWith)),
// fulfilled_handlers.add( ... )
n[1][3].add(o(0,e,be(t)?t:c)),
// rejected_handlers.add( ... )
n[2][3].add(o(0,e,be(r)?r:l))}).promise()},
// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function(e){return null!=e?ke.extend(e,i):i}},o={};
// All done!
// Add list-specific methods
// Make the deferred a promise
// Call given func if any
return ke.each(n,function(e,t){var a=t[2],s=t[5];
// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
i[t[1]]=a.add,
// Handle state
s&&a.add(function(){
// state = "resolved" (i.e., fulfilled)
// state = "rejected"
r=s},
// rejected_callbacks.disable
// fulfilled_callbacks.disable
n[3-e][2].disable,
// rejected_handlers.disable
// fulfilled_handlers.disable
n[3-e][3].disable,
// progress_callbacks.lock
n[0][2].lock,
// progress_handlers.lock
n[0][3].lock),
// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
a.add(t[3].fire),
// deferred.notify = function() { deferred.notifyWith(...) }
// deferred.resolve = function() { deferred.resolveWith(...) }
// deferred.reject = function() { deferred.rejectWith(...) }
o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},
// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},
// Deferred helper
when:function(e){var
// count of uncompleted subordinates
t=arguments.length,
// count of unprocessed arguments
n=t,
// subordinate fulfillment data
r=Array(n),i=ce.call(arguments),
// the master Deferred
o=ke.Deferred(),
// subordinate callback factory
a=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?ce.call(arguments):n,--t||o.resolveWith(r,i)}};
// Single- and empty arguments are adopted like Promise.resolve
if(t<=1&&(f(e,o.done(a(n)).resolve,o.reject,!t),"pending"===o.state()||be(i[n]&&i[n].then)))return o.then();
// Multiple arguments are aggregated like Promise.all array elements
for(;n--;)f(i[n],a(n),o.reject);return o.promise()}});
// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var Le=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;ke.Deferred.exceptionHook=function(t,n){
// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
e.console&&e.console.warn&&t&&Le.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},ke.readyException=function(t){e.setTimeout(function(){throw t})};
// The deferred used on DOM ready
var He=ke.Deferred();ke.fn.ready=function(e){return He.then(e)["catch"](function(e){ke.readyException(e)}),this},ke.extend({
// Is the DOM ready to be used? Set to true once it occurs.
isReady:!1,
// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,
// Handle when the DOM is ready
ready:function(e){
// Abort if there are pending holds or we're already ready
(e===!0?--ke.readyWait:ke.isReady)||(
// Remember that the DOM is ready
ke.isReady=!0,
// If a normal DOM Ready event fired, decrement, and wait if need be
e!==!0&&--ke.readyWait>0||
// If there are functions bound, to execute
He.resolveWith(we,[ke]))}}),ke.ready.then=He.then,
// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
"complete"===we.readyState||"loading"!==we.readyState&&!we.documentElement.doScroll?
// Handle it asynchronously to allow scripts the opportunity to delay ready
e.setTimeout(ke.ready):(
// Use the handy event callback
we.addEventListener("DOMContentLoaded",d),
// A fallback to window.onload, that will always work
e.addEventListener("load",d));
// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var Ie=function(e,t,n,i,o,a,s){var u=0,c=e.length,l=null==n;
// Sets many values
if("object"===r(n)){o=!0;for(u in n)Ie(e,t,u,n[u],!0,a,s)}else if(void 0!==i&&(o=!0,be(i)||(s=!0),l&&(
// Bulk operations run against the entire set
s?(t.call(e,i),t=null):(l=t,t=function(e,t,n){return l.call(ke(e),n)})),t))for(;u<c;u++)t(e[u],n,s?i:i.call(e[u],u,t(e[u],n)));
// Gets
return o?e:l?t.call(e):c?t(e[0],n):a},Pe=/^-ms-/,Be=/-([a-z])/g,Fe=function(e){
// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return 1===e.nodeType||9===e.nodeType||!+e.nodeType};g.uid=1,g.prototype={cache:function(e){
// Check if the owner object already has a cache
var t=e[this.expando];
// If not, create one
// We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
// If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
return t||(t={},Fe(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);
// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if("string"==typeof t)i[h(t)]=n;else
// Copy the properties one-by-one to the cache object
for(r in t)i[h(r)]=t[r];return i},get:function(e,t){
// Always use camelCase key (gh-2257)
return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][h(t)]},access:function(e,t,n){
// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){
// Support array or space separated string of keys
Array.isArray(t)?
// If key is an array of keys...
// We always set camelCase keys, so remove that.
t=t.map(h):(t=h(t),
// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
t=t in r?[t]:t.match(Re)||[]),n=t.length;for(;n--;)delete r[t[n]]}
// Remove the expando if there's no more data
(void 0===t||ke.isEmptyObject(r))&&(
// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!ke.isEmptyObject(t)}};var Ge=new g,We=new g,Ue=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,$e=/[A-Z]/g;ke.extend({hasData:function(e){return We.hasData(e)||Ge.hasData(e)},data:function(e,t,n){return We.access(e,t,n)},removeData:function(e,t){We.remove(e,t)},
// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function(e,t,n){return Ge.access(e,t,n)},_removeData:function(e,t){Ge.remove(e,t)}}),ke.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;
// Gets all values
if(void 0===e){if(this.length&&(i=We.get(o),1===o.nodeType&&!Ge.get(o,"hasDataAttrs"))){for(n=a.length;n--;)
// Support: IE 11 only
// The attrs elements can be null (#14894)
a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=h(r.slice(5)),v(o,r,i[r])));Ge.set(o,"hasDataAttrs",!0)}return i}
// Sets multiple values
// Sets multiple values
return"object"==typeof e?this.each(function(){We.set(this,e)}):Ie(this,function(t){var n;
// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(o&&void 0===t){if(
// Attempt to get data from the cache
// The key will always be camelCased in Data
n=We.get(o,e),void 0!==n)return n;if(
// Attempt to "discover" the data in
// HTML5 custom data-* attrs
n=v(o,e),void 0!==n)return n}else
// Set the data...
this.each(function(){
// We always store the camelCased key
We.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){We.remove(this,e)})}}),ke.extend({queue:function(e,t,n){var r;if(e)
// Speed up dequeue by getting out quickly if this is just a lookup
return t=(t||"fx")+"queue",r=Ge.get(e,t),n&&(!r||Array.isArray(n)?r=Ge.access(e,t,ke.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=ke.queue(e,t),r=n.length,i=n.shift(),o=ke._queueHooks(e,t),a=function(){ke.dequeue(e,t)};
// If the fx queue is dequeued, always remove the progress sentinel
"inprogress"===i&&(i=n.shift(),r--),i&&(
// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
"fx"===t&&n.unshift("inprogress"),
// Clear up the last queue stop function
delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},
// Not public - generate a queueHooks object, or return the current one
_queueHooks:function(e,t){var n=t+"queueHooks";return Ge.get(e,n)||Ge.access(e,n,{empty:ke.Callbacks("once memory").add(function(){Ge.remove(e,[t+"queue",n])})})}}),ke.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?ke.queue(this[0],e):void 0===t?this:this.each(function(){var n=ke.queue(this,e,t);
// Ensure a hooks for this queue
ke._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&ke.dequeue(this,e)})},dequeue:function(e){return this.each(function(){ke.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},
// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function(e,t){var n,r=1,i=ke.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)n=Ge.get(o[a],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var Ve=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ze=new RegExp("^(?:([+-])=|)("+Ve+")([a-z%]*)$","i"),Xe=["Top","Right","Bottom","Left"],Ye=we.documentElement,Ke=function(e){return ke.contains(e.ownerDocument,e)},Qe={composed:!0};
// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
// Check attachment across shadow DOM boundaries when possible (gh-3504)
// Support: iOS 10.0-10.2 only
// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
// leading to errors. We need to check for `getRootNode`.
Ye.getRootNode&&(Ke=function(e){return ke.contains(e.ownerDocument,e)||e.getRootNode(Qe)===e.ownerDocument});var Je=function(e,t){
// Inline style trumps all
// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
return e=t||e,"none"===e.style.display||""===e.style.display&&Ke(e)&&"none"===ke.css(e,"display")},Ze={};ke.fn.extend({show:function(){return x(this,!0)},hide:function(){return x(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Je(this)?ke(this).show():ke(this).hide()})}});var et=/^(?:checkbox|radio)$/i,tt=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,nt=/^$|^module$|\/(?:java|ecma)script/i;!function(){var e=we.createDocumentFragment(),t=e.appendChild(we.createElement("div")),n=we.createElement("input");
// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),
// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
ye.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,
// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
t.innerHTML="<textarea>x</textarea>",ye.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue,
// Support: IE <=9 only
// IE <=9 replaces <option> tags with their contents when inserted outside of
// the select element.
t.innerHTML="<option></option>",ye.option=!!t.lastChild}();
// We have to close these tags to support XHTML (#13200)
var rt={
// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};rt.tbody=rt.tfoot=rt.colgroup=rt.caption=rt.thead,rt.th=rt.td,
// Support: IE <=9 only
ye.option||(rt.optgroup=rt.option=[1,"<select multiple='multiple'>","</select>"]);var it=/<|&#?\w+;/,ot=/^key/,at=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,st=/^([^.]*)(?:\.(.+)|)/;/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
ke.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,c,l,f,d,p,h,g,m=Ge.get(e);
// Only attach events to objects that accept data
if(Fe(e))for(
// Caller can pass in an object of custom data in lieu of the handler
n.handler&&(o=n,n=o.handler,i=o.selector),
// Ensure that invalid selectors throw exceptions at attach time
// Evaluate against documentElement in case elem is a non-element node (e.g., document)
i&&ke.find.matchesSelector(Ye,i),
// Make sure that the handler has a unique ID, used to find/remove it later
n.guid||(n.guid=ke.guid++),
// Init the element's event structure and main handler, if this is the first
(u=m.events)||(u=m.events=Object.create(null)),(a=m.handle)||(a=m.handle=function(t){
// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return"undefined"!=typeof ke&&ke.event.triggered!==t.type?ke.event.dispatch.apply(e,arguments):void 0}),
// Handle multiple events separated by a space
t=(t||"").match(Re)||[""],c=t.length;c--;)s=st.exec(t[c])||[],p=g=s[1],h=(s[2]||"").split(".").sort(),
// There *must* be a type, no attaching namespace-only handlers
p&&(
// If event changes its type, use the special event handlers for the changed type
f=ke.event.special[p]||{},
// If selector defined, determine special event api type, otherwise given type
p=(i?f.delegateType:f.bindType)||p,
// Update special based on newly reset type
f=ke.event.special[p]||{},
// handleObj is passed to all event handlers
l=ke.extend({type:p,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&ke.expr.match.needsContext.test(i),namespace:h.join(".")},o),
// Init the event handler queue if we're the first
(d=u[p])||(d=u[p]=[],d.delegateCount=0,
// Only use addEventListener if the special events handler returns false
f.setup&&f.setup.call(e,r,h,a)!==!1||e.addEventListener&&e.addEventListener(p,a)),f.add&&(f.add.call(e,l),l.handler.guid||(l.handler.guid=n.guid)),
// Add to the element's handler list, delegates in front
i?d.splice(d.delegateCount++,0,l):d.push(l),
// Keep track of which events have ever been used, for event optimization
ke.event.global[p]=!0)},
// Detach an event or set of events from an element
remove:function(e,t,n,r,i){var o,a,s,u,c,l,f,d,p,h,g,m=Ge.hasData(e)&&Ge.get(e);if(m&&(u=m.events)){for(
// Once for each type.namespace in types; type may be omitted
t=(t||"").match(Re)||[""],c=t.length;c--;)
// Unbind all events (on this namespace, if provided) for the element
if(s=st.exec(t[c])||[],p=g=s[1],h=(s[2]||"").split(".").sort(),p){for(f=ke.event.special[p]||{},p=(r?f.delegateType:f.bindType)||p,d=u[p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),
// Remove matching events
a=o=d.length;o--;)l=d[o],!i&&g!==l.origType||n&&n.guid!==l.guid||s&&!s.test(l.namespace)||r&&r!==l.selector&&("**"!==r||!l.selector)||(d.splice(o,1),l.selector&&d.delegateCount--,f.remove&&f.remove.call(e,l));
// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
a&&!d.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||ke.removeEvent(e,p,m.handle),delete u[p])}else for(p in u)ke.event.remove(e,p+t[c],n,r,!0);
// Remove data and the expando if it's no longer used
ke.isEmptyObject(u)&&Ge.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),
// Make a writable jQuery.Event from the native event object
u=ke.event.fix(e),c=(Ge.get(this,"events")||Object.create(null))[u.type]||[],l=ke.event.special[u.type]||{};for(
// Use the fix-ed jQuery.Event rather than the (read-only) native event
s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];
// Call the preDispatch hook for the mapped type, and let it bail if desired
if(u.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,u)!==!1){for(
// Determine handlers
a=ke.event.handlers.call(this,u,c),
// Run delegates first; they may want to stop propagation beneath us
t=0;(i=a[t++])&&!u.isPropagationStopped();)for(u.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!u.isImmediatePropagationStopped();)
// If the event is namespaced, then each handler is only invoked if it is
// specially universal or its namespaces are a superset of the event's.
u.rnamespace&&o.namespace!==!1&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,r=((ke.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s),void 0!==r&&(u.result=r)===!1&&(u.preventDefault(),u.stopPropagation()));
// Call the postDispatch hook for the mapped type
return l.postDispatch&&l.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,c=e.target;
// Find delegate handlers
if(u&&
// Support: IE <=9
// Black-hole SVG <use> instance trees (trac-13180)
c.nodeType&&
// Support: Firefox <=42
// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
// Support: IE 11 only
// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
!("click"===e.type&&e.button>=1))for(;c!==this;c=c.parentNode||this)
// Don't check non-elements (#13208)
// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(1===c.nodeType&&("click"!==e.type||c.disabled!==!0)){for(o=[],a={},n=0;n<u;n++)r=t[n],
// Don't conflict with Object.prototype properties (#13203)
i=r.selector+" ",void 0===a[i]&&(a[i]=r.needsContext?ke(i,this).index(c)>-1:ke.find(i,this,null,[c]).length),a[i]&&o.push(r);o.length&&s.push({elem:c,handlers:o})}
// Add the remaining (directly-bound) handlers
return c=this,u<t.length&&s.push({elem:c,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(ke.Event.prototype,e,{enumerable:!0,configurable:!0,get:be(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[ke.expando]?e:new ke.Event(e)},special:{load:{
// Prevent triggered image.load events from bubbling to window.load
noBubble:!0},click:{
// Utilize native event to ensure correct state for checkable inputs
setup:function(e){
// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var t=this||e;
// Return false to allow normal processing in the caller
// Claim the first handler
// dataPriv.set( el, "click", ... )
return et.test(t.type)&&t.click&&o(t,"input")&&D(t,"click",k),!1},trigger:function(e){
// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var t=this||e;
// Return non-false to allow normal event-path propagation
// Force setup before triggering a click
return et.test(t.type)&&t.click&&o(t,"input")&&D(t,"click"),!0},
// For cross-browser consistency, suppress native .click() on links
// Also prevent it if we're currently inside a leveraged native-event stack
_default:function(e){var t=e.target;return et.test(t.type)&&t.click&&o(t,"input")&&Ge.get(t,"click")||o(t,"a")}},beforeunload:{postDispatch:function(e){
// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},ke.removeEvent=function(e,t,n){
// This "if" is needed for plain objects
e.removeEventListener&&e.removeEventListener(t,n)},ke.Event=function(e,t){
// Allow instantiation without the 'new' keyword
// Allow instantiation without the 'new' keyword
// Event object
// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
// Support: Android <=2.3 only
// Create target properties
// Support: Safari <=6 - 7 only
// Target should not be a text node (#504, #13143)
// Put explicitly provided properties onto the event object
// Create a timestamp if incoming event doesn't have one
// Mark it as fixed
return this instanceof ke.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?k:C,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&ke.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),void(this[ke.expando]=!0)):new ke.Event(e,t)},
// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
ke.Event.prototype={constructor:ke.Event,isDefaultPrevented:C,isPropagationStopped:C,isImmediatePropagationStopped:C,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=k,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=k,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=k,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},
// Includes all common event props including KeyEvent and MouseEvent specific props
ke.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;
// Add which for key events
// Add which for key events
// Add which for click: 1 === left; 2 === middle; 3 === right
return null==e.which&&ot.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&at.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},ke.event.addProp),ke.each({focus:"focusin",blur:"focusout"},function(e,t){ke.event.special[e]={
// Utilize native event if possible so blur/focus sequence is correct
setup:function(){
// Return false to allow normal processing in the caller
// Claim the first handler
// dataPriv.set( this, "focus", ... )
// dataPriv.set( this, "blur", ... )
return D(this,e,S),!1},trigger:function(){
// Return non-false to allow normal event-path propagation
// Force setup before trigger
return D(this,e),!0},delegateType:t}}),
// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
ke.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){ke.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
// For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
return i&&(i===r||ke.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),ke.fn.extend({on:function(e,t,n,r){return _(this,e,t,n,r)},one:function(e,t,n,r){return _(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)
// ( event )  dispatched jQuery.Event
return r=e.handleObj,ke(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){
// ( types-object [, selector] )
for(i in e)this.off(i,t,e[i]);return this}
// ( types [, fn] )
return t!==!1&&"function"!=typeof t||(n=t,t=void 0),n===!1&&(n=C),this.each(function(){ke.event.remove(this,e,n,t)})}});var
// Support: IE <=10 - 11, Edge 12 - 13 only
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
ut=/<script|<style|<link/i,
// checked="checked" or checked
ct=/checked\s*(?:[^=]|=\s*.checked.)/i,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;ke.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=Ke(e);
// Fix IE cloning issues
if(!(ye.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ke.isXMLDoc(e)))for(
// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
a=w(s),o=w(e),r=0,i=o.length;r<i;r++)M(o[r],a[r]);
// Copy the events from the original to the clone
if(t)if(n)for(o=o||w(e),a=a||w(s),r=0,i=o.length;r<i;r++)q(o[r],a[r]);else q(e,s);
// Return the cloned set
// Preserve script evaluation history
return a=w(s,"script"),a.length>0&&j(a,!u&&w(e,"script")),s},cleanData:function(e){for(var t,n,r,i=ke.event.special,o=0;void 0!==(n=e[o]);o++)if(Fe(n)){if(t=n[Ge.expando]){if(t.events)for(r in t.events)i[r]?ke.event.remove(n,r):ke.removeEvent(n,r,t.handle);
// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
n[Ge.expando]=void 0}n[We.expando]&&(
// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
n[We.expando]=void 0)}}}),ke.fn.extend({detach:function(e){return L(this,e,!0)},remove:function(e){return L(this,e)},text:function(e){return Ie(this,function(e){return void 0===e?ke.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return R(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=A(this,e);t.appendChild(e)}})},prepend:function(){return R(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=A(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return R(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return R(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(
// Prevent memory leaks
ke.cleanData(w(e,!1)),
// Remove any remaining nodes
e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return ke.clone(this,e,t)})},html:function(e){return Ie(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;
// See if we can take a shortcut and just use innerHTML
if("string"==typeof e&&!ut.test(e)&&!rt[(tt.exec(e)||["",""])[1].toLowerCase()]){e=ke.htmlPrefilter(e);try{for(;n<r;n++)t=this[n]||{},
// Remove element nodes and prevent memory leaks
1===t.nodeType&&(ke.cleanData(w(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];
// Make the changes, replacing each non-ignored context element with the new content
return R(this,arguments,function(t){var n=this.parentNode;ke.inArray(this,e)<0&&(ke.cleanData(w(this)),n&&n.replaceChild(t,this))},e)}}),ke.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){ke.fn[e]=function(e){for(var n,r=[],i=ke(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),ke(i[a])[t](n),
// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
fe.apply(r,n.get());return this.pushStack(r)}});var ft=new RegExp("^("+Ve+")(?!px)[a-z%]+$","i"),dt=function(t){
// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},pt=function(e,t,n){var r,i,o={};
// Remember the old values, and insert the new ones
for(i in t)o[i]=e.style[i],e.style[i]=t[i];r=n.call(e);
// Revert the old values
for(i in t)e.style[i]=o[i];return r},ht=new RegExp(Xe.join("|"),"i");!function(){
// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function t(){
// This is a singleton, we need to execute it only once
if(l){c.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",Ye.appendChild(c).appendChild(l);var t=e.getComputedStyle(l);r="1%"!==t.top,
// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
u=12===n(t.marginLeft),
// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
// Some styles come back with percentage values, even though they shouldn't
l.style.right="60%",a=36===n(t.right),
// Support: IE 9 - 11 only
// Detect misreporting of content dimensions for box-sizing:border-box elements
i=36===n(t.width),
// Support: IE 9 only
// Detect overflow:scroll screwiness (gh-3699)
// Support: Chrome <=64
// Don't get tricked when zoom affects offsetWidth (gh-4029)
l.style.position="absolute",o=12===n(l.offsetWidth/3),Ye.removeChild(c),
// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
l=null}}function n(e){return Math.round(parseFloat(e))}var r,i,o,a,s,u,c=we.createElement("div"),l=we.createElement("div");
// Finish early in limited (non-browser) environments
l.style&&(
// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (#8908)
l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",ye.clearCloneStyle="content-box"===l.style.backgroundClip,ke.extend(ye,{boxSizingReliable:function(){return t(),i},pixelBoxStyles:function(){return t(),a},pixelPosition:function(){return t(),r},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),o},
// Support: IE 9 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Behavior in IE 9 is more subtle than in newer versions & it passes
// some versions of this test; make sure not to make it pass there!
reliableTrDimensions:function(){var t,n,r,i;return null==s&&(t=we.createElement("table"),n=we.createElement("tr"),r=we.createElement("div"),t.style.cssText="position:absolute;left:-11111px",n.style.height="1px",r.style.height="9px",Ye.appendChild(t).appendChild(n).appendChild(r),i=e.getComputedStyle(n),s=parseInt(i.height)>3,Ye.removeChild(t)),s}}))}();var gt=["Webkit","Moz","ms"],mt=we.createElement("div").style,vt={},
// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
yt=/^(none|table(?!-c[ea]).+)/,bt=/^--/,xt={position:"absolute",visibility:"hidden",display:"block"},wt={letterSpacing:"0",fontWeight:"400"};ke.extend({
// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function(e,t){if(t){
// We should always get a number back from opacity
var n=H(e,"opacity");return""===n?"1":n}}}},
// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},
// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{},
// Get and set the style property on a DOM Node
style:function(e,t,n,r){
// Don't set styles on text and comment nodes
if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){
// Make sure that we're working with the right name
var i,o,a,s=h(t),u=bt.test(t),c=e.style;
// Check if we're setting a value
// Make sure that we're working with the right name. We don't
// want to query the value if it is a CSS custom property
// since they are user-defined.
// Gets hook for the prefixed version, then unprefixed version
// Check if we're setting a value
// If a hook was provided get the non-computed value from there
// Convert "+=" or "-=" to relative numbers (#7345)
// Fixes bug #9237
// Make sure that null and NaN values aren't set (#7116)
// If a number was passed in, add the unit (except for certain CSS properties)
// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
// "px" to a few hardcoded values.
// background-* props affect original clone's values
// If a hook was provided, use that value, otherwise just set the specified value
return u||(t=B(s)),a=ke.cssHooks[t]||ke.cssHooks[s],void 0===n?a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:c[t]:(o=typeof n,"string"===o&&(i=ze.exec(n))&&i[1]&&(n=y(e,t,i),o="number"),null!=n&&n===n&&("number"!==o||u||(n+=i&&i[3]||(ke.cssNumber[s]?"":"px")),ye.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?c.setProperty(t,n):c[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,a,s=h(t),u=bt.test(t);
// Make numeric if forced or a qualifier was provided and val looks numeric
// Make sure that we're working with the right name. We don't
// want to modify the value if it is a CSS custom property
// since they are user-defined.
// Try prefixed name followed by the unprefixed name
// If a hook was provided get the computed value from there
// Otherwise, if a way to get the computed value exists, use that
// Convert "normal" to computed value
// Make numeric if forced or a qualifier was provided and val looks numeric
return u||(t=B(s)),a=ke.cssHooks[t]||ke.cssHooks[s],a&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=H(e,t,r)),"normal"===i&&t in wt&&(i=wt[t]),""===n||n?(o=parseFloat(i),n===!0||isFinite(o)?o||0:i):i}}),ke.each(["height","width"],function(e,t){ke.cssHooks[t]={get:function(e,n,r){if(n)
// Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
// Support: Safari 8+
// Table columns in Safari have non-zero offsetWidth & zero
// getBoundingClientRect().width unless display is changed.
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
return!yt.test(ke.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?W(e,t,r):pt(e,xt,function(){return W(e,t,r)})},set:function(e,n,r){var i,o=dt(e),
// Only read styles.position if the test has a chance to fail
// to avoid forcing a reflow.
a=!ye.scrollboxSize()&&"absolute"===o.position,
// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
s=a||r,u=s&&"border-box"===ke.css(e,"boxSizing",!1,o),c=r?G(e,t,r,u,o):0;
// Account for unreliable border-box dimensions by comparing offset* to computed and
// faking a content-box to get border and padding (gh-3699)
// Convert to pixels if value adjustment is needed
return u&&a&&(c-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-G(e,t,"border",!1,o)-.5)),c&&(i=ze.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=ke.css(e,t)),F(e,n,c)}}}),ke.cssHooks.marginLeft=I(ye.reliableMarginLeft,function(e,t){if(t)return(parseFloat(H(e,"marginLeft"))||e.getBoundingClientRect().left-pt(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),
// These hooks are used by animate to expand properties
ke.each({margin:"",padding:"",border:"Width"},function(e,t){ke.cssHooks[e+t]={expand:function(n){for(var r=0,i={},
// Assumes a single number if not a string
o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+Xe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(ke.cssHooks[e+t].set=F)}),ke.fn.extend({css:function(e,t){return Ie(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=dt(e),i=t.length;a<i;a++)o[t[a]]=ke.css(e,t[a],!1,r);return o}return void 0!==n?ke.style(e,t,n):ke.css(e,t)},e,t,arguments.length>1)}}),ke.Tween=U,U.prototype={constructor:U,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||ke.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ke.cssNumber[n]?"":"px")},cur:function(){var e=U.propHooks[this.prop];return e&&e.get?e.get(this):U.propHooks._default.get(this)},run:function(e){var t,n=U.propHooks[this.prop];return this.options.duration?this.pos=t=ke.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):U.propHooks._default.set(this),this}},U.prototype.init.prototype=U.prototype,U.propHooks={_default:{get:function(e){var t;
// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=ke.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function(e){
// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
ke.fx.step[e.prop]?ke.fx.step[e.prop](e):1!==e.elem.nodeType||!ke.cssHooks[e.prop]&&null==e.elem.style[B(e.prop)]?e.elem[e.prop]=e.now:ke.style(e.elem,e.prop,e.now+e.unit)}}},
// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
U.propHooks.scrollTop=U.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ke.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},ke.fx=U.prototype.init,
// Back compat <1.8 extension point
ke.fx.step={};var jt,Tt,kt=/^(?:toggle|show|hide)$/,Ct=/queueHooks$/;ke.Animation=ke.extend(Q,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return y(n.elem,e,ze.exec(t),n),n}]},tweener:function(e,t){be(e)?(t=e,e=["*"]):e=e.match(Re);for(var n,r=0,i=e.length;r<i;r++)n=e[r],Q.tweeners[n]=Q.tweeners[n]||[],Q.tweeners[n].unshift(t)},prefilters:[Y],prefilter:function(e,t){t?Q.prefilters.unshift(e):Q.prefilters.push(e)}}),ke.speed=function(e,t,n){var r=e&&"object"==typeof e?ke.extend({},e):{complete:n||!n&&t||be(e)&&e,duration:e,easing:n&&t||t&&!be(t)&&t};
// Go to the end state if fx are off
// Normalize opt.queue - true/undefined/null -> "fx"
// Queueing
return ke.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in ke.fx.speeds?r.duration=ke.fx.speeds[r.duration]:r.duration=ke.fx.speeds._default),null!=r.queue&&r.queue!==!0||(r.queue="fx"),r.old=r.complete,r.complete=function(){be(r.old)&&r.old.call(this),r.queue&&ke.dequeue(this,r.queue)},r},ke.fn.extend({fadeTo:function(e,t,n,r){
// Show any hidden elements after setting opacity to 0
return this.filter(Je).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=ke.isEmptyObject(e),o=ke.speed(t,n,r),a=function(){
// Operate on a copy of prop so per-property easing won't be lost
var t=Q(this,ke.extend({},e),o);
// Empty animations, or finishing resolves immediately
(i||Ge.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=ke.timers,a=Ge.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&Ct.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));
// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
!t&&n||ke.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=Ge.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=ke.timers,a=r?r.length:0;
// Look for any active animations, and finish them
for(
// Enable finishing flag on private data
n.finish=!0,
// Empty the queue first
ke.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));
// Look for any animations in the old queue and finish them
for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);
// Turn off finishing flag
delete n.finish})}}),ke.each(["toggle","show","hide"],function(e,t){var n=ke.fn[t];ke.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(z(t,!0),e,r,i)}}),
// Generate shortcuts for custom animations
ke.each({slideDown:z("show"),slideUp:z("hide"),slideToggle:z("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){ke.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),ke.timers=[],ke.fx.tick=function(){var e,t=0,n=ke.timers;for(jt=Date.now();t<n.length;t++)e=n[t],
// Run the timer and safely remove it when done (allowing for external removal)
e()||n[t]!==e||n.splice(t--,1);n.length||ke.fx.stop(),jt=void 0},ke.fx.timer=function(e){ke.timers.push(e),ke.fx.start()},ke.fx.interval=13,ke.fx.start=function(){Tt||(Tt=!0,$())},ke.fx.stop=function(){Tt=null},ke.fx.speeds={slow:600,fast:200,
// Default speed
_default:400},
// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
ke.fn.delay=function(t,n){return t=ke.fx?ke.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=we.createElement("input"),t=we.createElement("select"),n=t.appendChild(we.createElement("option"));e.type="checkbox",
// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
ye.checkOn=""!==e.value,
// Support: IE <=11 only
// Must access selectedIndex to make default options select
ye.optSelected=n.selected,
// Support: IE <=11 only
// An input loses its value after becoming a radio
e=we.createElement("input"),e.value="t",e.type="radio",ye.radioValue="t"===e.value}();var St,Et=ke.expr.attrHandle;ke.fn.extend({attr:function(e,t){return Ie(this,ke.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){ke.removeAttr(this,e)})}}),ke.extend({attr:function(e,t,n){var r,i,o=e.nodeType;
// Don't get/set attributes on text, comment and attribute nodes
if(3!==o&&8!==o&&2!==o)
// Fallback to prop when attributes are not supported
// Fallback to prop when attributes are not supported
// Attribute hooks are determined by the lowercase version
// Grab necessary hook if one is defined
return"undefined"==typeof e.getAttribute?ke.prop(e,t,n):(1===o&&ke.isXMLDoc(e)||(i=ke.attrHooks[t.toLowerCase()]||(ke.expr.match.bool.test(t)?St:void 0)),void 0!==n?null===n?void ke.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:(r=ke.find.attr(e,t),null==r?void 0:r))},attrHooks:{type:{set:function(e,t){if(!ye.radioValue&&"radio"===t&&o(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,
// Attribute names can contain non-HTML whitespace characters
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
i=t&&t.match(Re);if(i&&1===e.nodeType)for(;n=i[r++];)e.removeAttribute(n)}}),
// Hooks for boolean attributes
St={set:function(e,t,n){
// Remove boolean attributes when set to false
return t===!1?ke.removeAttr(e,n):e.setAttribute(n,n),n}},ke.each(ke.expr.match.bool.source.match(/\w+/g),function(e,t){var n=Et[t]||ke.find.attr;Et[t]=function(e,t,r){var i,o,a=t.toLowerCase();
// Avoid an infinite loop by temporarily removing this function from the getter
return r||(o=Et[a],Et[a]=i,i=null!=n(e,t,r)?a:null,Et[a]=o),i}});var _t=/^(?:input|select|textarea|button)$/i,Dt=/^(?:a|area)$/i;ke.fn.extend({prop:function(e,t){return Ie(this,ke.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[ke.propFix[e]||e]})}}),ke.extend({prop:function(e,t,n){var r,i,o=e.nodeType;
// Don't get/set properties on text, comment and attribute nodes
if(3!==o&&8!==o&&2!==o)
// Fix name and attach hooks
return 1===o&&ke.isXMLDoc(e)||(t=ke.propFix[t]||t,i=ke.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){
// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var t=ke.find.attr(e,"tabindex");return t?parseInt(t,10):_t.test(e.nodeName)||Dt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),
// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
ye.optSelected||(ke.propHooks.selected={get:function(e){/* eslint no-unused-expressions: "off" */
var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){/* eslint no-unused-expressions: "off" */
var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),ke.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ke.propFix[this.toLowerCase()]=this}),ke.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(be(e))return this.each(function(t){ke(this).addClass(e.call(this,t,Z(this)))});if(t=ee(e),t.length)for(;n=this[u++];)if(i=Z(n),r=1===n.nodeType&&" "+J(i)+" "){for(a=0;o=t[a++];)r.indexOf(" "+o+" ")<0&&(r+=o+" ");
// Only assign if different to avoid unneeded rendering.
s=J(r),i!==s&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(be(e))return this.each(function(t){ke(this).removeClass(e.call(this,t,Z(this)))});if(!arguments.length)return this.attr("class","");if(t=ee(e),t.length)for(;n=this[u++];)if(i=Z(n),
// This expression is here for better compressibility (see addClass)
r=1===n.nodeType&&" "+J(i)+" "){for(a=0;o=t[a++];)
// Remove *all* instances
for(;r.indexOf(" "+o+" ")>-1;)r=r.replace(" "+o+" "," ");
// Only assign if different to avoid unneeded rendering.
s=J(r),i!==s&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):be(e)?this.each(function(n){ke(this).toggleClass(e.call(this,n,Z(this),t),t)}):this.each(function(){var t,i,o,a;if(r)for(
// Toggle individual class names
i=0,o=ke(this),a=ee(e);t=a[i++];)
// Check each className given, space separated list
o.hasClass(t)?o.removeClass(t):o.addClass(t);else void 0!==e&&"boolean"!==n||(t=Z(this),t&&
// Store className if set
Ge.set(this,"__className__",t),
// If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
this.setAttribute&&this.setAttribute("class",t||e===!1?"":Ge.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+J(Z(n))+" ").indexOf(t)>-1)return!0;return!1}});var At=/\r/g;ke.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=be(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,ke(this).val()):e,
// Treat null/undefined as ""; convert numbers to string
null==i?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=ke.map(i,function(e){return null==e?"":e+""})),t=ke.valHooks[this.type]||ke.valHooks[this.nodeName.toLowerCase()],
// If set returns undefined, fall back to normal setting
t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)
// Handle most common string cases
return t=ke.valHooks[i.type]||ke.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(At,""):null==n?"":n)}}}),ke.extend({valHooks:{option:{get:function(e){var t=ke.find.attr(e,"value");
// Support: IE <=10 - 11 only
// option.text throws exceptions (#14686, #14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
return null!=t?t:J(ke.text(e))}},select:{get:function(e){var t,n,r,i=e.options,a=e.selectedIndex,s="select-one"===e.type,u=s?null:[],c=s?a+1:i.length;
// Loop through all the selected options
for(r=a<0?c:s?a:0;r<c;r++)
// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (#2551)
if(n=i[r],(n.selected||r===a)&&
// Don't return options that are disabled or in a disabled optgroup
!n.disabled&&(!n.parentNode.disabled||!o(n.parentNode,"optgroup"))){
// We don't need an array for one selects
if(
// Get the specific value for the option
t=ke(n).val(),s)return t;
// Multi-Selects return an array
u.push(t)}return u},set:function(e,t){for(var n,r,i=e.options,o=ke.makeArray(t),a=i.length;a--;)r=i[a],/* eslint-disable no-cond-assign */
(r.selected=ke.inArray(ke.valHooks.option.get(r),o)>-1)&&(n=!0);
// Force browsers to behave consistently when non-matching value is set
return n||(e.selectedIndex=-1),o}}}}),
// Radios and checkboxes getter/setter
ke.each(["radio","checkbox"],function(){ke.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=ke.inArray(ke(e).val(),t)>-1}},ye.checkOn||(ke.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),
// Return jQuery for attributes-only inclusion
ye.focusin="onfocusin"in e;var Nt=/^(?:focusinfocus|focusoutblur)$/,Ot=function(e){e.stopPropagation()};ke.extend(ke.event,{trigger:function(t,n,r,i){var o,a,s,u,c,l,f,d,p=[r||we],h=ge.call(t,"type")?t.type:t,g=ge.call(t,"namespace")?t.namespace.split("."):[];
// Don't do events on text and comment nodes
if(a=d=s=r=r||we,3!==r.nodeType&&8!==r.nodeType&&!Nt.test(h+ke.event.triggered)&&(h.indexOf(".")>-1&&(
// Namespaced trigger; create a regexp to match event type in handle()
g=h.split("."),h=g.shift(),g.sort()),c=h.indexOf(":")<0&&"on"+h,
// Caller can pass in a jQuery.Event object, Object, or just an event type string
t=t[ke.expando]?t:new ke.Event(h,"object"==typeof t&&t),
// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
t.isTrigger=i?2:3,t.namespace=g.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,
// Clean up the event in case it is being reused
t.result=void 0,t.target||(t.target=r),
// Clone any incoming data and prepend the event, creating the handler arg list
n=null==n?[t]:ke.makeArray(n,[t]),
// Allow special events to draw outside the lines
f=ke.event.special[h]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){
// Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!i&&!f.noBubble&&!xe(r)){for(u=f.delegateType||h,Nt.test(u+h)||(a=a.parentNode);a;a=a.parentNode)p.push(a),s=a;
// Only add window if we got to document (e.g., not plain obj or detached DOM)
s===(r.ownerDocument||we)&&p.push(s.defaultView||s.parentWindow||e)}for(
// Fire handlers on the event path
o=0;(a=p[o++])&&!t.isPropagationStopped();)d=a,t.type=o>1?u:f.bindType||h,
// jQuery handler
l=(Ge.get(a,"events")||Object.create(null))[t.type]&&Ge.get(a,"handle"),l&&l.apply(a,n),
// Native handler
l=c&&a[c],l&&l.apply&&Fe(a)&&(t.result=l.apply(a,n),t.result===!1&&t.preventDefault());
// If nobody prevented the default action, do it now
// Call a native DOM method on the target with the same name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
// Don't re-trigger an onFOO event when we call its FOO() method
// Prevent re-triggering of the same event, since we already bubbled it above
return t.type=h,i||t.isDefaultPrevented()||f._default&&f._default.apply(p.pop(),n)!==!1||!Fe(r)||c&&be(r[h])&&!xe(r)&&(s=r[c],s&&(r[c]=null),ke.event.triggered=h,t.isPropagationStopped()&&d.addEventListener(h,Ot),r[h](),t.isPropagationStopped()&&d.removeEventListener(h,Ot),ke.event.triggered=void 0,s&&(r[c]=s)),t.result}},
// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function(e,t,n){var r=ke.extend(new ke.Event,n,{type:e,isSimulated:!0});ke.event.trigger(r,null,t)}}),ke.fn.extend({trigger:function(e,t){return this.each(function(){ke.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return ke.event.trigger(e,t,n,!0)}}),
// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
ye.focusin||ke.each({focus:"focusin",blur:"focusout"},function(e,t){
// Attach a single capturing handler on the document while someone wants focusin/focusout
var n=function(e){ke.event.simulate(t,e.target,ke.event.fix(e))};ke.event.special[t]={setup:function(){
// Handle: regular nodes (via `this.ownerDocument`), window
// (via `this.document`) & document (via `this`).
var r=this.ownerDocument||this.document||this,i=Ge.access(r,t);i||r.addEventListener(e,n,!0),Ge.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this.document||this,i=Ge.access(r,t)-1;i?Ge.access(r,t,i):(r.removeEventListener(e,n,!0),Ge.remove(r,t))}}});var qt=e.location,Mt={guid:Date.now()},Rt=/\?/;
// Cross-browser xml parsing
ke.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;
// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(r){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||ke.error("Invalid XML: "+t),n};var Lt=/\[\]$/,Ht=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,Pt=/^(?:input|select|textarea|keygen)/i;
// Serialize an array of form elements or a set of
// key/values into a query string
ke.param=function(e,t){var n,r=[],i=function(e,t){
// If value is a function, invoke it and use its return value
var n=be(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";
// If an array was passed in, assume that it is an array of form elements.
if(Array.isArray(e)||e.jquery&&!ke.isPlainObject(e))
// Serialize the form elements
ke.each(e,function(){i(this.name,this.value)});else
// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(n in e)te(n,e[n],t,i);
// Return the resulting serialization
return r.join("&")},ke.fn.extend({serialize:function(){return ke.param(this.serializeArray())},serializeArray:function(){return this.map(function(){
// Can add propHook for "elements" to filter or add form elements
var e=ke.prop(this,"elements");return e?ke.makeArray(e):this}).filter(function(){var e=this.type;
// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!ke(this).is(":disabled")&&Pt.test(this.nodeName)&&!It.test(e)&&(this.checked||!et.test(e))}).map(function(e,t){var n=ke(this).val();return null==n?null:Array.isArray(n)?ke.map(n,function(e){return{name:t.name,value:e.replace(Ht,"\r\n")}}):{name:t.name,value:n.replace(Ht,"\r\n")}}).get()}});var Bt=/%20/g,Ft=/#.*$/,Gt=/([?&])_=[^&]*/,Wt=/^(.*?):[ \t]*([^\r\n]*)$/gm,
// #7653, #8125, #8152: local protocol detection
Ut=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,$t=/^(?:GET|HEAD)$/,Vt=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
zt={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
Xt={},
// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
Yt="*/".concat("*"),
// Anchor tag for parsing the document origin
Kt=we.createElement("a");Kt.href=qt.href,ke.extend({
// Counter for holding the number of active queries
active:0,
// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:qt.href,type:"GET",isLocal:Ut.test(qt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
accepts:{"*":Yt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},
// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{
// Convert anything to text
"* text":String,
// Text to html (true = no transformation)
"text html":!0,
// Evaluate text as a json expression
"text json":JSON.parse,
// Parse text as xml
"text xml":ke.parseXML},
// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:!0,context:!0}},
// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function(e,t){
// Building a settings object
// Extending ajaxSettings
return t?ie(ie(e,ke.ajaxSettings),t):ie(ke.ajaxSettings,e)},ajaxPrefilter:ne(zt),ajaxTransport:ne(Xt),
// Main method
ajax:function(t,n){
// Callback for when everything is done
function r(t,n,r,s){var c,d,p,x,w,j=n;
// Ignore repeat invocations
l||(l=!0,
// Clear timeout if it exists
u&&e.clearTimeout(u),
// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
i=void 0,
// Cache response headers
a=s||"",
// Set readyState
T.readyState=t>0?4:0,
// Determine if successful
c=t>=200&&t<300||304===t,
// Get response data
r&&(x=oe(h,T,r)),
// Use a noop converter for missing script
!c&&ke.inArray("script",h.dataTypes)>-1&&(h.converters["text script"]=function(){}),
// Convert no matter what (that way responseXXX fields are always set)
x=ae(h,x,T,c),
// If successful, handle type chaining
c?(
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
h.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(ke.lastModified[o]=w),w=T.getResponseHeader("etag"),w&&(ke.etag[o]=w)),
// if no content
204===t||"HEAD"===h.type?j="nocontent":304===t?j="notmodified":(j=x.state,d=x.data,p=x.error,c=!p)):(
// Extract error from statusText and normalize for non-aborts
p=j,!t&&j||(j="error",t<0&&(t=0))),
// Set data for the fake xhr object
T.status=t,T.statusText=(n||j)+"",
// Success/Error
c?v.resolveWith(g,[d,j,T]):v.rejectWith(g,[T,j,p]),
// Status-dependent callbacks
T.statusCode(b),b=void 0,f&&m.trigger(c?"ajaxSuccess":"ajaxError",[T,h,c?d:p]),
// Complete
y.fireWith(g,[T,j]),f&&(m.trigger("ajaxComplete",[T,h]),
// Handle the global AJAX counter
--ke.active||ke.event.trigger("ajaxStop")))}
// If url is an object, simulate pre-1.5 signature
"object"==typeof t&&(n=t,t=void 0),
// Force options to be an object
n=n||{};var i,
// URL without anti-cache param
o,
// Response headers
a,s,
// timeout handle
u,
// Url cleanup var
c,
// Request state (becomes false upon send and true upon completion)
l,
// To know if global events are to be dispatched
f,
// Loop variable
d,
// uncached part of the url
p,
// Create the final options object
h=ke.ajaxSetup({},n),
// Callbacks context
g=h.context||h,
// Context for global events is callbackContext if it is a DOM node or jQuery collection
m=h.context&&(g.nodeType||g.jquery)?ke(g):ke.event,
// Deferreds
v=ke.Deferred(),y=ke.Callbacks("once memory"),
// Status-dependent callbacks
b=h.statusCode||{},
// Headers (they are sent all at once)
x={},w={},
// Default abort message
j="canceled",
// Fake xhr
T={readyState:0,
// Builds headers hashtable if needed
getResponseHeader:function(e){var t;if(l){if(!s)for(s={};t=Wt.exec(a);)s[t[1].toLowerCase()+" "]=(s[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=s[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},
// Raw string
getAllResponseHeaders:function(){return l?a:null},
// Caches the header
setRequestHeader:function(e,t){return null==l&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,x[e]=t),this},
// Overrides response content-type header
overrideMimeType:function(e){return null==l&&(h.mimeType=e),this},
// Status-dependent callbacks
statusCode:function(e){var t;if(e)if(l)
// Execute the appropriate callbacks
T.always(e[T.status]);else
// Lazy-add the new callbacks in a way that preserves old ones
for(t in e)b[t]=[b[t],e[t]];return this},
// Cancel the request
abort:function(e){var t=e||j;return i&&i.abort(t),r(0,t),this}};
// A cross-domain request is in order when the origin doesn't match the current origin.
if(
// Attach deferreds
v.promise(T),
// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
h.url=((t||h.url||qt.href)+"").replace(Vt,qt.protocol+"//"),
// Alias method option to type as per ticket #12004
h.type=n.method||n.type||h.method||h.type,
// Extract dataTypes list
h.dataTypes=(h.dataType||"*").toLowerCase().match(Re)||[""],null==h.crossDomain){c=we.createElement("a");
// Support: IE <=8 - 11, Edge 12 - 15
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{c.href=h.url,
// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
c.href=c.href,h.crossDomain=Kt.protocol+"//"+Kt.host!=c.protocol+"//"+c.host}catch(k){
// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
h.crossDomain=!0}}
// If request was aborted inside a prefilter, stop there
if(
// Convert data if not already a string
h.data&&h.processData&&"string"!=typeof h.data&&(h.data=ke.param(h.data,h.traditional)),
// Apply prefilters
re(zt,h,n,T),l)return T;
// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
f=ke.event&&h.global,
// Watch for a new set of requests
f&&0===ke.active++&&ke.event.trigger("ajaxStart"),
// Uppercase the type
h.type=h.type.toUpperCase(),
// Determine if request has content
h.hasContent=!$t.test(h.type),
// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
o=h.url.replace(Ft,""),
// More options handling for requests with no content
h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(Bt,"+")):(
// Remember the hash so we can put it back
p=h.url.slice(o.length),
// If data is available and should be processed, append data to url
h.data&&(h.processData||"string"==typeof h.data)&&(o+=(Rt.test(o)?"&":"?")+h.data,
// #9682: remove data so that it's not used in an eventual retry
delete h.data),
// Add or update anti-cache param if needed
h.cache===!1&&(o=o.replace(Gt,"$1"),p=(Rt.test(o)?"&":"?")+"_="+Mt.guid++ +p),
// Put hash and anti-cache on the URL that will be requested (gh-1732)
h.url=o+p),
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
h.ifModified&&(ke.lastModified[o]&&T.setRequestHeader("If-Modified-Since",ke.lastModified[o]),ke.etag[o]&&T.setRequestHeader("If-None-Match",ke.etag[o])),
// Set the correct header, if data is being sent
(h.data&&h.hasContent&&h.contentType!==!1||n.contentType)&&T.setRequestHeader("Content-Type",h.contentType),
// Set the Accepts header for the server, depending on the dataType
T.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+Yt+"; q=0.01":""):h.accepts["*"]);
// Check for headers option
for(d in h.headers)T.setRequestHeader(d,h.headers[d]);
// Allow custom headers/mimetypes and early abort
if(h.beforeSend&&(h.beforeSend.call(g,T,h)===!1||l))
// Abort if not done already and return
return T.abort();
// If no transport, we auto-abort
if(
// Aborting is no longer a cancellation
j="abort",
// Install callbacks on deferreds
y.add(h.complete),T.done(h.success),T.fail(h.error),
// Get transport
i=re(Xt,h,n,T)){
// If request was aborted inside ajaxSend, stop there
if(T.readyState=1,
// Send global event
f&&m.trigger("ajaxSend",[T,h]),l)return T;
// Timeout
h.async&&h.timeout>0&&(u=e.setTimeout(function(){T.abort("timeout")},h.timeout));try{l=!1,i.send(x,r)}catch(k){
// Rethrow post-completion exceptions
if(l)throw k;
// Propagate others as results
r(-1,k)}}else r(-1,"No Transport");return T},getJSON:function(e,t,n){return ke.get(e,t,n,"json")},getScript:function(e,t){return ke.get(e,void 0,t,"script")}}),ke.each(["get","post"],function(e,t){ke[t]=function(e,n,r,i){
// The url can be an options object (which then must have .url)
// Shift arguments if data argument was omitted
return be(n)&&(i=i||r,r=n,n=void 0),ke.ajax(ke.extend({url:e,type:t,dataType:i,data:n,success:r},ke.isPlainObject(e)&&e))}}),ke.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),ke._evalUrl=function(e,t,n){return ke.ajax({url:e,
// Make this explicit, since user can override this through ajaxSetup (#11264)
type:"GET",dataType:"script",cache:!0,async:!1,global:!1,
// Only evaluate the response if it is successful (gh-4126)
// dataFilter is not invoked for failure responses, so using it instead
// of the default converter is kludgy but it works.
converters:{"text script":function(){}},dataFilter:function(e){ke.globalEval(e,t,n)}})},ke.fn.extend({wrapAll:function(e){var t;
// The elements to wrap the target around
return this[0]&&(be(e)&&(e=e.call(this[0])),t=ke(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return be(e)?this.each(function(t){ke(this).wrapInner(e.call(this,t))}):this.each(function(){var t=ke(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=be(e);return this.each(function(n){ke(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){ke(this).replaceWith(this.childNodes)}),this}}),ke.expr.pseudos.hidden=function(e){return!ke.expr.pseudos.visible(e)},ke.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},ke.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(t){}};var Qt={
// File protocol always yields status code 0, assume 200
0:200,
// Support: IE <=9 only
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},Jt=ke.ajaxSettings.xhr();ye.cors=!!Jt&&"withCredentials"in Jt,ye.ajax=Jt=!!Jt,ke.ajaxTransport(function(t){var n,r;
// Cross domain only allowed if supported through XMLHttpRequest
if(ye.cors||Jt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();
// Apply custom fields if provided
if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];
// Override mime type if needed
t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),
// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");
// Set headers
for(a in i)s.setRequestHeader(a,i[a]);
// Callback
n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?
// Support: IE <=9 only
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
"number"!=typeof s.status?o(0,"error"):o(
// File: protocol always yields status 0; see #8605, #14207
s.status,s.statusText):o(Qt[s.status]||s.status,s.statusText,
// Support: IE <=9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},
// Listen to events
s.onload=n(),r=s.onerror=s.ontimeout=n("error"),
// Support: IE 9 only
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){
// Check readyState before timeout as it changes
4===s.readyState&&
// Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
e.setTimeout(function(){n&&r()})},
// Create the abort callback
n=n("abort");try{
// Do send the request (this may raise an exception)
s.send(t.hasContent&&t.data||null)}catch(u){
// #14683: Only rethrow if this hasn't been notified as an error yet
if(n)throw u}},abort:function(){n&&n()}}}),
// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
ke.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),
// Install script dataType
ke.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return ke.globalEval(e),e}}}),
// Handle cache's special case and crossDomain
ke.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),
// Bind script tag hack transport
ke.ajaxTransport("script",function(e){
// This transport only deals with cross domain or forced-by-attrs requests
if(e.crossDomain||e.scriptAttrs){var t,n;return{send:function(r,i){t=ke("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),
// Use native DOM manipulation to avoid our domManip AJAX trickery
we.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Zt=[],en=/(=)\?(?=&|$)|\?\?/;
// Default jsonp settings
ke.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Zt.pop()||ke.expando+"_"+Mt.guid++;return this[e]=!0,e}}),
// Detect, normalize options and install callbacks for jsonp requests
ke.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=t.jsonp!==!1&&(en.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&en.test(t.data)&&"data");
// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(s||"jsonp"===t.dataTypes[0])
// Delegate to script
// Get callback name, remembering preexisting value associated with it
// Insert callback into url or form data
// Use data converter to retrieve json after script execution
// Force json dataType
// Install callback
// Clean-up function (fires after converters)
return i=t.jsonpCallback=be(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(en,"$1"+i):t.jsonp!==!1&&(t.url+=(Rt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||ke.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){
// If previous value didn't exist - remove it
void 0===o?ke(e).removeProp(i):e[i]=o,
// Save back as free
t[i]&&(
// Make sure that re-using the options doesn't screw things around
t.jsonpCallback=n.jsonpCallback,
// Save the callback name for future use
Zt.push(i)),
// Call if it was a function and we have a response
a&&be(o)&&o(a[0]),a=o=void 0}),"script"}),
// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
ye.createHTMLDocument=function(){var e=we.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),
// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
ke.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var r,i,o;
// Single tag
// Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
// Single tag
return t||(ye.createHTMLDocument?(t=we.implementation.createHTMLDocument(""),r=t.createElement("base"),r.href=we.location.href,t.head.appendChild(r)):t=we),i=De.exec(e),o=!n&&[],i?[t.createElement(i[1])]:(i=T([e],t,o),o&&o.length&&ke(o).remove(),ke.merge([],i.childNodes))},/**
 * Load a url into a page
 */
ke.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");
// If it's a function
// We assume that it's the callback
// If we have elements to modify, make the request
return s>-1&&(r=J(e.slice(s)),e=e.slice(0,s)),be(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&ke.ajax({url:e,
// If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:i||"GET",dataType:"html",data:t}).done(function(e){
// Save response for use in complete callback
o=arguments,a.html(r?
// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
ke("<div>").append(ke.parseHTML(e)).find(r):
// Otherwise use the full result
e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},ke.expr.pseudos.animated=function(e){return ke.grep(ke.timers,function(t){return e===t.elem}).length},ke.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,c,l=ke.css(e,"position"),f=ke(e),d={};
// Set position first, in-case top/left are set even on static elem
"static"===l&&(e.style.position="relative"),s=f.offset(),o=ke.css(e,"top"),u=ke.css(e,"left"),c=("absolute"===l||"fixed"===l)&&(o+u).indexOf("auto")>-1,
// Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
c?(r=f.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),be(t)&&(
// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
t=t.call(e,n,ke.extend({},s))),null!=t.top&&(d.top=t.top-s.top+a),null!=t.left&&(d.left=t.left-s.left+i),"using"in t?t.using.call(e,d):("number"==typeof d.top&&(d.top+="px"),"number"==typeof d.left&&(d.left+="px"),f.css(d))}},ke.fn.extend({
// offset() relates an element's border box to the document origin
offset:function(e){
// Preserve chaining for setter
if(arguments.length)return void 0===e?this:this.each(function(t){ke.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)
// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
// Get document-relative position by adding viewport scroll to viewport-relative gBCR
return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},
// position() relates an element's margin box to its offset parent's padding box
// This corresponds to the behavior of CSS absolute positioning
position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};
// position:fixed elements are offset from the viewport, which itself always has zero offset
if("fixed"===ke.css(r,"position"))
// Assume position:fixed implies availability of getBoundingClientRect
t=r.getBoundingClientRect();else{for(t=this.offset(),
// Account for the *real* offset parent, which can be the document or its root element
// when a statically positioned element is identified
n=r.ownerDocument,e=r.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===ke.css(e,"position");)e=e.parentNode;e&&e!==r&&1===e.nodeType&&(
// Incorporate borders into its offset, since they are outside its content origin
i=ke(e).offset(),i.top+=ke.css(e,"borderTopWidth",!0),i.left+=ke.css(e,"borderLeftWidth",!0))}
// Subtract parent offsets and element margins
return{top:t.top-i.top-ke.css(r,"marginTop",!0),left:t.left-i.left-ke.css(r,"marginLeft",!0)}}},
// This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===ke.css(e,"position");)e=e.offsetParent;return e||Ye})}}),
// Create scrollLeft and scrollTop methods
ke.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;ke.fn[e]=function(r){return Ie(this,function(e,r,i){
// Coalesce documents and windows
var o;return xe(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i?o?o[t]:e[r]:void(o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i)},e,r,arguments.length)}}),
// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
ke.each(["top","left"],function(e,t){ke.cssHooks[t]=I(ye.pixelPosition,function(e,n){if(n)
// If curCSS returns percentage, fallback to offset
return n=H(e,t),ft.test(n)?ke(e).position()[t]+"px":n})}),
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
ke.each({Height:"height",Width:"width"},function(e,t){ke.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){
// Margin is only for outerHeight, outerWidth
ke.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(i===!0||o===!0?"margin":"border");return Ie(this,function(t,n,i){var o;
// Get document width or height
// Get width or height on the element, requesting but not forcing parseFloat
// Set width or height on the element
return xe(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?ke.css(t,n,s):ke.style(t,n,i,s)},t,a?i:void 0,a)}})}),ke.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ke.fn[t]=function(e){return this.on(t,e)}}),ke.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){
// ( namespace ) or ( selector, types [, fn] )
return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),ke.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){
// Handle event binding
ke.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}});
// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var tn=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
ke.proxy=function(e,t){var n,r,i;
// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if("string"==typeof t&&(n=e[t],t=e,e=n),be(e))
// Simulated bind
// Set the guid of unique handler to the same of original handler, so it can be removed
return r=ce.call(arguments,2),i=function(){return e.apply(t||this,r.concat(ce.call(arguments)))},i.guid=e.guid=e.guid||ke.guid++,i},ke.holdReady=function(e){e?ke.readyWait++:ke.ready(!0)},ke.isArray=Array.isArray,ke.parseJSON=JSON.parse,ke.nodeName=o,ke.isFunction=be,ke.isWindow=xe,ke.camelCase=h,ke.type=r,ke.now=Date.now,ke.isNumeric=function(e){
// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var t=ke.type(e);
// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},ke.trim=function(e){return null==e?"":(e+"").replace(tn,"")},
// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
"function"==typeof define&&define.amd&&define("jquery",[],function(){return ke});var
// Map over jQuery in case of overwrite
nn=e.jQuery,
// Map over the $ in case of overwrite
rn=e.$;
// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
return ke.noConflict=function(t){return e.$===ke&&(e.$=rn),t&&e.jQuery===ke&&(e.jQuery=nn),ke},"undefined"==typeof t&&(e.jQuery=e.$=ke),ke})}()}),require.register("process/browser.js",function(e,n,r){n=t(n,{},"process"),function(){function e(){throw new Error("setTimeout has not been defined")}function t(){throw new Error("clearTimeout has not been defined")}function n(t){if(c===setTimeout)
//normal enviroments in sane situations
return setTimeout(t,0);
// if setTimeout wasn't available but was latter defined
if((c===e||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{
// when when somebody has screwed with setTimeout but no I.E. maddness
return c(t,0)}catch(n){try{
// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return c.call(null,t,0)}catch(n){
// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return c.call(this,t,0)}}}function i(e){if(l===clearTimeout)
//normal enviroments in sane situations
return clearTimeout(e);
// if clearTimeout wasn't available but was latter defined
if((l===t||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{
// when when somebody has screwed with setTimeout but no I.E. maddness
return l(e)}catch(n){try{
// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return l.call(null,e)}catch(n){
// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return l.call(this,e)}}}function o(){h&&d&&(h=!1,d.length?p=d.concat(p):g=-1,p.length&&a())}function a(){if(!h){var e=n(o);h=!0;for(var t=p.length;t;){for(d=p,p=[];++g<t;)d&&d[g].run();g=-1,t=p.length}d=null,h=!1,i(e)}}
// v8 likes predictible objects
function s(e,t){this.fun=e,this.array=t}function u(){}
// shim for using process in browser
var c,l,f=r.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:e}catch(n){c=e}try{l="function"==typeof clearTimeout?clearTimeout:t}catch(n){l=t}}();var d,p=[],h=!1,g=-1;f.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];p.push(new s(e,t)),1!==p.length||h||n(a)},s.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",// empty string to avoid regexp issues
f.versions={},f.on=u,f.addListener=u,f.once=u,f.off=u,f.removeListener=u,f.removeAllListeners=u,f.emit=u,f.prependListener=u,f.prependOnceListener=u,f.listeners=function(e){return[]},f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}}()}),require.register("pubsub-js/src/pubsub.js",function(e,n,r){n=t(n,{},"pubsub-js"),function(){/**
 * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
 * License: MIT - http://mrgnrdrck.mit-license.org
 *
 * https://github.com/mroderick/PubSubJS
 */
!function(t,n){"use strict";var i={};t.PubSub=i;var o=t.define;n(i),
// AMD support
"function"==typeof o&&o.amd?o(function(){return i}):"object"==typeof e&&(void 0!==r&&r.exports&&(e=r.exports=i),e.PubSub=i,// CommonJS module 1.1.1 spec
r.exports=e=i)}("object"==typeof window&&window||this,function(e){"use strict";function t(e){var t;for(t in e)if(e.hasOwnProperty(t))return!0;return!1}/**
     * Returns a function that throws the passed exception, for use as argument for setTimeout
     * @alias throwException
     * @function
     * @param { Object } ex An Error object
     */
function n(e){return function(){throw e}}function r(e,t,r){try{e(t,r)}catch(i){setTimeout(n(i),0)}}function i(e,t,n){e(t,n)}function o(e,t,n,o){var a,s=c[t],u=o?i:r;if(c.hasOwnProperty(t))for(a in s)s.hasOwnProperty(a)&&u(s[a],e,n)}function a(e,t,n){return function(){var r=String(e),i=r.lastIndexOf(".");
// trim the hierarchy and deliver message to each level
for(
// deliver the message as it is now
o(e,e,t,n);i!==-1;)r=r.substr(0,i),i=r.lastIndexOf("."),o(e,r,t,n)}}function s(e){for(var n=String(e),r=Boolean(c.hasOwnProperty(n)&&t(c[n])),i=n.lastIndexOf(".");!r&&i!==-1;)n=n.substr(0,i),i=n.lastIndexOf("."),r=Boolean(c.hasOwnProperty(n)&&t(c[n]));return r}function u(e,t,n,r){e="symbol"==typeof e?e.toString():e;var i=a(e,t,r),o=s(e);return!!o&&(n===!0?i():setTimeout(i,0),!0)}var c={},l=-1;/**
     * Publishes the message, passing the data to it's subscribers
     * @function
     * @alias publish
     * @param { String } message The message to publish
     * @param {} data The data to pass to subscribers
     * @return { Boolean }
     */
e.publish=function(t,n){return u(t,n,!1,e.immediateExceptions)},/**
     * Publishes the message synchronously, passing the data to it's subscribers
     * @function
     * @alias publishSync
     * @param { String } message The message to publish
     * @param {} data The data to pass to subscribers
     * @return { Boolean }
     */
e.publishSync=function(t,n){return u(t,n,!0,e.immediateExceptions)},/**
     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe
     * @function
     * @alias subscribe
     * @param { String } message The message to subscribe to
     * @param { Function } func The function to call when a new message is published
     * @return { String }
     */
e.subscribe=function(e,t){if("function"!=typeof t)return!1;e="symbol"==typeof e?e.toString():e,
// message is not registered yet
c.hasOwnProperty(e)||(c[e]={});
// forcing token as String, to allow for future expansions without breaking usage
// and allow for easy use as key names for the 'messages' object
var n="uid_"+String(++l);
// return token for unsubscribing
return c[e][n]=t,n},/**
     * Subscribes the passed function to the passed message once
     * @function
     * @alias subscribeOnce
     * @param { String } message The message to subscribe to
     * @param { Function } func The function to call when a new message is published
     * @return { PubSub }
     */
e.subscribeOnce=function(t,n){var r=e.subscribe(t,function(){
// before func apply, unsubscribe message
e.unsubscribe(r),n.apply(this,arguments)});return e},/**
     * Clears all subscriptions
     * @function
     * @public
     * @alias clearAllSubscriptions
     */
e.clearAllSubscriptions=function(){c={}},/**
     * Clear subscriptions by the topic
     * @function
     * @public
     * @alias clearAllSubscriptions
     * @return { int }
     */
e.clearSubscriptions=function(e){var t;for(t in c)c.hasOwnProperty(t)&&0===t.indexOf(e)&&delete c[t]},/** 
       Count subscriptions by the topic
     * @function
     * @public
     * @alias countSubscriptions
     * @return { Array }
    */
e.countSubscriptions=function(e){var t,n=0;for(t in c)c.hasOwnProperty(t)&&0===t.indexOf(e)&&n++;return n},/** 
       Gets subscriptions by the topic
     * @function
     * @public
     * @alias getSubscriptions
    */
e.getSubscriptions=function(e){var t,n=[];for(t in c)c.hasOwnProperty(t)&&0===t.indexOf(e)&&n.push(t);return n},/**
     * Removes subscriptions
     *
     * - When passed a token, removes a specific subscription.
     *
	 * - When passed a function, removes all subscriptions for that function
     *
	 * - When passed a topic, removes all subscriptions for that topic (hierarchy)
     * @function
     * @public
     * @alias subscribeOnce
     * @param { String | Function } value A token, function or topic to unsubscribe from
     * @example // Unsubscribing with a token
     * var token = PubSub.subscribe('mytopic', myFunc);
     * PubSub.unsubscribe(token);
     * @example // Unsubscribing with a function
     * PubSub.unsubscribe(myFunc);
     * @example // Unsubscribing from a topic
     * PubSub.unsubscribe('mytopic');
     */
e.unsubscribe=function(t){var n,r,i,o=function(e){var t;for(t in c)if(c.hasOwnProperty(t)&&0===t.indexOf(e))
// a descendant of the topic exists:
return!0;return!1},a="string"==typeof t&&(c.hasOwnProperty(t)||o(t)),s=!a&&"string"==typeof t,u="function"==typeof t,l=!1;if(a)return void e.clearSubscriptions(t);for(n in c)if(c.hasOwnProperty(n)){if(r=c[n],s&&r[t]){delete r[t],l=t;
// tokens are unique, so we can just stop here
break}if(u)for(i in r)r.hasOwnProperty(i)&&r[i]===t&&(delete r[i],l=!0)}return l}})}()}),require.register("armorDecorator.js",function(e,t,n){function r(){c.forEach(function(e){a("."+e).find(".item").not("[data-fate-armor-registered]").each(function(){a(this).attr("data-fate-armor-registered",!1);var e=a(this).attr("title").split("\n")[0];a(this).attr("data-fate-armor-name",e);// Is it an exotic or legendary masterwork?
var t=a(this).has("._3iMN1").length>0;a(this).attr("data-fate-masterwork",t);var n=a(this).attr("id").split("-")[0];a(this).attr("data-fate-serial",n);var r=a(this).find(l).children("span").text();a(this).attr("data-fate-light",r)})})}function i(){a("[data-fate-armor-registered]").each(function(e,t){var n=a(this).attr("data-fate-serial"),r=a(this).attr("data-fate-armor-name");a(this).attr("title",r);var i=a.map(a(this).find("span.app-icon"),function(e,t){var n=a(e).attr("class").split(" ").filter(function(e){return e.startsWith("fa-")})[0];return n.replace("fa-","")}),o=i.includes("ban");a(this).attr("data-fate-dimtag-junk",o);var c=i.includes("archive");a(this).attr("data-fate-dimtag-archive",c);var f=i.includes("tag");a(this).attr("data-fate-dimtag-keep",f);var d=i.includes("heart");a(this).attr("data-fate-dimtag-favourite",d);var p=s.contains(n);a(this).attr("data-fate-armor-registered",p);var h=a(this).find(l).children("span").text();if(a(this).attr("data-fate-light",h),!p)return a(this).attr("title",r),a(this).removeAttr("data-fate-armor-junk"),a(this).removeAttr("data-fate-armor-pve"),void a(this).removeAttr("data-fate-armor-pvp");var g=s.get(n);a(this).attr("data-fate-armor-junk",g.pveUtility===u.NO&&g.pvpUtility===u.NO),a(this).attr("data-fate-armor-pve",g.pveUtility===u.YES),a(this).attr("data-fate-armor-pvp",g.pvpUtility===u.YES),a(this).attr("data-fate-element",g.element);var m=a(this).find(".foaf-item-overlay");m.text()!=g.overlay&&a(this).find(".foaf-item-overlay").text(g.overlay)})}const o=t("fateBus.js");o.registerModule(n);var a=t("jquery"),s=t("armorRollDatabase.js").armorRollDB,u=t("armorRoll.js").Utility,c=["bucket-3448274439",// Helm
"bucket-3551918588",// Gloves
"bucket-14239492",// Chest
"bucket-20886954",// Legs
"bucket-1585787867"],l="._7AyRH";o.subscribe(n,"fate.refresh",function(){r(),i()})}),require.register("armorRoll.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}const a=t("fateBus.js");a.registerModule(n);var s={NO:"n",YES:"y",UNKNOWN:"?"},u=/*#__PURE__*/
function(){function e(t,n,i,o,a,s,u,c,l,f,d,p,h,g){r(this,e),this.rollID=t,this.name=n,this.element=i.toLowerCase(),this.season=o,this.overlay=u,this.pve=a.toLowerCase(),this.pvp=s.toLowerCase(),this.mob=parseInt(l),this.res=parseInt(f),this.rec=parseInt(d),this["int"]=parseInt(h),this.dis=parseInt(p),this.str=parseInt(g),this.total=parseInt(c)}return o(e,[{key:"pveUtility",get:function(){return e.mapToStatus(this.pve)}},{key:"pvpUtility",get:function(){return e.mapToStatus(this.pvp)}}],[{key:"mapToStatus",value:function(e){switch(e){case"y":return s.YES;case"n":return s.NO;default:return s.UNKNOWN}}}]),e}();e.ArmorRoll=u,e.Utility=s}),require.register("armorRollDataRefresher.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("itemDataRefresher.js");r.subscribe(n,"fate.configurationLoaded",function(e,t){new i.ItemDataRefresher("armorRoll",t.armorRollTSV)})}),require.register("armorRollDatabase.js",function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function o(e,t,n){return o=i()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var i=Function.bind.apply(e,r),o=new i;return n&&h(o,n.prototype),o},o.apply(null,arguments)}function a(e){return c(e)||u(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),e}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}return function(){var n,r=y(e);if(t()){var i=y(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return m(this,n)}}function m(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?v(e):t}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}const b=t("fateBus.js");b.registerModule(n);var x=(t("logger"),t("itemDatabase.js")),w=t("armorRoll.js"),j=/*#__PURE__*/
function(e){function t(){return l(this,t),n.call(this,"armorRoll")}p(t,e);var n=g(t);return d(t,[{key:"createItemFromData",value:function(e){this.itemMap.set(e[0],o(w.ArmorRoll,a(e)))}}]),t}(x.ItemDatabase);e.armorRollDB=new j}),require.register("beautification.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("jquery");r.subscribe(n,"fate.init",function(){GM_addStyle(GM_getResourceText("fateOfAllFoolsCSS"))}),r.subscribe(n,"fate.refresh",function(){
// Remove the subclass icons
i(".bucket-3284755031").each(function(e,t){"display:none"!=i(this).attr("style")&&i(this).attr("style","display:none")}),// Remove the weapons bar
i('.inventory-title:contains("Weapons")').each(function(e,t){"display:none"!=i(this).attr("style")&&i(this).attr("style","display:none")}),// Remove the postmaster bar
i('.inventory-title:contains("Postmaster")').each(function(e,t){"display:none"!=i(this).attr("style")&&i(this).attr("style","display:none")})})}),require.register("configuration.js",function(e,t,n){function r(){a.publish(n,"fate.configurationLoaded",{rollDataTSV:GM_config.get("rollDataTSV"),armorRollTSV:GM_config.get("armorRollTSV"),shaderDataTSV:GM_config.get("shaderDataTSV")})}function i(){u.log("configuration.js: Initializing"),GM_config.init({id:"FateConfig",fields:{rollDataTSV:{label:"Weapon Rolls Tab-Separated Values",type:"text","default":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1131147082&single=true&output=tsv"},armorRollTSV:{label:"Armor Rolls Tab-Separated Values",type:"text","default":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1332329724&single=true&output=tsv"},shaderDataTSV:{label:"Shader Data Tab-Separated Values",type:"text","default":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1194152043&single=true&output=tsv"},maxLightLevelTracking:{label:"Display per-slot max light level overlay",type:"checkbox","default":!1}},events:{save:function(){r()},init:function(){r()}}})}// "Why don't you use GM_config's 'init' callback above to do this?"
//
// When GM_config is built, DIM hasn't finished loading, so we would have no
// DOM navigation structure to key off of.
function o(){s(".fate-config").length>0||(s(".header-links").prepend("<a class='link fate-config'>FATE Config</a>"),s(".fate-config").on("click",function(){GM_config.open()}))}const a=t("fateBus.js");a.registerModule(n);var s=t("jquery"),u=t("logger");a.subscribe(n,"fate.init",i),a.subscribe(n,"fate.refresh",o)}),require.register("dupeIndicator.js",function(e,t,n){function r(e,t){return a(e)||o(e,t)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){i=!0,o=u}finally{try{r||null==s["return"]||s["return"]()}finally{if(i)throw o}}return n}}function a(e){if(Array.isArray(e))return e}function s(){var e=new Map;return l("[data-fate-weapon-name]").each(function(t,n){var r=l(this).attr("data-fate-weapon-name"),i={name:r,domElement:this};e.has(r)?e.set(r,e.get(r).concat(i)):e.set(r,[i])}),e}function u(e){var t=!0,n=!1,i=void 0;try{for(var o,a=function(){var e=r(o.value,2),t=(e[0],e[1]);t.forEach(function(e){if(1===t.length)l(e.domElement).attr("data-fate-weapon-dupe",!1);else{var n="false"===l(e.domElement).attr("data-fate-weapon-registered");l(e.domElement).attr("data-fate-weapon-dupe",n)}})},s=e[Symbol.iterator]();!(t=(o=s.next()).done);t=!0)a()}catch(u){n=!0,i=u}finally{try{t||null==s["return"]||s["return"]()}finally{if(n)throw i}}}const c=t("fateBus.js");c.registerModule(n);var l=t("jquery");t("logger.js"),t("indicators.js");c.subscribe(n,"fate.refresh",function(){
// logger.log('dupeIndicator.js: Calculating duplicates');
u(s())})}),require.register("fateBus.js",function(e,t,n){"use strict";function r(e){p.set(e.id,!1)}function i(){p.clear()}function o(e){return p.get(e.id)}function a(e,t,n){if(!p.has(e.id))throw new Error("fateBus.js#publish: Module ["+e.id+"] is not defined");o(e)||d.publishSync(t,n)}function s(e,t,n){if(!p.has(e.id))throw new Error("fateBus.js#subscribe: Module ["+e.id+"] is not defined");d.subscribe(t,function(t,r){p.has(e.id)&&(o(e)||n(t,r))})}function u(e){p.set(e,!0)}function c(){var e=Array.from(p.keys());e.forEach(function(e){u(e)})}function l(e){p.set(e,!1)}function f(e){d.unsubscribe(e)}var d=t("pubsub-js"),p=new Map;e.registerModule=r,e.deregisterModules=i,e.publish=a,e.subscribe=s,e.mute=u,e.muteAll=c,e.unmute=l,e.unsubscribeFunctionFromAllTopics=f}),require.register("indicators.js",function(e,t,n){function r(){o("[data-fate-weapon-name]").not("[data-fate-indicator-init=true]").each(function(e,t){g.forEach(function(e,n){o(t).append(o("<div>",{"class":n+" "+e+" foaf-glyph"}))}),o(this).attr("data-fate-indicator-init",!0)}),o("[data-fate-armor-name]").not("[data-fate-indicator-init=true]").each(function(e,t){m.forEach(function(e,n){o(t).append(o("<div>",{"class":n+" "+e+" foaf-glyph"}))}),o(this).append(o("<div>",{"class":"foaf-item-overlay"})),o(this).attr("data-fate-indicator-init",!0)}),o("[data-fate-shader-name]").not("[data-fate-indicator-init=true]").each(function(e,t){v.forEach(function(e,n){o(t).append(o("<div>",{"class":n+" "+e+" foaf-glyph"}))}),o(this).attr("data-fate-indicator-init",!0)})}const i=t("fateBus.js");i.registerModule(n);var o=t("jquery"),a=(t("logger.js"),"foaf-dupe"),s="foaf-junk",u="foaf-pve",c="foaf-pvp",l="foaf-fave",f="foaf-infusable",d="foaf-masterwork",p="foaf-wishlist-pass",h="foaf-wishlist-fail",g=new Map([[a,"fglyph-dupe"],[u,"fglyph-pve"],[c,"fglyph-pvp"],[f,"fglyph-up"],[p,"fglyph-wishlist-pass"],[h,"fglyph-wishlist-fail"],[d,""]]),m=new Map([[u,"fglyph-pve"],[c,"fglyph-pvp"],[f,"fglyph-up"],[d,""]]),v=new Map([[l,"fglyph-fave"],[s,"fglyph-junk"]]);i.subscribe(n,"fate.refresh",function(){
// logger.log('indicators.js: Inserting indicator elements');
r()}),e.DUPLICATE_INDICATOR_CLASS=a}),require.register("infusionIndicator.js",function(e,t,n){function r(){a.forEach(function(e){var t=new Map;o("."+e).find('[data-fate-weapon-registered="false"').each(function(){var e=o(this).attr("data-fate-weapon-name"),n=parseInt(o(this).attr("data-fate-light"));(!t.has(e)||t.get(e)<n)&&t.set(e,n),o(this).attr("data-fate-infusable",!1)}),o("."+e).find('[data-fate-weapon-registered="true"').each(function(){var e=o(this).attr("data-fate-weapon-name"),n=parseInt(o(this).attr("data-fate-light"));o(this).attr("data-fate-infusable",t.has(e)&&t.get(e)>n)})}),s.forEach(function(e){var t=new Map;o("."+e).find('[data-fate-armor-registered="false"').each(function(){var e=o(this).attr("data-fate-armor-name"),n=parseInt(o(this).attr("data-fate-light"));(!t.has(e)||t.get(e)<n)&&t.set(e,n),o(this).attr("data-fate-infusable",!1)}),o("."+e).find('[data-fate-armor-registered="true"').each(function(){var e=o(this).attr("data-fate-armor-name"),n=parseInt(o(this).attr("data-fate-light"));o(this).attr("data-fate-infusable",t.has(e)&&t.get(e)>n)})})}const i=t("fateBus.js");i.registerModule(n);var o=t("jquery");t("logger.js");i.subscribe(n,"fate.refresh",function(){
// logger.log('infusion.js: Calculating infusables');
r()});var a=["bucket-1498876634",// Primary
"bucket-2465295065",// Secondary
"bucket-953998645",// Power
"bucket-215593132"],s=["bucket-3448274439",// Helm
"bucket-3551918588",// Gloves
"bucket-14239492",// Chest
"bucket-20886954",// Legs
"bucket-1585787867"]}),require.register("itemDataRefresher.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}const a=t("fateBus.js");a.registerModule(n);var s=t("logger"),u=t("blueimp-md5");e.ItemDataRefresher=/*#__PURE__*/
function(){function e(t,i,o){r(this,e),this.itemType=t,this.dataTSVURL=i,this.subscriptionFunction=this.refresh.bind(this);var s=void 0===o?"fate.itemDataStale":o;a.subscribe(n,s,this.subscriptionFunction),a.subscribe(n,"fate.configurationLoaded",this.deregister.bind(this))}return o(e,[{key:"onLoadHandler",value:function(e){if(400==e.status)return void s.log("itemDataRefresher.js ("+this.itemType+"): Google Sheet is currently unavailable; skipping this refresh");var t=e.responseText,r=u(t);if(this.rawDataMD5===r)return s.log("itemDataRefresher.js ("+this.itemType+"): Checksums match, skipping refresh"),void a.publish(n,"fate."+this.itemType+"DataUpdated");this.rawDataMD5=r,s.log("itemDataRefresher.js ("+this.itemType+"): Modified data, triggering refresh");var i=t.substring(t.indexOf("\n")+1);i=i.substring(i.indexOf("\n")+1),a.publish(n,"fate."+this.itemType+"DataFetched",i),a.publish(n,"fate.refresh")}},{key:"onErrorHandler",value:function(e){s.log("itemDataRefresher.js ("+this.itemType+"): Error retrieving Google Sheet; skipping this refresh")}},{key:"onAbortHandler",value:function(e){s.log("itemDataRefresher.js ("+this.itemType+"): Abort while retrieving Google Sheet; skipping this refresh")}},{key:"refresh",value:function(){GM_xmlhttpRequest({method:"GET",url:this.dataTSVURL,onload:this.onLoadHandler.bind(this),onerror:this.onErrorHandler.bind(this),onabort:this.onAbortHandler.bind(this)})}},{key:"deregister",value:function(){a.unsubscribeFunctionFromAllTopics(this.subscriptionFunction)}}]),e}()}),require.register("itemDatabase.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}const a=t("fateBus.js");a.registerModule(n);var s=t("logger"),u=/*#__PURE__*/
function(){function e(t){r(this,e),this.itemType=t,this.itemMap=new Map,a.subscribe(n,"fate."+this.itemType+"DataFetched",this.refresh.bind(this))}return o(e,[{key:"refresh",value:function(e,t){this.itemMap.clear();var r=t.split(/[\r\n]+/),i=!0,o=!1,u=void 0;try{for(var c,l=r[Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var f=c.value;this.createItemFromData(f.split("\t"))}}catch(d){o=!0,u=d}finally{try{i||null==l["return"]||l["return"]()}finally{if(o)throw u}}a.publish(n,"fate."+this.itemType+"DataUpdated"),s.log("itemDatabase.js ("+this.itemType+"): Found ("+r.length+") items")}},{key:"createItemFromData",value:function(e){}},{key:"contains",value:function(e){return this.itemMap.has(e)}},{key:"get",value:function(e){return this.itemMap.get(e)}}]),e}();e.ItemDatabase=u}),require.register("itemIdCopy.js",function(e,t,n){function r(){a("[data-fate-serial]").not("[data-fate-copy-init]").each(function(){a(this).attr("data-fate-copy-init",!0),Mousetrap.bind("s",function(){var e=a(document.elementFromPoint(s,u)),t=e;t.is("[data-fate-serial]")||(t=a(e.parents("[data-fate-serial]")[0]));var n=t.attr("data-fate-serial"),r=t.attr("data-fate-weapon-name"),o=t.attr("data-fate-armor-name"),c=void 0===r?o:r;i(n),a.toast({text:'<span style="font-size:16px;"><strong>'+c+"</strong> serial number copied to clipboard</span>"})},"keypress"),Mousetrap.bind("n",function(){var e=a(document.elementFromPoint(s,u)),t=e;t.is("[data-fate-serial]")||(t=a(e.parents("[data-fate-serial]")[0]));var n=t.attr("data-fate-weapon-name"),r=t.attr("data-fate-armor-name"),o=void 0===n?r:n;i(o),a.toast({text:'<span style="font-size:16px;"><strong>'+o+"</strong> copied to clipboard</span>"})},"keypress")})}/*
I'd prefer to use clipboard-js, but that only supports click-initiated events
and they won't be implementing other event sources. See this Issue for more:

  https://github.com/zenorocha/clipboard.js/issues/370

That being the case, will implement it ourselves using the guide here:

  https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
*/
function i(e){var t=document.createElement("textarea");// Create a <textarea> element
t.value=e,// Set its value to the string that you want copied
t.setAttribute("readonly",""),// Make it readonly to be tamper-proof
t.style.position="absolute",t.style.left="-9999px",// Move outside the screen to make it invisible
document.body.appendChild(t);// Append the <textarea> element to the HTML document
var n=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);// Mark as false to know no selection existed before
t.select(),// Select the <textarea> content
document.execCommand("copy"),// Copy - only works as a result of a user action (e.g. click events)
document.body.removeChild(t),// Remove the <textarea> element
n&&(
// If a selection existed before copying
document.getSelection().removeAllRanges(),// Unselect everything on the HTML document
document.getSelection().addRange(n))}const o=t("fateBus.js");o.registerModule(n);var a=(t("logger.js"),jQuery=t("jquery"));t("jquery-toast-plugin");var s,u;a("body").mousemove(function(e){
// When scrolling, need to take viewport in to account
s=e.pageX-window.pageXOffset,u=e.pageY-window.pageYOffset}),o.subscribe(n,"fate.refresh",function(){
// logger.log('itemIdCopy.js: Registering copy on all weapons');
r()})}),require.register("logger.js",function(e,t,n){function r(e){a=e}function i(e){a&&GM_log("[FATE] "+e)}const o=t("fateBus.js");o.registerModule(n);var a;r(!1),e.setEnabled=r,e.log=i}),require.register("main.js",function(e,t,n){const r=t("fateBus.js");/*
  The nicest change-refresh flow means loading the development version of
  the script from Tampermonkey while editing. This lets us skip kicking off
  the app when running under Karma.
*/
if(r.registerModule(n),
// Install the configuration interface and set default values
t("configuration.js"),// Use DIM styling overrides and our own custom styling
t("beautification.js"),// Show dupes
t("dupeIndicator.js"),// Show infusables
t("infusionIndicator.js"),// What item in each slot has the highest light?
t("maxLightIndicator.js"),// Retrieve and publish data for all item types
t("itemDataRefresher.js"),// Copy-to-clipboard support for the serial number
t("itemIdCopy.js"),t("shaderDecorator.js"),t("shader.js"),t("shaderDatabase.js"),t("shaderDataRefresher.js"),t("weaponDecorator.js"),t("weaponRollAssessment.js"),t("weaponRollDatabase.js"),t("weaponRollDataRefresher.js"),t("armorDecorator.js"),t("armorRoll.js"),t("armorRollDatabase.js"),t("armorRollDataRefresher.js"),t("indicators.js"),!window.navigator.userAgent.includes("HeadlessChrome")){var i=t("logger"),o=t("jquery");i.setEnabled(!0),i.log("main.js: Initializing"),// One-time configuration (CSS, data URLs, etc.)
r.publish(n,"fate.init"),// Refresh from Google Sheets
r.publish(n,"fate.itemDataStale");// First update, ASAP
var a=setInterval(function(){o(".item-img").length>1&&(clearInterval(a),r.publish(n,"fate.refresh"))},100);// Update from Google Sheets every so often, but it doesn't refresh cache all
// that often so we can chill out for a bit
setInterval(function(){r.publish(n,"fate.itemDataStale")},6e4),// When we move items around, delete items, etc. they need to be refreshed
setInterval(function(){r.publish(n,"fate.refresh")},3e3)}}),require.register("maxLightIndicator.js",function(e,t,n){// Store the maximum light level of each slot
function r(){u.forEach(function(e){var t=0;s("."+e).find("[data-fate-light]").each(function(){t=Math.max(t,parseInt(s(this).attr("data-fate-light")))});var n=e+"-maxLight";sessionStorage.setItem(n,t)})}function i(){var e=u.map(function(e){return parseInt(sessionStorage.getItem(e+"-maxLight"))}),t=e.reduce(function(e,t){return Math.min(e,t)}),n=!e.some(function(e){return e!=t});t=n?0:t,u.forEach(function(e){var n=e+"-maxLight",r=parseInt(sessionStorage.getItem(n)),i="#fate-max-light-"+e,o=parseInt(s(i).text());r!=o&&s(i).text(r),r===t?s(i).addClass("min-light"):s(i).removeClass("min-light")})}function o(){s("#max-light").length>0||s(".store-header .store-cell.vault").append('\n    <div id=\'max-light\'>\n      <table>\n        <tr>\n          <th>Kin</th>\n          <th>Ene</th>\n          <th>Pwr</th>\n          <th class="max-light-buffer"></th>\n          <th>Hel</th>\n          <th>Glo</th>\n          <th>Che</th>\n          <th>Leg</th>\n          <th>Cls</th>\n        </tr>\n        <tr>\n          <td id="fate-max-light-bucket-1498876634">1000</td>\n          <td id="fate-max-light-bucket-2465295065">1000</td>\n          <td id="fate-max-light-bucket-953998645">1000</td>\n          <td class="max-light-buffer"></td>\n          <td id="fate-max-light-bucket-3448274439">1000</td>\n          <td id="fate-max-light-bucket-3551918588">1000</td>\n          <td id="fate-max-light-bucket-14239492">1000</td>\n          <td id="fate-max-light-bucket-20886954">1000</td>\n          <td id="fate-max-light-bucket-1585787867">1000</td>\n        </tr>\n      </table>\n    </div>')}const a=t("fateBus.js");a.registerModule(n);var s=t("jquery"),u=(t("logger.js"),["bucket-1498876634",// Kinetic
"bucket-2465295065",// Energy
"bucket-953998645",// Power
"bucket-3448274439",// Helm
"bucket-3551918588",// Gloves
"bucket-14239492",// Chest
"bucket-20886954",// Legs
"bucket-1585787867"]);a.subscribe(n,"fate.refresh",function(){
// logger.log('maxLightIndicator.js: Calculating maximum light per slot');
return o(),GM_config.get("maxLightLevelTracking")?(r(),i(),void s("#max-light").show()):void s("#max-light").hide()})}),require.register("shader.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}const a=t("fateBus.js");a.registerModule(n);var s={NO:"n",YES:"y",UNKNOWN:"?"},u=/*#__PURE__*/
function(){function e(t,n,i){r(this,e),this.name=t,this.keep=n.toLowerCase(),this.comments=i}return o(e,[{key:"keepStatus",get:function(){switch(this.keep){case"y":return s.YES;case"n":return s.NO;default:return s.UNKNOWN}}}]),e}();e.Shader=u,e.Keep=s}),require.register("shaderDataRefresher.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("itemDataRefresher.js");r.subscribe(n,"fate.configurationLoaded",function(e,t){new i.ItemDataRefresher("shader",t.shaderDataTSV)})}),require.register("shaderDatabase.js",function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}return function(){var n,r=d(e);if(t()){var i=d(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return l(this,n)}}function l(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?f(e):t}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}const p=t("fateBus.js");p.registerModule(n);var h=(t("logger"),t("itemDatabase.js")),g=t("shader.js"),m=/*#__PURE__*/
function(e){function t(){return i(this,t),n.call(this,"shader")}s(t,e);var n=c(t);return a(t,[{key:"createItemFromData",value:function(e){this.itemMap.set(e[0],new g.Shader(e[0],e[1],e[2]))}}]),t}(h.ItemDatabase);e.shaderDB=new m}),require.register("shaderDecorator.js",function(e,t,n){function r(){o(".bucket-2973005342").find(".item").each(function(){var e=o(this).attr("title").split("\n")[0];o(this).attr("data-fate-shader-name",e);var t=s.contains(e);if(o(this).attr("data-fate-shader-registered",t),!t)return o(this).removeAttr("data-fate-comment"),void o(this).removeAttr("data-fate-shader-keep");var n=s.get(e);switch(n.keepStatus){case a.Keep.YES:o(this).attr("data-fate-shader-keep",!0);break;case a.Keep.NO:o(this).attr("data-fate-shader-keep",!1);break;case a.Keep.UNKNOWN:o(this).attr("data-fate-shader-keep","unknown")}o(this).attr("data-fate-comment",n.comments)})}const i=t("fateBus.js");i.registerModule(n);var o=t("jquery"),a=t("shader.js"),s=t("shaderDatabase.js").shaderDB;i.subscribe(n,"fate.refresh",function(){r()})}),require.register("weaponDecorator.js",function(e,t,n){function r(){l.forEach(function(e){a("."+e).find(".item").not("[data-fate-weapon-registered]").each(function(){a(this).attr("data-fate-weapon-registered",!1);var e=a(this).attr("title").split("\n")[0];a(this).attr("data-fate-weapon-name",e);// Is it an exotic or legendary masterwork?
var t=a(this).has("._2aTlr").length+a(this).has("._3kP4m").length>0;a(this).attr("data-fate-masterwork",t);var n=a(this).attr("id").split("-")[0];a(this).attr("data-fate-serial",n);var r=a(this).find(c).children("span").text();a(this).attr("data-fate-light",r)})})}function i(){a("[data-fate-weapon-registered]").each(function(e,t){var n=a(this).attr("data-fate-serial"),r=a(this).attr("data-fate-weapon-name");a(this).attr("title",r);var i=a(this).find(c).children("span").text();a(this).attr("data-fate-light",i);var o=a.map(a(this).find("span.app-icon"),function(e,t){var n=a(e).attr("class").split(" ").filter(function(e){return e.startsWith("fa-")})[0];return n.replace("fa-","")}),l=o.includes("ban");a(this).attr("data-fate-dimtag-junk",l);var f=o.includes("archive");a(this).attr("data-fate-dimtag-archive",f);var d=o.includes("tag");a(this).attr("data-fate-dimtag-keep",d);var p=o.includes("bolt");a(this).attr("data-fate-dimtag-infuse",p);var h="not-registered";o.includes("thumbs-up")?h="accepted":o.includes("thumbs-down")&&(h="rejected"),a(this).attr("data-fate-wishlist-status",h);var g=s.contains(n);if(a(this).attr("data-fate-weapon-registered",g),!g)return a(this).attr("title",r),a(this).removeAttr("data-fate-comment"),a(this).removeAttr("data-fate-weapon-junk"),a(this).removeAttr("data-fate-weapon-pve"),void a(this).removeAttr("data-fate-weapon-pvp");var m=s.get(n);a(this).attr("data-fate-weapon-junk",m.pveUtility===u.NO&&m.pvpUtility===u.NO),a(this).attr("data-fate-weapon-pve",m.pveUtility===u.YES),a(this).attr("data-fate-weapon-pvp",m.pvpUtility===u.YES),a(this).attr("data-fate-comment",m.comments),""!==m.comments&&a(this).attr("title","".concat(r,"\n").concat(m.comments))})}const o=t("fateBus.js");o.registerModule(n);var a=t("jquery"),s=t("weaponRollDatabase.js").weaponRollDB,u=t("weaponRollAssessment.js").Utility,c="._7AyRH",l=["bucket-1498876634",// Kinetic
"bucket-2465295065",// Energy
"bucket-953998645",// Power
"bucket-215593132"];o.subscribe(n,"fate.refresh",function(){r(),i()})}),require.register("weaponRollAssessment.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}const a=t("fateBus.js");a.registerModule(n);var s={NO:"n",YES:"y",UNKNOWN:"?"},u=/*#__PURE__*/
function(){function e(t,n,i,o,a,s){r(this,e),this.rollID=t,this.name=n,this.season=i,this.pve=o.toLowerCase(),this.pvp=a.toLowerCase(),this.comments=s}return o(e,[{key:"pveUtility",get:function(){return e.mapToStatus(this.pve)}},{key:"pvpUtility",get:function(){return e.mapToStatus(this.pvp)}}],[{key:"mapToStatus",value:function(e){switch(e){case"y":return s.YES;case"n":return s.NO;default:return s.UNKNOWN}}}]),e}();e.WeaponRollAssessment=u,e.Utility=s}),require.register("weaponRollDataRefresher.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("itemDataRefresher.js");r.subscribe(n,"fate.configurationLoaded",function(e,t){new i.ItemDataRefresher("weaponRoll",t.rollDataTSV)})}),require.register("weaponRollDatabase.js",function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}return function(){var n,r=d(e);if(t()){var i=d(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return l(this,n)}}function l(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?f(e):t}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}const p=t("fateBus.js");p.registerModule(n);var h=(t("logger"),t("itemDatabase.js")),g=t("weaponRollAssessment.js"),m=/*#__PURE__*/
function(e){function t(){return i(this,t),n.call(this,"weaponRoll")}s(t,e);var n=c(t);return a(t,[{key:"createItemFromData",value:function(e){this.itemMap.set(e[0],new g.WeaponRollAssessment(e[0],e[1],e[2],e[3],e[4],e[5]))}}]),t}(h.ItemDatabase);e.weaponRollDB=new m}),require.alias("blueimp-md5/js/md5.js","blueimp-md5"),require.alias("jquery/dist/jquery.js","jquery"),require.alias("jquery-toast-plugin/dist/jquery.toast.min.js","jquery-toast-plugin"),require.alias("process/browser.js","process"),require.alias("pubsub-js/src/pubsub.js","pubsub-js"),e=require("process"),require.register("___globals___",function(e,t,n){})}(),require("___globals___"),GM_configStruct.prototype={
// Support old method of initalizing
init:function(){GM_configInit(this,arguments),this.onInit()},
// call GM_config.open() from your script to open the menu
open:function(){
// Function to build the mighty config window :)
function e(e,t){var r=n.create,i=n.fields,o=n.id,a=r("div",{id:o+"_wrapper"});
// Append the style which is our default style plus the user style
t.appendChild(r("style",{type:"text/css",textContent:n.css.basic+n.css.stylish})),
// Add header and title
a.appendChild(r("div",{id:o+"_header",className:"config_header block center"},n.title));
// Append elements
var s=a,u=0;// Section count
// loop through fields
for(var c in i){var l=i[c],f=l.settings;f.section&&(// the start of a new section
s=a.appendChild(r("div",{className:"section_header_holder",id:o+"_section_"+u})),"[object Array]"!==Object.prototype.toString.call(f.section)&&(f.section=[f.section]),f.section[0]&&s.appendChild(r("div",{className:"section_header center",id:o+"_section_header_"+u},f.section[0])),f.section[1]&&s.appendChild(r("p",{className:"section_desc center",id:o+"_section_desc_"+u},f.section[1])),++u),
// Create field elements and append to current section
s.appendChild(l.wrapper=l.toNode())}
// Add save and close buttons
a.appendChild(r("div",{id:o+"_buttons_holder"},r("button",{id:o+"_saveBtn",textContent:"Save",title:"Save settings",className:"saveclose_buttons",onclick:function(){n.save()}}),r("button",{id:o+"_closeBtn",textContent:"Close",title:"Close window",className:"saveclose_buttons",onclick:function(){n.close()}}),r("div",{className:"reset_holder block"},
// Reset link
r("a",{id:o+"_resetLink",textContent:"Reset to defaults",href:"#",title:"Reset fields to default values",className:"reset",onclick:function(e){e.preventDefault(),n.reset()}})))),e.appendChild(a),// Paint everything to window at once
n.center(),// Show and center iframe
window.addEventListener("resize",n.center,!1),// Center frame on resize
// Call the open() callback function
n.onOpen(n.frame.contentDocument||n.frame.ownerDocument,n.frame.contentWindow||window,n.frame),
// Close frame on window close
window.addEventListener("beforeunload",function(){n.close()},!1),
// Now that everything is loaded, make it visible
n.frame.style.display="block",n.isOpen=!0}
// Die if the menu is already open on this page
// You can have multiple instances but you can't open the same instance twice
var t=document.getElementById(this.id);if(!t||!("IFRAME"==t.tagName||t.childNodes.length>0)){
// Sometimes "this" gets overwritten so create an alias
var n=this,r="bottom: auto; border: 1px solid #000; display: none; height: 75%; left: 0; margin: 0; max-height: 95%; max-width: 95%; opacity: 0; overflow: auto; padding: 0; position: fixed; right: auto; top: 0; width: 75%; z-index: 9999;";
// Either use the element passed to init() or create an iframe
this.frame?(this.frame.id=this.id,// Allows for prefixing styles with the config id
this.frame.setAttribute("style",r),e(this.frame,this.frame.ownerDocument.getElementsByTagName("head")[0])):(
// Create frame
document.body.appendChild(this.frame=this.create("iframe",{id:this.id,style:r})),
// In WebKit src can't be set until it is added to the page
this.frame.src="about:blank",
// we wait for the iframe to load before we can modify it
this.frame.addEventListener("load",function(t){var r=n.frame,i=r.contentDocument.getElementsByTagName("body")[0];i.id=n.id,// Allows for prefixing styles with the config id
e(i,r.contentDocument.getElementsByTagName("head")[0])},!1))}},save:function(){var e=this.write();this.onSave(e)},close:function(){
// If frame is an iframe then remove it
this.frame.contentDocument?(this.remove(this.frame),this.frame=null):(// else wipe its content
this.frame.innerHTML="",this.frame.style.display="none");
// Null out all the fields so we don't leak memory
var e=this.fields;for(var t in e){var n=e[t];n.wrapper=null,n.node=null}this.onClose(),//  Call the close() callback function
this.isOpen=!1},set:function(e,t){this.fields[e].value=t,this.fields[e].node&&this.fields[e].reload()},get:function(e,t){var n=this.fields[e],r=null;return t&&n.node&&(r=n.toValue()),null!=r?r:n.value},write:function(e,t){if(!t){var n={},r={},i=this.fields;for(var o in i){var a=i[o],s=a.toValue();a.save?null!=s?(n[o]=s,a.value=s):n[o]=a.value:r[o]=s}}try{this.setValue(e||this.id,this.stringify(t||n))}catch(u){this.log("GM_config failed to save settings!")}return r},read:function(e){try{var t=this.parser(this.getValue(e||this.id,"{}"))}catch(n){this.log("GM_config failed to read saved settings!");var t={}}return t},reset:function(){var e=this.fields;
// Reset all the fields
for(var t in e)e[t].reset();this.onReset()},create:function(){switch(arguments.length){case 1:var e=document.createTextNode(arguments[0]);break;default:var e=document.createElement(arguments[0]),t=arguments[1];for(var n in t)0==n.indexOf("on")?e.addEventListener(n.substring(2),t[n],!1):",style,accesskey,id,name,src,href,which,for".indexOf(","+n.toLowerCase())!=-1?e.setAttribute(n,t[n]):e[n]=t[n];if("string"==typeof arguments[2])e.innerHTML=arguments[2];else for(var r=2,i=arguments.length;r<i;++r)e.appendChild(arguments[r])}return e},center:function(){var e=this.frame;if(e){var t=e.style;t.opacity;"none"==t.display&&(t.opacity="0"),t.display="",t.top=Math.floor(window.innerHeight/2-e.offsetHeight/2)+"px",t.left=Math.floor(window.innerWidth/2-e.offsetWidth/2)+"px",t.opacity="1"}},remove:function(e){e&&e.parentNode&&e.parentNode.removeChild(e)}},
// Define a bunch of API stuff
function(){var e,t,n,r,i="undefined"!=typeof GM_getValue&&"undefined"!=typeof GM_getValue("a","b");
// Define value storing and reading API
i?(e=GM_setValue,t=GM_getValue,n="undefined"==typeof JSON?function(e){return e.toSource()}:JSON.stringify,r="undefined"==typeof JSON?function(e){return new Function("return "+e+";")()}:JSON.parse):(e=function(e,t){return localStorage.setItem(e,t)},t=function(e,t){var n=localStorage.getItem(e);return null==n?t:n},
// We only support JSON parser outside GM
n=JSON.stringify,r=JSON.parse),GM_configStruct.prototype.isGM=i,GM_configStruct.prototype.setValue=e,GM_configStruct.prototype.getValue=t,GM_configStruct.prototype.stringify=n,GM_configStruct.prototype.parser=r,GM_configStruct.prototype.log=window.console?console.log:i&&"undefined"!=typeof GM_log?GM_log:window.opera?opera.postError:function(){}}(),GM_configField.prototype={create:GM_configStruct.prototype.create,toNode:function(){function e(e,t,n,r){switch(r||(r=n.firstChild),e){case"right":case"below":"below"==e&&n.appendChild(c("br",{})),n.appendChild(t);break;default:"above"==e&&n.insertBefore(c("br",{}),r),n.insertBefore(t,r)}}var t,n=this.settings,r=this.value,i=n.options,o=n.type,a=this.id,s=this.configId,u=n.labelPos,c=this.create,l=c("div",{className:"config_var",id:s+"_"+a+"_var",title:n.title||""});
// Retrieve the first prop
for(var f in n){t=f;break}var d=n.label&&"button"!=o?c("label",{id:s+"_"+a+"_field_label","for":s+"_field_"+a,className:"field_label"},n.label):null;switch(o){case"textarea":l.appendChild(this.node=c("textarea",{innerHTML:r,id:s+"_field_"+a,className:"block",cols:n.cols?n.cols:20,rows:n.rows?n.rows:2}));break;case"radio":var p=c("div",{id:s+"_field_"+a});this.node=p;for(var f=0,h=i.length;f<h;++f){var g=c("label",{className:"radio_label"},i[f]),m=p.appendChild(c("input",{value:i[f],type:"radio",name:a,checked:i[f]==r})),v=!u||"left"!=u&&"right"!=u?"options"==t?"left":"right":u;e(v,g,p,m)}l.appendChild(p);break;case"select":var p=c("select",{id:s+"_field_"+a});this.node=p;for(var f=0,h=i.length;f<h;++f){var y=i[f];p.appendChild(c("option",{value:y,selected:y==r},y))}l.appendChild(p);break;default:// fields using input elements
var b={id:s+"_field_"+a,type:o,value:"button"==o?n.label:r};switch(o){case"checkbox":b.checked=r;break;case"button":b.size=n.size?n.size:25,n.script&&(n.click=n.script),n.click&&(b.onclick=n.click);break;case"hidden":break;default:
// type = text, int, or float
b.type="text",b.size=n.size?n.size:25}l.appendChild(this.node=c("input",b))}
// If the label is passed first, insert it before the field
// else insert it after
return d&&(u||(u="label"==t||"radio"==o?"left":"right"),e(u,d,l)),l},toValue:function(){var e=this.node,t=this.settings,n=t.type,r=!1,i=null;if(!e)return i;switch(0==n.indexOf("unsigned ")&&(n=n.substring(9),r=!0),n){case"checkbox":i=e.checked;break;case"select":i=e[e.selectedIndex].value;break;case"radio":for(var o=e.getElementsByTagName("input"),a=0,s=o.length;a<s;++a)o[a].checked&&(i=o[a].value);break;case"button":break;case"int":case"integer":case"float":case"number":var u=Number(e.value),c='Field labeled "'+t.label+'" expects a'+(r?" positive ":"n ")+"integer value";if(isNaN(u)||"int"==n.substr(0,3)&&Math.ceil(u)!=Math.floor(u)||r&&u<0)return alert(c+"."),null;if(!this._checkNumberRange(u,c))return null;i=u;break;default:i=e.value}return i},reset:function(){var e=this.node,t=this.settings,n=t.type;if(e)switch(n){case"checkbox":e.checked=this["default"];break;case"select":for(var r=0,i=e.options.length;r<i;++r)e.options[r].textContent==this["default"]&&(e.selectedIndex=r);break;case"radio":for(var o=e.getElementsByTagName("input"),r=0,i=o.length;r<i;++r)o[r].value==this["default"]&&(o[r].checked=!0);break;case"button":break;default:e.value=this["default"]}},remove:function(e){GM_configStruct.prototype.remove(e||this.wrapper),this.wrapper=null,this.node=null},reload:function(){var e=this.wrapper;if(e){var t=e.parentNode;t.insertBefore(this.wrapper=this.toNode(),e),this.remove(e)}},_checkNumberRange:function(e,t){var n=this.settings;return"number"==typeof n.min&&e<n.min?(alert(t+" greater than or equal to "+n.min+"."),null):!("number"==typeof n.max&&e>n.max)||(alert(t+" less than or equal to "+n.max+"."),null)}};
// Create default instance of GM_config
var GM_config=new GM_configStruct;require("main.js");