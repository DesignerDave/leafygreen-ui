_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[109],{"+Vbj":function(e,n,r){var t=r("jgJv"),o=r("lYsT"),a=r("PqlX"),c=t?t.isConcatSpreadable:void 0;e.exports=function(e){return a(e)||o(e)||!!(c&&e&&e[c])}},"9F/H":function(e,n,r){"use strict";r.r(n),r.d(n,"default",(function(){return s}));var t=r("h4VS"),o=r("oYCi"),a=(r("mXGw"),r("Hn8F")),c=r("ufKc"),i=r("hnBo");function l(){var e=Object(t.a)(["\n            min-width: 400px;\n          "]);return l=function(){return e},e}var u={darkMode:{type:"boolean",default:!1,label:"Dark Mode"},disabled:{type:"boolean",default:!1,label:"Disabled"},name:{type:"text",default:"Users",label:"Name"},children:{type:"text",default:"Find a user",label:"Children"}};function s(){return Object(o.jsx)(i.a,{knobsConfig:u,children:function(e){var n=e.children,r=e.name,t=e.disabled,i=e.darkMode;return Object(o.jsx)("div",{className:Object(a.a)(l()),children:Object(o.jsxs)(c.b,{darkMode:i,children:[Object(o.jsx)(c.a,{default:!0,disabled:t,name:r,children:n}),Object(o.jsx)(c.a,{name:"Teams",children:"Grant teams of users access to projects"}),Object(o.jsx)(c.a,{name:"API Keys",children:"Manage your infrastructure in code"})]})})}})}},Hn8F:function(e,n,r){"use strict";r.d(n,"a",(function(){return c})),r.d(n,"b",(function(){return a}));var t=r("NEv/"),o=Object(t.a)(),a=(o.flush,o.hydrate,o.cx),c=(o.merge,o.getRegisteredStyles,o.injectGlobal,o.keyframes,o.css);o.sheet,o.cache},IqJI:function(e,n,r){var t=r("gwRl"),o=r("+Vbj");e.exports=function e(n,r,a,c,i){var l=-1,u=n.length;for(a||(a=o),i||(i=[]);++l<u;){var s=n[l];r>0&&a(s)?r>1?e(s,r-1,a,c,i):t(i,s):c||(i[i.length]=s)}return i}},ZjZ4:function(e,n,r){var t=r("IqJI");e.exports=function(e){return(null==e?0:e.length)?t(e,1):[]}},ufKc:function(e,n,r){"use strict";r.d(n,"a",(function(){return Y})),r.d(n,"b",(function(){return V}));var t=r("mXGw"),o=r.n(t),a=r("W0B4"),c=r.n(a),i=r("5MD+"),l=r("G0rA"),u=r("QmRY"),s=r("jGqM"),d=r("kI+E"),f=r("5iLb"),b=r("PWxN"),p=r.n(b);function v(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function y(){return(y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function m(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function g(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function h(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function O(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],t=!0,o=!1,a=void 0;try{for(var c,i=e[Symbol.iterator]();!(t=(c=i.next()).done)&&(r.push(c.value),!n||r.length!==n);t=!0);}catch(e){o=!0,a=e}finally{try{t||null==i.return||i.return()}finally{if(o)throw a}}return r}}(e,n)||function(e,n){if(e){if("string"==typeof e)return j(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?j(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function C(){var e=h(["\n  background-color: transparent;\n  border: 0px;\n  padding: 12px 16px;\n  text-decoration: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 300px;\n  transition: 150ms color ease-in-out;\n  font-family: ",";\n  font-weight: 600;\n  font-size: 16px;\n  position: relative;\n\n  &:focus {\n    outline: none;\n  }\n\n  &:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    height: 4px;\n    border-radius: 4px 4px 0 0;\n    transition: all 150ms ease-in-out;\n    background-color: transparent;\n    transform: scaleX(0.8);\n  }\n\n  &:hover:after {\n    transform: scaleX(0.95);\n  }\n\n  &:active:after {\n    &:after {\n      transform: scaleX(1);\n      background-color: ",";\n    }\n  }\n"]);return C=function(){return e},e}function k(){var e=h(["\n  &:after {\n    transform: scaleX(1);\n    background-color: ",";\n  }\n\n  &:hover:after {\n    transform: scaleX(1);\n    background-color: ",";\n  }\n"]);return k=function(){return e},e}function x(){var e=h(["\n      &:focus {\n        color: #43b1e5;\n\n        &:after {\n          background-color: ",";\n        }\n      }\n    "]);return x=function(){return e},e}function w(){var e=h(["\n      &:hover {\n        cursor: pointer;\n\n        &:not(:focus) {\n          color: ",";\n\n          &:after {\n            background-color: ",";\n          }\n        }\n      }\n    "]);return w=function(){return e},e}function T(){var e=h(["\n      color: ",";\n    "]);return T=function(){return e},e}function E(){var e=h(["\n      &:focus {\n        color: ",";\n\n        &:after {\n          background-color: ",";\n        }\n      }\n    "]);return E=function(){return e},e}function S(){var e=h(["\n      &:hover {\n        cursor: pointer;\n\n        &:not(:focus) {\n          color: ",";\n\n          &:after {\n            background-color: ",";\n          }\n        }\n      }\n    "]);return S=function(){return e},e}function N(){var e=h(["\n      color: ",";\n    "]);return N=function(){return e},e}var P,A={light:{listTitleColor:Object(i.css)(N(),l.uiColors.gray.dark1),listTitleHover:Object(i.css)(S(),l.uiColors.gray.dark3,l.uiColors.gray.light2),listTitleFocus:Object(i.css)(E(),l.uiColors.blue.base,l.uiColors.blue.base)},dark:{listTitleColor:Object(i.css)(T(),l.uiColors.gray.light1),listTitleHover:Object(i.css)(w(),l.uiColors.white,l.uiColors.gray.dark1),listTitleFocus:Object(i.css)(x(),l.uiColors.blue.base)}},M=Object(i.css)(k(),l.uiColors.green.base,l.uiColors.green.base),D=Object(i.css)(C(),f.fontFamilies.default,l.uiColors.green.base),I=function(e){var n,r,a=e.selected,c=void 0!==a&&a,l=e.disabled,u=void 0!==l&&l,f=e.children,b=e.className,p=e.ariaControl,h=(e.index,e.darkMode),O=e.isAnyTabFocused,j=g(e,["selected","disabled","children","className","ariaControl","index","darkMode","isAnyTabFocused"]),C=Object(d.useUsingKeyboardContext)().usingKeyboard,k=Object(t.useRef)(null),x=h?z.Dark:z.Light;Object(t.useEffect)((function(){O&&!u&&c&&k.current&&k.current.focus()}),[O,u,c,k]);var w=function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?m(Object(r),!0).forEach((function(n){v(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}((r={className:Object(i.cx)(D,A[x].listTitleColor,(n={},v(n,A[x].listTitleHover,!u),v(n,M,c),v(n,A[x].listTitleFocus,C),n),b),role:"tab"},v(r,"aria-controls",p),v(r,"aria-selected",c),v(r,"aria-disabled",u),v(r,"tabIndex",c?0:-1),r),j);return"string"==typeof j.href?o.a.createElement(s.default,y({as:"a",ref:k},w),f):o.a.createElement(s.default,y({as:"button",ref:k},w),f)};function F(){var e=h(["\n  cursor: not-allowed;\n"]);return F=function(){return e},e}function _(){var e=h(["\n  list-style: none;\n  padding: 0;\n  display: flex;\n  width: 100%;\n"]);return _=function(){return e},e}function X(){var e=h(["\n      border-bottom: 1px solid ",";\n    "]);return X=function(){return e},e}function K(){var e=h(["\n      color: ",";\n    "]);return K=function(){return e},e}function L(){var e=h(["\n      color: ",";\n\n      &:hover:not(:focus) {\n        color: ",";\n      }\n    "]);return L=function(){return e},e}function H(){var e=h(["\n      border-bottom: 1px solid ",";\n    "]);return H=function(){return e},e}function G(){var e=h(["\n      color: ",";\n    "]);return G=function(){return e},e}function R(){var e=h(["\n      color: ",";\n\n      &:hover:not(:focus) {\n        color: ",";\n      }\n    "]);return R=function(){return e},e}I.displayName="TabTitle";var z={Dark:"dark",Light:"light"},J=(v(P={},z.Light,{activeStyle:Object(i.css)(R(),l.uiColors.green.dark2,l.uiColors.green.dark2),disabledColor:Object(i.css)(G(),l.uiColors.gray.light1),underlineColor:Object(i.css)(H(),l.uiColors.gray.light2)}),v(P,z.Dark,{activeStyle:Object(i.css)(L(),l.uiColors.green.light2,l.uiColors.green.light2),disabledColor:Object(i.css)(K(),l.uiColors.gray.dark1),underlineColor:Object(i.css)(X(),l.uiColors.gray.dark2)}),P),q=Object(i.css)(_()),U=Object(i.css)(F());function V(e){var n=e.children,r=e.setSelected,a=e.selected,c=e.className,l=e.darkMode,s=void 0!==l&&l,d=e.as,f=void 0===d?"button":d,b=g(e,["children","setSelected","selected","className","darkMode","as"]),m=Object(t.useRef)(null),h=function(){var e=O(Object(t.useState)(null),2),n=e[0],r=e[1],o=Object(t.useCallback)((function(){r(document.activeElement)}),[]);return Object(t.useEffect)((function(){return document.addEventListener("focusin",o),function(){document.removeEventListener("focusin",o)}}),[o]),n}(),j=O(Object(t.useState)(!1),2),C=j[0],k=j[1];Object(t.useEffect)((function(){var e,n,r=Array.from(null!==(e=null===(n=m.current)||void 0===n?void 0:n.children)&&void 0!==e?e:[]);null!==h&&-1!==r.indexOf(h)&&k(!0)}),[h,m]);var x=o.a.Children.toArray(n),w="number"==typeof a,T=O(Object(t.useState)(x.findIndex((function(e){return e.props.default||0}))),2),E=T[0],S=T[1],N=w?a:E,P=w?r:S,A=function(){var e=x.filter((function(e){return!e.props.disabled})).map((function(e){return x.indexOf(e)}));return[e,e.indexOf(N)]},M=function(e){if(!e.metaKey&&!e.ctrlKey)if(e.keyCode===u.keyMap.ArrowRight){var n=O(A(),2),r=n[0],t=n[1];P(r[(t+1)%r.length])}else if(e.keyCode===u.keyMap.ArrowLeft){var o=O(A(),2),a=o[0],c=o[1];P(a[(c-1+a.length)%a.length])}},D=o.a.Children.map(n,(function(e,n){return Object(u.isComponentType)(e,"Tab")?o.a.cloneElement(e,{key:n,ariaControl:"tab-".concat(n),selected:N===n}):e})),F=s?z.Dark:z.Light;return o.a.createElement("div",y({},b,{className:c}),o.a.createElement("div",{className:Object(i.cx)(q,J[F].underlineColor),role:"tablist",tabIndex:0,ref:m},null==D?void 0:D.map((function(e,n){var r;if(!Object(u.isComponentType)(e,"Tab"))return e;var t=e.props,a=t.selected,c=t.disabled,l=t.onClick,d=g(t,["selected","disabled","onClick"]),b=p()(d,["ariaControl","children","name","default"]);return o.a.createElement(I,y({},b,{key:n,ariaControl:"tab-".concat(n),disabled:c,selected:a,index:n,as:f,darkMode:s,isAnyTabFocused:C,onKeyDown:M,className:Object(i.cx)((r={},v(r,J[F].activeStyle,a),v(r,Object(i.cx)(J[F].disabledColor,U),c),r)),onClick:c?void 0:function(e){null==l||l(e),function(e,n){P(n)}(0,n)}}),e.props.name)}))),D)}function Y(e){var n=e.selected,r=e.children,t=e.ariaControl,a=g(e,["selected","children","ariaControl"]);return n?(delete a.default,delete a.name,o.a.createElement("div",y({},a,{"aria-controls":t,id:t,role:"tabpanel"}),r)):null}V.displayName="Tabs",V.propTypes={children:c.a.node,setSelected:c.a.func,selected:c.a.number,className:c.a.string,as:c.a.oneOfType([c.a.string,c.a.func])},Y.displayName="Tab",Y.propTypes={selected:c.a.bool,children:c.a.node,name:c.a.oneOfType([c.a.string,c.a.node]),content:c.a.node,disabled:c.a.bool,ariaControl:c.a.string}},zDlf:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/component/tabs/example",function(){return r("9F/H")}])}},[["zDlf",0,1,2,3,4,6,12]]]);