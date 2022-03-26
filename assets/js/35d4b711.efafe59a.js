"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5915],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),f=l(r),m=a,d=f["".concat(u,".").concat(m)]||f[m]||p[m]||o;return r?n.createElement(d,i(i({ref:t},s),{},{components:r})):n.createElement(d,i({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5142:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return u},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return p}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],c={},u="(Experimental) URL Preview Support",l={unversionedId:"features/url-previews",id:"features/url-previews",title:"(Experimental) URL Preview Support",description:"When user sends a message that includes a valid url, it will fetch the meta data of the url that provided.",source:"@site/docs/features/url-previews.md",sourceDirName:"features",slug:"/features/url-previews",permalink:"/react-native-chatty/docs/features/url-previews",editUrl:"https://github.com/MuhammedKpln/react-native-chatty/tree/main/docs/docs/features/url-previews.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Scroll to bottom",permalink:"/react-native-chatty/docs/features/scroll-to-bottom"},next:{title:"Customizing Logic",permalink:"/react-native-chatty/docs/ui/customizing-ui"}},s={},p=[{value:"Usage",id:"usage",level:2}],f={toc:p};function m(e){var t=e.components,c=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},f,c,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"experimental-url-preview-support"},"(Experimental) URL Preview Support"),(0,o.kt)("p",null,(0,o.kt)("img",{src:r(651).Z,width:"462",height:"382"})),(0,o.kt)("p",null,"When user sends a message that includes a valid url, it will fetch the meta data of the url that provided."),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useState } from 'react';\nimport { Chatty } from 'react-native-chatty';\n\nexport default function MyReactPage() {\n\n  return (\n    <Chatty\n      {...props}\n\n      // Pass the prop, and that's it!\n      enableUrlPreviews\n    />\n  );\n}\n")))}m.isMDXComponent=!0},651:function(e,t,r){t.Z=r.p+"assets/images/urlPreview-cbfdb549d3cc16609fcf70a24e28f883.jpeg"}}]);