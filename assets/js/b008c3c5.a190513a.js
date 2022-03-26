"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6114],{3905:function(e,t,n){n.d(t,{Zo:function(){return i},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),l=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},i=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),m=l(n),f=o,d=m["".concat(u,".").concat(f)]||m[f]||p[f]||a;return n?r.createElement(d,s(s({ref:t},i),{},{components:n})):r.createElement(d,s({ref:t},i))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=m;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:o,s[1]=c;for(var l=2;l<a;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3341:function(e,t,n){n.r(t),n.d(t,{assets:function(){return i},contentTitle:function(){return u},default:function(){return f},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return p}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),s=["components"],c={},u="Scroll to bottom",l={unversionedId:"features/scroll-to-bottom",id:"features/scroll-to-bottom",title:"Scroll to bottom",description:"Pass showScrollToBottomButton to the chatty instance.",source:"@site/docs/features/scroll-to-bottom.md",sourceDirName:"features",slug:"/features/scroll-to-bottom",permalink:"/react-native-chatty/docs/features/scroll-to-bottom",editUrl:"https://github.com/MuhammedKpln/react-native-chatty/tree/main/docs/docs/features/scroll-to-bottom.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Replying message",permalink:"/react-native-chatty/docs/features/reply-support"},next:{title:"(Experimental) URL Preview Support",permalink:"/react-native-chatty/docs/features/url-previews"}},i={},p=[{value:"Usage",id:"usage",level:2},{value:"Customize button",id:"customize-button",level:2}],m={toc:p};function f(e){var t=e.components,n=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"scroll-to-bottom"},"Scroll to bottom"),(0,a.kt)("p",null,"Pass ",(0,a.kt)("inlineCode",{parentName:"p"},"showScrollToBottomButton")," to the chatty instance."),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useState } from 'react';\nimport { Chatty } from 'react-native-chatty';\n\nexport default function MyReactPage() {\n  const [messages, setMessages] = useState()\n  const text = useRef()\n\n  const onPressSend = (data) => {\n    // Implement\n\n    socket.send(data)\n  }\n\n  return (\n    <Chatty\n      messages={messages}\n      showScrollToBottomButton={true}\n      headerProps={{\n        id: 0,\n        username: \"Muhammed Kaplan\",\n        avatar: {\n          uri: \"https://blalala.com\"\n        }\n      }}\n      footerProps={{\n        // To prevent any unnecessary re-rendering, we're using ref instead of states.\n        onChangeText: (_text) => text.current = text,\n        onPressSend\n      }}\n    />\n  );\n}\n")),(0,a.kt)("h2",{id:"customize-button"},"Customize button"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"export interface IScrollToBottomProps\n  extends Pick<TouchableOpacityProps, 'onPress'> {\n  containerStyle?: ViewStyle;\n  content?: JSX.Element;\n}\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useState } from 'react';\nimport { Chatty } from 'react-native-chatty';\n\nexport default function MyReactPage() {\n  const [messages, setMessages] = useState()\n  const text = useRef()\n\n  const onPressSend = (data) => {\n    // Implement\n\n    socket.send(data)\n  }\n\n  return (\n    <Chatty\n      messages={messages}\n      showScrollToBottomButton={true}\n      scrollToBottomProps={{\n        content: <Text>Go Up!</Text>\n      }}\n      headerProps={{\n        id: 0,\n        username: \"Muhammed Kaplan\",\n        avatar: {\n          uri: \"https://blalala.com\"\n        }\n      }}\n      footerProps={{\n        // To prevent any unnecessary re-rendering, we're using ref instead of states.\n        onChangeText: (_text) => text.current = text,\n        onPressSend\n      }}\n    />\n  );\n}\n")))}f.isMDXComponent=!0}}]);