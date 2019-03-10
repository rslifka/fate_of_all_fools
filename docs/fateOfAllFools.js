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
r&&(this.toNode=r.toNode,this.toValue=r.toValue,this.reset=r.reset)}!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},r={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,t){for(var n,r=[],i=(o.test(t)?e+"/"+t:t).split("/"),a=0,s=i.length;a<s;a++)n=i[a],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(n){var r=a(s(t),n);return e.require(r,t)}},c=function(e,t){var r=m&&m.createHot(e),i={id:e,exports:{},hot:r};return n[e]=i,t(i.exports,u(e),i),i.exports},l=function(e){return r[e]?l(r[e]):e},f=function(e,t){return l(a(s(e),t))},d=function(e,r){null==r&&(r="/");var o=l(e);if(i.call(n,o))return n[o].exports;if(i.call(t,o))return c(o,t[o]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e};var p=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,g=function(e){if(p.test(e)){var t=e.replace(p,"");i.call(r,t)&&r[t].replace(p,"")!==t+"/index"||(r[t]=e)}if(h.test(e)){var n=e.replace(h,"");i.call(r,n)||(r[n]=e)}};d.register=d.define=function(e,r){if(e&&"object"==typeof e)for(var o in e)i.call(e,o)&&d.register(o,e[o]);else t[e]=r,delete n[e],g(e)},d.list=function(){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e};var m=e._hmr&&new e._hmr(f,d,t,n);d._cache=n,d.hmr=m&&m.wrap,d.brunch=!0,e.require=d}}(),function(){var e,t=("undefined"==typeof window?this:window,function(e,t,n){var r={},i=function(t,n){var o;try{return o=e(n+"/node_modules/"+t)}catch(a){if(a.toString().indexOf("Cannot find module")===-1)throw a;if(n.indexOf("node_modules")!==-1){var s=n.split("/"),u=s.lastIndexOf("node_modules"),c=s.slice(0,u).join("/");return i(t,c)}}return r};return function(o){if(o in t&&(o=t[o]),o){if("."!==o[0]&&n){var a=i(o,n);if(a!==r)return a}return e(o)}}});require.register("blueimp-md5/js/md5.js",function(e,n,r){n=t(n,{},"blueimp-md5"),function(){!function(e){"use strict";/*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
function t(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}/*
  * Bitwise rotate a 32-bit number to the left.
  */
function n(e,t){return e<<t|e>>>32-t}/*
  * These functions implement the four basic operations the algorithm uses.
  */
function i(e,r,i,o,a,s){return t(n(t(t(r,e),t(o,s)),a),i)}function o(e,t,n,r,o,a,s){return i(t&n|~t&r,e,t,o,a,s)}function a(e,t,n,r,o,a,s){return i(t&r|n&~r,e,t,o,a,s)}function s(e,t,n,r,o,a,s){return i(t^n^r,e,t,o,a,s)}function u(e,t,n,r,o,a,s){return i(n^(t|~r),e,t,o,a,s)}/*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
function c(e,n){/* append padding */
e[n>>5]|=128<<n%32,e[(n+64>>>9<<4)+14]=n;var r,i,c,l,f,d=1732584193,p=-271733879,h=-1732584194,g=271733878;for(r=0;r<e.length;r+=16)i=d,c=p,l=h,f=g,d=o(d,p,h,g,e[r],7,-680876936),g=o(g,d,p,h,e[r+1],12,-389564586),h=o(h,g,d,p,e[r+2],17,606105819),p=o(p,h,g,d,e[r+3],22,-1044525330),d=o(d,p,h,g,e[r+4],7,-176418897),g=o(g,d,p,h,e[r+5],12,1200080426),h=o(h,g,d,p,e[r+6],17,-1473231341),p=o(p,h,g,d,e[r+7],22,-45705983),d=o(d,p,h,g,e[r+8],7,1770035416),g=o(g,d,p,h,e[r+9],12,-1958414417),h=o(h,g,d,p,e[r+10],17,-42063),p=o(p,h,g,d,e[r+11],22,-1990404162),d=o(d,p,h,g,e[r+12],7,1804603682),g=o(g,d,p,h,e[r+13],12,-40341101),h=o(h,g,d,p,e[r+14],17,-1502002290),p=o(p,h,g,d,e[r+15],22,1236535329),d=a(d,p,h,g,e[r+1],5,-165796510),g=a(g,d,p,h,e[r+6],9,-1069501632),h=a(h,g,d,p,e[r+11],14,643717713),p=a(p,h,g,d,e[r],20,-373897302),d=a(d,p,h,g,e[r+5],5,-701558691),g=a(g,d,p,h,e[r+10],9,38016083),h=a(h,g,d,p,e[r+15],14,-660478335),p=a(p,h,g,d,e[r+4],20,-405537848),d=a(d,p,h,g,e[r+9],5,568446438),g=a(g,d,p,h,e[r+14],9,-1019803690),h=a(h,g,d,p,e[r+3],14,-187363961),p=a(p,h,g,d,e[r+8],20,1163531501),d=a(d,p,h,g,e[r+13],5,-1444681467),g=a(g,d,p,h,e[r+2],9,-51403784),h=a(h,g,d,p,e[r+7],14,1735328473),p=a(p,h,g,d,e[r+12],20,-1926607734),d=s(d,p,h,g,e[r+5],4,-378558),g=s(g,d,p,h,e[r+8],11,-2022574463),h=s(h,g,d,p,e[r+11],16,1839030562),p=s(p,h,g,d,e[r+14],23,-35309556),d=s(d,p,h,g,e[r+1],4,-1530992060),g=s(g,d,p,h,e[r+4],11,1272893353),h=s(h,g,d,p,e[r+7],16,-155497632),p=s(p,h,g,d,e[r+10],23,-1094730640),d=s(d,p,h,g,e[r+13],4,681279174),g=s(g,d,p,h,e[r],11,-358537222),h=s(h,g,d,p,e[r+3],16,-722521979),p=s(p,h,g,d,e[r+6],23,76029189),d=s(d,p,h,g,e[r+9],4,-640364487),g=s(g,d,p,h,e[r+12],11,-421815835),h=s(h,g,d,p,e[r+15],16,530742520),p=s(p,h,g,d,e[r+2],23,-995338651),d=u(d,p,h,g,e[r],6,-198630844),g=u(g,d,p,h,e[r+7],10,1126891415),h=u(h,g,d,p,e[r+14],15,-1416354905),p=u(p,h,g,d,e[r+5],21,-57434055),d=u(d,p,h,g,e[r+12],6,1700485571),g=u(g,d,p,h,e[r+3],10,-1894986606),h=u(h,g,d,p,e[r+10],15,-1051523),p=u(p,h,g,d,e[r+1],21,-2054922799),d=u(d,p,h,g,e[r+8],6,1873313359),g=u(g,d,p,h,e[r+15],10,-30611744),h=u(h,g,d,p,e[r+6],15,-1560198380),p=u(p,h,g,d,e[r+13],21,1309151649),d=u(d,p,h,g,e[r+4],6,-145523070),g=u(g,d,p,h,e[r+11],10,-1120210379),h=u(h,g,d,p,e[r+2],15,718787259),p=u(p,h,g,d,e[r+9],21,-343485551),d=t(d,i),p=t(p,c),h=t(h,l),g=t(g,f);return[d,p,h,g]}/*
  * Convert an array of little-endian words to a string
  */
function l(e){var t,n="",r=32*e.length;for(t=0;t<r;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}/*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
function f(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var r=8*e.length;for(t=0;t<r;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}/*
  * Calculate the MD5 of a raw string
  */
function d(e){return l(c(f(e),8*e.length))}/*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
function p(e,t){var n,r,i=f(e),o=[],a=[];for(o[15]=a[15]=void 0,i.length>16&&(i=c(i,8*e.length)),n=0;n<16;n+=1)o[n]=909522486^i[n],a[n]=1549556828^i[n];return r=c(o.concat(f(t)),512+8*t.length),l(c(a.concat(r),640))}/*
  * Convert a raw string to a hex string
  */
function h(e){var t,n,r="0123456789abcdef",i="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),i+=r.charAt(t>>>4&15)+r.charAt(15&t);return i}/*
  * Encode a string as utf-8
  */
function g(e){return unescape(encodeURIComponent(e))}/*
  * Take string arguments and return either raw or hex encoded strings
  */
function m(e){return d(g(e))}function v(e){return h(m(e))}function y(e,t){return p(g(e),g(t))}function b(e,t){return h(y(e,t))}function w(e,t,n){return t?n?y(t,e):b(t,e):n?m(e):v(e)}"function"==typeof define&&define.amd?define(function(){return w}):"object"==typeof r&&r.exports?r.exports=w:e.md5=w}(this)}()}),require.register("jquery-toast-plugin/dist/jquery.toast.min.js",function(e,n,r){n=t(n,{},"jquery-toast-plugin"),function(){"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),function(e,t,n,r){"use strict";var i={_positionClasses:["bottom-left","bottom-right","top-right","top-left","bottom-center","top-center","mid-center"],_defaultIcons:["success","error","info","warning"],init:function(t,n){this.prepareOptions(t,e.toast.options),this.process()},prepareOptions:function(t,n){var r={};"string"==typeof t||t instanceof Array?r.text=t:r=t,this.options=e.extend({},n,r)},process:function(){this.setup(),this.addToDom(),this.position(),this.bindToast(),this.animate()},setup:function(){var t="";if(this._toastEl=this._toastEl||e("<div></div>",{"class":"jq-toast-single"}),t+='<span class="jq-toast-loader"></span>',this.options.allowToastClose&&(t+='<span class="close-jq-toast-single">&times;</span>'),this.options.text instanceof Array){this.options.heading&&(t+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),t+='<ul class="jq-toast-ul">';for(var n=0;n<this.options.text.length;n++)t+='<li class="jq-toast-li" id="jq-toast-item-'+n+'">'+this.options.text[n]+"</li>";t+="</ul>"}else this.options.heading&&(t+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),t+=this.options.text;this._toastEl.html(t),this.options.bgColor!==!1&&this._toastEl.css("background-color",this.options.bgColor),this.options.textColor!==!1&&this._toastEl.css("color",this.options.textColor),this.options.textAlign&&this._toastEl.css("text-align",this.options.textAlign),this.options.icon!==!1&&(this._toastEl.addClass("jq-has-icon"),-1!==e.inArray(this.options.icon,this._defaultIcons)&&this._toastEl.addClass("jq-icon-"+this.options.icon)),this.options["class"]!==!1&&this._toastEl.addClass(this.options["class"])},position:function(){"string"==typeof this.options.position&&-1!==e.inArray(this.options.position,this._positionClasses)?"bottom-center"===this.options.position?this._container.css({left:e(t).outerWidth()/2-this._container.outerWidth()/2,bottom:20}):"top-center"===this.options.position?this._container.css({left:e(t).outerWidth()/2-this._container.outerWidth()/2,top:20}):"mid-center"===this.options.position?this._container.css({left:e(t).outerWidth()/2-this._container.outerWidth()/2,top:e(t).outerHeight()/2-this._container.outerHeight()/2}):this._container.addClass(this.options.position):"object"==typeof this.options.position?this._container.css({top:this.options.position.top?this.options.position.top:"auto",bottom:this.options.position.bottom?this.options.position.bottom:"auto",left:this.options.position.left?this.options.position.left:"auto",right:this.options.position.right?this.options.position.right:"auto"}):this._container.addClass("bottom-left")},bindToast:function(){var e=this;this._toastEl.on("afterShown",function(){e.processLoader()}),this._toastEl.find(".close-jq-toast-single").on("click",function(t){t.preventDefault(),"fade"===e.options.showHideTransition?(e._toastEl.trigger("beforeHide"),e._toastEl.fadeOut(function(){e._toastEl.trigger("afterHidden")})):"slide"===e.options.showHideTransition?(e._toastEl.trigger("beforeHide"),e._toastEl.slideUp(function(){e._toastEl.trigger("afterHidden")})):(e._toastEl.trigger("beforeHide"),e._toastEl.hide(function(){e._toastEl.trigger("afterHidden")}))}),"function"==typeof this.options.beforeShow&&this._toastEl.on("beforeShow",function(){e.options.beforeShow()}),"function"==typeof this.options.afterShown&&this._toastEl.on("afterShown",function(){e.options.afterShown()}),"function"==typeof this.options.beforeHide&&this._toastEl.on("beforeHide",function(){e.options.beforeHide()}),"function"==typeof this.options.afterHidden&&this._toastEl.on("afterHidden",function(){e.options.afterHidden()})},addToDom:function(){var t=e(".jq-toast-wrap");if(0===t.length?(t=e("<div></div>",{"class":"jq-toast-wrap"}),e("body").append(t)):(!this.options.stack||isNaN(parseInt(this.options.stack,10)))&&t.empty(),t.find(".jq-toast-single:hidden").remove(),t.append(this._toastEl),this.options.stack&&!isNaN(parseInt(this.options.stack),10)){var n=t.find(".jq-toast-single").length,r=n-this.options.stack;r>0&&e(".jq-toast-wrap").find(".jq-toast-single").slice(0,r).remove()}this._container=t},canAutoHide:function(){return this.options.hideAfter!==!1&&!isNaN(parseInt(this.options.hideAfter,10))},processLoader:function(){if(!this.canAutoHide()||this.options.loader===!1)return!1;var e=this._toastEl.find(".jq-toast-loader"),t=(this.options.hideAfter-400)/1e3+"s",n=this.options.loaderBg,r=e.attr("style")||"";r=r.substring(0,r.indexOf("-webkit-transition")),r+="-webkit-transition: width "+t+" ease-in;                       -o-transition: width "+t+" ease-in;                       transition: width "+t+" ease-in;                       background-color: "+n+";",e.attr("style",r).addClass("jq-toast-loaded")},animate:function(){var e=this;if(this._toastEl.hide(),this._toastEl.trigger("beforeShow"),"fade"===this.options.showHideTransition.toLowerCase()?this._toastEl.fadeIn(function(){e._toastEl.trigger("afterShown")}):"slide"===this.options.showHideTransition.toLowerCase()?this._toastEl.slideDown(function(){e._toastEl.trigger("afterShown")}):this._toastEl.show(function(){e._toastEl.trigger("afterShown")}),this.canAutoHide()){var e=this;t.setTimeout(function(){"fade"===e.options.showHideTransition.toLowerCase()?(e._toastEl.trigger("beforeHide"),e._toastEl.fadeOut(function(){e._toastEl.trigger("afterHidden")})):"slide"===e.options.showHideTransition.toLowerCase()?(e._toastEl.trigger("beforeHide"),e._toastEl.slideUp(function(){e._toastEl.trigger("afterHidden")})):(e._toastEl.trigger("beforeHide"),e._toastEl.hide(function(){e._toastEl.trigger("afterHidden")}))},this.options.hideAfter)}},reset:function(t){"all"===t?e(".jq-toast-wrap").remove():this._toastEl.remove()},update:function(e){this.prepareOptions(e,this.options),this.setup(),this.bindToast()}};e.toast=function(e){var t=Object.create(i);return t.init(e,this),{reset:function(e){t.reset(e)},update:function(e){t.update(e)}}},e.toast.options={text:"",heading:"",showHideTransition:"fade",allowToastClose:!0,hideAfter:3e3,loader:!0,loaderBg:"#9EC600",stack:5,position:"bottom-left",bgColor:!1,textColor:!1,textAlign:"left",icon:!1,beforeShow:function(){},afterShown:function(){},beforeHide:function(){},afterHidden:function(){}}}(jQuery,window,document)}()}),require.register("jquery/dist/jquery.js",function(e,n,r){n=t(n,{},"jquery"),function(){/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
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
"use strict";function n(e,t){t=t||ne;var n=t.createElement("script");n.text=e,t.head.appendChild(n).parentNode.removeChild(n)}function r(e){
// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var t=!!e&&"length"in e&&e.length,n=ge.type(e);return"function"!==n&&!ge.isWindow(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function i(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}
// Implement the identical functionality for filter and not
function o(e,t,n){
// Single element
// Arraylike of elements (jQuery, arguments, Array)
// Simple selector that can be filtered directly, removing non-Elements
// Complex selector, compare the two sets, removing non-Elements
return ge.isFunction(t)?ge.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?ge.grep(e,function(e){return e===t!==n}):"string"!=typeof t?ge.grep(e,function(e){return se.call(t,e)>-1!==n}):ke.test(t)?ge.filter(t,e,n):(t=ge.filter(t,e),ge.grep(e,function(e){return se.call(t,e)>-1!==n&&1===e.nodeType}))}function a(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}
// Convert String-formatted options into Object-formatted ones
function s(e){var t={};return ge.each(e.match(qe)||[],function(e,n){t[n]=!0}),t}function u(e){return e}function c(e){throw e}function l(e,t,n,r){var i;try{
// Check for promise aspect first to privilege synchronous behavior
e&&ge.isFunction(i=e.promise)?i.call(e).done(t).fail(n):e&&ge.isFunction(i=e.then)?i.call(e,t,n):
// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
t.apply(void 0,[e].slice(r))}catch(e){
// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
n.apply(void 0,[e])}}
// The ready event handler and self cleanup method
function f(){ne.removeEventListener("DOMContentLoaded",f),e.removeEventListener("load",f),ge.ready()}function d(){this.expando=ge.expando+d.uid++}function p(e){
// Only convert to a number if it doesn't change the string
return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Ie.test(e)?JSON.parse(e):e)}function h(e,t,n){var r;
// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Fe,"-$&").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n=p(n)}catch(i){}
// Make sure we set the data so it isn't changed later
Re.set(e,t,n)}else n=void 0;return n}function g(e,t,n,r){var i,o=1,a=20,s=r?function(){return r.cur()}:function(){return ge.css(e,t,"")},u=s(),c=n&&n[3]||(ge.cssNumber[t]?"":"px"),
// Starting value computation is required for potential unit mismatches
l=(ge.cssNumber[t]||"px"!==c&&+u)&&Be.exec(ge.css(e,t));if(l&&l[3]!==c){
// Trust units reported by jQuery.css
c=c||l[3],
// Make sure we update the tween properties later on
n=n||[],
// Iteratively approximate from a nonzero starting point
l=+u||1;do
// If previous iteration zeroed out, double until we get *something*.
// Use string for doubling so we don't accidentally see scale as unchanged below
o=o||".5",
// Adjust and apply
l/=o,ge.style(e,t,l+c);while(o!==(o=s()/u)&&1!==o&&--a)}
// Apply relative offset (+=/-=) if specified
return n&&(l=+l||+u||0,i=n[1]?l+(n[1]+1)*n[2]:+n[2],r&&(r.unit=c,r.start=l,r.end=i)),i}function m(e){var t,n=e.ownerDocument,r=e.nodeName,i=Ve[r];return i?i:(t=n.body.appendChild(n.createElement(r)),i=ge.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),Ve[r]=i,i)}function v(e,t){
// Determine new display value for elements that need to change
for(var n,r,i=[],o=0,a=e.length;o<a;o++)r=e[o],r.style&&(n=r.style.display,t?(
// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
// check is required in this first loop unless we have a nonempty display value (either
// inline or about-to-be-restored)
"none"===n&&(i[o]=Le.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&Ge(r)&&(i[o]=m(r))):"none"!==n&&(i[o]="none",
// Remember what we're overwriting
Le.set(r,"display",n)));
// Set the display of the elements in a second loop to avoid constant reflow
for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}function y(e,t){
// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (#15151)
var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&i(e,t)?ge.merge([e],n):n}
// Mark scripts as having already been evaluated
function b(e,t){for(var n=0,r=e.length;n<r;n++)Le.set(e[n],"globalEval",!t||Le.get(t[n],"globalEval"))}function w(e,t,n,r,i){for(var o,a,s,u,c,l,f=t.createDocumentFragment(),d=[],p=0,h=e.length;p<h;p++)if(o=e[p],o||0===o)
// Add nodes directly
if("object"===ge.type(o))
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
ge.merge(d,o.nodeType?[o]:o);else if(Ke.test(o)){for(a=a||f.appendChild(t.createElement("div")),
// Deserialize a standard representation
s=(Ue.exec(o)||["",""])[1].toLowerCase(),u=Ye[s]||Ye._default,a.innerHTML=u[1]+ge.htmlPrefilter(o)+u[2],
// Descend through wrappers to the right content
l=u[0];l--;)a=a.lastChild;
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
ge.merge(d,a.childNodes),
// Remember the top-level container
a=f.firstChild,
// Ensure the created nodes are orphaned (#12392)
a.textContent=""}else d.push(t.createTextNode(o));for(
// Remove wrapper from fragment
f.textContent="",p=0;o=d[p++];)
// Skip elements already in the context collection (trac-4087)
if(r&&ge.inArray(o,r)>-1)i&&i.push(o);else
// Capture executables
if(c=ge.contains(o.ownerDocument,o),
// Append to fragment
a=y(f.appendChild(o),"script"),
// Preserve script evaluation history
c&&b(a),n)for(l=0;o=a[l++];)Xe.test(o.type||"")&&n.push(o);return f}function x(){return!0}function j(){return!1}
// Support: IE <=9 only
// See #13393 for more info
function T(){try{return ne.activeElement}catch(e){}}function C(e,t,n,r,i,o){var a,s;
// Types can be a map of types/handlers
if("object"==typeof t){
// ( types-Object, selector, data )
"string"!=typeof n&&(
// ( types-Object, data )
r=r||n,n=void 0);for(s in t)C(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(
// ( types, fn )
i=n,r=n=void 0):null==i&&("string"==typeof n?(
// ( types, selector, fn )
i=r,r=void 0):(
// ( types, data, fn )
i=r,r=n,n=void 0)),i===!1)i=j;else if(!i)return e;
// Use same guid so caller can remove using origFn
return 1===o&&(a=i,i=function(e){
// Can use an empty set, since event contains the info
return ge().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=ge.guid++)),e.each(function(){ge.event.add(this,t,i,r,n)})}
// Prefer a tbody over its parent table for containing new rows
function k(e,t){return i(e,"table")&&i(11!==t.nodeType?t:t.firstChild,"tr")?ge(">tbody",e)[0]||e:e}
// Replace/restore the type attribute of script elements for safe DOM manipulation
function E(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function S(e){var t=it.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _(e,t){var n,r,i,o,a,s,u,c;if(1===t.nodeType){
// 1. Copy private data: events, handlers, etc.
if(Le.hasData(e)&&(o=Le.access(e),a=Le.set(t,o),c=o.events)){delete a.handle,a.events={};for(i in c)for(n=0,r=c[i].length;n<r;n++)ge.event.add(t,i,c[i][n])}
// 2. Copy user data
Re.hasData(e)&&(s=Re.access(e),u=ge.extend({},s),Re.set(t,u))}}
// Fix IE bugs, see support tests
function D(e,t){var n=t.nodeName.toLowerCase();
// Fails to persist the checked state of a cloned checkbox or radio button.
"input"===n&&ze.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function N(e,t,r,i){
// Flatten any nested arrays
t=oe.apply([],t);var o,a,s,u,c,l,f=0,d=e.length,p=d-1,h=t[0],g=ge.isFunction(h);
// We can't cloneNode fragments that contain checked, in WebKit
if(g||d>1&&"string"==typeof h&&!pe.checkClone&&rt.test(h))return e.each(function(n){var o=e.eq(n);g&&(t[0]=h.call(this,n,o.html())),N(o,t,r,i)});if(d&&(o=w(t,e[0].ownerDocument,!1,e,i),a=o.firstChild,1===o.childNodes.length&&(o=a),a||i)){
// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(s=ge.map(y(o,"script"),E),u=s.length;f<d;f++)c=o,f!==p&&(c=ge.clone(c,!0,!0),
// Keep references to cloned scripts for later restoration
u&&
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
ge.merge(s,y(c,"script"))),r.call(e[f],c,f);if(u)
// Evaluate executable scripts on first document insertion
for(l=s[s.length-1].ownerDocument,
// Reenable scripts
ge.map(s,S),f=0;f<u;f++)c=s[f],Xe.test(c.type||"")&&!Le.access(c,"globalEval")&&ge.contains(l,c)&&(c.src?
// Optional AJAX dependency, but won't run scripts if not present
ge._evalUrl&&ge._evalUrl(c.src):n(c.textContent.replace(ot,""),l))}return e}function q(e,t,n){for(var r,i=t?ge.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||ge.cleanData(y(r)),r.parentNode&&(n&&ge.contains(r.ownerDocument,r)&&b(y(r,"script")),r.parentNode.removeChild(r));return e}function A(e,t,n){var r,i,o,a,
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
return n=n||ut(e),n&&(a=n.getPropertyValue(t)||n[t],""!==a||ge.contains(e.ownerDocument,e)||(a=ge.style(e,t)),!pe.pixelMarginRight()&&st.test(a)&&at.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function M(e,t){
// Define the hook, we'll check on the first run if it's really needed.
return{get:function(){
// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}
// Return a css property mapped to a potentially vendor prefixed property
function O(e){
// Shortcut for names that are not vendor prefixed
if(e in ht)return e;for(
// Check for vendor prefixed names
var t=e[0].toUpperCase()+e.slice(1),n=pt.length;n--;)if(e=pt[n]+t,e in ht)return e}
// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function H(e){var t=ge.cssProps[e];return t||(t=ge.cssProps[e]=O(e)||e),t}function L(e,t,n){
// Any relative (+/-) values have already been
// normalized at this point
var r=Be.exec(t);
// Guard against undefined "subtract", e.g., when used as in cssHooks
return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function R(e,t,n,r,i){var o,a=0;for(
// If we already have the right measurement, avoid augmentation
o=n===(r?"border":"content")?4:"width"===t?1:0;o<4;o+=2)
// Both box models exclude margin, so add it if we want it
"margin"===n&&(a+=ge.css(e,n+We[o],!0,i)),r?(
// border-box includes padding, so remove it if we want content
"content"===n&&(a-=ge.css(e,"padding"+We[o],!0,i)),
// At this point, extra isn't border nor margin, so remove border
"margin"!==n&&(a-=ge.css(e,"border"+We[o]+"Width",!0,i))):(
// At this point, extra isn't content, so add padding
a+=ge.css(e,"padding"+We[o],!0,i),
// At this point, extra isn't content nor padding, so add border
"padding"!==n&&(a+=ge.css(e,"border"+We[o]+"Width",!0,i)));return a}function I(e,t,n){
// Start with computed style
var r,i=ut(e),o=A(e,t,i),a="border-box"===ge.css(e,"boxSizing",!1,i);
// Computed unit is not pixels. Stop here and return.
// Computed unit is not pixels. Stop here and return.
// Check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
// Fall back to offsetWidth/Height when value is "auto"
// This happens for inline elements with no explicit setting (gh-3571)
// Normalize "", auto, and prepare for extra
return st.test(o)?o:(r=a&&(pe.boxSizingReliable()||o===e.style[t]),"auto"===o&&(o=e["offset"+t[0].toUpperCase()+t.slice(1)]),o=parseFloat(o)||0,o+R(e,t,n||(a?"border":"content"),r,i)+"px")}function F(e,t,n,r,i){return new F.prototype.init(e,t,n,r,i)}function P(){mt&&(ne.hidden===!1&&e.requestAnimationFrame?e.requestAnimationFrame(P):e.setTimeout(P,ge.fx.interval),ge.fx.tick())}
// Animations created synchronously will run synchronously
function B(){return e.setTimeout(function(){gt=void 0}),gt=ge.now()}
// Generate parameters to create a standard animation
function W(e,t){var n,r=0,i={height:e};for(
// If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
t=t?1:0;r<4;r+=2-t)n=We[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function G(e,t,n){for(var r,i=(z.tweeners[t]||[]).concat(z.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))
// We're done with this property
return r}function $(e,t,n){var r,i,o,a,s,u,c,l,f="width"in t||"height"in t,d=this,p={},h=e.style,g=e.nodeType&&Ge(e),m=Le.get(e,"fxshow");
// Queue-skipping animations hijack the fx hooks
n.queue||(a=ge._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,d.always(function(){
// Ensure the complete handler is called before this completes
d.always(function(){a.unqueued--,ge.queue(e,"fx").length||a.empty.fire()})}));
// Detect show/hide animations
for(r in t)if(i=t[r],vt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){
// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if("show"!==i||!m||void 0===m[r])continue;g=!0}p[r]=m&&m[r]||ge.style(e,r)}if(
// Bail out if this is a no-op like .hide().hide()
u=!ge.isEmptyObject(t),u||!ge.isEmptyObject(p)){
// Restrict "overflow" and "display" styles during box animations
f&&1===e.nodeType&&(
// Support: IE <=9 - 11, Edge 12 - 13
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY
n.overflow=[h.overflow,h.overflowX,h.overflowY],
// Identify a display type, preferring old show/hide data over the CSS cascade
c=m&&m.display,null==c&&(c=Le.get(e,"display")),l=ge.css(e,"display"),"none"===l&&(c?l=c:(
// Get nonempty value(s) by temporarily forcing visibility
v([e],!0),c=e.style.display||c,l=ge.css(e,"display"),v([e]))),
// Animate inline elements as inline-block
("inline"===l||"inline-block"===l&&null!=c)&&"none"===ge.css(e,"float")&&(
// Restore the original display value at the end of pure show/hide animations
u||(d.done(function(){h.display=c}),null==c&&(l=h.display,c="none"===l?"":l)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",d.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),
// Implement show/hide animations
u=!1;for(r in p)
// General show/hide setup for this element animation
u||(m?"hidden"in m&&(g=m.hidden):m=Le.access(e,"fxshow",{display:c}),
// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
o&&(m.hidden=!g),
// Show elements before animating them
g&&v([e],!0),/* eslint-disable no-loop-func */
d.done(function(){/* eslint-enable no-loop-func */
// The final step of a "hide" animation is actually hiding the element
g||v([e]),Le.remove(e,"fxshow");for(r in p)ge.style(e,r,p[r])})),
// Per-property setup
u=G(g?m[r]:0,r,d),r in m||(m[r]=u.start,g&&(u.end=u.start,u.start=0))}}function V(e,t){var n,r,i,o,a;
// camelCase, specialEasing and expand cssHook pass
for(n in e)if(r=ge.camelCase(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=ge.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];
// Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function z(e,t,n){var r,i,o=0,a=z.prefilters.length,s=ge.Deferred().always(function(){
// Don't match elem in the :animated selector
delete u.elem}),u=function(){if(i)return!1;for(var t=gt||B(),n=Math.max(0,c.startTime+c.duration-t),
// Support: Android 2.3 only
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
r=n/c.duration||0,o=1-r,a=0,u=c.tweens.length;a<u;a++)c.tweens[a].run(o);
// If there's more to do, yield
// If there's more to do, yield
// If this was an empty animation, synthesize a final progress notification
// Resolve the animation and report its conclusion
return s.notifyWith(e,[c,o,n]),o<1&&u?n:(u||s.notifyWith(e,[c,1,0]),s.resolveWith(e,[c]),!1)},c=s.promise({elem:e,props:ge.extend({},t),opts:ge.extend(!0,{specialEasing:{},easing:ge.easing._default},n),originalProperties:t,originalOptions:n,startTime:gt||B(),duration:n.duration,tweens:[],createTween:function(t,n){var r=ge.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(r),r},stop:function(t){var n=0,
// If we are going to the end, we want to run all the tweens
// otherwise we skip this part
r=t?c.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)c.tweens[n].run(1);
// Resolve when we played the last frame; otherwise, reject
return t?(s.notifyWith(e,[c,1,0]),s.resolveWith(e,[c,t])):s.rejectWith(e,[c,t]),this}}),l=c.props;for(V(l,c.opts.specialEasing);o<a;o++)if(r=z.prefilters[o].call(c,e,l,c.opts))return ge.isFunction(r.stop)&&(ge._queueHooks(c.elem,c.opts.queue).stop=ge.proxy(r.stop,r)),r;
// Attach callbacks from options
return ge.map(l,G,c),ge.isFunction(c.opts.start)&&c.opts.start.call(e,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),ge.fx.timer(ge.extend(u,{elem:e,anim:c,queue:c.opts.queue})),c}
// Strip and collapse whitespace according to HTML spec
// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
function U(e){var t=e.match(qe)||[];return t.join(" ")}function X(e){return e.getAttribute&&e.getAttribute("class")||""}function Y(e,t,n,r){var i;if(Array.isArray(t))
// Serialize array item.
ge.each(t,function(t,i){n||_t.test(e)?
// Treat each array item as a scalar.
r(e,i):
// Item is non-scalar (array or object), encode its numeric index.
Y(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==ge.type(t))
// Serialize scalar item.
r(e,t);else
// Serialize object item.
for(i in t)Y(e+"["+i+"]",t[i],n,r)}
// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function K(e){
// dataTypeExpression is optional and defaults to "*"
return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(qe)||[];if(ge.isFunction(n))
// For each dataType in the dataTypeExpression
for(;r=o[i++];)
// Prepend if requested
"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}
// Base inspection function for prefilters and transports
function Q(e,t,n,r){function i(s){var u;return o[s]=!0,ge.each(e[s]||[],function(e,s){var c=s(t,n,r);return"string"!=typeof c||a||o[c]?a?!(u=c):void 0:(t.dataTypes.unshift(c),i(c),!1)}),u}var o={},a=e===Pt;return i(t.dataTypes[0])||!o["*"]&&i("*")}
// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function J(e,t){var n,r,i=ge.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&ge.extend(!0,e,r),e}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function Z(e,t,n){
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
function ee(e,t,n,r){var i,o,a,s,u,c={},
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
if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(f){return{state:"parsererror",error:a?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}var te=[],ne=e.document,re=Object.getPrototypeOf,ie=te.slice,oe=te.concat,ae=te.push,se=te.indexOf,ue={},ce=ue.toString,le=ue.hasOwnProperty,fe=le.toString,de=fe.call(Object),pe={},he="3.2.1",
// Define a local copy of jQuery
ge=function(e,t){
// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new ge.fn.init(e,t)},
// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
me=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
// Matches dashed string for camelizing
ve=/^-ms-/,ye=/-([a-z])/g,
// Used by jQuery.camelCase as callback to replace()
be=function(e,t){return t.toUpperCase()};ge.fn=ge.prototype={
// The current version of jQuery being used
jquery:he,constructor:ge,
// The default length of a jQuery object is 0
length:0,toArray:function(){return ie.call(this)},
// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function(e){
// Return all the elements in a clean array
// Return all the elements in a clean array
return null==e?ie.call(this):e<0?this[e+this.length]:this[e]},
// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function(e){
// Build a new jQuery matched element set
var t=ge.merge(this.constructor(),e);
// Return the newly-formed element set
// Add the old object onto the stack (as a reference)
return t.prevObject=this,t},
// Execute a callback for every element in the matched set.
each:function(e){return ge.each(this,e)},map:function(e){return this.pushStack(ge.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(ie.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},
// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:ae,sort:te.sort,splice:te.splice},ge.extend=ge.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,c=!1;for(
// Handle a deep copy situation
"boolean"==typeof a&&(c=a,
// Skip the boolean and the target
a=arguments[s]||{},s++),
// Handle case when target is a string or something (possible in deep copy)
"object"==typeof a||ge.isFunction(a)||(a={}),
// Extend jQuery itself if only one argument is passed
s===u&&(a=this,s--);s<u;s++)
// Only deal with non-null/undefined values
if(null!=(e=arguments[s]))
// Extend the base object
for(t in e)n=a[t],r=e[t],
// Prevent never-ending loop
a!==r&&(
// Recurse if we're merging plain objects or arrays
c&&r&&(ge.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&ge.isPlainObject(n)?n:{},
// Never move original objects, clone them
a[t]=ge.extend(c,o,r)):void 0!==r&&(a[t]=r));
// Return the modified object
return a},ge.extend({
// Unique for each copy of jQuery on the page
expando:"jQuery"+(he+Math.random()).replace(/\D/g,""),
// Assume jQuery is ready without the ready module
isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===ge.type(e)},isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){
// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var t=ge.type(e);
// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},isPlainObject:function(e){var t,n;
// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
// Objects with no prototype (e.g., `Object.create( null )`) are plain
// Objects with prototype are plain iff they were constructed by a global Object function
return!(!e||"[object Object]"!==ce.call(e))&&(!(t=re(e))||(n=le.call(t,"constructor")&&t.constructor,"function"==typeof n&&fe.call(n)===de))},isEmptyObject:function(e){/* eslint-disable no-unused-vars */
// See https://github.com/eslint/eslint/issues/6125
var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?ue[ce.call(e)]||"object":typeof e},
// Evaluates a script in a global context
globalEval:function(e){n(e)},
// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 13
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function(e){return e.replace(ve,"ms-").replace(ye,be)},each:function(e,t){var n,i=0;if(r(e))for(n=e.length;i<n&&t.call(e[i],i,e[i])!==!1;i++);else for(i in e)if(t.call(e[i],i,e[i])===!1)break;return e},
// Support: Android <=4.0 only
trim:function(e){return null==e?"":(e+"").replace(me,"")},
// results is for internal usage only
makeArray:function(e,t){var n=t||[];return null!=e&&(r(Object(e))?ge.merge(n,"string"==typeof e?[e]:e):ae.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:se.call(t,e,n)},
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){
// Go through the array, only saving the items
// that pass the validator function
for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)r=!t(e[o],o),r!==s&&i.push(e[o]);return i},
// arg is for internal usage only
map:function(e,t,n){var i,o,a=0,s=[];
// Go through the array, translating each of the items to their new values
if(r(e))for(i=e.length;a<i;a++)o=t(e[a],a,n),null!=o&&s.push(o);else for(a in e)o=t(e[a],a,n),null!=o&&s.push(o);
// Flatten any nested arrays
return oe.apply([],s)},
// A global GUID counter for objects
guid:1,
// Bind a function to a context, optionally partially applying any
// arguments.
proxy:function(e,t){var n,r,i;
// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if("string"==typeof t&&(n=e[t],t=e,e=n),ge.isFunction(e))
// Simulated bind
// Set the guid of unique handler to the same of original handler, so it can be removed
return r=ie.call(arguments,2),i=function(){return e.apply(t||this,r.concat(ie.call(arguments)))},i.guid=e.guid=e.guid||ge.guid++,i},now:Date.now,
// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:pe}),"function"==typeof Symbol&&(ge.fn[Symbol.iterator]=te[Symbol.iterator]),
// Populate the class2type map
ge.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){ue["[object "+t+"]"]=t.toLowerCase()});var we=/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
function(e){function t(e,t,n,r){var i,o,a,s,u,c,l,d=t&&t.ownerDocument,
// nodeType defaults to 9, since context defaults to document
h=t?t.nodeType:9;
// Return early from calls with invalid selector or context
if(n=n||[],"string"!=typeof e||!e||1!==h&&9!==h&&11!==h)return n;
// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!r&&((t?t.ownerDocument||t:B)!==M&&A(t),t=t||M,H)){
// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(11!==h&&(u=ve.exec(e)))
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
if(d&&(a=d.getElementById(i))&&F(t,a)&&a.id===i)return n.push(a),n}else{if(u[2])return J.apply(n,t.getElementsByTagName(e)),n;if((i=u[3])&&j.getElementsByClassName&&t.getElementsByClassName)return J.apply(n,t.getElementsByClassName(i)),n}
// Take advantage of querySelectorAll
if(j.qsa&&!z[e+" "]&&(!L||!L.test(e))){if(1!==h)d=t,l=e;else if("object"!==t.nodeName.toLowerCase()){for(
// Capture the context ID, setting it first if necessary
(s=t.getAttribute("id"))?s=s.replace(xe,je):t.setAttribute("id",s=P),
// Prefix every selector in the list
c=E(e),o=c.length;o--;)c[o]="#"+s+" "+p(c[o]);l=c.join(","),
// Expand context for sibling selectors
d=ye.test(e)&&f(t.parentNode)||t}if(l)try{return J.apply(n,d.querySelectorAll(l)),n}catch(g){}finally{s===P&&t.removeAttribute("id")}}}
// All others
return _(e.replace(se,"$1"),t,n,r)}/**
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
function r(e){return e[P]=!0,e}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function i(e){var t=M.createElement("fieldset");try{return!!e(t)}catch(n){return!1}finally{
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
return"form"in t?t.parentNode&&t.disabled===!1?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&Ce(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}/**
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
function d(){}function p(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function h(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=G++;
// Check against closest ancestor/preceding element
// Check against all ancestor/preceding elements
return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var c,l,f,d=[W,s];
// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(u){for(;t=t[r];)if((1===t.nodeType||a)&&e(t,n,u))return!0}else for(;t=t[r];)if(1===t.nodeType||a)if(f=t[P]||(t[P]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((c=l[o])&&c[0]===W&&c[1]===s)
// Assign to newCache so results back-propagate to previous elements
return d[2]=c[2];
// A match means we're done; a fail means we have to keep checking
if(
// Reuse newcache so results back-propagate to previous elements
l[o]=d,d[2]=e(t,n,u))return!0}return!1}}function g(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(e,n,r){for(var i=0,o=n.length;i<o;i++)t(e,n[i],r);return r}function v(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,c=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),c&&t.push(s)));return a}function y(e,t,n,i,o,a){return i&&!i[P]&&(i=y(i)),o&&!o[P]&&(o=y(o,a)),r(function(r,a,s,u){var c,l,f,d=[],p=[],h=a.length,
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
l=b.length;l--;)(f=b[l])&&(c=o?ee(r,f):d[l])>-1&&(r[c]=!(a[c]=f))}}else b=v(b===a?b.splice(h,b.length):b),o?o(null,a,b,u):J.apply(a,b)})}function b(e){for(var t,n,r,i=e.length,o=T.relative[e[0].type],a=o||T.relative[" "],s=o?1:0,
// The foundational matcher ensures that elements are reachable from top-level context(s)
u=h(function(e){return e===t},a,!0),c=h(function(e){return ee(t,e)>-1},a,!0),l=[function(e,n,r){var i=!o&&(r||n!==D)||((t=n).nodeType?u(e,n,r):c(e,n,r));
// Avoid hanging onto element (issue #299)
return t=null,i}];s<i;s++)if(n=T.relative[e[s].type])l=[h(g(l),n)];else{
// Return special upon seeing a positional matcher
if(n=T.filter[e[s].type].apply(null,e[s].matches),n[P]){for(
// Find the next relative operator (if any) for proper handling
r=++s;r<i&&!T.relative[e[r].type];r++);
// If the preceding token was a descendant combinator, insert an implicit any-element `*`
return y(s>1&&g(l),s>1&&p(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(se,"$1"),n,s<r&&b(e.slice(s,r)),r<i&&b(e=e.slice(r)),r<i&&p(e))}l.push(n)}return g(l)}function w(e,n){var i=n.length>0,o=e.length>0,a=function(r,a,s,u,c){var l,f,d,p=0,h="0",g=r&&[],m=[],y=D,
// We must always have either seed elements or outermost context
b=r||o&&T.find.TAG("*",c),
// Use integer dirruns iff this is the outermost matcher
w=W+=null==y?1:Math.random()||.1,x=b.length;
// Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(c&&(D=a===M||a||c);h!==x&&null!=(l=b[h]);h++){if(o&&l){for(f=0,a||l.ownerDocument===M||(A(l),s=!H);d=e[f++];)if(d(l,a||M,s)){u.push(l);break}c&&(W=w)}
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
if(p>0)for(;h--;)g[h]||m[h]||(m[h]=K.call(u));
// Discard index placeholder values to get only actual matches
m=v(m)}
// Add matches to results
J.apply(u,m),
// Seedless set matches succeeding multiple successful matchers stipulate sorting
c&&!r&&m.length>0&&p+n.length>1&&t.uniqueSort(u)}
// Override manipulation of globals by nested matchers
return c&&(W=w,D=y),g};return i?r(a):a}var x,j,T,C,k,E,S,_,D,N,q,
// Local document vars
A,M,O,H,L,R,I,F,
// Instance-specific data
P="sizzle"+1*new Date,B=e.document,W=0,G=0,$=n(),V=n(),z=n(),U=function(e,t){return e===t&&(q=!0),0},
// Instance methods
X={}.hasOwnProperty,Y=[],K=Y.pop,Q=Y.push,J=Y.push,Z=Y.slice,
// Use a stripped-down indexOf as it's faster than native
// https://jsperf.com/thor-indexof-vs-for/5
ee=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
// Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
ne="[\\x20\\t\\r\\n\\f]",
// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
re="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
ie="\\["+ne+"*("+re+")(?:"+ne+
// Operator (capture 2)
"*([*^$|!~]?=)"+ne+
// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+re+"))|)"+ne+"*\\]",oe=":("+re+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ie+")*)|.*)\\)|)",
// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
ae=new RegExp(ne+"+","g"),se=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ue=new RegExp("^"+ne+"*,"+ne+"*"),ce=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),le=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),fe=new RegExp(oe),de=new RegExp("^"+re+"$"),pe={ID:new RegExp("^#("+re+")"),CLASS:new RegExp("^\\.("+re+")"),TAG:new RegExp("^("+re+"|[*])"),ATTR:new RegExp("^"+ie),PSEUDO:new RegExp("^"+oe),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),
// For use in libraries implementing .is()
// We use this for POS matching in `select`
needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},he=/^(?:input|select|textarea|button)$/i,ge=/^h\d$/i,me=/^[^{]+\{\s*\[native \w/,
// Easily-parseable/retrievable ID or TAG or CLASS selectors
ve=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ye=/[+~]/,
// CSS escapes
// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
be=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),we=function(e,t,n){var r="0x"+t-65536;
// NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
// BMP codepoint
// Supplemental Plane codepoint (surrogate pair)
return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},
// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
xe=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,je=function(e,t){
// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},
// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
Te=function(){A()},Ce=h(function(e){return e.disabled===!0&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});
// Optimize for push.apply( _, NodeList )
try{J.apply(Y=Z.call(B.childNodes),B.childNodes),
// Support: Android<4.0
// Detect silently failing push.apply
Y[B.childNodes.length].nodeType}catch(ke){J={apply:Y.length?
// Leverage slice if possible
function(e,t){Q.apply(e,Z.call(t))}:
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
k=t.isXML=function(e){
// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
A=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:B;
// Return early if doc is invalid or already selected
// Return early if doc is invalid or already selected
// Update global variables
// Support: IE 9-11, Edge
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
// Support: IE 11, Edge
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
return r!==M&&9===r.nodeType&&r.documentElement?(M=r,O=M.documentElement,H=!k(M),B!==M&&(n=M.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Te,!1):n.attachEvent&&n.attachEvent("onunload",Te)),j.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),j.getElementsByTagName=i(function(e){return e.appendChild(M.createComment("")),!e.getElementsByTagName("*").length}),j.getElementsByClassName=me.test(M.getElementsByClassName),j.getById=i(function(e){return O.appendChild(e).id=P,!M.getElementsByName||!M.getElementsByName(P).length}),j.getById?(T.filter.ID=function(e){var t=e.replace(be,we);return function(e){return e.getAttribute("id")===t}},T.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&H){var n=t.getElementById(e);return n?[n]:[]}}):(T.filter.ID=function(e){var t=e.replace(be,we);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},T.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&H){var n,r,i,o=t.getElementById(e);if(o){if(
// Verify the id attribute
n=o.getAttributeNode("id"),n&&n.value===e)return[o];for(
// Fall back on getElementsByName
i=t.getElementsByName(e),r=0;o=i[r++];)if(n=o.getAttributeNode("id"),n&&n.value===e)return[o]}return[]}}),T.find.TAG=j.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):j.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,
// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
o=t.getElementsByTagName(e);
// Filter out possible comments
if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},T.find.CLASS=j.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&H)return t.getElementsByClassName(e)},R=[],L=[],(j.qsa=me.test(M.querySelectorAll))&&(i(function(e){
// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// https://bugs.jquery.com/ticket/12359
O.appendChild(e).innerHTML="<a id='"+P+"'></a><select id='"+P+"-\r\\' msallowcapture=''><option selected=''></option></select>",
// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
e.querySelectorAll("[msallowcapture^='']").length&&L.push("[*^$]="+ne+"*(?:''|\"\")"),
// Support: IE8
// Boolean attributes and "value" are not treated correctly
e.querySelectorAll("[selected]").length||L.push("\\["+ne+"*(?:value|"+te+")"),
// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
e.querySelectorAll("[id~="+P+"-]").length||L.push("~="),
// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
e.querySelectorAll(":checked").length||L.push(":checked"),
// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails
e.querySelectorAll("a#"+P+"+*").length||L.push(".#.+[+~]")}),i(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var t=M.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),
// Support: IE8
// Enforce case-sensitivity of name attribute
e.querySelectorAll("[name=d]").length&&L.push("name"+ne+"*[*^$|!~]?="),
// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
2!==e.querySelectorAll(":enabled").length&&L.push(":enabled",":disabled"),
// Support: IE9-11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
O.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&L.push(":enabled",":disabled"),
// Opera 10-11 does not throw on post-comma invalid pseudos
e.querySelectorAll("*,:x"),L.push(",.*:")})),(j.matchesSelector=me.test(I=O.matches||O.webkitMatchesSelector||O.mozMatchesSelector||O.oMatchesSelector||O.msMatchesSelector))&&i(function(e){
// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
j.disconnectedMatch=I.call(e,"*"),
// This should fail with an exception
// Gecko does not error, returns false instead
I.call(e,"[s!='']:x"),R.push("!=",oe)}),L=L.length&&new RegExp(L.join("|")),R=R.length&&new RegExp(R.join("|")),t=me.test(O.compareDocumentPosition),F=t||me.test(O.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){
// Flag for duplicate removal
if(e===t)return q=!0,0;
// Sort on method existence if only one input has compareDocumentPosition
var n=!e.compareDocumentPosition-!t.compareDocumentPosition;
// Calculate position if both inputs belong to the same document
// Otherwise we know they are disconnected
// Disconnected nodes
// Choose the first element that is related to our preferred document
return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!j.sortDetached&&t.compareDocumentPosition(e)===n?e===M||e.ownerDocument===B&&F(B,e)?-1:t===M||t.ownerDocument===B&&F(B,t)?1:N?ee(N,e)-ee(N,t):0:4&n?-1:1)}:function(e,t){
// Exit early if the nodes are identical
if(e===t)return q=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,s=[e],u=[t];
// Parentless nodes are either documents or disconnected
if(!i||!o)return e===M?-1:t===M?1:i?-1:o?1:N?ee(N,e)-ee(N,t):0;if(i===o)return a(e,t);for(
// Otherwise we need full lists of their ancestors for comparison
n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);
// Walk down the tree looking for a discrepancy
for(;s[r]===u[r];)r++;
// Do a sibling check if the nodes have a common ancestor
// Otherwise nodes in our document sort first
return r?a(s[r],u[r]):s[r]===B?-1:u[r]===B?1:0},M):M},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if(
// Set document vars if needed
(e.ownerDocument||e)!==M&&A(e),
// Make sure that attribute selectors are quoted
n=n.replace(le,"='$1']"),j.matchesSelector&&H&&!z[n+" "]&&(!R||!R.test(n))&&(!L||!L.test(n)))try{var r=I.call(e,n);
// IE 9's matchesSelector returns false on disconnected nodes
if(r||j.disconnectedMatch||
// As well, disconnected nodes are said to be in a document
// fragment in IE 9
e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,M,null,[e]).length>0},t.contains=function(e,t){
// Set document vars if needed
return(e.ownerDocument||e)!==M&&A(e),F(e,t)},t.attr=function(e,t){
// Set document vars if needed
(e.ownerDocument||e)!==M&&A(e);var n=T.attrHandle[t.toLowerCase()],
// Don't get fooled by Object.prototype properties (jQuery #13807)
r=n&&X.call(T.attrHandle,t.toLowerCase())?n(e,t,!H):void 0;return void 0!==r?r:j.attributes||!H?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.escape=function(e){return(e+"").replace(xe,je)},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(
// Unless we *know* we can detect duplicates, assume their presence
q=!j.detectDuplicates,N=!j.sortStable&&e.slice(0),e.sort(U),q){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}
// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
return N=null,e},/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
C=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){
// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if("string"==typeof e.textContent)return e.textContent;
// Traverse its children
for(e=e.firstChild;e;e=e.nextSibling)n+=C(e)}else if(3===i||4===i)return e.nodeValue}else
// If no nodeType, this is expected to be an array
for(;t=e[r++];)
// Do not traverse comment nodes
n+=C(t);
// Do not include comment or processing instruction nodes
return n},T=t.selectors={
// Can be adjusted by the user
cacheLength:50,createPseudo:r,match:pe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){
// Move the given value to match[3] whether quoted or unquoted
return e[1]=e[1].replace(be,we),e[3]=(e[3]||e[4]||e[5]||"").replace(be,we),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){/* matches from matchExpr["CHILD"]
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
return pe.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&fe.test(n)&&(t=E(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(be,we).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=$[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&$(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:!n||(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(ae," ")+" ").indexOf(r)>-1:"|="===n&&(o===r||o.slice(0,r.length+1)===r+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;
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
d=m,f=d[P]||(d[P]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[d.uniqueID]||(f[d.uniqueID]={}),c=l[e]||[],p=c[0]===W&&c[1],b=p&&c[2],d=p&&m.childNodes[p];d=++p&&d&&d[g]||(
// Fallback to seeking `elem` from the start
b=p=0)||h.pop();)
// When found, cache indexes on `parent` and break
if(1===d.nodeType&&++b&&d===t){l[e]=[W,p,b];break}}else
// xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(
// Use previously-cached element index if available
y&&(
// ...in a gzip-friendly way
d=t,f=d[P]||(d[P]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[d.uniqueID]||(f[d.uniqueID]={}),c=l[e]||[],p=c[0]===W&&c[1],b=p),b===!1)
// Use the same loop as above to seek `elem` from the start
for(;(d=++p&&d&&d[g]||(b=p=0)||h.pop())&&((s?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++b||(
// Cache the index of each encountered element
y&&(f=d[P]||(d[P]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
l=f[d.uniqueID]||(f[d.uniqueID]={}),l[e]=[W,b]),d!==t)););
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
return o[P]?o(n):o.length>1?(i=[e,e,"",n],T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=ee(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{
// Potentially complex pseudos
not:r(function(e){
// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var t=[],n=[],i=S(e.replace(se,"$1"));return i[P]?r(function(e,t,n,r){
// Match elements unmatched by `matcher`
for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){
// Don't keep the element (issue #299)
return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(be,we),function(t){return(t.textContent||t.innerText||C(t)).indexOf(e)>-1}}),
// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
lang:r(function(e){
// lang value must be a valid identifier
return de.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(be,we).toLowerCase(),function(t){var n;do if(n=H?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),
// Miscellaneous
target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===O},focus:function(e){return e===M.activeElement&&(!M.hasFocus||M.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},
// Boolean properties
enabled:c(!1),disabled:c(!0),checked:function(e){
// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){
// Accessing this property makes selected-by-default
// options in Safari work properly
return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},
// Contents
empty:function(e){
// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},
// Element/input types
header:function(e){return ge.test(e.nodeName)},input:function(e){return he.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;
// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},
// Position-in-collection
first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[n<0?n+t:n]}),even:l(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:l(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;
// Add button/input type pseudos
for(x in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[x]=s(x);for(x in{submit:!0,reset:!0})T.pseudos[x]=u(x);/**
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
return d.prototype=T.filters=T.pseudos,T.setFilters=new d,E=t.tokenize=function(e,n){var r,i,o,a,s,u,c,l=V[e+" "];if(l)return n?0:l.slice(0);for(s=e,u=[],c=T.preFilter;s;){
// Comma and first run
r&&!(i=ue.exec(s))||(i&&(
// Don't consume trailing commas as valid
s=s.slice(i[0].length)||s),u.push(o=[])),r=!1,
// Combinators
(i=ce.exec(s))&&(r=i.shift(),o.push({value:r,
// Cast descendant combinators to space
type:i[0].replace(se," ")}),s=s.slice(r.length));
// Filters
for(a in T.filter)!(i=pe[a].exec(s))||c[a]&&!(i=c[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}
// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
// Cache the tokens
return n?s.length:s?t.error(e):V(e,u).slice(0)},S=t.compile=function(e,t){var n,r=[],i=[],o=z[e+" "];if(!o){for(
// Generate a function of recursive functions that can be used to check each element
t||(t=E(e)),n=t.length;n--;)o=b(t[n]),o[P]?r.push(o):i.push(o);
// Cache the compiled function
o=z(e,w(i,r)),
// Save selector and tokenization
o.selector=e}return o},_=t.select=function(e,t,n,r){var i,o,a,s,u,c="function"==typeof e&&e,l=!r&&E(e=c.selector||e);
// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(n=n||[],1===l.length){if(
// Reduce context if the leading compound selector is an ID
o=l[0]=l[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&H&&T.relative[o[1].type]){if(t=(T.find.ID(a.matches[0].replace(be,we),t)||[])[0],!t)return n;c&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(
// Fetch a seed set for right-to-left matching
i=pe.needsContext.test(e)?0:o.length;i--&&(a=o[i],!T.relative[s=a.type]);)if((u=T.find[s])&&(r=u(a.matches[0].replace(be,we),ye.test(o[0].type)&&f(t.parentNode)||t))){if(
// If seed is empty or no tokens remain, we can return early
o.splice(i,1),e=r.length&&p(o),!e)return J.apply(n,r),n;break}}
// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
return(c||S(e,l))(r,t,!H,n,!t||ye.test(e)&&f(t.parentNode)||t),n},j.sortStable=P.split("").sort(U).join("")===P,j.detectDuplicates=!!q,A(),j.sortDetached=i(function(e){
// Should return 1, but returns 4 (following)
return 1&e.compareDocumentPosition(M.createElement("fieldset"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),j.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(te,function(e,t,n){var r;if(!n)return e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);ge.find=we,ge.expr=we.selectors,
// Deprecated
ge.expr[":"]=ge.expr.pseudos,ge.uniqueSort=ge.unique=we.uniqueSort,ge.text=we.getText,ge.isXMLDoc=we.isXML,ge.contains=we.contains,ge.escapeSelector=we.escape;var xe=function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&ge(e).is(n))break;r.push(e)}return r},je=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},Te=ge.expr.match.needsContext,Ce=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,ke=/^.[^:#\[\.,]*$/;ge.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ge.find.matchesSelector(r,e)?[r]:[]:ge.find.matches(e,ge.grep(t,function(e){return 1===e.nodeType}))},ge.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(ge(e).filter(function(){for(t=0;t<r;t++)if(ge.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)ge.find(e,i[t],n);return r>1?ge.uniqueSort(n):n},filter:function(e){return this.pushStack(o(this,e||[],!1))},not:function(e){return this.pushStack(o(this,e||[],!0))},is:function(e){
// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
return!!o(this,"string"==typeof e&&Te.test(e)?ge(e):e||[],!1).length}});
// Initialize a jQuery object
// A central reference to the root jQuery(document)
var Ee,
// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
// Shortcut simple #id case for speed
Se=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,_e=ge.fn.init=function(e,t,n){var r,i;
// HANDLE: $(""), $(null), $(undefined), $(false)
if(!e)return this;
// Handle HTML strings
if(
// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
n=n||Ee,"string"==typeof e){
// Match html or make sure no context is specified for #id
if(
// Assume that strings that start and end with <> are HTML and skip the regex check
r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:Se.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);
// HANDLE: $(html) -> $(array)
if(r[1]){
// HANDLE: $(html, props)
if(t=t instanceof ge?t[0]:t,
// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
ge.merge(this,ge.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:ne,!0)),Ce.test(r[1])&&ge.isPlainObject(t))for(r in t)
// Properties of context are called as methods if possible
ge.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}
// Inject the element directly into the jQuery object
return i=ne.getElementById(r[2]),i&&(this[0]=i,this.length=1),this}
// Execute immediately if ready is not present
return e.nodeType?(this[0]=e,this.length=1,this):ge.isFunction(e)?void 0!==n.ready?n.ready(e):e(ge):ge.makeArray(e,this)};
// Give the init function the jQuery prototype for later instantiation
_e.prototype=ge.fn,
// Initialize central reference
Ee=ge(ne);var De=/^(?:parents|prev(?:Until|All))/,
// Methods guaranteed to produce a unique set when starting from a unique set
Ne={children:!0,contents:!0,next:!0,prev:!0};ge.fn.extend({has:function(e){var t=ge(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(ge.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&ge(e);
// Positional selectors never match, since there's no _selection_ context
if(!Te.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)
// Always skip document fragments
if(n.nodeType<11&&(a?a.index(n)>-1:
// Don't pass non-elements to Sizzle
1===n.nodeType&&ge.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?ge.uniqueSort(o):o)},
// Determine the position of an element within the set
index:function(e){
// No argument, return index in parent
// No argument, return index in parent
// Index in selector
// If it receives a jQuery object, the first element is used
return e?"string"==typeof e?se.call(ge(e),this[0]):se.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(ge.uniqueSort(ge.merge(this.get(),ge(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ge.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return xe(e,"parentNode")},parentsUntil:function(e,t,n){return xe(e,"parentNode",n)},next:function(e){return a(e,"nextSibling")},prev:function(e){return a(e,"previousSibling")},nextAll:function(e){return xe(e,"nextSibling")},prevAll:function(e){return xe(e,"previousSibling")},nextUntil:function(e,t,n){return xe(e,"nextSibling",n)},prevUntil:function(e,t,n){return xe(e,"previousSibling",n)},siblings:function(e){return je((e.parentNode||{}).firstChild,e)},children:function(e){return je(e.firstChild)},contents:function(e){
// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
// Treat the template element as a regular one in browsers that
// don't support it.
return i(e,"iframe")?e.contentDocument:(i(e,"template")&&(e=e.content||e),ge.merge([],e.childNodes))}},function(e,t){ge.fn[e]=function(n,r){var i=ge.map(this,t,n);
// Remove duplicates
// Reverse order for parents* and prev-derivatives
return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=ge.filter(r,i)),this.length>1&&(Ne[e]||ge.uniqueSort(i),De.test(e)&&i.reverse()),this.pushStack(i)}});var qe=/[^\x20\t\r\n\f]+/g;/*
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
ge.Callbacks=function(e){
// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
e="string"==typeof e?s(e):ge.extend({},e);var// Flag to know if list is currently firing
t,
// Last fire value for non-forgettable lists
n,
// Flag to know if list was already fired
r,
// Flag to prevent firing
i,
// Actual callback list
o=[],
// Queue of execution data for repeatable lists
a=[],
// Index of currently firing callback (modified by add/remove as needed)
u=-1,
// Fire callbacks
c=function(){for(
// Enforce single-firing
i=i||e.once,
// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
r=t=!0;a.length;u=-1)for(n=a.shift();++u<o.length;)
// Run callback and check for early termination
o[u].apply(n[0],n[1])===!1&&e.stopOnFalse&&(
// Jump to end and forget the data so .add doesn't re-fire
u=o.length,n=!1);
// Forget the data if we're done with it
e.memory||(n=!1),t=!1,
// Clean up if we're done firing for good
i&&(
// Keep an empty list if we have data for future add calls
o=n?[]:"")},
// Actual Callbacks object
l={
// Add a callback or a collection of callbacks to the list
add:function(){
// If we have memory from a past run, we should fire after adding
return o&&(n&&!t&&(u=o.length-1,a.push(n)),function r(t){ge.each(t,function(t,n){ge.isFunction(n)?e.unique&&l.has(n)||o.push(n):n&&n.length&&"string"!==ge.type(n)&&
// Inspect recursively
r(n)})}(arguments),n&&!t&&c()),this},
// Remove a callback from the list
remove:function(){return ge.each(arguments,function(e,t){for(var n;(n=ge.inArray(t,o,n))>-1;)o.splice(n,1),
// Handle firing indexes
n<=u&&u--}),this},
// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function(e){return e?ge.inArray(e,o)>-1:o.length>0},
// Remove all callbacks from the list
empty:function(){return o&&(o=[]),this},
// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},
// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},
// Call all callbacks with the given context and arguments
fireWith:function(e,n){return i||(n=n||[],n=[e,n.slice?n.slice():n],a.push(n),t||c()),this},
// Call all the callbacks with the given arguments
fire:function(){return l.fireWith(this,arguments),this},
// To know if the callbacks have already been called at least once
fired:function(){return!!r}};return l},ge.extend({Deferred:function(t){var n=[
// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",ge.Callbacks("memory"),ge.Callbacks("memory"),2],["resolve","done",ge.Callbacks("once memory"),ge.Callbacks("once memory"),0,"resolved"],["reject","fail",ge.Callbacks("once memory"),ge.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},
// Keep pipe for back-compat
pipe:function(){var e=arguments;return ge.Deferred(function(t){ge.each(n,function(n,r){
// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var i=ge.isFunction(e[r[4]])&&e[r[4]];
// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&ge.isFunction(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){function o(t,n,r,i){return function(){var s=this,l=arguments,f=function(){var e,f;
// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(!(t<a)){
// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if(e=r.apply(s,l),e===n.promise())throw new TypeError("Thenable self-resolution");
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
ge.isFunction(f)?
// Special processors (notify) just wait for resolution
i?f.call(e,o(a,n,u,i),o(a,n,c,i)):(
// ...and disregard older resolution values
a++,f.call(e,o(a,n,u,i),o(a,n,c,i),o(a,n,u,n.notifyWith))):(
// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
r!==u&&(s=void 0,l=[e]),
// Process the value(s)
// Default process is resolve
(i||n.resolveWith)(s,l))}},
// Only normal processors (resolve) catch and reject exceptions
d=i?f:function(){try{f()}catch(e){ge.Deferred.exceptionHook&&ge.Deferred.exceptionHook(e,d.stackTrace),
// Support: Promises/A+ section 2.3.3.3.4.1
// https://promisesaplus.com/#point-61
// Ignore post-resolution exceptions
t+1>=a&&(
// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
r!==c&&(s=void 0,l=[e]),n.rejectWith(s,l))}};
// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
t?d():(
// Call an optional hook to record the stack, in case of exception
// since it's otherwise lost when execution goes async
ge.Deferred.getStackHook&&(d.stackTrace=ge.Deferred.getStackHook()),e.setTimeout(d))}}var a=0;return ge.Deferred(function(e){
// progress_handlers.add( ... )
n[0][3].add(o(0,e,ge.isFunction(i)?i:u,e.notifyWith)),
// fulfilled_handlers.add( ... )
n[1][3].add(o(0,e,ge.isFunction(t)?t:u)),
// rejected_handlers.add( ... )
n[2][3].add(o(0,e,ge.isFunction(r)?r:c))}).promise()},
// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function(e){return null!=e?ge.extend(e,i):i}},o={};
// All done!
// Add list-specific methods
// Make the deferred a promise
// Call given func if any
return ge.each(n,function(e,t){var a=t[2],s=t[5];
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
// progress_callbacks.lock
n[0][2].lock),
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
r=Array(n),i=ie.call(arguments),
// the master Deferred
o=ge.Deferred(),
// subordinate callback factory
a=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?ie.call(arguments):n,--t||o.resolveWith(r,i)}};
// Single- and empty arguments are adopted like Promise.resolve
if(t<=1&&(l(e,o.done(a(n)).resolve,o.reject,!t),"pending"===o.state()||ge.isFunction(i[n]&&i[n].then)))return o.then();
// Multiple arguments are aggregated like Promise.all array elements
for(;n--;)l(i[n],a(n),o.reject);return o.promise()}});
// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var Ae=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;ge.Deferred.exceptionHook=function(t,n){
// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
e.console&&e.console.warn&&t&&Ae.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},ge.readyException=function(t){e.setTimeout(function(){throw t})};
// The deferred used on DOM ready
var Me=ge.Deferred();ge.fn.ready=function(e){return Me.then(e)["catch"](function(e){ge.readyException(e)}),this},ge.extend({
// Is the DOM ready to be used? Set to true once it occurs.
isReady:!1,
// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,
// Handle when the DOM is ready
ready:function(e){
// Abort if there are pending holds or we're already ready
(e===!0?--ge.readyWait:ge.isReady)||(
// Remember that the DOM is ready
ge.isReady=!0,
// If a normal DOM Ready event fired, decrement, and wait if need be
e!==!0&&--ge.readyWait>0||
// If there are functions bound, to execute
Me.resolveWith(ne,[ge]))}}),ge.ready.then=Me.then,
// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
"complete"===ne.readyState||"loading"!==ne.readyState&&!ne.documentElement.doScroll?
// Handle it asynchronously to allow scripts the opportunity to delay ready
e.setTimeout(ge.ready):(
// Use the handy event callback
ne.addEventListener("DOMContentLoaded",f),
// A fallback to window.onload, that will always work
e.addEventListener("load",f));
// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var Oe=function(e,t,n,r,i,o,a){var s=0,u=e.length,c=null==n;
// Sets many values
if("object"===ge.type(n)){i=!0;for(s in n)Oe(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,ge.isFunction(r)||(a=!0),c&&(
// Bulk operations run against the entire set
a?(t.call(e,r),t=null):(c=t,t=function(e,t,n){return c.call(ge(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));
// Gets
return i?e:c?t.call(e):u?t(e[0],n):o},He=function(e){
// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return 1===e.nodeType||9===e.nodeType||!+e.nodeType};d.uid=1,d.prototype={cache:function(e){
// Check if the owner object already has a cache
var t=e[this.expando];
// If not, create one
// We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
// If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
return t||(t={},He(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);
// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if("string"==typeof t)i[ge.camelCase(t)]=n;else
// Copy the properties one-by-one to the cache object
for(r in t)i[ge.camelCase(r)]=t[r];return i},get:function(e,t){
// Always use camelCase key (gh-2257)
return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][ge.camelCase(t)]},access:function(e,t,n){
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
t=t.map(ge.camelCase):(t=ge.camelCase(t),
// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
t=t in r?[t]:t.match(qe)||[]),n=t.length;for(;n--;)delete r[t[n]]}
// Remove the expando if there's no more data
(void 0===t||ge.isEmptyObject(r))&&(
// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!ge.isEmptyObject(t)}};var Le=new d,Re=new d,Ie=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Fe=/[A-Z]/g;ge.extend({hasData:function(e){return Re.hasData(e)||Le.hasData(e)},data:function(e,t,n){return Re.access(e,t,n)},removeData:function(e,t){Re.remove(e,t)},
// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function(e,t,n){return Le.access(e,t,n)},_removeData:function(e,t){Le.remove(e,t)}}),ge.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;
// Gets all values
if(void 0===e){if(this.length&&(i=Re.get(o),1===o.nodeType&&!Le.get(o,"hasDataAttrs"))){for(n=a.length;n--;)
// Support: IE 11 only
// The attrs elements can be null (#14894)
a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=ge.camelCase(r.slice(5)),h(o,r,i[r])));Le.set(o,"hasDataAttrs",!0)}return i}
// Sets multiple values
// Sets multiple values
return"object"==typeof e?this.each(function(){Re.set(this,e)}):Oe(this,function(t){var n;
// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(o&&void 0===t){if(
// Attempt to get data from the cache
// The key will always be camelCased in Data
n=Re.get(o,e),void 0!==n)return n;if(
// Attempt to "discover" the data in
// HTML5 custom data-* attrs
n=h(o,e),void 0!==n)return n}else
// Set the data...
this.each(function(){
// We always store the camelCased key
Re.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){Re.remove(this,e)})}}),ge.extend({queue:function(e,t,n){var r;if(e)
// Speed up dequeue by getting out quickly if this is just a lookup
return t=(t||"fx")+"queue",r=Le.get(e,t),n&&(!r||Array.isArray(n)?r=Le.access(e,t,ge.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=ge.queue(e,t),r=n.length,i=n.shift(),o=ge._queueHooks(e,t),a=function(){ge.dequeue(e,t)};
// If the fx queue is dequeued, always remove the progress sentinel
"inprogress"===i&&(i=n.shift(),r--),i&&(
// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
"fx"===t&&n.unshift("inprogress"),
// Clear up the last queue stop function
delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},
// Not public - generate a queueHooks object, or return the current one
_queueHooks:function(e,t){var n=t+"queueHooks";return Le.get(e,n)||Le.access(e,n,{empty:ge.Callbacks("once memory").add(function(){Le.remove(e,[t+"queue",n])})})}}),ge.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?ge.queue(this[0],e):void 0===t?this:this.each(function(){var n=ge.queue(this,e,t);
// Ensure a hooks for this queue
ge._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&ge.dequeue(this,e)})},dequeue:function(e){return this.each(function(){ge.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},
// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function(e,t){var n,r=1,i=ge.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)n=Le.get(o[a],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var Pe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Be=new RegExp("^(?:([+-])=|)("+Pe+")([a-z%]*)$","i"),We=["Top","Right","Bottom","Left"],Ge=function(e,t){
// Inline style trumps all
// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
return e=t||e,"none"===e.style.display||""===e.style.display&&ge.contains(e.ownerDocument,e)&&"none"===ge.css(e,"display")},$e=function(e,t,n,r){var i,o,a={};
// Remember the old values, and insert the new ones
for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);
// Revert the old values
for(o in t)e.style[o]=a[o];return i},Ve={};ge.fn.extend({show:function(){return v(this,!0)},hide:function(){return v(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Ge(this)?ge(this).show():ge(this).hide()})}});var ze=/^(?:checkbox|radio)$/i,Ue=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,Xe=/^$|\/(?:java|ecma)script/i,Ye={
// Support: IE <=9 only
option:[1,"<select multiple='multiple'>","</select>"],
// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};
// Support: IE <=9 only
Ye.optgroup=Ye.option,Ye.tbody=Ye.tfoot=Ye.colgroup=Ye.caption=Ye.thead,Ye.th=Ye.td;var Ke=/<|&#?\w+;/;!function(){var e=ne.createDocumentFragment(),t=e.appendChild(ne.createElement("div")),n=ne.createElement("input");
// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),
// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
pe.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,
// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
t.innerHTML="<textarea>x</textarea>",pe.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var Qe=ne.documentElement,Je=/^key/,Ze=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,et=/^([^.]*)(?:\.(.+)|)/;/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
ge.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,c,l,f,d,p,h,g,m=Le.get(e);
// Don't attach events to noData or text/comment nodes (but allow plain objects)
if(m)for(
// Caller can pass in an object of custom data in lieu of the handler
n.handler&&(o=n,n=o.handler,i=o.selector),
// Ensure that invalid selectors throw exceptions at attach time
// Evaluate against documentElement in case elem is a non-element node (e.g., document)
i&&ge.find.matchesSelector(Qe,i),
// Make sure that the handler has a unique ID, used to find/remove it later
n.guid||(n.guid=ge.guid++),
// Init the element's event structure and main handler, if this is the first
(u=m.events)||(u=m.events={}),(a=m.handle)||(a=m.handle=function(t){
// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return"undefined"!=typeof ge&&ge.event.triggered!==t.type?ge.event.dispatch.apply(e,arguments):void 0}),
// Handle multiple events separated by a space
t=(t||"").match(qe)||[""],c=t.length;c--;)s=et.exec(t[c])||[],p=g=s[1],h=(s[2]||"").split(".").sort(),
// There *must* be a type, no attaching namespace-only handlers
p&&(
// If event changes its type, use the special event handlers for the changed type
f=ge.event.special[p]||{},
// If selector defined, determine special event api type, otherwise given type
p=(i?f.delegateType:f.bindType)||p,
// Update special based on newly reset type
f=ge.event.special[p]||{},
// handleObj is passed to all event handlers
l=ge.extend({type:p,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&ge.expr.match.needsContext.test(i),namespace:h.join(".")},o),
// Init the event handler queue if we're the first
(d=u[p])||(d=u[p]=[],d.delegateCount=0,
// Only use addEventListener if the special events handler returns false
f.setup&&f.setup.call(e,r,h,a)!==!1||e.addEventListener&&e.addEventListener(p,a)),f.add&&(f.add.call(e,l),l.handler.guid||(l.handler.guid=n.guid)),
// Add to the element's handler list, delegates in front
i?d.splice(d.delegateCount++,0,l):d.push(l),
// Keep track of which events have ever been used, for event optimization
ge.event.global[p]=!0)},
// Detach an event or set of events from an element
remove:function(e,t,n,r,i){var o,a,s,u,c,l,f,d,p,h,g,m=Le.hasData(e)&&Le.get(e);if(m&&(u=m.events)){for(
// Once for each type.namespace in types; type may be omitted
t=(t||"").match(qe)||[""],c=t.length;c--;)
// Unbind all events (on this namespace, if provided) for the element
if(s=et.exec(t[c])||[],p=g=s[1],h=(s[2]||"").split(".").sort(),p){for(f=ge.event.special[p]||{},p=(r?f.delegateType:f.bindType)||p,d=u[p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),
// Remove matching events
a=o=d.length;o--;)l=d[o],!i&&g!==l.origType||n&&n.guid!==l.guid||s&&!s.test(l.namespace)||r&&r!==l.selector&&("**"!==r||!l.selector)||(d.splice(o,1),l.selector&&d.delegateCount--,f.remove&&f.remove.call(e,l));
// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
a&&!d.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||ge.removeEvent(e,p,m.handle),delete u[p])}else for(p in u)ge.event.remove(e,p+t[c],n,r,!0);
// Remove data and the expando if it's no longer used
ge.isEmptyObject(u)&&Le.remove(e,"handle events")}},dispatch:function(e){
// Make a writable jQuery.Event from the native event object
var t,n,r,i,o,a,s=ge.event.fix(e),u=new Array(arguments.length),c=(Le.get(this,"events")||{})[s.type]||[],l=ge.event.special[s.type]||{};for(
// Use the fix-ed jQuery.Event rather than the (read-only) native event
u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];
// Call the preDispatch hook for the mapped type, and let it bail if desired
if(s.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,s)!==!1){for(
// Determine handlers
a=ge.event.handlers.call(this,s,c),
// Run delegates first; they may want to stop propagation beneath us
t=0;(i=a[t++])&&!s.isPropagationStopped();)for(s.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!s.isImmediatePropagationStopped();)
// Triggered event must either 1) have no namespace, or 2) have namespace(s)
// a subset or equal to those in the bound event (both can have no namespace).
s.rnamespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,r=((ge.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u),void 0!==r&&(s.result=r)===!1&&(s.preventDefault(),s.stopPropagation()));
// Call the postDispatch hook for the mapped type
return l.postDispatch&&l.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,c=e.target;
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
i=r.selector+" ",void 0===a[i]&&(a[i]=r.needsContext?ge(i,this).index(c)>-1:ge.find(i,this,null,[c]).length),a[i]&&o.push(r);o.length&&s.push({elem:c,handlers:o})}
// Add the remaining (directly-bound) handlers
return c=this,u<t.length&&s.push({elem:c,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(ge.Event.prototype,e,{enumerable:!0,configurable:!0,get:ge.isFunction(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[ge.expando]?e:new ge.Event(e)},special:{load:{
// Prevent triggered image.load events from bubbling to window.load
noBubble:!0},focus:{
// Fire native event if possible so blur/focus sequence is correct
trigger:function(){if(this!==T()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===T()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{
// For checkbox, fire native event so checked state will be right
trigger:function(){if("checkbox"===this.type&&this.click&&i(this,"input"))return this.click(),!1},
// For cross-browser consistency, don't fire native .click() on links
_default:function(e){return i(e.target,"a")}},beforeunload:{postDispatch:function(e){
// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},ge.removeEvent=function(e,t,n){
// This "if" is needed for plain objects
e.removeEventListener&&e.removeEventListener(t,n)},ge.Event=function(e,t){
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
return this instanceof ge.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?x:j,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&ge.extend(this,t),this.timeStamp=e&&e.timeStamp||ge.now(),void(this[ge.expando]=!0)):new ge.Event(e,t)},
// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
ge.Event.prototype={constructor:ge.Event,isDefaultPrevented:j,isPropagationStopped:j,isImmediatePropagationStopped:j,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=x,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=x,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=x,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},
// Includes all common event props including KeyEvent and MouseEvent specific props
ge.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;
// Add which for key events
// Add which for key events
// Add which for click: 1 === left; 2 === middle; 3 === right
return null==e.which&&Je.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ze.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},ge.event.addProp),
// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
ge.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){ge.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
// For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
return i&&(i===r||ge.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),ge.fn.extend({on:function(e,t,n,r){return C(this,e,t,n,r)},one:function(e,t,n,r){return C(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)
// ( event )  dispatched jQuery.Event
return r=e.handleObj,ge(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){
// ( types-object [, selector] )
for(i in e)this.off(i,t,e[i]);return this}
// ( types [, fn] )
return t!==!1&&"function"!=typeof t||(n=t,t=void 0),n===!1&&(n=j),this.each(function(){ge.event.remove(this,e,n,t)})}});var/* eslint-disable max-len */
// See https://github.com/eslint/eslint/issues/3229
tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,/* eslint-enable */
// Support: IE <=10 - 11, Edge 12 - 13
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
nt=/<script|<style|<link/i,
// checked="checked" or checked
rt=/checked\s*(?:[^=]|=\s*.checked.)/i,it=/^true\/(.*)/,ot=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;ge.extend({htmlPrefilter:function(e){return e.replace(tt,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=ge.contains(e.ownerDocument,e);
// Fix IE cloning issues
if(!(pe.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ge.isXMLDoc(e)))for(
// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
a=y(s),o=y(e),r=0,i=o.length;r<i;r++)D(o[r],a[r]);
// Copy the events from the original to the clone
if(t)if(n)for(o=o||y(e),a=a||y(s),r=0,i=o.length;r<i;r++)_(o[r],a[r]);else _(e,s);
// Return the cloned set
// Preserve script evaluation history
return a=y(s,"script"),a.length>0&&b(a,!u&&y(e,"script")),s},cleanData:function(e){for(var t,n,r,i=ge.event.special,o=0;void 0!==(n=e[o]);o++)if(He(n)){if(t=n[Le.expando]){if(t.events)for(r in t.events)i[r]?ge.event.remove(n,r):ge.removeEvent(n,r,t.handle);
// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
n[Le.expando]=void 0}n[Re.expando]&&(
// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
n[Re.expando]=void 0)}}}),ge.fn.extend({detach:function(e){return q(this,e,!0)},remove:function(e){return q(this,e)},text:function(e){return Oe(this,function(e){return void 0===e?ge.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return N(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=k(this,e);t.appendChild(e)}})},prepend:function(){return N(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=k(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return N(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return N(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(
// Prevent memory leaks
ge.cleanData(y(e,!1)),
// Remove any remaining nodes
e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return ge.clone(this,e,t)})},html:function(e){return Oe(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;
// See if we can take a shortcut and just use innerHTML
if("string"==typeof e&&!nt.test(e)&&!Ye[(Ue.exec(e)||["",""])[1].toLowerCase()]){e=ge.htmlPrefilter(e);try{for(;n<r;n++)t=this[n]||{},
// Remove element nodes and prevent memory leaks
1===t.nodeType&&(ge.cleanData(y(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];
// Make the changes, replacing each non-ignored context element with the new content
return N(this,arguments,function(t){var n=this.parentNode;ge.inArray(this,e)<0&&(ge.cleanData(y(this)),n&&n.replaceChild(t,this))},e)}}),ge.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){ge.fn[e]=function(e){for(var n,r=[],i=ge(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),ge(i[a])[t](n),
// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
ae.apply(r,n.get());return this.pushStack(r)}});var at=/^margin/,st=new RegExp("^("+Pe+")(?!px)[a-z%]+$","i"),ut=function(t){
// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)};!function(){
// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function t(){
// This is a singleton, we need to execute it only once
if(s){s.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",s.innerHTML="",Qe.appendChild(a);var t=e.getComputedStyle(s);n="1%"!==t.top,
// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
o="2px"===t.marginLeft,r="4px"===t.width,
// Support: Android 4.0 - 4.3 only
// Some styles come back with percentage values, even though they shouldn't
s.style.marginRight="50%",i="4px"===t.marginRight,Qe.removeChild(a),
// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
s=null}}var n,r,i,o,a=ne.createElement("div"),s=ne.createElement("div");
// Finish early in limited (non-browser) environments
s.style&&(
// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (#8908)
s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",pe.clearCloneStyle="content-box"===s.style.backgroundClip,a.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",a.appendChild(s),ge.extend(pe,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return t(),r},pixelMarginRight:function(){return t(),i},reliableMarginLeft:function(){return t(),o}}))}();var
// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
ct=/^(none|table(?!-c[ea]).+)/,lt=/^--/,ft={position:"absolute",visibility:"hidden",display:"block"},dt={letterSpacing:"0",fontWeight:"400"},pt=["Webkit","Moz","ms"],ht=ne.createElement("div").style;ge.extend({
// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function(e,t){if(t){
// We should always get a number back from opacity
var n=A(e,"opacity");return""===n?"1":n}}}},
// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},
// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{"float":"cssFloat"},
// Get and set the style property on a DOM Node
style:function(e,t,n,r){
// Don't set styles on text and comment nodes
if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){
// Make sure that we're working with the right name
var i,o,a,s=ge.camelCase(t),u=lt.test(t),c=e.style;
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
// background-* props affect original clone's values
// If a hook was provided, use that value, otherwise just set the specified value
return u||(t=H(s)),a=ge.cssHooks[t]||ge.cssHooks[s],void 0===n?a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:c[t]:(o=typeof n,"string"===o&&(i=Be.exec(n))&&i[1]&&(n=g(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(ge.cssNumber[s]?"":"px")),pe.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?c.setProperty(t,n):c[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,a,s=ge.camelCase(t),u=lt.test(t);
// Make numeric if forced or a qualifier was provided and val looks numeric
// Make sure that we're working with the right name. We don't
// want to modify the value if it is a CSS custom property
// since they are user-defined.
// Try prefixed name followed by the unprefixed name
// If a hook was provided get the computed value from there
// Otherwise, if a way to get the computed value exists, use that
// Convert "normal" to computed value
// Make numeric if forced or a qualifier was provided and val looks numeric
return u||(t=H(s)),a=ge.cssHooks[t]||ge.cssHooks[s],a&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=A(e,t,r)),"normal"===i&&t in dt&&(i=dt[t]),""===n||n?(o=parseFloat(i),n===!0||isFinite(o)?o||0:i):i}}),ge.each(["height","width"],function(e,t){ge.cssHooks[t]={get:function(e,n,r){if(n)
// Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
// Support: Safari 8+
// Table columns in Safari have non-zero offsetWidth & zero
// getBoundingClientRect().width unless display is changed.
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
return!ct.test(ge.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?I(e,t,r):$e(e,ft,function(){return I(e,t,r)})},set:function(e,n,r){var i,o=r&&ut(e),a=r&&R(e,t,r,"border-box"===ge.css(e,"boxSizing",!1,o),o);
// Convert to pixels if value adjustment is needed
return a&&(i=Be.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=ge.css(e,t)),L(e,n,a)}}}),ge.cssHooks.marginLeft=M(pe.reliableMarginLeft,function(e,t){if(t)return(parseFloat(A(e,"marginLeft"))||e.getBoundingClientRect().left-$e(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),
// These hooks are used by animate to expand properties
ge.each({margin:"",padding:"",border:"Width"},function(e,t){ge.cssHooks[e+t]={expand:function(n){for(var r=0,i={},
// Assumes a single number if not a string
o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+We[r]+t]=o[r]||o[r-2]||o[0];return i}},at.test(e)||(ge.cssHooks[e+t].set=L)}),ge.fn.extend({css:function(e,t){return Oe(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=ut(e),i=t.length;a<i;a++)o[t[a]]=ge.css(e,t[a],!1,r);return o}return void 0!==n?ge.style(e,t,n):ge.css(e,t)},e,t,arguments.length>1)}}),ge.Tween=F,F.prototype={constructor:F,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||ge.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ge.cssNumber[n]?"":"px")},cur:function(){var e=F.propHooks[this.prop];return e&&e.get?e.get(this):F.propHooks._default.get(this)},run:function(e){var t,n=F.propHooks[this.prop];return this.options.duration?this.pos=t=ge.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):F.propHooks._default.set(this),this}},F.prototype.init.prototype=F.prototype,F.propHooks={_default:{get:function(e){var t;
// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=ge.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function(e){
// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
ge.fx.step[e.prop]?ge.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[ge.cssProps[e.prop]]&&!ge.cssHooks[e.prop]?e.elem[e.prop]=e.now:ge.style(e.elem,e.prop,e.now+e.unit)}}},
// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
F.propHooks.scrollTop=F.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ge.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},ge.fx=F.prototype.init,
// Back compat <1.8 extension point
ge.fx.step={};var gt,mt,vt=/^(?:toggle|show|hide)$/,yt=/queueHooks$/;ge.Animation=ge.extend(z,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return g(n.elem,e,Be.exec(t),n),n}]},tweener:function(e,t){ge.isFunction(e)?(t=e,e=["*"]):e=e.match(qe);for(var n,r=0,i=e.length;r<i;r++)n=e[r],z.tweeners[n]=z.tweeners[n]||[],z.tweeners[n].unshift(t)},prefilters:[$],prefilter:function(e,t){t?z.prefilters.unshift(e):z.prefilters.push(e)}}),ge.speed=function(e,t,n){var r=e&&"object"==typeof e?ge.extend({},e):{complete:n||!n&&t||ge.isFunction(e)&&e,duration:e,easing:n&&t||t&&!ge.isFunction(t)&&t};
// Go to the end state if fx are off
// Normalize opt.queue - true/undefined/null -> "fx"
// Queueing
return ge.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in ge.fx.speeds?r.duration=ge.fx.speeds[r.duration]:r.duration=ge.fx.speeds._default),null!=r.queue&&r.queue!==!0||(r.queue="fx"),r.old=r.complete,r.complete=function(){ge.isFunction(r.old)&&r.old.call(this),r.queue&&ge.dequeue(this,r.queue)},r},ge.fn.extend({fadeTo:function(e,t,n,r){
// Show any hidden elements after setting opacity to 0
return this.filter(Ge).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=ge.isEmptyObject(e),o=ge.speed(t,n,r),a=function(){
// Operate on a copy of prop so per-property easing won't be lost
var t=z(this,ge.extend({},e),o);
// Empty animations, or finishing resolves immediately
(i||Le.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=ge.timers,a=Le.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&yt.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));
// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
!t&&n||ge.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=Le.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=ge.timers,a=r?r.length:0;
// Look for any active animations, and finish them
for(
// Enable finishing flag on private data
n.finish=!0,
// Empty the queue first
ge.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));
// Look for any animations in the old queue and finish them
for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);
// Turn off finishing flag
delete n.finish})}}),ge.each(["toggle","show","hide"],function(e,t){var n=ge.fn[t];ge.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(W(t,!0),e,r,i)}}),
// Generate shortcuts for custom animations
ge.each({slideDown:W("show"),slideUp:W("hide"),slideToggle:W("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){ge.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),ge.timers=[],ge.fx.tick=function(){var e,t=0,n=ge.timers;for(gt=ge.now();t<n.length;t++)e=n[t],
// Run the timer and safely remove it when done (allowing for external removal)
e()||n[t]!==e||n.splice(t--,1);n.length||ge.fx.stop(),gt=void 0},ge.fx.timer=function(e){ge.timers.push(e),ge.fx.start()},ge.fx.interval=13,ge.fx.start=function(){mt||(mt=!0,P())},ge.fx.stop=function(){mt=null},ge.fx.speeds={slow:600,fast:200,
// Default speed
_default:400},
// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
ge.fn.delay=function(t,n){return t=ge.fx?ge.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=ne.createElement("input"),t=ne.createElement("select"),n=t.appendChild(ne.createElement("option"));e.type="checkbox",
// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
pe.checkOn=""!==e.value,
// Support: IE <=11 only
// Must access selectedIndex to make default options select
pe.optSelected=n.selected,
// Support: IE <=11 only
// An input loses its value after becoming a radio
e=ne.createElement("input"),e.value="t",e.type="radio",pe.radioValue="t"===e.value}();var bt,wt=ge.expr.attrHandle;ge.fn.extend({attr:function(e,t){return Oe(this,ge.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){ge.removeAttr(this,e)})}}),ge.extend({attr:function(e,t,n){var r,i,o=e.nodeType;
// Don't get/set attributes on text, comment and attribute nodes
if(3!==o&&8!==o&&2!==o)
// Fallback to prop when attributes are not supported
// Fallback to prop when attributes are not supported
// Attribute hooks are determined by the lowercase version
// Grab necessary hook if one is defined
return"undefined"==typeof e.getAttribute?ge.prop(e,t,n):(1===o&&ge.isXMLDoc(e)||(i=ge.attrHooks[t.toLowerCase()]||(ge.expr.match.bool.test(t)?bt:void 0)),void 0!==n?null===n?void ge.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:(r=ge.find.attr(e,t),null==r?void 0:r))},attrHooks:{type:{set:function(e,t){if(!pe.radioValue&&"radio"===t&&i(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,
// Attribute names can contain non-HTML whitespace characters
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
i=t&&t.match(qe);if(i&&1===e.nodeType)for(;n=i[r++];)e.removeAttribute(n)}}),
// Hooks for boolean attributes
bt={set:function(e,t,n){
// Remove boolean attributes when set to false
return t===!1?ge.removeAttr(e,n):e.setAttribute(n,n),n}},ge.each(ge.expr.match.bool.source.match(/\w+/g),function(e,t){var n=wt[t]||ge.find.attr;wt[t]=function(e,t,r){var i,o,a=t.toLowerCase();
// Avoid an infinite loop by temporarily removing this function from the getter
return r||(o=wt[a],wt[a]=i,i=null!=n(e,t,r)?a:null,wt[a]=o),i}});var xt=/^(?:input|select|textarea|button)$/i,jt=/^(?:a|area)$/i;ge.fn.extend({prop:function(e,t){return Oe(this,ge.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[ge.propFix[e]||e]})}}),ge.extend({prop:function(e,t,n){var r,i,o=e.nodeType;
// Don't get/set properties on text, comment and attribute nodes
if(3!==o&&8!==o&&2!==o)
// Fix name and attach hooks
return 1===o&&ge.isXMLDoc(e)||(t=ge.propFix[t]||t,i=ge.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){
// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var t=ge.find.attr(e,"tabindex");return t?parseInt(t,10):xt.test(e.nodeName)||jt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),
// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
pe.optSelected||(ge.propHooks.selected={get:function(e){/* eslint no-unused-expressions: "off" */
var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){/* eslint no-unused-expressions: "off" */
var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),ge.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ge.propFix[this.toLowerCase()]=this}),ge.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(ge.isFunction(e))return this.each(function(t){ge(this).addClass(e.call(this,t,X(this)))});if("string"==typeof e&&e)for(t=e.match(qe)||[];n=this[u++];)if(i=X(n),r=1===n.nodeType&&" "+U(i)+" "){for(a=0;o=t[a++];)r.indexOf(" "+o+" ")<0&&(r+=o+" ");
// Only assign if different to avoid unneeded rendering.
s=U(r),i!==s&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(ge.isFunction(e))return this.each(function(t){ge(this).removeClass(e.call(this,t,X(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof e&&e)for(t=e.match(qe)||[];n=this[u++];)if(i=X(n),
// This expression is here for better compressibility (see addClass)
r=1===n.nodeType&&" "+U(i)+" "){for(a=0;o=t[a++];)
// Remove *all* instances
for(;r.indexOf(" "+o+" ")>-1;)r=r.replace(" "+o+" "," ");
// Only assign if different to avoid unneeded rendering.
s=U(r),i!==s&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):ge.isFunction(e)?this.each(function(n){ge(this).toggleClass(e.call(this,n,X(this),t),t)}):this.each(function(){var t,r,i,o;if("string"===n)for(
// Toggle individual class names
r=0,i=ge(this),o=e.match(qe)||[];t=o[r++];)
// Check each className given, space separated list
i.hasClass(t)?i.removeClass(t):i.addClass(t);else void 0!==e&&"boolean"!==n||(t=X(this),t&&
// Store className if set
Le.set(this,"__className__",t),
// If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
this.setAttribute&&this.setAttribute("class",t||e===!1?"":Le.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+U(X(n))+" ").indexOf(t)>-1)return!0;return!1}});var Tt=/\r/g;ge.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=ge.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,ge(this).val()):e,
// Treat null/undefined as ""; convert numbers to string
null==i?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=ge.map(i,function(e){return null==e?"":e+""})),t=ge.valHooks[this.type]||ge.valHooks[this.nodeName.toLowerCase()],
// If set returns undefined, fall back to normal setting
t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)
// Handle most common string cases
return t=ge.valHooks[i.type]||ge.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(Tt,""):null==n?"":n)}}}),ge.extend({valHooks:{option:{get:function(e){var t=ge.find.attr(e,"value");
// Support: IE <=10 - 11 only
// option.text throws exceptions (#14686, #14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
return null!=t?t:U(ge.text(e))}},select:{get:function(e){var t,n,r,o=e.options,a=e.selectedIndex,s="select-one"===e.type,u=s?null:[],c=s?a+1:o.length;
// Loop through all the selected options
for(r=a<0?c:s?a:0;r<c;r++)
// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (#2551)
if(n=o[r],(n.selected||r===a)&&
// Don't return options that are disabled or in a disabled optgroup
!n.disabled&&(!n.parentNode.disabled||!i(n.parentNode,"optgroup"))){
// We don't need an array for one selects
if(
// Get the specific value for the option
t=ge(n).val(),s)return t;
// Multi-Selects return an array
u.push(t)}return u},set:function(e,t){for(var n,r,i=e.options,o=ge.makeArray(t),a=i.length;a--;)r=i[a],/* eslint-disable no-cond-assign */
(r.selected=ge.inArray(ge.valHooks.option.get(r),o)>-1)&&(n=!0);
// Force browsers to behave consistently when non-matching value is set
return n||(e.selectedIndex=-1),o}}}}),
// Radios and checkboxes getter/setter
ge.each(["radio","checkbox"],function(){ge.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=ge.inArray(ge(e).val(),t)>-1}},pe.checkOn||(ge.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});
// Return jQuery for attributes-only inclusion
var Ct=/^(?:focusinfocus|focusoutblur)$/;ge.extend(ge.event,{trigger:function(t,n,r,i){var o,a,s,u,c,l,f,d=[r||ne],p=le.call(t,"type")?t.type:t,h=le.call(t,"namespace")?t.namespace.split("."):[];
// Don't do events on text and comment nodes
if(a=s=r=r||ne,3!==r.nodeType&&8!==r.nodeType&&!Ct.test(p+ge.event.triggered)&&(p.indexOf(".")>-1&&(
// Namespaced trigger; create a regexp to match event type in handle()
h=p.split("."),p=h.shift(),h.sort()),c=p.indexOf(":")<0&&"on"+p,
// Caller can pass in a jQuery.Event object, Object, or just an event type string
t=t[ge.expando]?t:new ge.Event(p,"object"==typeof t&&t),
// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
t.isTrigger=i?2:3,t.namespace=h.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,
// Clean up the event in case it is being reused
t.result=void 0,t.target||(t.target=r),
// Clone any incoming data and prepend the event, creating the handler arg list
n=null==n?[t]:ge.makeArray(n,[t]),
// Allow special events to draw outside the lines
f=ge.event.special[p]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){
// Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!i&&!f.noBubble&&!ge.isWindow(r)){for(u=f.delegateType||p,Ct.test(u+p)||(a=a.parentNode);a;a=a.parentNode)d.push(a),s=a;
// Only add window if we got to document (e.g., not plain obj or detached DOM)
s===(r.ownerDocument||ne)&&d.push(s.defaultView||s.parentWindow||e)}for(
// Fire handlers on the event path
o=0;(a=d[o++])&&!t.isPropagationStopped();)t.type=o>1?u:f.bindType||p,
// jQuery handler
l=(Le.get(a,"events")||{})[t.type]&&Le.get(a,"handle"),l&&l.apply(a,n),
// Native handler
l=c&&a[c],l&&l.apply&&He(a)&&(t.result=l.apply(a,n),t.result===!1&&t.preventDefault());
// If nobody prevented the default action, do it now
// Call a native DOM method on the target with the same name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
// Don't re-trigger an onFOO event when we call its FOO() method
// Prevent re-triggering of the same event, since we already bubbled it above
return t.type=p,i||t.isDefaultPrevented()||f._default&&f._default.apply(d.pop(),n)!==!1||!He(r)||c&&ge.isFunction(r[p])&&!ge.isWindow(r)&&(s=r[c],s&&(r[c]=null),ge.event.triggered=p,r[p](),ge.event.triggered=void 0,s&&(r[c]=s)),t.result}},
// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function(e,t,n){var r=ge.extend(new ge.Event,n,{type:e,isSimulated:!0});ge.event.trigger(r,null,t)}}),ge.fn.extend({trigger:function(e,t){return this.each(function(){ge.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return ge.event.trigger(e,t,n,!0)}}),ge.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){
// Handle event binding
ge.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),ge.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),pe.focusin="onfocusin"in e,
// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
pe.focusin||ge.each({focus:"focusin",blur:"focusout"},function(e,t){
// Attach a single capturing handler on the document while someone wants focusin/focusout
var n=function(e){ge.event.simulate(t,e.target,ge.event.fix(e))};ge.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=Le.access(r,t);i||r.addEventListener(e,n,!0),Le.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=Le.access(r,t)-1;i?Le.access(r,t,i):(r.removeEventListener(e,n,!0),Le.remove(r,t))}}});var kt=e.location,Et=ge.now(),St=/\?/;
// Cross-browser xml parsing
ge.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;
// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(r){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||ge.error("Invalid XML: "+t),n};var _t=/\[\]$/,Dt=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,qt=/^(?:input|select|textarea|keygen)/i;
// Serialize an array of form elements or a set of
// key/values into a query string
ge.param=function(e,t){var n,r=[],i=function(e,t){
// If value is a function, invoke it and use its return value
var n=ge.isFunction(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};
// If an array was passed in, assume that it is an array of form elements.
if(Array.isArray(e)||e.jquery&&!ge.isPlainObject(e))
// Serialize the form elements
ge.each(e,function(){i(this.name,this.value)});else
// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(n in e)Y(n,e[n],t,i);
// Return the resulting serialization
return r.join("&")},ge.fn.extend({serialize:function(){return ge.param(this.serializeArray())},serializeArray:function(){return this.map(function(){
// Can add propHook for "elements" to filter or add form elements
var e=ge.prop(this,"elements");return e?ge.makeArray(e):this}).filter(function(){var e=this.type;
// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!ge(this).is(":disabled")&&qt.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!ze.test(e))}).map(function(e,t){var n=ge(this).val();return null==n?null:Array.isArray(n)?ge.map(n,function(e){return{name:t.name,value:e.replace(Dt,"\r\n")}}):{name:t.name,value:n.replace(Dt,"\r\n")}}).get()}});var At=/%20/g,Mt=/#.*$/,Ot=/([?&])_=[^&]*/,Ht=/^(.*?):[ \t]*([^\r\n]*)$/gm,
// #7653, #8125, #8152: local protocol detection
Lt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Rt=/^(?:GET|HEAD)$/,It=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
Ft={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
Pt={},
// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
Bt="*/".concat("*"),
// Anchor tag for parsing the document origin
Wt=ne.createElement("a");Wt.href=kt.href,ge.extend({
// Counter for holding the number of active queries
active:0,
// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:kt.href,type:"GET",isLocal:Lt.test(kt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
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
accepts:{"*":Bt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},
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
"text xml":ge.parseXML},
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
return t?J(J(e,ge.ajaxSettings),t):J(ge.ajaxSettings,e)},ajaxPrefilter:K(Ft),ajaxTransport:K(Pt),
// Main method
ajax:function(t,n){
// Callback for when everything is done
function r(t,n,r,s){var c,d,p,w,x,j=n;
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
r&&(w=Z(h,T,r)),
// Convert no matter what (that way responseXXX fields are always set)
w=ee(h,w,T,c),
// If successful, handle type chaining
c?(
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
h.ifModified&&(x=T.getResponseHeader("Last-Modified"),x&&(ge.lastModified[o]=x),x=T.getResponseHeader("etag"),x&&(ge.etag[o]=x)),
// if no content
204===t||"HEAD"===h.type?j="nocontent":304===t?j="notmodified":(j=w.state,d=w.data,p=w.error,c=!p)):(
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
--ge.active||ge.event.trigger("ajaxStop")))}
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
h=ge.ajaxSetup({},n),
// Callbacks context
g=h.context||h,
// Context for global events is callbackContext if it is a DOM node or jQuery collection
m=h.context&&(g.nodeType||g.jquery)?ge(g):ge.event,
// Deferreds
v=ge.Deferred(),y=ge.Callbacks("once memory"),
// Status-dependent callbacks
b=h.statusCode||{},
// Headers (they are sent all at once)
w={},x={},
// Default abort message
j="canceled",
// Fake xhr
T={readyState:0,
// Builds headers hashtable if needed
getResponseHeader:function(e){var t;if(l){if(!s)for(s={};t=Ht.exec(a);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},
// Raw string
getAllResponseHeaders:function(){return l?a:null},
// Caches the header
setRequestHeader:function(e,t){return null==l&&(e=x[e.toLowerCase()]=x[e.toLowerCase()]||e,w[e]=t),this},
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
h.url=((t||h.url||kt.href)+"").replace(It,kt.protocol+"//"),
// Alias method option to type as per ticket #12004
h.type=n.method||n.type||h.method||h.type,
// Extract dataTypes list
h.dataTypes=(h.dataType||"*").toLowerCase().match(qe)||[""],null==h.crossDomain){c=ne.createElement("a");
// Support: IE <=8 - 11, Edge 12 - 13
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{c.href=h.url,
// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
c.href=c.href,h.crossDomain=Wt.protocol+"//"+Wt.host!=c.protocol+"//"+c.host}catch(C){
// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
h.crossDomain=!0}}
// If request was aborted inside a prefilter, stop there
if(
// Convert data if not already a string
h.data&&h.processData&&"string"!=typeof h.data&&(h.data=ge.param(h.data,h.traditional)),
// Apply prefilters
Q(Ft,h,n,T),l)return T;
// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
f=ge.event&&h.global,
// Watch for a new set of requests
f&&0===ge.active++&&ge.event.trigger("ajaxStart"),
// Uppercase the type
h.type=h.type.toUpperCase(),
// Determine if request has content
h.hasContent=!Rt.test(h.type),
// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
o=h.url.replace(Mt,""),
// More options handling for requests with no content
h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(At,"+")):(
// Remember the hash so we can put it back
p=h.url.slice(o.length),
// If data is available, append data to url
h.data&&(o+=(St.test(o)?"&":"?")+h.data,
// #9682: remove data so that it's not used in an eventual retry
delete h.data),
// Add or update anti-cache param if needed
h.cache===!1&&(o=o.replace(Ot,"$1"),p=(St.test(o)?"&":"?")+"_="+Et++ +p),
// Put hash and anti-cache on the URL that will be requested (gh-1732)
h.url=o+p),
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
h.ifModified&&(ge.lastModified[o]&&T.setRequestHeader("If-Modified-Since",ge.lastModified[o]),ge.etag[o]&&T.setRequestHeader("If-None-Match",ge.etag[o])),
// Set the correct header, if data is being sent
(h.data&&h.hasContent&&h.contentType!==!1||n.contentType)&&T.setRequestHeader("Content-Type",h.contentType),
// Set the Accepts header for the server, depending on the dataType
T.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+Bt+"; q=0.01":""):h.accepts["*"]);
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
i=Q(Pt,h,n,T)){
// If request was aborted inside ajaxSend, stop there
if(T.readyState=1,
// Send global event
f&&m.trigger("ajaxSend",[T,h]),l)return T;
// Timeout
h.async&&h.timeout>0&&(u=e.setTimeout(function(){T.abort("timeout")},h.timeout));try{l=!1,i.send(w,r)}catch(C){
// Rethrow post-completion exceptions
if(l)throw C;
// Propagate others as results
r(-1,C)}}else r(-1,"No Transport");return T},getJSON:function(e,t,n){return ge.get(e,t,n,"json")},getScript:function(e,t){return ge.get(e,void 0,t,"script")}}),ge.each(["get","post"],function(e,t){ge[t]=function(e,n,r,i){
// The url can be an options object (which then must have .url)
// Shift arguments if data argument was omitted
return ge.isFunction(n)&&(i=i||r,r=n,n=void 0),ge.ajax(ge.extend({url:e,type:t,dataType:i,data:n,success:r},ge.isPlainObject(e)&&e))}}),ge._evalUrl=function(e){return ge.ajax({url:e,
// Make this explicit, since user can override this through ajaxSetup (#11264)
type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},ge.fn.extend({wrapAll:function(e){var t;
// The elements to wrap the target around
return this[0]&&(ge.isFunction(e)&&(e=e.call(this[0])),t=ge(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return ge.isFunction(e)?this.each(function(t){ge(this).wrapInner(e.call(this,t))}):this.each(function(){var t=ge(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=ge.isFunction(e);return this.each(function(n){ge(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){ge(this).replaceWith(this.childNodes)}),this}}),ge.expr.pseudos.hidden=function(e){return!ge.expr.pseudos.visible(e)},ge.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},ge.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(t){}};var Gt={
// File protocol always yields status code 0, assume 200
0:200,
// Support: IE <=9 only
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},$t=ge.ajaxSettings.xhr();pe.cors=!!$t&&"withCredentials"in $t,pe.ajax=$t=!!$t,ge.ajaxTransport(function(t){var n,r;
// Cross domain only allowed if supported through XMLHttpRequest
if(pe.cors||$t&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();
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
n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?
// Support: IE <=9 only
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
"number"!=typeof s.status?o(0,"error"):o(
// File: protocol always yields status 0; see #8605, #14207
s.status,s.statusText):o(Gt[s.status]||s.status,s.statusText,
// Support: IE <=9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},
// Listen to events
s.onload=n(),r=s.onerror=n("error"),
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
ge.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),
// Install script dataType
ge.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return ge.globalEval(e),e}}}),
// Handle cache's special case and crossDomain
ge.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),
// Bind script tag hack transport
ge.ajaxTransport("script",function(e){
// This transport only deals with cross domain requests
if(e.crossDomain){var t,n;return{send:function(r,i){t=ge("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),
// Use native DOM manipulation to avoid our domManip AJAX trickery
ne.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Vt=[],zt=/(=)\?(?=&|$)|\?\?/;
// Default jsonp settings
ge.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Vt.pop()||ge.expando+"_"+Et++;return this[e]=!0,e}}),
// Detect, normalize options and install callbacks for jsonp requests
ge.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=t.jsonp!==!1&&(zt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&zt.test(t.data)&&"data");
// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(s||"jsonp"===t.dataTypes[0])
// Delegate to script
// Get callback name, remembering preexisting value associated with it
// Insert callback into url or form data
// Use data converter to retrieve json after script execution
// Force json dataType
// Install callback
// Clean-up function (fires after converters)
return i=t.jsonpCallback=ge.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(zt,"$1"+i):t.jsonp!==!1&&(t.url+=(St.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||ge.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){
// If previous value didn't exist - remove it
void 0===o?ge(e).removeProp(i):e[i]=o,
// Save back as free
t[i]&&(
// Make sure that re-using the options doesn't screw things around
t.jsonpCallback=n.jsonpCallback,
// Save the callback name for future use
Vt.push(i)),
// Call if it was a function and we have a response
a&&ge.isFunction(o)&&o(a[0]),a=o=void 0}),"script"}),
// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
pe.createHTMLDocument=function(){var e=ne.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),
// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
ge.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var r,i,o;
// Single tag
// Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
// Single tag
return t||(pe.createHTMLDocument?(t=ne.implementation.createHTMLDocument(""),r=t.createElement("base"),r.href=ne.location.href,t.head.appendChild(r)):t=ne),i=Ce.exec(e),o=!n&&[],i?[t.createElement(i[1])]:(i=w([e],t,o),o&&o.length&&ge(o).remove(),ge.merge([],i.childNodes))},/**
 * Load a url into a page
 */
ge.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");
// If it's a function
// We assume that it's the callback
// If we have elements to modify, make the request
return s>-1&&(r=U(e.slice(s)),e=e.slice(0,s)),ge.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&ge.ajax({url:e,
// If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:i||"GET",dataType:"html",data:t}).done(function(e){
// Save response for use in complete callback
o=arguments,a.html(r?
// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
ge("<div>").append(ge.parseHTML(e)).find(r):
// Otherwise use the full result
e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},
// Attach a bunch of functions for handling common AJAX events
ge.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ge.fn[t]=function(e){return this.on(t,e)}}),ge.expr.pseudos.animated=function(e){return ge.grep(ge.timers,function(t){return e===t.elem}).length},ge.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,c,l=ge.css(e,"position"),f=ge(e),d={};
// Set position first, in-case top/left are set even on static elem
"static"===l&&(e.style.position="relative"),s=f.offset(),o=ge.css(e,"top"),u=ge.css(e,"left"),c=("absolute"===l||"fixed"===l)&&(o+u).indexOf("auto")>-1,
// Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
c?(r=f.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),ge.isFunction(t)&&(
// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
t=t.call(e,n,ge.extend({},s))),null!=t.top&&(d.top=t.top-s.top+a),null!=t.left&&(d.left=t.left-s.left+i),"using"in t?t.using.call(e,d):f.css(d)}},ge.fn.extend({offset:function(e){
// Preserve chaining for setter
if(arguments.length)return void 0===e?this:this.each(function(t){ge.offset.setOffset(this,e,t)});var t,n,r,i,o=this[0];if(o)
// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
return o.getClientRects().length?(r=o.getBoundingClientRect(),t=o.ownerDocument,n=t.documentElement,i=t.defaultView,{top:r.top+i.pageYOffset-n.clientTop,left:r.left+i.pageXOffset-n.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};
// Subtract parent offsets and element margins
// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
// because it is its only offset parent
// Assume getBoundingClientRect is there when computed position is fixed
// Get *real* offsetParent
// Get correct offsets
// Add offsetParent borders
return"fixed"===ge.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),i(e[0],"html")||(r=e.offset()),r={top:r.top+ge.css(e[0],"borderTopWidth",!0),left:r.left+ge.css(e[0],"borderLeftWidth",!0)}),{top:t.top-r.top-ge.css(n,"marginTop",!0),left:t.left-r.left-ge.css(n,"marginLeft",!0)}}},
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
offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===ge.css(e,"position");)e=e.offsetParent;return e||Qe})}}),
// Create scrollLeft and scrollTop methods
ge.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;ge.fn[e]=function(r){return Oe(this,function(e,r,i){
// Coalesce documents and windows
var o;return ge.isWindow(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i?o?o[t]:e[r]:void(o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i)},e,r,arguments.length)}}),
// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
ge.each(["top","left"],function(e,t){ge.cssHooks[t]=M(pe.pixelPosition,function(e,n){if(n)
// If curCSS returns percentage, fallback to offset
return n=A(e,t),st.test(n)?ge(e).position()[t]+"px":n})}),
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
ge.each({Height:"height",Width:"width"},function(e,t){ge.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){
// Margin is only for outerHeight, outerWidth
ge.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(i===!0||o===!0?"margin":"border");return Oe(this,function(t,n,i){var o;
// Get document width or height
// Get width or height on the element, requesting but not forcing parseFloat
// Set width or height on the element
return ge.isWindow(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?ge.css(t,n,s):ge.style(t,n,i,s)},t,a?i:void 0,a)}})}),ge.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){
// ( namespace ) or ( selector, types [, fn] )
return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),ge.holdReady=function(e){e?ge.readyWait++:ge.ready(!0)},ge.isArray=Array.isArray,ge.parseJSON=JSON.parse,ge.nodeName=i,
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
"function"==typeof define&&define.amd&&define("jquery",[],function(){return ge});var
// Map over jQuery in case of overwrite
Ut=e.jQuery,
// Map over the $ in case of overwrite
Xt=e.$;
// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
return ge.noConflict=function(t){return e.$===ge&&(e.$=Xt),t&&e.jQuery===ge&&(e.jQuery=Ut),ge},t||(e.jQuery=e.$=ge),ge})}()}),require.register("process/browser.js",function(e,n,r){n=t(n,{},"process"),function(){function e(){throw new Error("setTimeout has not been defined")}function t(){throw new Error("clearTimeout has not been defined")}function n(t){if(c===setTimeout)
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
f.versions={},f.on=u,f.addListener=u,f.once=u,f.off=u,f.removeListener=u,f.removeAllListeners=u,f.emit=u,f.prependListener=u,f.prependOnceListener=u,f.listeners=function(e){return[]},f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}}()}),require.register("pubsub-js/src/pubsub.js",function(e,n,r){n=t(n,{},"pubsub-js"),function(){/*
Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
License: MIT - http://mrgnrdrck.mit-license.org

https://github.com/mroderick/PubSubJS
*/
!function(t,n){"use strict";var i={};t.PubSub=i;var o=t.define;n(i),
// AMD support
"function"==typeof o&&o.amd?o(function(){return i}):"object"==typeof e&&(void 0!==r&&r.exports&&(e=r.exports=i),e.PubSub=i,// CommonJS module 1.1.1 spec
r.exports=e=i)}("object"==typeof window&&window||this,function(e){"use strict";function t(e){var t;for(t in e)if(e.hasOwnProperty(t))return!0;return!1}/**
	 *	Returns a function that throws the passed exception, for use as argument for setTimeout
	 *	@param { Object } ex An Error object
	 */
function n(e){return function(){throw e}}function r(e,t,r){try{e(t,r)}catch(i){setTimeout(n(i),0)}}function i(e,t,n){e(t,n)}function o(e,t,n,o){var a,s=c[t],u=o?i:r;if(c.hasOwnProperty(t))for(a in s)s.hasOwnProperty(a)&&u(s[a],e,n)}function a(e,t,n){return function(){var r=String(e),i=r.lastIndexOf(".");
// trim the hierarchy and deliver message to each level
for(
// deliver the message as it is now
o(e,e,t,n);i!==-1;)r=r.substr(0,i),i=r.lastIndexOf("."),o(e,r,t,n)}}function s(e){for(var n=String(e),r=Boolean(c.hasOwnProperty(n)&&t(c[n])),i=n.lastIndexOf(".");!r&&i!==-1;)n=n.substr(0,i),i=n.lastIndexOf("."),r=Boolean(c.hasOwnProperty(n)&&t(c[n]));return r}function u(e,t,n,r){var i=a(e,t,r),o=s(e);return!!o&&(n===!0?i():setTimeout(i,0),!0)}var c={},l=-1;/**
	 *	PubSub.publish( message[, data] ) -> Boolean
	 *	- message (String): The message to publish
	 *	- data: The data to pass to subscribers
	 *	Publishes the the message, passing the data to it's subscribers
	**/
e.publish=function(t,n){return u(t,n,!1,e.immediateExceptions)},/**
	 *	PubSub.publishSync( message[, data] ) -> Boolean
	 *	- message (String): The message to publish
	 *	- data: The data to pass to subscribers
	 *	Publishes the the message synchronously, passing the data to it's subscribers
	**/
e.publishSync=function(t,n){return u(t,n,!0,e.immediateExceptions)},/**
	 *	PubSub.subscribe( message, func ) -> String
	 *	- message (String): The message to subscribe to
	 *	- func (Function): The function to call when a new message is published
	 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
	 *	you need to unsubscribe
	**/
e.subscribe=function(e,t){if("function"!=typeof t)return!1;
// message is not registered yet
c.hasOwnProperty(e)||(c[e]={});
// forcing token as String, to allow for future expansions without breaking usage
// and allow for easy use as key names for the 'messages' object
var n="uid_"+String(++l);
// return token for unsubscribing
return c[e][n]=t,n},/* Public: Clears all subscriptions
	 */
e.clearAllSubscriptions=function(){c={}},/*Public: Clear subscriptions by the topic
	*/
e.clearSubscriptions=function(e){var t;for(t in c)c.hasOwnProperty(t)&&0===t.indexOf(e)&&delete c[t]},/* Public: removes subscriptions.
	 * When passed a token, removes a specific subscription.
	 * When passed a function, removes all subscriptions for that function
	 * When passed a topic, removes all subscriptions for that topic (hierarchy)
	 *
	 * value - A token, function or topic to unsubscribe.
	 *
	 * Examples
	 *
	 *		// Example 1 - unsubscribing with a token
	 *		var token = PubSub.subscribe('mytopic', myFunc);
	 *		PubSub.unsubscribe(token);
	 *
	 *		// Example 2 - unsubscribing with a function
	 *		PubSub.unsubscribe(myFunc);
	 *
	 *		// Example 3 - unsubscribing a topic
	 *		PubSub.unsubscribe('mytopic');
	 */
e.unsubscribe=function(t){var n,r,i,o=function(e){var t;for(t in c)if(c.hasOwnProperty(t)&&0===t.indexOf(e))
// a descendant of the topic exists:
return!0;return!1},a="string"==typeof t&&(c.hasOwnProperty(t)||o(t)),s=!a&&"string"==typeof t,u="function"==typeof t,l=!1;if(a)return void e.clearSubscriptions(t);for(n in c)if(c.hasOwnProperty(n)){if(r=c[n],s&&r[t]){delete r[t],l=t;
// tokens are unique, so we can just stop here
break}if(u)for(i in r)r.hasOwnProperty(i)&&r[i]===t&&(delete r[i],l=!0)}return l}})}()}),require.register("armorDecorator.js",function(e,t,n){function r(){a(c).not("[data-fate-armor-init]").each(function(e,t){
// Don't mistake popups for gear (popups don't have carraige returns in them)
if(a(this).attr("title").includes("\n")){a(this).attr("data-fate-armor-init",!0);var n=a(this).attr("title").split("\n")[0];a(this).attr("data-fate-armor-name",n);var r=a(this).is(".masterwork");a(this).attr("data-fate-masterwork",r);var i=a(this).attr("id").split("-")[0];a(this).attr("data-fate-serial",i)}})}function i(){a("[data-fate-armor-init=true]").each(function(e,t){var n=a(this).attr("data-fate-serial"),r=s.get(n),i=void 0!=r;a(this).attr("data-fate-armor-registered",i),i?a(this).attr("data-fate-comment",r.comments):a(this).removeAttr("data-fate-comment")})}const o=t("fateBus.js");o.registerModule(n);var a=t("jquery"),s=t("armorRollDatabase.js").armorRollDB,u=["Helmet","Gauntlets","Chest Armor","Leg Armor","Warlock Bond","Titan Mark","Hunter Cloak"],c=u.map(function(e){return"[title$='"+e+"']"}).join(",");o.subscribe(n,"fate.refresh",function(){r(),i()})}),require.register("armorRoll.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}const i=t("fateBus.js");i.registerModule(n);var o=function a(e,t,n,i,o,s){r(this,a),this.rollID=e,this.name=t,this.comments="["+n+" - "+i+"/"+o+"] "+s};e.ArmorRoll=o}),require.register("armorRollDataRefresher.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("itemDataRefresher.js");r.subscribe(n,"fate.configurationLoaded",function(e,t){new i.ItemDataRefresher("armorRoll",t.armorRollTSV)})}),require.register("armorRollDatabase.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}const a=t("fateBus.js");a.registerModule(n);var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=(t("logger"),t("itemDatabase.js")),c=t("armorRoll.js"),l=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"armorRoll"))}return o(t,e),s(t,[{key:"createItemFromData",value:function(e){this.itemMap.set(e[0],new c.ArmorRoll(e[0],e[1],e[2],e[3],e[4],e[5]))}}]),t}(u.ItemDatabase);e.armorRollDB=new l}),require.register("beautification.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("jquery");r.subscribe(n,"fate.init",function(){GM_addStyle(GM_getResourceText("fateOfAllFoolsCSS"))}),
// Remove the subclass icons
r.subscribe(n,"fate.refresh",function(){
// AFAIK this is a serial number that shouldn't change between versions...?
i(".bucket-3284755031").parents(".store-row").attr("style","display:none")}),
// Remove the "Weapons" title bar
r.subscribe(n,"fate.refresh",function(){i('.inventory-title:contains("Weapons")').attr("style","display:none")})}),require.register("commentDecorator.js",function(e,t,n){function r(){a.log("commentDecorator.js: Updating tooltips"),o("[data-fate-weapon-registered=true]").each(function(e,t){var n=o(this).attr("data-fate-weapon-name"),r=o(this).attr("data-fate-weapon-type"),i=o(this).attr("data-fate-comment");o(this).attr("title",n+" // "+r+"\n"+i)}),o("[data-fate-shader-registered=true]").each(function(e,t){var n=o(this).attr("data-fate-shader-name"),r=o(this).attr("data-fate-comment");o(this).attr("title",n+"\n"+r)}),o("[data-fate-armor-registered=true]").each(function(e,t){var n=o(this).attr("data-fate-armor-name"),r=o(this).attr("data-fate-comment");o(this).attr("title",n+"\n"+r)})}const i=t("fateBus.js");i.registerModule(n);var o=t("jquery"),a=t("logger");i.subscribe(n,"fate.refresh",r)}),require.register("configuration.js",function(e,t,n){function r(){s.log("configuration.js: Initializing"),GM_config.init({id:"FateConfig",fields:{rollDataTSV:{label:"Weapon Rolls Tab-Separated Values",type:"text","default":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1131147082&single=true&output=tsv"},armorRollTSV:{label:"Armor Rolls Tab-Separated Values",type:"text","default":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1332329724&single=true&output=tsv"},shaderDataTSV:{label:"Shader Data Tab-Separated Values",type:"text","default":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1194152043&single=true&output=tsv"}},events:{save:function(){o.subscribe(n,"fate.refresh",r)}}}),o.publish(n,"fate.configurationLoaded",{rollDataTSV:GM_config.get("rollDataTSV"),armorRollTSV:GM_config.get("armorRollTSV"),shaderDataTSV:GM_config.get("shaderDataTSV")})}function i(){a(".fate-config").length>0||(a(".header-links").prepend("<a class='link fate-config'>FATE Config</a>"),a(".fate-config").on("click",function(){GM_config.open()}))}const o=t("fateBus.js");o.registerModule(n);var a=t("jquery"),s=t("logger");o.subscribe(n,"fate.init",r),o.subscribe(n,"fate.refresh",i)}),require.register("dupeIndicator.js",function(e,t,n){function r(){var e=new Map;return s("[data-fate-weapon-name]").each(function(t,n){var r=s(this).attr("data-fate-weapon-name"),i={name:r,domElement:this};e.has(r)?e.set(r,e.get(r).concat(i)):e.set(r,[i])}),e}function i(e){var t=!0,n=!1,r=void 0;try{for(var i,o=function(){var e=a(i.value,2),t=(e[0],e[1]);t.forEach(function(e){if(1===t.length)s(e.domElement).attr("data-fate-weapon-dupe",!1);else{var n="false"===s(e.domElement).attr("data-fate-weapon-registered");s(e.domElement).attr("data-fate-weapon-dupe",n)}})},u=e[Symbol.iterator]();!(t=(i=u.next()).done);t=!0)o()}catch(c){n=!0,r=c}finally{try{!t&&u["return"]&&u["return"]()}finally{if(n)throw r}}}const o=t("fateBus.js");o.registerModule(n);var a=function(){function e(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){i=!0,o=u}finally{try{!r&&s["return"]&&s["return"]()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=t("jquery"),u=t("logger.js");t("indicators.js");o.subscribe(n,"fate.refresh",function(){u.log("dupeIndicator.js: Calculating duplicates"),i(r())})}),require.register("fateBus.js",function(e,t,n){"use strict";function r(e){p.set(e.id,!1)}function i(){p.clear()}function o(e){return p.get(e.id)}function a(e,t,n){if(!p.has(e.id))throw new Error("fateBus.js#publish: Module ["+e.id+"] is not defined");o(e)||d.publishSync(t,n)}function s(e,t,n){if(!p.has(e.id))throw new Error("fateBus.js#subscribe: Module ["+e.id+"] is not defined");d.subscribe(t,function(t,r){p.has(e.id)&&(o(e)||n(t,r))})}function u(e){p.set(e,!0)}function c(){var e=Array.from(p.keys());e.forEach(function(e){u(e)})}function l(e){p.set(e,!1)}function f(e){d.unsubscribe(e)}var d=t("pubsub-js"),p=new Map;e.registerModule=r,e.deregisterModules=i,e.publish=a,e.subscribe=s,e.mute=u,e.muteAll=c,e.unmute=l,e.unsubscribeFunctionFromAllTopics=f}),require.register("indicators.js",function(e,t,n){function r(){o("[data-fate-weapon-name],[data-fate-armor-name]").not('[data-fate-indicator-init="true"]').each(function(e,t){d.forEach(function(e,n){o(t).append(o("<div>",{"class":n+" "+e+" foaf-glyph"}))}),o(this).append(o('<div class="foaf-masterwork foaf-glyph">M</div>')),o(this).attr("data-fate-indicator-init",!0)})}const i=t("fateBus.js");i.registerModule(n);var o=t("jquery"),a=t("logger.js"),s="foaf-dupe",u="foaf-junk",c="foaf-pve",l="foaf-pvp",f="foaf-fave",d=new Map([[s,"fglyph-knives"],[u,"fglyph-thumbs-down"],[c,"fglyph-pve"],[l,"fglyph-pvp"],[f,"fglyph-fave"]]);i.subscribe(n,"fate.refresh",function(){a.log("indicators.js: Inserting indicator elements"),r()}),e.DUPLICATE_INDICATOR_CLASS=s}),require.register("itemDataRefresher.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}const i=t("fateBus.js");i.registerModule(n);var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=t("logger"),s=t("blueimp-md5");e.ItemDataRefresher=function(){function e(t,o,a){r(this,e),this.itemType=t,this.dataTSVURL=o,this.subscriptionFunction=this.refresh.bind(this);var s=void 0===a?"fate.itemDataStale":a;i.subscribe(n,s,this.subscriptionFunction),i.subscribe(n,"fate.configurationLoaded",this.deregister.bind(this))}return o(e,[{key:"onLoadHandler",value:function(e){a.log("itemDataRefresher.js ("+this.itemType+"): data fetched");var t=e.responseText,r=s(t);if(this.rawDataMD5===r)return a.log("itemDataRefresher.js ("+this.itemType+"): Checksums match, skipping refresh"),void i.publish(n,"fate."+this.itemType+"DataUpdated");this.rawDataMD5=r,a.log("itemDataRefresher.js ("+this.itemType+"): Modified data, triggering refresh");var o=t.substring(t.indexOf("\n")+1);o=o.substring(o.indexOf("\n")+1),i.publish(n,"fate."+this.itemType+"DataFetched",o),i.publish(n,"fate.refresh")}},{key:"refresh",value:function(){GM_xmlhttpRequest({method:"GET",url:this.dataTSVURL,onload:this.onLoadHandler.bind(this)})}},{key:"deregister",value:function(){i.unsubscribeFunctionFromAllTopics(this.subscriptionFunction)}}]),e}()}),require.register("itemDatabase.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}const i=t("fateBus.js");i.registerModule(n);var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=t("logger"),s=function(){function e(t){r(this,e),this.itemType=t,this.itemMap=new Map,i.subscribe(n,"fate."+this.itemType+"DataFetched",this.refresh.bind(this))}return o(e,[{key:"refresh",value:function(e,t){this.itemMap.clear();var r=t.split(/[\r\n]+/),o=!0,s=!1,u=void 0;try{for(var c,l=r[Symbol.iterator]();!(o=(c=l.next()).done);o=!0){var f=c.value;this.createItemFromData(f.split("\t"))}}catch(d){s=!0,u=d}finally{try{!o&&l["return"]&&l["return"]()}finally{if(s)throw u}}i.publish(n,"fate."+this.itemType+"DataUpdated"),a.log("itemDatabase.js ("+this.itemType+"): Found ("+r.length+") items")}},{key:"createItemFromData",value:function(e){}},{key:"contains",value:function(e){return this.itemMap.has(e)}},{key:"get",value:function(e){return this.itemMap.get(e)}}]),e}();e.ItemDatabase=s}),require.register("itemIdCopy.js",function(e,t,n){function r(){s("[data-fate-serial]").not("[data-fate-copy-init]").each(function(){s(this).attr("data-fate-copy-init",!0),Mousetrap.bind("s",function(){var e=s(document.elementFromPoint(u,c));e.parents("[data-fate-serial]").each(function(e,t){var n=s(this).attr("data-fate-serial"),r=s(this).attr("data-fate-weapon-name"),o=s(this).attr("data-fate-armor-name"),a=void 0===r?o:r;i(n),s.toast({text:'<span style="font-size:16px;"><strong>'+a+"</strong> serial number copied to clipboard</span>"})})},"keypress"),Mousetrap.bind("n",function(){var e=s(document.elementFromPoint(u,c));e.parents("[data-fate-serial]").each(function(e,t){var n=s(this).attr("data-fate-weapon-name"),r=s(this).attr("data-fate-armor-name"),o=void 0===n?r:n;i(o),s.toast({text:'<span style="font-size:16px;"><strong>'+o+"</strong> copied to clipboard</span>"})})},"keypress")})}/*
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
document.getSelection().addRange(n))}const o=t("fateBus.js");o.registerModule(n);var a=t("logger.js"),s=jQuery=t("jquery");t("jquery-toast-plugin");var u=void 0,c=void 0;s("body").mousemove(function(e){
// When scrolling, need to take viewport in to account
u=e.pageX-window.pageXOffset,c=e.pageY-window.pageYOffset}),o.subscribe(n,"fate.refresh",function(){a.log("itemIdCopy.js: Registering copy on all weapons"),r()})}),require.register("logger.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=!1;e.setEnabled=function(e){i=e},e.log=function(e){i&&GM_log("[FATE] "+e)}}),require.register("main.js",function(e,t,n){const r=t("fateBus.js");/*
  The nicest change-refresh flow means loading the development version of
  the script from Tampermonkey while editing. This lets us skip kicking off
  the app when running under Karma.
*/
if(r.registerModule(n),
// Install the configuration interface and set default values
t("configuration.js"),
// Use DIM styling overrides and our own custom styling
t("beautification.js"),
// Update weapon comments from our database
t("commentDecorator.js"),
// Show higher/lower dupes
t("dupeIndicator.js"),
// Retrieve and publish data for all item types
t("itemDataRefresher.js"),
// Copy-to-clipboard support for the serial number
t("itemIdCopy.js"),t("shader.js"),t("shaderDatabase.js"),t("shaderDecorator.js"),t("shaderDataRefresher.js"),t("shaderStatusIndicator.js"),t("weaponDecorator.js"),t("weaponRollAssessment.js"),t("weaponRollDatabase.js"),t("weaponRollDataRefresher.js"),t("armorDecorator.js"),t("armorRoll.js"),t("armorRollDatabase.js"),t("armorRollDataRefresher.js"),t("indicators.js"),!window.navigator.userAgent.includes("HeadlessChrome")){var i=t("logger"),o=t("jquery");i.setEnabled(!0),i.log("main.js: Initializing"),
// One-time configuration (CSS, data URLs, etc.)
r.publish(n,"fate.init"),
// Refresh from Google Sheets
r.publish(n,"fate.itemDataStale");
// First update, ASAP
var a=setInterval(function(){o(".item-img").length>1&&(clearInterval(a),r.publish(n,"fate.refresh"))},100);
// Update from Google Sheets every so often, but it doesn't refresh cache all
// that often so we can chill out for a bit
setInterval(function(){r.publish(n,"fate.itemDataStale")},6e4),
// When we move items around, delete items, etc. they need to be refreshed
setInterval(function(){r.publish(n,"fate.refresh")},3e3)}}),require.register("shader.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}const i=t("fateBus.js");i.registerModule(n);var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a={NO:"n",YES:"y",UNKNOWN:"?"},s=function(){function e(t,n,i){r(this,e),this.name=t,this.keep=n.toLowerCase(),this.comments=i}return o(e,[{key:"keepStatus",get:function(){switch(this.keep){case"y":return a.YES;case"n":return a.NO;default:return a.UNKNOWN}}}]),e}();e.Shader=s,e.Keep=a}),require.register("shaderDataRefresher.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("itemDataRefresher.js");r.subscribe(n,"fate.configurationLoaded",function(e,t){new i.ItemDataRefresher("shader",t.shaderDataTSV)})}),require.register("shaderDatabase.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}const a=t("fateBus.js");a.registerModule(n);var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=(t("logger"),t("itemDatabase.js")),c=t("shader.js"),l=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"shader"))}return o(t,e),s(t,[{key:"createItemFromData",value:function(e){this.itemMap.set(e[0],new c.Shader(e[0],e[1],e[2]))}}]),t}(u.ItemDatabase);e.shaderDB=new l}),require.register("shaderDecorator.js",function(e,t,n){function r(){u("[title$=Shader]").not("[data-fate-shader-name]").each(function(e,t){u(this).attr("data-fate-shader-name",u(this).attr("title").split("\n")[0])})}function i(){u("[data-fate-shader-name]").each(function(e,t){var n=u(this).attr("data-fate-shader-name");u(this).attr("data-fate-shader-registered",l.contains(n))})}function o(){u('[data-fate-shader-registered="true"]').each(function(e,t){var n=l.get(u(this).attr("data-fate-shader-name"));switch(n.keepStatus){case c.Keep.YES:u(this).attr("data-fate-shader-keep",!0);break;case c.Keep.NO:u(this).attr("data-fate-shader-keep",!1);break;case c.Keep.UNKNOWN:u(this).attr("data-fate-shader-keep","unknown")}})}function a(){u('[data-fate-shader-registered="true"]').each(function(e,t){var n=l.get(u(this).attr("data-fate-shader-name"));u(this).attr("data-fate-comment",n.comments)})}const s=t("fateBus.js");s.registerModule(n);var u=t("jquery"),c=t("shader.js"),l=t("shaderDatabase.js").shaderDB;s.subscribe(n,"fate.refresh",function(){r(),i(),o(),a()})}),require.register("shaderStatusIndicator.js",function(e,t,n){function r(){o("[data-fate-shader-name]").not('[data-fate-shader-init="true"]').each(function(e,t){o(this).append(o("<div>",{"class":"fate-question-mark fate-middling fglyph-question-mark fate-ignore-slot fate-glyph"})),o(this).append(o("<div>",{"class":"fate-fave          fate-positive fglyph-fave          fate-ignore-slot fate-glyph"})),o(this).append(o("<div>",{"class":"fate-thumbs-down   fate-positive fglyph-thumbs-down   fate-ignore-slot fate-glyph"})),o(this).attr("data-fate-shader-init",!0)})}const i=t("fateBus.js");i.registerModule(n);var o=t("jquery"),a=t("logger.js");i.subscribe(n,"fate.refresh",function(){a.log("ignoreStatusIndicator.js: Calculating ignore status"),r()})}),require.register("weaponDecorator.js",function(e,t,n){function r(){a(l).not("[data-fate-weapon-name]").each(function(e,t){
// We need to exclude trying to treat the weapon detail popup as something to be decorated
if(a(this).attr("title").includes("\n")){var n=a(this).attr("title").split("\n")[0];a(this).attr("data-fate-weapon-name",n);var r=a(this).is(".masterwork");a(this).attr("data-fate-masterwork",r);var i=a(this).attr("id").split("-")[0];a(this).attr("data-fate-serial",i)}})}function i(){a("[data-fate-weapon-name]").each(function(e,t){var n=a(this).attr("data-fate-serial"),r=s.contains(n);if(a(this).attr("data-fate-weapon-registered",r),!r)return a(this).removeAttr("data-fate-weapon-junk"),a(this).removeAttr("data-fate-weapon-pve"),void a(this).removeAttr("data-fate-weapon-pvp");var i=s.get(n);a(this).attr("data-fate-comment",i.comments),a(this).attr("data-fate-weapon-junk",i.pveUtility===u.NO&&i.pvpUtility===u.NO),a(this).attr("data-fate-weapon-pve",i.pveUtility===u.YES),a(this).attr("data-fate-weapon-pvp",i.pvpUtility===u.YES)})}const o=t("fateBus.js");o.registerModule(n);var a=t("jquery"),s=t("weaponRollDatabase.js").weaponRollDB,u=t("weaponRollAssessment.js").Utility,c=["Rifle",// Scout, Pulse, Auto, Sniper
"Cannon",// Hand Cannon
"Sidearm","Bow","Shotgun","Launcher",// Rocket, Grenade
"Machine Gun","Submachine Gun","Sword"],l=c.map(function(e){return"[title$='"+e+"']"}).join(",");o.subscribe(n,"fate.refresh",function(){r(),i()})}),require.register("weaponRollAssessment.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}const i=t("fateBus.js");i.registerModule(n);var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a={NO:"n",YES:"y",UNKNOWN:"?"},s=function(){function e(t,n,i,o,a){r(this,e),this.rollID=t,this.name=n,this.pve=i.toLowerCase(),this.pvp=o.toLowerCase(),this.comments=a}return o(e,[{key:"pveUtility",get:function(){return e.mapToStatus(this.pve)}},{key:"pvpUtility",get:function(){return e.mapToStatus(this.pvp)}}],[{key:"mapToStatus",value:function(e){switch(e){case"y":return a.YES;case"n":return a.NO;default:return a.UNKNOWN}}}]),e}();e.WeaponRollAssessment=s,e.Utility=a}),require.register("weaponRollDataRefresher.js",function(e,t,n){const r=t("fateBus.js");r.registerModule(n);var i=t("itemDataRefresher.js");r.subscribe(n,"fate.configurationLoaded",function(e,t){new i.ItemDataRefresher("weaponRoll",t.rollDataTSV)})}),require.register("weaponRollDatabase.js",function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}const a=t("fateBus.js");a.registerModule(n);var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=(t("logger"),t("itemDatabase.js")),c=t("weaponRollAssessment.js"),l=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"weaponRoll"))}return o(t,e),s(t,[{key:"createItemFromData",value:function(e){this.itemMap.set(e[0],new c.WeaponRollAssessment(e[0],e[1],e[2],e[3],e[4]))}}]),t}(u.ItemDatabase);e.weaponRollDB=new l}),require.alias("blueimp-md5/js/md5.js","blueimp-md5"),require.alias("jquery/dist/jquery.js","jquery"),require.alias("jquery-toast-plugin/dist/jquery.toast.min.js","jquery-toast-plugin"),require.alias("process/browser.js","process"),require.alias("pubsub-js/src/pubsub.js","pubsub-js"),e=require("process"),require.register("___globals___",function(e,t,n){})}(),require("___globals___"),GM_configStruct.prototype={
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