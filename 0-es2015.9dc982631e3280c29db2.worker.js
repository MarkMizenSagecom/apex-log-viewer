!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,(function(t){return e[t]}).bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="HgPu")}({HgPu:function(e,t,n){"use strict";function r(e,t,n,r){return new(n||(n=Promise))(function(o,u){function i(e){try{a(r.next(e))}catch(t){u(t)}}function c(e){try{a(r.throw(e))}catch(t){u(t)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(i,c)}a((r=r.apply(e,t||[])).next())})}function o(e,t=[]){return r(this,void 0,void 0,function*(){for(;e.length>0;){const n=e.shift();if(!n)break;switch(n.type){case"CODE_UNIT_STARTED":case"CONSTRUCTOR_ENTRY":case"METHOD_ENTRY":case"SYSTEM_METHOD_ENTRY":case"SYSTEM_CONSTRUCTOR_ENTRY":t.push({label:n.type,entry:n,children:yield o(e)});break;case"CODE_UNIT_FINISHED":case"CONSTRUCTOR_EXIT":case"METHOD_EXIT":case"SYSTEM_METHOD_EXIT":case"SYSTEM_CONSTRUCTOR_EXIT":return Promise.resolve(t);default:t.push({entry:n,label:n.type})}}return Promise.resolve(t)})}n.r(t),addEventListener("message",({data:e})=>r(void 0,void 0,void 0,function*(){const t=yield o(e,[]);postMessage(t)}))}});