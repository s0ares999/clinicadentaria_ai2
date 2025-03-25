/*! For license information please see main.dc701e83.js.LICENSE.txt */
(()=>{var e={40:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(381),a=(r=o)&&r.__esModule?r:{default:r},i=n(836);var s={spyCallbacks:[],spySetState:[],scrollSpyContainers:[],mount:function(e,t){if(e){var n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:66;return(0,a.default)(e,t)}((function(t){s.scrollHandler(e)}),t);return s.scrollSpyContainers.push(e),(0,i.addPassiveEventListener)(e,"scroll",n),function(){(0,i.removePassiveEventListener)(e,"scroll",n),s.scrollSpyContainers.splice(s.scrollSpyContainers.indexOf(e),1)}}return function(){}},isMounted:function(e){return-1!==s.scrollSpyContainers.indexOf(e)},currentPositionX:function(e){if(e===document){var t=void 0!==window.scrollY,n="CSS1Compat"===(document.compatMode||"");return t?window.scrollX:n?document.documentElement.scrollLeft:document.body.scrollLeft}return e.scrollLeft},currentPositionY:function(e){if(e===document){var t=void 0!==window.scrollX,n="CSS1Compat"===(document.compatMode||"");return t?window.scrollY:n?document.documentElement.scrollTop:document.body.scrollTop}return e.scrollTop},scrollHandler:function(e){(s.scrollSpyContainers[s.scrollSpyContainers.indexOf(e)].spyCallbacks||[]).forEach((function(t){return t(s.currentPositionX(e),s.currentPositionY(e))}))},addStateHandler:function(e){s.spySetState.push(e)},addSpyHandler:function(e,t){var n=s.scrollSpyContainers[s.scrollSpyContainers.indexOf(t)];n.spyCallbacks||(n.spyCallbacks=[]),n.spyCallbacks.push(e)},updateStates:function(){s.spySetState.forEach((function(e){return e()}))},unmount:function(e,t){s.scrollSpyContainers.forEach((function(e){return e.spyCallbacks&&e.spyCallbacks.length&&e.spyCallbacks.indexOf(t)>-1&&e.spyCallbacks.splice(e.spyCallbacks.indexOf(t),1)})),s.spySetState&&s.spySetState.length&&s.spySetState.indexOf(e)>-1&&s.spySetState.splice(s.spySetState.indexOf(e),1),document.removeEventListener("scroll",s.scrollHandler)},update:function(){return s.scrollSpyContainers.forEach((function(e){return s.scrollHandler(e)}))}};t.default=s},43:(e,t,n)=>{"use strict";e.exports=n(202)},80:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=s(n(401)),a=s(n(177)),i=s(n(529));function s(e){return e&&e.__esModule?e:{default:e}}var l={},c=void 0;t.default={unmount:function(){l={}},register:function(e,t){l[e]=t},unregister:function(e){delete l[e]},get:function(e){return l[e]||document.getElementById(e)||document.getElementsByName(e)[0]||document.getElementsByClassName(e)[0]},setActiveLink:function(e){return c=e},getActiveLink:function(){return c},scrollTo:function(e,t){var n=this.get(e);if(n){var s=(t=r({},t,{absolute:!1})).containerId,l=t.container,c=void 0;c=s?document.getElementById(s):l&&l.nodeType?l:document,t.absolute=!0;var u=t.horizontal,d=o.default.scrollOffset(c,n,u)+(t.offset||0);if(!t.smooth)return i.default.registered.begin&&i.default.registered.begin(e,n),c===document?t.horizontal?window.scrollTo(d,0):window.scrollTo(0,d):c.scrollTop=d,void(i.default.registered.end&&i.default.registered.end(e,n));a.default.animateTopScroll(d,t,e,n)}else console.warn("target Element not found")}}},153:(e,t,n)=>{"use strict";var r=n(43),o=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,a={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,r)&&!l.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:o,type:e,key:c,ref:u,props:a,_owner:s.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},173:(e,t,n)=>{e.exports=n(497)()},177:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=(s(n(401)),s(n(580))),a=s(n(996)),i=s(n(529));function s(e){return e&&e.__esModule?e:{default:e}}var l=function(e){return o.default[e.smooth]||o.default.defaultEasing},c=function(){if("undefined"!==typeof window)return window.requestAnimationFrame||window.webkitRequestAnimationFrame}()||function(e,t,n){window.setTimeout(e,n||1e3/60,(new Date).getTime())},u=function(e){var t=e.data.containerElement;if(t&&t!==document&&t!==document.body)return t.scrollLeft;var n=void 0!==window.pageXOffset,r="CSS1Compat"===(document.compatMode||"");return n?window.pageXOffset:r?document.documentElement.scrollLeft:document.body.scrollLeft},d=function(e){var t=e.data.containerElement;if(t&&t!==document&&t!==document.body)return t.scrollTop;var n=void 0!==window.pageXOffset,r="CSS1Compat"===(document.compatMode||"");return n?window.pageYOffset:r?document.documentElement.scrollTop:document.body.scrollTop},p=function e(t,n,r){var o=n.data;if(n.ignoreCancelEvents||!o.cancel)if(o.delta=Math.round(o.targetPosition-o.startPosition),null===o.start&&(o.start=r),o.progress=r-o.start,o.percent=o.progress>=o.duration?1:t(o.progress/o.duration),o.currentPosition=o.startPosition+Math.ceil(o.delta*o.percent),o.containerElement&&o.containerElement!==document&&o.containerElement!==document.body?n.horizontal?o.containerElement.scrollLeft=o.currentPosition:o.containerElement.scrollTop=o.currentPosition:n.horizontal?window.scrollTo(o.currentPosition,0):window.scrollTo(0,o.currentPosition),o.percent<1){var a=e.bind(null,t,n);c.call(window,a)}else i.default.registered.end&&i.default.registered.end(o.to,o.target,o.currentPosition);else i.default.registered.end&&i.default.registered.end(o.to,o.target,o.currentPositionY)},f=function(e){e.data.containerElement=e?e.containerId?document.getElementById(e.containerId):e.container&&e.container.nodeType?e.container:document:null},m=function(e,t,n,r){t.data=t.data||{currentPosition:0,startPosition:0,targetPosition:0,progress:0,duration:0,cancel:!1,target:null,containerElement:null,to:null,start:null,delta:null,percent:null,delayTimeout:null},window.clearTimeout(t.data.delayTimeout);if(a.default.subscribe((function(){t.data.cancel=!0})),f(t),t.data.start=null,t.data.cancel=!1,t.data.startPosition=t.horizontal?u(t):d(t),t.data.targetPosition=t.absolute?e:e+t.data.startPosition,t.data.startPosition!==t.data.targetPosition){var o;t.data.delta=Math.round(t.data.targetPosition-t.data.startPosition),t.data.duration=("function"===typeof(o=t.duration)?o:function(){return o})(t.data.delta),t.data.duration=isNaN(parseFloat(t.data.duration))?1e3:parseFloat(t.data.duration),t.data.to=n,t.data.target=r;var s=l(t),m=p.bind(null,s,t);t&&t.delay>0?t.data.delayTimeout=window.setTimeout((function(){i.default.registered.begin&&i.default.registered.begin(t.data.to,t.data.target),c.call(window,m)}),t.delay):(i.default.registered.begin&&i.default.registered.begin(t.data.to,t.data.target),c.call(window,m))}else i.default.registered.end&&i.default.registered.end(t.data.to,t.data.target,t.data.currentPosition)},h=function(e){return(e=r({},e)).data=e.data||{currentPosition:0,startPosition:0,targetPosition:0,progress:0,duration:0,cancel:!1,target:null,containerElement:null,to:null,start:null,delta:null,percent:null,delayTimeout:null},e.absolute=!0,e};t.default={animateTopScroll:m,getAnimationType:l,scrollToTop:function(e){m(0,h(e))},scrollToBottom:function(e){e=h(e),f(e),m(e.horizontal?function(e){var t=e.data.containerElement;if(t&&t!==document&&t!==document.body)return t.scrollWidth-t.offsetWidth;var n=document.body,r=document.documentElement;return Math.max(n.scrollWidth,n.offsetWidth,r.clientWidth,r.scrollWidth,r.offsetWidth)}(e):function(e){var t=e.data.containerElement;if(t&&t!==document&&t!==document.body)return t.scrollHeight-t.offsetHeight;var n=document.body,r=document.documentElement;return Math.max(n.scrollHeight,n.offsetHeight,r.clientHeight,r.scrollHeight,r.offsetHeight)}(e),e)},scrollTo:function(e,t){m(e,h(t))},scrollMore:function(e,t){t=h(t),f(t);var n=t.horizontal?u(t):d(t);m(e+n,t)}}},182:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=l(n(43)),i=(l(n(950)),l(n(80))),s=l(n(173));function l(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.childBindings={domNode:null},t}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,t),o(n,[{key:"componentDidMount",value:function(){if("undefined"===typeof window)return!1;this.registerElems(this.props.name)}},{key:"componentDidUpdate",value:function(e){this.props.name!==e.name&&this.registerElems(this.props.name)}},{key:"componentWillUnmount",value:function(){if("undefined"===typeof window)return!1;i.default.unregister(this.props.name)}},{key:"registerElems",value:function(e){i.default.register(e,this.childBindings.domNode)}},{key:"render",value:function(){return a.default.createElement(e,r({},this.props,{parentBindings:this.childBindings}))}}]),n}(a.default.Component);return t.propTypes={name:s.default.string,id:s.default.string},t}},202:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h=Object.assign,g={};function v(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}function b(){}function y(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var x=y.prototype=new b;x.constructor=y,h(x,v.prototype),x.isPureReactComponent=!0;var w=Array.isArray,S=Object.prototype.hasOwnProperty,k={current:null},j={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,r){var o,a={},i=null,s=null;if(null!=t)for(o in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(i=""+t.key),t)S.call(t,o)&&!j.hasOwnProperty(o)&&(a[o]=t[o]);var l=arguments.length-2;if(1===l)a.children=r;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];a.children=c}if(e&&e.defaultProps)for(o in l=e.defaultProps)void 0===a[o]&&(a[o]=l[o]);return{$$typeof:n,type:e,key:i,ref:s,props:a,_owner:k.current}}function E(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var T=/\/+/g;function P(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function O(e,t,o,a,i){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case r:l=!0}}if(l)return i=i(l=e),e=""===a?"."+P(l,0):a,w(i)?(o="",null!=e&&(o=e.replace(T,"$&/")+"/"),O(i,t,o,"",(function(e){return e}))):null!=i&&(E(i)&&(i=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,o+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(T,"$&/")+"/")+e)),t.push(i)),1;if(l=0,a=""===a?".":a+":",w(e))for(var c=0;c<e.length;c++){var u=a+P(s=e[c],c);l+=O(s,t,o,u,i)}else if(u=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"===typeof u)for(e=u.call(e),c=0;!(s=e.next()).done;)l+=O(s=s.value,t,o,u=a+P(s,c++),i);else if("object"===s)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function N(e,t,n){if(null==e)return e;var r=[],o=0;return O(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function R(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var _={current:null},A={transition:null},z={ReactCurrentDispatcher:_,ReactCurrentBatchConfig:A,ReactCurrentOwner:k};function M(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:N,forEach:function(e,t,n){N(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return N(e,(function(){t++})),t},toArray:function(e){return N(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=v,t.Fragment=o,t.Profiler=i,t.PureComponent=y,t.StrictMode=a,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z,t.act=M,t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=h({},e.props),a=e.key,i=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,s=k.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)S.call(t,c)&&!j.hasOwnProperty(c)&&(o[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)o.children=r;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];o.children=l}return{$$typeof:n,type:e.type,key:a,ref:i,props:o,_owner:s}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=C,t.createFactory=function(e){var t=C.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:R}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=A.transition;A.transition={};try{e()}finally{A.transition=t}},t.unstable_act=M,t.useCallback=function(e,t){return _.current.useCallback(e,t)},t.useContext=function(e){return _.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return _.current.useDeferredValue(e)},t.useEffect=function(e,t){return _.current.useEffect(e,t)},t.useId=function(){return _.current.useId()},t.useImperativeHandle=function(e,t,n){return _.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return _.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return _.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return _.current.useMemo(e,t)},t.useReducer=function(e,t,n){return _.current.useReducer(e,t,n)},t.useRef=function(e){return _.current.useRef(e)},t.useState=function(e){return _.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return _.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return _.current.useTransition()},t.version="18.3.1"},218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},219:(e,t,n)=>{"use strict";var r=n(763),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},s={};function l(e){return r.isMemo(e)?i:s[e.$$typeof]||o}s[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s[r.Memo]=i;var c=Object.defineProperty,u=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,p=Object.getOwnPropertyDescriptor,f=Object.getPrototypeOf,m=Object.prototype;e.exports=function e(t,n,r){if("string"!==typeof n){if(m){var o=f(n);o&&o!==m&&e(t,o,r)}var i=u(n);d&&(i=i.concat(d(n)));for(var s=l(t),h=l(n),g=0;g<i.length;++g){var v=i[g];if(!a[v]&&(!r||!r[v])&&(!h||!h[v])&&(!s||!s[v])){var b=p(n,v);try{c(t,v,b)}catch(y){}}}}return t}},234:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(!(0<a(o,t)))break e;e[r]=t,e[n]=o,n=r}}function r(e){return 0===e.length?null:e[0]}function o(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,i=o>>>1;r<i;){var s=2*(r+1)-1,l=e[s],c=s+1,u=e[c];if(0>a(l,n))c<o&&0>a(u,l)?(e[r]=u,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else{if(!(c<o&&0>a(u,n)))break e;e[r]=u,e[c]=n,r=c}}}return t}function a(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"===typeof performance&&"function"===typeof performance.now){var i=performance;t.unstable_now=function(){return i.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],u=[],d=1,p=null,f=3,m=!1,h=!1,g=!1,v="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,y="undefined"!==typeof setImmediate?setImmediate:null;function x(e){for(var t=r(u);null!==t;){if(null===t.callback)o(u);else{if(!(t.startTime<=e))break;o(u),t.sortIndex=t.expirationTime,n(c,t)}t=r(u)}}function w(e){if(g=!1,x(e),!h)if(null!==r(c))h=!0,A(S);else{var t=r(u);null!==t&&z(w,t.startTime-e)}}function S(e,n){h=!1,g&&(g=!1,b(E),E=-1),m=!0;var a=f;try{for(x(n),p=r(c);null!==p&&(!(p.expirationTime>n)||e&&!O());){var i=p.callback;if("function"===typeof i){p.callback=null,f=p.priorityLevel;var s=i(p.expirationTime<=n);n=t.unstable_now(),"function"===typeof s?p.callback=s:p===r(c)&&o(c),x(n)}else o(c);p=r(c)}if(null!==p)var l=!0;else{var d=r(u);null!==d&&z(w,d.startTime-n),l=!1}return l}finally{p=null,f=a,m=!1}}"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,j=!1,C=null,E=-1,T=5,P=-1;function O(){return!(t.unstable_now()-P<T)}function N(){if(null!==C){var e=t.unstable_now();P=e;var n=!0;try{n=C(!0,e)}finally{n?k():(j=!1,C=null)}}else j=!1}if("function"===typeof y)k=function(){y(N)};else if("undefined"!==typeof MessageChannel){var R=new MessageChannel,_=R.port2;R.port1.onmessage=N,k=function(){_.postMessage(null)}}else k=function(){v(N,0)};function A(e){C=e,j||(j=!0,k())}function z(e,n){E=v((function(){e(t.unstable_now())}),n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){h||m||(h=!0,A(S))},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return r(c)},t.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},t.unstable_scheduleCallback=function(e,o,a){var i=t.unstable_now();switch("object"===typeof a&&null!==a?a="number"===typeof(a=a.delay)&&0<a?i+a:i:a=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:d++,callback:o,priorityLevel:e,startTime:a,expirationTime:s=a+s,sortIndex:-1},a>i?(e.sortIndex=a,n(u,e),null===r(c)&&e===r(u)&&(g?(b(E),E=-1):g=!0,z(w,a-i))):(e.sortIndex=s,n(c,e),h||m||(h=!0,A(S))),e},t.unstable_shouldYield=O,t.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}},296:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(836);var r,o=n(401),a=(r=o)&&r.__esModule?r:{default:r};var i={mountFlag:!1,initialized:!1,scroller:null,containers:{},mount:function(e){this.scroller=e,this.handleHashChange=this.handleHashChange.bind(this),window.addEventListener("hashchange",this.handleHashChange),this.initStateFromHash(),this.mountFlag=!0},mapContainer:function(e,t){this.containers[e]=t},isMounted:function(){return this.mountFlag},isInitialized:function(){return this.initialized},initStateFromHash:function(){var e=this,t=this.getHash();t?window.setTimeout((function(){e.scrollTo(t,!0),e.initialized=!0}),10):this.initialized=!0},scrollTo:function(e,t){var n=this.scroller;if(n.get(e)&&(t||e!==n.getActiveLink())){var r=this.containers[e]||document;n.scrollTo(e,{container:r})}},getHash:function(){return a.default.getHash()},changeHash:function(e,t){this.isInitialized()&&a.default.getHash()!==e&&a.default.updateHash(e,t)},handleHashChange:function(){this.scrollTo(this.getHash())},unmount:function(){this.scroller=null,this.containers=null,window.removeEventListener("hashchange",this.handleHashChange)}};t.default=i},318:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=l(n(43)),i=l(n(182)),s=l(n(173));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"render",value:function(){var e=this,t=r({},this.props);return delete t.name,t.parentBindings&&delete t.parentBindings,a.default.createElement("div",r({},t,{ref:function(t){e.props.parentBindings.domNode=t}}),this.props.children)}}]),t}(a.default.Component);c.propTypes={name:s.default.string,id:s.default.string},t.default=(0,i.default)(c)},324:e=>{e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<a.length;l++){var c=a[l];if(!s(c))return!1;var u=e[c],d=t[c];if(!1===(o=n?n.call(r,u,d,c):void 0)||void 0===o&&u!==d)return!1}return!0}},380:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=u(n(43)),i=u(n(40)),s=u(n(80)),l=u(n(173)),c=u(n(296));function u(e){return e&&e.__esModule?e:{default:e}}var d={to:l.default.string.isRequired,containerId:l.default.string,container:l.default.object,activeClass:l.default.string,activeStyle:l.default.object,spy:l.default.bool,horizontal:l.default.bool,smooth:l.default.oneOfType([l.default.bool,l.default.string]),offset:l.default.number,delay:l.default.number,isDynamic:l.default.bool,onClick:l.default.func,duration:l.default.oneOfType([l.default.number,l.default.func]),absolute:l.default.bool,onSetActive:l.default.func,onSetInactive:l.default.func,ignoreCancelEvents:l.default.bool,hashSpy:l.default.bool,saveHashHistory:l.default.bool,spyThrottle:l.default.number};t.default=function(e,t){var n=t||s.default,l=function(t){function s(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,e));return u.call(t),t.state={active:!1},t.beforeUnmountCallbacks=[],t}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(s,t),o(s,[{key:"getScrollSpyContainer",value:function(){var e=this.props.containerId,t=this.props.container;return e&&!t?document.getElementById(e):t&&t.nodeType?t:document}},{key:"componentDidMount",value:function(){if(this.props.spy||this.props.hashSpy){var e=this.getScrollSpyContainer();if(!i.default.isMounted(e)){var t=i.default.mount(e,this.props.spyThrottle);this.beforeUnmountCallbacks.push(t)}this.props.hashSpy&&(c.default.isMounted()||c.default.mount(n),c.default.mapContainer(this.props.to,e)),i.default.addSpyHandler(this.spyHandler,e),this.setState({container:e})}}},{key:"componentWillUnmount",value:function(){i.default.unmount(this.stateHandler,this.spyHandler),this.beforeUnmountCallbacks.forEach((function(e){return e()}))}},{key:"render",value:function(){var t="";t=this.state&&this.state.active?((this.props.className||"")+" "+(this.props.activeClass||"active")).trim():this.props.className;var n={};n=this.state&&this.state.active?r({},this.props.style,this.props.activeStyle):r({},this.props.style);var o=r({},this.props);for(var i in d)o.hasOwnProperty(i)&&delete o[i];return o.className=t,o.style=n,o.onClick=this.handleClick,a.default.createElement(e,o)}}]),s}(a.default.PureComponent),u=function(){var e=this;this.scrollTo=function(t,o){n.scrollTo(t,r({},e.state,o))},this.handleClick=function(t){e.props.onClick&&e.props.onClick(t),t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),e.scrollTo(e.props.to,e.props)},this.spyHandler=function(t,r){var o=e.getScrollSpyContainer();if(!c.default.isMounted()||c.default.isInitialized()){var a=e.props.horizontal,i=e.props.to,s=null,l=void 0,u=void 0;if(a){var d=0,p=0,f=0;if(o.getBoundingClientRect)f=o.getBoundingClientRect().left;if(!s||e.props.isDynamic){if(!(s=n.get(i)))return;var m=s.getBoundingClientRect();p=(d=m.left-f+t)+m.width}var h=t-e.props.offset;l=h>=Math.floor(d)&&h<Math.floor(p),u=h<Math.floor(d)||h>=Math.floor(p)}else{var g=0,v=0,b=0;if(o.getBoundingClientRect)b=o.getBoundingClientRect().top;if(!s||e.props.isDynamic){if(!(s=n.get(i)))return;var y=s.getBoundingClientRect();v=(g=y.top-b+r)+y.height}var x=r-e.props.offset;l=x>=Math.floor(g)&&x<Math.floor(v),u=x<Math.floor(g)||x>=Math.floor(v)}var w=n.getActiveLink();if(u){if(i===w&&n.setActiveLink(void 0),e.props.hashSpy&&c.default.getHash()===i){var S=e.props.saveHashHistory,k=void 0!==S&&S;c.default.changeHash("",k)}e.props.spy&&e.state.active&&(e.setState({active:!1}),e.props.onSetInactive&&e.props.onSetInactive(i,s))}if(l&&(w!==i||!1===e.state.active)){n.setActiveLink(i);var j=e.props.saveHashHistory,C=void 0!==j&&j;e.props.hashSpy&&c.default.changeHash(i,C),e.props.spy&&(e.setState({active:!0}),e.props.onSetActive&&e.props.onSetActive(i,s))}}}};return l.propTypes=d,l.defaultProps={offset:0},l}},381:(e,t,n)=>{var r="Expected a function",o=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,s=/^0o[0-7]+$/i,l=parseInt,c="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,u="object"==typeof self&&self&&self.Object===Object&&self,d=c||u||Function("return this")(),p=Object.prototype.toString,f=Math.max,m=Math.min,h=function(){return d.Date.now()};function g(e,t,n){var o,a,i,s,l,c,u=0,d=!1,p=!1,g=!0;if("function"!=typeof e)throw new TypeError(r);function y(t){var n=o,r=a;return o=a=void 0,u=t,s=e.apply(r,n)}function x(e){var n=e-c;return void 0===c||n>=t||n<0||p&&e-u>=i}function w(){var e=h();if(x(e))return S(e);l=setTimeout(w,function(e){var n=t-(e-c);return p?m(n,i-(e-u)):n}(e))}function S(e){return l=void 0,g&&o?y(e):(o=a=void 0,s)}function k(){var e=h(),n=x(e);if(o=arguments,a=this,c=e,n){if(void 0===l)return function(e){return u=e,l=setTimeout(w,t),d?y(e):s}(c);if(p)return l=setTimeout(w,t),y(c)}return void 0===l&&(l=setTimeout(w,t)),s}return t=b(t)||0,v(n)&&(d=!!n.leading,i=(p="maxWait"in n)?f(b(n.maxWait)||0,t):i,g="trailing"in n?!!n.trailing:g),k.cancel=function(){void 0!==l&&clearTimeout(l),u=0,o=c=a=l=void 0},k.flush=function(){return void 0===l?s:S(h())},k}function v(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function b(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==p.call(e)}(e))return NaN;if(v(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=v(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=i.test(e);return n||s.test(e)?l(e.slice(2),n?2:8):a.test(e)?NaN:+e}e.exports=function(e,t,n){var o=!0,a=!0;if("function"!=typeof e)throw new TypeError(r);return v(n)&&(o="leading"in n?!!n.leading:o,a="trailing"in n?!!n.trailing:a),g(e,t,{leading:o,maxWait:t,trailing:a})}},391:(e,t,n)=>{"use strict";var r=n(950);t.createRoot=r.createRoot,t.hydrateRoot=r.hydrateRoot},401:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){for(var n=e.offsetTop,r=e.offsetParent;r&&!t(r);)n+=r.offsetTop,r=r.offsetParent;return{offsetTop:n,offsetParent:r}};t.default={updateHash:function(e,t){var n=0===e.indexOf("#")?e.substring(1):e,r=n?"#"+n:"",o=window&&window.location,a=r?o.pathname+o.search+r:o.pathname+o.search;t?history.pushState(history.state,"",a):history.replaceState(history.state,"",a)},getHash:function(){return window.location.hash.replace(/^#/,"")},filterElementInContainer:function(e){return function(t){return e.contains?e!=t&&e.contains(t):!!(16&e.compareDocumentPosition(t))}},scrollOffset:function(e,t,r){if(r)return e===document?t.getBoundingClientRect().left+(window.scrollX||window.pageXOffset):"static"!==getComputedStyle(e).position?t.offsetLeft:t.offsetLeft-e.offsetLeft;if(e===document)return t.getBoundingClientRect().top+(window.scrollY||window.pageYOffset);if("static"!==getComputedStyle(e).position){if(t.offsetParent!==e){var o=n(t,(function(t){return t===e||t===document})),a=o.offsetTop;if(o.offsetParent!==e)throw new Error("Seems containerElement is not an ancestor of the Element");return a}return t.offsetTop}if(t.offsetParent===e.offsetParent)return t.offsetTop-e.offsetTop;var i=function(e){return e===document};return n(t,i).offsetTop-n(e,i).offsetTop}}},473:(e,t,n)=>{"use strict";t.Hg=void 0;var r=f(n(556)),o=f(n(864)),a=f(n(318)),i=f(n(80)),s=f(n(529)),l=f(n(40)),c=f(n(177)),u=f(n(380)),d=f(n(182)),p=f(n(789));function f(e){return e&&e.__esModule?e:{default:e}}r.default,o.default,t.Hg=a.default,i.default,s.default,l.default,c.default,u.default,d.default,p.default,r.default,o.default,a.default,i.default,s.default,l.default,c.default,u.default,d.default,p.default},497:(e,t,n)=>{"use strict";var r=n(218);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},528:(e,t)=>{"use strict";var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler");Symbol.for("react.provider");var s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),m=Symbol.for("react.offscreen"),h=Symbol.for("react.client.reference");function g(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case o:case i:case a:case u:case d:return e;default:switch(e=e&&e.$$typeof){case l:case c:case f:case p:case s:return e;default:return t}}case r:return t}}}t.Hy=function(e){return"string"===typeof e||"function"===typeof e||e===o||e===i||e===a||e===u||e===d||e===m||"object"===typeof e&&null!==e&&(e.$$typeof===f||e.$$typeof===p||e.$$typeof===l||e.$$typeof===s||e.$$typeof===c||e.$$typeof===h||void 0!==e.getModuleId)},t.QP=g},529:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={registered:{},scrollEvent:{register:function(e,t){n.registered[e]=t},remove:function(e){n.registered[e]=null}}};t.default=n},556:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(43)),o=a(n(380));function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=function(e){function t(){var e,n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,s=Array(a),l=0;l<a;l++)s[l]=arguments[l];return n=o=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),o.render=function(){return r.default.createElement("a",o.props,o.props.children)},i(o,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t}(r.default.Component);t.default=(0,o.default)(s)},579:(e,t,n)=>{"use strict";e.exports=n(153)},580:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={defaultEasing:function(e){return e<.5?Math.pow(2*e,2)/2:1-Math.pow(2*(1-e),2)/2},linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:(4-2*e)*e-1},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e}}},730:(e,t,n)=>{"use strict";var r=n(43),o=n(853);function a(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var i=new Set,s={};function l(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(s[e]=t,e=0;e<t.length;e++)i.add(t[e])}var u=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),d=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,f={},m={};function h(e,t,n,r,o,a,i){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=i}var g={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){g[e]=new h(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];g[t]=new h(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){g[e]=new h(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){g[e]=new h(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){g[e]=new h(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){g[e]=new h(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){g[e]=new h(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){g[e]=new h(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){g[e]=new h(e,5,!1,e.toLowerCase(),null,!1,!1)}));var v=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function y(e,t,n,r){var o=g.hasOwnProperty(t)?g[t]:null;(null!==o?0!==o.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null===t||"undefined"===typeof t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,o,r)&&(n=null),r||null===o?function(e){return!!d.call(m,e)||!d.call(f,e)&&(p.test(e)?m[e]=!0:(f[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=null===n?3!==o.type&&"":n:(t=o.attributeName,r=o.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(o=o.type)||4===o&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(v,b);g[t]=new h(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(v,b);g[t]=new h(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(v,b);g[t]=new h(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){g[e]=new h(e,1,!1,e.toLowerCase(),null,!1,!1)})),g.xlinkHref=new h("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){g[e]=new h(e,1,!1,e.toLowerCase(),null,!0,!0)}));var x=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for("react.element"),S=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),E=Symbol.for("react.provider"),T=Symbol.for("react.context"),P=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),_=Symbol.for("react.lazy");Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode");var A=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker");var z=Symbol.iterator;function M(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=z&&e[z]||e["@@iterator"])?e:null}var I,$=Object.assign;function F(e){if(void 0===I)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);I=t&&t[1]||""}return"\n"+I+e}var D=!1;function L(e,t){if(!e||D)return"";D=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"===typeof c.stack){for(var o=c.stack.split("\n"),a=r.stack.split("\n"),i=o.length-1,s=a.length-1;1<=i&&0<=s&&o[i]!==a[s];)s--;for(;1<=i&&0<=s;i--,s--)if(o[i]!==a[s]){if(1!==i||1!==s)do{if(i--,0>--s||o[i]!==a[s]){var l="\n"+o[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}}while(1<=i&&0<=s);break}}}finally{D=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?F(e):""}function B(e){switch(e.tag){case 5:return F(e.type);case 16:return F("Lazy");case 13:return F("Suspense");case 19:return F("SuspenseList");case 0:case 2:case 15:return e=L(e.type,!1);case 11:return e=L(e.type.render,!1);case 1:return e=L(e.type,!0);default:return""}}function U(e){if(null==e)return null;if("function"===typeof e)return e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case k:return"Fragment";case S:return"Portal";case C:return"Profiler";case j:return"StrictMode";case O:return"Suspense";case N:return"SuspenseList"}if("object"===typeof e)switch(e.$$typeof){case T:return(e.displayName||"Context")+".Consumer";case E:return(e._context.displayName||"Context")+".Provider";case P:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case R:return null!==(t=e.displayName||null)?t:U(e.type)||"Memo";case _:t=e._payload,e=e._init;try{return U(e(t))}catch(n){}}return null}function W(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return U(t);case 8:return t===j?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof t)return t.displayName||t.name||null;if("string"===typeof t)return t}return null}function H(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function V(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function q(e){e._valueTracker||(e._valueTracker=function(e){var t=V(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var o=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(e){r=""+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function K(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=V(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function G(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function Q(e,t){var n=t.checked;return $({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function Y(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=H(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function X(e,t){null!=(t=t.checked)&&y(e,"checked",t,!1)}function J(e,t){X(e,t);var n=H(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ee(e,t.type,n):t.hasOwnProperty("defaultValue")&&ee(e,t.type,H(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function Z(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ee(e,t,n){"number"===t&&G(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var te=Array.isArray;function ne(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+H(n),t=null,o=0;o<e.length;o++){if(e[o].value===n)return e[o].selected=!0,void(r&&(e[o].defaultSelected=!0));null!==t||e[o].disabled||(t=e[o])}null!==t&&(t.selected=!0)}}function re(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(a(91));return $({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function oe(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(a(92));if(te(n)){if(1<n.length)throw Error(a(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:H(n)}}function ae(e,t){var n=H(t.value),r=H(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ie(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}function se(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function le(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?se(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ce,ue,de=(ue=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((ce=ce||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ce.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return ue(e,t)}))}:ue);function pe(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var fe={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},me=["Webkit","ms","Moz","O"];function he(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||fe.hasOwnProperty(e)&&fe[e]?(""+t).trim():t+"px"}function ge(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),o=he(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}Object.keys(fe).forEach((function(e){me.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),fe[t]=fe[e]}))}));var ve=$({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function be(e,t){if(t){if(ve[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(a(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(a(60));if("object"!==typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(a(61))}if(null!=t.style&&"object"!==typeof t.style)throw Error(a(62))}}function ye(e,t){if(-1===e.indexOf("-"))return"string"===typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xe=null;function we(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Se=null,ke=null,je=null;function Ce(e){if(e=xo(e)){if("function"!==typeof Se)throw Error(a(280));var t=e.stateNode;t&&(t=So(t),Se(e.stateNode,e.type,t))}}function Ee(e){ke?je?je.push(e):je=[e]:ke=e}function Te(){if(ke){var e=ke,t=je;if(je=ke=null,Ce(e),t)for(e=0;e<t.length;e++)Ce(t[e])}}function Pe(e,t){return e(t)}function Oe(){}var Ne=!1;function Re(e,t,n){if(Ne)return e(t,n);Ne=!0;try{return Pe(e,t,n)}finally{Ne=!1,(null!==ke||null!==je)&&(Oe(),Te())}}function _e(e,t){var n=e.stateNode;if(null===n)return null;var r=So(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(a(231,t,typeof n));return n}var Ae=!1;if(u)try{var ze={};Object.defineProperty(ze,"passive",{get:function(){Ae=!0}}),window.addEventListener("test",ze,ze),window.removeEventListener("test",ze,ze)}catch(ue){Ae=!1}function Me(e,t,n,r,o,a,i,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(u){this.onError(u)}}var Ie=!1,$e=null,Fe=!1,De=null,Le={onError:function(e){Ie=!0,$e=e}};function Be(e,t,n,r,o,a,i,s,l){Ie=!1,$e=null,Me.apply(Le,arguments)}function Ue(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function We(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function He(e){if(Ue(e)!==e)throw Error(a(188))}function Ve(e){return null!==(e=function(e){var t=e.alternate;if(!t){if(null===(t=Ue(e)))throw Error(a(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(null===o)break;var i=o.alternate;if(null===i){if(null!==(r=o.return)){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return He(o),e;if(i===r)return He(o),t;i=i.sibling}throw Error(a(188))}if(n.return!==r.return)n=o,r=i;else{for(var s=!1,l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s){for(l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s)throw Error(a(189))}}if(n.alternate!==r)throw Error(a(190))}if(3!==n.tag)throw Error(a(188));return n.stateNode.current===n?e:t}(e))?qe(e):null}function qe(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var t=qe(e);if(null!==t)return t;e=e.sibling}return null}var Ke=o.unstable_scheduleCallback,Ge=o.unstable_cancelCallback,Qe=o.unstable_shouldYield,Ye=o.unstable_requestPaint,Xe=o.unstable_now,Je=o.unstable_getCurrentPriorityLevel,Ze=o.unstable_ImmediatePriority,et=o.unstable_UserBlockingPriority,tt=o.unstable_NormalPriority,nt=o.unstable_LowPriority,rt=o.unstable_IdlePriority,ot=null,at=null;var it=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(st(e)/lt|0)|0},st=Math.log,lt=Math.LN2;var ct=64,ut=4194304;function dt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function pt(e,t){var n=e.pendingLanes;if(0===n)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,i=268435455&n;if(0!==i){var s=i&~o;0!==s?r=dt(s):0!==(a&=i)&&(r=dt(a))}else 0!==(i=n&~o)?r=dt(i):0!==a&&(r=dt(a));if(0===r)return 0;if(0!==t&&t!==r&&0===(t&o)&&((o=r&-r)>=(a=t&-t)||16===o&&0!==(4194240&a)))return t;if(0!==(4&r)&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)o=1<<(n=31-it(t)),r|=e[n],t&=~o;return r}function ft(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function mt(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function ht(){var e=ct;return 0===(4194240&(ct<<=1))&&(ct=64),e}function gt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function vt(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-it(t)]=n}function bt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-it(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var yt=0;function xt(e){return 1<(e&=-e)?4<e?0!==(268435455&e)?16:536870912:4:1}var wt,St,kt,jt,Ct,Et=!1,Tt=[],Pt=null,Ot=null,Nt=null,Rt=new Map,_t=new Map,At=[],zt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Mt(e,t){switch(e){case"focusin":case"focusout":Pt=null;break;case"dragenter":case"dragleave":Ot=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":Rt.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":_t.delete(t.pointerId)}}function It(e,t,n,r,o,a){return null===e||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},null!==t&&(null!==(t=xo(t))&&St(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==o&&-1===t.indexOf(o)&&t.push(o),e)}function $t(e){var t=yo(e.target);if(null!==t){var n=Ue(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=We(n)))return e.blockedOn=t,void Ct(e.priority,(function(){kt(n)}))}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Ft(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Qt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=xo(n))&&St(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);xe=r,n.target.dispatchEvent(r),xe=null,t.shift()}return!0}function Dt(e,t,n){Ft(e)&&n.delete(t)}function Lt(){Et=!1,null!==Pt&&Ft(Pt)&&(Pt=null),null!==Ot&&Ft(Ot)&&(Ot=null),null!==Nt&&Ft(Nt)&&(Nt=null),Rt.forEach(Dt),_t.forEach(Dt)}function Bt(e,t){e.blockedOn===t&&(e.blockedOn=null,Et||(Et=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Lt)))}function Ut(e){function t(t){return Bt(t,e)}if(0<Tt.length){Bt(Tt[0],e);for(var n=1;n<Tt.length;n++){var r=Tt[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==Pt&&Bt(Pt,e),null!==Ot&&Bt(Ot,e),null!==Nt&&Bt(Nt,e),Rt.forEach(t),_t.forEach(t),n=0;n<At.length;n++)(r=At[n]).blockedOn===e&&(r.blockedOn=null);for(;0<At.length&&null===(n=At[0]).blockedOn;)$t(n),null===n.blockedOn&&At.shift()}var Wt=x.ReactCurrentBatchConfig,Ht=!0;function Vt(e,t,n,r){var o=yt,a=Wt.transition;Wt.transition=null;try{yt=1,Kt(e,t,n,r)}finally{yt=o,Wt.transition=a}}function qt(e,t,n,r){var o=yt,a=Wt.transition;Wt.transition=null;try{yt=4,Kt(e,t,n,r)}finally{yt=o,Wt.transition=a}}function Kt(e,t,n,r){if(Ht){var o=Qt(e,t,n,r);if(null===o)Hr(e,t,r,Gt,n),Mt(e,r);else if(function(e,t,n,r,o){switch(t){case"focusin":return Pt=It(Pt,e,t,n,r,o),!0;case"dragenter":return Ot=It(Ot,e,t,n,r,o),!0;case"mouseover":return Nt=It(Nt,e,t,n,r,o),!0;case"pointerover":var a=o.pointerId;return Rt.set(a,It(Rt.get(a)||null,e,t,n,r,o)),!0;case"gotpointercapture":return a=o.pointerId,_t.set(a,It(_t.get(a)||null,e,t,n,r,o)),!0}return!1}(o,e,t,n,r))r.stopPropagation();else if(Mt(e,r),4&t&&-1<zt.indexOf(e)){for(;null!==o;){var a=xo(o);if(null!==a&&wt(a),null===(a=Qt(e,t,n,r))&&Hr(e,t,r,Gt,n),a===o)break;o=a}null!==o&&r.stopPropagation()}else Hr(e,t,r,null,n)}}var Gt=null;function Qt(e,t,n,r){if(Gt=null,null!==(e=yo(e=we(r))))if(null===(t=Ue(e)))e=null;else if(13===(n=t.tag)){if(null!==(e=We(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Gt=e,null}function Yt(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Je()){case Ze:return 1;case et:return 4;case tt:case nt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Xt=null,Jt=null,Zt=null;function en(){if(Zt)return Zt;var e,t,n=Jt,r=n.length,o="value"in Xt?Xt.value:Xt.textContent,a=o.length;for(e=0;e<r&&n[e]===o[e];e++);var i=r-e;for(t=1;t<=i&&n[r-t]===o[a-t];t++);return Zt=o.slice(e,1<t?1-t:void 0)}function tn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function nn(){return!0}function rn(){return!1}function on(e){function t(t,n,r,o,a){for(var i in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=o,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(o):o[i]);return this.isDefaultPrevented=(null!=o.defaultPrevented?o.defaultPrevented:!1===o.returnValue)?nn:rn,this.isPropagationStopped=rn,this}return $(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=nn)},persist:function(){},isPersistent:nn}),t}var an,sn,ln,cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},un=on(cn),dn=$({},cn,{view:0,detail:0}),pn=on(dn),fn=$({},dn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ln&&(ln&&"mousemove"===e.type?(an=e.screenX-ln.screenX,sn=e.screenY-ln.screenY):sn=an=0,ln=e),an)},movementY:function(e){return"movementY"in e?e.movementY:sn}}),mn=on(fn),hn=on($({},fn,{dataTransfer:0})),gn=on($({},dn,{relatedTarget:0})),vn=on($({},cn,{animationName:0,elapsedTime:0,pseudoElement:0})),bn=$({},cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yn=on(bn),xn=on($({},cn,{data:0})),wn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function jn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=kn[e])&&!!t[e]}function Cn(){return jn}var En=$({},dn,{key:function(e){if(e.key){var t=wn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=tn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?Sn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cn,charCode:function(e){return"keypress"===e.type?tn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?tn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Tn=on(En),Pn=on($({},fn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),On=on($({},dn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cn})),Nn=on($({},cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Rn=$({},fn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),_n=on(Rn),An=[9,13,27,32],zn=u&&"CompositionEvent"in window,Mn=null;u&&"documentMode"in document&&(Mn=document.documentMode);var In=u&&"TextEvent"in window&&!Mn,$n=u&&(!zn||Mn&&8<Mn&&11>=Mn),Fn=String.fromCharCode(32),Dn=!1;function Ln(e,t){switch(e){case"keyup":return-1!==An.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Un=!1;var Wn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Wn[e.type]:"textarea"===t}function Vn(e,t,n,r){Ee(r),0<(t=qr(t,"onChange")).length&&(n=new un("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var qn=null,Kn=null;function Gn(e){Fr(e,0)}function Qn(e){if(K(wo(e)))return e}function Yn(e,t){if("change"===e)return t}var Xn=!1;if(u){var Jn;if(u){var Zn="oninput"in document;if(!Zn){var er=document.createElement("div");er.setAttribute("oninput","return;"),Zn="function"===typeof er.oninput}Jn=Zn}else Jn=!1;Xn=Jn&&(!document.documentMode||9<document.documentMode)}function tr(){qn&&(qn.detachEvent("onpropertychange",nr),Kn=qn=null)}function nr(e){if("value"===e.propertyName&&Qn(Kn)){var t=[];Vn(t,Kn,e,we(e)),Re(Gn,t)}}function rr(e,t,n){"focusin"===e?(tr(),Kn=n,(qn=t).attachEvent("onpropertychange",nr)):"focusout"===e&&tr()}function or(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Qn(Kn)}function ar(e,t){if("click"===e)return Qn(t)}function ir(e,t){if("input"===e||"change"===e)return Qn(t)}var sr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function lr(e,t){if(sr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!d.call(t,o)||!sr(e[o],t[o]))return!1}return!0}function cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ur(e,t){var n,r=cr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=cr(r)}}function dr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?dr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function pr(){for(var e=window,t=G();t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=G((e=t.contentWindow).document)}return t}function fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function mr(e){var t=pr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&dr(n.ownerDocument.documentElement,n)){if(null!==r&&fr(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection();var o=n.textContent.length,a=Math.min(r.start,o);r=void 0===r.end?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=ur(n,a);var i=ur(n,r);o&&i&&(1!==e.rangeCount||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&((t=t.createRange()).setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"===typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var hr=u&&"documentMode"in document&&11>=document.documentMode,gr=null,vr=null,br=null,yr=!1;function xr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;yr||null==gr||gr!==G(r)||("selectionStart"in(r=gr)&&fr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},br&&lr(br,r)||(br=r,0<(r=qr(vr,"onSelect")).length&&(t=new un("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=gr)))}function wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Sr={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionend:wr("Transition","TransitionEnd")},kr={},jr={};function Cr(e){if(kr[e])return kr[e];if(!Sr[e])return e;var t,n=Sr[e];for(t in n)if(n.hasOwnProperty(t)&&t in jr)return kr[e]=n[t];return e}u&&(jr=document.createElement("div").style,"AnimationEvent"in window||(delete Sr.animationend.animation,delete Sr.animationiteration.animation,delete Sr.animationstart.animation),"TransitionEvent"in window||delete Sr.transitionend.transition);var Er=Cr("animationend"),Tr=Cr("animationiteration"),Pr=Cr("animationstart"),Or=Cr("transitionend"),Nr=new Map,Rr="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _r(e,t){Nr.set(e,t),l(t,[e])}for(var Ar=0;Ar<Rr.length;Ar++){var zr=Rr[Ar];_r(zr.toLowerCase(),"on"+(zr[0].toUpperCase()+zr.slice(1)))}_r(Er,"onAnimationEnd"),_r(Tr,"onAnimationIteration"),_r(Pr,"onAnimationStart"),_r("dblclick","onDoubleClick"),_r("focusin","onFocus"),_r("focusout","onBlur"),_r(Or,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ir=new Set("cancel close invalid load scroll toggle".split(" ").concat(Mr));function $r(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,o,i,s,l,c){if(Be.apply(this,arguments),Ie){if(!Ie)throw Error(a(198));var u=$e;Ie=!1,$e=null,Fe||(Fe=!0,De=u)}}(r,t,void 0,e),e.currentTarget=null}function Fr(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&o.isPropagationStopped())break e;$r(o,s,c),a=l}else for(i=0;i<r.length;i++){if(l=(s=r[i]).instance,c=s.currentTarget,s=s.listener,l!==a&&o.isPropagationStopped())break e;$r(o,s,c),a=l}}}if(Fe)throw e=De,Fe=!1,De=null,e}function Dr(e,t){var n=t[go];void 0===n&&(n=t[go]=new Set);var r=e+"__bubble";n.has(r)||(Wr(t,e,2,!1),n.add(r))}function Lr(e,t,n){var r=0;t&&(r|=4),Wr(n,e,r,t)}var Br="_reactListening"+Math.random().toString(36).slice(2);function Ur(e){if(!e[Br]){e[Br]=!0,i.forEach((function(t){"selectionchange"!==t&&(Ir.has(t)||Lr(t,!1,e),Lr(t,!0,e))}));var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Br]||(t[Br]=!0,Lr("selectionchange",!1,t))}}function Wr(e,t,n,r){switch(Yt(t)){case 1:var o=Vt;break;case 4:o=qt;break;default:o=Kt}n=o.bind(null,t,n,e),o=void 0,!Ae||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(o=!0),r?void 0!==o?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):void 0!==o?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Hr(e,t,n,r,o){var a=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var i=r.tag;if(3===i||4===i){var s=r.stateNode.containerInfo;if(s===o||8===s.nodeType&&s.parentNode===o)break;if(4===i)for(i=r.return;null!==i;){var l=i.tag;if((3===l||4===l)&&((l=i.stateNode.containerInfo)===o||8===l.nodeType&&l.parentNode===o))return;i=i.return}for(;null!==s;){if(null===(i=yo(s)))return;if(5===(l=i.tag)||6===l){r=a=i;continue e}s=s.parentNode}}r=r.return}Re((function(){var r=a,o=we(n),i=[];e:{var s=Nr.get(e);if(void 0!==s){var l=un,c=e;switch(e){case"keypress":if(0===tn(n))break e;case"keydown":case"keyup":l=Tn;break;case"focusin":c="focus",l=gn;break;case"focusout":c="blur",l=gn;break;case"beforeblur":case"afterblur":l=gn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=mn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=hn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=On;break;case Er:case Tr:case Pr:l=vn;break;case Or:l=Nn;break;case"scroll":l=pn;break;case"wheel":l=_n;break;case"copy":case"cut":case"paste":l=yn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=Pn}var u=0!==(4&t),d=!u&&"scroll"===e,p=u?null!==s?s+"Capture":null:s;u=[];for(var f,m=r;null!==m;){var h=(f=m).stateNode;if(5===f.tag&&null!==h&&(f=h,null!==p&&(null!=(h=_e(m,p))&&u.push(Vr(m,h,f)))),d)break;m=m.return}0<u.length&&(s=new l(s,c,null,n,o),i.push({event:s,listeners:u}))}}if(0===(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===xe||!(c=n.relatedTarget||n.fromElement)||!yo(c)&&!c[ho])&&(l||s)&&(s=o.window===o?o:(s=o.ownerDocument)?s.defaultView||s.parentWindow:window,l?(l=r,null!==(c=(c=n.relatedTarget||n.toElement)?yo(c):null)&&(c!==(d=Ue(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(l=null,c=r),l!==c)){if(u=mn,h="onMouseLeave",p="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(u=Pn,h="onPointerLeave",p="onPointerEnter",m="pointer"),d=null==l?s:wo(l),f=null==c?s:wo(c),(s=new u(h,m+"leave",l,n,o)).target=d,s.relatedTarget=f,h=null,yo(o)===r&&((u=new u(p,m+"enter",c,n,o)).target=f,u.relatedTarget=d,h=u),d=h,l&&c)e:{for(p=c,m=0,f=u=l;f;f=Kr(f))m++;for(f=0,h=p;h;h=Kr(h))f++;for(;0<m-f;)u=Kr(u),m--;for(;0<f-m;)p=Kr(p),f--;for(;m--;){if(u===p||null!==p&&u===p.alternate)break e;u=Kr(u),p=Kr(p)}u=null}else u=null;null!==l&&Gr(i,s,l,u,!1),null!==c&&null!==d&&Gr(i,d,c,u,!0)}if("select"===(l=(s=r?wo(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===l&&"file"===s.type)var g=Yn;else if(Hn(s))if(Xn)g=ir;else{g=or;var v=rr}else(l=s.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===s.type||"radio"===s.type)&&(g=ar);switch(g&&(g=g(e,r))?Vn(i,g,n,o):(v&&v(e,s,r),"focusout"===e&&(v=s._wrapperState)&&v.controlled&&"number"===s.type&&ee(s,"number",s.value)),v=r?wo(r):window,e){case"focusin":(Hn(v)||"true"===v.contentEditable)&&(gr=v,vr=r,br=null);break;case"focusout":br=vr=gr=null;break;case"mousedown":yr=!0;break;case"contextmenu":case"mouseup":case"dragend":yr=!1,xr(i,n,o);break;case"selectionchange":if(hr)break;case"keydown":case"keyup":xr(i,n,o)}var b;if(zn)e:{switch(e){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Un?Ln(e,n)&&(y="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(y="onCompositionStart");y&&($n&&"ko"!==n.locale&&(Un||"onCompositionStart"!==y?"onCompositionEnd"===y&&Un&&(b=en()):(Jt="value"in(Xt=o)?Xt.value:Xt.textContent,Un=!0)),0<(v=qr(r,y)).length&&(y=new xn(y,e,null,n,o),i.push({event:y,listeners:v}),b?y.data=b:null!==(b=Bn(n))&&(y.data=b))),(b=In?function(e,t){switch(e){case"compositionend":return Bn(t);case"keypress":return 32!==t.which?null:(Dn=!0,Fn);case"textInput":return(e=t.data)===Fn&&Dn?null:e;default:return null}}(e,n):function(e,t){if(Un)return"compositionend"===e||!zn&&Ln(e,t)?(e=en(),Zt=Jt=Xt=null,Un=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $n&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=qr(r,"onBeforeInput")).length&&(o=new xn("onBeforeInput","beforeinput",null,n,o),i.push({event:o,listeners:r}),o.data=b))}Fr(i,t)}))}function Vr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qr(e,t){for(var n=t+"Capture",r=[];null!==e;){var o=e,a=o.stateNode;5===o.tag&&null!==a&&(o=a,null!=(a=_e(e,n))&&r.unshift(Vr(e,a,o)),null!=(a=_e(e,t))&&r.push(Vr(e,a,o))),e=e.return}return r}function Kr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Gr(e,t,n,r,o){for(var a=t._reactName,i=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(null!==l&&l===r)break;5===s.tag&&null!==c&&(s=c,o?null!=(l=_e(n,a))&&i.unshift(Vr(n,l,s)):o||null!=(l=_e(n,a))&&i.push(Vr(n,l,s))),n=n.return}0!==i.length&&e.push({event:t,listeners:i})}var Qr=/\r\n?/g,Yr=/\u0000|\uFFFD/g;function Xr(e){return("string"===typeof e?e:""+e).replace(Qr,"\n").replace(Yr,"")}function Jr(e,t,n){if(t=Xr(t),Xr(e)!==t&&n)throw Error(a(425))}function Zr(){}var eo=null,to=null;function no(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ro="function"===typeof setTimeout?setTimeout:void 0,oo="function"===typeof clearTimeout?clearTimeout:void 0,ao="function"===typeof Promise?Promise:void 0,io="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof ao?function(e){return ao.resolve(null).then(e).catch(so)}:ro;function so(e){setTimeout((function(){throw e}))}function lo(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&8===o.nodeType)if("/$"===(n=o.data)){if(0===r)return e.removeChild(o),void Ut(t);r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++;n=o}while(n);Ut(t)}function co(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break;if("/$"===t)return null}}return e}function uo(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var po=Math.random().toString(36).slice(2),fo="__reactFiber$"+po,mo="__reactProps$"+po,ho="__reactContainer$"+po,go="__reactEvents$"+po,vo="__reactListeners$"+po,bo="__reactHandles$"+po;function yo(e){var t=e[fo];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ho]||n[fo]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=uo(e);null!==e;){if(n=e[fo])return n;e=uo(e)}return t}n=(e=n).parentNode}return null}function xo(e){return!(e=e[fo]||e[ho])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function wo(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(a(33))}function So(e){return e[mo]||null}var ko=[],jo=-1;function Co(e){return{current:e}}function Eo(e){0>jo||(e.current=ko[jo],ko[jo]=null,jo--)}function To(e,t){jo++,ko[jo]=e.current,e.current=t}var Po={},Oo=Co(Po),No=Co(!1),Ro=Po;function _o(e,t){var n=e.type.contextTypes;if(!n)return Po;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o,a={};for(o in n)a[o]=t[o];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Ao(e){return null!==(e=e.childContextTypes)&&void 0!==e}function zo(){Eo(No),Eo(Oo)}function Mo(e,t,n){if(Oo.current!==Po)throw Error(a(168));To(Oo,t),To(No,n)}function Io(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,"function"!==typeof r.getChildContext)return n;for(var o in r=r.getChildContext())if(!(o in t))throw Error(a(108,W(e)||"Unknown",o));return $({},n,r)}function $o(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Po,Ro=Oo.current,To(Oo,e),To(No,No.current),!0}function Fo(e,t,n){var r=e.stateNode;if(!r)throw Error(a(169));n?(e=Io(e,t,Ro),r.__reactInternalMemoizedMergedChildContext=e,Eo(No),Eo(Oo),To(Oo,e)):Eo(No),To(No,n)}var Do=null,Lo=!1,Bo=!1;function Uo(e){null===Do?Do=[e]:Do.push(e)}function Wo(){if(!Bo&&null!==Do){Bo=!0;var e=0,t=yt;try{var n=Do;for(yt=1;e<n.length;e++){var r=n[e];do{r=r(!0)}while(null!==r)}Do=null,Lo=!1}catch(o){throw null!==Do&&(Do=Do.slice(e+1)),Ke(Ze,Wo),o}finally{yt=t,Bo=!1}}return null}var Ho=[],Vo=0,qo=null,Ko=0,Go=[],Qo=0,Yo=null,Xo=1,Jo="";function Zo(e,t){Ho[Vo++]=Ko,Ho[Vo++]=qo,qo=e,Ko=t}function ea(e,t,n){Go[Qo++]=Xo,Go[Qo++]=Jo,Go[Qo++]=Yo,Yo=e;var r=Xo;e=Jo;var o=32-it(r)-1;r&=~(1<<o),n+=1;var a=32-it(t)+o;if(30<a){var i=o-o%5;a=(r&(1<<i)-1).toString(32),r>>=i,o-=i,Xo=1<<32-it(t)+o|n<<o|r,Jo=a+e}else Xo=1<<a|n<<o|r,Jo=e}function ta(e){null!==e.return&&(Zo(e,1),ea(e,1,0))}function na(e){for(;e===qo;)qo=Ho[--Vo],Ho[Vo]=null,Ko=Ho[--Vo],Ho[Vo]=null;for(;e===Yo;)Yo=Go[--Qo],Go[Qo]=null,Jo=Go[--Qo],Go[Qo]=null,Xo=Go[--Qo],Go[Qo]=null}var ra=null,oa=null,aa=!1,ia=null;function sa(e,t){var n=Rc(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function la(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,ra=e,oa=co(t.firstChild),!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,ra=e,oa=null,!0);case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==Yo?{id:Xo,overflow:Jo}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=Rc(18,null,null,0)).stateNode=t,n.return=e,e.child=n,ra=e,oa=null,!0);default:return!1}}function ca(e){return 0!==(1&e.mode)&&0===(128&e.flags)}function ua(e){if(aa){var t=oa;if(t){var n=t;if(!la(e,t)){if(ca(e))throw Error(a(418));t=co(n.nextSibling);var r=ra;t&&la(e,t)?sa(r,n):(e.flags=-4097&e.flags|2,aa=!1,ra=e)}}else{if(ca(e))throw Error(a(418));e.flags=-4097&e.flags|2,aa=!1,ra=e}}}function da(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;ra=e}function pa(e){if(e!==ra)return!1;if(!aa)return da(e),aa=!0,!1;var t;if((t=3!==e.tag)&&!(t=5!==e.tag)&&(t="head"!==(t=e.type)&&"body"!==t&&!no(e.type,e.memoizedProps)),t&&(t=oa)){if(ca(e))throw fa(),Error(a(418));for(;t;)sa(e,t),t=co(t.nextSibling)}if(da(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(a(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){oa=co(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}oa=null}}else oa=ra?co(e.stateNode.nextSibling):null;return!0}function fa(){for(var e=oa;e;)e=co(e.nextSibling)}function ma(){oa=ra=null,aa=!1}function ha(e){null===ia?ia=[e]:ia.push(e)}var ga=x.ReactCurrentBatchConfig;function va(e,t,n){if(null!==(e=n.ref)&&"function"!==typeof e&&"object"!==typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(a(309));var r=n.stateNode}if(!r)throw Error(a(147,e));var o=r,i=""+e;return null!==t&&null!==t.ref&&"function"===typeof t.ref&&t.ref._stringRef===i?t.ref:(t=function(e){var t=o.refs;null===e?delete t[i]:t[i]=e},t._stringRef=i,t)}if("string"!==typeof e)throw Error(a(284));if(!n._owner)throw Error(a(290,e))}return e}function ba(e,t){throw e=Object.prototype.toString.call(t),Error(a(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ya(e){return(0,e._init)(e._payload)}function xa(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function o(e,t){return(e=Ac(e,t)).index=0,e.sibling=null,e}function i(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=2,n):r:(t.flags|=2,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=$c(n,e.mode,r)).return=e,t):((t=o(t,n)).return=e,t)}function c(e,t,n,r){var a=n.type;return a===k?d(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===a||"object"===typeof a&&null!==a&&a.$$typeof===_&&ya(a)===t.type)?((r=o(t,n.props)).ref=va(e,t,n),r.return=e,r):((r=zc(n.type,n.key,n.props,null,e.mode,r)).ref=va(e,t,n),r.return=e,r)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Fc(n,e.mode,r)).return=e,t):((t=o(t,n.children||[])).return=e,t)}function d(e,t,n,r,a){return null===t||7!==t.tag?((t=Mc(n,e.mode,r,a)).return=e,t):((t=o(t,n)).return=e,t)}function p(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t)return(t=$c(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case w:return(n=zc(t.type,t.key,t.props,null,e.mode,n)).ref=va(e,null,t),n.return=e,n;case S:return(t=Fc(t,e.mode,n)).return=e,t;case _:return p(e,(0,t._init)(t._payload),n)}if(te(t)||M(t))return(t=Mc(t,e.mode,n,null)).return=e,t;ba(e,t)}return null}function f(e,t,n,r){var o=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n)return null!==o?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case w:return n.key===o?c(e,t,n,r):null;case S:return n.key===o?u(e,t,n,r):null;case _:return f(e,t,(o=n._init)(n._payload),r)}if(te(n)||M(n))return null!==o?null:d(e,t,n,r,null);ba(e,n)}return null}function m(e,t,n,r,o){if("string"===typeof r&&""!==r||"number"===typeof r)return l(t,e=e.get(n)||null,""+r,o);if("object"===typeof r&&null!==r){switch(r.$$typeof){case w:return c(t,e=e.get(null===r.key?n:r.key)||null,r,o);case S:return u(t,e=e.get(null===r.key?n:r.key)||null,r,o);case _:return m(e,t,n,(0,r._init)(r._payload),o)}if(te(r)||M(r))return d(t,e=e.get(n)||null,r,o,null);ba(t,r)}return null}function h(o,a,s,l){for(var c=null,u=null,d=a,h=a=0,g=null;null!==d&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var v=f(o,d,s[h],l);if(null===v){null===d&&(d=g);break}e&&d&&null===v.alternate&&t(o,d),a=i(v,a,h),null===u?c=v:u.sibling=v,u=v,d=g}if(h===s.length)return n(o,d),aa&&Zo(o,h),c;if(null===d){for(;h<s.length;h++)null!==(d=p(o,s[h],l))&&(a=i(d,a,h),null===u?c=d:u.sibling=d,u=d);return aa&&Zo(o,h),c}for(d=r(o,d);h<s.length;h++)null!==(g=m(d,o,h,s[h],l))&&(e&&null!==g.alternate&&d.delete(null===g.key?h:g.key),a=i(g,a,h),null===u?c=g:u.sibling=g,u=g);return e&&d.forEach((function(e){return t(o,e)})),aa&&Zo(o,h),c}function g(o,s,l,c){var u=M(l);if("function"!==typeof u)throw Error(a(150));if(null==(l=u.call(l)))throw Error(a(151));for(var d=u=null,h=s,g=s=0,v=null,b=l.next();null!==h&&!b.done;g++,b=l.next()){h.index>g?(v=h,h=null):v=h.sibling;var y=f(o,h,b.value,c);if(null===y){null===h&&(h=v);break}e&&h&&null===y.alternate&&t(o,h),s=i(y,s,g),null===d?u=y:d.sibling=y,d=y,h=v}if(b.done)return n(o,h),aa&&Zo(o,g),u;if(null===h){for(;!b.done;g++,b=l.next())null!==(b=p(o,b.value,c))&&(s=i(b,s,g),null===d?u=b:d.sibling=b,d=b);return aa&&Zo(o,g),u}for(h=r(o,h);!b.done;g++,b=l.next())null!==(b=m(h,o,g,b.value,c))&&(e&&null!==b.alternate&&h.delete(null===b.key?g:b.key),s=i(b,s,g),null===d?u=b:d.sibling=b,d=b);return e&&h.forEach((function(e){return t(o,e)})),aa&&Zo(o,g),u}return function e(r,a,i,l){if("object"===typeof i&&null!==i&&i.type===k&&null===i.key&&(i=i.props.children),"object"===typeof i&&null!==i){switch(i.$$typeof){case w:e:{for(var c=i.key,u=a;null!==u;){if(u.key===c){if((c=i.type)===k){if(7===u.tag){n(r,u.sibling),(a=o(u,i.props.children)).return=r,r=a;break e}}else if(u.elementType===c||"object"===typeof c&&null!==c&&c.$$typeof===_&&ya(c)===u.type){n(r,u.sibling),(a=o(u,i.props)).ref=va(r,u,i),a.return=r,r=a;break e}n(r,u);break}t(r,u),u=u.sibling}i.type===k?((a=Mc(i.props.children,r.mode,l,i.key)).return=r,r=a):((l=zc(i.type,i.key,i.props,null,r.mode,l)).ref=va(r,a,i),l.return=r,r=l)}return s(r);case S:e:{for(u=i.key;null!==a;){if(a.key===u){if(4===a.tag&&a.stateNode.containerInfo===i.containerInfo&&a.stateNode.implementation===i.implementation){n(r,a.sibling),(a=o(a,i.children||[])).return=r,r=a;break e}n(r,a);break}t(r,a),a=a.sibling}(a=Fc(i,r.mode,l)).return=r,r=a}return s(r);case _:return e(r,a,(u=i._init)(i._payload),l)}if(te(i))return h(r,a,i,l);if(M(i))return g(r,a,i,l);ba(r,i)}return"string"===typeof i&&""!==i||"number"===typeof i?(i=""+i,null!==a&&6===a.tag?(n(r,a.sibling),(a=o(a,i)).return=r,r=a):(n(r,a),(a=$c(i,r.mode,l)).return=r,r=a),s(r)):n(r,a)}}var wa=xa(!0),Sa=xa(!1),ka=Co(null),ja=null,Ca=null,Ea=null;function Ta(){Ea=Ca=ja=null}function Pa(e){var t=ka.current;Eo(ka),e._currentValue=t}function Oa(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Na(e,t){ja=e,Ea=Ca=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(ys=!0),e.firstContext=null)}function Ra(e){var t=e._currentValue;if(Ea!==e)if(e={context:e,memoizedValue:t,next:null},null===Ca){if(null===ja)throw Error(a(308));Ca=e,ja.dependencies={lanes:0,firstContext:e}}else Ca=Ca.next=e;return t}var _a=null;function Aa(e){null===_a?_a=[e]:_a.push(e)}function za(e,t,n,r){var o=t.interleaved;return null===o?(n.next=n,Aa(t)):(n.next=o.next,o.next=n),t.interleaved=n,Ma(e,r)}function Ma(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}var Ia=!1;function $a(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Da(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function La(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&Pl)){var o=r.pending;return null===o?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Ma(e,n)}return null===(o=r.interleaved)?(t.next=t,Aa(r)):(t.next=o.next,o.next=t),r.interleaved=t,Ma(e,n)}function Ba(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194240&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,bt(e,n)}}function Ua(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var o=null,a=null;if(null!==(n=n.firstBaseUpdate)){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===a?o=a=i:a=a.next=i,n=n.next}while(null!==n);null===a?o=a=t:a=a.next=t}else o=a=t;return n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Wa(e,t,n,r){var o=e.updateQueue;Ia=!1;var a=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(null!==s){o.shared.pending=null;var l=s,c=l.next;l.next=null,null===i?a=c:i.next=c,i=l;var u=e.alternate;null!==u&&((s=(u=u.updateQueue).lastBaseUpdate)!==i&&(null===s?u.firstBaseUpdate=c:s.next=c,u.lastBaseUpdate=l))}if(null!==a){var d=o.baseState;for(i=0,u=c=l=null,s=a;;){var p=s.lane,f=s.eventTime;if((r&p)===p){null!==u&&(u=u.next={eventTime:f,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var m=e,h=s;switch(p=t,f=n,h.tag){case 1:if("function"===typeof(m=h.payload)){d=m.call(f,d,p);break e}d=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null===(p="function"===typeof(m=h.payload)?m.call(f,d,p):m)||void 0===p)break e;d=$({},d,p);break e;case 2:Ia=!0}}null!==s.callback&&0!==s.lane&&(e.flags|=64,null===(p=o.effects)?o.effects=[s]:p.push(s))}else f={eventTime:f,lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===u?(c=u=f,l=d):u=u.next=f,i|=p;if(null===(s=s.next)){if(null===(s=o.shared.pending))break;s=(p=s).next,p.next=null,o.lastBaseUpdate=p,o.shared.pending=null}}if(null===u&&(l=d),o.baseState=l,o.firstBaseUpdate=c,o.lastBaseUpdate=u,null!==(t=o.shared.interleaved)){o=t;do{i|=o.lane,o=o.next}while(o!==t)}else null===a&&(o.shared.lanes=0);Il|=i,e.lanes=i,e.memoizedState=d}}function Ha(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(null!==o){if(r.callback=null,r=n,"function"!==typeof o)throw Error(a(191,o));o.call(r)}}}var Va={},qa=Co(Va),Ka=Co(Va),Ga=Co(Va);function Qa(e){if(e===Va)throw Error(a(174));return e}function Ya(e,t){switch(To(Ga,t),To(Ka,e),To(qa,Va),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:le(null,"");break;default:t=le(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Eo(qa),To(qa,t)}function Xa(){Eo(qa),Eo(Ka),Eo(Ga)}function Ja(e){Qa(Ga.current);var t=Qa(qa.current),n=le(t,e.type);t!==n&&(To(Ka,e),To(qa,n))}function Za(e){Ka.current===e&&(Eo(qa),Eo(Ka))}var ei=Co(0);function ti(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ni=[];function ri(){for(var e=0;e<ni.length;e++)ni[e]._workInProgressVersionPrimary=null;ni.length=0}var oi=x.ReactCurrentDispatcher,ai=x.ReactCurrentBatchConfig,ii=0,si=null,li=null,ci=null,ui=!1,di=!1,pi=0,fi=0;function mi(){throw Error(a(321))}function hi(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!sr(e[n],t[n]))return!1;return!0}function gi(e,t,n,r,o,i){if(ii=i,si=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,oi.current=null===e||null===e.memoizedState?Zi:es,e=n(r,o),di){i=0;do{if(di=!1,pi=0,25<=i)throw Error(a(301));i+=1,ci=li=null,t.updateQueue=null,oi.current=ts,e=n(r,o)}while(di)}if(oi.current=Ji,t=null!==li&&null!==li.next,ii=0,ci=li=si=null,ui=!1,t)throw Error(a(300));return e}function vi(){var e=0!==pi;return pi=0,e}function bi(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ci?si.memoizedState=ci=e:ci=ci.next=e,ci}function yi(){if(null===li){var e=si.alternate;e=null!==e?e.memoizedState:null}else e=li.next;var t=null===ci?si.memoizedState:ci.next;if(null!==t)ci=t,li=e;else{if(null===e)throw Error(a(310));e={memoizedState:(li=e).memoizedState,baseState:li.baseState,baseQueue:li.baseQueue,queue:li.queue,next:null},null===ci?si.memoizedState=ci=e:ci=ci.next=e}return ci}function xi(e,t){return"function"===typeof t?t(e):t}function wi(e){var t=yi(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=li,o=r.baseQueue,i=n.pending;if(null!==i){if(null!==o){var s=o.next;o.next=i.next,i.next=s}r.baseQueue=o=i,n.pending=null}if(null!==o){i=o.next,r=r.baseState;var l=s=null,c=null,u=i;do{var d=u.lane;if((ii&d)===d)null!==c&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var p={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};null===c?(l=c=p,s=r):c=c.next=p,si.lanes|=d,Il|=d}u=u.next}while(null!==u&&u!==i);null===c?s=r:c.next=l,sr(r,t.memoizedState)||(ys=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(null!==(e=n.interleaved)){o=e;do{i=o.lane,si.lanes|=i,Il|=i,o=o.next}while(o!==e)}else null===o&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Si(e){var t=yi(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(null!==o){n.pending=null;var s=o=o.next;do{i=e(i,s.action),s=s.next}while(s!==o);sr(i,t.memoizedState)||(ys=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function ki(){}function ji(e,t){var n=si,r=yi(),o=t(),i=!sr(r.memoizedState,o);if(i&&(r.memoizedState=o,ys=!0),r=r.queue,Ii(Ti.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||null!==ci&&1&ci.memoizedState.tag){if(n.flags|=2048,Ri(9,Ei.bind(null,n,r,o,t),void 0,null),null===Ol)throw Error(a(349));0!==(30&ii)||Ci(n,t,o)}return o}function Ci(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=si.updateQueue)?(t={lastEffect:null,stores:null},si.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Ei(e,t,n,r){t.value=n,t.getSnapshot=r,Pi(t)&&Oi(e)}function Ti(e,t,n){return n((function(){Pi(t)&&Oi(e)}))}function Pi(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!sr(e,n)}catch(r){return!0}}function Oi(e){var t=Ma(e,1);null!==t&&nc(t,e,1,-1)}function Ni(e){var t=bi();return"function"===typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xi,lastRenderedState:e},t.queue=e,e=e.dispatch=Gi.bind(null,si,e),[t.memoizedState,e]}function Ri(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=si.updateQueue)?(t={lastEffect:null,stores:null},si.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function _i(){return yi().memoizedState}function Ai(e,t,n,r){var o=bi();si.flags|=e,o.memoizedState=Ri(1|t,n,void 0,void 0===r?null:r)}function zi(e,t,n,r){var o=yi();r=void 0===r?null:r;var a=void 0;if(null!==li){var i=li.memoizedState;if(a=i.destroy,null!==r&&hi(r,i.deps))return void(o.memoizedState=Ri(t,n,a,r))}si.flags|=e,o.memoizedState=Ri(1|t,n,a,r)}function Mi(e,t){return Ai(8390656,8,e,t)}function Ii(e,t){return zi(2048,8,e,t)}function $i(e,t){return zi(4,2,e,t)}function Fi(e,t){return zi(4,4,e,t)}function Di(e,t){return"function"===typeof t?(e=e(),t(e),function(){t(null)}):null!==t&&void 0!==t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Li(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,zi(4,4,Di.bind(null,t,e),n)}function Bi(){}function Ui(e,t){var n=yi();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&hi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Wi(e,t){var n=yi();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&hi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Hi(e,t,n){return 0===(21&ii)?(e.baseState&&(e.baseState=!1,ys=!0),e.memoizedState=n):(sr(n,t)||(n=ht(),si.lanes|=n,Il|=n,e.baseState=!0),t)}function Vi(e,t){var n=yt;yt=0!==n&&4>n?n:4,e(!0);var r=ai.transition;ai.transition={};try{e(!1),t()}finally{yt=n,ai.transition=r}}function qi(){return yi().memoizedState}function Ki(e,t,n){var r=tc(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Qi(e))Yi(t,n);else if(null!==(n=za(e,t,n,r))){nc(n,e,r,ec()),Xi(n,t,r)}}function Gi(e,t,n){var r=tc(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qi(e))Yi(t,o);else{var a=e.alternate;if(0===e.lanes&&(null===a||0===a.lanes)&&null!==(a=t.lastRenderedReducer))try{var i=t.lastRenderedState,s=a(i,n);if(o.hasEagerState=!0,o.eagerState=s,sr(s,i)){var l=t.interleaved;return null===l?(o.next=o,Aa(t)):(o.next=l.next,l.next=o),void(t.interleaved=o)}}catch(c){}null!==(n=za(e,t,o,r))&&(nc(n,e,r,o=ec()),Xi(n,t,r))}}function Qi(e){var t=e.alternate;return e===si||null!==t&&t===si}function Yi(e,t){di=ui=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Xi(e,t,n){if(0!==(4194240&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,bt(e,n)}}var Ji={readContext:Ra,useCallback:mi,useContext:mi,useEffect:mi,useImperativeHandle:mi,useInsertionEffect:mi,useLayoutEffect:mi,useMemo:mi,useReducer:mi,useRef:mi,useState:mi,useDebugValue:mi,useDeferredValue:mi,useTransition:mi,useMutableSource:mi,useSyncExternalStore:mi,useId:mi,unstable_isNewReconciler:!1},Zi={readContext:Ra,useCallback:function(e,t){return bi().memoizedState=[e,void 0===t?null:t],e},useContext:Ra,useEffect:Mi,useImperativeHandle:function(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Ai(4194308,4,Di.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ai(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ai(4,2,e,t)},useMemo:function(e,t){var n=bi();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=bi();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ki.bind(null,si,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},bi().memoizedState=e},useState:Ni,useDebugValue:Bi,useDeferredValue:function(e){return bi().memoizedState=e},useTransition:function(){var e=Ni(!1),t=e[0];return e=Vi.bind(null,e[1]),bi().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=si,o=bi();if(aa){if(void 0===n)throw Error(a(407));n=n()}else{if(n=t(),null===Ol)throw Error(a(349));0!==(30&ii)||Ci(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Mi(Ti.bind(null,r,i,e),[e]),r.flags|=2048,Ri(9,Ei.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=bi(),t=Ol.identifierPrefix;if(aa){var n=Jo;t=":"+t+"R"+(n=(Xo&~(1<<32-it(Xo)-1)).toString(32)+n),0<(n=pi++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=fi++).toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},es={readContext:Ra,useCallback:Ui,useContext:Ra,useEffect:Ii,useImperativeHandle:Li,useInsertionEffect:$i,useLayoutEffect:Fi,useMemo:Wi,useReducer:wi,useRef:_i,useState:function(){return wi(xi)},useDebugValue:Bi,useDeferredValue:function(e){return Hi(yi(),li.memoizedState,e)},useTransition:function(){return[wi(xi)[0],yi().memoizedState]},useMutableSource:ki,useSyncExternalStore:ji,useId:qi,unstable_isNewReconciler:!1},ts={readContext:Ra,useCallback:Ui,useContext:Ra,useEffect:Ii,useImperativeHandle:Li,useInsertionEffect:$i,useLayoutEffect:Fi,useMemo:Wi,useReducer:Si,useRef:_i,useState:function(){return Si(xi)},useDebugValue:Bi,useDeferredValue:function(e){var t=yi();return null===li?t.memoizedState=e:Hi(t,li.memoizedState,e)},useTransition:function(){return[Si(xi)[0],yi().memoizedState]},useMutableSource:ki,useSyncExternalStore:ji,useId:qi,unstable_isNewReconciler:!1};function ns(e,t){if(e&&e.defaultProps){for(var n in t=$({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}function rs(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:$({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var os={isMounted:function(e){return!!(e=e._reactInternals)&&Ue(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ec(),o=tc(e),a=Da(r,o);a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=La(e,a,o))&&(nc(t,e,o,r),Ba(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ec(),o=tc(e),a=Da(r,o);a.tag=1,a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=La(e,a,o))&&(nc(t,e,o,r),Ba(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ec(),r=tc(e),o=Da(n,r);o.tag=2,void 0!==t&&null!==t&&(o.callback=t),null!==(t=La(e,o,r))&&(nc(t,e,r,n),Ba(t,e,r))}};function as(e,t,n,r,o,a,i){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,a,i):!t.prototype||!t.prototype.isPureReactComponent||(!lr(n,r)||!lr(o,a))}function is(e,t,n){var r=!1,o=Po,a=t.contextType;return"object"===typeof a&&null!==a?a=Ra(a):(o=Ao(t)?Ro:Oo.current,a=(r=null!==(r=t.contextTypes)&&void 0!==r)?_o(e,o):Po),t=new t(n,a),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=os,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),t}function ss(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&os.enqueueReplaceState(t,t.state,null)}function ls(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},$a(e);var a=t.contextType;"object"===typeof a&&null!==a?o.context=Ra(a):(a=Ao(t)?Ro:Oo.current,o.context=_o(e,a)),o.state=e.memoizedState,"function"===typeof(a=t.getDerivedStateFromProps)&&(rs(e,t,a,n),o.state=e.memoizedState),"function"===typeof t.getDerivedStateFromProps||"function"===typeof o.getSnapshotBeforeUpdate||"function"!==typeof o.UNSAFE_componentWillMount&&"function"!==typeof o.componentWillMount||(t=o.state,"function"===typeof o.componentWillMount&&o.componentWillMount(),"function"===typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount(),t!==o.state&&os.enqueueReplaceState(o,o.state,null),Wa(e,n,o,r),o.state=e.memoizedState),"function"===typeof o.componentDidMount&&(e.flags|=4194308)}function cs(e,t){try{var n="",r=t;do{n+=B(r),r=r.return}while(r);var o=n}catch(a){o="\nError generating stack: "+a.message+"\n"+a.stack}return{value:e,source:t,stack:o,digest:null}}function us(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function ds(e,t){try{console.error(t.value)}catch(n){setTimeout((function(){throw n}))}}var ps="function"===typeof WeakMap?WeakMap:Map;function fs(e,t,n){(n=Da(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Hl||(Hl=!0,Vl=r),ds(0,t)},n}function ms(e,t,n){(n=Da(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"===typeof r){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){ds(0,t)}}var a=e.stateNode;return null!==a&&"function"===typeof a.componentDidCatch&&(n.callback=function(){ds(0,t),"function"!==typeof r&&(null===ql?ql=new Set([this]):ql.add(this));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function hs(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new ps;var o=new Set;r.set(t,o)}else void 0===(o=r.get(t))&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Cc.bind(null,e,t,n),t.then(e,e))}function gs(e){do{var t;if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e;e=e.return}while(null!==e);return null}function vs(e,t,n,r,o){return 0===(1&e.mode)?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=Da(-1,1)).tag=2,La(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var bs=x.ReactCurrentOwner,ys=!1;function xs(e,t,n,r){t.child=null===e?Sa(t,null,n,r):wa(t,e.child,n,r)}function ws(e,t,n,r,o){n=n.render;var a=t.ref;return Na(t,o),r=gi(e,t,n,r,a,o),n=vi(),null===e||ys?(aa&&n&&ta(t),t.flags|=1,xs(e,t,r,o),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Hs(e,t,o))}function Ss(e,t,n,r,o){if(null===e){var a=n.type;return"function"!==typeof a||_c(a)||void 0!==a.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=zc(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=a,ks(e,t,a,r,o))}if(a=e.child,0===(e.lanes&o)){var i=a.memoizedProps;if((n=null!==(n=n.compare)?n:lr)(i,r)&&e.ref===t.ref)return Hs(e,t,o)}return t.flags|=1,(e=Ac(a,r)).ref=t.ref,e.return=t,t.child=e}function ks(e,t,n,r,o){if(null!==e){var a=e.memoizedProps;if(lr(a,r)&&e.ref===t.ref){if(ys=!1,t.pendingProps=r=a,0===(e.lanes&o))return t.lanes=e.lanes,Hs(e,t,o);0!==(131072&e.flags)&&(ys=!0)}}return Es(e,t,n,r,o)}function js(e,t,n){var r=t.pendingProps,o=r.children,a=null!==e?e.memoizedState:null;if("hidden"===r.mode)if(0===(1&t.mode))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},To(Al,_l),_l|=n;else{if(0===(1073741824&n))return e=null!==a?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,To(Al,_l),_l|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==a?a.baseLanes:n,To(Al,_l),_l|=r}else null!==a?(r=a.baseLanes|n,t.memoizedState=null):r=n,To(Al,_l),_l|=r;return xs(e,t,o,n),t.child}function Cs(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Es(e,t,n,r,o){var a=Ao(n)?Ro:Oo.current;return a=_o(t,a),Na(t,o),n=gi(e,t,n,r,a,o),r=vi(),null===e||ys?(aa&&r&&ta(t),t.flags|=1,xs(e,t,n,o),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Hs(e,t,o))}function Ts(e,t,n,r,o){if(Ao(n)){var a=!0;$o(t)}else a=!1;if(Na(t,o),null===t.stateNode)Ws(e,t),is(t,n,r),ls(t,n,r,o),r=!0;else if(null===e){var i=t.stateNode,s=t.memoizedProps;i.props=s;var l=i.context,c=n.contextType;"object"===typeof c&&null!==c?c=Ra(c):c=_o(t,c=Ao(n)?Ro:Oo.current);var u=n.getDerivedStateFromProps,d="function"===typeof u||"function"===typeof i.getSnapshotBeforeUpdate;d||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(s!==r||l!==c)&&ss(t,i,r,c),Ia=!1;var p=t.memoizedState;i.state=p,Wa(t,r,i,o),l=t.memoizedState,s!==r||p!==l||No.current||Ia?("function"===typeof u&&(rs(t,n,u,r),l=t.memoizedState),(s=Ia||as(t,n,s,r,p,l,c))?(d||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),i.props=r,i.state=l,i.context=c,r=s):("function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,Fa(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:ns(t.type,s),i.props=c,d=t.pendingProps,p=i.context,"object"===typeof(l=n.contextType)&&null!==l?l=Ra(l):l=_o(t,l=Ao(n)?Ro:Oo.current);var f=n.getDerivedStateFromProps;(u="function"===typeof f||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(s!==d||p!==l)&&ss(t,i,r,l),Ia=!1,p=t.memoizedState,i.state=p,Wa(t,r,i,o);var m=t.memoizedState;s!==d||p!==m||No.current||Ia?("function"===typeof f&&(rs(t,n,f,r),m=t.memoizedState),(c=Ia||as(t,n,c,r,p,m,l)||!1)?(u||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(r,m,l),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,m,l)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),i.props=r,i.state=m,i.context=l,r=c):("function"!==typeof i.componentDidUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return Ps(e,t,n,r,a,o)}function Ps(e,t,n,r,o,a){Cs(e,t);var i=0!==(128&t.flags);if(!r&&!i)return o&&Fo(t,n,!1),Hs(e,t,a);r=t.stateNode,bs.current=t;var s=i&&"function"!==typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&i?(t.child=wa(t,e.child,null,a),t.child=wa(t,null,s,a)):xs(e,t,s,a),t.memoizedState=r.state,o&&Fo(t,n,!0),t.child}function Os(e){var t=e.stateNode;t.pendingContext?Mo(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Mo(0,t.context,!1),Ya(e,t.containerInfo)}function Ns(e,t,n,r,o){return ma(),ha(o),t.flags|=256,xs(e,t,n,r),t.child}var Rs,_s,As,zs,Ms={dehydrated:null,treeContext:null,retryLane:0};function Is(e){return{baseLanes:e,cachePool:null,transitions:null}}function $s(e,t,n){var r,o=t.pendingProps,i=ei.current,s=!1,l=0!==(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&0!==(2&i)),r?(s=!0,t.flags&=-129):null!==e&&null===e.memoizedState||(i|=1),To(ei,1&i),null===e)return ua(t),null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)?(0===(1&t.mode)?t.lanes=1:"$!"===e.data?t.lanes=8:t.lanes=1073741824,null):(l=o.children,e=o.fallback,s?(o=t.mode,s=t.child,l={mode:"hidden",children:l},0===(1&o)&&null!==s?(s.childLanes=0,s.pendingProps=l):s=Ic(l,o,0,null),e=Mc(e,o,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Is(n),t.memoizedState=Ms,e):Fs(t,l));if(null!==(i=e.memoizedState)&&null!==(r=i.dehydrated))return function(e,t,n,r,o,i,s){if(n)return 256&t.flags?(t.flags&=-257,Ds(e,t,s,r=us(Error(a(422))))):null!==t.memoizedState?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=Ic({mode:"visible",children:r.children},o,0,null),(i=Mc(i,o,s,null)).flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,0!==(1&t.mode)&&wa(t,e.child,null,s),t.child.memoizedState=Is(s),t.memoizedState=Ms,i);if(0===(1&t.mode))return Ds(e,t,s,null);if("$!"===o.data){if(r=o.nextSibling&&o.nextSibling.dataset)var l=r.dgst;return r=l,Ds(e,t,s,r=us(i=Error(a(419)),r,void 0))}if(l=0!==(s&e.childLanes),ys||l){if(null!==(r=Ol)){switch(s&-s){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}0!==(o=0!==(o&(r.suspendedLanes|s))?0:o)&&o!==i.retryLane&&(i.retryLane=o,Ma(e,o),nc(r,e,o,-1))}return hc(),Ds(e,t,s,r=us(Error(a(421))))}return"$?"===o.data?(t.flags|=128,t.child=e.child,t=Tc.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,oa=co(o.nextSibling),ra=t,aa=!0,ia=null,null!==e&&(Go[Qo++]=Xo,Go[Qo++]=Jo,Go[Qo++]=Yo,Xo=e.id,Jo=e.overflow,Yo=t),t=Fs(t,r.children),t.flags|=4096,t)}(e,t,l,o,r,i,n);if(s){s=o.fallback,l=t.mode,r=(i=e.child).sibling;var c={mode:"hidden",children:o.children};return 0===(1&l)&&t.child!==i?((o=t.child).childLanes=0,o.pendingProps=c,t.deletions=null):(o=Ac(i,c)).subtreeFlags=14680064&i.subtreeFlags,null!==r?s=Ac(r,s):(s=Mc(s,l,n,null)).flags|=2,s.return=t,o.return=t,o.sibling=s,t.child=o,o=s,s=t.child,l=null===(l=e.child.memoizedState)?Is(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~n,t.memoizedState=Ms,o}return e=(s=e.child).sibling,o=Ac(s,{mode:"visible",children:o.children}),0===(1&t.mode)&&(o.lanes=n),o.return=t,o.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=o,t.memoizedState=null,o}function Fs(e,t){return(t=Ic({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function Ds(e,t,n,r){return null!==r&&ha(r),wa(t,e.child,null,n),(e=Fs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Ls(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),Oa(e.return,t,n)}function Bs(e,t,n,r,o){var a=e.memoizedState;null===a?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=o)}function Us(e,t,n){var r=t.pendingProps,o=r.revealOrder,a=r.tail;if(xs(e,t,r.children,n),0!==(2&(r=ei.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Ls(e,n,t);else if(19===e.tag)Ls(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(To(ei,r),0===(1&t.mode))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;null!==n;)null!==(e=n.alternate)&&null===ti(e)&&(o=n),n=n.sibling;null===(n=o)?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Bs(t,!1,o,n,a);break;case"backwards":for(n=null,o=t.child,t.child=null;null!==o;){if(null!==(e=o.alternate)&&null===ti(e)){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Bs(t,!0,n,null,a);break;case"together":Bs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ws(e,t){0===(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Hs(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Il|=t.lanes,0===(n&t.childLanes))return null;if(null!==e&&t.child!==e.child)throw Error(a(153));if(null!==t.child){for(n=Ac(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Ac(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Vs(e,t){if(!aa)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qs(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=14680064&o.subtreeFlags,r|=14680064&o.flags,o.return=e,o=o.sibling;else for(o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ks(e,t,n){var r=t.pendingProps;switch(na(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qs(t),null;case 1:case 17:return Ao(t.type)&&zo(),qs(t),null;case 3:return r=t.stateNode,Xa(),Eo(No),Eo(Oo),ri(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(pa(t)?t.flags|=4:null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,null!==ia&&(ic(ia),ia=null))),_s(e,t),qs(t),null;case 5:Za(t);var o=Qa(Ga.current);if(n=t.type,null!==e&&null!=t.stateNode)As(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(null===t.stateNode)throw Error(a(166));return qs(t),null}if(e=Qa(qa.current),pa(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[fo]=t,r[mo]=i,e=0!==(1&t.mode),n){case"dialog":Dr("cancel",r),Dr("close",r);break;case"iframe":case"object":case"embed":Dr("load",r);break;case"video":case"audio":for(o=0;o<Mr.length;o++)Dr(Mr[o],r);break;case"source":Dr("error",r);break;case"img":case"image":case"link":Dr("error",r),Dr("load",r);break;case"details":Dr("toggle",r);break;case"input":Y(r,i),Dr("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Dr("invalid",r);break;case"textarea":oe(r,i),Dr("invalid",r)}for(var l in be(n,i),o=null,i)if(i.hasOwnProperty(l)){var c=i[l];"children"===l?"string"===typeof c?r.textContent!==c&&(!0!==i.suppressHydrationWarning&&Jr(r.textContent,c,e),o=["children",c]):"number"===typeof c&&r.textContent!==""+c&&(!0!==i.suppressHydrationWarning&&Jr(r.textContent,c,e),o=["children",""+c]):s.hasOwnProperty(l)&&null!=c&&"onScroll"===l&&Dr("scroll",r)}switch(n){case"input":q(r),Z(r,i,!0);break;case"textarea":q(r),ie(r);break;case"select":case"option":break;default:"function"===typeof i.onClick&&(r.onclick=Zr)}r=o,t.updateQueue=r,null!==r&&(t.flags|=4)}else{l=9===o.nodeType?o:o.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=se(n)),"http://www.w3.org/1999/xhtml"===e?"script"===n?((e=l.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"===typeof r.is?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),"select"===n&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[fo]=t,e[mo]=r,Rs(e,t,!1,!1),t.stateNode=e;e:{switch(l=ye(n,r),n){case"dialog":Dr("cancel",e),Dr("close",e),o=r;break;case"iframe":case"object":case"embed":Dr("load",e),o=r;break;case"video":case"audio":for(o=0;o<Mr.length;o++)Dr(Mr[o],e);o=r;break;case"source":Dr("error",e),o=r;break;case"img":case"image":case"link":Dr("error",e),Dr("load",e),o=r;break;case"details":Dr("toggle",e),o=r;break;case"input":Y(e,r),o=Q(e,r),Dr("invalid",e);break;case"option":default:o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=$({},r,{value:void 0}),Dr("invalid",e);break;case"textarea":oe(e,r),o=re(e,r),Dr("invalid",e)}for(i in be(n,o),c=o)if(c.hasOwnProperty(i)){var u=c[i];"style"===i?ge(e,u):"dangerouslySetInnerHTML"===i?null!=(u=u?u.__html:void 0)&&de(e,u):"children"===i?"string"===typeof u?("textarea"!==n||""!==u)&&pe(e,u):"number"===typeof u&&pe(e,""+u):"suppressContentEditableWarning"!==i&&"suppressHydrationWarning"!==i&&"autoFocus"!==i&&(s.hasOwnProperty(i)?null!=u&&"onScroll"===i&&Dr("scroll",e):null!=u&&y(e,i,u,l))}switch(n){case"input":q(e),Z(e,r,!1);break;case"textarea":q(e),ie(e);break;case"option":null!=r.value&&e.setAttribute("value",""+H(r.value));break;case"select":e.multiple=!!r.multiple,null!=(i=r.value)?ne(e,!!r.multiple,i,!1):null!=r.defaultValue&&ne(e,!!r.multiple,r.defaultValue,!0);break;default:"function"===typeof o.onClick&&(e.onclick=Zr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return qs(t),null;case 6:if(e&&null!=t.stateNode)zs(e,t,e.memoizedProps,r);else{if("string"!==typeof r&&null===t.stateNode)throw Error(a(166));if(n=Qa(Ga.current),Qa(qa.current),pa(t)){if(r=t.stateNode,n=t.memoizedProps,r[fo]=t,(i=r.nodeValue!==n)&&null!==(e=ra))switch(e.tag){case 3:Jr(r.nodeValue,n,0!==(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Jr(r.nodeValue,n,0!==(1&e.mode))}i&&(t.flags|=4)}else(r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[fo]=t,t.stateNode=r}return qs(t),null;case 13:if(Eo(ei),r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(aa&&null!==oa&&0!==(1&t.mode)&&0===(128&t.flags))fa(),ma(),t.flags|=98560,i=!1;else if(i=pa(t),null!==r&&null!==r.dehydrated){if(null===e){if(!i)throw Error(a(318));if(!(i=null!==(i=t.memoizedState)?i.dehydrated:null))throw Error(a(317));i[fo]=t}else ma(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;qs(t),i=!1}else null!==ia&&(ic(ia),ia=null),i=!0;if(!i)return 65536&t.flags?t:null}return 0!==(128&t.flags)?(t.lanes=n,t):((r=null!==r)!==(null!==e&&null!==e.memoizedState)&&r&&(t.child.flags|=8192,0!==(1&t.mode)&&(null===e||0!==(1&ei.current)?0===zl&&(zl=3):hc())),null!==t.updateQueue&&(t.flags|=4),qs(t),null);case 4:return Xa(),_s(e,t),null===e&&Ur(t.stateNode.containerInfo),qs(t),null;case 10:return Pa(t.type._context),qs(t),null;case 19:if(Eo(ei),null===(i=t.memoizedState))return qs(t),null;if(r=0!==(128&t.flags),null===(l=i.rendering))if(r)Vs(i,!1);else{if(0!==zl||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(l=ti(e))){for(t.flags|=128,Vs(i,!1),null!==(r=l.updateQueue)&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;null!==n;)e=r,(i=n).flags&=14680066,null===(l=i.alternate)?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return To(ei,1&ei.current|2),t.child}e=e.sibling}null!==i.tail&&Xe()>Ul&&(t.flags|=128,r=!0,Vs(i,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=ti(l))){if(t.flags|=128,r=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),Vs(i,!0),null===i.tail&&"hidden"===i.tailMode&&!l.alternate&&!aa)return qs(t),null}else 2*Xe()-i.renderingStartTime>Ul&&1073741824!==n&&(t.flags|=128,r=!0,Vs(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(null!==(n=i.last)?n.sibling=l:t.child=l,i.last=l)}return null!==i.tail?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Xe(),t.sibling=null,n=ei.current,To(ei,r?1&n|2:1&n),t):(qs(t),null);case 22:case 23:return dc(),r=null!==t.memoizedState,null!==e&&null!==e.memoizedState!==r&&(t.flags|=8192),r&&0!==(1&t.mode)?0!==(1073741824&_l)&&(qs(t),6&t.subtreeFlags&&(t.flags|=8192)):qs(t),null;case 24:case 25:return null}throw Error(a(156,t.tag))}function Gs(e,t){switch(na(t),t.tag){case 1:return Ao(t.type)&&zo(),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Xa(),Eo(No),Eo(Oo),ri(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 5:return Za(t),null;case 13:if(Eo(ei),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(a(340));ma()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return Eo(ei),null;case 4:return Xa(),null;case 10:return Pa(t.type._context),null;case 22:case 23:return dc(),null;default:return null}}Rs=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},_s=function(){},As=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Qa(qa.current);var a,i=null;switch(n){case"input":o=Q(e,o),r=Q(e,r),i=[];break;case"select":o=$({},o,{value:void 0}),r=$({},r,{value:void 0}),i=[];break;case"textarea":o=re(e,o),r=re(e,r),i=[];break;default:"function"!==typeof o.onClick&&"function"===typeof r.onClick&&(e.onclick=Zr)}for(u in be(n,r),n=null,o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&null!=o[u])if("style"===u){var l=o[u];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else"dangerouslySetInnerHTML"!==u&&"children"!==u&&"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&"autoFocus"!==u&&(s.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var c=r[u];if(l=null!=o?o[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(null!=c||null!=l))if("style"===u)if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(i||(i=[]),i.push(u,n)),n=c;else"dangerouslySetInnerHTML"===u?(c=c?c.__html:void 0,l=l?l.__html:void 0,null!=c&&l!==c&&(i=i||[]).push(u,c)):"children"===u?"string"!==typeof c&&"number"!==typeof c||(i=i||[]).push(u,""+c):"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&(s.hasOwnProperty(u)?(null!=c&&"onScroll"===u&&Dr("scroll",e),i||l===c||(i=[])):(i=i||[]).push(u,c))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}},zs=function(e,t,n,r){n!==r&&(t.flags|=4)};var Qs=!1,Ys=!1,Xs="function"===typeof WeakSet?WeakSet:Set,Js=null;function Zs(e,t){var n=e.ref;if(null!==n)if("function"===typeof n)try{n(null)}catch(r){jc(e,t,r)}else n.current=null}function el(e,t,n){try{n()}catch(r){jc(e,t,r)}}var tl=!1;function nl(e,t,n){var r=t.updateQueue;if(null!==(r=null!==r?r.lastEffect:null)){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,void 0!==a&&el(t,n,a)}o=o.next}while(o!==r)}}function rl(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ol(e){var t=e.ref;if(null!==t){var n=e.stateNode;e.tag,e=n,"function"===typeof t?t(e):t.current=e}}function al(e){var t=e.alternate;null!==t&&(e.alternate=null,al(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&(delete t[fo],delete t[mo],delete t[go],delete t[vo],delete t[bo])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function il(e){return 5===e.tag||3===e.tag||4===e.tag}function sl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||il(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ll(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Zr));else if(4!==r&&null!==(e=e.child))for(ll(e,t,n),e=e.sibling;null!==e;)ll(e,t,n),e=e.sibling}function cl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(cl(e,t,n),e=e.sibling;null!==e;)cl(e,t,n),e=e.sibling}var ul=null,dl=!1;function pl(e,t,n){for(n=n.child;null!==n;)fl(e,t,n),n=n.sibling}function fl(e,t,n){if(at&&"function"===typeof at.onCommitFiberUnmount)try{at.onCommitFiberUnmount(ot,n)}catch(s){}switch(n.tag){case 5:Ys||Zs(n,t);case 6:var r=ul,o=dl;ul=null,pl(e,t,n),dl=o,null!==(ul=r)&&(dl?(e=ul,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):ul.removeChild(n.stateNode));break;case 18:null!==ul&&(dl?(e=ul,n=n.stateNode,8===e.nodeType?lo(e.parentNode,n):1===e.nodeType&&lo(e,n),Ut(e)):lo(ul,n.stateNode));break;case 4:r=ul,o=dl,ul=n.stateNode.containerInfo,dl=!0,pl(e,t,n),ul=r,dl=o;break;case 0:case 11:case 14:case 15:if(!Ys&&(null!==(r=n.updateQueue)&&null!==(r=r.lastEffect))){o=r=r.next;do{var a=o,i=a.destroy;a=a.tag,void 0!==i&&(0!==(2&a)||0!==(4&a))&&el(n,t,i),o=o.next}while(o!==r)}pl(e,t,n);break;case 1:if(!Ys&&(Zs(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){jc(n,t,s)}pl(e,t,n);break;case 21:pl(e,t,n);break;case 22:1&n.mode?(Ys=(r=Ys)||null!==n.memoizedState,pl(e,t,n),Ys=r):pl(e,t,n);break;default:pl(e,t,n)}}function ml(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Xs),t.forEach((function(t){var r=Pc.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function hl(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 5:ul=l.stateNode,dl=!1;break e;case 3:case 4:ul=l.stateNode.containerInfo,dl=!0;break e}l=l.return}if(null===ul)throw Error(a(160));fl(i,s,o),ul=null,dl=!1;var c=o.alternate;null!==c&&(c.return=null),o.return=null}catch(u){jc(o,t,u)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)gl(t,e),t=t.sibling}function gl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(hl(t,e),vl(e),4&r){try{nl(3,e,e.return),rl(3,e)}catch(g){jc(e,e.return,g)}try{nl(5,e,e.return)}catch(g){jc(e,e.return,g)}}break;case 1:hl(t,e),vl(e),512&r&&null!==n&&Zs(n,n.return);break;case 5:if(hl(t,e),vl(e),512&r&&null!==n&&Zs(n,n.return),32&e.flags){var o=e.stateNode;try{pe(o,"")}catch(g){jc(e,e.return,g)}}if(4&r&&null!=(o=e.stateNode)){var i=e.memoizedProps,s=null!==n?n.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,null!==c)try{"input"===l&&"radio"===i.type&&null!=i.name&&X(o,i),ye(l,s);var u=ye(l,i);for(s=0;s<c.length;s+=2){var d=c[s],p=c[s+1];"style"===d?ge(o,p):"dangerouslySetInnerHTML"===d?de(o,p):"children"===d?pe(o,p):y(o,d,p,u)}switch(l){case"input":J(o,i);break;case"textarea":ae(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var m=i.value;null!=m?ne(o,!!i.multiple,m,!1):f!==!!i.multiple&&(null!=i.defaultValue?ne(o,!!i.multiple,i.defaultValue,!0):ne(o,!!i.multiple,i.multiple?[]:"",!1))}o[mo]=i}catch(g){jc(e,e.return,g)}}break;case 6:if(hl(t,e),vl(e),4&r){if(null===e.stateNode)throw Error(a(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(g){jc(e,e.return,g)}}break;case 3:if(hl(t,e),vl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Ut(t.containerInfo)}catch(g){jc(e,e.return,g)}break;case 4:default:hl(t,e),vl(e);break;case 13:hl(t,e),vl(e),8192&(o=e.child).flags&&(i=null!==o.memoizedState,o.stateNode.isHidden=i,!i||null!==o.alternate&&null!==o.alternate.memoizedState||(Bl=Xe())),4&r&&ml(e);break;case 22:if(d=null!==n&&null!==n.memoizedState,1&e.mode?(Ys=(u=Ys)||d,hl(t,e),Ys=u):hl(t,e),vl(e),8192&r){if(u=null!==e.memoizedState,(e.stateNode.isHidden=u)&&!d&&0!==(1&e.mode))for(Js=e,d=e.child;null!==d;){for(p=Js=d;null!==Js;){switch(m=(f=Js).child,f.tag){case 0:case 11:case 14:case 15:nl(4,f,f.return);break;case 1:Zs(f,f.return);var h=f.stateNode;if("function"===typeof h.componentWillUnmount){r=f,n=f.return;try{t=r,h.props=t.memoizedProps,h.state=t.memoizedState,h.componentWillUnmount()}catch(g){jc(r,n,g)}}break;case 5:Zs(f,f.return);break;case 22:if(null!==f.memoizedState){wl(p);continue}}null!==m?(m.return=f,Js=m):wl(p)}d=d.sibling}e:for(d=null,p=e;;){if(5===p.tag){if(null===d){d=p;try{o=p.stateNode,u?"function"===typeof(i=o.style).setProperty?i.setProperty("display","none","important"):i.display="none":(l=p.stateNode,s=void 0!==(c=p.memoizedProps.style)&&null!==c&&c.hasOwnProperty("display")?c.display:null,l.style.display=he("display",s))}catch(g){jc(e,e.return,g)}}}else if(6===p.tag){if(null===d)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(g){jc(e,e.return,g)}}else if((22!==p.tag&&23!==p.tag||null===p.memoizedState||p===e)&&null!==p.child){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;null===p.sibling;){if(null===p.return||p.return===e)break e;d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:hl(t,e),vl(e),4&r&&ml(e);case 21:}}function vl(e){var t=e.flags;if(2&t){try{e:{for(var n=e.return;null!==n;){if(il(n)){var r=n;break e}n=n.return}throw Error(a(160))}switch(r.tag){case 5:var o=r.stateNode;32&r.flags&&(pe(o,""),r.flags&=-33),cl(e,sl(e),o);break;case 3:case 4:var i=r.stateNode.containerInfo;ll(e,sl(e),i);break;default:throw Error(a(161))}}catch(s){jc(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function bl(e,t,n){Js=e,yl(e,t,n)}function yl(e,t,n){for(var r=0!==(1&e.mode);null!==Js;){var o=Js,a=o.child;if(22===o.tag&&r){var i=null!==o.memoizedState||Qs;if(!i){var s=o.alternate,l=null!==s&&null!==s.memoizedState||Ys;s=Qs;var c=Ys;if(Qs=i,(Ys=l)&&!c)for(Js=o;null!==Js;)l=(i=Js).child,22===i.tag&&null!==i.memoizedState?Sl(o):null!==l?(l.return=i,Js=l):Sl(o);for(;null!==a;)Js=a,yl(a,t,n),a=a.sibling;Js=o,Qs=s,Ys=c}xl(e)}else 0!==(8772&o.subtreeFlags)&&null!==a?(a.return=o,Js=a):xl(e)}}function xl(e){for(;null!==Js;){var t=Js;if(0!==(8772&t.flags)){var n=t.alternate;try{if(0!==(8772&t.flags))switch(t.tag){case 0:case 11:case 15:Ys||rl(5,t);break;case 1:var r=t.stateNode;if(4&t.flags&&!Ys)if(null===n)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:ns(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;null!==i&&Ha(t,i,r);break;case 3:var s=t.updateQueue;if(null!==s){if(n=null,null!==t.child)switch(t.child.tag){case 5:case 1:n=t.child.stateNode}Ha(t,s,n)}break;case 5:var l=t.stateNode;if(null===n&&4&t.flags){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===t.memoizedState){var u=t.alternate;if(null!==u){var d=u.memoizedState;if(null!==d){var p=d.dehydrated;null!==p&&Ut(p)}}}break;default:throw Error(a(163))}Ys||512&t.flags&&ol(t)}catch(f){jc(t,t.return,f)}}if(t===e){Js=null;break}if(null!==(n=t.sibling)){n.return=t.return,Js=n;break}Js=t.return}}function wl(e){for(;null!==Js;){var t=Js;if(t===e){Js=null;break}var n=t.sibling;if(null!==n){n.return=t.return,Js=n;break}Js=t.return}}function Sl(e){for(;null!==Js;){var t=Js;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{rl(4,t)}catch(l){jc(t,n,l)}break;case 1:var r=t.stateNode;if("function"===typeof r.componentDidMount){var o=t.return;try{r.componentDidMount()}catch(l){jc(t,o,l)}}var a=t.return;try{ol(t)}catch(l){jc(t,a,l)}break;case 5:var i=t.return;try{ol(t)}catch(l){jc(t,i,l)}}}catch(l){jc(t,t.return,l)}if(t===e){Js=null;break}var s=t.sibling;if(null!==s){s.return=t.return,Js=s;break}Js=t.return}}var kl,jl=Math.ceil,Cl=x.ReactCurrentDispatcher,El=x.ReactCurrentOwner,Tl=x.ReactCurrentBatchConfig,Pl=0,Ol=null,Nl=null,Rl=0,_l=0,Al=Co(0),zl=0,Ml=null,Il=0,$l=0,Fl=0,Dl=null,Ll=null,Bl=0,Ul=1/0,Wl=null,Hl=!1,Vl=null,ql=null,Kl=!1,Gl=null,Ql=0,Yl=0,Xl=null,Jl=-1,Zl=0;function ec(){return 0!==(6&Pl)?Xe():-1!==Jl?Jl:Jl=Xe()}function tc(e){return 0===(1&e.mode)?1:0!==(2&Pl)&&0!==Rl?Rl&-Rl:null!==ga.transition?(0===Zl&&(Zl=ht()),Zl):0!==(e=yt)?e:e=void 0===(e=window.event)?16:Yt(e.type)}function nc(e,t,n,r){if(50<Yl)throw Yl=0,Xl=null,Error(a(185));vt(e,n,r),0!==(2&Pl)&&e===Ol||(e===Ol&&(0===(2&Pl)&&($l|=n),4===zl&&sc(e,Rl)),rc(e,r),1===n&&0===Pl&&0===(1&t.mode)&&(Ul=Xe()+500,Lo&&Wo()))}function rc(e,t){var n=e.callbackNode;!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var i=31-it(a),s=1<<i,l=o[i];-1===l?0!==(s&n)&&0===(s&r)||(o[i]=ft(s,t)):l<=t&&(e.expiredLanes|=s),a&=~s}}(e,t);var r=pt(e,e===Ol?Rl:0);if(0===r)null!==n&&Ge(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&Ge(n),1===t)0===e.tag?function(e){Lo=!0,Uo(e)}(lc.bind(null,e)):Uo(lc.bind(null,e)),io((function(){0===(6&Pl)&&Wo()})),n=null;else{switch(xt(r)){case 1:n=Ze;break;case 4:n=et;break;case 16:default:n=tt;break;case 536870912:n=rt}n=Oc(n,oc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function oc(e,t){if(Jl=-1,Zl=0,0!==(6&Pl))throw Error(a(327));var n=e.callbackNode;if(Sc()&&e.callbackNode!==n)return null;var r=pt(e,e===Ol?Rl:0);if(0===r)return null;if(0!==(30&r)||0!==(r&e.expiredLanes)||t)t=gc(e,r);else{t=r;var o=Pl;Pl|=2;var i=mc();for(Ol===e&&Rl===t||(Wl=null,Ul=Xe()+500,pc(e,t));;)try{bc();break}catch(l){fc(e,l)}Ta(),Cl.current=i,Pl=o,null!==Nl?t=0:(Ol=null,Rl=0,t=zl)}if(0!==t){if(2===t&&(0!==(o=mt(e))&&(r=o,t=ac(e,o))),1===t)throw n=Ml,pc(e,0),sc(e,r),rc(e,Xe()),n;if(6===t)sc(e,r);else{if(o=e.current.alternate,0===(30&r)&&!function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var o=n[r],a=o.getSnapshot;o=o.value;try{if(!sr(a(),o))return!1}catch(s){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(o)&&(2===(t=gc(e,r))&&(0!==(i=mt(e))&&(r=i,t=ac(e,i))),1===t))throw n=Ml,pc(e,0),sc(e,r),rc(e,Xe()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(a(345));case 2:case 5:wc(e,Ll,Wl);break;case 3:if(sc(e,r),(130023424&r)===r&&10<(t=Bl+500-Xe())){if(0!==pt(e,0))break;if(((o=e.suspendedLanes)&r)!==r){ec(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ro(wc.bind(null,e,Ll,Wl),t);break}wc(e,Ll,Wl);break;case 4:if(sc(e,r),(4194240&r)===r)break;for(t=e.eventTimes,o=-1;0<r;){var s=31-it(r);i=1<<s,(s=t[s])>o&&(o=s),r&=~i}if(r=o,10<(r=(120>(r=Xe()-r)?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*jl(r/1960))-r)){e.timeoutHandle=ro(wc.bind(null,e,Ll,Wl),r);break}wc(e,Ll,Wl);break;default:throw Error(a(329))}}}return rc(e,Xe()),e.callbackNode===n?oc.bind(null,e):null}function ac(e,t){var n=Dl;return e.current.memoizedState.isDehydrated&&(pc(e,t).flags|=256),2!==(e=gc(e,t))&&(t=Ll,Ll=n,null!==t&&ic(t)),e}function ic(e){null===Ll?Ll=e:Ll.push.apply(Ll,e)}function sc(e,t){for(t&=~Fl,t&=~$l,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-it(t),r=1<<n;e[n]=-1,t&=~r}}function lc(e){if(0!==(6&Pl))throw Error(a(327));Sc();var t=pt(e,0);if(0===(1&t))return rc(e,Xe()),null;var n=gc(e,t);if(0!==e.tag&&2===n){var r=mt(e);0!==r&&(t=r,n=ac(e,r))}if(1===n)throw n=Ml,pc(e,0),sc(e,t),rc(e,Xe()),n;if(6===n)throw Error(a(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,wc(e,Ll,Wl),rc(e,Xe()),null}function cc(e,t){var n=Pl;Pl|=1;try{return e(t)}finally{0===(Pl=n)&&(Ul=Xe()+500,Lo&&Wo())}}function uc(e){null!==Gl&&0===Gl.tag&&0===(6&Pl)&&Sc();var t=Pl;Pl|=1;var n=Tl.transition,r=yt;try{if(Tl.transition=null,yt=1,e)return e()}finally{yt=r,Tl.transition=n,0===(6&(Pl=t))&&Wo()}}function dc(){_l=Al.current,Eo(Al)}function pc(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,oo(n)),null!==Nl)for(n=Nl.return;null!==n;){var r=n;switch(na(r),r.tag){case 1:null!==(r=r.type.childContextTypes)&&void 0!==r&&zo();break;case 3:Xa(),Eo(No),Eo(Oo),ri();break;case 5:Za(r);break;case 4:Xa();break;case 13:case 19:Eo(ei);break;case 10:Pa(r.type._context);break;case 22:case 23:dc()}n=n.return}if(Ol=e,Nl=e=Ac(e.current,null),Rl=_l=t,zl=0,Ml=null,Fl=$l=Il=0,Ll=Dl=null,null!==_a){for(t=0;t<_a.length;t++)if(null!==(r=(n=_a[t]).interleaved)){n.interleaved=null;var o=r.next,a=n.pending;if(null!==a){var i=a.next;a.next=o,r.next=i}n.pending=r}_a=null}return e}function fc(e,t){for(;;){var n=Nl;try{if(Ta(),oi.current=Ji,ui){for(var r=si.memoizedState;null!==r;){var o=r.queue;null!==o&&(o.pending=null),r=r.next}ui=!1}if(ii=0,ci=li=si=null,di=!1,pi=0,El.current=null,null===n||null===n.return){zl=1,Ml=t,Nl=null;break}e:{var i=e,s=n.return,l=n,c=t;if(t=Rl,l.flags|=32768,null!==c&&"object"===typeof c&&"function"===typeof c.then){var u=c,d=l,p=d.tag;if(0===(1&d.mode)&&(0===p||11===p||15===p)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=gs(s);if(null!==m){m.flags&=-257,vs(m,s,l,0,t),1&m.mode&&hs(i,u,t),c=u;var h=(t=m).updateQueue;if(null===h){var g=new Set;g.add(c),t.updateQueue=g}else h.add(c);break e}if(0===(1&t)){hs(i,u,t),hc();break e}c=Error(a(426))}else if(aa&&1&l.mode){var v=gs(s);if(null!==v){0===(65536&v.flags)&&(v.flags|=256),vs(v,s,l,0,t),ha(cs(c,l));break e}}i=c=cs(c,l),4!==zl&&(zl=2),null===Dl?Dl=[i]:Dl.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t,Ua(i,fs(0,c,t));break e;case 1:l=c;var b=i.type,y=i.stateNode;if(0===(128&i.flags)&&("function"===typeof b.getDerivedStateFromError||null!==y&&"function"===typeof y.componentDidCatch&&(null===ql||!ql.has(y)))){i.flags|=65536,t&=-t,i.lanes|=t,Ua(i,ms(i,l,t));break e}}i=i.return}while(null!==i)}xc(n)}catch(x){t=x,Nl===n&&null!==n&&(Nl=n=n.return);continue}break}}function mc(){var e=Cl.current;return Cl.current=Ji,null===e?Ji:e}function hc(){0!==zl&&3!==zl&&2!==zl||(zl=4),null===Ol||0===(268435455&Il)&&0===(268435455&$l)||sc(Ol,Rl)}function gc(e,t){var n=Pl;Pl|=2;var r=mc();for(Ol===e&&Rl===t||(Wl=null,pc(e,t));;)try{vc();break}catch(o){fc(e,o)}if(Ta(),Pl=n,Cl.current=r,null!==Nl)throw Error(a(261));return Ol=null,Rl=0,zl}function vc(){for(;null!==Nl;)yc(Nl)}function bc(){for(;null!==Nl&&!Qe();)yc(Nl)}function yc(e){var t=kl(e.alternate,e,_l);e.memoizedProps=e.pendingProps,null===t?xc(e):Nl=t,El.current=null}function xc(e){var t=e;do{var n=t.alternate;if(e=t.return,0===(32768&t.flags)){if(null!==(n=Ks(n,t,_l)))return void(Nl=n)}else{if(null!==(n=Gs(n,t)))return n.flags&=32767,void(Nl=n);if(null===e)return zl=6,void(Nl=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}if(null!==(t=t.sibling))return void(Nl=t);Nl=t=e}while(null!==t);0===zl&&(zl=5)}function wc(e,t,n){var r=yt,o=Tl.transition;try{Tl.transition=null,yt=1,function(e,t,n,r){do{Sc()}while(null!==Gl);if(0!==(6&Pl))throw Error(a(327));n=e.finishedWork;var o=e.finishedLanes;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(a(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-it(n),a=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~a}}(e,i),e===Ol&&(Nl=Ol=null,Rl=0),0===(2064&n.subtreeFlags)&&0===(2064&n.flags)||Kl||(Kl=!0,Oc(tt,(function(){return Sc(),null}))),i=0!==(15990&n.flags),0!==(15990&n.subtreeFlags)||i){i=Tl.transition,Tl.transition=null;var s=yt;yt=1;var l=Pl;Pl|=4,El.current=null,function(e,t){if(eo=Ht,fr(e=pr())){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch(w){n=null;break e}var s=0,l=-1,c=-1,u=0,d=0,p=e,f=null;t:for(;;){for(var m;p!==n||0!==o&&3!==p.nodeType||(l=s+o),p!==i||0!==r&&3!==p.nodeType||(c=s+r),3===p.nodeType&&(s+=p.nodeValue.length),null!==(m=p.firstChild);)f=p,p=m;for(;;){if(p===e)break t;if(f===n&&++u===o&&(l=s),f===i&&++d===r&&(c=s),null!==(m=p.nextSibling))break;f=(p=f).parentNode}p=m}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(to={focusedElem:e,selectionRange:n},Ht=!1,Js=t;null!==Js;)if(e=(t=Js).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Js=e;else for(;null!==Js;){t=Js;try{var h=t.alternate;if(0!==(1024&t.flags))switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==h){var g=h.memoizedProps,v=h.memoizedState,b=t.stateNode,y=b.getSnapshotBeforeUpdate(t.elementType===t.type?g:ns(t.type,g),v);b.__reactInternalSnapshotBeforeUpdate=y}break;case 3:var x=t.stateNode.containerInfo;1===x.nodeType?x.textContent="":9===x.nodeType&&x.documentElement&&x.removeChild(x.documentElement);break;default:throw Error(a(163))}}catch(w){jc(t,t.return,w)}if(null!==(e=t.sibling)){e.return=t.return,Js=e;break}Js=t.return}h=tl,tl=!1}(e,n),gl(n,e),mr(to),Ht=!!eo,to=eo=null,e.current=n,bl(n,e,o),Ye(),Pl=l,yt=s,Tl.transition=i}else e.current=n;if(Kl&&(Kl=!1,Gl=e,Ql=o),i=e.pendingLanes,0===i&&(ql=null),function(e){if(at&&"function"===typeof at.onCommitFiberRoot)try{at.onCommitFiberRoot(ot,e,void 0,128===(128&e.current.flags))}catch(t){}}(n.stateNode),rc(e,Xe()),null!==t)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Hl)throw Hl=!1,e=Vl,Vl=null,e;0!==(1&Ql)&&0!==e.tag&&Sc(),i=e.pendingLanes,0!==(1&i)?e===Xl?Yl++:(Yl=0,Xl=e):Yl=0,Wo()}(e,t,n,r)}finally{Tl.transition=o,yt=r}return null}function Sc(){if(null!==Gl){var e=xt(Ql),t=Tl.transition,n=yt;try{if(Tl.transition=null,yt=16>e?16:e,null===Gl)var r=!1;else{if(e=Gl,Gl=null,Ql=0,0!==(6&Pl))throw Error(a(331));var o=Pl;for(Pl|=4,Js=e.current;null!==Js;){var i=Js,s=i.child;if(0!==(16&Js.flags)){var l=i.deletions;if(null!==l){for(var c=0;c<l.length;c++){var u=l[c];for(Js=u;null!==Js;){var d=Js;switch(d.tag){case 0:case 11:case 15:nl(8,d,i)}var p=d.child;if(null!==p)p.return=d,Js=p;else for(;null!==Js;){var f=(d=Js).sibling,m=d.return;if(al(d),d===u){Js=null;break}if(null!==f){f.return=m,Js=f;break}Js=m}}}var h=i.alternate;if(null!==h){var g=h.child;if(null!==g){h.child=null;do{var v=g.sibling;g.sibling=null,g=v}while(null!==g)}}Js=i}}if(0!==(2064&i.subtreeFlags)&&null!==s)s.return=i,Js=s;else e:for(;null!==Js;){if(0!==(2048&(i=Js).flags))switch(i.tag){case 0:case 11:case 15:nl(9,i,i.return)}var b=i.sibling;if(null!==b){b.return=i.return,Js=b;break e}Js=i.return}}var y=e.current;for(Js=y;null!==Js;){var x=(s=Js).child;if(0!==(2064&s.subtreeFlags)&&null!==x)x.return=s,Js=x;else e:for(s=y;null!==Js;){if(0!==(2048&(l=Js).flags))try{switch(l.tag){case 0:case 11:case 15:rl(9,l)}}catch(S){jc(l,l.return,S)}if(l===s){Js=null;break e}var w=l.sibling;if(null!==w){w.return=l.return,Js=w;break e}Js=l.return}}if(Pl=o,Wo(),at&&"function"===typeof at.onPostCommitFiberRoot)try{at.onPostCommitFiberRoot(ot,e)}catch(S){}r=!0}return r}finally{yt=n,Tl.transition=t}}return!1}function kc(e,t,n){e=La(e,t=fs(0,t=cs(n,t),1),1),t=ec(),null!==e&&(vt(e,1,t),rc(e,t))}function jc(e,t,n){if(3===e.tag)kc(e,e,n);else for(;null!==t;){if(3===t.tag){kc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===ql||!ql.has(r))){t=La(t,e=ms(t,e=cs(n,e),1),1),e=ec(),null!==t&&(vt(t,1,e),rc(t,e));break}}t=t.return}}function Cc(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=ec(),e.pingedLanes|=e.suspendedLanes&n,Ol===e&&(Rl&n)===n&&(4===zl||3===zl&&(130023424&Rl)===Rl&&500>Xe()-Bl?pc(e,0):Fl|=n),rc(e,t)}function Ec(e,t){0===t&&(0===(1&e.mode)?t=1:(t=ut,0===(130023424&(ut<<=1))&&(ut=4194304)));var n=ec();null!==(e=Ma(e,t))&&(vt(e,t,n),rc(e,n))}function Tc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Ec(e,n)}function Pc(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;null!==o&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(a(314))}null!==r&&r.delete(t),Ec(e,n)}function Oc(e,t){return Ke(e,t)}function Nc(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rc(e,t,n,r){return new Nc(e,t,n,r)}function _c(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Ac(e,t){var n=e.alternate;return null===n?((n=Rc(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function zc(e,t,n,r,o,i){var s=2;if(r=e,"function"===typeof e)_c(e)&&(s=1);else if("string"===typeof e)s=5;else e:switch(e){case k:return Mc(n.children,o,i,t);case j:s=8,o|=8;break;case C:return(e=Rc(12,n,t,2|o)).elementType=C,e.lanes=i,e;case O:return(e=Rc(13,n,t,o)).elementType=O,e.lanes=i,e;case N:return(e=Rc(19,n,t,o)).elementType=N,e.lanes=i,e;case A:return Ic(n,o,i,t);default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case E:s=10;break e;case T:s=9;break e;case P:s=11;break e;case R:s=14;break e;case _:s=16,r=null;break e}throw Error(a(130,null==e?e:typeof e,""))}return(t=Rc(s,n,t,o)).elementType=e,t.type=r,t.lanes=i,t}function Mc(e,t,n,r){return(e=Rc(7,e,r,t)).lanes=n,e}function Ic(e,t,n,r){return(e=Rc(22,e,r,t)).elementType=A,e.lanes=n,e.stateNode={isHidden:!1},e}function $c(e,t,n){return(e=Rc(6,e,null,t)).lanes=n,e}function Fc(e,t,n){return(t=Rc(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Dc(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gt(0),this.expirationTimes=gt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Lc(e,t,n,r,o,a,i,s,l){return e=new Dc(e,t,n,s,l),1===t?(t=1,!0===a&&(t|=8)):t=0,a=Rc(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$a(a),e}function Bc(e){if(!e)return Po;e:{if(Ue(e=e._reactInternals)!==e||1!==e.tag)throw Error(a(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ao(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);throw Error(a(171))}if(1===e.tag){var n=e.type;if(Ao(n))return Io(e,n,t)}return t}function Uc(e,t,n,r,o,a,i,s,l){return(e=Lc(n,r,!0,e,0,a,0,s,l)).context=Bc(null),n=e.current,(a=Da(r=ec(),o=tc(n))).callback=void 0!==t&&null!==t?t:null,La(n,a,o),e.current.lanes=o,vt(e,o,r),rc(e,r),e}function Wc(e,t,n,r){var o=t.current,a=ec(),i=tc(o);return n=Bc(n),null===t.context?t.context=n:t.pendingContext=n,(t=Da(a,i)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=La(o,t,i))&&(nc(e,o,i,a),Ba(e,o,i)),i}function Hc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Vc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function qc(e,t){Vc(e,t),(e=e.alternate)&&Vc(e,t)}kl=function(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps||No.current)ys=!0;else{if(0===(e.lanes&n)&&0===(128&t.flags))return ys=!1,function(e,t,n){switch(t.tag){case 3:Os(t),ma();break;case 5:Ja(t);break;case 1:Ao(t.type)&&$o(t);break;case 4:Ya(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;To(ka,r._currentValue),r._currentValue=o;break;case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(To(ei,1&ei.current),t.flags|=128,null):0!==(n&t.child.childLanes)?$s(e,t,n):(To(ei,1&ei.current),null!==(e=Hs(e,t,n))?e.sibling:null);To(ei,1&ei.current);break;case 19:if(r=0!==(n&t.childLanes),0!==(128&e.flags)){if(r)return Us(e,t,n);t.flags|=128}if(null!==(o=t.memoizedState)&&(o.rendering=null,o.tail=null,o.lastEffect=null),To(ei,ei.current),r)break;return null;case 22:case 23:return t.lanes=0,js(e,t,n)}return Hs(e,t,n)}(e,t,n);ys=0!==(131072&e.flags)}else ys=!1,aa&&0!==(1048576&t.flags)&&ea(t,Ko,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ws(e,t),e=t.pendingProps;var o=_o(t,Oo.current);Na(t,n),o=gi(null,t,r,e,o,n);var i=vi();return t.flags|=1,"object"===typeof o&&null!==o&&"function"===typeof o.render&&void 0===o.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ao(r)?(i=!0,$o(t)):i=!1,t.memoizedState=null!==o.state&&void 0!==o.state?o.state:null,$a(t),o.updater=os,t.stateNode=o,o._reactInternals=t,ls(t,r,e,n),t=Ps(null,t,r,!0,i,n)):(t.tag=0,aa&&i&&ta(t),xs(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ws(e,t),e=t.pendingProps,r=(o=r._init)(r._payload),t.type=r,o=t.tag=function(e){if("function"===typeof e)return _c(e)?1:0;if(void 0!==e&&null!==e){if((e=e.$$typeof)===P)return 11;if(e===R)return 14}return 2}(r),e=ns(r,e),o){case 0:t=Es(null,t,r,e,n);break e;case 1:t=Ts(null,t,r,e,n);break e;case 11:t=ws(null,t,r,e,n);break e;case 14:t=Ss(null,t,r,ns(r.type,e),n);break e}throw Error(a(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,Es(e,t,r,o=t.elementType===r?o:ns(r,o),n);case 1:return r=t.type,o=t.pendingProps,Ts(e,t,r,o=t.elementType===r?o:ns(r,o),n);case 3:e:{if(Os(t),null===e)throw Error(a(387));r=t.pendingProps,o=(i=t.memoizedState).element,Fa(e,t),Wa(t,r,null,n);var s=t.memoizedState;if(r=s.element,i.isDehydrated){if(i={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=Ns(e,t,r,n,o=cs(Error(a(423)),t));break e}if(r!==o){t=Ns(e,t,r,n,o=cs(Error(a(424)),t));break e}for(oa=co(t.stateNode.containerInfo.firstChild),ra=t,aa=!0,ia=null,n=Sa(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(ma(),r===o){t=Hs(e,t,n);break e}xs(e,t,r,n)}t=t.child}return t;case 5:return Ja(t),null===e&&ua(t),r=t.type,o=t.pendingProps,i=null!==e?e.memoizedProps:null,s=o.children,no(r,o)?s=null:null!==i&&no(r,i)&&(t.flags|=32),Cs(e,t),xs(e,t,s,n),t.child;case 6:return null===e&&ua(t),null;case 13:return $s(e,t,n);case 4:return Ya(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=wa(t,null,r,n):xs(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,ws(e,t,r,o=t.elementType===r?o:ns(r,o),n);case 7:return xs(e,t,t.pendingProps,n),t.child;case 8:case 12:return xs(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,s=o.value,To(ka,r._currentValue),r._currentValue=s,null!==i)if(sr(i.value,s)){if(i.children===o.children&&!No.current){t=Hs(e,t,n);break e}}else for(null!==(i=t.child)&&(i.return=t);null!==i;){var l=i.dependencies;if(null!==l){s=i.child;for(var c=l.firstContext;null!==c;){if(c.context===r){if(1===i.tag){(c=Da(-1,n&-n)).tag=2;var u=i.updateQueue;if(null!==u){var d=(u=u.shared).pending;null===d?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}i.lanes|=n,null!==(c=i.alternate)&&(c.lanes|=n),Oa(i.return,n,t),l.lanes|=n;break}c=c.next}}else if(10===i.tag)s=i.type===t.type?null:i.child;else if(18===i.tag){if(null===(s=i.return))throw Error(a(341));s.lanes|=n,null!==(l=s.alternate)&&(l.lanes|=n),Oa(s,n,t),s=i.sibling}else s=i.child;if(null!==s)s.return=i;else for(s=i;null!==s;){if(s===t){s=null;break}if(null!==(i=s.sibling)){i.return=s.return,s=i;break}s=s.return}i=s}xs(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,Na(t,n),r=r(o=Ra(o)),t.flags|=1,xs(e,t,r,n),t.child;case 14:return o=ns(r=t.type,t.pendingProps),Ss(e,t,r,o=ns(r.type,o),n);case 15:return ks(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:ns(r,o),Ws(e,t),t.tag=1,Ao(r)?(e=!0,$o(t)):e=!1,Na(t,n),is(t,r,o),ls(t,r,o,n),Ps(null,t,r,!0,e,n);case 19:return Us(e,t,n);case 22:return js(e,t,n)}throw Error(a(156,t.tag))};var Kc="function"===typeof reportError?reportError:function(e){console.error(e)};function Gc(e){this._internalRoot=e}function Qc(e){this._internalRoot=e}function Yc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function Xc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Jc(){}function Zc(e,t,n,r,o){var a=n._reactRootContainer;if(a){var i=a;if("function"===typeof o){var s=o;o=function(){var e=Hc(i);s.call(e)}}Wc(t,i,e,o)}else i=function(e,t,n,r,o){if(o){if("function"===typeof r){var a=r;r=function(){var e=Hc(i);a.call(e)}}var i=Uc(t,r,e,0,null,!1,0,"",Jc);return e._reactRootContainer=i,e[ho]=i.current,Ur(8===e.nodeType?e.parentNode:e),uc(),i}for(;o=e.lastChild;)e.removeChild(o);if("function"===typeof r){var s=r;r=function(){var e=Hc(l);s.call(e)}}var l=Lc(e,0,!1,null,0,!1,0,"",Jc);return e._reactRootContainer=l,e[ho]=l.current,Ur(8===e.nodeType?e.parentNode:e),uc((function(){Wc(t,l,n,r)})),l}(n,t,e,o,r);return Hc(i)}Qc.prototype.render=Gc.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(a(409));Wc(e,t,null,null)},Qc.prototype.unmount=Gc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;uc((function(){Wc(null,e,null,null)})),t[ho]=null}},Qc.prototype.unstable_scheduleHydration=function(e){if(e){var t=jt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<At.length&&0!==t&&t<At[n].priority;n++);At.splice(n,0,e),0===n&&$t(e)}},wt=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=dt(t.pendingLanes);0!==n&&(bt(t,1|n),rc(t,Xe()),0===(6&Pl)&&(Ul=Xe()+500,Wo()))}break;case 13:uc((function(){var t=Ma(e,1);if(null!==t){var n=ec();nc(t,e,1,n)}})),qc(e,1)}},St=function(e){if(13===e.tag){var t=Ma(e,134217728);if(null!==t)nc(t,e,134217728,ec());qc(e,134217728)}},kt=function(e){if(13===e.tag){var t=tc(e),n=Ma(e,t);if(null!==n)nc(n,e,t,ec());qc(e,t)}},jt=function(){return yt},Ct=function(e,t){var n=yt;try{return yt=e,t()}finally{yt=n}},Se=function(e,t,n){switch(t){case"input":if(J(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=So(r);if(!o)throw Error(a(90));K(r),J(r,o)}}}break;case"textarea":ae(e,n);break;case"select":null!=(t=n.value)&&ne(e,!!n.multiple,t,!1)}},Pe=cc,Oe=uc;var eu={usingClientEntryPoint:!1,Events:[xo,wo,So,Ee,Te,cc]},tu={findFiberByHostInstance:yo,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nu={bundleType:tu.bundleType,version:tu.version,rendererPackageName:tu.rendererPackageName,rendererConfig:tu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:x.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ve(e))?null:e.stateNode},findFiberByHostInstance:tu.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ru=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ru.isDisabled&&ru.supportsFiber)try{ot=ru.inject(nu),at=ru}catch(ue){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=eu,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yc(t))throw Error(a(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:S,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.createRoot=function(e,t){if(!Yc(e))throw Error(a(299));var n=!1,r="",o=Kc;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onRecoverableError&&(o=t.onRecoverableError)),t=Lc(e,1,!1,null,0,n,0,r,o),e[ho]=t.current,Ur(8===e.nodeType?e.parentNode:e),new Gc(t)},t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(a(188));throw e=Object.keys(e).join(","),Error(a(268,e))}return e=null===(e=Ve(t))?null:e.stateNode},t.flushSync=function(e){return uc(e)},t.hydrate=function(e,t,n){if(!Xc(t))throw Error(a(200));return Zc(null,e,t,!0,n)},t.hydrateRoot=function(e,t,n){if(!Yc(e))throw Error(a(405));var r=null!=n&&n.hydratedSources||null,o=!1,i="",s=Kc;if(null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(o=!0),void 0!==n.identifierPrefix&&(i=n.identifierPrefix),void 0!==n.onRecoverableError&&(s=n.onRecoverableError)),t=Uc(t,null,e,1,null!=n?n:null,o,0,i,s),e[ho]=t.current,Ur(e),r)for(e=0;e<r.length;e++)o=(o=(n=r[e])._getVersion)(n._source),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Qc(t)},t.render=function(e,t,n){if(!Xc(t))throw Error(a(200));return Zc(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Xc(e))throw Error(a(40));return!!e._reactRootContainer&&(uc((function(){Zc(null,null,e,!1,(function(){e._reactRootContainer=null,e[ho]=null}))})),!0)},t.unstable_batchedUpdates=cc,t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Xc(n))throw Error(a(200));if(null==e||void 0===e._reactInternals)throw Error(a(38));return Zc(e,t,n,!1,r)},t.version="18.3.1-next-f1338f8080-20240426"},763:(e,t,n)=>{"use strict";e.exports=n(983)},789:(e,t,n)=>{"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function s(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(43),c=(n(950),n(401),n(40)),u=n(80),d=n(173),p=n(296),f={to:d.string.isRequired,containerId:d.string,container:d.object,activeClass:d.string,spy:d.bool,smooth:d.oneOfType([d.bool,d.string]),offset:d.number,delay:d.number,isDynamic:d.bool,onClick:d.func,duration:d.oneOfType([d.number,d.func]),absolute:d.bool,onSetActive:d.func,onSetInactive:d.func,ignoreCancelEvents:d.bool,hashSpy:d.bool,spyThrottle:d.number},m={Scroll:function(e,t){console.warn("Helpers.Scroll is deprecated since v1.7.0");var n=t||u,d=function(t){function u(e){a(this,u);var t=i(this,(u.__proto__||Object.getPrototypeOf(u)).call(this,e));return m.call(t),t.state={active:!1},t}return s(u,t),o(u,[{key:"getScrollSpyContainer",value:function(){var e=this.props.containerId,t=this.props.container;return e?document.getElementById(e):t&&t.nodeType?t:document}},{key:"componentDidMount",value:function(){if(this.props.spy||this.props.hashSpy){var e=this.getScrollSpyContainer();c.isMounted(e)||c.mount(e,this.props.spyThrottle),this.props.hashSpy&&(p.isMounted()||p.mount(n),p.mapContainer(this.props.to,e)),this.props.spy&&c.addStateHandler(this.stateHandler),c.addSpyHandler(this.spyHandler,e),this.setState({container:e})}}},{key:"componentWillUnmount",value:function(){c.unmount(this.stateHandler,this.spyHandler)}},{key:"render",value:function(){var t="";t=this.state&&this.state.active?((this.props.className||"")+" "+(this.props.activeClass||"active")).trim():this.props.className;var n=r({},this.props);for(var o in f)n.hasOwnProperty(o)&&delete n[o];return n.className=t,n.onClick=this.handleClick,l.createElement(e,n)}}]),u}(l.Component),m=function(){var e=this;this.scrollTo=function(t,o){n.scrollTo(t,r({},e.state,o))},this.handleClick=function(t){e.props.onClick&&e.props.onClick(t),t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),e.scrollTo(e.props.to,e.props)},this.stateHandler=function(){n.getActiveLink()!==e.props.to&&(null!==e.state&&e.state.active&&e.props.onSetInactive&&e.props.onSetInactive(),e.setState({active:!1}))},this.spyHandler=function(t){var r=e.getScrollSpyContainer();if(!p.isMounted()||p.isInitialized()){var o=e.props.to,a=null,i=0,s=0,l=0;if(r.getBoundingClientRect)l=r.getBoundingClientRect().top;if(!a||e.props.isDynamic){if(!(a=n.get(o)))return;var u=a.getBoundingClientRect();s=(i=u.top-l+t)+u.height}var d=t-e.props.offset,f=d>=Math.floor(i)&&d<Math.floor(s),m=d<Math.floor(i)||d>=Math.floor(s),h=n.getActiveLink();return m?(o===h&&n.setActiveLink(void 0),e.props.hashSpy&&p.getHash()===o&&p.changeHash(),e.props.spy&&e.state.active&&(e.setState({active:!1}),e.props.onSetInactive&&e.props.onSetInactive()),c.updateStates()):f&&h!==o?(n.setActiveLink(o),e.props.hashSpy&&p.changeHash(o),e.props.spy&&(e.setState({active:!0}),e.props.onSetActive&&e.props.onSetActive(o)),c.updateStates()):void 0}}};return d.propTypes=f,d.defaultProps={offset:0},d},Element:function(e){console.warn("Helpers.Element is deprecated since v1.7.0");var t=function(t){function n(e){a(this,n);var t=i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.childBindings={domNode:null},t}return s(n,t),o(n,[{key:"componentDidMount",value:function(){if("undefined"===typeof window)return!1;this.registerElems(this.props.name)}},{key:"componentDidUpdate",value:function(e){this.props.name!==e.name&&this.registerElems(this.props.name)}},{key:"componentWillUnmount",value:function(){if("undefined"===typeof window)return!1;u.unregister(this.props.name)}},{key:"registerElems",value:function(e){u.register(e,this.childBindings.domNode)}},{key:"render",value:function(){return l.createElement(e,r({},this.props,{parentBindings:this.childBindings}))}}]),n}(l.Component);return t.propTypes={name:d.string,id:d.string},t}};e.exports=m},836:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.addPassiveEventListener=function(e,t,r){var o=r.name;o||(o=t,console.warn("Listener must be a named function.")),n.has(t)||n.set(t,new Set);var a=n.get(t);if(!a.has(o)){var i=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t)}catch(n){}return e}();e.addEventListener(t,r,!!i&&{passive:!0}),a.add(o)}},t.removePassiveEventListener=function(e,t,r){e.removeEventListener(t,r),n.get(t).delete(r.name||t)};var n=new Map},853:(e,t,n)=>{"use strict";e.exports=n(234)},864:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=i(n(43)),a=i(n(380));function i(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){return o.default.createElement("button",this.props,this.props.children)}}]),t}(o.default.Component);t.default=(0,a.default)(s)},950:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(730)},983:(e,t)=>{"use strict";var n="function"===typeof Symbol&&Symbol.for,r=n?Symbol.for("react.element"):60103,o=n?Symbol.for("react.portal"):60106,a=n?Symbol.for("react.fragment"):60107,i=n?Symbol.for("react.strict_mode"):60108,s=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,c=n?Symbol.for("react.context"):60110,u=n?Symbol.for("react.async_mode"):60111,d=n?Symbol.for("react.concurrent_mode"):60111,p=n?Symbol.for("react.forward_ref"):60112,f=n?Symbol.for("react.suspense"):60113,m=n?Symbol.for("react.suspense_list"):60120,h=n?Symbol.for("react.memo"):60115,g=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,b=n?Symbol.for("react.fundamental"):60117,y=n?Symbol.for("react.responder"):60118,x=n?Symbol.for("react.scope"):60119;function w(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case u:case d:case a:case s:case i:case f:return e;default:switch(e=e&&e.$$typeof){case c:case p:case g:case h:case l:return e;default:return t}}case o:return t}}}function S(e){return w(e)===d}t.AsyncMode=u,t.ConcurrentMode=d,t.ContextConsumer=c,t.ContextProvider=l,t.Element=r,t.ForwardRef=p,t.Fragment=a,t.Lazy=g,t.Memo=h,t.Portal=o,t.Profiler=s,t.StrictMode=i,t.Suspense=f,t.isAsyncMode=function(e){return S(e)||w(e)===u},t.isConcurrentMode=S,t.isContextConsumer=function(e){return w(e)===c},t.isContextProvider=function(e){return w(e)===l},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===r},t.isForwardRef=function(e){return w(e)===p},t.isFragment=function(e){return w(e)===a},t.isLazy=function(e){return w(e)===g},t.isMemo=function(e){return w(e)===h},t.isPortal=function(e){return w(e)===o},t.isProfiler=function(e){return w(e)===s},t.isStrictMode=function(e){return w(e)===i},t.isSuspense=function(e){return w(e)===f},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===a||e===d||e===s||e===i||e===f||e===m||"object"===typeof e&&null!==e&&(e.$$typeof===g||e.$$typeof===h||e.$$typeof===l||e.$$typeof===c||e.$$typeof===p||e.$$typeof===b||e.$$typeof===y||e.$$typeof===x||e.$$typeof===v)},t.typeOf=w},996:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(836),o=["mousedown","wheel","touchmove","keydown"];t.default={subscribe:function(e){return"undefined"!==typeof document&&o.forEach((function(t){return(0,r.addPassiveEventListener)(document,t,e)}))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var a=Object.create(null);n.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&r;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,n.d(a,i),a}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,r)=>(n.f[r](e,t),t)),[])),n.u=e=>"static/js/"+e+".2108e08f.chunk.js",n.miniCssF=e=>{},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="clinica-dentaria-client:";n.l=(r,o,a,i)=>{if(e[r])e[r].push(o);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[o];var p=(t,n)=>{s.onerror=s.onload=null,clearTimeout(f);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(n))),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={792:0};n.f.j=(t,r)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise(((n,r)=>o=e[t]=[n,r]));r.push(o[2]=a);var i=n.p+n.u(t),s=new Error;n.l(i,(r=>{if(n.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var o,a,i=r[0],s=r[1],l=r[2],c=0;if(i.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)l(n)}for(t&&t(r);c<i.length;c++)a=i[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0},r=self.webpackChunkclinica_dentaria_client=self.webpackChunkclinica_dentaria_client||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0,(()=>{"use strict";var e={};n.r(e),n.d(e,{hasBrowserEnv:()=>wo,hasStandardBrowserEnv:()=>ko,hasStandardBrowserWebWorkerEnv:()=>jo,navigator:()=>So,origin:()=>Co});var t,r=n(43),o=n.t(r,2),a=n(391);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(t||(t={}));const s="popstate";function l(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function c(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(we){}}}function u(e,t){return{usr:e.state,key:e.key,idx:t}}function d(e,t,n,r){return void 0===n&&(n=null),i({pathname:"string"===typeof e?e:e.pathname,search:"",hash:""},"string"===typeof t?f(t):t,{state:n,key:t&&t.key||r||Math.random().toString(36).substr(2,8)})}function p(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function f(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function m(e,n,r,o){void 0===o&&(o={});let{window:a=document.defaultView,v5Compat:c=!1}=o,f=a.history,m=t.Pop,h=null,g=v();function v(){return(f.state||{idx:null}).idx}function b(){m=t.Pop;let e=v(),n=null==e?null:e-g;g=e,h&&h({action:m,location:x.location,delta:n})}function y(e){let t="null"!==a.location.origin?a.location.origin:a.location.href,n="string"===typeof e?e:p(e);return n=n.replace(/ $/,"%20"),l(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}null==g&&(g=0,f.replaceState(i({},f.state,{idx:g}),""));let x={get action(){return m},get location(){return e(a,f)},listen(e){if(h)throw new Error("A history only accepts one active listener");return a.addEventListener(s,b),h=e,()=>{a.removeEventListener(s,b),h=null}},createHref:e=>n(a,e),createURL:y,encodeLocation(e){let t=y(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,n){m=t.Push;let o=d(x.location,e,n);r&&r(o,e),g=v()+1;let i=u(o,g),s=x.createHref(o);try{f.pushState(i,"",s)}catch(l){if(l instanceof DOMException&&"DataCloneError"===l.name)throw l;a.location.assign(s)}c&&h&&h({action:m,location:x.location,delta:1})},replace:function(e,n){m=t.Replace;let o=d(x.location,e,n);r&&r(o,e),g=v();let a=u(o,g),i=x.createHref(o);f.replaceState(a,"",i),c&&h&&h({action:m,location:x.location,delta:0})},go:e=>f.go(e)};return x}var h;!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(h||(h={}));new Set(["lazy","caseSensitive","path","id","index","children"]);function g(e,t,n){return void 0===n&&(n="/"),v(e,t,n,!1)}function v(e,t,n,r){let o=R(("string"===typeof t?f(t):t).pathname||"/",n);if(null==o)return null;let a=b(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]));return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(a);let i=null;for(let s=0;null==i&&s<a.length;++s){let e=N(o);i=P(a[s],e,r)}return i}function b(e,t,n,r){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===r&&(r="");let o=(e,o,a)=>{let i={relativePath:void 0===a?e.path||"":a,caseSensitive:!0===e.caseSensitive,childrenIndex:o,route:e};i.relativePath.startsWith("/")&&(l(i.relativePath.startsWith(r),'Absolute route path "'+i.relativePath+'" nested under path "'+r+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),i.relativePath=i.relativePath.slice(r.length));let s=I([r,i.relativePath]),c=n.concat(i);e.children&&e.children.length>0&&(l(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+s+'".'),b(e.children,t,c,s)),(null!=e.path||e.index)&&t.push({path:s,score:T(s,e.index),routesMeta:c})};return e.forEach(((e,t)=>{var n;if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let r of y(e.path))o(e,t,r);else o(e,t)})),t}function y(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,o=n.endsWith("?"),a=n.replace(/\?$/,"");if(0===r.length)return o?[a,""]:[a];let i=y(r.join("/")),s=[];return s.push(...i.map((e=>""===e?a:[a,e].join("/")))),o&&s.push(...i),s.map((t=>e.startsWith("/")&&""===t?"/":t))}const x=/^:[\w-]+$/,w=3,S=2,k=1,j=10,C=-2,E=e=>"*"===e;function T(e,t){let n=e.split("/"),r=n.length;return n.some(E)&&(r+=C),t&&(r+=S),n.filter((e=>!E(e))).reduce(((e,t)=>e+(x.test(t)?w:""===t?k:j)),r)}function P(e,t,n){void 0===n&&(n=!1);let{routesMeta:r}=e,o={},a="/",i=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,c="/"===a?t:t.slice(a.length)||"/",u=O({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),d=e.route;if(!u&&l&&n&&!r[r.length-1].route.index&&(u=O({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!u)return null;Object.assign(o,u.params),i.push({params:o,pathname:I([a,u.pathname]),pathnameBase:$(I([a,u.pathnameBase])),route:d}),"/"!==u.pathnameBase&&(a=I([a,u.pathnameBase]))}return i}function O(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);c("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)")));e.endsWith("*")?(r.push({paramName:"*"}),o+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":""!==e&&"/"!==e&&(o+="(?:(?=\\/|$))");let a=new RegExp(o,t?void 0:"i");return[a,r]}(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let a=o[0],i=a.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce(((e,t,n)=>{let{paramName:r,isOptional:o}=t;if("*"===r){let e=s[n]||"";i=a.slice(0,a.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=o&&!l?void 0:(l||"").replace(/%2F/g,"/"),e}),{}),pathname:a,pathnameBase:i,pattern:e}}function N(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(t){return c(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}function R(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function _(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function A(e){return e.filter(((e,t)=>0===t||e.route.path&&e.route.path.length>0))}function z(e,t){let n=A(e);return t?n.map(((e,t)=>t===n.length-1?e.pathname:e.pathnameBase)):n.map((e=>e.pathnameBase))}function M(e,t,n,r){let o;void 0===r&&(r=!1),"string"===typeof e?o=f(e):(o=i({},e),l(!o.pathname||!o.pathname.includes("?"),_("?","pathname","search",o)),l(!o.pathname||!o.pathname.includes("#"),_("#","pathname","hash",o)),l(!o.search||!o.search.includes("#"),_("#","search","hash",o)));let a,s=""===e||""===o.pathname,c=s?"/":o.pathname;if(null==c)a=n;else{let e=t.length-1;if(!r&&c.startsWith("..")){let t=c.split("/");for(;".."===t[0];)t.shift(),e-=1;o.pathname=t.join("/")}a=e>=0?t[e]:"/"}let u=function(e,t){void 0===t&&(t="/");let{pathname:n,search:r="",hash:o=""}="string"===typeof e?f(e):e,a=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:a,search:F(r),hash:D(o)}}(o,a),d=c&&"/"!==c&&c.endsWith("/"),p=(s||"."===c)&&n.endsWith("/");return u.pathname.endsWith("/")||!d&&!p||(u.pathname+="/"),u}const I=e=>e.join("/").replace(/\/\/+/g,"/"),$=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),F=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",D=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";Error;function L(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}const B=["post","put","patch","delete"],U=(new Set(B),["get",...B]);new Set(U),new Set([301,302,303,307,308]),new Set([307,308]);Symbol("deferred");function W(){return W=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},W.apply(this,arguments)}const H=r.createContext(null);const V=r.createContext(null);const q=r.createContext(null);const K=r.createContext(null);const G=r.createContext({outlet:null,matches:[],isDataRoute:!1});const Q=r.createContext(null);function Y(){return null!=r.useContext(K)}function X(){return Y()||l(!1),r.useContext(K).location}function J(e){r.useContext(q).static||r.useLayoutEffect(e)}function Z(){let{isDataRoute:e}=r.useContext(G);return e?function(){let{router:e}=ue(le.UseNavigateStable),t=pe(ce.UseNavigateStable),n=r.useRef(!1);return J((()=>{n.current=!0})),r.useCallback((function(r,o){void 0===o&&(o={}),n.current&&("number"===typeof r?e.navigate(r):e.navigate(r,W({fromRouteId:t},o)))}),[e,t])}():function(){Y()||l(!1);let e=r.useContext(H),{basename:t,future:n,navigator:o}=r.useContext(q),{matches:a}=r.useContext(G),{pathname:i}=X(),s=JSON.stringify(z(a,n.v7_relativeSplatPath)),c=r.useRef(!1);return J((()=>{c.current=!0})),r.useCallback((function(n,r){if(void 0===r&&(r={}),!c.current)return;if("number"===typeof n)return void o.go(n);let a=M(n,JSON.parse(s),i,"path"===r.relative);null==e&&"/"!==t&&(a.pathname="/"===a.pathname?t:I([t,a.pathname])),(r.replace?o.replace:o.push)(a,r.state,r)}),[t,o,s,i,e])}()}const ee=r.createContext(null);function te(e,t){let{relative:n}=void 0===t?{}:t,{future:o}=r.useContext(q),{matches:a}=r.useContext(G),{pathname:i}=X(),s=JSON.stringify(z(a,o.v7_relativeSplatPath));return r.useMemo((()=>M(e,JSON.parse(s),i,"path"===n)),[e,s,i,n])}function ne(e,n,o,a){Y()||l(!1);let{navigator:i,static:s}=r.useContext(q),{matches:c}=r.useContext(G),u=c[c.length-1],d=u?u.params:{},p=(u&&u.pathname,u?u.pathnameBase:"/");u&&u.route;let m,h=X();if(n){var v;let e="string"===typeof n?f(n):n;"/"===p||(null==(v=e.pathname)?void 0:v.startsWith(p))||l(!1),m=e}else m=h;let b=m.pathname||"/",y=b;if("/"!==p){let e=p.replace(/^\//,"").split("/");y="/"+b.replace(/^\//,"").split("/").slice(e.length).join("/")}let x=!s&&o&&o.matches&&o.matches.length>0?o.matches:g(e,{pathname:y});let w=se(x&&x.map((e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:I([p,i.encodeLocation?i.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?p:I([p,i.encodeLocation?i.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),c,o,a);return n&&w?r.createElement(K.Provider,{value:{location:W({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:t.Pop}},w):w}function re(){let e=function(){var e;let t=r.useContext(Q),n=de(ce.UseRouteError),o=pe(ce.UseRouteError);if(void 0!==t)return t;return null==(e=n.errors)?void 0:e[o]}(),t=L(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:o};return r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:a},n):null,null)}const oe=r.createElement(re,null);class ae extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?r.createElement(G.Provider,{value:this.props.routeContext},r.createElement(Q.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ie(e){let{routeContext:t,match:n,children:o}=e,a=r.useContext(H);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(G.Provider,{value:t},o)}function se(e,t,n,o){var a;if(void 0===t&&(t=[]),void 0===n&&(n=null),void 0===o&&(o=null),null==e){var i;if(!n)return null;if(n.errors)e=n.matches;else{if(!(null!=(i=o)&&i.v7_partialHydration&&0===t.length&&!n.initialized&&n.matches.length>0))return null;e=n.matches}}let s=e,c=null==(a=n)?void 0:a.errors;if(null!=c){let e=s.findIndex((e=>e.route.id&&void 0!==(null==c?void 0:c[e.route.id])));e>=0||l(!1),s=s.slice(0,Math.min(s.length,e+1))}let u=!1,d=-1;if(n&&o&&o.v7_partialHydration)for(let r=0;r<s.length;r++){let e=s[r];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(d=r),e.route.id){let{loaderData:t,errors:r}=n,o=e.route.loader&&void 0===t[e.route.id]&&(!r||void 0===r[e.route.id]);if(e.route.lazy||o){u=!0,s=d>=0?s.slice(0,d+1):[s[0]];break}}}return s.reduceRight(((e,o,a)=>{let i,l=!1,p=null,f=null;var m;n&&(i=c&&o.route.id?c[o.route.id]:void 0,p=o.route.errorElement||oe,u&&(d<0&&0===a?(m="route-fallback",!1||fe[m]||(fe[m]=!0),l=!0,f=null):d===a&&(l=!0,f=o.route.hydrateFallbackElement||null)));let h=t.concat(s.slice(0,a+1)),g=()=>{let t;return t=i?p:l?f:o.route.Component?r.createElement(o.route.Component,null):o.route.element?o.route.element:e,r.createElement(ie,{match:o,routeContext:{outlet:e,matches:h,isDataRoute:null!=n},children:t})};return n&&(o.route.ErrorBoundary||o.route.errorElement||0===a)?r.createElement(ae,{location:n.location,revalidation:n.revalidation,component:p,error:i,children:g(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):g()}),null)}var le=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(le||{}),ce=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ce||{});function ue(e){let t=r.useContext(H);return t||l(!1),t}function de(e){let t=r.useContext(V);return t||l(!1),t}function pe(e){let t=function(){let e=r.useContext(G);return e||l(!1),e}(),n=t.matches[t.matches.length-1];return n.route.id||l(!1),n.route.id}const fe={};function me(e,t){null==e||e.v7_startTransition,void 0===(null==e?void 0:e.v7_relativeSplatPath)&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}o.startTransition;function he(e){let{to:t,replace:n,state:o,relative:a}=e;Y()||l(!1);let{future:i,static:s}=r.useContext(q),{matches:c}=r.useContext(G),{pathname:u}=X(),d=Z(),p=M(t,z(c,i.v7_relativeSplatPath),u,"path"===a),f=JSON.stringify(p);return r.useEffect((()=>d(JSON.parse(f),{replace:n,state:o,relative:a})),[d,f,a,n,o]),null}function ge(e){return function(e){let t=r.useContext(G).outlet;return t?r.createElement(ee.Provider,{value:e},t):t}(e.context)}function ve(e){l(!1)}function be(e){let{basename:n="/",children:o=null,location:a,navigationType:i=t.Pop,navigator:s,static:c=!1,future:u}=e;Y()&&l(!1);let d=n.replace(/^\/*/,"/"),p=r.useMemo((()=>({basename:d,navigator:s,static:c,future:W({v7_relativeSplatPath:!1},u)})),[d,u,s,c]);"string"===typeof a&&(a=f(a));let{pathname:m="/",search:h="",hash:g="",state:v=null,key:b="default"}=a,y=r.useMemo((()=>{let e=R(m,d);return null==e?null:{location:{pathname:e,search:h,hash:g,state:v,key:b},navigationType:i}}),[d,m,h,g,v,b,i]);return null==y?null:r.createElement(q.Provider,{value:p},r.createElement(K.Provider,{children:o,value:y}))}function ye(e){let{children:t,location:n}=e;return ne(xe(t),n)}new Promise((()=>{}));r.Component;function xe(e,t){void 0===t&&(t=[]);let n=[];return r.Children.forEach(e,((e,o)=>{if(!r.isValidElement(e))return;let a=[...t,o];if(e.type===r.Fragment)return void n.push.apply(n,xe(e.props.children,a));e.type!==ve&&l(!1),e.props.index&&e.props.children&&l(!1);let i={id:e.props.id||a.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(i.children=xe(e.props.children,a)),n.push(i)})),n}let we={data:""},Se=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||we,ke=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,je=/\/\*[^]*?\*\/|  +/g,Ce=/\n+/g,Ee=(e,t)=>{let n="",r="",o="";for(let a in e){let i=e[a];"@"==a[0]?"i"==a[1]?n=a+" "+i+";":r+="f"==a[1]?Ee(i,a):a+"{"+Ee(i,"k"==a[1]?"":t)+"}":"object"==typeof i?r+=Ee(i,t?t.replace(/([^,])+/g,(e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):a):null!=i&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=Ee.p?Ee.p(a,i):a+":"+i+";")}return n+(t&&o?t+"{"+o+"}":o)+r},Te={},Pe=e=>{if("object"==typeof e){let t="";for(let n in e)t+=n+Pe(e[n]);return t}return e};function Oe(e){let t=this||{},n=e.call?e(t.p):e;return((e,t,n,r,o)=>{let a=Pe(e),i=Te[a]||(Te[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(a));if(!Te[i]){let t=a!==e?e:(e=>{let t,n,r=[{}];for(;t=ke.exec(e.replace(je,""));)t[4]?r.shift():t[3]?(n=t[3].replace(Ce," ").trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(Ce," ").trim();return r[0]})(e);Te[i]=Ee(o?{["@keyframes "+i]:t}:t,n?"":"."+i)}let s=n&&Te.g?Te.g:null;return n&&(Te.g=Te[i]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Te[i],t,r,s),i})(n.unshift?n.raw?((e,t,n)=>e.reduce(((e,r,o)=>{let a=t[o];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":Ee(e,""):!1===e?"":e}return e+r+(null==a?"":a)}),""))(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>Object.assign(e,n&&n.call?n(t.p):n)),{}):n,Se(t.target),t.g,t.o,t.k)}Oe.bind({g:1});let Ne,Re,_e,Ae=Oe.bind({k:1});function ze(e,t){let n=this||{};return function(){let r=arguments;function o(a,i){let s=Object.assign({},a),l=s.className||o.className;n.p=Object.assign({theme:Re&&Re()},s),n.o=/ *go\d+/.test(l),s.className=Oe.apply(n,r)+(l?" "+l:""),t&&(s.ref=i);let c=e;return e[0]&&(c=s.as||e,delete s.as),_e&&c[0]&&_e(s),Ne(c,s)}return t?t(o):o}}var Me=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,Ie=(()=>{let e=0;return()=>(++e).toString()})(),$e=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Fe=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map((e=>e.id===t.toast.id?{...e,...t.toast}:e))};case 2:let{toast:n}=t;return Fe(e,{type:e.toasts.find((e=>e.id===n.id))?1:0,toast:n});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map((e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((e=>e.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((e=>({...e,pauseDuration:e.pauseDuration+o})))}}},De=[],Le={toasts:[],pausedAt:void 0},Be=e=>{Le=Fe(Le,e),De.forEach((e=>{e(Le)}))},Ue={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},We=e=>(t,n)=>{let r=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"blank",n=arguments.length>2?arguments[2]:void 0;return{createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||Ie()}}(t,e,n);return Be({type:2,toast:r}),r.id},He=(e,t)=>We("blank")(e,t);He.error=We("error"),He.success=We("success"),He.loading=We("loading"),He.custom=We("custom"),He.dismiss=e=>{Be({type:3,toastId:e})},He.remove=e=>Be({type:4,toastId:e}),He.promise=(e,t,n)=>{let r=He.loading(t.loading,{...n,...null==n?void 0:n.loading});return"function"==typeof e&&(e=e()),e.then((e=>{let o=t.success?Me(t.success,e):void 0;return o?He.success(o,{id:r,...n,...null==n?void 0:n.success}):He.dismiss(r),e})).catch((e=>{let o=t.error?Me(t.error,e):void 0;o?He.error(o,{id:r,...n,...null==n?void 0:n.error}):He.dismiss(r)})),e};var Ve=(e,t)=>{Be({type:1,toast:{id:e,height:t}})},qe=()=>{Be({type:5,time:Date.now()})},Ke=new Map,Ge=e=>{let{toasts:t,pausedAt:n}=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},[t,n]=(0,r.useState)(Le),o=(0,r.useRef)(Le);(0,r.useEffect)((()=>(o.current!==Le&&n(Le),De.push(n),()=>{let e=De.indexOf(n);e>-1&&De.splice(e,1)})),[]);let a=t.toasts.map((t=>{var n,r,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(n=e[t.type])?void 0:n.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||Ue[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}}));return{...t,toasts:a}}(e);(0,r.useEffect)((()=>{if(n)return;let e=Date.now(),r=t.map((t=>{if(t.duration===1/0)return;let n=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(n<0))return setTimeout((()=>He.dismiss(t.id)),n);t.visible&&He.dismiss(t.id)}));return()=>{r.forEach((e=>e&&clearTimeout(e)))}}),[t,n]);let o=(0,r.useCallback)((()=>{n&&Be({type:6,time:Date.now()})}),[n]),a=(0,r.useCallback)(((e,n)=>{let{reverseOrder:r=!1,gutter:o=8,defaultPosition:a}=n||{},i=t.filter((t=>(t.position||a)===(e.position||a)&&t.height)),s=i.findIndex((t=>t.id===e.id)),l=i.filter(((e,t)=>t<s&&e.visible)).length;return i.filter((e=>e.visible)).slice(...r?[l+1]:[0,l]).reduce(((e,t)=>e+(t.height||0)+o),0)}),[t]);return(0,r.useEffect)((()=>{t.forEach((e=>{if(e.dismissed)!function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;if(Ke.has(e))return;let n=setTimeout((()=>{Ke.delete(e),Be({type:4,toastId:e})}),t);Ke.set(e,n)}(e.id,e.removeDelay);else{let t=Ke.get(e.id);t&&(clearTimeout(t),Ke.delete(e.id))}}))}),[t]),{toasts:t,handlers:{updateHeight:Ve,startPause:qe,endPause:o,calculateOffset:a}}},Qe=Ae`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ye=Ae`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Xe=Ae`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Je=ze("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Qe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ye} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Xe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ze=Ae`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,et=ze("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ze} 1s linear infinite;
`,tt=Ae`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,nt=Ae`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,rt=ze("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${tt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${nt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ot=ze("div")`
  position: absolute;
`,at=ze("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,it=Ae`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,st=ze("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${it} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,lt=e=>{let{toast:t}=e,{icon:n,type:o,iconTheme:a}=t;return void 0!==n?"string"==typeof n?r.createElement(st,null,n):n:"blank"===o?null:r.createElement(at,null,r.createElement(et,{...a}),"loading"!==o&&r.createElement(ot,null,"error"===o?r.createElement(Je,{...a}):r.createElement(rt,{...a})))},ct=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,ut=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,dt=ze("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,pt=ze("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ft=r.memo((e=>{let{toast:t,position:n,style:o,children:a}=e,i=t.height?((e,t)=>{let n=e.includes("top")?1:-1,[r,o]=$e()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ct(n),ut(n)];return{animation:t?`${Ae(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${Ae(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||n||"top-center",t.visible):{opacity:0},s=r.createElement(lt,{toast:t}),l=r.createElement(pt,{...t.ariaProps},Me(t.message,t));return r.createElement(dt,{className:t.className,style:{...i,...o,...t.style}},"function"==typeof a?a({icon:s,message:l}):r.createElement(r.Fragment,null,s,l))}));!function(e,t,n,r){Ee.p=t,Ne=e,Re=n,_e=r}(r.createElement);var mt=e=>{let{id:t,className:n,style:o,onHeightUpdate:a,children:i}=e,s=r.useCallback((e=>{if(e){let n=()=>{let n=e.getBoundingClientRect().height;a(t,n)};n(),new MutationObserver(n).observe(e,{subtree:!0,childList:!0,characterData:!0})}}),[t,a]);return r.createElement("div",{ref:s,className:n,style:o},i)},ht=Oe`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,gt=e=>{let{reverseOrder:t,position:n="top-center",toastOptions:o,gutter:a,children:i,containerStyle:s,containerClassName:l}=e,{toasts:c,handlers:u}=Ge(o);return r.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map((e=>{let o=e.position||n,s=((e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:$e()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...o}})(o,u.calculateOffset(e,{reverseOrder:t,gutter:a,defaultPosition:n}));return r.createElement(mt,{id:e.id,key:e.id,onHeightUpdate:u.updateHeight,className:e.visible?ht:"",style:s},"custom"===e.type?Me(e.message,e):i?i(e):r.createElement(ft,{toast:e,position:o}))})))},vt=n(528),bt=n(324),yt=n.n(bt);const xt=function(e){function t(e,r,l,c,p){for(var f,m,h,g,x,S=0,k=0,j=0,C=0,E=0,_=0,z=h=f=0,I=0,$=0,F=0,D=0,L=l.length,B=L-1,U="",W="",H="",V="";I<L;){if(m=l.charCodeAt(I),I===B&&0!==k+C+j+S&&(0!==k&&(m=47===k?10:47),C=j=S=0,L++,B++),0===k+C+j+S){if(I===B&&(0<$&&(U=U.replace(d,"")),0<U.trim().length)){switch(m){case 32:case 9:case 59:case 13:case 10:break;default:U+=l.charAt(I)}m=59}switch(m){case 123:for(f=(U=U.trim()).charCodeAt(0),h=1,D=++I;I<L;){switch(m=l.charCodeAt(I)){case 123:h++;break;case 125:h--;break;case 47:switch(m=l.charCodeAt(I+1)){case 42:case 47:e:{for(z=I+1;z<B;++z)switch(l.charCodeAt(z)){case 47:if(42===m&&42===l.charCodeAt(z-1)&&I+2!==z){I=z+1;break e}break;case 10:if(47===m){I=z+1;break e}}I=z}}break;case 91:m++;case 40:m++;case 34:case 39:for(;I++<B&&l.charCodeAt(I)!==m;);}if(0===h)break;I++}if(h=l.substring(D,I),0===f&&(f=(U=U.replace(u,"").trim()).charCodeAt(0)),64===f){switch(0<$&&(U=U.replace(d,"")),m=U.charCodeAt(1)){case 100:case 109:case 115:case 45:$=r;break;default:$=R}if(D=(h=t(r,$,h,m,p+1)).length,0<A&&(x=s(3,h,$=n(R,U,F),r,P,T,D,m,p,c),U=$.join(""),void 0!==x&&0===(D=(h=x.trim()).length)&&(m=0,h="")),0<D)switch(m){case 115:U=U.replace(w,i);case 100:case 109:case 45:h=U+"{"+h+"}";break;case 107:h=(U=U.replace(v,"$1 $2"))+"{"+h+"}",h=1===N||2===N&&a("@"+h,3)?"@-webkit-"+h+"@"+h:"@"+h;break;default:h=U+h,112===c&&(W+=h,h="")}else h=""}else h=t(r,n(r,U,F),h,c,p+1);H+=h,h=F=$=z=f=0,U="",m=l.charCodeAt(++I);break;case 125:case 59:if(1<(D=(U=(0<$?U.replace(d,""):U).trim()).length))switch(0===z&&(f=U.charCodeAt(0),45===f||96<f&&123>f)&&(D=(U=U.replace(" ",":")).length),0<A&&void 0!==(x=s(1,U,r,e,P,T,W.length,c,p,c))&&0===(D=(U=x.trim()).length)&&(U="\0\0"),f=U.charCodeAt(0),m=U.charCodeAt(1),f){case 0:break;case 64:if(105===m||99===m){V+=U+l.charAt(I);break}default:58!==U.charCodeAt(D-1)&&(W+=o(U,f,m,U.charCodeAt(2)))}F=$=z=f=0,U="",m=l.charCodeAt(++I)}}switch(m){case 13:case 10:47===k?k=0:0===1+f&&107!==c&&0<U.length&&($=1,U+="\0"),0<A*M&&s(0,U,r,e,P,T,W.length,c,p,c),T=1,P++;break;case 59:case 125:if(0===k+C+j+S){T++;break}default:switch(T++,g=l.charAt(I),m){case 9:case 32:if(0===C+S+k)switch(E){case 44:case 58:case 9:case 32:g="";break;default:32!==m&&(g=" ")}break;case 0:g="\\0";break;case 12:g="\\f";break;case 11:g="\\v";break;case 38:0===C+k+S&&($=F=1,g="\f"+g);break;case 108:if(0===C+k+S+O&&0<z)switch(I-z){case 2:112===E&&58===l.charCodeAt(I-3)&&(O=E);case 8:111===_&&(O=_)}break;case 58:0===C+k+S&&(z=I);break;case 44:0===k+j+C+S&&($=1,g+="\r");break;case 34:case 39:0===k&&(C=C===m?0:0===C?m:C);break;case 91:0===C+k+j&&S++;break;case 93:0===C+k+j&&S--;break;case 41:0===C+k+S&&j--;break;case 40:if(0===C+k+S){if(0===f)if(2*E+3*_===533);else f=1;j++}break;case 64:0===k+j+C+S+z+h&&(h=1);break;case 42:case 47:if(!(0<C+S+j))switch(k){case 0:switch(2*m+3*l.charCodeAt(I+1)){case 235:k=47;break;case 220:D=I,k=42}break;case 42:47===m&&42===E&&D+2!==I&&(33===l.charCodeAt(D+2)&&(W+=l.substring(D,I+1)),g="",k=0)}}0===k&&(U+=g)}_=E,E=m,I++}if(0<(D=W.length)){if($=r,0<A&&(void 0!==(x=s(2,W,$,e,P,T,D,c,p,c))&&0===(W=x).length))return V+W+H;if(W=$.join(",")+"{"+W+"}",0!==N*O){switch(2!==N||a(W,2)||(O=0),O){case 111:W=W.replace(y,":-moz-$1")+W;break;case 112:W=W.replace(b,"::-webkit-input-$1")+W.replace(b,"::-moz-$1")+W.replace(b,":-ms-input-$1")+W}O=0}}return V+W+H}function n(e,t,n){var o=t.trim().split(h);t=o;var a=o.length,i=e.length;switch(i){case 0:case 1:var s=0;for(e=0===i?"":e[0]+" ";s<a;++s)t[s]=r(e,t[s],n).trim();break;default:var l=s=0;for(t=[];s<a;++s)for(var c=0;c<i;++c)t[l++]=r(e[c]+" ",o[s],n).trim()}return t}function r(e,t,n){var r=t.charCodeAt(0);switch(33>r&&(r=(t=t.trim()).charCodeAt(0)),r){case 38:return t.replace(g,"$1"+e.trim());case 58:return e.trim()+t.replace(g,"$1"+e.trim());default:if(0<1*n&&0<t.indexOf("\f"))return t.replace(g,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+t}function o(e,t,n,r){var i=e+";",s=2*t+3*n+4*r;if(944===s){e=i.indexOf(":",9)+1;var l=i.substring(e,i.length-1).trim();return l=i.substring(0,e).trim()+l+";",1===N||2===N&&a(l,1)?"-webkit-"+l+l:l}if(0===N||2===N&&!a(i,1))return i;switch(s){case 1015:return 97===i.charCodeAt(10)?"-webkit-"+i+i:i;case 951:return 116===i.charCodeAt(3)?"-webkit-"+i+i:i;case 963:return 110===i.charCodeAt(5)?"-webkit-"+i+i:i;case 1009:if(100!==i.charCodeAt(4))break;case 969:case 942:return"-webkit-"+i+i;case 978:return"-webkit-"+i+"-moz-"+i+i;case 1019:case 983:return"-webkit-"+i+"-moz-"+i+"-ms-"+i+i;case 883:if(45===i.charCodeAt(8))return"-webkit-"+i+i;if(0<i.indexOf("image-set(",11))return i.replace(E,"$1-webkit-$2")+i;break;case 932:if(45===i.charCodeAt(4))switch(i.charCodeAt(5)){case 103:return"-webkit-box-"+i.replace("-grow","")+"-webkit-"+i+"-ms-"+i.replace("grow","positive")+i;case 115:return"-webkit-"+i+"-ms-"+i.replace("shrink","negative")+i;case 98:return"-webkit-"+i+"-ms-"+i.replace("basis","preferred-size")+i}return"-webkit-"+i+"-ms-"+i+i;case 964:return"-webkit-"+i+"-ms-flex-"+i+i;case 1023:if(99!==i.charCodeAt(8))break;return"-webkit-box-pack"+(l=i.substring(i.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+i+"-ms-flex-pack"+l+i;case 1005:return f.test(i)?i.replace(p,":-webkit-")+i.replace(p,":-moz-")+i:i;case 1e3:switch(t=(l=i.substring(13).trim()).indexOf("-")+1,l.charCodeAt(0)+l.charCodeAt(t)){case 226:l=i.replace(x,"tb");break;case 232:l=i.replace(x,"tb-rl");break;case 220:l=i.replace(x,"lr");break;default:return i}return"-webkit-"+i+"-ms-"+l+i;case 1017:if(-1===i.indexOf("sticky",9))break;case 975:switch(t=(i=e).length-10,s=(l=(33===i.charCodeAt(t)?i.substring(0,t):i).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|l.charCodeAt(7))){case 203:if(111>l.charCodeAt(8))break;case 115:i=i.replace(l,"-webkit-"+l)+";"+i;break;case 207:case 102:i=i.replace(l,"-webkit-"+(102<s?"inline-":"")+"box")+";"+i.replace(l,"-webkit-"+l)+";"+i.replace(l,"-ms-"+l+"box")+";"+i}return i+";";case 938:if(45===i.charCodeAt(5))switch(i.charCodeAt(6)){case 105:return l=i.replace("-items",""),"-webkit-"+i+"-webkit-box-"+l+"-ms-flex-"+l+i;case 115:return"-webkit-"+i+"-ms-flex-item-"+i.replace(k,"")+i;default:return"-webkit-"+i+"-ms-flex-line-pack"+i.replace("align-content","").replace(k,"")+i}break;case 973:case 989:if(45!==i.charCodeAt(3)||122===i.charCodeAt(4))break;case 931:case 953:if(!0===C.test(e))return 115===(l=e.substring(e.indexOf(":")+1)).charCodeAt(0)?o(e.replace("stretch","fill-available"),t,n,r).replace(":fill-available",":stretch"):i.replace(l,"-webkit-"+l)+i.replace(l,"-moz-"+l.replace("fill-",""))+i;break;case 962:if(i="-webkit-"+i+(102===i.charCodeAt(5)?"-ms-"+i:"")+i,211===n+r&&105===i.charCodeAt(13)&&0<i.indexOf("transform",10))return i.substring(0,i.indexOf(";",27)+1).replace(m,"$1-webkit-$2")+i}return i}function a(e,t){var n=e.indexOf(1===t?":":"{"),r=e.substring(0,3!==t?n:10);return n=e.substring(n+1,e.length-1),z(2!==t?r:r.replace(j,"$1"),n,t)}function i(e,t){var n=o(t,t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2));return n!==t+";"?n.replace(S," or ($1)").substring(4):"("+t+")"}function s(e,t,n,r,o,a,i,s,l,u){for(var d,p=0,f=t;p<A;++p)switch(d=_[p].call(c,e,f,n,r,o,a,i,s,l,u)){case void 0:case!1:case!0:case null:break;default:f=d}if(f!==t)return f}function l(e){return void 0!==(e=e.prefix)&&(z=null,e?"function"!==typeof e?N=1:(N=2,z=e):N=0),l}function c(e,n){var r=e;if(33>r.charCodeAt(0)&&(r=r.trim()),r=[r],0<A){var o=s(-1,n,r,r,P,T,0,0,0,0);void 0!==o&&"string"===typeof o&&(n=o)}var a=t(R,r,n,0,0);return 0<A&&(void 0!==(o=s(-2,a,r,r,P,T,a.length,0,0,0))&&(a=o)),O=0,T=P=1,a}var u=/^\0+/g,d=/[\0\r\f]/g,p=/: */g,f=/zoo|gra/,m=/([,: ])(transform)/g,h=/,\r+?/g,g=/([\t\r\n ])*\f?&/g,v=/@(k\w+)\s*(\S*)\s*/,b=/::(place)/g,y=/:(read-only)/g,x=/[svh]\w+-[tblr]{2}/,w=/\(\s*(.*)\s*\)/g,S=/([\s\S]*?);/g,k=/-self|flex-/g,j=/[^]*?(:[rp][el]a[\w-]+)[^]*/,C=/stretch|:\s*\w+\-(?:conte|avail)/,E=/([^-])(image-set\()/,T=1,P=1,O=0,N=1,R=[],_=[],A=0,z=null,M=0;return c.use=function e(t){switch(t){case void 0:case null:A=_.length=0;break;default:if("function"===typeof t)_[A++]=t;else if("object"===typeof t)for(var n=0,r=t.length;n<r;++n)e(t[n]);else M=0|!!t}return e},c.set=l,void 0!==e&&l(e),c};const wt={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function St(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}var kt=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,jt=St((function(e){return kt.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),Ct=n(219),Et=n.n(Ct);function Tt(){return(Tt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var Pt=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},Ot=function(e){return null!==e&&"object"==typeof e&&"[object Object]"===(e.toString?e.toString():Object.prototype.toString.call(e))&&!(0,vt.QP)(e)},Nt=Object.freeze([]),Rt=Object.freeze({});function _t(e){return"function"==typeof e}function At(e){return e.displayName||e.name||"Component"}function zt(e){return e&&"string"==typeof e.styledComponentId}var Mt="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",It="undefined"!=typeof window&&"HTMLElement"in window,$t=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&(void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)));function Ft(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}var Dt=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&Ft(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var a=r;a<o;a++)this.groupSizes[a]=0}for(var i=this.indexOfGroup(e+1),s=0,l=t.length;s<l;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++)},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,a=r;a<o;a++)t+=this.tag.getRule(a)+"/*!sc*/\n";return t},e}(),Lt=new Map,Bt=new Map,Ut=1,Wt=function(e){if(Lt.has(e))return Lt.get(e);for(;Bt.has(Ut);)Ut++;var t=Ut++;return Lt.set(e,t),Bt.set(t,e),t},Ht=function(e){return Bt.get(e)},Vt=function(e,t){t>=Ut&&(Ut=t+1),Lt.set(e,t),Bt.set(t,e)},qt="style["+Mt+'][data-styled-version="5.3.11"]',Kt=new RegExp("^"+Mt+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),Gt=function(e,t,n){for(var r,o=n.split(","),a=0,i=o.length;a<i;a++)(r=o[a])&&e.registerName(t,r)},Qt=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],o=0,a=n.length;o<a;o++){var i=n[o].trim();if(i){var s=i.match(Kt);if(s){var l=0|parseInt(s[1],10),c=s[2];0!==l&&(Vt(c,l),Gt(e,c,s[3]),e.getTag().insertRules(l,r)),r.length=0}else r.push(i)}}},Yt=function(){return n.nc},Xt=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(Mt))return r}}(n),a=void 0!==o?o.nextSibling:null;r.setAttribute(Mt,"active"),r.setAttribute("data-styled-version","5.3.11");var i=Yt();return i&&r.setAttribute("nonce",i),n.insertBefore(r,a),r},Jt=function(){function e(e){var t=this.element=Xt(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}Ft(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),Zt=function(){function e(e){var t=this.element=Xt(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),en=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),tn=It,nn={isServer:!It,useCSSOMInjection:!$t},rn=function(){function e(e,t,n){void 0===e&&(e=Rt),void 0===t&&(t={}),this.options=Tt({},nn,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&It&&tn&&(tn=!1,function(e){for(var t=document.querySelectorAll(qt),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(Mt)&&(Qt(e,o),o.parentNode&&o.parentNode.removeChild(o))}}(this))}e.registerId=function(e){return Wt(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(Tt({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new en(o):r?new Jt(o):new Zt(o),new Dt(e)));var e,t,n,r,o},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(Wt(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Wt(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(Wt(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var a=Ht(o);if(void 0!==a){var i=e.names.get(a),s=t.getGroup(o);if(i&&s&&i.size){var l=Mt+".g"+o+'[id="'+a+'"]',c="";void 0!==i&&i.forEach((function(e){e.length>0&&(c+=e+",")})),r+=""+s+l+'{content:"'+c+'"}/*!sc*/\n'}}}return r}(this)},e}(),on=/(a)(d)/gi,an=function(e){return String.fromCharCode(e+(e>25?39:97))};function sn(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=an(t%52)+n;return(an(t%52)+n).replace(on,"$1-$2")}var ln=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},cn=function(e){return ln(5381,e)};function un(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(_t(n)&&!zt(n))return!1}return!0}var dn=cn("5.3.11"),pn=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&un(e),this.componentId=t,this.baseHash=ln(dn,t),this.baseStyle=n,rn.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else{var a=Nn(this.rules,e,t,n).join(""),i=sn(ln(this.baseHash,a)>>>0);if(!t.hasNameForId(r,i)){var s=n(a,"."+i,void 0,r);t.insertRules(r,i,s)}o.push(i),this.staticRulesId=i}else{for(var l=this.rules.length,c=ln(this.baseHash,n.hash),u="",d=0;d<l;d++){var p=this.rules[d];if("string"==typeof p)u+=p;else if(p){var f=Nn(p,e,t,n),m=Array.isArray(f)?f.join(""):f;c=ln(c,m+d),u+=m}}if(u){var h=sn(c>>>0);if(!t.hasNameForId(r,h)){var g=n(u,"."+h,void 0,r);t.insertRules(r,h,g)}o.push(h)}}return o.join(" ")},e}(),fn=/^\s*\/\/.*$/gm,mn=[":","[",".","#"];function hn(e){var t,n,r,o,a=void 0===e?Rt:e,i=a.options,s=void 0===i?Rt:i,l=a.plugins,c=void 0===l?Nt:l,u=new xt(s),d=[],p=function(e){function t(t){if(t)try{e(t+"}")}catch(e){}}return function(n,r,o,a,i,s,l,c,u,d){switch(n){case 1:if(0===u&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===c)return r+"/*|*/";break;case 3:switch(c){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t)}}}((function(e){d.push(e)})),f=function(e,r,a){return 0===r&&-1!==mn.indexOf(a[n.length])||a.match(o)?e:"."+t};function m(e,a,i,s){void 0===s&&(s="&");var l=e.replace(fn,""),c=a&&i?i+" "+a+" { "+l+" }":l;return t=s,n=a,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),u(i||!a?"":a,c)}return u.use([].concat(c,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,f))},p,function(e){if(-2===e){var t=d;return d=[],t}}])),m.hash=c.length?c.reduce((function(e,t){return t.name||Ft(15),ln(e,t.name)}),5381).toString():"",m}var gn=r.createContext(),vn=(gn.Consumer,r.createContext()),bn=(vn.Consumer,new rn),yn=hn();function xn(){return(0,r.useContext)(gn)||bn}function wn(){return(0,r.useContext)(vn)||yn}function Sn(e){var t=(0,r.useState)(e.stylisPlugins),n=t[0],o=t[1],a=xn(),i=(0,r.useMemo)((function(){var t=a;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target]),s=(0,r.useMemo)((function(){return hn({options:{prefix:!e.disableVendorPrefixes},plugins:n})}),[e.disableVendorPrefixes,n]);return(0,r.useEffect)((function(){yt()(n,e.stylisPlugins)||o(e.stylisPlugins)}),[e.stylisPlugins]),r.createElement(gn.Provider,{value:i},r.createElement(vn.Provider,{value:s},e.children))}var kn=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=yn);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return Ft(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=yn),this.name+e.hash},e}(),jn=/([A-Z])/,Cn=/([A-Z])/g,En=/^ms-/,Tn=function(e){return"-"+e.toLowerCase()};function Pn(e){return jn.test(e)?e.replace(Cn,Tn).replace(En,"-ms-"):e}var On=function(e){return null==e||!1===e||""===e};function Nn(e,t,n,r){if(Array.isArray(e)){for(var o,a=[],i=0,s=e.length;i<s;i+=1)""!==(o=Nn(e[i],t,n,r))&&(Array.isArray(o)?a.push.apply(a,o):a.push(o));return a}return On(e)?"":zt(e)?"."+e.styledComponentId:_t(e)?"function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!t?e:Nn(e(t),t,n,r):e instanceof kn?n?(e.inject(n,r),e.getName(r)):e:Ot(e)?function e(t,n){var r,o,a=[];for(var i in t)t.hasOwnProperty(i)&&!On(t[i])&&(Array.isArray(t[i])&&t[i].isCss||_t(t[i])?a.push(Pn(i)+":",t[i],";"):Ot(t[i])?a.push.apply(a,e(t[i],i)):a.push(Pn(i)+": "+(r=i,(null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in wt||r.startsWith("--")?String(o).trim():o+"px")+";")));return n?[n+" {"].concat(a,["}"]):a}(e):e.toString();var l}var Rn=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function _n(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return _t(e)||Ot(e)?Rn(Nn(Pt(Nt,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:Rn(Nn(Pt(e,n)))}new Set;var An=function(e,t,n){return void 0===n&&(n=Rt),e.theme!==n.theme&&e.theme||t||n.theme},zn=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Mn=/(^-|-$)/g;function In(e){return e.replace(zn,"-").replace(Mn,"")}var $n=function(e){return sn(cn(e)>>>0)};function Fn(e){return"string"==typeof e&&!0}var Dn=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Ln=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Bn(e,t,n){var r=e[n];Dn(t)&&Dn(r)?Un(r,t):e[n]=t}function Un(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,a=n;o<a.length;o++){var i=a[o];if(Dn(i))for(var s in i)Ln(s)&&Bn(e,i[s],s)}return e}var Wn=r.createContext();Wn.Consumer;var Hn={};function Vn(e,t,n){var o=zt(e),a=!Fn(e),i=t.attrs,s=void 0===i?Nt:i,l=t.componentId,c=void 0===l?function(e,t){var n="string"!=typeof e?"sc":In(e);Hn[n]=(Hn[n]||0)+1;var r=n+"-"+$n("5.3.11"+n+Hn[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):l,u=t.displayName,d=void 0===u?function(e){return Fn(e)?"styled."+e:"Styled("+At(e)+")"}(e):u,p=t.displayName&&t.componentId?In(t.displayName)+"-"+t.componentId:t.componentId||c,f=o&&e.attrs?Array.prototype.concat(e.attrs,s).filter(Boolean):s,m=t.shouldForwardProp;o&&e.shouldForwardProp&&(m=t.shouldForwardProp?function(n,r,o){return e.shouldForwardProp(n,r,o)&&t.shouldForwardProp(n,r,o)}:e.shouldForwardProp);var h,g=new pn(n,p,o?e.componentStyle:void 0),v=g.isStatic&&0===s.length,b=function(e,t){return function(e,t,n,o){var a=e.attrs,i=e.componentStyle,s=e.defaultProps,l=e.foldedComponentIds,c=e.shouldForwardProp,u=e.styledComponentId,d=e.target,p=function(e,t,n){void 0===e&&(e=Rt);var r=Tt({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,a,i=e;for(t in _t(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],a=i[t],n&&a?n+" "+a:n||a):i[t]})),[r,o]}(An(t,(0,r.useContext)(Wn),s)||Rt,t,a),f=p[0],m=p[1],h=function(e,t,n){var r=xn(),o=wn();return t?e.generateAndInjectStyles(Rt,r,o):e.generateAndInjectStyles(n,r,o)}(i,o,f),g=n,v=m.$as||t.$as||m.as||t.as||d,b=Fn(v),y=m!==t?Tt({},t,{},m):t,x={};for(var w in y)"$"!==w[0]&&"as"!==w&&("forwardedAs"===w?x.as=y[w]:(c?c(w,jt,v):!b||jt(w))&&(x[w]=y[w]));return t.style&&m.style!==t.style&&(x.style=Tt({},t.style,{},m.style)),x.className=Array.prototype.concat(l,u,h!==u?h:null,t.className,m.className).filter(Boolean).join(" "),x.ref=g,(0,r.createElement)(v,x)}(h,e,t,v)};return b.displayName=d,(h=r.forwardRef(b)).attrs=f,h.componentStyle=g,h.displayName=d,h.shouldForwardProp=m,h.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):Nt,h.styledComponentId=p,h.target=o?e.target:e,h.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),a=r&&r+"-"+(Fn(e)?e:In(At(e)));return Vn(e,Tt({},o,{attrs:f,componentId:a}),n)},Object.defineProperty(h,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?Un({},e.defaultProps,t):t}}),Object.defineProperty(h,"toString",{value:function(){return"."+h.styledComponentId}}),a&&Et()(h,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),h}var qn=function(e){return function e(t,n,r){if(void 0===r&&(r=Rt),!(0,vt.Hy)(n))return Ft(1,String(n));var o=function(){return t(n,r,_n.apply(void 0,arguments))};return o.withConfig=function(o){return e(t,n,Tt({},r,{},o))},o.attrs=function(o){return e(t,n,Tt({},r,{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},o}(Vn,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){qn[e]=qn(e)}));!function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=un(e),rn.registerId(this.componentId+1)}var t=e.prototype;t.createStyles=function(e,t,n,r){var o=r(Nn(this.rules,t,n,r).join(""),""),a=this.componentId+e;n.insertRules(a,a,o)},t.removeStyles=function(e,t){t.clearRules(this.componentId+e)},t.renderStyles=function(e,t,n,r){e>2&&rn.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)}}();!function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Yt();return"<style "+[n&&'nonce="'+n+'"',Mt+'="true"','data-styled-version="5.3.11"'].filter(Boolean).join(" ")+">"+t+"</style>"},this.getStyleTags=function(){return e.sealed?Ft(2):e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)return Ft(2);var n=((t={})[Mt]="",t["data-styled-version"]="5.3.11",t.dangerouslySetInnerHTML={__html:e.instance.toString()},t),o=Yt();return o&&(n.nonce=o),[r.createElement("style",Tt({},n,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new rn({isServer:!0}),this.sealed=!1}var t=e.prototype;t.collectStyles=function(e){return this.sealed?Ft(2):r.createElement(Sn,{sheet:this.instance},e)},t.interleaveWithNodeStream=function(e){return Ft(3)}}();const Kn=qn;var Gn=n(473),Qn=Object.defineProperty,Yn=(e,t,n)=>((e,t,n)=>t in e?Qn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!==typeof t?t+"":t,n),Xn=new Map,Jn=new WeakMap,Zn=0,er=void 0;function tr(e){return Object.keys(e).sort().filter((t=>void 0!==e[t])).map((t=>`${t}_${"root"===t?function(e){return e?(Jn.has(e)||(Zn+=1,Jn.set(e,Zn.toString())),Jn.get(e)):"0"}(e.root):e[t]}`)).toString()}function nr(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:er;if("undefined"===typeof window.IntersectionObserver&&void 0!==r){const o=e.getBoundingClientRect();return t(r,{isIntersecting:r,target:e,intersectionRatio:"number"===typeof n.threshold?n.threshold:0,time:0,boundingClientRect:o,intersectionRect:o,rootBounds:o}),()=>{}}const{id:o,observer:a,elements:i}=function(e){const t=tr(e);let n=Xn.get(t);if(!n){const r=new Map;let o;const a=new IntersectionObserver((t=>{t.forEach((t=>{var n;const a=t.isIntersecting&&o.some((e=>t.intersectionRatio>=e));e.trackVisibility&&"undefined"===typeof t.isVisible&&(t.isVisible=a),null==(n=r.get(t.target))||n.forEach((e=>{e(a,t)}))}))}),e);o=a.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:t,observer:a,elements:r},Xn.set(t,n)}return n}(n),s=i.get(e)||[];return i.has(e)||i.set(e,s),s.push(t),a.observe(e),function(){s.splice(s.indexOf(t),1),0===s.length&&(i.delete(e),a.unobserve(e)),0===i.size&&(a.disconnect(),Xn.delete(o))}}r.Component;function rr(){let{threshold:e,delay:t,trackVisibility:n,rootMargin:o,root:a,triggerOnce:i,skip:s,initialInView:l,fallbackInView:c,onChange:u}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var d;const[p,f]=r.useState(null),m=r.useRef(u),[h,g]=r.useState({inView:!!l,entry:void 0});m.current=u,r.useEffect((()=>{if(s||!p)return;let r;return r=nr(p,((e,t)=>{g({inView:e,entry:t}),m.current&&m.current(e,t),t.isIntersecting&&i&&r&&(r(),r=void 0)}),{root:a,rootMargin:o,threshold:e,trackVisibility:n,delay:t},c),()=>{r&&r()}}),[Array.isArray(e)?e.toString():e,p,a,o,i,s,n,c,t]);const v=null==(d=h.entry)?void 0:d.target,b=r.useRef(void 0);p||!v||i||s||b.current===v||(b.current=v,g({inView:!!l,entry:void 0}));const y=[f,h.inView,h.entry];return y.ref=y[0],y.inView=y[1],y.entry=y[2],y}var or=n(950),ar=n.t(or,2);function ir(){return ir=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ir.apply(this,arguments)}function sr(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const lr=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"];try{window.__reactRouterVersion="6"}catch(we){}new Map;const cr=o.startTransition;ar.flushSync,o.useId;function ur(e){let{basename:t,children:n,future:o,window:a}=e,i=r.useRef();var s;null==i.current&&(i.current=(void 0===(s={window:a,v5Compat:!0})&&(s={}),m((function(e,t){let{pathname:n,search:r,hash:o}=e.location;return d("",{pathname:n,search:r,hash:o},t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"===typeof t?t:p(t)}),null,s)));let l=i.current,[c,u]=r.useState({action:l.action,location:l.location}),{v7_startTransition:f}=o||{},h=r.useCallback((e=>{f&&cr?cr((()=>u(e))):u(e)}),[u,f]);return r.useLayoutEffect((()=>l.listen(h)),[l,h]),r.useEffect((()=>me(o)),[o]),r.createElement(be,{basename:t,children:n,location:c.location,navigationType:c.action,navigator:l,future:o})}const dr="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,pr=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,fr=r.forwardRef((function(e,t){let n,{onClick:o,relative:a,reloadDocument:i,replace:s,state:c,target:u,to:d,preventScrollReset:f,viewTransition:m}=e,h=sr(e,lr),{basename:g}=r.useContext(q),v=!1;if("string"===typeof d&&pr.test(d)&&(n=d,dr))try{let e=new URL(window.location.href),t=d.startsWith("//")?new URL(e.protocol+d):new URL(d),n=R(t.pathname,g);t.origin===e.origin&&null!=n?d=n+t.search+t.hash:v=!0}catch(we){}let b=function(e,t){let{relative:n}=void 0===t?{}:t;Y()||l(!1);let{basename:o,navigator:a}=r.useContext(q),{hash:i,pathname:s,search:c}=te(e,{relative:n}),u=s;return"/"!==o&&(u="/"===s?o:I([o,s])),a.createHref({pathname:u,search:c,hash:i})}(d,{relative:a}),y=function(e,t){let{target:n,replace:o,state:a,preventScrollReset:i,relative:s,viewTransition:l}=void 0===t?{}:t,c=Z(),u=X(),d=te(e,{relative:s});return r.useCallback((t=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(t,n)){t.preventDefault();let n=void 0!==o?o:p(u)===p(d);c(e,{replace:n,state:a,preventScrollReset:i,relative:s,viewTransition:l})}}),[u,c,d,o,a,n,e,i,s,l])}(d,{replace:s,state:c,target:u,preventScrollReset:f,relative:a,viewTransition:m});return r.createElement("a",ir({},h,{href:n||b,onClick:v||i?o:function(e){o&&o(e),e.defaultPrevented||y(e)},ref:t,target:u}))}));var mr,hr;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(mr||(mr={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(hr||(hr={}));function gr(e,t){return function(){return e.apply(t,arguments)}}const{toString:vr}=Object.prototype,{getPrototypeOf:br}=Object,yr=(xr=Object.create(null),e=>{const t=vr.call(e);return xr[t]||(xr[t]=t.slice(8,-1).toLowerCase())});var xr;const wr=e=>(e=e.toLowerCase(),t=>yr(t)===e),Sr=e=>t=>typeof t===e,{isArray:kr}=Array,jr=Sr("undefined");const Cr=wr("ArrayBuffer");const Er=Sr("string"),Tr=Sr("function"),Pr=Sr("number"),Or=e=>null!==e&&"object"===typeof e,Nr=e=>{if("object"!==yr(e))return!1;const t=br(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Rr=wr("Date"),_r=wr("File"),Ar=wr("Blob"),zr=wr("FileList"),Mr=wr("URLSearchParams"),[Ir,$r,Fr,Dr]=["ReadableStream","Request","Response","Headers"].map(wr);function Lr(e,t){let n,r,{allOwnKeys:o=!1}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),kr(e))for(n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else{const r=o?Object.getOwnPropertyNames(e):Object.keys(e),a=r.length;let i;for(n=0;n<a;n++)i=r[n],t.call(null,e[i],i,e)}}function Br(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const Ur="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:global,Wr=e=>!jr(e)&&e!==Ur;const Hr=(Vr="undefined"!==typeof Uint8Array&&br(Uint8Array),e=>Vr&&e instanceof Vr);var Vr;const qr=wr("HTMLFormElement"),Kr=(e=>{let{hasOwnProperty:t}=e;return(e,n)=>t.call(e,n)})(Object.prototype),Gr=wr("RegExp"),Qr=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Lr(n,((n,o)=>{let a;!1!==(a=t(n,o,e))&&(r[o]=a||n)})),Object.defineProperties(e,r)};const Yr=wr("AsyncFunction"),Xr=(Jr="function"===typeof setImmediate,Zr=Tr(Ur.postMessage),Jr?setImmediate:Zr?((e,t)=>(Ur.addEventListener("message",(n=>{let{source:r,data:o}=n;r===Ur&&o===e&&t.length&&t.shift()()}),!1),n=>{t.push(n),Ur.postMessage(e,"*")}))(`axios@${Math.random()}`,[]):e=>setTimeout(e));var Jr,Zr;const eo="undefined"!==typeof queueMicrotask?queueMicrotask.bind(Ur):"undefined"!==typeof process&&process.nextTick||Xr,to={isArray:kr,isArrayBuffer:Cr,isBuffer:function(e){return null!==e&&!jr(e)&&null!==e.constructor&&!jr(e.constructor)&&Tr(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"===typeof FormData&&e instanceof FormData||Tr(e.append)&&("formdata"===(t=yr(e))||"object"===t&&Tr(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&Cr(e.buffer),t},isString:Er,isNumber:Pr,isBoolean:e=>!0===e||!1===e,isObject:Or,isPlainObject:Nr,isReadableStream:Ir,isRequest:$r,isResponse:Fr,isHeaders:Dr,isUndefined:jr,isDate:Rr,isFile:_r,isBlob:Ar,isRegExp:Gr,isFunction:Tr,isStream:e=>Or(e)&&Tr(e.pipe),isURLSearchParams:Mr,isTypedArray:Hr,isFileList:zr,forEach:Lr,merge:function e(){const{caseless:t}=Wr(this)&&this||{},n={},r=(r,o)=>{const a=t&&Br(n,o)||o;Nr(n[a])&&Nr(r)?n[a]=e(n[a],r):Nr(r)?n[a]=e({},r):kr(r)?n[a]=r.slice():n[a]=r};for(let o=0,a=arguments.length;o<a;o++)arguments[o]&&Lr(arguments[o],r);return n},extend:function(e,t,n){let{allOwnKeys:r}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return Lr(t,((t,r)=>{n&&Tr(t)?e[r]=gr(t,n):e[r]=t}),{allOwnKeys:r}),e},trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let o,a,i;const s={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),a=o.length;a-- >0;)i=o[a],r&&!r(i,e,t)||s[i]||(t[i]=e[i],s[i]=!0);e=!1!==n&&br(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:yr,kindOfTest:wr,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(kr(e))return e;let t=e.length;if(!Pr(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:qr,hasOwnProperty:Kr,hasOwnProp:Kr,reduceDescriptors:Qr,freezeMethods:e=>{Qr(e,((t,n)=>{if(Tr(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];Tr(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return kr(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>null!=e&&Number.isFinite(e=+e)?e:t,findKey:Br,global:Ur,isContextDefined:Wr,isSpecCompliantForm:function(e){return!!(e&&Tr(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(Or(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=kr(e)?[]:{};return Lr(e,((e,t)=>{const a=n(e,r+1);!jr(a)&&(o[t]=a)})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:Yr,isThenable:e=>e&&(Or(e)||Tr(e))&&Tr(e.then)&&Tr(e.catch),setImmediate:Xr,asap:eo};function no(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o,this.status=o.status?o.status:null)}to.inherits(no,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:to.toJSONObject(this.config),code:this.code,status:this.status}}});const ro=no.prototype,oo={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{oo[e]={value:e}})),Object.defineProperties(no,oo),Object.defineProperty(ro,"isAxiosError",{value:!0}),no.from=(e,t,n,r,o,a)=>{const i=Object.create(ro);return to.toFlatObject(e,i,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),no.call(i,e.message,t,n,r,o),i.cause=e,i.name=e.name,a&&Object.assign(i,a),i};const ao=no;function io(e){return to.isPlainObject(e)||to.isArray(e)}function so(e){return to.endsWith(e,"[]")?e.slice(0,-2):e}function lo(e,t,n){return e?e.concat(t).map((function(e,t){return e=so(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const co=to.toFlatObject(to,{},null,(function(e){return/^is[A-Z]/.test(e)}));const uo=function(e,t,n){if(!to.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=to.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!to.isUndefined(t[e])}))).metaTokens,o=n.visitor||c,a=n.dots,i=n.indexes,s=(n.Blob||"undefined"!==typeof Blob&&Blob)&&to.isSpecCompliantForm(t);if(!to.isFunction(o))throw new TypeError("visitor must be a function");function l(e){if(null===e)return"";if(to.isDate(e))return e.toISOString();if(!s&&to.isBlob(e))throw new ao("Blob is not supported. Use a Buffer instead.");return to.isArrayBuffer(e)||to.isTypedArray(e)?s&&"function"===typeof Blob?new Blob([e]):Buffer.from(e):e}function c(e,n,o){let s=e;if(e&&!o&&"object"===typeof e)if(to.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(to.isArray(e)&&function(e){return to.isArray(e)&&!e.some(io)}(e)||(to.isFileList(e)||to.endsWith(n,"[]"))&&(s=to.toArray(e)))return n=so(n),s.forEach((function(e,r){!to.isUndefined(e)&&null!==e&&t.append(!0===i?lo([n],r,a):null===i?n:n+"[]",l(e))})),!1;return!!io(e)||(t.append(lo(o,n,a),l(e)),!1)}const u=[],d=Object.assign(co,{defaultVisitor:c,convertValue:l,isVisitable:io});if(!to.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!to.isUndefined(n)){if(-1!==u.indexOf(n))throw Error("Circular reference detected in "+r.join("."));u.push(n),to.forEach(n,(function(n,a){!0===(!(to.isUndefined(n)||null===n)&&o.call(t,n,to.isString(a)?a.trim():a,r,d))&&e(n,r?r.concat(a):[a])})),u.pop()}}(e),t};function po(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function fo(e,t){this._pairs=[],e&&uo(e,this,t)}const mo=fo.prototype;mo.append=function(e,t){this._pairs.push([e,t])},mo.toString=function(e){const t=e?function(t){return e.call(this,t,po)}:po;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const ho=fo;function go(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function vo(e,t,n){if(!t)return e;const r=n&&n.encode||go;to.isFunction(n)&&(n={serialize:n});const o=n&&n.serialize;let a;if(a=o?o(t,n):to.isURLSearchParams(t)?t.toString():new ho(t,n).toString(r),a){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}const bo=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){to.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},yo={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},xo={isBrowser:!0,classes:{URLSearchParams:"undefined"!==typeof URLSearchParams?URLSearchParams:ho,FormData:"undefined"!==typeof FormData?FormData:null,Blob:"undefined"!==typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},wo="undefined"!==typeof window&&"undefined"!==typeof document,So="object"===typeof navigator&&navigator||void 0,ko=wo&&(!So||["ReactNative","NativeScript","NS"].indexOf(So.product)<0),jo="undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"===typeof self.importScripts,Co=wo&&window.location.href||"http://localhost",Eo={...e,...xo};const To=function(e){function t(e,n,r,o){let a=e[o++];if("__proto__"===a)return!0;const i=Number.isFinite(+a),s=o>=e.length;if(a=!a&&to.isArray(r)?r.length:a,s)return to.hasOwnProp(r,a)?r[a]=[r[a],n]:r[a]=n,!i;r[a]&&to.isObject(r[a])||(r[a]=[]);return t(e,n,r[a],o)&&to.isArray(r[a])&&(r[a]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let a;for(r=0;r<o;r++)a=n[r],t[a]=e[a];return t}(r[a])),!i}if(to.isFormData(e)&&to.isFunction(e.entries)){const n={};return to.forEachEntry(e,((e,r)=>{t(function(e){return to.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null};const Po={transitional:yo,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=to.isObject(e);o&&to.isHTMLForm(e)&&(e=new FormData(e));if(to.isFormData(e))return r?JSON.stringify(To(e)):e;if(to.isArrayBuffer(e)||to.isBuffer(e)||to.isStream(e)||to.isFile(e)||to.isBlob(e)||to.isReadableStream(e))return e;if(to.isArrayBufferView(e))return e.buffer;if(to.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return uo(e,new Eo.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return Eo.isNode&&to.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((a=to.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return uo(a?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(to.isString(e))try{return(t||JSON.parse)(e),to.trim(e)}catch(we){if("SyntaxError"!==we.name)throw we}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||Po.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(to.isResponse(e)||to.isReadableStream(e))return e;if(e&&to.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(we){if(n){if("SyntaxError"===we.name)throw ao.from(we,ao.ERR_BAD_RESPONSE,this,null,this.response);throw we}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Eo.classes.FormData,Blob:Eo.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};to.forEach(["delete","get","head","post","put","patch"],(e=>{Po.headers[e]={}}));const Oo=Po,No=to.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ro=Symbol("internals");function _o(e){return e&&String(e).trim().toLowerCase()}function Ao(e){return!1===e||null==e?e:to.isArray(e)?e.map(Ao):String(e)}function zo(e,t,n,r,o){return to.isFunction(r)?r.call(this,t,n):(o&&(t=n),to.isString(t)?to.isString(r)?-1!==t.indexOf(r):to.isRegExp(r)?r.test(t):void 0:void 0)}class Mo{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function o(e,t,n){const o=_o(t);if(!o)throw new Error("header name must be a non-empty string");const a=to.findKey(r,o);(!a||void 0===r[a]||!0===n||void 0===n&&!1!==r[a])&&(r[a||t]=Ao(e))}const a=(e,t)=>to.forEach(e,((e,n)=>o(e,n,t)));if(to.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(to.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))a((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&No[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t);else if(to.isHeaders(e))for(const[i,s]of e.entries())o(s,i,n);else null!=e&&o(t,e,n);return this}get(e,t){if(e=_o(e)){const n=to.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(to.isFunction(t))return t.call(this,e,n);if(to.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=_o(e)){const n=to.findKey(this,e);return!(!n||void 0===this[n]||t&&!zo(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function o(e){if(e=_o(e)){const o=to.findKey(n,e);!o||t&&!zo(0,n[o],o,t)||(delete n[o],r=!0)}}return to.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!zo(0,this[o],o,e,!0)||(delete this[o],r=!0)}return r}normalize(e){const t=this,n={};return to.forEach(this,((r,o)=>{const a=to.findKey(n,o);if(a)return t[a]=Ao(r),void delete t[o];const i=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();i!==o&&delete t[o],t[i]=Ao(r),n[i]=!0})),this}concat(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.constructor.concat(this,...t)}toJSON(e){const t=Object.create(null);return to.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&to.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((e=>{let[t,n]=e;return t+": "+n})).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e){const t=new this(e);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.forEach((e=>t.set(e))),t}static accessor(e){const t=(this[Ro]=this[Ro]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=_o(e);t[r]||(!function(e,t){const n=to.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0})}))}(n,e),t[r]=!0)}return to.isArray(e)?e.forEach(r):r(e),this}}Mo.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),to.reduceDescriptors(Mo.prototype,((e,t)=>{let{value:n}=e,r=t[0].toUpperCase()+t.slice(1);return{get:()=>n,set(e){this[r]=e}}})),to.freezeMethods(Mo);const Io=Mo;function $o(e,t){const n=this||Oo,r=t||n,o=Io.from(r.headers);let a=r.data;return to.forEach(e,(function(e){a=e.call(n,a,o.normalize(),t?t.status:void 0)})),o.normalize(),a}function Fo(e){return!(!e||!e.__CANCEL__)}function Do(e,t,n){ao.call(this,null==e?"canceled":e,ao.ERR_CANCELED,t,n),this.name="CanceledError"}to.inherits(Do,ao,{__CANCEL__:!0});const Lo=Do;function Bo(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new ao("Request failed with status code "+n.status,[ao.ERR_BAD_REQUEST,ao.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}const Uo=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,a=0,i=0;return t=void 0!==t?t:1e3,function(s){const l=Date.now(),c=r[i];o||(o=l),n[a]=s,r[a]=l;let u=i,d=0;for(;u!==a;)d+=n[u++],u%=e;if(a=(a+1)%e,a===i&&(i=(i+1)%e),l-o<t)return;const p=c&&l-c;return p?Math.round(1e3*d/p):void 0}};const Wo=function(e,t){let n,r,o=0,a=1e3/t;const i=function(t){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Date.now();o=a,n=null,r&&(clearTimeout(r),r=null),e.apply(null,t)};return[function(){const e=Date.now(),t=e-o;for(var s=arguments.length,l=new Array(s),c=0;c<s;c++)l[c]=arguments[c];t>=a?i(l,e):(n=l,r||(r=setTimeout((()=>{r=null,i(n)}),a-t)))},()=>n&&i(n)]},Ho=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,r=0;const o=Uo(50,250);return Wo((n=>{const a=n.loaded,i=n.lengthComputable?n.total:void 0,s=a-r,l=o(s);r=a;e({loaded:a,total:i,progress:i?a/i:void 0,bytes:s,rate:l||void 0,estimated:l&&i&&a<=i?(i-a)/l:void 0,event:n,lengthComputable:null!=i,[t?"download":"upload"]:!0})}),n)},Vo=(e,t)=>{const n=null!=e;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},qo=e=>function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return to.asap((()=>e(...n)))},Ko=Eo.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Eo.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Eo.origin),Eo.navigator&&/(msie|trident)/i.test(Eo.navigator.userAgent)):()=>!0,Go=Eo.hasStandardBrowserEnv?{write(e,t,n,r,o,a){const i=[e+"="+encodeURIComponent(t)];to.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),to.isString(r)&&i.push("path="+r),to.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};function Qo(e,t,n){let r=!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);return e&&r||0==n?function(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const Yo=e=>e instanceof Io?{...e}:e;function Xo(e,t){t=t||{};const n={};function r(e,t,n,r){return to.isPlainObject(e)&&to.isPlainObject(t)?to.merge.call({caseless:r},e,t):to.isPlainObject(t)?to.merge({},t):to.isArray(t)?t.slice():t}function o(e,t,n,o){return to.isUndefined(t)?to.isUndefined(e)?void 0:r(void 0,e,0,o):r(e,t,0,o)}function a(e,t){if(!to.isUndefined(t))return r(void 0,t)}function i(e,t){return to.isUndefined(t)?to.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function s(n,o,a){return a in t?r(n,o):a in e?r(void 0,n):void 0}const l={url:a,method:a,data:a,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:s,headers:(e,t,n)=>o(Yo(e),Yo(t),0,!0)};return to.forEach(Object.keys(Object.assign({},e,t)),(function(r){const a=l[r]||o,i=a(e[r],t[r],r);to.isUndefined(i)&&a!==s||(n[r]=i)})),n}const Jo=e=>{const t=Xo({},e);let n,{data:r,withXSRFToken:o,xsrfHeaderName:a,xsrfCookieName:i,headers:s,auth:l}=t;if(t.headers=s=Io.from(s),t.url=vo(Qo(t.baseURL,t.url),e.params,e.paramsSerializer),l&&s.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),to.isFormData(r))if(Eo.hasStandardBrowserEnv||Eo.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(!1!==(n=s.getContentType())){const[e,...t]=n?n.split(";").map((e=>e.trim())).filter(Boolean):[];s.setContentType([e||"multipart/form-data",...t].join("; "))}if(Eo.hasStandardBrowserEnv&&(o&&to.isFunction(o)&&(o=o(t)),o||!1!==o&&Ko(t.url))){const e=a&&i&&Go.read(i);e&&s.set(a,e)}return t},Zo="undefined"!==typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){const r=Jo(e);let o=r.data;const a=Io.from(r.headers).normalize();let i,s,l,c,u,{responseType:d,onUploadProgress:p,onDownloadProgress:f}=r;function m(){c&&c(),u&&u(),r.cancelToken&&r.cancelToken.unsubscribe(i),r.signal&&r.signal.removeEventListener("abort",i)}let h=new XMLHttpRequest;function g(){if(!h)return;const r=Io.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders());Bo((function(e){t(e),m()}),(function(e){n(e),m()}),{data:d&&"text"!==d&&"json"!==d?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:r,config:e,request:h}),h=null}h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout,"onloadend"in h?h.onloadend=g:h.onreadystatechange=function(){h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))&&setTimeout(g)},h.onabort=function(){h&&(n(new ao("Request aborted",ao.ECONNABORTED,e,h)),h=null)},h.onerror=function(){n(new ao("Network Error",ao.ERR_NETWORK,e,h)),h=null},h.ontimeout=function(){let t=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const o=r.transitional||yo;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new ao(t,o.clarifyTimeoutError?ao.ETIMEDOUT:ao.ECONNABORTED,e,h)),h=null},void 0===o&&a.setContentType(null),"setRequestHeader"in h&&to.forEach(a.toJSON(),(function(e,t){h.setRequestHeader(t,e)})),to.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),d&&"json"!==d&&(h.responseType=r.responseType),f&&([l,u]=Ho(f,!0),h.addEventListener("progress",l)),p&&h.upload&&([s,c]=Ho(p),h.upload.addEventListener("progress",s),h.upload.addEventListener("loadend",c)),(r.cancelToken||r.signal)&&(i=t=>{h&&(n(!t||t.type?new Lo(null,e,h):t),h.abort(),h=null)},r.cancelToken&&r.cancelToken.subscribe(i),r.signal&&(r.signal.aborted?i():r.signal.addEventListener("abort",i)));const v=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(r.url);v&&-1===Eo.protocols.indexOf(v)?n(new ao("Unsupported protocol "+v+":",ao.ERR_BAD_REQUEST,e)):h.send(o||null)}))},ea=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let n,r=new AbortController;const o=function(e){if(!n){n=!0,i();const t=e instanceof Error?e:this.reason;r.abort(t instanceof ao?t:new Lo(t instanceof Error?t.message:t))}};let a=t&&setTimeout((()=>{a=null,o(new ao(`timeout ${t} of ms exceeded`,ao.ETIMEDOUT))}),t);const i=()=>{e&&(a&&clearTimeout(a),a=null,e.forEach((e=>{e.unsubscribe?e.unsubscribe(o):e.removeEventListener("abort",o)})),e=null)};e.forEach((e=>e.addEventListener("abort",o)));const{signal:s}=r;return s.unsubscribe=()=>to.asap(i),s}},ta=function*(e,t){let n=e.byteLength;if(!t||n<t)return void(yield e);let r,o=0;for(;o<n;)r=o+t,yield e.slice(o,r),o=r},na=async function*(e){if(e[Symbol.asyncIterator])return void(yield*e);const t=e.getReader();try{for(;;){const{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},ra=(e,t,n,r)=>{const o=async function*(e,t){for await(const n of na(e))yield*ta(n,t)}(e,t);let a,i=0,s=e=>{a||(a=!0,r&&r(e))};return new ReadableStream({async pull(e){try{const{done:t,value:r}=await o.next();if(t)return s(),void e.close();let a=r.byteLength;if(n){let e=i+=a;n(e)}e.enqueue(new Uint8Array(r))}catch(t){throw s(t),t}},cancel:e=>(s(e),o.return())},{highWaterMark:2})},oa="function"===typeof fetch&&"function"===typeof Request&&"function"===typeof Response,aa=oa&&"function"===typeof ReadableStream,ia=oa&&("function"===typeof TextEncoder?(sa=new TextEncoder,e=>sa.encode(e)):async e=>new Uint8Array(await new Response(e).arrayBuffer()));var sa;const la=function(e){try{for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return!!e(...n)}catch(we){return!1}},ca=aa&&la((()=>{let e=!1;const t=new Request(Eo.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t})),ua=aa&&la((()=>to.isReadableStream(new Response("").body))),da={stream:ua&&(e=>e.body)};var pa;oa&&(pa=new Response,["text","arrayBuffer","blob","formData","stream"].forEach((e=>{!da[e]&&(da[e]=to.isFunction(pa[e])?t=>t[e]():(t,n)=>{throw new ao(`Response type '${e}' is not supported`,ao.ERR_NOT_SUPPORT,n)})})));const fa=async(e,t)=>{const n=to.toFiniteNumber(e.getContentLength());return null==n?(async e=>{if(null==e)return 0;if(to.isBlob(e))return e.size;if(to.isSpecCompliantForm(e)){const t=new Request(Eo.origin,{method:"POST",body:e});return(await t.arrayBuffer()).byteLength}return to.isArrayBufferView(e)||to.isArrayBuffer(e)?e.byteLength:(to.isURLSearchParams(e)&&(e+=""),to.isString(e)?(await ia(e)).byteLength:void 0)})(t):n},ma=oa&&(async e=>{let{url:t,method:n,data:r,signal:o,cancelToken:a,timeout:i,onDownloadProgress:s,onUploadProgress:l,responseType:c,headers:u,withCredentials:d="same-origin",fetchOptions:p}=Jo(e);c=c?(c+"").toLowerCase():"text";let f,m=ea([o,a&&a.toAbortSignal()],i);const h=m&&m.unsubscribe&&(()=>{m.unsubscribe()});let g;try{if(l&&ca&&"get"!==n&&"head"!==n&&0!==(g=await fa(u,r))){let e,n=new Request(t,{method:"POST",body:r,duplex:"half"});if(to.isFormData(r)&&(e=n.headers.get("content-type"))&&u.setContentType(e),n.body){const[e,t]=Vo(g,Ho(qo(l)));r=ra(n.body,65536,e,t)}}to.isString(d)||(d=d?"include":"omit");const o="credentials"in Request.prototype;f=new Request(t,{...p,signal:m,method:n.toUpperCase(),headers:u.normalize().toJSON(),body:r,duplex:"half",credentials:o?d:void 0});let a=await fetch(f);const i=ua&&("stream"===c||"response"===c);if(ua&&(s||i&&h)){const e={};["status","statusText","headers"].forEach((t=>{e[t]=a[t]}));const t=to.toFiniteNumber(a.headers.get("content-length")),[n,r]=s&&Vo(t,Ho(qo(s),!0))||[];a=new Response(ra(a.body,65536,n,(()=>{r&&r(),h&&h()})),e)}c=c||"text";let v=await da[to.findKey(da,c)||"text"](a,e);return!i&&h&&h(),await new Promise(((t,n)=>{Bo(t,n,{data:v,headers:Io.from(a.headers),status:a.status,statusText:a.statusText,config:e,request:f})}))}catch(v){if(h&&h(),v&&"TypeError"===v.name&&/fetch/i.test(v.message))throw Object.assign(new ao("Network Error",ao.ERR_NETWORK,e,f),{cause:v.cause||v});throw ao.from(v,v&&v.code,e,f)}}),ha={http:null,xhr:Zo,fetch:ma};to.forEach(ha,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(we){}Object.defineProperty(e,"adapterName",{value:t})}}));const ga=e=>`- ${e}`,va=e=>to.isFunction(e)||null===e||!1===e,ba=e=>{e=to.isArray(e)?e:[e];const{length:t}=e;let n,r;const o={};for(let a=0;a<t;a++){let t;if(n=e[a],r=n,!va(n)&&(r=ha[(t=String(n)).toLowerCase()],void 0===r))throw new ao(`Unknown adapter '${t}'`);if(r)break;o[t||"#"+a]=r}if(!r){const e=Object.entries(o).map((e=>{let[t,n]=e;return`adapter ${t} `+(!1===n?"is not supported by the environment":"is not available in the build")}));let n=t?e.length>1?"since :\n"+e.map(ga).join("\n"):" "+ga(e[0]):"as no adapter specified";throw new ao("There is no suitable adapter to dispatch the request "+n,"ERR_NOT_SUPPORT")}return r};function ya(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Lo(null,e)}function xa(e){ya(e),e.headers=Io.from(e.headers),e.data=$o.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return ba(e.adapter||Oo.adapter)(e).then((function(t){return ya(e),t.data=$o.call(e,e.transformResponse,t),t.headers=Io.from(t.headers),t}),(function(t){return Fo(t)||(ya(e),t&&t.response&&(t.response.data=$o.call(e,e.transformResponse,t.response),t.response.headers=Io.from(t.response.headers))),Promise.reject(t)}))}const wa="1.8.1",Sa={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Sa[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const ka={};Sa.transitional=function(e,t,n){function r(e,t){return"[Axios v1.8.1] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,o,a)=>{if(!1===e)throw new ao(r(o," has been removed"+(t?" in "+t:"")),ao.ERR_DEPRECATED);return t&&!ka[o]&&(ka[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,a)}},Sa.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};const ja={assertOptions:function(e,t,n){if("object"!==typeof e)throw new ao("options must be an object",ao.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const a=r[o],i=t[a];if(i){const t=e[a],n=void 0===t||i(t,a,e);if(!0!==n)throw new ao("option "+a+" must be "+n,ao.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new ao("Unknown option "+a,ao.ERR_BAD_OPTION)}},validators:Sa},Ca=ja.validators;class Ea{constructor(e){this.defaults=e,this.interceptors={request:new bo,response:new bo}}async request(e,t){try{return await this._request(e,t)}catch(n){if(n instanceof Error){let e={};Error.captureStackTrace?Error.captureStackTrace(e):e=new Error;const t=e.stack?e.stack.replace(/^.+\n/,""):"";try{n.stack?t&&!String(n.stack).endsWith(t.replace(/^.+\n.+\n/,""))&&(n.stack+="\n"+t):n.stack=t}catch(we){}}throw n}}_request(e,t){"string"===typeof e?(t=t||{}).url=e:t=e||{},t=Xo(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;void 0!==n&&ja.assertOptions(n,{silentJSONParsing:Ca.transitional(Ca.boolean),forcedJSONParsing:Ca.transitional(Ca.boolean),clarifyTimeoutError:Ca.transitional(Ca.boolean)},!1),null!=r&&(to.isFunction(r)?t.paramsSerializer={serialize:r}:ja.assertOptions(r,{encode:Ca.function,serialize:Ca.function},!0)),void 0!==t.allowAbsoluteUrls||(void 0!==this.defaults.allowAbsoluteUrls?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),ja.assertOptions(t,{baseUrl:Ca.spelling("baseURL"),withXsrfToken:Ca.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let a=o&&to.merge(o.common,o[t.method]);o&&to.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=Io.concat(a,o);const i=[];let s=!0;this.interceptors.request.forEach((function(e){"function"===typeof e.runWhen&&!1===e.runWhen(t)||(s=s&&e.synchronous,i.unshift(e.fulfilled,e.rejected))}));const l=[];let c;this.interceptors.response.forEach((function(e){l.push(e.fulfilled,e.rejected)}));let u,d=0;if(!s){const e=[xa.bind(this),void 0];for(e.unshift.apply(e,i),e.push.apply(e,l),u=e.length,c=Promise.resolve(t);d<u;)c=c.then(e[d++],e[d++]);return c}u=i.length;let p=t;for(d=0;d<u;){const e=i[d++],t=i[d++];try{p=e(p)}catch(f){t.call(this,f);break}}try{c=xa.call(this,p)}catch(f){return Promise.reject(f)}for(d=0,u=l.length;d<u;)c=c.then(l[d++],l[d++]);return c}getUri(e){return vo(Qo((e=Xo(this.defaults,e)).baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}}to.forEach(["delete","get","head","options"],(function(e){Ea.prototype[e]=function(t,n){return this.request(Xo(n||{},{method:e,url:t,data:(n||{}).data}))}})),to.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(Xo(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Ea.prototype[e]=t(),Ea.prototype[e+"Form"]=t(!0)}));const Ta=Ea;class Pa{constructor(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,o){n.reason||(n.reason=new Lo(e,r,o),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new Pa((function(t){e=t})),cancel:e}}}const Oa=Pa;const Na={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Na).forEach((e=>{let[t,n]=e;Na[n]=t}));const Ra=Na;const _a=function e(t){const n=new Ta(t),r=gr(Ta.prototype.request,n);return to.extend(r,Ta.prototype,n,{allOwnKeys:!0}),to.extend(r,n,null,{allOwnKeys:!0}),r.create=function(n){return e(Xo(t,n))},r}(Oo);_a.Axios=Ta,_a.CanceledError=Lo,_a.CancelToken=Oa,_a.isCancel=Fo,_a.VERSION=wa,_a.toFormData=uo,_a.AxiosError=ao,_a.Cancel=_a.CanceledError,_a.all=function(e){return Promise.all(e)},_a.spread=function(e){return function(t){return e.apply(null,t)}},_a.isAxiosError=function(e){return to.isObject(e)&&!0===e.isAxiosError},_a.mergeConfig=Xo,_a.AxiosHeaders=Io,_a.formToJSON=e=>To(to.isHTMLForm(e)?new FormData(e):e),_a.getAdapter=ba,_a.HttpStatusCode=Ra,_a.default=_a;const Aa=_a,za={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_API_URL||"http://localhost:8000/api/",Ma=Aa.create({baseURL:za,headers:{"Content-Type":"application/json"}});Ma.interceptors.request.use((e=>{const t=JSON.parse(localStorage.getItem("user"));return t&&t.accessToken?(e.headers.Authorization=`Bearer ${t.accessToken}`,console.log("Adicionando token \xe0 requisi\xe7\xe3o:",e.url)):console.log("Requisi\xe7\xe3o sem token:",e.url),e}),(e=>Promise.reject(e))),Ma.interceptors.response.use((e=>e),(async e=>{var t;const n=e.config;if(401===(null===(t=e.response)||void 0===t?void 0:t.status)&&!n._retry){n._retry=!0;try{const e=await Fa.refreshToken();if(e)return n.headers.Authorization=`Bearer ${e.accessToken}`,Ma(n)}catch(r){return Fa.logout(),window.location.href="/login",Promise.reject(r)}}return Promise.reject(e)}));const Ia=Ma,$a={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_API_URL||("localhost"===window.location.hostname?"http://localhost:8000/api/":"/api/");const Fa=new class{async login(e,t){try{console.log("\n=== INICIANDO LOGIN ==="),console.log("\ud83d\udce4 Enviando requisi\xe7\xe3o para:","auth/signin"),console.log("Dados enviados:",{email:e,passwordLength:(null===t||void 0===t?void 0:t.length)||0});const n=await Ia.post("auth/signin",{email:e,password:t});if(console.log("\n\ud83d\udce5 Resposta recebida:"),console.log("Status:",n.status),console.log("Headers:",n.headers),console.log("Dados:",{...n.data,accessToken:n.data.accessToken?"[PRESENTE]":"[AUSENTE]"}),!n.data.success||!n.data.accessToken)throw console.error("\u274c Resposta inv\xe1lida:",n.data),new Error(n.data.message||"Resposta inv\xe1lida do servidor");const r={...n.data,tipo:n.data.tipo||"cliente",accessToken:n.data.accessToken,id:n.data.id};return console.log("\n\ud83d\udcbe Salvando dados do usu\xe1rio:",{...r,accessToken:"[PRESENTE]"}),localStorage.setItem("user",JSON.stringify(r)),r}catch(i){var n,r,o,a;throw console.error("\n\u274c Erro no login:"),console.error("Status:",null===(n=i.response)||void 0===n?void 0:n.status),console.error("Dados do erro:",null===(r=i.response)||void 0===r?void 0:r.data),console.error("Mensagem:",i.message),console.error("Stack:",i.stack),new Error((null===(o=i.response)||void 0===o||null===(a=o.data)||void 0===a?void 0:a.message)||i.message||"Erro ao realizar login")}}logout(){localStorage.removeItem("user"),window.location.href="/login"}async register(e,t,n,r,o){let a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};try{console.log(`Tentando registro em ${$a}auth/signup`),console.log("Dados a enviar:",{nome:n,email:e,senha:t,telefone:r,tipo:o,...a});const i={timeout:1e4},s={nome:n,email:e,senha:t,telefone:r,tipo:o,...a};return console.log("Dados completos a enviar:",s),await Ia.post("auth/signup",s,i)}catch(i){throw console.error("Service: erro no registro",i),"ERR_NETWORK"===i.code&&console.error("Detalhes do erro de rede:",{message:i.message,url:$a+"signup",serverStatus:"N\xe3o respondendo ou inacess\xedvel"}),i}}getCurrentUser(){const e=localStorage.getItem("user");if(!e)return null;try{const t=JSON.parse(e);return t.accessToken?t:(console.error("Token n\xe3o encontrado no objeto do usu\xe1rio"),this.logout(),null)}catch(t){return console.error("Erro ao analisar dados do usu\xe1rio:",t),this.logout(),null}}isAuthenticated(){const e=this.getCurrentUser();return!!e&&!!e.accessToken}isAdmin(){const e=this.getCurrentUser();return!!e&&e.roles&&e.roles.includes("ROLE_ADMIN")}hasRole(e){const t=this.getCurrentUser();return!!(t&&t.user&&t.user.tipoUtilizador)&&t.user.tipoUtilizador.nome===e}getToken(){const e=this.getCurrentUser();return null===e||void 0===e?void 0:e.accessToken}async refreshToken(){const e=this.getCurrentUser();if(null===e||void 0===e||!e.refreshToken)return null;try{const t=await Ia.post("auth/refresh-token",{refreshToken:e.refreshToken});if(t.data.accessToken){const n={...e,accessToken:t.data.accessToken};return localStorage.setItem("user",JSON.stringify(n)),n}return null}catch(t){return console.error("Erro ao renovar token:",t),null}}decodeToken(e){try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join(""));return JSON.parse(n)}catch(t){return console.error("Erro ao decodificar token:",t),{}}}};var Da=n(579);const La=Kn.nav`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`,Ba=Kn.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
  flex: 0 0 auto; /* Não permite que o logo cresça ou encolha */

  @media (max-width: 768px) {
    text-align: center; /* Centraliza o texto em mobile */
    flex-grow: 1; /* Permite que o logo ocupe o espaço disponível em mobile */
  }
`,Ua=Kn.div`
  display: flex;
  gap: 1.5rem;
  flex-grow: 1; /* Permite que os links ocupem o espaço disponível */
  justify-content: center; /* Centraliza os links em telas maiores */

  @media (max-width: 768px) {
    display: none; /* Esconde os links em telas menores */
  }
`,Wa=Kn(fr)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`,Ha=Kn.div`
  display: flex;
  gap: 1rem;
`,Va=Kn.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &.login {
    background-color: #ffffff;
    color: #3498db;
    border: 1px solid #3498db;
  }

  &.register, &.logout {
    background-color: #3498db;
    color: #ffffff;
  }

  &:hover {
    opacity: 0.9;
  }
`,qa=Kn.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 4px 0;
    transition: 0.4s;
  }

  @media (max-width: 768px) {
    display: flex; /* Mostra o menu hambúrguer em telas menores */
  }
`,Ka=Kn.div`
  display: none; /* Esconde os links por padrão */

  @media (max-width: 768px) {
    display: flex; /* Mostra os links em mobile quando o menu está aberto */
    flex-direction: column;
    position: absolute;
    top: 60px; /* Ajuste conforme necessário */
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    z-index: 1;
  }
`;const Ga=function(){const[e,t]=(0,r.useState)(void 0),[n,o]=(0,r.useState)(!1),a=Z();(0,r.useEffect)((()=>{const e=Fa.getCurrentUser();if(e){console.log("Current user in Navbar:",e);const n=e=>{try{return JSON.parse(atob(e.split(".")[1]))}catch(we){return null}};if(e.accessToken){const t=n(e.accessToken);console.log("Token decodificado:",t),t&&t.role&&(e.role=t.role)}console.log("User ap\xf3s processamento:",e),t(e)}}),[]);const i=e=>(console.log("Checking if user is client:",e),!!e&&(e&&("cliente"===e.role||"cliente"===e.tipo||e.tipoUtilizador&&"cliente"===e.tipoUtilizador.nome||!0===e.isCliente))),s=e=>!!e&&("medico"===e.tipo||e.tipoUtilizador&&"medico"===e.tipoUtilizador.nome);return(0,Da.jsxs)(La,{children:[(0,Da.jsxs)(qa,{onClick:()=>{o(!n)},children:[(0,Da.jsx)("div",{}),(0,Da.jsx)("div",{}),(0,Da.jsx)("div",{})]}),(0,Da.jsx)(Ba,{children:"Cl\xednica Dent\xe1ria Viseense"}),(0,Da.jsxs)(Ua,{children:[(0,Da.jsx)(Wa,{to:"/",children:"In\xedcio"}),(0,Da.jsx)(Wa,{to:"/sobre",children:"Quem Somos"}),(0,Da.jsx)(Wa,{to:"/contactos",children:"Contactos"}),e&&("admin"===e.role||"admin"===e.tipo)&&(0,Da.jsx)(Wa,{to:"/dashboard",children:"Dashboard"}),i(e)&&(0,Da.jsx)(Wa,{to:"/cliente-dashboard",children:"\xc1rea do Cliente"}),s(e)&&(0,Da.jsx)(Wa,{to:"/medico",children:"Dashboard M\xe9dico"})]}),(0,Da.jsxs)(Ka,{style:{display:n?"flex":"none"},children:[(0,Da.jsx)(Wa,{to:"/",children:"In\xedcio"}),(0,Da.jsx)(Wa,{to:"/sobre",children:"Quem Somos"}),(0,Da.jsx)(Wa,{to:"/contactos",children:"Contactos"}),e&&("admin"===e.role||"admin"===e.tipo)&&(0,Da.jsx)(Wa,{to:"/dashboard",children:"Dashboard"}),i(e)&&(0,Da.jsx)(Wa,{to:"/cliente-dashboard",children:"\xc1rea do Cliente"}),s(e)&&(0,Da.jsx)(Wa,{to:"/medico",children:"Dashboard M\xe9dico"})]}),(0,Da.jsx)(Ha,{children:e?(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsxs)("span",{style:{marginRight:"10px",alignSelf:"center"},children:["Ol\xe1, ",e.username||e.nome]}),(0,Da.jsx)(Va,{className:"logout",onClick:()=>{Fa.logout(),t(void 0),a("/"),window.location.reload()},children:"Sair"})]}):(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Va,{className:"login",onClick:()=>a("/login"),children:"Login"}),(0,Da.jsx)(Va,{className:"register",onClick:()=>a("/register"),children:"Registar"})]})})]})},Qa=Kn.div`
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  position: relative;
  overflow: hidden;
`,Ya=Kn.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: inset 0 -10px 20px rgba(0, 0, 0, 0.1);
`,Xa=Kn.div`
  max-width: 800px;
  padding: 0 2rem;
  position: relative;
  opacity: 1;
  transition: opacity 1s ease;
`,Ja=Kn.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`,Za=Kn.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,ei=Kn.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`,ti=Kn.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &.primary {
    background-color: #3498db;
    color: #ffffff;

    &:hover {
      background-color: #2980b9;
    }
  }

  &.secondary {
    background-color: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`,ni=(Kn.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,Kn.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #333;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);

  h3 {
    margin-bottom: 15px;
    color: #3498db;
  }

  p {
    margin-bottom: 20px;
  }
`,Kn.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e74c3c;
  color: white;
  padding: 15px 30px;
  border-radius: 4px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1000;
`);const ri=function(){const e=Z(),[t,n]=(0,r.useState)("");return(0,Da.jsxs)(Qa,{children:[t&&(0,Da.jsx)(ni,{children:t}),(0,Da.jsx)(Ya,{}),(0,Da.jsxs)(Xa,{children:[(0,Da.jsx)(Ja,{children:"O Seu Sorriso Merece o Melhor Cuidado"}),(0,Da.jsx)(Za,{children:"Na Cl\xednica Dent\xe1ria Viseense, combinamos tecnologia avan\xe7ada e profissionais experientes para oferecer tratamentos de excel\xeancia para toda a fam\xedlia."}),(0,Da.jsxs)(ei,{children:[(0,Da.jsx)(ti,{className:"primary",onClick:()=>{try{const t=Fa.getCurrentUser();if(!t)return void e("/login");if(!t.tipo)return n("Erro ao verificar tipo de usu\xe1rio"),void setTimeout((()=>{n(""),e("/login")}),3e3);if("cliente"===t.tipo)return void e("/cliente-dashboard/agendamentos/novo-agendamento");n("Apenas clientes podem marcar consultas"),setTimeout((()=>{n(""),e("/register")}),3e3)}catch(t){console.error("Erro ao verificar usu\xe1rio:",t),n("Erro ao verificar usu\xe1rio. Por favor, fa\xe7a login novamente."),setTimeout((()=>{n(""),e("/login")}),3e3)}},children:"Marcar Consulta"}),(0,Da.jsx)(ti,{className:"secondary",onClick:()=>e("/sobre"),children:"Conhe\xe7a-nos Melhor"})]})]})]})},oi=Kn.section`
  padding: 5rem 2rem;
  background-color: #ffffff;
`,ai=Kn.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`,ii=Kn.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`,si=Kn.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`,li=Kn.div`
  opacity: ${e=>e.isVisible?1:0};
  transform: translateY(${e=>e.isVisible?0:30}px);
  transition: opacity 1s ease, transform 1s ease;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 1s ease;

  &:hover {
    transform: translateY(-10px);
  }
`,ci=Kn.div`
  font-size: 3rem;
  color: #3498db;
  padding: 2rem 0;
  text-align: center;
  background-color: #ecf0f1;
`,ui=Kn.div`
  padding: 1.5rem;
`,di=Kn.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`,pi=Kn.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`,fi=Kn(fr)`
  display: inline-block;
  color: #3498db;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #2980b9;
  }

  i {
    margin-left: 0.5rem;
  }
`;const mi=e=>{let{children:t}=e;const{ref:n,inView:o}=rr({threshold:.1,triggerOnce:!1});return(0,Da.jsx)("div",{ref:n,children:r.cloneElement(t,{isVisible:o})})},hi=function(){return(0,Da.jsxs)(oi,{children:[(0,Da.jsx)(ai,{children:"Nossos Servi\xe7os"}),(0,Da.jsx)(ii,{children:"Oferecemos uma ampla gama de tratamentos dent\xe1rios para cuidar da sa\xfade e est\xe9tica do seu sorriso."}),(0,Da.jsx)(si,{children:[{title:"Odontologia Geral",icon:"fas fa-tooth",description:"Tratamentos completos para manter a sua sa\xfade bucal em dia."},{title:"Ortodontia",icon:"fas fa-teeth",description:"Corre\xe7\xe3o do alinhamento dos dentes."},{title:"Implantes Dent\xe1rios",icon:"fas fa-teeth-open",description:"Substitua dentes perdidos com implantes."},{title:"Endodontia",icon:"fas fa-pump-medical",description:"Tratamento de canal especializado."},{title:"Est\xe9tica Dental",icon:"fas fa-smile",description:"Procedimentos para melhorar a apar\xeancia do seu sorriso."},{title:"Odontopediatria",icon:"fas fa-baby",description:"Cuidados dent\xe1rios especializados para crian\xe7as."}].map((e=>(0,Da.jsx)(mi,{children:(0,Da.jsxs)(li,{children:[(0,Da.jsx)(ci,{children:(0,Da.jsx)("i",{className:e.icon})}),(0,Da.jsxs)(ui,{children:[(0,Da.jsx)(di,{children:e.title}),(0,Da.jsx)(pi,{children:e.description}),(0,Da.jsxs)(fi,{to:`/servicos/${e.title.replace(/\s+/g,"-").toLowerCase()}`,children:["Saiba mais ",(0,Da.jsx)("i",{className:"fas fa-arrow-right"})]})]})]})},e.title)))})]})},gi=Kn.section`
  padding: 5rem 2rem;
  background-color: #ffffff;
`,vi=Kn.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
`,bi=Kn.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`,yi=Kn.div`
  opacity: ${e=>e.isVisible?1:0};
  transform: translateY(${e=>e.isVisible?0:30}px);
  transition: opacity 1s ease, transform 1s ease;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,xi=Kn.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`,wi=Kn.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  color: #34495e;
  line-height: 1.6;
`,Si=Kn.div`
  display: flex;
  align-items: center;
`,ki=Kn.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(\${props => props.image});
  background-size: cover;
  background-position: center;
  margin-right: 1rem;
`,ji=Kn.div`
  h4 {
    margin: 0;
    color: #2c3e50;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`,Ci=Kn.div`
  color: #f1c40f;
  margin-top: 0.5rem;
`;const Ei=e=>{let{children:t}=e;const{ref:n,inView:o}=rr({threshold:.3,triggerOnce:!1});return(0,Da.jsx)("div",{ref:n,children:r.cloneElement(t,{isVisible:o})})},Ti=function(){return(0,Da.jsxs)(gi,{children:[(0,Da.jsx)(vi,{children:"O Que Nossos Pacientes Dizem"}),(0,Da.jsx)(bi,{children:[{id:1,text:"Os profissionais da Cl\xednica Dent\xe1ria s\xe3o excepcionais! Trataram do meu medo de dentista com muita paci\xeancia e finalmente consegui fazer o tratamento que precisava h\xe1 anos.",author:"Maria Silva",role:"Professora",avatar:"https://randomuser.me/api/portraits/women/44.jpg",rating:5},{id:2,text:"Excelente atendimento e profissionais altamente qualificados. Fiz um implante e o resultado superou as minhas expectativas. Recomendo a todos!",author:"Jo\xe3o Santos",role:"Engenheiro",avatar:"https://randomuser.me/api/portraits/men/32.jpg",rating:5},{id:3,text:"Meus filhos adoram ir \xe0 Cl\xednica Dent\xe1ria. O ambiente \xe9 acolhedor e os dentistas sabem como lidar com crian\xe7as. Isso faz toda a diferen\xe7a!",author:"Ana Oliveira",role:"Contabilista",avatar:"https://randomuser.me/api/portraits/women/68.jpg",rating:4}].map((e=>(0,Da.jsx)(Ei,{children:(0,Da.jsxs)(yi,{isVisible:!0,children:[(0,Da.jsx)(xi,{children:e.author}),(0,Da.jsx)(wi,{children:e.text}),(0,Da.jsxs)(Si,{children:[(0,Da.jsx)(ki,{image:e.avatar}),(0,Da.jsxs)(ji,{children:[(0,Da.jsx)("h4",{children:e.author}),(0,Da.jsx)("p",{children:e.role}),(0,Da.jsx)(Ci,{children:[...Array(5)].map(((t,n)=>(0,Da.jsx)("i",{className:"fas fa-star"+(n>=e.rating?"-o":"")},n)))})]})]})]})},e.id)))})]})},Pi=Kn.footer`
  background-color: #2c3e50;
  color: #ffffff;
  padding: 3rem 0;
`,Oi=Kn.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`,Ni=Kn.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #3498db;
  }

  p {
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #3498db;
    }
  }
`,Ri=Kn.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: #34495e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3498db;
    }

    i {
      font-size: 1.2rem;
    }
  }
`,_i=Kn.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #34495e;
  font-size: 0.9rem;
`;const Ai=function(){return(0,Da.jsxs)(Pi,{children:[(0,Da.jsxs)(Oi,{children:[(0,Da.jsxs)(Ni,{children:[(0,Da.jsx)("h3",{children:"Cl\xednica Dent\xe1ria Viseense"}),(0,Da.jsx)("p",{children:"Oferecemos um atendimento personalizado e de qualidade, utilizando tecnologia de ponta para proporcionar o melhor tratamento dent\xe1rio."}),(0,Da.jsxs)(Ri,{children:[(0,Da.jsx)("a",{href:"#","aria-label":"Facebook",children:(0,Da.jsx)("i",{className:"fab fa-facebook-f"})}),(0,Da.jsx)("a",{href:"#","aria-label":"Instagram",children:(0,Da.jsx)("i",{className:"fab fa-instagram"})}),(0,Da.jsx)("a",{href:"#","aria-label":"Twitter",children:(0,Da.jsx)("i",{className:"fab fa-twitter"})}),(0,Da.jsx)("a",{href:"#","aria-label":"LinkedIn",children:(0,Da.jsx)("i",{className:"fab fa-linkedin-in"})})]})]}),(0,Da.jsxs)(Ni,{children:[(0,Da.jsx)("h3",{children:"Servi\xe7os"}),(0,Da.jsxs)("ul",{children:[(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Limpeza Dent\xe1ria"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Restaura\xe7\xf5es"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Endodontia"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Implantes"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Ortodontia"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Clareamento"})})]})]}),(0,Da.jsxs)(Ni,{children:[(0,Da.jsx)("h3",{children:"Links \xdateis"}),(0,Da.jsxs)("ul",{children:[(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"In\xedcio"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Quem Somos"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Servi\xe7os"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Contactos"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Pol\xedtica de Privacidade"})}),(0,Da.jsx)("li",{children:(0,Da.jsx)("a",{href:"#",children:"Termos e Condi\xe7\xf5es"})})]})]}),(0,Da.jsxs)(Ni,{children:[(0,Da.jsx)("h3",{children:"Contactos"}),(0,Da.jsxs)("p",{children:[(0,Da.jsx)("i",{className:"fas fa-map-marker-alt"})," Rua Direita, 12 - Viseu"]}),(0,Da.jsxs)("p",{children:[(0,Da.jsx)("i",{className:"fas fa-phone"})," +351 212 345 678"]}),(0,Da.jsxs)("p",{children:[(0,Da.jsx)("i",{className:"fas fa-envelope"})," info@clinicadentaria.pt"]}),(0,Da.jsxs)("p",{children:[(0,Da.jsx)("i",{className:"fas fa-clock"})," Seg-Sex: 9h-19h | S\xe1b: 9h-13h"]})]})]}),(0,Da.jsx)(_i,{children:(0,Da.jsxs)("p",{children:["\xa9 ",(new Date).getFullYear()," Cl\xednica Dent\xe1ria Viseense. Todos os direitos reservados."]})})]})},zi=Kn.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,Mi=Kn.div`
  opacity: ${e=>e.isVisible?1:0}; /* Controla a opacidade */
  transform: translateY(${e=>e.isVisible?0:-30}px); /* Controla a posição */
  transition: opacity 1s ease, transform 1s ease; /* Aumentando a duração da transição */
`,Ii=Kn.section`
  padding: 5rem 2rem;
  background-color: ${e=>e.bgColor||"#ffffff"};
  opacity: ${e=>e.isVisible?1:0}; /* Controla a opacidade */
  transform: translateY(${e=>e.isVisible?0:30}px); /* Controla a posição */
  transition: opacity 1s ease, transform 1s ease; /* Aumentando a duração da transição */
`,$i=Kn.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`,Fi=Kn.div`
  flex: 1;
`,Di=Kn.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`,Li=Kn.p`
  color: #7f8c8d;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`,Bi=Kn.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`,Ui=Kn.section`
  padding: 5rem 2rem;
  background-color: #3498db;
  color: #ffffff;
  text-align: center;
  opacity: ${e=>e.isVisible?1:0}; /* Controla a opacidade */
  transform: translateY(${e=>e.isVisible?0:30}px); /* Controla a posição */
  transition: opacity 1s ease, transform 1s ease; /* Animações lentas */
`,Wi=Kn.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`,Hi=Kn.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 2rem;
`,Vi=Kn.button`
  padding: 1rem 2rem;
  background-color: #ffffff;
  color: #3498db;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-5px);
  }
`;const qi=e=>{let{children:t}=e;const{ref:n,inView:r}=rr({threshold:.3,triggerOnce:!1});return(0,Da.jsx)(Mi,{ref:n,isVisible:r,children:t})},Ki=e=>{let{children:t,bgColor:n}=e;const{ref:r,inView:o}=rr({threshold:.6,triggerOnce:!1});return(0,Da.jsx)(Ii,{ref:r,bgColor:n,isVisible:o,children:t})},Gi=()=>{const{ref:e,inView:t}=rr({threshold:.3,triggerOnce:!1});return(0,Da.jsx)("div",{ref:e,style:{opacity:t?1:0,transform:`translateY(${t?0:30}px)`,transition:"opacity 1s ease, transform 1s ease"},children:(0,Da.jsx)(hi,{})})},Qi=()=>{const{ref:e,inView:t}=rr({threshold:.2,triggerOnce:!1});return(0,Da.jsx)("div",{ref:e,style:{opacity:t?1:0,transform:`translateY(${t?0:30}px)`,transition:"opacity 1s ease, transform 1s ease"},children:(0,Da.jsx)(Ti,{})})},Yi=e=>{let{children:t}=e;const{ref:n,inView:r}=rr({threshold:.2,triggerOnce:!1});return(0,Da.jsx)(Ui,{ref:n,isVisible:r,children:t})},Xi=function(){const e=Z();return(0,Da.jsxs)(zi,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsx)(qi,{children:(0,Da.jsx)(ri,{})}),(0,Da.jsx)(Gn.Hg,{name:"infoSection1",children:(0,Da.jsx)(Ki,{children:(0,Da.jsxs)($i,{children:[(0,Da.jsxs)(Fi,{children:[(0,Da.jsx)(Di,{children:"Cuidados Dent\xe1rios de Excel\xeancia"}),(0,Da.jsx)(Li,{children:"Na Cl\xednica Dent\xe1ria Viseense, acreditamos que um sorriso saud\xe1vel \xe9 fundamental para o bem-estar e autoestima. Nossa equipe de profissionais altamente qualificados est\xe1 comprometida em oferecer os melhores tratamentos dent\xe1rios com tecnologia de ponta e atendimento humanizado."}),(0,Da.jsx)(Li,{children:"Trabalhamos com uma abordagem preventiva e personalizada, garantindo que cada paciente receba o tratamento mais adequado \xe0s suas necessidades espec\xedficas, sempre com conforto e seguran\xe7a."})]}),(0,Da.jsx)(Bi,{children:(0,Da.jsx)("img",{src:"https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",alt:"Equipe de dentistas profissionais"})})]})})}),(0,Da.jsx)(Gn.Hg,{name:"serviceCards",children:(0,Da.jsx)(Gi,{})}),(0,Da.jsx)(Gn.Hg,{name:"infoSection2",children:(0,Da.jsx)(Ki,{bgColor:"#ffffff",children:(0,Da.jsxs)($i,{children:[(0,Da.jsx)(Bi,{children:(0,Da.jsx)("img",{src:"https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",alt:"Tecnologia moderna em consult\xf3rio dent\xe1rio"})}),(0,Da.jsxs)(Fi,{children:[(0,Da.jsx)(Di,{children:"Tecnologia de Ponta a Seu Servi\xe7o"}),(0,Da.jsx)(Li,{children:"Investimos constantemente em equipamentos modernos e tecnologias avan\xe7adas para proporcionar diagn\xf3sticos precisos e tratamentos eficientes com o m\xe1ximo conforto."}),(0,Da.jsx)(Li,{children:"Nosso consult\xf3rio conta com radiografias digitais, scanners intraorais, microsc\xf3pios para procedimentos de alta precis\xe3o e equipamentos de \xfaltima gera\xe7\xe3o para garantir a excel\xeancia em cada procedimento."})]})]})})}),(0,Da.jsx)(Gn.Hg,{name:"testimonials",children:(0,Da.jsx)(Qi,{})}),(0,Da.jsxs)(Yi,{children:[(0,Da.jsx)(Wi,{children:"Agende Sua Consulta Hoje Mesmo"}),(0,Da.jsx)(Hi,{children:"D\xea o primeiro passo para um sorriso mais saud\xe1vel e bonito. Nossa equipe est\xe1 pronta para atend\xea-lo com toda a aten\xe7\xe3o e cuidado que voc\xea merece."}),(0,Da.jsx)(Vi,{onClick:()=>e("/cliente-dashboard/agendamentos/novo-agendamento"),children:"Marcar Consulta"})]}),(0,Da.jsx)(Ai,{})]})},Ji=Kn.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,Zi=Kn.main`
  flex: 1;
  padding-top: 2rem;
`,es=Kn.section`
  background-color: #3498db;
  color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`,ts=Kn.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`,ns=Kn.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,rs=Kn.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`,os=Kn.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,as=Kn.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Coluna única em telas menores */
  }
`,is=Kn.div`
  opacity: ${e=>e.isVisible?1:0};
  transform: translateY(${e=>e.isVisible?0:30}px);
  transition: opacity 1s ease, transform 1s ease;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    color: #7f8c8d;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`,ss=Kn.section`
  padding: 5rem 2rem;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`,ls=Kn.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,cs=Kn.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,us=Kn.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`,ds=Kn.div`
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 1s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .info {
    padding: 1.5rem;
    text-align: center;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
  }

  p {
    margin: 0 0 1rem;
    color: #3498db;
    font-weight: 500;
  }

  .social {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .social a {
    color: #7f8c8d;
    transition: color 0.3s;
  }

  .social a:hover {
    color: #3498db;
  }
`;const ps=e=>{let{children:t}=e;const{ref:n,inView:r}=rr({threshold:.3,triggerOnce:!1});return(0,Da.jsx)(is,{ref:n,isVisible:r,children:t})},fs=e=>{let{children:t}=e;const{ref:n,inView:r}=rr({threshold:.5,triggerOnce:!1});return(0,Da.jsx)(ds,{ref:n,isVisible:r,children:t})},ms=function(){return(0,Da.jsxs)(Ji,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsxs)(Zi,{children:[(0,Da.jsxs)(es,{children:[(0,Da.jsx)(ts,{children:"Quem Somos"}),(0,Da.jsx)(ns,{children:"Conhe\xe7a a hist\xf3ria da Cl\xednica Dent\xe1ria Viseense, nossa miss\xe3o, vis\xe3o e os valores que guiam nosso compromisso com a sa\xfade bucal dos nossos pacientes."})]}),(0,Da.jsxs)(rs,{children:[(0,Da.jsx)(os,{children:"Nossa Hist\xf3ria"}),(0,Da.jsxs)(as,{children:[(0,Da.jsxs)(ps,{children:[(0,Da.jsx)("img",{src:"https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80",alt:"Cl\xednica Dent\xe1ria fachada"}),(0,Da.jsx)("h3",{children:"O In\xedcio"}),(0,Da.jsx)("p",{children:"A Cl\xednica Dent\xe1ria Viseense foi fundada em 2005 pelo Dr. Pedro Soares com a vis\xe3o de criar um espa\xe7o que combinasse tecnologia avan\xe7ada e atendimento humanizado. O que come\xe7ou como um pequeno consult\xf3rio com apenas dois profissionais, cresceu e se tornou uma refer\xeancia em sa\xfade bucal na regi\xe3o."}),(0,Da.jsx)("p",{children:"Ao longo dos anos, investimos constantemente em forma\xe7\xe3o cont\xednua de nossa equipa e em equipamentos de \xfaltima gera\xe7\xe3o para oferecer sempre o melhor tratamento aos nossos pacientes."})]}),(0,Da.jsxs)(ps,{children:[(0,Da.jsx)("h3",{children:"Miss\xe3o"}),(0,Da.jsx)("p",{children:"Proporcionar cuidados dent\xe1rios de excel\xeancia, melhorando a sa\xfade bucal e a qualidade de vida dos nossos pacientes atrav\xe9s de tratamentos personalizados, com \xe9tica, responsabilidade e uso das mais avan\xe7adas tecnologias."}),(0,Da.jsx)("h3",{children:"Vis\xe3o"}),(0,Da.jsx)("p",{children:"Ser reconhecida como refer\xeancia em odontologia de qualidade, inovando constantemente nos tratamentos e servi\xe7os oferecidos, com uma equipa altamente qualificada e comprometida com o bem-estar dos pacientes."}),(0,Da.jsx)("h3",{children:"Valores"}),(0,Da.jsxs)("p",{children:["\u2022 Excel\xeancia t\xe9cnica e humaniza\xe7\xe3o no atendimento",(0,Da.jsx)("br",{}),"\u2022 \xc9tica e transpar\xeancia em todas as rela\xe7\xf5es",(0,Da.jsx)("br",{}),"\u2022 Compromisso com resultados e satisfa\xe7\xe3o do paciente",(0,Da.jsx)("br",{}),"\u2022 Inova\xe7\xe3o e aprendizado cont\xednuo",(0,Da.jsx)("br",{}),"\u2022 Acessibilidade e respeito \xe0 diversidade",(0,Da.jsx)("br",{}),"\u2022 Sustentabilidade e responsabilidade social"]})]})]})]}),(0,Da.jsxs)(ss,{children:[(0,Da.jsx)(ls,{children:"Nossa Equipa"}),(0,Da.jsx)(cs,{children:"Conhe\xe7a os profissionais dedicados e altamente qualificados que trabalham para cuidar do seu sorriso."}),(0,Da.jsx)(us,{children:[{id:1,name:"Dr. Carlos Oliveira",role:"Odontologia Geral & Est\xe9tica",image:"https://randomuser.me/api/portraits/men/1.jpg",social:{linkedin:"#",twitter:"#",facebook:"#"},link:"#"},{id:2,name:"Dra. Ana Ferreira",role:"Ortodontia",image:"https://randomuser.me/api/portraits/women/90.jpg",social:{linkedin:"#",twitter:"#",facebook:"#"}},{id:3,name:"Dr. Miguel Costa",role:"Implantologia",image:"https://randomuser.me/api/portraits/men/32.jpg",social:{linkedin:"#",twitter:"#",facebook:"#"}},{id:4,name:"Dra. Sofia Martins",role:"Odontopediatria",image:"https://randomuser.me/api/portraits/women/44.jpg",social:{linkedin:"#",twitter:"#",facebook:"#"}}].map((e=>(0,Da.jsxs)(fs,{children:[(0,Da.jsx)("img",{src:e.image,alt:e.name}),(0,Da.jsxs)("div",{className:"info",children:[(0,Da.jsx)("h3",{children:e.name}),(0,Da.jsx)("p",{children:e.role}),(0,Da.jsxs)("div",{className:"social",children:[(0,Da.jsx)("a",{href:e.social.linkedin,"aria-label":"LinkedIn",children:(0,Da.jsx)("i",{className:"fab fa-linkedin"})}),(0,Da.jsx)("a",{href:e.social.twitter,"aria-label":"Twitter",children:(0,Da.jsx)("i",{className:"fab fa-twitter"})}),(0,Da.jsx)("a",{href:e.social.facebook,"aria-label":"Facebook",children:(0,Da.jsx)("i",{className:"fab fa-facebook-f"})})]})]})]},e.id)))})]})]}),(0,Da.jsx)(Ai,{})]})},hs=Kn.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,gs=Kn.main`
  flex: 1;
  padding-top: 2rem;
`,vs=Kn.section`
  background-color: #3498db;
  color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;
`,bs=Kn.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`,ys=Kn.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`,xs=Kn.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`,ws=Kn.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .icon {
    margin-right: 1rem;
    color: #3498db;
    font-size: 1.5rem;
    min-width: 1.5rem;
  }

  .text {
    color: #7f8c8d;
    line-height: 1.6;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .social-link:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
`,Ss=Kn.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
  }

  input, textarea, select {
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #2980b9;
  }

  .success-message {
    padding: 1rem;
    background-color: #d4edda;
    color: #155724;
    border-radius: 4px;
    margin-top: 1rem;
  }

  .error-message {
    padding: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border-radius: 4px;
    margin-top: 1rem;
  }
`,ks=Kn.section`
  height: 450px;
  position: relative;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;const js=function(){const[e,t]=(0,r.useState)({nome:"",email:"",telefone:"",assunto:"",mensagem:""}),[n,o]=(0,r.useState)(null),a=e=>{const{name:n,value:r}=e.target;t((e=>({...e,[n]:r})))};return(0,Da.jsxs)(hs,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsxs)(gs,{children:[(0,Da.jsxs)(vs,{children:[(0,Da.jsx)(bs,{children:"Entre em Contacto"}),(0,Da.jsx)(ys,{children:"Estamos prontos para atend\xea-lo e responder a todas as suas d\xfavidas. Entre em contacto connosco pelos canais abaixo ou visite a nossa cl\xednica."})]}),(0,Da.jsxs)(xs,{children:[(0,Da.jsxs)(ws,{children:[(0,Da.jsx)("h2",{children:"Informa\xe7\xf5es de Contacto"}),(0,Da.jsxs)("div",{className:"info-item",children:[(0,Da.jsx)("div",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-map-marker-alt"})}),(0,Da.jsxs)("div",{className:"text",children:[(0,Da.jsx)("h3",{children:"Localiza\xe7\xe3o"}),(0,Da.jsxs)("p",{children:["Rua Direita, 12",(0,Da.jsx)("br",{}),"3500-115 Viseu, Portugal"]})]})]}),(0,Da.jsxs)("div",{className:"info-item",children:[(0,Da.jsx)("div",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-phone-alt"})}),(0,Da.jsxs)("div",{className:"text",children:[(0,Da.jsx)("h3",{children:"Telefone"}),(0,Da.jsxs)("p",{children:["+351 212 345 678",(0,Da.jsx)("br",{}),"+351 912 345 678"]})]})]}),(0,Da.jsxs)("div",{className:"info-item",children:[(0,Da.jsx)("div",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-envelope"})}),(0,Da.jsxs)("div",{className:"text",children:[(0,Da.jsx)("h3",{children:"Email"}),(0,Da.jsxs)("p",{children:["info@clinicadentaria.pt",(0,Da.jsx)("br",{}),"marcacoes@clinicadentaria.pt"]})]})]}),(0,Da.jsxs)("div",{className:"info-item",children:[(0,Da.jsx)("div",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-clock"})}),(0,Da.jsxs)("div",{className:"text",children:[(0,Da.jsx)("h3",{children:"Hor\xe1rio de Funcionamento"}),(0,Da.jsxs)("p",{children:["Segunda a Sexta: 9h \xe0s 19h",(0,Da.jsx)("br",{}),"S\xe1bado: 9h \xe0s 13h",(0,Da.jsx)("br",{}),"Domingo: Fechado"]})]})]}),(0,Da.jsxs)("div",{className:"social-links",children:[(0,Da.jsx)("a",{href:"#",className:"social-link","aria-label":"Facebook",children:(0,Da.jsx)("i",{className:"fab fa-facebook-f"})}),(0,Da.jsx)("a",{href:"#",className:"social-link","aria-label":"Instagram",children:(0,Da.jsx)("i",{className:"fab fa-instagram"})}),(0,Da.jsx)("a",{href:"#",className:"social-link","aria-label":"Twitter",children:(0,Da.jsx)("i",{className:"fab fa-twitter"})}),(0,Da.jsx)("a",{href:"#",className:"social-link","aria-label":"LinkedIn",children:(0,Da.jsx)("i",{className:"fab fa-linkedin-in"})})]})]}),(0,Da.jsxs)(Ss,{children:[(0,Da.jsx)("h2",{children:"Envie-nos uma Mensagem"}),(0,Da.jsxs)("form",{onSubmit:e=>{e.preventDefault(),setTimeout((()=>{o("success"),t({nome:"",email:"",telefone:"",assunto:"",mensagem:""})}),1e3)},children:[(0,Da.jsxs)("div",{className:"form-group",children:[(0,Da.jsx)("label",{htmlFor:"nome",children:"Nome"}),(0,Da.jsx)("input",{type:"text",id:"nome",name:"nome",value:e.nome,onChange:a,required:!0})]}),(0,Da.jsxs)("div",{className:"form-group",children:[(0,Da.jsx)("label",{htmlFor:"email",children:"Email"}),(0,Da.jsx)("input",{type:"email",id:"email",name:"email",value:e.email,onChange:a,required:!0})]}),(0,Da.jsxs)("div",{className:"form-group",children:[(0,Da.jsx)("label",{htmlFor:"telefone",children:"Telefone"}),(0,Da.jsx)("input",{type:"tel",id:"telefone",name:"telefone",value:e.telefone,onChange:a})]}),(0,Da.jsxs)("div",{className:"form-group",children:[(0,Da.jsx)("label",{htmlFor:"assunto",children:"Assunto"}),(0,Da.jsxs)("select",{id:"assunto",name:"assunto",value:e.assunto,onChange:a,required:!0,children:[(0,Da.jsx)("option",{value:"",children:"Selecione um assunto"}),(0,Da.jsx)("option",{value:"Marcar Consulta",children:"Marcar Consulta"}),(0,Da.jsx)("option",{value:"Or\xe7amento",children:"Or\xe7amento"}),(0,Da.jsx)("option",{value:"D\xfavida",children:"D\xfavida"}),(0,Da.jsx)("option",{value:"Sugest\xe3o",children:"Sugest\xe3o"}),(0,Da.jsx)("option",{value:"Reclama\xe7\xe3o",children:"Reclama\xe7\xe3o"}),(0,Da.jsx)("option",{value:"Outro",children:"Outro"})]})]}),(0,Da.jsxs)("div",{className:"form-group",children:[(0,Da.jsx)("label",{htmlFor:"mensagem",children:"Mensagem"}),(0,Da.jsx)("textarea",{id:"mensagem",name:"mensagem",value:e.mensagem,onChange:a,required:!0})]}),(0,Da.jsx)("button",{type:"submit",children:"Enviar Mensagem"}),"success"===n&&(0,Da.jsx)("div",{className:"success-message",children:"Mensagem enviada com sucesso! Entraremos em contacto brevemente."}),"error"===n&&(0,Da.jsx)("div",{className:"error-message",children:"Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente."})]})]})]}),(0,Da.jsx)(ks,{children:(0,Da.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.607752631194!2d-7.911238523484137!3d40.66057614076146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd23364e75891ec7%3A0x80b73a66b3c947a3!2sR.%20Direita%2C%20Viseu!5e0!3m2!1spt-PT!2spt!4v1740587414784!5m2!1spt-PT!2spt",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade",title:"Localiza\xe7\xe3o da Cl\xednica Dent\xe1ria"})})]}),(0,Da.jsx)(Ai,{})]})};function Cs(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=Cs(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}const Es=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=Cs(e))&&(r&&(r+=" "),r+=t);return r},Ts=e=>"number"==typeof e&&!isNaN(e),Ps=e=>"string"==typeof e,Os=e=>"function"==typeof e,Ns=e=>Ps(e)||Os(e)?e:null,Rs=e=>(0,r.isValidElement)(e)||Ps(e)||Os(e)||Ts(e);function _s(e){let{enter:t,exit:n,appendPosition:o=!1,collapse:a=!0,collapseDuration:i=300}=e;return function(e){let{children:s,position:l,preventExitTransition:c,done:u,nodeRef:d,isIn:p}=e;const f=o?`${t}--${l}`:t,m=o?`${n}--${l}`:n,h=(0,r.useRef)(0);return(0,r.useLayoutEffect)((()=>{const e=d.current,t=f.split(" "),n=r=>{r.target===d.current&&(e.dispatchEvent(new Event("d")),e.removeEventListener("animationend",n),e.removeEventListener("animationcancel",n),0===h.current&&"animationcancel"!==r.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",n),e.addEventListener("animationcancel",n)}),[]),(0,r.useEffect)((()=>{const e=d.current,t=()=>{e.removeEventListener("animationend",t),a?function(e,t,n){void 0===n&&(n=300);const{scrollHeight:r,style:o}=e;requestAnimationFrame((()=>{o.minHeight="initial",o.height=r+"px",o.transition=`all ${n}ms`,requestAnimationFrame((()=>{o.height="0",o.padding="0",o.margin="0",setTimeout(t,n)}))}))}(e,u,i):u()};p||(c?t():(h.current=1,e.className+=` ${m}`,e.addEventListener("animationend",t)))}),[p]),r.createElement(r.Fragment,null,s)}}function As(e,t){return null!=e?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const zs={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const n=this.list.get(e).filter((e=>e!==t));return this.list.set(e,n),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach((t=>{const n=setTimeout((()=>{t(...[].slice.call(arguments,1))}),0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(n)}))}},Ms=e=>{let{theme:t,type:n,...o}=e;return r.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${n})`,...o})},Is={info:function(e){return r.createElement(Ms,{...e},r.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return r.createElement(Ms,{...e},r.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return r.createElement(Ms,{...e},r.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return r.createElement(Ms,{...e},r.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return r.createElement("div",{className:"Toastify__spinner"})}};function $s(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function Fs(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function Ds(e){let{closeToast:t,theme:n,ariaLabel:o="close"}=e;return r.createElement("button",{className:`Toastify__close-button Toastify__close-button--${n}`,type:"button",onClick:e=>{e.stopPropagation(),t(e)},"aria-label":o},r.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},r.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function Ls(e){let{delay:t,isRunning:n,closeToast:o,type:a="default",hide:i,className:s,style:l,controlledProgress:c,progress:u,rtl:d,isIn:p,theme:f}=e;const m=i||c&&0===u,h={...l,animationDuration:`${t}ms`,animationPlayState:n?"running":"paused",opacity:m?0:1};c&&(h.transform=`scaleX(${u})`);const g=Es("Toastify__progress-bar",c?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${f}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":d}),v=Os(s)?s({rtl:d,type:a,defaultClassName:g}):Es(g,s);return r.createElement("div",{role:"progressbar","aria-hidden":m?"true":"false","aria-label":"notification timer",className:v,style:h,[c&&u>=1?"onTransitionEnd":"onAnimationEnd"]:c&&u<1?null:()=>{p&&o()}})}const Bs=e=>{const{isRunning:t,preventExitTransition:n,toastRef:o,eventHandlers:a}=function(e){const[t,n]=(0,r.useState)(!1),[o,a]=(0,r.useState)(!1),i=(0,r.useRef)(null),s=(0,r.useRef)({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,l=(0,r.useRef)(e),{autoClose:c,pauseOnHover:u,closeToast:d,onClick:p,closeOnClick:f}=e;function m(t){if(e.draggable){"touchstart"===t.nativeEvent.type&&t.nativeEvent.preventDefault(),s.didMove=!1,document.addEventListener("mousemove",b),document.addEventListener("mouseup",y),document.addEventListener("touchmove",b),document.addEventListener("touchend",y);const n=i.current;s.canCloseOnClick=!0,s.canDrag=!0,s.boundingRect=n.getBoundingClientRect(),n.style.transition="",s.x=$s(t.nativeEvent),s.y=Fs(t.nativeEvent),"x"===e.draggableDirection?(s.start=s.x,s.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(s.start=s.y,s.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent/100))}}function h(t){if(s.boundingRect){const{top:n,bottom:r,left:o,right:a}=s.boundingRect;"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&s.x>=o&&s.x<=a&&s.y>=n&&s.y<=r?v():g()}}function g(){n(!0)}function v(){n(!1)}function b(n){const r=i.current;s.canDrag&&r&&(s.didMove=!0,t&&v(),s.x=$s(n),s.y=Fs(n),s.delta="x"===e.draggableDirection?s.x-s.start:s.y-s.start,s.start!==s.x&&(s.canCloseOnClick=!1),r.style.transform=`translate${e.draggableDirection}(${s.delta}px)`,r.style.opacity=""+(1-Math.abs(s.delta/s.removalDistance)))}function y(){document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",y),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",y);const t=i.current;if(s.canDrag&&s.didMove&&t){if(s.canDrag=!1,Math.abs(s.delta)>s.removalDistance)return a(!0),void e.closeToast();t.style.transition="transform 0.2s, opacity 0.2s",t.style.transform=`translate${e.draggableDirection}(0)`,t.style.opacity="1"}}(0,r.useEffect)((()=>{l.current=e})),(0,r.useEffect)((()=>(i.current&&i.current.addEventListener("d",g,{once:!0}),Os(e.onOpen)&&e.onOpen((0,r.isValidElement)(e.children)&&e.children.props),()=>{const e=l.current;Os(e.onClose)&&e.onClose((0,r.isValidElement)(e.children)&&e.children.props)})),[]),(0,r.useEffect)((()=>(e.pauseOnFocusLoss&&(document.hasFocus()||v(),window.addEventListener("focus",g),window.addEventListener("blur",v)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",g),window.removeEventListener("blur",v))})),[e.pauseOnFocusLoss]);const x={onMouseDown:m,onTouchStart:m,onMouseUp:h,onTouchEnd:h};return c&&u&&(x.onMouseEnter=v,x.onMouseLeave=g),f&&(x.onClick=e=>{p&&p(e),s.canCloseOnClick&&d()}),{playToast:g,pauseToast:v,isRunning:t,preventExitTransition:o,toastRef:i,eventHandlers:x}}(e),{closeButton:i,children:s,autoClose:l,onClick:c,type:u,hideProgressBar:d,closeToast:p,transition:f,position:m,className:h,style:g,bodyClassName:v,bodyStyle:b,progressClassName:y,progressStyle:x,updateId:w,role:S,progress:k,rtl:j,toastId:C,deleteToast:E,isIn:T,isLoading:P,iconOut:O,closeOnClick:N,theme:R}=e,_=Es("Toastify__toast",`Toastify__toast-theme--${R}`,`Toastify__toast--${u}`,{"Toastify__toast--rtl":j},{"Toastify__toast--close-on-click":N}),A=Os(h)?h({rtl:j,position:m,type:u,defaultClassName:_}):Es(_,h),z=!!k||!l,M={closeToast:p,type:u,theme:R};let I=null;return!1===i||(I=Os(i)?i(M):(0,r.isValidElement)(i)?(0,r.cloneElement)(i,M):Ds(M)),r.createElement(f,{isIn:T,done:E,position:m,preventExitTransition:n,nodeRef:o},r.createElement("div",{id:C,onClick:c,className:A,...a,style:g,ref:o},r.createElement("div",{...T&&{role:S},className:Os(v)?v({type:u}):Es("Toastify__toast-body",v),style:b},null!=O&&r.createElement("div",{className:Es("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!P})},O),r.createElement("div",null,s)),I,r.createElement(Ls,{...w&&!z?{key:`pb-${w}`}:{},rtl:j,theme:R,delay:l,isRunning:t,isIn:T,closeToast:p,hide:d,type:u,style:x,className:y,controlledProgress:z,progress:k||0})))},Us=function(e,t){return void 0===t&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},Ws=_s(Us("bounce",!0)),Hs=(_s(Us("slide",!0)),_s(Us("zoom")),_s(Us("flip")),(0,r.forwardRef)(((e,t)=>{const{getToastToRender:n,containerRef:o,isToastActive:a}=function(e){const[,t]=(0,r.useReducer)((e=>e+1),0),[n,o]=(0,r.useState)([]),a=(0,r.useRef)(null),i=(0,r.useRef)(new Map).current,s=e=>-1!==n.indexOf(e),l=(0,r.useRef)({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:s,getToast:e=>i.get(e)}).current;function c(e){let{containerId:t}=e;const{limit:n}=l.props;!n||t&&l.containerId!==t||(l.count-=l.queue.length,l.queue=[])}function u(e){o((t=>null==e?[]:t.filter((t=>t!==e))))}function d(){const{toastContent:e,toastProps:t,staleId:n}=l.queue.shift();f(e,t,n)}function p(e,n){let{delay:o,staleId:s,...c}=n;if(!Rs(e)||function(e){return!a.current||l.props.enableMultiContainer&&e.containerId!==l.props.containerId||i.has(e.toastId)&&null==e.updateId}(c))return;const{toastId:p,updateId:m,data:h}=c,{props:g}=l,v=()=>u(p),b=null==m;b&&l.count++;const y={...g,style:g.toastStyle,key:l.toastKey++,...Object.fromEntries(Object.entries(c).filter((e=>{let[t,n]=e;return null!=n}))),toastId:p,updateId:m,data:h,closeToast:v,isIn:!1,className:Ns(c.className||g.toastClassName),bodyClassName:Ns(c.bodyClassName||g.bodyClassName),progressClassName:Ns(c.progressClassName||g.progressClassName),autoClose:!c.isLoading&&(x=c.autoClose,w=g.autoClose,!1===x||Ts(x)&&x>0?x:w),deleteToast(){const e=As(i.get(p),"removed");i.delete(p),zs.emit(4,e);const n=l.queue.length;if(l.count=null==p?l.count-l.displayedToast:l.count-1,l.count<0&&(l.count=0),n>0){const e=null==p?l.props.limit:1;if(1===n||1===e)l.displayedToast++,d();else{const t=e>n?n:e;l.displayedToast=t;for(let e=0;e<t;e++)d()}}else t()}};var x,w;y.iconOut=function(e){let{theme:t,type:n,isLoading:o,icon:a}=e,i=null;const s={theme:t,type:n};return!1===a||(Os(a)?i=a(s):(0,r.isValidElement)(a)?i=(0,r.cloneElement)(a,s):Ps(a)||Ts(a)?i=a:o?i=Is.spinner():(e=>e in Is)(n)&&(i=Is[n](s))),i}(y),Os(c.onOpen)&&(y.onOpen=c.onOpen),Os(c.onClose)&&(y.onClose=c.onClose),y.closeButton=g.closeButton,!1===c.closeButton||Rs(c.closeButton)?y.closeButton=c.closeButton:!0===c.closeButton&&(y.closeButton=!Rs(g.closeButton)||g.closeButton);let S=e;(0,r.isValidElement)(e)&&!Ps(e.type)?S=(0,r.cloneElement)(e,{closeToast:v,toastProps:y,data:h}):Os(e)&&(S=e({closeToast:v,toastProps:y,data:h})),g.limit&&g.limit>0&&l.count>g.limit&&b?l.queue.push({toastContent:S,toastProps:y,staleId:s}):Ts(o)?setTimeout((()=>{f(S,y,s)}),o):f(S,y,s)}function f(e,t,n){const{toastId:r}=t;n&&i.delete(n);const a={content:e,props:t};i.set(r,a),o((e=>[...e,r].filter((e=>e!==n)))),zs.emit(4,As(a,null==a.props.updateId?"added":"updated"))}return(0,r.useEffect)((()=>(l.containerId=e.containerId,zs.cancelEmit(3).on(0,p).on(1,(e=>a.current&&u(e))).on(5,c).emit(2,l),()=>{i.clear(),zs.emit(3,l)})),[]),(0,r.useEffect)((()=>{l.props=e,l.isToastActive=s,l.displayedToast=n.length})),{getToastToRender:function(t){const n=new Map,r=Array.from(i.values());return e.newestOnTop&&r.reverse(),r.forEach((e=>{const{position:t}=e.props;n.has(t)||n.set(t,[]),n.get(t).push(e)})),Array.from(n,(e=>t(e[0],e[1])))},containerRef:a,isToastActive:s}}(e),{className:i,style:s,rtl:l,containerId:c}=e;function u(e){const t=Es("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":l});return Os(i)?i({position:e,rtl:l,defaultClassName:t}):Es(t,Ns(i))}return(0,r.useEffect)((()=>{t&&(t.current=o.current)}),[]),r.createElement("div",{ref:o,className:"Toastify",id:c},n(((e,t)=>{const n=t.length?{...s}:{...s,pointerEvents:"none"};return r.createElement("div",{className:u(e),style:n,key:`container-${e}`},t.map(((e,n)=>{let{content:o,props:i}=e;return r.createElement(Bs,{...i,isIn:a(i.toastId),style:{...i.style,"--nth":n+1,"--len":t.length},key:`toast-${i.key}`},o)})))})))})));Hs.displayName="ToastContainer",Hs.defaultProps={position:"top-right",transition:Ws,autoClose:5e3,closeButton:Ds,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let Vs,qs=new Map,Ks=[],Gs=1;function Qs(){return""+Gs++}function Ys(e){return e&&(Ps(e.toastId)||Ts(e.toastId))?e.toastId:Qs()}function Xs(e,t){return qs.size>0?zs.emit(0,e,t):Ks.push({content:e,options:t}),t.toastId}function Js(e,t){return{...t,type:t&&t.type||e,toastId:Ys(t)}}function Zs(e){return(t,n)=>Xs(t,Js(e,n))}function el(e,t){return Xs(e,Js("default",t))}el.loading=(e,t)=>Xs(e,Js("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),el.promise=function(e,t,n){let r,{pending:o,error:a,success:i}=t;o&&(r=Ps(o)?el.loading(o,n):el.loading(o.render,{...n,...o}));const s={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(e,t,o)=>{if(null==t)return void el.dismiss(r);const a={type:e,...s,...n,data:o},i=Ps(t)?{render:t}:t;return r?el.update(r,{...a,...i}):el(i.render,{...a,...i}),o},c=Os(e)?e():e;return c.then((e=>l("success",i,e))).catch((e=>l("error",a,e))),c},el.success=Zs("success"),el.info=Zs("info"),el.error=Zs("error"),el.warning=Zs("warning"),el.warn=el.warning,el.dark=(e,t)=>Xs(e,Js("default",{theme:"dark",...t})),el.dismiss=e=>{qs.size>0?zs.emit(1,e):Ks=Ks.filter((t=>null!=e&&t.options.toastId!==e))},el.clearWaitingQueue=function(e){return void 0===e&&(e={}),zs.emit(5,e)},el.isActive=e=>{let t=!1;return qs.forEach((n=>{n.isToastActive&&n.isToastActive(e)&&(t=!0)})),t},el.update=function(e,t){void 0===t&&(t={}),setTimeout((()=>{const n=function(e,t){let{containerId:n}=t;const r=qs.get(n||Vs);return r&&r.getToast(e)}(e,t);if(n){const{props:r,content:o}=n,a={delay:100,...r,...t,toastId:t.toastId||e,updateId:Qs()};a.toastId!==e&&(a.staleId=e);const i=a.render||o;delete a.render,Xs(i,a)}}),0)},el.done=e=>{el.update(e,{progress:1})},el.onChange=e=>(zs.on(4,e),()=>{zs.off(4,e)}),el.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},el.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},zs.on(2,(e=>{Vs=e.containerId||e,qs.set(Vs,e),Ks.forEach((e=>{zs.emit(0,e.content,e.options)})),Ks=[]})).on(3,(e=>{qs.delete(e.containerId||e),0===qs.size&&zs.off(0).off(1).off(5)}));const tl={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_API_URL||"http://localhost:8000/api",nl=Kn.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`,rl=Kn.div`
  background-color: #f8f9fa;
  padding: 60px 20px;
  border-radius: 8px;
  margin-bottom: 40px;
  text-align: center;
`,ol=Kn.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`,al=Kn.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.6;
`,il=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 40px;
`,sl=Kn.h2`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`,ll=Kn.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,cl=Kn.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2c3e50;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      border-color: #3498db;
      outline: none;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`,ul=Kn(cl)`
  grid-column: 1 / -1;
`,dl=Kn.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`,pl=Kn.div`
  margin-bottom: 40px;
`,fl=Kn.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ml=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  p {
    color: #7f8c8d;
    line-height: 1.6;
  }
  
  .icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 15px;
  }
`,hl=()=>{Z();const[e,t]=(0,r.useState)({nome:"",email:"",telefone:"",servico:"",dataPreferida:"",horaPreferida:"",mensagem:""}),[n,o]=(0,r.useState)(!1),a=n=>{const{name:r,value:o}=n.target;t({...e,[r]:o})};return(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsxs)(nl,{children:[(0,Da.jsxs)(rl,{children:[(0,Da.jsx)(ol,{children:"Agende sua Consulta"}),(0,Da.jsx)(al,{children:"Cuide da sua sa\xfade bucal com nossa equipe de profissionais qualificados. Preencha o formul\xe1rio abaixo para solicitar um agendamento e entraremos em contato o mais breve poss\xedvel."})]}),(0,Da.jsxs)(pl,{children:[(0,Da.jsx)(sl,{children:"Nossos Servi\xe7os"}),(0,Da.jsx)(fl,{children:[{icon:"tooth",title:"Limpeza Dent\xe1ria",description:"Remo\xe7\xe3o de t\xe1rtaro e placa bacteriana para manter a sa\xfade bucal."},{icon:"teeth",title:"Tratamento de Canal",description:"Procedimento para tratar infec\xe7\xf5es na polpa do dente."},{icon:"smile",title:"Clareamento Dental",description:"Procedimento est\xe9tico para deixar os dentes mais brancos."},{icon:"crown",title:"Coroas e Pontes",description:"Restaura\xe7\xf5es para dentes danificados ou substitui\xe7\xe3o de dentes ausentes."},{icon:"tooth-alt",title:"Implantes Dent\xe1rios",description:"Solu\xe7\xe3o permanente para substituir dentes perdidos."},{icon:"teeth-open",title:"Ortodontia",description:"Corre\xe7\xe3o do alinhamento dos dentes e problemas de mordida."}].map(((e,t)=>(0,Da.jsxs)(ml,{children:[(0,Da.jsx)("div",{className:"icon",children:(0,Da.jsx)("i",{className:`fas fa-${e.icon}`})}),(0,Da.jsx)("h3",{children:e.title}),(0,Da.jsx)("p",{children:e.description})]},t)))})]}),(0,Da.jsxs)(il,{children:[(0,Da.jsx)(sl,{children:"Solicitar Agendamento"}),(0,Da.jsxs)(ll,{onSubmit:async n=>{n.preventDefault(),o(!0);try{await Aa.post(`${tl}/agendamentos/solicitar`,e),el.success("Solicita\xe7\xe3o enviada com sucesso! Entraremos em contato em breve."),t({nome:"",email:"",telefone:"",servico:"",dataPreferida:"",horaPreferida:"",mensagem:""})}catch(r){el.error("Erro ao enviar solicita\xe7\xe3o. Por favor, tente novamente."),console.error("Error submitting form:",r)}finally{o(!1)}},children:[(0,Da.jsxs)(cl,{children:[(0,Da.jsx)("label",{htmlFor:"nome",children:"Nome Completo*"}),(0,Da.jsx)("input",{type:"text",id:"nome",name:"nome",value:e.nome,onChange:a,required:!0})]}),(0,Da.jsxs)(cl,{children:[(0,Da.jsx)("label",{htmlFor:"email",children:"Email*"}),(0,Da.jsx)("input",{type:"email",id:"email",name:"email",value:e.email,onChange:a,required:!0})]}),(0,Da.jsxs)(cl,{children:[(0,Da.jsx)("label",{htmlFor:"telefone",children:"Telefone*"}),(0,Da.jsx)("input",{type:"tel",id:"telefone",name:"telefone",value:e.telefone,onChange:a,required:!0})]}),(0,Da.jsxs)(cl,{children:[(0,Da.jsx)("label",{htmlFor:"servico",children:"Servi\xe7o Desejado*"}),(0,Da.jsxs)("select",{id:"servico",name:"servico",value:e.servico,onChange:a,required:!0,children:[(0,Da.jsx)("option",{value:"",children:"Selecione um servi\xe7o"}),(0,Da.jsx)("option",{value:"Limpeza Dent\xe1ria",children:"Limpeza Dent\xe1ria"}),(0,Da.jsx)("option",{value:"Tratamento de Canal",children:"Tratamento de Canal"}),(0,Da.jsx)("option",{value:"Clareamento Dental",children:"Clareamento Dental"}),(0,Da.jsx)("option",{value:"Coroas e Pontes",children:"Coroas e Pontes"}),(0,Da.jsx)("option",{value:"Implantes Dent\xe1rios",children:"Implantes Dent\xe1rios"}),(0,Da.jsx)("option",{value:"Ortodontia",children:"Ortodontia"}),(0,Da.jsx)("option",{value:"Consulta Geral",children:"Consulta Geral"})]})]}),(0,Da.jsxs)(cl,{children:[(0,Da.jsx)("label",{htmlFor:"dataPreferida",children:"Data Preferida*"}),(0,Da.jsx)("input",{type:"date",id:"dataPreferida",name:"dataPreferida",value:e.dataPreferida,onChange:a,required:!0,min:(new Date).toISOString().split("T")[0]})]}),(0,Da.jsxs)(cl,{children:[(0,Da.jsx)("label",{htmlFor:"horaPreferida",children:"Hor\xe1rio Preferido*"}),(0,Da.jsxs)("select",{id:"horaPreferida",name:"horaPreferida",value:e.horaPreferida,onChange:a,required:!0,children:[(0,Da.jsx)("option",{value:"",children:"Selecione um hor\xe1rio"}),(0,Da.jsx)("option",{value:"Manh\xe3",children:"Manh\xe3 (9h - 12h)"}),(0,Da.jsx)("option",{value:"Tarde",children:"Tarde (14h - 18h)"})]})]}),(0,Da.jsxs)(ul,{children:[(0,Da.jsx)("label",{htmlFor:"mensagem",children:"Mensagem Adicional"}),(0,Da.jsx)("textarea",{id:"mensagem",name:"mensagem",value:e.mensagem,onChange:a,placeholder:"Informe detalhes adicionais ou preocupa\xe7\xf5es espec\xedficas..."})]}),(0,Da.jsx)(ul,{style:{textAlign:"center"},children:(0,Da.jsx)(dl,{type:"submit",disabled:n,children:n?"Enviando...":"Solicitar Agendamento"})})]})]})]}),(0,Da.jsx)(Ai,{})]})},gl=Kn.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,vl=Kn.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
`,bl=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
`,yl=Kn.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
`,xl=Kn.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,wl=Kn.div`
  display: flex;
  flex-direction: column;
`,Sl=Kn.label`
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`,kl=Kn.input`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`,jl=Kn.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:disabled {
    background-color: #9cb3c9;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #2980b9;
  }
`,Cl=Kn.div`
  padding: 0.75rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  margin-bottom: 1rem;
`,El=Kn.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #2980b9;
      text-decoration: underline;
    }
  }
`;const Tl=function(){const[e,t]=(0,r.useState)(""),[n,o]=(0,r.useState)(""),[a,i]=(0,r.useState)(!1),[s,l]=(0,r.useState)(""),c=Z();return(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Hs,{}),(0,Da.jsxs)(gl,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsx)(vl,{children:(0,Da.jsxs)(bl,{children:[(0,Da.jsx)(yl,{children:"Login"}),s&&(0,Da.jsx)(Cl,{children:s}),(0,Da.jsxs)(xl,{onSubmit:async t=>{t.preventDefault(),i(!0),l(""),console.log("\n=== TENTATIVA DE LOGIN NA P\xc1GINA ==="),console.log("Email:",e),console.log("Senha (length):",(null===n||void 0===n?void 0:n.length)||0);try{var r;if(!e||!n)throw new Error("Por favor, preencha todos os campos");console.log("Iniciando processo de login com email:",e);const t=await Fa.login(e,n);let o;switch(console.log("\n\u2705 Login bem-sucedido:",{...t,accessToken:t.accessToken?"[PRESENTE]":"[AUSENTE]"}),null===(r=t.tipo)||void 0===r?void 0:r.toLowerCase()){case"admin":o="/admin/dashboard";break;case"medico":o="/medico/dashboard";break;default:o="/cliente/dashboard"}c(o)}catch(o){let e;if(console.error("\n\u274c Erro no login na p\xe1gina:"),console.error("Tipo:",o.name),console.error("Mensagem:",o.message),console.error("Stack:",o.stack),o.response){const{status:t,data:n}=o.response;switch(console.error("Status:",t),console.error("Dados do erro:",n),t){case 401:e=n.message||"Email ou senha incorretos";break;case 404:e="Servi\xe7o indispon\xedvel";break;case 500:e="Erro no servidor. Tente novamente mais tarde";break;default:e=n.message||"Erro ao realizar login"}}else e=o.request?"N\xe3o foi poss\xedvel conectar ao servidor":o.message||"Erro ao realizar login";l(e),el.error(e)}finally{i(!1)}},children:[(0,Da.jsxs)(wl,{children:[(0,Da.jsx)(Sl,{htmlFor:"email",children:"Email"}),(0,Da.jsx)(kl,{type:"email",id:"email",name:"email",value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,Da.jsxs)(wl,{children:[(0,Da.jsx)(Sl,{htmlFor:"password",children:"Password"}),(0,Da.jsx)(kl,{type:"password",id:"password",name:"password",value:n,onChange:e=>o(e.target.value),required:!0})]}),(0,Da.jsx)(jl,{type:"submit",disabled:a,children:a?"A carregar...":"Entrar"})]}),(0,Da.jsxs)(El,{children:["N\xe3o tem uma conta? ",(0,Da.jsx)(fr,{to:"/register",children:"Registe-se aqui"})]})]})}),(0,Da.jsx)(Ai,{})]})]})},Pl=Kn.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,Ol=Kn.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
`,Nl=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
`,Rl=Kn.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
`,_l=Kn.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Al=Kn.div`
  display: flex;
  flex-direction: column;
`,zl=Kn.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  > div {
    flex: 1;
  }
`,Ml=Kn.label`
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`,Il=Kn.input`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`,$l=Kn.select`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`,Fl=Kn.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:disabled {
    background-color: #9cb3c9;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #2980b9;
  }
`,Dl=Kn.div`
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;

  &.success {
    background-color: #d4edda;
    color: #155724;
  }

  &.error {
    background-color: #f8d7da;
    color: #721c24;
  }
`,Ll=Kn.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #2980b9;
      text-decoration: underline;
    }
  }
`,Bl=Kn.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,Ul=Kn.button`
  flex: 1;
  padding: 1rem;
  background-color: ${e=>e.active?"#3498db":"#f8f9fa"};
  color: ${e=>e.active?"white":"#2c3e50"};
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${e=>e.active?"#2980b9":"#e0e0e0"};
  }
`;const Wl=function(){const[e,t]=(0,r.useState)(""),[n,o]=(0,r.useState)(""),[a,i]=(0,r.useState)(""),[s,l]=(0,r.useState)(""),[c,u]=(0,r.useState)(""),[d,p]=(0,r.useState)(""),[f,m]=(0,r.useState)("cliente"),[h,g]=(0,r.useState)(""),[v,b]=(0,r.useState)(""),[y,x]=(0,r.useState)(""),[w,S]=(0,r.useState)(""),[k,j]=(0,r.useState)(""),[C,E]=(0,r.useState)([]),[T,P]=(0,r.useState)("geral"),[O,N]=(0,r.useState)(""),[R,_]=(0,r.useState)(!1),[A,z]=(0,r.useState)(!1),[M,I]=(0,r.useState)(""),$=Z();return(0,r.useEffect)((()=>{if("medico"===f){const e=async()=>{try{const e=await Aa.get("http://localhost:8000/api/especialidades");E(e.data)}catch(M){console.error("Erro ao carregar especialidades:",M),E([{id:1,nome:"Ortodontia"},{id:2,nome:"Endodontia"},{id:3,nome:"Periodontia"},{id:4,nome:"Implantodontia"},{id:5,nome:"Odontopediatria"}])}};e()}}),[f]),(0,Da.jsxs)(Pl,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsx)(Ol,{children:(0,Da.jsxs)(Nl,{children:[(0,Da.jsx)(Rl,{children:"Criar Conta"}),M&&(0,Da.jsx)(Dl,{className:"error",children:M}),(0,Da.jsxs)(_l,{onSubmit:async t=>{if(t.preventDefault(),z(!0),I(""),a!==s)return I("As senhas n\xe3o coincidem"),void z(!1);try{let t={};if("cliente"===f)t={data_nascimento:h,nif:v,morada:y};else if("medico"===f){if(t={especialidade_id:w,crm:k},!w||!k)return I("CRM e especialidade s\xe3o obrigat\xf3rios para m\xe9dicos"),void z(!1)}else"admin"===f&&(t={nivel_acesso:T});(await Fa.register(n,a,e,d,f,t)).data&&(_(!0),setTimeout((()=>{$("/login")}),2e3))}catch(M){var r,o;const t=(null===(r=M.response)||void 0===r||null===(o=r.data)||void 0===o?void 0:o.message)||"Erro ao registrar-se";I(t),console.error("Erro no registro:",M)}finally{z(!1)}},children:[(0,Da.jsxs)(Bl,{children:[(0,Da.jsx)(Ul,{type:"button",active:"cliente"===f,onClick:()=>m("cliente"),children:"Cliente"}),(0,Da.jsx)(Ul,{type:"button",active:"medico"===f,onClick:()=>m("medico"),children:"M\xe9dico"}),(0,Da.jsx)(Ul,{type:"button",active:"admin"===f,onClick:()=>m("admin"),children:"Administrador"})]}),(0,Da.jsxs)(zl,{children:[(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"username",children:"Nome de Utilizador"}),(0,Da.jsx)(Il,{type:"text",id:"username",value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"email",children:"Email"}),(0,Da.jsx)(Il,{type:"email",id:"email",value:n,onChange:e=>o(e.target.value),required:!0})]})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"password",children:"Senha"}),(0,Da.jsx)(Il,{type:"password",id:"password",value:a,onChange:e=>i(e.target.value),required:!0})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"confirmPassword",children:"Confirmar Senha"}),(0,Da.jsx)(Il,{type:"password",id:"confirmPassword",value:s,onChange:e=>l(e.target.value),required:!0})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"nome",children:"Nome Completo"}),(0,Da.jsx)(Il,{type:"text",id:"nome",value:c,onChange:e=>u(e.target.value),required:!0})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"telefone",children:"Telefone"}),(0,Da.jsx)(Il,{type:"tel",id:"telefone",value:d,onChange:e=>p(e.target.value),required:!0})]}),"cliente"===f&&(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsxs)(zl,{children:[(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"dataNascimento",children:"Data de Nascimento"}),(0,Da.jsx)(Il,{type:"date",id:"dataNascimento",value:h,onChange:e=>g(e.target.value),required:!0})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"nif",children:"NIF"}),(0,Da.jsx)(Il,{type:"text",id:"nif",value:v,onChange:e=>b(e.target.value),required:!0})]})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"morada",children:"Morada"}),(0,Da.jsx)(Il,{type:"text",id:"morada",value:y,onChange:e=>x(e.target.value),required:!0})]})]}),"medico"===f&&(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"especialidade",children:"Especialidade"}),(0,Da.jsxs)($l,{id:"especialidade",value:w,onChange:e=>S(e.target.value),required:!0,children:[(0,Da.jsx)("option",{value:"",children:"Selecione uma especialidade"}),C.map((e=>(0,Da.jsx)("option",{value:e.id,children:e.nome},e.id)))]})]}),(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"crm",children:"CRM (C\xe9dula Profissional)"}),(0,Da.jsx)(Il,{type:"text",id:"crm",value:k,onChange:e=>j(e.target.value),required:!0})]})]}),"admin"===f&&(0,Da.jsxs)(Al,{children:[(0,Da.jsx)(Ml,{htmlFor:"nivelAcesso",children:"N\xedvel de Acesso"}),(0,Da.jsxs)($l,{id:"nivelAcesso",value:T,onChange:e=>P(e.target.value),required:!0,children:[(0,Da.jsx)("option",{value:"geral",children:"Geral"}),(0,Da.jsx)("option",{value:"total",children:"Total"}),(0,Da.jsx)("option",{value:"restrito",children:"Restrito"})]})]}),(0,Da.jsx)(Fl,{type:"submit",disabled:A,children:A?"A processar...":"Registar"}),(0,Da.jsxs)(Ll,{children:["J\xe1 tem uma conta? ",(0,Da.jsx)(fr,{to:"/login",children:"Fa\xe7a login"})]})]})]})}),(0,Da.jsx)(Ai,{})]})},Hl=Kn.div`
  background-color: #2c3e50;
  color: #ecf0f1;
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: ${e=>{let{isOpen:t}=e;return t?"250px":"0"}};
    z-index: 1000;
  }
`,Vl=Kn.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #34495e;
`,ql=Kn.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
`,Kl=Kn.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`,Gl=Kn.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,Ql=Kn.li`
  a {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: #ecf0f1;
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;

    &:hover {
      background-color: #34495e;
    }

    &.active {
      background-color: #34495e;
      border-left-color: #3498db;
    }

    i {
      margin-right: 10px;
      font-size: 1.2rem;
      width: 20px;
      text-align: center;
    }
  }
`,Yl=Kn.div`
  padding: 15px 20px;
  border-top: 1px solid #34495e;
  position: absolute;
  bottom: 0;
  width: 100%;

  p {
    margin: 0;
    font-size: 0.8rem;
    color: #7f8c8d;
  }
`,Xl=e=>{let{isOpen:t,toggleSidebar:n}=e;const r=X();return(0,Da.jsxs)(Hl,{isOpen:t,children:[(0,Da.jsxs)(Vl,{children:[(0,Da.jsx)(ql,{children:"Cl\xednica Admin"}),(0,Da.jsx)(Kl,{onClick:n,children:(0,Da.jsx)("i",{className:"fas fa-times"})})]}),(0,Da.jsxs)(Gl,{children:[(0,Da.jsx)(Ql,{children:(0,Da.jsxs)(fr,{to:"/dashboard",className:"/dashboard"===r.pathname?"active":"",children:[(0,Da.jsx)("i",{className:"fas fa-tachometer-alt"})," Dashboard"]})}),(0,Da.jsx)(Ql,{children:(0,Da.jsxs)(fr,{to:"/dashboard/clientes",className:r.pathname.includes("/dashboard/clientes")?"active":"",children:[(0,Da.jsx)("i",{className:"fas fa-users"})," Utilizadores"]})}),(0,Da.jsx)(Ql,{children:(0,Da.jsxs)(fr,{to:"/dashboard/agendamentos",className:r.pathname.includes("/dashboard/agendamentos")?"active":"",children:[(0,Da.jsx)("i",{className:"fas fa-calendar-alt"})," Agendamentos"]})}),(0,Da.jsx)(Ql,{children:(0,Da.jsxs)(fr,{to:"/dashboard/faturas",className:r.pathname.includes("/dashboard/faturas")?"active":"",children:[(0,Da.jsx)("i",{className:"fas fa-file-invoice-dollar"})," Faturas"]})}),(0,Da.jsx)(Ql,{children:(0,Da.jsxs)(fr,{to:"/",className:"/"===r.pathname?"active":"",children:[(0,Da.jsx)("i",{className:"fas fa-globe"})," Ver Site"]})})]}),(0,Da.jsx)(Yl,{children:(0,Da.jsxs)("p",{children:["\xa9 ",(new Date).getFullYear()," Cl\xednica Dent\xe1ria"]})})]})},Jl=Kn.div`
  background-color: #ffffff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  left: ${e=>{let{sidebarWidth:t}=e;return t}};
  z-index: 10;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    left: 0;
  }
`,Zl=Kn.button`
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`,ec=Kn.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px 15px;
  width: 300px;

  @media (max-width: 992px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  input {
    border: none;
    background: none;
    outline: none;
    padding: 5px;
    width: 100%;
    color: #2c3e50;
  }

  i {
    color: #7f8c8d;
  }
`,tc=Kn.div`
  display: flex;
  align-items: center;
`,nc=Kn.div`
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  
  i {
    font-size: 1.2rem;
    color: #2c3e50;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
  }
`,rc=Kn.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  }

  .user-info {
    display: none;
    
    @media (min-width: 768px) {
      display: block;
    }
    
    .name {
      font-weight: 500;
      color: #2c3e50;
    }
    
    .role {
      font-size: 0.8rem;
      color: #7f8c8d;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 45px;
    right: 0;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    z-index: 10;
    display: ${e=>{let{isMenuOpen:t}=e;return t?"block":"none"}};

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 10px 15px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #f5f5f5;
        }

        a, button {
          color: #2c3e50;
          text-decoration: none;
          background: none;
          border: none;
          font-size: 0.9rem;
          cursor: pointer;
          width: 100%;
          text-align: left;
          padding: 0;
          display: flex;
          align-items: center;

          i {
            margin-right: 10px;
            width: 15px;
          }
        }

        &.divider {
          border-top: 1px solid #ecf0f1;
          margin: 5px 0;
          padding: 0;
        }

        &.logout button {
          color: #e74c3c;
        }
      }
    }
  }
`,oc=e=>{let{toggleSidebar:t,sidebarWidth:n}=e;const[o,a]=r.useState(!1),i=Z(),s=Fa.getCurrentUser();return(0,Da.jsxs)(Jl,{sidebarWidth:n,children:[(0,Da.jsx)(Zl,{onClick:t,children:(0,Da.jsx)("i",{className:"fas fa-bars"})}),(0,Da.jsxs)(ec,{children:[(0,Da.jsx)("i",{className:"fas fa-search"}),(0,Da.jsx)("input",{type:"text",placeholder:"Pesquisar..."})]}),(0,Da.jsxs)(tc,{children:[(0,Da.jsxs)(nc,{children:[(0,Da.jsx)("i",{className:"fas fa-bell"}),(0,Da.jsx)("span",{className:"badge",children:"3"})]}),(0,Da.jsxs)(rc,{isMenuOpen:o,onClick:()=>{a(!o)},children:[(0,Da.jsx)("div",{className:"avatar",children:(l=null===s||void 0===s?void 0:s.username,l?l.charAt(0).toUpperCase():"U")}),(0,Da.jsxs)("div",{className:"user-info",children:[(0,Da.jsx)("div",{className:"name",children:null===s||void 0===s?void 0:s.username}),(0,Da.jsx)("div",{className:"role",children:"Administrador"})]}),(0,Da.jsx)("div",{className:"dropdown-menu",children:(0,Da.jsxs)("ul",{children:[(0,Da.jsx)("li",{children:(0,Da.jsxs)("a",{href:"#profile",children:[(0,Da.jsx)("i",{className:"fas fa-user"})," Perfil"]})}),(0,Da.jsx)("li",{children:(0,Da.jsxs)("a",{href:"#settings",children:[(0,Da.jsx)("i",{className:"fas fa-cog"})," Configura\xe7\xf5es"]})}),(0,Da.jsx)("li",{className:"divider"}),(0,Da.jsx)("li",{className:"logout",children:(0,Da.jsxs)("button",{onClick:()=>{Fa.logout(),i("/login"),window.location.reload()},children:[(0,Da.jsx)("i",{className:"fas fa-sign-out-alt"})," Logout"]})})]})})]})]})]});var l},ac=Kn.div`
  display: flex;
`,ic=Kn.div`
  flex: 1;
  margin-left: 250px;
  padding-top: 70px;
  min-height: 100vh;
  background-color: #f4f6f9;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${e=>{let{sidebarOpen:t}=e;return t?"250px":"0"}};
  }
`,sc=Kn.div`
  padding: 20px;
`,lc=()=>{const[e,t]=(0,r.useState)(!0),n=()=>{t(!e)};return(0,Da.jsxs)(ac,{children:[(0,Da.jsx)(Xl,{isOpen:e,toggleSidebar:n}),(0,Da.jsxs)(ic,{sidebarOpen:e,children:[(0,Da.jsx)(oc,{toggleSidebar:n,sidebarWidth:e?"250px":"0"}),(0,Da.jsx)(sc,{children:(0,Da.jsx)(ge,{})})]})]})};const cc=new class{async getClienteProfile(){try{return(await Ia.get("cliente/perfil")).data}catch(e){throw console.error("Erro ao buscar perfil:",e),e}}async updateClienteProfile(e){try{const t=await Ia.put("/cliente/perfil",e);if(t.data.success)return t.data;throw new Error(t.data.message||"Erro ao atualizar perfil")}catch(t){throw console.error("Erro ao atualizar perfil:",t),t}}async getConsultas(){try{return(await Ia.get("cliente/consultas")).data}catch(e){throw console.error("Erro ao buscar consultas:",e),e}}},uc=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem;
`,dc=Kn.div`
  margin-bottom: 2rem;
`,pc=Kn.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
`,fc=Kn.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,mc=Kn.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`,hc=Kn.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,gc=Kn.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
`,vc=Kn.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  b order-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`,bc=(Kn.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`,Kn.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`),yc=(Kn.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`,()=>{const[e,t]=(0,r.useState)(!1),[n,o]=(0,r.useState)(!1),[a,i]=(0,r.useState)(null),[s,l]=(0,r.useState)([]),[c,u]=(0,r.useState)({nome:"",email:"",telefone:"",dataNascimento:"",morada:"",nif:""});Fa.getCurrentUser();(0,r.useEffect)((()=>{(async()=>{try{const e=await cc.getClienteProfile();console.log("Dados recebidos:",e),e.success&&e.data&&u({nome:e.data.nome||"",email:e.data.email||"",telefone:e.data.telefone||"",dataNascimento:e.data.dataNascimento||"",morada:e.data.morada||"",nif:e.data.nif||""})}catch(e){console.error("Erro ao carregar dados:",e),el.error("Erro ao carregar dados do perfil")}})()}),[]);return e?(0,Da.jsx)("div",{children:"Carregando dados do perfil..."}):(0,Da.jsx)(uc,{children:(0,Da.jsxs)(dc,{children:[(0,Da.jsx)(pc,{children:"Informa\xe7\xf5es Pessoais"}),(0,Da.jsxs)(fc,{onSubmit:async e=>{e.preventDefault();try{(await cc.updateClienteProfile(c)).success&&el.success("Perfil atualizado com sucesso!")}catch(t){console.error("Erro ao atualizar perfil:",t),el.error("Erro ao atualizar perfil")}},children:[(0,Da.jsxs)(hc,{children:[(0,Da.jsx)(gc,{htmlFor:"nome",children:"Nome Completo"}),(0,Da.jsx)(vc,{type:"text",id:"nome",value:c.nome,onChange:e=>u({...c,nome:e.target.value}),required:!0})]}),(0,Da.jsxs)(hc,{children:[(0,Da.jsx)(gc,{htmlFor:"email",children:"Email"}),(0,Da.jsx)(vc,{type:"email",id:"email",value:c.email,onChange:e=>u({...c,email:e.target.value}),required:!0,disabled:!0}),(0,Da.jsx)("small",{style:{color:"#7f8c8d",marginTop:"0.25rem"},children:"O email n\xe3o pode ser alterado"})]}),(0,Da.jsxs)(mc,{children:[(0,Da.jsxs)(hc,{children:[(0,Da.jsx)(gc,{htmlFor:"telefone",children:"Telefone"}),(0,Da.jsx)(vc,{type:"tel",id:"telefone",value:c.telefone,onChange:e=>u({...c,telefone:e.target.value}),required:!0})]}),(0,Da.jsxs)(hc,{children:[(0,Da.jsx)(gc,{htmlFor:"dataNascimento",children:"Data de Nascimento"}),(0,Da.jsx)(vc,{type:"date",id:"dataNascimento",value:c.dataNascimento,onChange:e=>u({...c,dataNascimento:e.target.value}),required:!0})]})]}),(0,Da.jsxs)(hc,{children:[(0,Da.jsx)(gc,{htmlFor:"morada",children:"Morada"}),(0,Da.jsx)(vc,{type:"text",id:"morada",value:c.morada,onChange:e=>u({...c,morada:e.target.value}),required:!0})]}),(0,Da.jsxs)(hc,{children:[(0,Da.jsx)(gc,{htmlFor:"nif",children:"NIF"}),(0,Da.jsx)(vc,{type:"text",id:"nif",value:c.nif,onChange:e=>u({...c,nif:e.target.value}),required:!0})]}),(0,Da.jsx)(bc,{type:"submit",disabled:n,children:n?"A guardar...":"Guardar Altera\xe7\xf5es"})]})]})})});const xc=new class{async getConsultas(){return Ia.get("consulta")}async getConsultaById(e){return Ia.get(`consulta/${e}`)}async createConsulta(e){try{const t=Fa.getCurrentUser();if(!t||!t.accessToken)throw new Error("Usu\xe1rio n\xe3o autenticado");console.log("Enviando requisi\xe7\xe3o com token:",t.accessToken.substring(0,20)+"...");const n={headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.accessToken}`}};return await Ia.post("consulta",e,n)}catch(t){throw console.error("Erro na chamada de API:",t),t.response&&console.error("Resposta de erro:",t.response.data),t}}async updateConsulta(e,t){return Ia.put(`consulta/${e}`,t)}async cancelConsulta(e){return Ia.put(`consulta/${e}/cancel`,{})}async getConsultasByCliente(){try{const e=Fa.getCurrentUser();if(!e||!e.id)throw new Error("Usu\xe1rio n\xe3o identificado");console.log("Buscando consultas para o usu\xe1rio:",e.id);const t=await Ia.get(`consulta/utilizador/${e.id}?tipo=cliente`);return console.log("Resposta da API:",t),t.data}catch(e){throw console.error("Erro ao buscar consultas do cliente:",e),e}}async getConsultasByMedico(e){return Ia.get(`consulta/medico/${e}`)}async getConsultasMedico(){try{const e=Fa.getCurrentUser();if(!e||!e.id)throw new Error("Usu\xe1rio n\xe3o identificado");return(await Ia.get(`consulta/utilizador/${e.id}?tipo=medico`)).data}catch(e){throw console.error("Erro ao buscar consultas:",e),e}}async finalizarConsulta(e,t){try{return(await Ia.put(`consulta/${e}`,{status_id:3,observacoes:t})).data}catch(n){throw console.error("Erro ao finalizar consulta:",n),n}}async getConsultasPendentes(){return Ia.get("consulta/pendentes")}async getConsultasConcluidas(){try{const e=Fa.getCurrentUser();if(!e||!e.id)throw new Error("Usu\xe1rio n\xe3o identificado");const t=await Ia.get(`consulta/utilizador/${e.id}?tipo=medico`);return t.data.filter((e=>{var t;return"Conclu\xedda"===(null===(t=e.status)||void 0===t?void 0:t.nome)}))}catch(e){throw console.error("Erro ao buscar consultas conclu\xeddas:",e),e}}async aceitarConsulta(e){try{return(await Ia.put(`consulta/${e}/aceitar`)).data}catch(t){throw console.error("Erro ao aceitar consulta:",t),t}}async recusarConsulta(e){try{return(await Ia.put(`consulta/${e}/recusar`)).data}catch(t){throw console.error("Erro ao recusar consulta:",t),t}}async getConsultaStatus(){try{return(await Ia.get("consulta/status")).data}catch(e){throw console.error("Erro ao buscar status de consulta:",e),e}}},wc=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,Sc=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`,kc=Kn.div`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,jc=Kn(fr)`
  background-color: ${e=>e.primary?"#3498db":"#e74c3c"};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${e=>e.primary?"#2980b9":"#c0392b"};
  }
  
  i {
    font-size: 0.8rem;
  }
`,Cc=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Ec=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #ecf0f1;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  .appointment-info {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  .date-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
  }
  
  .date {
    font-weight: 600;
    font-size: 1.1rem;
    color: #2c3e50;
  }
  
  .time {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .service {
    font-weight: 500;
    color: #2c3e50;
  }
  
  .notes {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .doctor {
    font-size: 0.9rem;
    color: #3498db;
  }
  
  .status-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .status {
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .status.confirmado {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  .status.pendente {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  .status.cancelado {
    background-color: #ffebee;
    color: #d32f2f;
  }
  
  .status.concluido {
    background-color: #e3f2fd;
    color: #1976d2;
  }
`,Tc=Kn.button`
  background-color: ${e=>e.danger?"#e74c3c":"#3498db"};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${e=>e.danger?"#c0392b":"#2980b9"};
  }
`,Pc=Kn.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  
  p {
    margin-bottom: 1rem;
  }
`;const Oc=function(e){let{defaultTab:t="agendadas"}=e;const[n,o]=(0,r.useState)([]),[a,i]=(0,r.useState)(!0),[s,l]=(0,r.useState)(t),[c,u]=(0,r.useState)([]);(0,r.useEffect)((()=>{"agendadas"===s?d():p()}),[s]);const d=async()=>{try{i(!0);const e=Fa.getCurrentUser();if(!e||!e.id)return el.error("Voc\xea precisa estar logado para visualizar suas consultas"),void i(!1);console.log("Buscando consultas para o usu\xe1rio:",e.id);const t=await xc.getConsultasByCliente();o(t||[])}catch(e){console.error("Erro ao carregar consultas:",e),el.error("N\xe3o foi poss\xedvel carregar suas consultas")}finally{i(!1)}},p=async()=>{try{i(!0);const e=(await xc.getConsultasByCliente()).filter((e=>{var t,n;return"Conclu\xedda"===(null===(t=e.status)||void 0===t?void 0:t.nome)||"Cancelada"===(null===(n=e.status)||void 0===n?void 0:n.nome)}));u(e||[])}catch(e){console.error("Erro ao carregar hist\xf3rico:",e),el.error("N\xe3o foi poss\xedvel carregar seu hist\xf3rico")}finally{i(!1)}},f=e=>{var t;if(!e)return"";switch(null===(t=e.nome)||void 0===t?void 0:t.toLowerCase()){case"confirmada":return"confirmado";case"pendente":return"pendente";case"cancelada":return"cancelado";case"conclu\xedda":return"concluido";default:return""}},m=e=>new Date(e).toLocaleDateString("pt-PT"),h=e=>new Date(e).toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"});return(0,Da.jsx)(wc,{children:(0,Da.jsxs)(Sc,{children:[(0,Da.jsxs)(kc,{children:["Minhas Consultas",(0,Da.jsxs)(jc,{to:"/cliente-dashboard/agendamentos/novo-agendamento",primary:!0,children:[(0,Da.jsx)("i",{className:"fas fa-plus"})," Nova Consulta"]})]}),(0,Da.jsxs)("div",{style:{display:"flex",gap:"1rem",marginBottom:"1rem",borderBottom:"1px solid #ecf0f1",paddingBottom:"0.5rem"},children:[(0,Da.jsx)(Tc,{onClick:()=>l("agendadas"),style:{backgroundColor:"agendadas"===s?"#3498db":"transparent",color:"agendadas"===s?"white":"#3498db",border:"agendadas"===s?"none":"1px solid #3498db"},children:"Consultas Agendadas"}),(0,Da.jsx)(Tc,{onClick:()=>l("historico"),style:{backgroundColor:"historico"===s?"#3498db":"transparent",color:"historico"===s?"white":"#3498db",border:"historico"===s?"none":"1px solid #3498db"},children:"Hist\xf3rico"})]}),(0,Da.jsx)(Cc,{children:a?(0,Da.jsx)(Pc,{children:(0,Da.jsx)("p",{children:"Carregando..."})}):"agendadas"===s?n.length>0?n.filter((e=>{var t,n;return"Conclu\xedda"!==(null===(t=e.status)||void 0===t?void 0:t.nome)&&"Cancelada"!==(null===(n=e.status)||void 0===n?void 0:n.nome)})).map((e=>{var t,n,r;return(0,Da.jsxs)(Ec,{children:[(0,Da.jsxs)("div",{className:"appointment-info",children:[(0,Da.jsxs)("div",{className:"date-time",children:[(0,Da.jsx)("div",{className:"date",children:m(e.data_hora)}),(0,Da.jsx)("div",{className:"time",children:h(e.data_hora)})]}),(0,Da.jsxs)("div",{className:"details",children:[(0,Da.jsxs)("div",{className:"service",children:["Consulta com Dr(a). ",(null===(t=e.medico)||void 0===t?void 0:t.nome)||"M\xe9dico"]}),(0,Da.jsx)("div",{className:"notes",children:e.observacoes||"Sem observa\xe7\xf5es"})]})]}),(0,Da.jsxs)("div",{className:"status-actions",children:[(0,Da.jsx)("span",{className:`status ${f(e.status)}`,children:(null===(n=e.status)||void 0===n?void 0:n.nome)||"Pendente"}),"Agendada"===(null===(r=e.status)||void 0===r?void 0:r.nome)&&(0,Da.jsx)(Tc,{danger:!0,onClick:()=>(async e=>{if(window.confirm("Tem certeza que deseja cancelar esta consulta?"))try{await xc.cancelConsulta(e),el.success("Consulta cancelada com sucesso"),d()}catch(t){console.error("Erro ao cancelar consulta:",t),el.error("Erro ao cancelar consulta")}})(e.id),children:"Cancelar"})]})]},e.id)})):(0,Da.jsxs)(Pc,{children:[(0,Da.jsx)("p",{children:"Voc\xea n\xe3o tem nenhuma consulta agendada."}),(0,Da.jsx)(jc,{to:"/cliente-dashboard/agendamentos/novo-agendamento",primary:!0,children:"Agendar Consulta"})]}):c.length>0?c.map((e=>{var t,n;return(0,Da.jsxs)(Ec,{children:[(0,Da.jsxs)("div",{className:"appointment-info",children:[(0,Da.jsxs)("div",{className:"date-time",children:[(0,Da.jsx)("div",{className:"date",children:m(e.data_hora)}),(0,Da.jsx)("div",{className:"time",children:h(e.data_hora)})]}),(0,Da.jsxs)("div",{className:"details",children:[(0,Da.jsxs)("div",{className:"service",children:["Consulta com Dr(a). ",(null===(t=e.medico)||void 0===t?void 0:t.nome)||"M\xe9dico"]}),(0,Da.jsx)("div",{className:"notes",children:e.observacoes||"Sem observa\xe7\xf5es"})]})]}),(0,Da.jsx)("div",{className:"status-actions",children:(0,Da.jsx)("span",{className:`status ${f(e.status)}`,children:(null===(n=e.status)||void 0===n?void 0:n.nome)||"Status desconhecido"})})]},e.id)})):(0,Da.jsx)(Pc,{children:(0,Da.jsx)("p",{children:"Voc\xea n\xe3o tem hist\xf3rico de consultas."})})})]})})},Nc=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,Rc=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`,_c=Kn.div`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Ac=(Kn.h4`
  font-size: 1.1rem;
  color: #34495e;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 1px dashed #ecf0f1;
`,Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
  
  .date {
    font-weight: 500;
    color: #2c3e50;
  }
  
  .description {
    flex: 1;
    margin-left: 1.5rem;
    color: #7f8c8d;
  }
  
  .status {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
    border-radius: 50px;
    
    &.concluido {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    &.cancelado {
      background-color: #ffebee;
      color: #d32f2f;
    }
  }
`),zc=Kn.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;const Mc=function(){const[e,t]=(0,r.useState)([]),[n,o]=(0,r.useState)(!0);(0,r.useEffect)((()=>{a()}),[]);const a=async()=>{try{o(!0),console.log("Iniciando busca de hist\xf3rico de consultas");const e=await xc.getConsultasByCliente();console.log("Consultas recebidas:",e);const n=e.filter((e=>{var t,n,r;return console.log("Verificando status:",e.status),"Finalizada"===(null===(t=e.status)||void 0===t?void 0:t.nome)||"Conclu\xedda"===(null===(n=e.status)||void 0===n?void 0:n.nome)||"Cancelada"===(null===(r=e.status)||void 0===r?void 0:r.nome)}));console.log("Hist\xf3rico filtrado:",n),t(n||[]),o(!1)}catch(e){console.error("Erro ao carregar hist\xf3rico de consultas:",e),el.error("Erro ao carregar seu hist\xf3rico de consultas"),o(!1)}};return(0,Da.jsx)(Nc,{children:(0,Da.jsxs)(Rc,{children:[(0,Da.jsxs)(_c,{children:["Meu Hist\xf3rico",(0,Da.jsx)("button",{onClick:()=>{o(!0),a()},style:{padding:"5px 10px",fontSize:"0.8rem",backgroundColor:"#3498db",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Recarregar"})]}),n?(0,Da.jsx)(zc,{children:"Carregando hist\xf3rico..."}):e.length>0?e.map((e=>{var t,n,r,o;return(0,Da.jsxs)(Ac,{children:[(0,Da.jsx)("span",{className:"date",children:(o=e.data_hora,new Date(o).toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit",year:"numeric"}))}),(0,Da.jsxs)("span",{className:"description",children:["Consulta ",e.observacoes?`- ${e.observacoes}`:""]}),(0,Da.jsx)("span",{className:"status "+("Finalizada"===(null===(t=e.status)||void 0===t?void 0:t.nome)||"Conclu\xedda"===(null===(n=e.status)||void 0===n?void 0:n.nome)?"concluido":"cancelado"),children:(null===(r=e.status)||void 0===r?void 0:r.nome)||"Desconhecido"})]},e.id)})):(0,Da.jsx)(zc,{children:"Voc\xea ainda n\xe3o tem hist\xf3rico de consultas."})]})})},Ic=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,$c=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`,Fc=Kn.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
`,Dc=Kn.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`,Lc=Kn.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`,Bc=Kn.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`,Uc=Kn.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`,Wc=Kn.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`,Hc=Kn.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  grid-column: 1 / -1;
  margin-top: 1rem;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;const Vc=function(){const[e,t]=(0,r.useState)(""),[n,o]=(0,r.useState)(""),[a,i]=(0,r.useState)(""),[s,l]=(0,r.useState)(!1),c=Z();return(0,r.useEffect)((()=>{const e=Fa.getCurrentUser();if(!e||!e.accessToken)return console.error("Usu\xe1rio n\xe3o autenticado"),void el.error("Voc\xea precisa estar logado para agendar consultas");console.log("Usu\xe1rio autenticado na montagem do componente:",{id:e.id,email:e.email,token:e.accessToken?"presente":"ausente"})}),[c]),(0,Da.jsx)(Ic,{children:(0,Da.jsxs)($c,{children:[(0,Da.jsx)(Fc,{children:"Agendar Nova Consulta"}),(0,Da.jsxs)(Dc,{onSubmit:async t=>{if(t.preventDefault(),!e||!n)return void el.error("Por favor, selecione data e hora para a consulta");const r=Fa.getCurrentUser();if(console.log("Dados do usu\xe1rio antes da submiss\xe3o:",r),!r||!r.accessToken)return console.error("Usu\xe1rio n\xe3o autenticado ou token n\xe3o encontrado"),el.error("Voc\xea precisa estar logado para agendar uma consulta"),void c("/login");try{l(!0);const t={data_hora:`${e}T${n}:00`,observacoes:a||""};console.log("Enviando dados:",t),console.log("Token usado:",r.accessToken.substring(0,20)+"...");await xc.createConsulta(t);el.success("Consulta agendada com sucesso!"),c("/cliente-dashboard/agendamentos")}catch(s){var o,i;if(console.error("Erro completo:",s),s.response&&(console.error("Status:",s.response.status),console.error("Dados do erro:",s.response.data),401===s.response.status))return el.error("Sua sess\xe3o expirou. Por favor, fa\xe7a login novamente."),Fa.logout(),void setTimeout((()=>c("/login")),2e3);el.error((null===(o=s.response)||void 0===o||null===(i=o.data)||void 0===i?void 0:i.message)||"Erro ao agendar consulta")}finally{l(!1)}},children:[(0,Da.jsxs)(Lc,{children:[(0,Da.jsx)(Bc,{children:"Data*"}),(0,Da.jsx)(Uc,{type:"date",value:e,onChange:e=>t(e.target.value),min:(new Date).toISOString().split("T")[0],required:!0})]}),(0,Da.jsxs)(Lc,{children:[(0,Da.jsx)(Bc,{children:"Hor\xe1rio Preferido*"}),(0,Da.jsxs)(Wc,{value:n,onChange:e=>o(e.target.value),required:!0,children:[(0,Da.jsx)("option",{value:"",children:"Selecione um hor\xe1rio"}),(0,Da.jsx)("option",{value:"08:00",children:"08:00"}),(0,Da.jsx)("option",{value:"09:00",children:"09:00"}),(0,Da.jsx)("option",{value:"10:00",children:"10:00"}),(0,Da.jsx)("option",{value:"11:00",children:"11:00"}),(0,Da.jsx)("option",{value:"14:00",children:"14:00"}),(0,Da.jsx)("option",{value:"15:00",children:"15:00"}),(0,Da.jsx)("option",{value:"16:00",children:"16:00"}),(0,Da.jsx)("option",{value:"17:00",children:"17:00"})]})]}),(0,Da.jsxs)(Lc,{style:{gridColumn:"1 / -1"},children:[(0,Da.jsx)(Bc,{children:"Observa\xe7\xf5es"}),(0,Da.jsx)(Uc,{as:"textarea",rows:"4",value:a,onChange:e=>i(e.target.value),placeholder:"Adicione observa\xe7\xf5es importantes sobre a consulta..."})]}),(0,Da.jsx)(Hc,{type:"submit",disabled:s,children:s?"Agendando...":"Solicitar Consulta"})]})]})})},qc="http://localhost:8000/api",Kc={getFaturasByCliente:async()=>{try{return(await Ia.get(`${qc}/faturas/cliente`)).data}catch(e){throw console.error("Erro ao buscar faturas:",e),e}},criarFatura:async(e,t)=>{try{return(await Ia.post(`${qc}/faturas/consulta/${e}`,t)).data}catch(n){throw console.error("Erro ao criar fatura:",n),n}},editarFatura:async(e,t)=>{try{return(await Ia.put(`${qc}/faturas/${e}`,t)).data}catch(n){throw console.error("Erro ao editar fatura:",n),n}},atualizarStatusFatura:async(e,t)=>{try{return(await Ia.put(`${qc}/faturas/${e}/status`,{statusId:t})).data}catch(n){throw console.error("Erro ao atualizar status da fatura:",n),n}},getFaturaById:async e=>{try{return(await Ia.get(`${qc}/faturas/${e}`)).data}catch(t){throw console.error("Erro ao buscar detalhes da fatura:",t),t}},registrarPagamento:async(e,t)=>{try{return(await Ia.post(`${qc}/faturas/${e}/pagamento`,t)).data}catch(n){throw console.error("Erro ao registrar pagamento:",n),n}},getFaturasByMedico:async()=>{try{return(await Ia.get(`${qc}/faturas/medico`)).data}catch(e){throw console.error("Erro ao buscar faturas do m\xe9dico:",e),e}},marcarComoPaga:async e=>{try{return(await Ia.put(`${qc}/faturas/${e}/status`,{statusId:2})).data}catch(t){throw console.error("Erro ao marcar fatura como paga:",t),t}},getConsultasConcluidasSemFatura:async()=>{try{return(await Ia.get(`${qc}/consultas/concluidas-sem-fatura`)).data}catch(e){throw console.error("Erro ao buscar consultas conclu\xeddas sem fatura:",e),e}},getPDFUrl:e=>{const t=JSON.parse(localStorage.getItem("user")),n=t?t.accessToken:"";return`${qc}/faturas/${e}/pdf?token=${n}`}},Gc=Kc,Qc=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`,Yc=Kn.div`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Xc=Kn.div`
  display: flex;
  margin-bottom: 1.5rem;
`,Jc=Kn.button`
  padding: 0.75rem 1.5rem;
  background-color: ${e=>e.active?"#3498db":"#f5f5f5"};
  color: ${e=>e.active?"white":"#333"};
  border: none;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${e=>e.active?"#3498db":"#e0e0e0"};
  }
`,Zc=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,eu=Kn.div`
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
`,tu=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ecf0f1;
`,nu=Kn.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`,ru=Kn.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
`,ou=Kn.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`,au=Kn.div`
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  
  &.emitida {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.paga {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
  }
`,iu=Kn.div`
  padding: 1rem;
`,su=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .label {
    color: #7f8c8d;
  }
  
  .value {
    font-weight: 500;
    color: #2c3e50;
  }
`,lu=Kn.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #ecf0f1;
  gap: 0.5rem;
`,cu=Kn.button`
  background-color: ${e=>e.secondary?"#f39c12":"#3498db"};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${e=>e.secondary?"#d35400":"#2980b9"};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,uu=Kn.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
`;const du=function(){const[e,t]=(0,r.useState)([]),[n,o]=(0,r.useState)("todas"),[a,i]=(0,r.useState)(!0);(0,r.useEffect)((()=>{s()}),[]);const s=async()=>{try{i(!0);const e=await Gc.getFaturasByCliente();console.log("Faturas carregadas:",e),t(e||[])}catch(e){console.error("Erro ao carregar faturas:",e),el.error("N\xe3o foi poss\xedvel carregar suas faturas")}finally{i(!1)}},l=e=>new Date(e).toLocaleDateString("pt-PT"),c=e=>{if(!e)return"";switch(e.toLowerCase()){case"emitida":return"emitida";case"paga":return"paga";case"cancelada":return"cancelada";default:return""}},u="todas"===n?e:e.filter((e=>{var t;return(null===(t=e.status)||void 0===t?void 0:t.nome.toLowerCase())===n}));return(0,Da.jsxs)(Qc,{children:[(0,Da.jsxs)(Yc,{children:["Minhas Faturas",(0,Da.jsxs)(cu,{onClick:s,children:[(0,Da.jsx)("i",{className:"fas fa-sync"})," Atualizar"]})]}),(0,Da.jsxs)(Xc,{children:[(0,Da.jsx)(Jc,{active:"todas"===n,onClick:()=>o("todas"),children:"Todas"}),(0,Da.jsx)(Jc,{active:"emitida"===n,onClick:()=>o("emitida"),children:"Pendentes"}),(0,Da.jsx)(Jc,{active:"paga"===n,onClick:()=>o("paga"),children:"Pagas"})]}),a?(0,Da.jsx)(uu,{children:"Carregando faturas..."}):u.length>0?(0,Da.jsx)(Zc,{children:u.map((e=>{var t,n,r,o;return(0,Da.jsxs)(eu,{children:[(0,Da.jsxs)(tu,{children:[(0,Da.jsxs)(nu,{children:[(0,Da.jsxs)(ru,{children:["Fatura #",e.id]}),(0,Da.jsxs)(ou,{children:["Emitida em: ",l(e.createdAt)]})]}),(0,Da.jsx)(au,{className:c(null===(t=e.status)||void 0===t?void 0:t.nome),children:(null===(n=e.status)||void 0===n?void 0:n.nome)||"Desconhecido"})]}),(0,Da.jsxs)(iu,{children:[(0,Da.jsxs)(su,{children:[(0,Da.jsx)("span",{className:"label",children:"Consulta:"}),(0,Da.jsx)("span",{className:"value",children:e.consulta?l(e.consulta.data_hora):"N/A"})]}),(0,Da.jsxs)(su,{children:[(0,Da.jsx)("span",{className:"label",children:"Descri\xe7\xe3o:"}),(0,Da.jsx)("span",{className:"value",children:e.observacoes||"Consulta odontol\xf3gica"})]}),(0,Da.jsxs)(su,{children:[(0,Da.jsx)("span",{className:"label",children:"Valor:"}),(0,Da.jsx)("span",{className:"value",style:{fontSize:"1.2rem",fontWeight:"700"},children:(o=e.valor_total,`${parseFloat(o).toFixed(2)}\u20ac`)})]})]}),(0,Da.jsxs)(lu,{children:[(0,Da.jsxs)(cu,{onClick:()=>(e=>{const t=Gc.getPDFUrl(e);window.open(t,"_blank")})(e.id),children:[(0,Da.jsx)("i",{className:"fas fa-file-pdf"})," Visualizar PDF"]}),"Emitida"===(null===(r=e.status)||void 0===r?void 0:r.nome)&&(0,Da.jsx)(cu,{secondary:!0,onClick:()=>(async e=>{try{await Gc.marcarComoPaga(e),el.success("Pagamento confirmado com sucesso!"),s()}catch(t){console.error("Erro ao confirmar pagamento:",t),el.error("N\xe3o foi poss\xedvel confirmar o pagamento")}})(e.id),style:{marginLeft:"10px"},children:"Confirmar Pagamento"})]})]},e.id)}))}):(0,Da.jsxs)(uu,{children:["N\xe3o foram encontradas faturas","todas"!==n?` com status "${n}"`:"","."]})]})},pu=Kn.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,fu=Kn.div`
  display: flex;
  flex: 1;
  background-color: #f8f9fa;
  min-height: calc(100vh - 120px);
`,mu=Kn.div`
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem 0;
  height: calc(120vh - 10px);
  position: relative;
  top: 0;
`,hu=Kn.div`
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #34495e;
`,gu=Kn.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`,vu=Kn.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
`,bu=Kn.div`
  font-weight: 600;
`,yu=Kn.div`
  font-size: 0.8rem;
  color: #bdc3c7;
`,xu=Kn.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`,wu=Kn.li`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-left: 3px solid ${e=>e.active?"#3498db":"transparent"};
  background-color: ${e=>e.active?"#34495e":"transparent"};

  &:hover {
    background-color: #34495e;
  }

  a {
    text-decoration: none;
    color: #ecf0f1;
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 0.75rem;
    width: 20px;
    text-align: center;
  }
`,Su=Kn.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`,ku=Kn.div`
  margin-bottom: 2rem;
`,ju=Kn.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`,Cu=Kn.div`
  font-size: 0.875rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`,Eu=Kn.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #7f8c8d;
`,Tu=Kn.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`,Pu=Kn.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.5rem;
`,Ou=Kn.div`
  h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
`,Nu=Kn.div`
  margin-bottom: 0.5rem;

  strong {
    font-weight: 600;
  }
`,Ru=e=>{if(!e)return"N\xe3o dispon\xedvel";try{return new Date(e).toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit",year:"numeric"})}catch(t){return console.error("Erro ao formatar data:",t),e}};const _u=function(){const[e,t]=(0,r.useState)(null),[n,o]=(0,r.useState)(null),[a,i]=(0,r.useState)(!0),s=Z(),l=X();(0,r.useEffect)((()=>{const e=Fa.getCurrentUser();e?(console.log("ClientDashboardPage - Current user:",e),console.log("User type/role:",e.role||e.tipo||(e.tipoUtilizador?e.tipoUtilizador.nome:"unknown")),t(e),c(e)):s("/login")}),[s]);const c=async e=>{try{i(!0),console.log("\u23f3 Carregando dados do perfil do cliente...");const t=await cc.getClienteProfile();if(null!==t&&void 0!==t&&t.data){console.log("\u2705 Dados recebidos da API:",t.data);const n=t.data.cliente||t.data;console.log("\ud83d\udd0d Campos dispon\xedveis:",Object.keys(n).join(", ")),o({id:n.id||e.id,nome:n.nome||e.nome||e.username||"Cliente",email:n.email||e.email||"",telefone:n.telefone||e.telefone||"",dataNascimento:n.dataNascimento||"",morada:n.morada||"",nif:n.nif||""})}else console.warn("\u26a0\ufe0f Resposta vazia da API, usando dados b\xe1sicos"),o({nome:e.nome||e.username||"Cliente",email:e.email||"",telefone:e.telefone||""})}catch(t){console.error("\u274c Erro ao carregar dados:",t),el.error("N\xe3o foi poss\xedvel obter seus dados. Tente novamente mais tarde."),o({nome:e.nome||e.username||"Cliente",email:e.email||"",telefone:e.telefone||""})}finally{i(!1)}},u=e=>e?e.split(" ").map((e=>e[0])).join("").toUpperCase():"",d=()=>{const e=l.pathname;return"/cliente-dashboard"===e?"perfil":e.includes("agendamentos")&&!e.includes("novo-agendamento")?"agendamentos":e.includes("novo-agendamento")?"novo-agendamento":e.includes("historico")?"historico":e.includes("faturas")?"faturas":"perfil"};return a?(0,Da.jsx)("div",{children:"Carregando..."}):(0,Da.jsxs)(pu,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsxs)(fu,{children:[(0,Da.jsxs)(mu,{children:[(0,Da.jsx)(hu,{children:(0,Da.jsxs)(gu,{children:[(0,Da.jsx)(vu,{children:u(null===e||void 0===e?void 0:e.username)}),(0,Da.jsxs)("div",{children:[(0,Da.jsx)(bu,{children:null===e||void 0===e?void 0:e.username}),(0,Da.jsx)(yu,{children:"Cliente"})]})]})}),(0,Da.jsxs)(xu,{children:[(0,Da.jsx)(wu,{active:"perfil"===d(),children:(0,Da.jsxs)(fr,{to:"/cliente-dashboard",children:[(0,Da.jsx)("span",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-user"})}),"Meu Perfil"]})}),(0,Da.jsx)(wu,{active:"agendamentos"===d(),children:(0,Da.jsxs)(fr,{to:"/cliente-dashboard/agendamentos",children:[(0,Da.jsx)("span",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-calendar-alt"})}),"Meus Agendamentos"]})}),(0,Da.jsx)(wu,{active:"novo-agendamento"===d(),children:(0,Da.jsxs)(fr,{to:"/cliente-dashboard/agendamentos/novo-agendamento",children:[(0,Da.jsx)("span",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-plus"})}),"Novo Agendamento"]})}),(0,Da.jsx)(wu,{active:"historico"===d(),children:(0,Da.jsxs)(fr,{to:"/cliente-dashboard/historico",children:[(0,Da.jsx)("span",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-history"})}),"Hist\xf3rico de Consultas"]})}),(0,Da.jsx)(wu,{active:"faturas"===d(),children:(0,Da.jsxs)(fr,{to:"/cliente-dashboard/faturas",children:[(0,Da.jsx)("span",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-file-invoice-dollar"})}),"Minhas Faturas"]})}),(0,Da.jsx)(wu,{children:(0,Da.jsxs)(fr,{to:"/",onClick:()=>Fa.logout(),children:[(0,Da.jsx)("span",{className:"icon",children:(0,Da.jsx)("i",{className:"fas fa-sign-out-alt"})}),"Sair"]})})]})]}),(0,Da.jsxs)(Su,{children:[(0,Da.jsxs)(ku,{children:[(0,Da.jsxs)(ju,{children:["perfil"===d()&&"Meu Perfil","agendamentos"===d()&&"Meus Agendamentos","novo-agendamento"===d()&&"Novo Agendamento","historico"===d()&&"Hist\xf3rico de Consultas","faturas"===d()&&"Minhas Faturas"]}),(0,Da.jsxs)(Cu,{children:[(0,Da.jsx)(fr,{to:"/",children:"In\xedcio"})," / ",(0,Da.jsx)("span",{children:"\xc1rea do Cliente"})," /",(0,Da.jsxs)("span",{children:["perfil"===d()&&" Meu Perfil","agendamentos"===d()&&" Meus Agendamentos","novo-agendamento"===d()&&" Novo Agendamento","historico"===d()&&" Hist\xf3rico de Consultas","faturas"===d()&&" Minhas Faturas"]})]})]}),a?(0,Da.jsx)(Eu,{children:"Carregando dados..."}):(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsxs)(Tu,{children:[(0,Da.jsx)(Pu,{children:u((null===n||void 0===n?void 0:n.nome)||"")}),(0,Da.jsxs)(Ou,{children:[(0,Da.jsxs)("h2",{children:["Bem-vindo, ",(null===n||void 0===n?void 0:n.nome)||"Cliente"]}),(0,Da.jsxs)(Nu,{children:[(0,Da.jsx)("strong",{children:"Email:"})," ",(null===n||void 0===n?void 0:n.email)||"N\xe3o dispon\xedvel"]}),(0,Da.jsxs)(Nu,{children:[(0,Da.jsx)("strong",{children:"Telefone:"})," ",(null===n||void 0===n?void 0:n.telefone)||"N\xe3o dispon\xedvel"]}),(null===n||void 0===n?void 0:n.dataNascimento)&&(0,Da.jsxs)(Nu,{children:[(0,Da.jsx)("strong",{children:"Data de Nascimento:"})," ",Ru(n.dataNascimento)]}),(null===n||void 0===n?void 0:n.morada)&&(0,Da.jsxs)(Nu,{children:[(0,Da.jsx)("strong",{children:"Morada:"})," ",n.morada]}),(null===n||void 0===n?void 0:n.nif)&&(0,Da.jsxs)(Nu,{children:[(0,Da.jsx)("strong",{children:"NIF:"})," ",n.nif]})]})]}),(0,Da.jsxs)(ye,{children:[(0,Da.jsx)(ve,{index:!0,element:(0,Da.jsx)(yc,{clienteData:n})}),(0,Da.jsx)(ve,{path:"agendamentos",element:(0,Da.jsx)(Oc,{})}),(0,Da.jsx)(ve,{path:"agendamentos/novo-agendamento",element:(0,Da.jsx)(Vc,{})}),(0,Da.jsx)(ve,{path:"historico",element:(0,Da.jsx)(Mc,{})}),(0,Da.jsx)(ve,{path:"faturas",element:(0,Da.jsx)(du,{})})]})]})]})]}),(0,Da.jsx)(Ai,{})]})},Au=Kn.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`,zu=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`,Mu=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`,Iu=Kn.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 15px;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    border: none;
    background: none;
    outline: none;
    padding: 5px;
    width: 100%;
    color: #2c3e50;
  }

  i {
    color: #7f8c8d;
    margin-right: 10px;
  }
`,$u=Kn.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  i {
    margin-right: 8px;
  }
`,Fu=Kn.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e1e5e8;
  }

  th {
    font-weight: 600;
    color: #7f8c8d;
    background-color: #f8f9fa;
  }

  tbody tr {
    &:hover {
      background-color: #f8f9fa;
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`,Du=Kn.button`
  background: none;
  border: none;
  color: ${e=>e.color||"#3498db"};
  cursor: pointer;
  margin-right: 10px;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: ${e=>e.hoverColor||"#2980b9"};
  }
`,Lu=Kn.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 5px;
`,Bu=Kn.button`
  background-color: ${e=>e.active?"#3498db":"#fff"};
  color: ${e=>e.active?"#fff":"#2c3e50"};
  border: 1px solid #e1e5e8;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${e=>e.active?"#3498db":"#f8f9fa"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`,Uu=Kn.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,Wu=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`,Hu=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #7f8c8d;
    transition: color 0.3s;

    &:hover {
      color: #2c3e50;
    }
  }
`,Vu=Kn.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`,qu=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: 500;
    color: #2c3e50;
  }

  input, select, textarea {
    padding: 10px;
    border: 1px solid #e1e5e8;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #3498db;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`,Ku=Kn.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`,Gu=Kn.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &.cancel {
    background-color: #e1e5e8;
    color: #2c3e50;

    &:hover {
      background-color: #cfd5d9;
    }
  }

  &.save {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  }

  &.delete {
    background-color: #e74c3c;
    color: white;

    &:hover {
      background-color: #c0392b;
    }
  }
`,Qu=()=>{const[e,t]=(0,r.useState)([]),[n,o]=(0,r.useState)(!0),[a,i]=(0,r.useState)(""),[s,l]=(0,r.useState)(1),[c,u]=(0,r.useState)(1),[d,p]=(0,r.useState)(!1),[f,m]=(0,r.useState)(null),[h,g]=(0,r.useState)({nome:"",email:"",telefone:"",dataNascimento:"",endereco:"",observacoes:""}),v=Z(),b=X().pathname.includes("/dashboard"),y=Fa.getCurrentUser(),x=y&&y.roles&&y.roles.includes("ROLE_ADMIN");(0,r.useEffect)((()=>{b&&!x?v("/login"):w()}),[s,b,x,v]);const w=async()=>{try{o(!0);const e=b?"clientes":"clientes/public",n=await Ia.get(e,{params:{page:s-1,size:10}});n.data&&n.data.items?(t(n.data.items),u(Math.ceil(n.data.total/10))):(t([]),u(1)),o(!1)}catch(e){el.error("Erro ao carregar clientes"),o(!1),console.error("Error fetching clientes:",e),t([])}},S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(g({nome:e.nome,email:e.email,telefone:e.telefone,dataNascimento:e.dataNascimento?e.dataNascimento.split("T")[0]:"",endereco:e.endereco,observacoes:e.observacoes||""}),m(e)):(g({nome:"",email:"",telefone:"",dataNascimento:"",endereco:"",observacoes:""}),m(null)),p(!0)},k=()=>{p(!1),m(null)},j=e=>{const{name:t,value:n}=e.target;g({...h,[t]:n})};return(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Au,{children:"Gest\xe3o de Clientes"}),(0,Da.jsxs)(zu,{children:[(0,Da.jsxs)(Mu,{children:[(0,Da.jsxs)(Iu,{children:[(0,Da.jsx)("i",{className:"fas fa-search"}),(0,Da.jsx)("input",{type:"text",placeholder:"Pesquisar clientes...",value:a,onChange:e=>{i(e.target.value)}})]}),b&&(0,Da.jsxs)($u,{onClick:()=>S(),children:[(0,Da.jsx)("i",{className:"fas fa-plus"}),"Adicionar Cliente"]})]}),n?(0,Da.jsx)("p",{children:"Carregando..."}):(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsxs)(Fu,{children:[(0,Da.jsx)("thead",{children:(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("th",{children:"Nome"}),(0,Da.jsx)("th",{children:"Email"}),(0,Da.jsx)("th",{children:"Telefone"}),(0,Da.jsx)("th",{children:"Data de Nascimento"}),b&&(0,Da.jsx)("th",{children:"A\xe7\xf5es"})]})}),(0,Da.jsx)("tbody",{children:e.length>0?e.map((e=>(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("td",{children:e.nome}),(0,Da.jsx)("td",{children:e.email}),(0,Da.jsx)("td",{children:e.telefone}),(0,Da.jsx)("td",{children:e.dataNascimento?new Date(e.dataNascimento).toLocaleDateString():"---"}),b&&(0,Da.jsxs)("td",{children:[(0,Da.jsx)(Du,{onClick:()=>S(e),children:(0,Da.jsx)("i",{className:"fas fa-edit"})}),(0,Da.jsx)(Du,{color:"#e74c3c",hoverColor:"#c0392b",onClick:()=>(async e=>{if(window.confirm("Tem certeza que deseja remover este cliente?"))try{await Ia.delete(`clientes/${e}`),el.success("Cliente removido com sucesso!"),w()}catch(t){el.error("Erro ao remover cliente"),console.error("Error deleting cliente:",t)}})(e.id),children:(0,Da.jsx)("i",{className:"fas fa-trash"})})]})]},e.id))):(0,Da.jsx)("tr",{children:(0,Da.jsx)("td",{colSpan:b?5:4,style:{textAlign:"center"},children:"Nenhum cliente encontrado"})})})]}),(0,Da.jsxs)(Lu,{children:[(0,Da.jsx)(Bu,{onClick:()=>l((e=>Math.max(e-1,1))),disabled:1===s,children:(0,Da.jsx)("i",{className:"fas fa-chevron-left"})}),Array.from({length:c},((e,t)=>t+1)).map((e=>(0,Da.jsx)(Bu,{active:s===e,onClick:()=>l(e),children:e},e))),(0,Da.jsx)(Bu,{onClick:()=>l((e=>Math.min(e+1,c))),disabled:s===c,children:(0,Da.jsx)("i",{className:"fas fa-chevron-right"})})]})]})]}),d&&b&&(0,Da.jsx)(Uu,{children:(0,Da.jsxs)(Wu,{children:[(0,Da.jsxs)(Hu,{children:[(0,Da.jsx)("h2",{children:f?"Editar Cliente":"Adicionar Cliente"}),(0,Da.jsx)("button",{onClick:k,children:"\xd7"})]}),(0,Da.jsxs)(Vu,{onSubmit:async e=>{e.preventDefault();try{f?(await Ia.put(`clientes/${f.id}`,h),el.success("Cliente atualizado com sucesso!")):(await Ia.post("clientes",h),el.success("Cliente adicionado com sucesso!")),k(),w()}catch(t){el.error("Erro ao salvar cliente"),console.error("Error saving cliente:",t)}},children:[(0,Da.jsxs)(qu,{children:[(0,Da.jsx)("label",{htmlFor:"nome",children:"Nome*"}),(0,Da.jsx)("input",{type:"text",id:"nome",name:"nome",value:h.nome,onChange:j,required:!0})]}),(0,Da.jsxs)(qu,{children:[(0,Da.jsx)("label",{htmlFor:"email",children:"Email*"}),(0,Da.jsx)("input",{type:"email",id:"email",name:"email",value:h.email,onChange:j,required:!0})]}),(0,Da.jsxs)(qu,{children:[(0,Da.jsx)("label",{htmlFor:"telefone",children:"Telefone*"}),(0,Da.jsx)("input",{type:"tel",id:"telefone",name:"telefone",value:h.telefone,onChange:j,required:!0})]}),(0,Da.jsxs)(qu,{children:[(0,Da.jsx)("label",{htmlFor:"dataNascimento",children:"Data de Nascimento"}),(0,Da.jsx)("input",{type:"date",id:"dataNascimento",name:"dataNascimento",value:h.dataNascimento,onChange:j})]}),(0,Da.jsxs)(qu,{children:[(0,Da.jsx)("label",{htmlFor:"endereco",children:"Endere\xe7o"}),(0,Da.jsx)("input",{type:"text",id:"endereco",name:"endereco",value:h.endereco,onChange:j})]}),(0,Da.jsxs)(qu,{children:[(0,Da.jsx)("label",{htmlFor:"observacoes",children:"Observa\xe7\xf5es"}),(0,Da.jsx)("textarea",{id:"observacoes",name:"observacoes",value:h.observacoes,onChange:j})]}),(0,Da.jsxs)(Ku,{children:[(0,Da.jsx)(Gu,{type:"button",className:"cancel",onClick:k,children:"Cancelar"}),(0,Da.jsx)(Gu,{type:"submit",className:"save",children:f?"Atualizar":"Salvar"})]})]})]})})]})},Yu=Kn.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`,Xu=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`,Ju=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`,Zu=Kn.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 15px;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    border: none;
    background: none;
    outline: none;
    padding: 5px;
    width: 100%;
    color: #2c3e50;
  }

  i {
    color: #7f8c8d;
    margin-right: 10px;
  }
`,ed=Kn.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  i {
    margin-right: 8px;
  }
`,td=Kn.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e1e5e8;
  }

  th {
    font-weight: 600;
    color: #7f8c8d;
    background-color: #f8f9fa;
  }

  tbody tr {
    &:hover {
      background-color: #f8f9fa;
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`,nd=Kn.button`
  background: none;
  border: none;
  color: ${e=>e.color||"#3498db"};
  cursor: pointer;
  margin-right: 10px;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: ${e=>e.hoverColor||"#2980b9"};
  }
`,rd=Kn.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
  &.paga {
    background-color: #2ecc71;
    color: white;
  }
  
  &.pendente {
    background-color: #f39c12;
    color: white;
  }
  
  &.cancelada {
    background-color: #e74c3c;
    color: white;
  }
`,od=Kn.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 5px;
`,ad=Kn.button`
  background-color: ${e=>e.active?"#3498db":"#fff"};
  color: ${e=>e.active?"#fff":"#2c3e50"};
  border: 1px solid #e1e5e8;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${e=>e.active?"#3498db":"#f8f9fa"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`,id=()=>{const[e,t]=(0,r.useState)([]),[n,o]=(0,r.useState)(!0),[a,i]=(0,r.useState)(""),[s,l]=(0,r.useState)(1),[c,u]=(0,r.useState)(1);(0,r.useEffect)((()=>{d()}),[s]);const d=async()=>{try{o(!0);const e=await Ia.get("faturas",{params:{page:s-1,size:10}});t(e.data.items||[]),u(Math.ceil((e.data.total||0)/10)),o(!1)}catch(e){console.error("Error fetching faturas:",e),o(!1)}},p=e=>{switch(e.toLowerCase()){case"paga":return"paga";case"pendente":return"pendente";case"cancelada":return"cancelada";default:return""}};return(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Yu,{children:"Gest\xe3o de Faturas"}),(0,Da.jsxs)(Xu,{children:[(0,Da.jsxs)(Ju,{children:[(0,Da.jsxs)(Zu,{children:[(0,Da.jsx)("i",{className:"fas fa-search"}),(0,Da.jsx)("input",{type:"text",placeholder:"Pesquisar faturas...",value:a,onChange:e=>{i(e.target.value)}})]}),(0,Da.jsxs)(ed,{children:[(0,Da.jsx)("i",{className:"fas fa-plus"}),"Criar Nova Fatura"]})]}),n?(0,Da.jsx)("p",{children:"Carregando..."}):(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsxs)(td,{children:[(0,Da.jsx)("thead",{children:(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("th",{children:"N\xba Fatura"}),(0,Da.jsx)("th",{children:"Cliente"}),(0,Da.jsx)("th",{children:"Data"}),(0,Da.jsx)("th",{children:"Valor"}),(0,Da.jsx)("th",{children:"Estado"}),(0,Da.jsx)("th",{children:"A\xe7\xf5es"})]})}),(0,Da.jsx)("tbody",{children:e.length>0?e.map((e=>{var t,n;return(0,Da.jsxs)("tr",{children:[(0,Da.jsxs)("td",{children:["#",e.numero]}),(0,Da.jsx)("td",{children:(null===(t=e.cliente)||void 0===t?void 0:t.nome)||"Cliente n\xe3o dispon\xedvel"}),(0,Da.jsx)("td",{children:new Date(e.dataEmissao).toLocaleDateString()}),(0,Da.jsx)("td",{children:(n=e.valorTotal,new Intl.NumberFormat("pt-PT",{style:"currency",currency:"EUR"}).format(n))}),(0,Da.jsx)("td",{children:(0,Da.jsx)(rd,{className:p(e.estado),children:e.estado})}),(0,Da.jsxs)("td",{children:[(0,Da.jsx)(nd,{onClick:()=>{return t=e.id,void console.log(`Ver detalhes da fatura ${t}`);var t},children:(0,Da.jsx)("i",{className:"fas fa-eye"})}),(0,Da.jsx)(nd,{onClick:()=>{return t=e.id,void console.log(`Imprimir fatura ${t}`);var t},children:(0,Da.jsx)("i",{className:"fas fa-print"})})]})]},e.id)})):(0,Da.jsx)("tr",{children:(0,Da.jsx)("td",{colSpan:"6",style:{textAlign:"center"},children:"Nenhuma fatura encontrada"})})})]}),(0,Da.jsxs)(od,{children:[(0,Da.jsx)(ad,{onClick:()=>l((e=>Math.max(e-1,1))),disabled:1===s,children:(0,Da.jsx)("i",{className:"fas fa-chevron-left"})}),Array.from({length:c},((e,t)=>t+1)).map((e=>(0,Da.jsx)(ad,{active:s===e,onClick:()=>l(e),children:e},e))),(0,Da.jsx)(ad,{onClick:()=>l((e=>Math.min(e+1,c))),disabled:s===c,children:(0,Da.jsx)("i",{className:"fas fa-chevron-right"})})]})]})]})]})},sd=Kn.div`
  padding: 2rem;
`,ld=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,cd=Kn.h2`
  font-size: 1.5rem;
  color: #2c3e50;
`,ud=Kn.div`
  display: flex;
  gap: 1rem;
`,dd=Kn.button`
  background-color: ${e=>e.active?"#3498db":"#f5f5f5"};
  color: ${e=>e.active?"white":"#333"};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${e=>e.active?"#3498db":"#e0e0e0"};
  }
`,pd=Kn.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
`,fd=Kn.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
`,md=Kn.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background-color: #f8f9fa;
  }
`,hd=Kn.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  
  &.agendada {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.confirmada {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.finalizada {
    background-color: #e3f2fd;
    color: #1976d2;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
  }
`,gd=Kn.button`
  background-color: ${e=>e.color||"#3498db"};
  color: white;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`,vd=Kn.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`,bd=Kn.h3`
  font-size: 1.25rem;
  color: #2c3e50;
`,yd=Kn.div`
  display: flex;
  gap: 0.5rem;
`,xd=Kn.button`
  background-color: #f5f5f5;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`,wd=Kn.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`,Sd=Kn.div`
  text-align: center;
  font-weight: 500;
  color: #7f8c8d;
  padding: 0.5rem;
`,kd=Kn.div`
  background-color: ${e=>e.isToday?"#e3f2fd":e.isOutsideMonth?"#f8f9fa":"white"};
  border: 1px solid ${e=>e.hasEvents?"#3498db":"#ecf0f1"};
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 80px;
  position: relative;
  
  .day-number {
    font-weight: ${e=>e.isToday?"600":"400"};
    color: ${e=>e.isOutsideMonth?"#bdc3c7":"#2c3e50"};
  }
  
  &:hover {
    border-color: #3498db;
  }
`,jd=Kn.div`
  width: 8px;
  height: 8px;
  background-color: #3498db;
  border-radius: 50%;
  display: inline-block;
  margin-left: 4px;
`,Cd=()=>{const[e,t]=(0,r.useState)("calendar"),[n,o]=(0,r.useState)(new Date),[a,i]=(0,r.useState)([]),[s,l]=(0,r.useState)(!0),c={Agendada:"agendada",Confirmada:"confirmada",Finalizada:"finalizada",Cancelada:"cancelada"};(0,r.useEffect)((()=>{u()}),[]);const u=async()=>{try{l(!0);const e=await Ia.get("agendamentos");i(e.data),l(!1)}catch(e){console.error("Erro ao carregar consultas:",e),l(!1),el.error("Erro ao carregar consultas")}},d=(e,t)=>e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear(),p=async e=>{if(window.confirm("Tem certeza que deseja cancelar esta consulta?"))try{await xc.cancelConsulta(e),u()}catch(t){console.error("Erro ao cancelar consulta:",t)}};return(0,Da.jsxs)(sd,{children:[(0,Da.jsxs)(ld,{children:[(0,Da.jsx)(cd,{children:"Gest\xe3o de Consultas"}),(0,Da.jsxs)(ud,{children:[(0,Da.jsx)(dd,{active:"calendar"===e,onClick:()=>t("calendar"),children:"Calend\xe1rio"}),(0,Da.jsx)(dd,{active:"list"===e,onClick:()=>t("list"),children:"Lista"})]})]}),"calendar"===e?(0,Da.jsxs)(pd,{children:[(0,Da.jsxs)(vd,{children:[(0,Da.jsx)(bd,{children:n.toLocaleDateString("pt-PT",{month:"long",year:"numeric"})}),(0,Da.jsxs)(yd,{children:[(0,Da.jsx)(xd,{onClick:()=>{o((e=>{const t=new Date(e);return t.setMonth(e.getMonth()-1),t}))},children:"<"}),(0,Da.jsx)(xd,{onClick:()=>{o((e=>{const t=new Date(e);return t.setMonth(e.getMonth()+1),t}))},children:">"})]})]}),(0,Da.jsxs)(wd,{children:[["Seg","Ter","Qua","Qui","Sex","S\xe1b","Dom"].map((e=>(0,Da.jsx)(Sd,{children:e},e))),(()=>{const e=n.getFullYear(),t=n.getMonth(),r=new Date(e,t,1),o=new Date(e,t+1,0),a=[];for(let n=(0===r.getDay()?6:r.getDay()-1)-1;n>=0;n--){const r=new Date(e,t,-n);a.push({date:r,isCurrentMonth:!1,isToday:d(r,new Date)})}for(let n=1;n<=o.getDate();n++){const r=new Date(e,t,n);a.push({date:r,isCurrentMonth:!0,isToday:d(r,new Date)})}const i=42-a.length;for(let n=1;n<=i;n++){const r=new Date(e,t+1,n);a.push({date:r,isCurrentMonth:!1,isToday:d(r,new Date)})}return a})().map(((e,t)=>(0,Da.jsx)(kd,{isToday:e.isToday,isOutsideMonth:!e.isCurrentMonth,hasEvents:a.some((t=>d(new Date(t.data_hora),e.date))),children:(0,Da.jsxs)("div",{className:"day-number",children:[e.date.getDate(),a.some((t=>d(new Date(t.data_hora),e.date)))&&(0,Da.jsx)(jd,{})]})},t)))]})]}):(0,Da.jsx)(fd,{children:s?(0,Da.jsx)("p",{children:"Carregando consultas..."}):(0,Da.jsxs)(md,{children:[(0,Da.jsx)("thead",{children:(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("th",{children:"Data"}),(0,Da.jsx)("th",{children:"Hora"}),(0,Da.jsx)("th",{children:"Paciente"}),(0,Da.jsx)("th",{children:"M\xe9dico"}),(0,Da.jsx)("th",{children:"Status"}),(0,Da.jsx)("th",{children:"A\xe7\xf5es"})]})}),(0,Da.jsx)("tbody",{children:a.length>0?a.map((e=>{var t,n,r,o,a,i;return(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("td",{children:new Date(e.data_hora).toLocaleDateString("pt-PT")}),(0,Da.jsx)("td",{children:new Date(e.data_hora).toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"})}),(0,Da.jsx)("td",{children:(null===(t=e.cliente)||void 0===t?void 0:t.nome)||"Cliente"}),(0,Da.jsx)("td",{children:(null===(n=e.medico)||void 0===n?void 0:n.nome)||"M\xe9dico"}),(0,Da.jsx)("td",{children:(0,Da.jsx)(hd,{className:c[null===(r=e.status)||void 0===r?void 0:r.nome]||"agendada",children:(null===(o=e.status)||void 0===o?void 0:o.nome)||"Agendada"})}),(0,Da.jsxs)("td",{children:["Agendada"===(null===(a=e.status)||void 0===a?void 0:a.nome)&&(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(gd,{onClick:()=>(async e=>{try{await xc.updateConsulta(e,{status_id:2}),u()}catch(t){console.error("Erro ao confirmar consulta:",t)}})(e.id),children:"Confirmar"}),(0,Da.jsx)(gd,{color:"#e74c3c",onClick:()=>p(e.id),children:"Cancelar"})]}),"Confirmada"===(null===(i=e.status)||void 0===i?void 0:i.nome)&&(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(gd,{color:"#2ecc71",onClick:()=>(async e=>{try{await xc.updateConsulta(e,{status_id:3}),u()}catch(t){console.error("Erro ao finalizar consulta:",t)}})(e.id),children:"Finalizar"}),(0,Da.jsx)(gd,{color:"#e74c3c",onClick:()=>p(e.id),children:"Cancelar"})]})]})]},e.id)})):(0,Da.jsx)("tr",{children:(0,Da.jsx)("td",{colSpan:"6",style:{textAlign:"center"},children:"Nenhuma consulta encontrada"})})})]})})]})},Ed=Kn.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`,Td=Kn.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Pd=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    .stat-title {
      color: #7f8c8d;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${e=>e.iconBg||"#3498db"};
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 5px;
  }
  
  .stat-change {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    
    &.positive {
      color: #2ecc71;
    }
    
    &.negative {
      color: #e74c3c;
    }
    
    i {
      margin-right: 5px;
    }
  }
`,Od=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h2 {
      font-size: 1.25rem;
      color: #2c3e50;
      margin: 0;
    }
    
    .period-selector {
      display: flex;
      background-color: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
      
      button {
        background: none;
        border: none;
        padding: 8px 15px;
        cursor: pointer;
        transition: all 0.3s;
        
        &.active {
          background-color: #3498db;
          color: white;
        }
        
        &:hover:not(.active) {
          background-color: #e1e5e8;
        }
      }
    }
  }
  
  .chart-placeholder {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    color: #7f8c8d;
  }
`,Nd=Kn.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,Rd=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  .service-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    
    &:last-child {
      border-bottom: none;
    }
    
    .service-name {
      font-weight: 500;
      color: #2c3e50;
    }
    
    .service-value {
      font-weight: 600;
      color: #3498db;
    }
  }
`,_d=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  .status-chart-placeholder {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    color: #7f8c8d;
  }
  
  .status-legend {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    
    .legend-item {
      display: flex;
      align-items: center;
      
      .color-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 10px;
      }
      
      .status-name {
        font-size: 0.9rem;
        color: #2c3e50;
      }
      
      .status-value {
        margin-left: auto;
        font-weight: 600;
        color: #2c3e50;
      }
    }
  }
`,Ad=()=>{const[e,t]=(0,r.useState)({totalClientes:0,totalAgendamentos:0,totalFaturamento:0,taxaOcupacao:0}),[n,o]=(0,r.useState)(!0),[a,i]=(0,r.useState)("month");(0,r.useEffect)((()=>{s()}),[]);const s=async()=>{try{o(!0);await Ia.get("estatisticas");t({totalClientes:124,totalAgendamentos:38,totalFaturamento:4850,taxaOcupacao:78}),o(!1)}catch(e){console.error("Error fetching statistics:",e),o(!1)}};return(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Ed,{children:"Estat\xedsticas e An\xe1lises"}),(0,Da.jsxs)(Td,{children:[(0,Da.jsxs)(Pd,{iconBg:"#3498db",children:[(0,Da.jsxs)("div",{className:"stat-header",children:[(0,Da.jsx)("div",{className:"stat-title",children:"TOTAL DE CLIENTES"}),(0,Da.jsx)("div",{className:"stat-icon",children:(0,Da.jsx)("i",{className:"fas fa-users"})})]}),(0,Da.jsx)("div",{className:"stat-value",children:e.totalClientes}),(0,Da.jsxs)("div",{className:"stat-change positive",children:[(0,Da.jsx)("i",{className:"fas fa-arrow-up"})," 12% desde o m\xeas passado"]})]}),(0,Da.jsxs)(Pd,{iconBg:"#2ecc71",children:[(0,Da.jsxs)("div",{className:"stat-header",children:[(0,Da.jsx)("div",{className:"stat-title",children:"AGENDAMENTOS DO M\xcaS"}),(0,Da.jsx)("div",{className:"stat-icon",children:(0,Da.jsx)("i",{className:"fas fa-calendar-check"})})]}),(0,Da.jsx)("div",{className:"stat-value",children:e.totalAgendamentos}),(0,Da.jsxs)("div",{className:"stat-change positive",children:[(0,Da.jsx)("i",{className:"fas fa-arrow-up"})," 8% desde o m\xeas passado"]})]}),(0,Da.jsxs)(Pd,{iconBg:"#f39c12",children:[(0,Da.jsxs)("div",{className:"stat-header",children:[(0,Da.jsx)("div",{className:"stat-title",children:"FATURAMENTO MENSAL"}),(0,Da.jsx)("div",{className:"stat-icon",children:(0,Da.jsx)("i",{className:"fas fa-euro-sign"})})]}),(0,Da.jsx)("div",{className:"stat-value",children:(l=e.totalFaturamento,new Intl.NumberFormat("pt-PT",{style:"currency",currency:"EUR"}).format(l))}),(0,Da.jsxs)("div",{className:"stat-change positive",children:[(0,Da.jsx)("i",{className:"fas fa-arrow-up"})," 15% desde o m\xeas passado"]})]}),(0,Da.jsxs)(Pd,{iconBg:"#9b59b6",children:[(0,Da.jsxs)("div",{className:"stat-header",children:[(0,Da.jsx)("div",{className:"stat-title",children:"TAXA DE OCUPA\xc7\xc3O"}),(0,Da.jsx)("div",{className:"stat-icon",children:(0,Da.jsx)("i",{className:"fas fa-chart-pie"})})]}),(0,Da.jsxs)("div",{className:"stat-value",children:[e.taxaOcupacao,"%"]}),(0,Da.jsxs)("div",{className:"stat-change negative",children:[(0,Da.jsx)("i",{className:"fas fa-arrow-down"})," 3% desde o m\xeas passado"]})]})]}),(0,Da.jsxs)(Od,{children:[(0,Da.jsxs)("div",{className:"chart-header",children:[(0,Da.jsx)("h2",{children:"Evolu\xe7\xe3o de Faturamento"}),(0,Da.jsxs)("div",{className:"period-selector",children:[(0,Da.jsx)("button",{className:"week"===a?"active":"",onClick:()=>i("week"),children:"Semana"}),(0,Da.jsx)("button",{className:"month"===a?"active":"",onClick:()=>i("month"),children:"M\xeas"}),(0,Da.jsx)("button",{className:"year"===a?"active":"",onClick:()=>i("year"),children:"Ano"})]})]}),(0,Da.jsxs)("div",{className:"chart-placeholder",children:["Gr\xe1fico de Faturamento - ","week"===a?"Semanal":"month"===a?"Mensal":"Anual",(0,Da.jsx)("br",{}),(0,Da.jsx)("small",{children:"(Ser\xe1 implementado com biblioteca de gr\xe1ficos)"})]})]}),(0,Da.jsxs)(Nd,{children:[(0,Da.jsxs)(Rd,{children:[(0,Da.jsx)("h2",{children:"Servi\xe7os Mais Procurados"}),[{name:"Limpeza Dent\xe1ria",value:42},{name:"Consulta de Rotina",value:38},{name:"Tratamento de Canal",value:23},{name:"Branqueamento",value:18},{name:"Extra\xe7\xe3o Dent\xe1ria",value:15}].map(((e,t)=>(0,Da.jsxs)("div",{className:"service-item",children:[(0,Da.jsx)("div",{className:"service-name",children:e.name}),(0,Da.jsxs)("div",{className:"service-value",children:[e.value," agendamentos"]})]},t)))]}),(0,Da.jsxs)(_d,{children:[(0,Da.jsx)("h2",{children:"Status dos Agendamentos"}),(0,Da.jsxs)("div",{className:"status-chart-placeholder",children:["Gr\xe1fico de Pizza - Status",(0,Da.jsx)("br",{}),(0,Da.jsx)("small",{children:"(Ser\xe1 implementado com biblioteca de gr\xe1ficos)"})]}),(0,Da.jsx)("div",{className:"status-legend",children:[{name:"Confirmados",value:65,color:"#2ecc71"},{name:"Pendentes",value:25,color:"#f39c12"},{name:"Cancelados",value:10,color:"#e74c3c"}].map(((e,t)=>(0,Da.jsxs)("div",{className:"legend-item",children:[(0,Da.jsx)("div",{className:"color-indicator",style:{backgroundColor:e.color}}),(0,Da.jsx)("div",{className:"status-name",children:e.name}),(0,Da.jsxs)("div",{className:"status-value",children:[e.value,"%"]})]},t)))})]})]})]});var l},zd=e=>e.normalize("NFD").replace(/[\u0300-\u036f]/g,""),Md=Kn.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`,Id=Kn.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #2980b9;
  margin-bottom: 1rem;

  &:hover {
    color: #1a5276;
  }
`,$d=Kn.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center; /* Centraliza o título */
  text-transform: capitalize; /* Apenas a primeira letra de cada palavra em maiúscula */
`,Fd=Kn.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 1.5rem;
`,Dd=Kn.h2`
  font-size: 2rem;
  color: #2980b9;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-transform: capitalize; /* Apenas a primeira letra de cada palavra em maiúscula */
`,Ld=Kn.p`
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
`,Bd=Kn.ul`
  list-style-type: disc;
  margin-left: 1.5rem;
  color: #34495e;
`,Ud=Kn.li`
  margin-bottom: 0.5rem;
`,Wd=Kn.div`
  font-size: 3rem; /* Tamanho do ícone */
  text-align: center; /* Centraliza o ícone */
  margin-bottom: 1rem; /* Espaçamento abaixo do ícone */
  color: #2980b9; /* Cor azul para os ícones */
`,Hd=()=>{const{title:e}=function(){let{matches:e}=r.useContext(G),t=e[e.length-1];return t?t.params:{}}(),t=Z(),n=[{title:"odontologia-geral",description:"Tratamentos completos para manter a sua sa\xfade bucal em dia.",details:"A odontologia geral abrange uma variedade de servi\xe7os, incluindo limpeza, restaura\xe7\xf5es, extra\xe7\xf5es e exames regulares. Nossos dentistas est\xe3o equipados para lidar com todas as suas necessidades de sa\xfade bucal.",benefits:["Preven\xe7\xe3o de doen\xe7as bucais","Melhoria da sa\xfade geral","Tratamentos personalizados"],additionalInfo:"A consulta regular com um dentista \xe9 essencial para manter a sa\xfade bucal. Recomendamos visitas a cada seis meses.",icon:"fas fa-tooth"},{title:"ortodontia",description:"Corre\xe7\xe3o do alinhamento dos dentes.",details:"A ortodontia \xe9 especializada na corre\xe7\xe3o de dentes e mand\xedbulas desalinhados. Usamos aparelhos modernos e discretos para garantir que voc\xea tenha um sorriso bonito e saud\xe1vel.",benefits:["Melhora na est\xe9tica do sorriso","Facilita a higiene bucal","Reduz o risco de problemas dent\xe1rios futuros"],additionalInfo:"Os tratamentos ortod\xf4nticos podem durar de 6 meses a 2 anos, dependendo da complexidade do caso.",icon:"fas fa-teeth"},{title:"implantes-dentarios",description:"Substitua dentes perdidos com implantes.",details:"Os implantes dent\xe1rios s\xe3o uma solu\xe7\xe3o permanente para dentes perdidos. Eles s\xe3o projetados para se parecer e funcionar como dentes naturais, proporcionando conforto e funcionalidade.",benefits:["Solu\xe7\xe3o duradoura","Melhora na mastiga\xe7\xe3o","Aumenta a autoestima"],additionalInfo:"Os implantes s\xe3o feitos de tit\xe2nio, um material biocompat\xedvel que se integra ao osso.",icon:"fas fa-teeth-open"},{title:"endodontia",description:"Tratamento de canal especializado.",details:"A endodontia \xe9 o tratamento de problemas relacionados \xe0 polpa dent\xe1ria. Nossos especialistas garantem que voc\xea esteja confort\xe1vel durante todo o processo.",benefits:["Al\xedvio da dor","Preserva\xe7\xe3o do dente natural","Tratamento eficaz"],additionalInfo:"O tratamento de canal pode salvar um dente que, de outra forma, precisaria ser extra\xeddo.",icon:"fas fa-pump-medical"},{title:"estetica-dental",description:"Procedimentos para melhorar a apar\xeancia do seu sorriso.",details:"A est\xe9tica dental inclui uma variedade de tratamentos, como clareamento, facetas e restaura\xe7\xf5es est\xe9ticas, para ajudar voc\xea a alcan\xe7ar o sorriso dos seus sonhos.",benefits:["Sorriso mais brilhante","Aumento da confian\xe7a","Resultados personalizados"],additionalInfo:"Os tratamentos est\xe9ticos s\xe3o personalizados para atender \xe0s suas necessidades e desejos espec\xedficos.",icon:"fas fa-smile"},{title:"odontopediatria",description:"Cuidados dent\xe1rios especializados para crian\xe7as.",details:"A odontopediatria \xe9 focada na sa\xfade bucal de crian\xe7as e adolescentes. Criamos um ambiente acolhedor e divertido para que as crian\xe7as se sintam confort\xe1veis durante as consultas.",benefits:["Cuidados preventivos","Educa\xe7\xe3o sobre higiene bucal","Tratamentos adaptados para crian\xe7as"],additionalInfo:"As consultas regulares ajudam a estabelecer h\xe1bitos saud\xe1veis desde cedo.",icon:"fas fa-baby"}].find((t=>zd(t.title)===zd(e)));return(0,Da.jsxs)(Md,{children:[(0,Da.jsx)(Id,{onClick:()=>t(-1),children:"\u2190 Voltar"})," ",n?(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsxs)(Wd,{children:[(0,Da.jsx)("i",{className:n.icon})," "]}),(0,Da.jsx)($d,{children:n.title.replace(/-/g," ")})," ",(0,Da.jsx)(Fd,{children:n.description}),(0,Da.jsx)(Dd,{children:"Detalhes"}),(0,Da.jsx)(Ld,{children:n.details}),(0,Da.jsx)(Dd,{children:"Benef\xedcios"}),(0,Da.jsx)(Bd,{children:n.benefits.map(((e,t)=>(0,Da.jsxs)(Ud,{children:[(0,Da.jsx)("i",{className:n.icon})," ",e," "]},t)))}),(0,Da.jsx)(Dd,{children:"Informa\xe7\xf5es Adicionais"}),(0,Da.jsx)(Ld,{children:n.additionalInfo})]}):(0,Da.jsx)("p",{children:"Servi\xe7o n\xe3o encontrado."})]})};const Vd=new class{async getAllUsuarios(){return Ia.get("utilizadores")}async getUsuarioById(e){return Ia.get(`utilizador/${e}`)}async updateUsuario(e,t){return Ia.put(`utilizadores/${e}`,t)}async deleteUsuario(e){return Ia.delete(`utilizadores/${e}`)}async getAllClientes(){return Ia.get("utilizadores/clientes")}async getAllMedicos(){return Ia.get("utilizadores/medicos")}};const qd=new class{async getMedicoPerfil(){try{const e=Fa.getCurrentUser();if(!e||!e.id)throw new Error("Usu\xe1rio n\xe3o encontrado");return await Vd.getUsuarioById(e.id)}catch(e){throw console.error("Erro ao buscar perfil do m\xe9dico:",e),e}}async updateMedicoPerfil(e){try{const t=Fa.getCurrentUser();if(!t||!t.id)throw new Error("Usu\xe1rio n\xe3o encontrado");const n={nome:e.nome,email:e.email,telefone:e.telefone},r={crm:e.crm,especialidade_id:e.especialidade_id,horarioAtendimento:e.horarioAtendimento};return{success:!0,data:(await Ia.put(`/medicos/${t.id}/perfil`,{utilizador:n,medico:r})).data}}catch(t){throw console.error("Erro ao atualizar perfil do m\xe9dico:",t),t}}async getConsultas(){try{const e=Fa.getCurrentUser();if(!e||!e.id)throw new Error("Usu\xe1rio n\xe3o identificado");const t=await Ia.get(`consulta/utilizador/${e.id}?tipo=medico`),n=t.data.filter((e=>!e.status||3!==e.status.id));return console.log(`Total de consultas: ${t.data.length}, Ap\xf3s filtro: ${n.length}`),n}catch(e){throw console.error("Erro ao buscar consultas:",e),e}}async getConsultasConcluidas(){try{const e=Fa.getCurrentUser();if(!e||!e.id)throw new Error("Usu\xe1rio n\xe3o identificado");const t=await Ia.get(`consulta/utilizador/${e.id}?tipo=medico`),n=t.data.filter((e=>e.status&&3===e.status.id));return console.log(`Total de consultas: ${t.data.length}, Conclu\xeddas: ${n.length}`),n}catch(e){throw console.error("Erro ao buscar consultas conclu\xeddas:",e),e}}async getFaturas(){try{const e=Fa.getCurrentUser();return(await Ia.get(`/faturas/medico/${e.id}`)).data}catch(e){throw console.error("Erro ao buscar faturas:",e),e}}async corrigirRegistros(){try{return(await Ia.post("/medicos/corrigir-registros")).data}catch(e){throw console.error("Erro ao corrigir registros:",e),e}}},Kd=Kn.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`,Gd=Kn.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`,Qd=(Kn.div`
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
`,Kn.div`
  flex: 1;
`),Yd=Kn.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Xd=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,Jd=Kn.label`
  font-weight: 500;
  color: #2c3e50;
`,Zd=Kn.input`
  padding: 0.75rem;
  border: 1px solid #dcdde1;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &:disabled {
    background-color: #f5f6fa;
  }
`,ep=Kn.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  align-self: flex-start;

  &:hover {
    background-color: #2980b9;
  }
`;const tp=function(){const[e,t]=(0,r.useState)({nome:"",email:"",telefone:"",especialidade:"",crm:"",horarioAtendimento:"",biografia:""}),[n,o]=(0,r.useState)(!0),[a,i]=(0,r.useState)(null);(0,r.useEffect)((()=>{s()}),[]);const s=async()=>{try{o(!0),console.log("Iniciando carregamento do perfil do m\xe9dico...");const a=Fa.getCurrentUser();if(console.log("Usu\xe1rio atual:",a),!a||!a.accessToken)return console.error("Token n\xe3o encontrado!"),void i("Token de autentica\xe7\xe3o ausente");const c=await qd.getMedicoPerfil();console.log("Dados brutos recebidos:",c);const u=c.data;var e,n,r,s,l;if(u)t({nome:u.nome||"",email:u.email||"",telefone:u.telefone||"",especialidade:(null===(e=u.medico)||void 0===e||null===(n=e.especialidade)||void 0===n?void 0:n.nome)||"",crm:(null===(r=u.medico)||void 0===r?void 0:r.crm)||"",horarioAtendimento:(null===(s=u.medico)||void 0===s?void 0:s.horarioAtendimento)||"",biografia:(null===(l=u.medico)||void 0===l?void 0:l.biografia)||""});else i("Dados do m\xe9dico n\xe3o encontrados"),He.error("Dados do m\xe9dico n\xe3o encontrados")}catch(a){console.error("Erro detalhado:",a.response||a),i("Erro ao carregar dados do perfil"),He.error("Erro ao carregar dados do perfil")}finally{o(!1)}},l=e=>{const{name:n,value:r}=e.target;t((e=>({...e,[n]:r})))};return n?(0,Da.jsx)("div",{children:"Carregando dados do perfil..."}):a?(0,Da.jsxs)("div",{children:["Erro: ",a]}):(0,Da.jsxs)("div",{children:[(0,Da.jsx)("h2",{children:"Informa\xe7\xf5es Pessoais"}),(0,Da.jsxs)(Kd,{children:[(0,Da.jsx)(Gd,{children:(0,Da.jsxs)(Qd,{children:[(0,Da.jsx)("h3",{children:e.nome}),(0,Da.jsx)("p",{children:e.especialidade})]})}),(0,Da.jsxs)(Yd,{onSubmit:async t=>{t.preventDefault();try{(await qd.updateMedicoPerfil(e)).success&&He.success("Perfil atualizado com sucesso!")}catch(a){console.error("Erro ao atualizar:",a),He.error("Erro ao atualizar perfil")}},children:[(0,Da.jsxs)(Xd,{children:[(0,Da.jsx)(Jd,{children:"Nome Completo"}),(0,Da.jsx)(Zd,{type:"text",name:"nome",value:e.nome,onChange:l})]}),(0,Da.jsxs)(Xd,{children:[(0,Da.jsx)(Jd,{children:"Email"}),(0,Da.jsx)(Zd,{type:"email",name:"email",value:e.email,disabled:!0}),(0,Da.jsx)("small",{children:"O email n\xe3o pode ser alterado"})]}),(0,Da.jsxs)(Xd,{children:[(0,Da.jsx)(Jd,{children:"Telefone"}),(0,Da.jsx)(Zd,{type:"tel",name:"telefone",value:e.telefone,onChange:l})]}),(0,Da.jsxs)(Xd,{children:[(0,Da.jsx)(Jd,{children:"CRM"}),(0,Da.jsx)(Zd,{type:"text",name:"crm",value:e.crm,onChange:l})]}),(0,Da.jsxs)(Xd,{children:[(0,Da.jsx)(Jd,{children:"Especialidade"}),(0,Da.jsx)(Zd,{type:"text",name:"especialidade",value:e.especialidade,onChange:l})]}),(0,Da.jsxs)(Xd,{children:[(0,Da.jsx)(Jd,{children:"Hor\xe1rio de Atendimento"}),(0,Da.jsx)(Zd,{type:"text",name:"horarioAtendimento",value:e.horarioAtendimento,onChange:l})]}),(0,Da.jsx)(ep,{type:"submit",children:"Guardar Altera\xe7\xf5es"})]})]})]})};function np(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=np(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}const rp=function(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=np(e))&&(r&&(r+=" "),r+=t);return r};function op(){return op=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},op.apply(null,arguments)}var ap=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(we){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)})),this.tags=[],this.ctr=0},e}(),ip=Math.abs,sp=String.fromCharCode,lp=Object.assign;function cp(e){return e.trim()}function up(e,t,n){return e.replace(t,n)}function dp(e,t){return e.indexOf(t)}function pp(e,t){return 0|e.charCodeAt(t)}function fp(e,t,n){return e.slice(t,n)}function mp(e){return e.length}function hp(e){return e.length}function gp(e,t){return t.push(e),e}var vp=1,bp=1,yp=0,xp=0,wp=0,Sp="";function kp(e,t,n,r,o,a,i){return{value:e,root:t,parent:n,type:r,props:o,children:a,line:vp,column:bp,length:i,return:""}}function jp(e,t){return lp(kp("",null,null,"",null,null,0),e,{length:-e.length},t)}function Cp(){return wp=xp>0?pp(Sp,--xp):0,bp--,10===wp&&(bp=1,vp--),wp}function Ep(){return wp=xp<yp?pp(Sp,xp++):0,bp++,10===wp&&(bp=1,vp++),wp}function Tp(){return pp(Sp,xp)}function Pp(){return xp}function Op(e,t){return fp(Sp,e,t)}function Np(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Rp(e){return vp=bp=1,yp=mp(Sp=e),xp=0,[]}function _p(e){return Sp="",e}function Ap(e){return cp(Op(xp-1,Ip(91===e?e+2:40===e?e+1:e)))}function zp(e){for(;(wp=Tp())&&wp<33;)Ep();return Np(e)>2||Np(wp)>3?"":" "}function Mp(e,t){for(;--t&&Ep()&&!(wp<48||wp>102||wp>57&&wp<65||wp>70&&wp<97););return Op(e,Pp()+(t<6&&32==Tp()&&32==Ep()))}function Ip(e){for(;Ep();)switch(wp){case e:return xp;case 34:case 39:34!==e&&39!==e&&Ip(wp);break;case 40:41===e&&Ip(e);break;case 92:Ep()}return xp}function $p(e,t){for(;Ep()&&e+wp!==57&&(e+wp!==84||47!==Tp()););return"/*"+Op(t,xp-1)+"*"+sp(47===e?e:Ep())}function Fp(e){for(;!Np(Tp());)Ep();return Op(e,xp)}var Dp="-ms-",Lp="-moz-",Bp="-webkit-",Up="comm",Wp="rule",Hp="decl",Vp="@keyframes";function qp(e,t){for(var n="",r=hp(e),o=0;o<r;o++)n+=t(e[o],o,e,t)||"";return n}function Kp(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case Hp:return e.return=e.return||e.value;case Up:return"";case Vp:return e.return=e.value+"{"+qp(e.children,r)+"}";case Wp:e.value=e.props.join(",")}return mp(n=qp(e.children,r))?e.return=e.value+"{"+n+"}":""}function Gp(e){return _p(Qp("",null,null,null,[""],e=Rp(e),0,[0],e))}function Qp(e,t,n,r,o,a,i,s,l){for(var c=0,u=0,d=i,p=0,f=0,m=0,h=1,g=1,v=1,b=0,y="",x=o,w=a,S=r,k=y;g;)switch(m=b,b=Ep()){case 40:if(108!=m&&58==pp(k,d-1)){-1!=dp(k+=up(Ap(b),"&","&\f"),"&\f")&&(v=-1);break}case 34:case 39:case 91:k+=Ap(b);break;case 9:case 10:case 13:case 32:k+=zp(m);break;case 92:k+=Mp(Pp()-1,7);continue;case 47:switch(Tp()){case 42:case 47:gp(Xp($p(Ep(),Pp()),t,n),l);break;default:k+="/"}break;case 123*h:s[c++]=mp(k)*v;case 125*h:case 59:case 0:switch(b){case 0:case 125:g=0;case 59+u:-1==v&&(k=up(k,/\f/g,"")),f>0&&mp(k)-d&&gp(f>32?Jp(k+";",r,n,d-1):Jp(up(k," ","")+";",r,n,d-2),l);break;case 59:k+=";";default:if(gp(S=Yp(k,t,n,c,u,o,s,y,x=[],w=[],d),a),123===b)if(0===u)Qp(k,t,S,S,x,a,d,s,w);else switch(99===p&&110===pp(k,3)?100:p){case 100:case 108:case 109:case 115:Qp(e,S,S,r&&gp(Yp(e,S,S,0,0,o,s,y,o,x=[],d),w),o,w,d,s,r?x:w);break;default:Qp(k,S,S,S,[""],w,0,s,w)}}c=u=f=0,h=v=1,y=k="",d=i;break;case 58:d=1+mp(k),f=m;default:if(h<1)if(123==b)--h;else if(125==b&&0==h++&&125==Cp())continue;switch(k+=sp(b),b*h){case 38:v=u>0?1:(k+="\f",-1);break;case 44:s[c++]=(mp(k)-1)*v,v=1;break;case 64:45===Tp()&&(k+=Ap(Ep())),p=Tp(),u=d=mp(y=k+=Fp(Pp())),b++;break;case 45:45===m&&2==mp(k)&&(h=0)}}return a}function Yp(e,t,n,r,o,a,i,s,l,c,u){for(var d=o-1,p=0===o?a:[""],f=hp(p),m=0,h=0,g=0;m<r;++m)for(var v=0,b=fp(e,d+1,d=ip(h=i[m])),y=e;v<f;++v)(y=cp(h>0?p[v]+" "+b:up(b,/&\f/g,p[v])))&&(l[g++]=y);return kp(e,t,n,0===o?Wp:s,l,c,u)}function Xp(e,t,n){return kp(e,t,n,Up,sp(wp),fp(e,2,-2),0)}function Jp(e,t,n,r){return kp(e,t,n,Hp,fp(e,0,r),fp(e,r+1,-1),r)}var Zp=function(e,t,n){for(var r=0,o=0;r=o,o=Tp(),38===r&&12===o&&(t[n]=1),!Np(o);)Ep();return Op(e,xp)},ef=function(e,t){return _p(function(e,t){var n=-1,r=44;do{switch(Np(r)){case 0:38===r&&12===Tp()&&(t[n]=1),e[n]+=Zp(xp-1,t,n);break;case 2:e[n]+=Ap(r);break;case 4:if(44===r){e[++n]=58===Tp()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=sp(r)}}while(r=Ep());return e}(Rp(e),t))},tf=new WeakMap,nf=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||tf.get(n))&&!r){tf.set(e,!0);for(var o=[],a=ef(t,o),i=n.props,s=0,l=0;s<a.length;s++)for(var c=0;c<i.length;c++,l++)e.props[l]=o[s]?a[s].replace(/&\f/g,i[c]):i[c]+" "+a[s]}}},rf=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function of(e,t){switch(function(e,t){return 45^pp(e,0)?(((t<<2^pp(e,0))<<2^pp(e,1))<<2^pp(e,2))<<2^pp(e,3):0}(e,t)){case 5103:return Bp+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Bp+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Bp+e+Lp+e+Dp+e+e;case 6828:case 4268:return Bp+e+Dp+e+e;case 6165:return Bp+e+Dp+"flex-"+e+e;case 5187:return Bp+e+up(e,/(\w+).+(:[^]+)/,Bp+"box-$1$2"+Dp+"flex-$1$2")+e;case 5443:return Bp+e+Dp+"flex-item-"+up(e,/flex-|-self/,"")+e;case 4675:return Bp+e+Dp+"flex-line-pack"+up(e,/align-content|flex-|-self/,"")+e;case 5548:return Bp+e+Dp+up(e,"shrink","negative")+e;case 5292:return Bp+e+Dp+up(e,"basis","preferred-size")+e;case 6060:return Bp+"box-"+up(e,"-grow","")+Bp+e+Dp+up(e,"grow","positive")+e;case 4554:return Bp+up(e,/([^-])(transform)/g,"$1"+Bp+"$2")+e;case 6187:return up(up(up(e,/(zoom-|grab)/,Bp+"$1"),/(image-set)/,Bp+"$1"),e,"")+e;case 5495:case 3959:return up(e,/(image-set\([^]*)/,Bp+"$1$`$1");case 4968:return up(up(e,/(.+:)(flex-)?(.*)/,Bp+"box-pack:$3"+Dp+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Bp+e+e;case 4095:case 3583:case 4068:case 2532:return up(e,/(.+)-inline(.+)/,Bp+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(mp(e)-1-t>6)switch(pp(e,t+1)){case 109:if(45!==pp(e,t+4))break;case 102:return up(e,/(.+:)(.+)-([^]+)/,"$1"+Bp+"$2-$3$1"+Lp+(108==pp(e,t+3)?"$3":"$2-$3"))+e;case 115:return~dp(e,"stretch")?of(up(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==pp(e,t+1))break;case 6444:switch(pp(e,mp(e)-3-(~dp(e,"!important")&&10))){case 107:return up(e,":",":"+Bp)+e;case 101:return up(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+Bp+(45===pp(e,14)?"inline-":"")+"box$3$1"+Bp+"$2$3$1"+Dp+"$2box$3")+e}break;case 5936:switch(pp(e,t+11)){case 114:return Bp+e+Dp+up(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Bp+e+Dp+up(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Bp+e+Dp+up(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return Bp+e+Dp+e+e}return e}var af=[function(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Hp:e.return=of(e.value,e.length);break;case Vp:return qp([jp(e,{value:up(e.value,"@","@"+Bp)})],r);case Wp:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=t.exec(e))?e[0]:e}(t,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return qp([jp(e,{props:[up(t,/:(read-\w+)/,":-moz-$1")]})],r);case"::placeholder":return qp([jp(e,{props:[up(t,/:(plac\w+)/,":"+Bp+"input-$1")]}),jp(e,{props:[up(t,/:(plac\w+)/,":-moz-$1")]}),jp(e,{props:[up(t,/:(plac\w+)/,Dp+"input-$1")]})],r)}return""}))}}],sf=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var r,o,a=e.stylisPlugins||af,i={},s=[];r=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)i[t[n]]=!0;s.push(e)}));var l,c,u=[Kp,(c=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&c(e)})],d=function(e){var t=hp(e);return function(n,r,o,a){for(var i="",s=0;s<t;s++)i+=e[s](n,r,o,a)||"";return i}}([nf,rf].concat(a,u));o=function(e,t,n,r){l=n,function(e){qp(Gp(e),d)}(e?e+"{"+t.styles+"}":t.styles),r&&(p.inserted[t.name]=!0)};var p={key:t,sheet:new ap({key:t,container:r,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:o};return p.sheet.hydrate(s),p};function lf(e,t,n){var r="";return n.split(" ").forEach((function(n){void 0!==e[n]?t.push(e[n]+";"):n&&(r+=n+" ")})),r}var cf=function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)},uf=function(e,t,n){cf(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var o=t;do{e.insert(t===o?"."+r:"",o,e.sheet,!0),o=o.next}while(void 0!==o)}};var df={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pf=/[A-Z]|^ms/g,ff=/_EMO_([^_]+?)_([^]*?)_EMO_/g,mf=function(e){return 45===e.charCodeAt(1)},hf=function(e){return null!=e&&"boolean"!==typeof e},gf=St((function(e){return mf(e)?e:e.replace(pf,"-$&").toLowerCase()})),vf=function(e,t){switch(e){case"animation":case"animationName":if("string"===typeof t)return t.replace(ff,(function(e,t,n){return yf={name:t,styles:n,next:yf},t}))}return 1===df[e]||mf(e)||"number"!==typeof t||0===t?t:t+"px"};function bf(e,t,n){if(null==n)return"";var r=n;if(void 0!==r.__emotion_styles)return r;switch(typeof n){case"boolean":return"";case"object":var o=n;if(1===o.anim)return yf={name:o.name,styles:o.styles,next:yf},o.name;var a=n;if(void 0!==a.styles){var i=a.next;if(void 0!==i)for(;void 0!==i;)yf={name:i.name,styles:i.styles,next:yf},i=i.next;return a.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var o=0;o<n.length;o++)r+=bf(e,t,n[o])+";";else for(var a in n){var i=n[a];if("object"!==typeof i){var s=i;null!=t&&void 0!==t[s]?r+=a+"{"+t[s]+"}":hf(s)&&(r+=gf(a)+":"+vf(a,s)+";")}else if(!Array.isArray(i)||"string"!==typeof i[0]||null!=t&&void 0!==t[i[0]]){var l=bf(e,t,i);switch(a){case"animation":case"animationName":r+=gf(a)+":"+l+";";break;default:r+=a+"{"+l+"}"}}else for(var c=0;c<i.length;c++)hf(i[c])&&(r+=gf(a)+":"+vf(a,i[c])+";")}return r}(e,t,n);case"function":if(void 0!==e){var s=yf,l=n(e);return yf=s,bf(e,t,l)}}var c=n;if(null==t)return c;var u=t[c];return void 0!==u?u:c}var yf,xf=/label:\s*([^\s;{]+)\s*(;|$)/g;function wf(e,t,n){if(1===e.length&&"object"===typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,o="";yf=void 0;var a=e[0];null==a||void 0===a.raw?(r=!1,o+=bf(n,t,a)):o+=a[0];for(var i=1;i<e.length;i++){if(o+=bf(n,t,e[i]),r)o+=a[i]}xf.lastIndex=0;for(var s,l="";null!==(s=xf.exec(o));)l+="-"+s[1];var c=function(e){for(var t,n=0,r=0,o=e.length;o>=4;++r,o-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(o){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(o)+l;return{name:c,styles:o,next:yf}}var Sf=!!o.useInsertionEffect&&o.useInsertionEffect,kf=Sf||function(e){return e()},jf=Sf||r.useLayoutEffect,Cf=r.createContext("undefined"!==typeof HTMLElement?sf({key:"css"}):null),Ef=(Cf.Provider,function(e){return(0,r.forwardRef)((function(t,n){var o=(0,r.useContext)(Cf);return e(t,o,n)}))}),Tf=r.createContext({});var Pf={}.hasOwnProperty,Of="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",Nf=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return cf(t,n,r),kf((function(){return uf(t,n,r)})),null},Rf=Ef((function(e,t,n){var o=e.css;"string"===typeof o&&void 0!==t.registered[o]&&(o=t.registered[o]);var a=e[Of],i=[o],s="";"string"===typeof e.className?s=lf(t.registered,i,e.className):null!=e.className&&(s=e.className+" ");var l=wf(i,void 0,r.useContext(Tf));s+=t.key+"-"+l.name;var c={};for(var u in e)Pf.call(e,u)&&"css"!==u&&u!==Of&&(c[u]=e[u]);return c.className=s,n&&(c.ref=n),r.createElement(r.Fragment,null,r.createElement(Nf,{cache:t,serialized:l,isStringTag:"string"===typeof a}),r.createElement(a,c))})),_f=Rf,Af=jt,zf=function(e){return"theme"!==e},Mf=function(e){return"string"===typeof e&&e.charCodeAt(0)>96?Af:zf},If=function(e,t,n){var r;if(t){var o=t.shouldForwardProp;r=e.__emotion_forwardProp&&o?function(t){return e.__emotion_forwardProp(t)&&o(t)}:o}return"function"!==typeof r&&n&&(r=e.__emotion_forwardProp),r},$f=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return cf(t,n,r),kf((function(){return uf(t,n,r)})),null},Ff=function e(t,n){var o,a,i=t.__emotion_real===t,s=i&&t.__emotion_base||t;void 0!==n&&(o=n.label,a=n.target);var l=If(t,n,i),c=l||Mf(s),u=!c("as");return function(){var d=arguments,p=i&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==o&&p.push("label:"+o+";"),null==d[0]||void 0===d[0].raw)p.push.apply(p,d);else{var f=d[0];p.push(f[0]);for(var m=d.length,h=1;h<m;h++)p.push(d[h],f[h])}var g=Ef((function(e,t,n){var o=u&&e.as||s,i="",d=[],f=e;if(null==e.theme){for(var m in f={},e)f[m]=e[m];f.theme=r.useContext(Tf)}"string"===typeof e.className?i=lf(t.registered,d,e.className):null!=e.className&&(i=e.className+" ");var h=wf(p.concat(d),t.registered,f);i+=t.key+"-"+h.name,void 0!==a&&(i+=" "+a);var g=u&&void 0===l?Mf(o):c,v={};for(var b in e)u&&"as"===b||g(b)&&(v[b]=e[b]);return v.className=i,n&&(v.ref=n),r.createElement(r.Fragment,null,r.createElement($f,{cache:t,serialized:h,isStringTag:"string"===typeof o}),r.createElement(o,v))}));return g.displayName=void 0!==o?o:"Styled("+("string"===typeof s?s:s.displayName||s.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=s,g.__emotion_styles=p,g.__emotion_forwardProp=l,Object.defineProperty(g,"toString",{value:function(){return"."+a}}),g.withComponent=function(t,r){return e(t,op({},n,r,{shouldForwardProp:If(g,r,!0)})).apply(void 0,p)},g}}.bind(null);function Df(e,t){return Ff(e,t)}["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){Ff[e]=Ff(e)}));const Lf=[];function Bf(e){return Lf[0]=e,wf(Lf)}function Uf(e){const t=new URL(`https://mui.com/production-error/?code=${e}`);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.forEach((e=>t.searchParams.append("args[]",e))),`Minified MUI error #${e}; visit ${t} for the full message.`}function Wf(e){if("string"!==typeof e)throw new Error(Uf(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Hf(e){if("object"!==typeof e||null===e)return!1;const t=Object.getPrototypeOf(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Vf(e){if(r.isValidElement(e)||(0,vt.Hy)(e)||!Hf(e))return e;const t={};return Object.keys(e).forEach((n=>{t[n]=Vf(e[n])})),t}function qf(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{clone:!0};const o=n.clone?{...e}:e;return Hf(e)&&Hf(t)&&Object.keys(t).forEach((a=>{r.isValidElement(t[a])||(0,vt.Hy)(t[a])?o[a]=t[a]:Hf(t[a])&&Object.prototype.hasOwnProperty.call(e,a)&&Hf(e[a])?o[a]=qf(e[a],t[a],n):n.clone?o[a]=Hf(t[a])?Vf(t[a]):t[a]:o[a]=t[a]})),o}const Kf=function(e,t){return t?qf(e,t,{clone:!1}):e};const Gf={xs:0,sm:600,md:900,lg:1200,xl:1536},Qf={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Gf[e]}px)`},Yf={containerQueries:e=>({up:t=>{let n="number"===typeof t?t:Gf[t]||t;return"number"===typeof n&&(n=`${n}px`),e?`@container ${e} (min-width:${n})`:`@container (min-width:${n})`}})};function Xf(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const e=r.breakpoints||Qf;return t.reduce(((r,o,a)=>(r[e.up(e.keys[a])]=n(t[a]),r)),{})}if("object"===typeof t){const e=r.breakpoints||Qf;return Object.keys(t).reduce(((o,a)=>{if(function(e,t){return"@"===t||t.startsWith("@")&&(e.some((e=>t.startsWith(`@${e}`)))||!!t.match(/^@\d/))}(e.keys,a)){const e=function(e,t){const n=t.match(/^@([^/]+)?\/?(.+)?$/);if(!n)return null;const[,r,o]=n,a=Number.isNaN(+r)?r||0:+r;return e.containerQueries(o).up(a)}(r.containerQueries?r:Yf,a);e&&(o[e]=n(t[a],a))}else if(Object.keys(e.values||Gf).includes(a)){o[e.up(a)]=n(t[a],a)}else{const e=a;o[e]=t[e]}return o}),{})}return n(t)}function Jf(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=e.keys?.reduce(((t,n)=>(t[e.up(n)]={},t)),{});return t||{}}function Zf(e,t){return e.reduce(((e,t)=>{const n=e[t];return(!n||0===Object.keys(n).length)&&delete e[t],e}),t)}function em(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!t||"string"!==typeof t)return null;if(e&&e.vars&&n){const n=`vars.${t}`.split(".").reduce(((e,t)=>e&&e[t]?e[t]:null),e);if(null!=n)return n}return t.split(".").reduce(((e,t)=>e&&null!=e[t]?e[t]:null),e)}function tm(e,t,n){let r,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n;return r="function"===typeof e?e(n):Array.isArray(e)?e[n]||o:em(e,n)||o,t&&(r=t(r,o,e)),r}const nm=function(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=e=>{if(null==e[t])return null;const a=e[t],i=em(e.theme,r)||{};return Xf(e,a,(e=>{let r=tm(i,o,e);return e===r&&"string"===typeof e&&(r=tm(i,o,`${t}${"default"===e?"":Wf(e)}`,e)),!1===n?r:{[n]:r}}))};return a.propTypes={},a.filterProps=[t],a};const rm={m:"margin",p:"padding"},om={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},am={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},im=function(e){const t={};return n=>(void 0===t[n]&&(t[n]=e(n)),t[n])}((e=>{if(e.length>2){if(!am[e])return[e];e=am[e]}const[t,n]=e.split(""),r=rm[t],o=om[n]||"";return Array.isArray(o)?o.map((e=>r+e)):[r+o]})),sm=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],lm=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],cm=[...sm,...lm];function um(e,t,n,r){const o=em(e,t,!0)??n;return"number"===typeof o||"string"===typeof o?e=>"string"===typeof e?e:"string"===typeof o?`calc(${e} * ${o})`:o*e:Array.isArray(o)?e=>{if("string"===typeof e)return e;const t=Math.abs(e);const n=o[t];return e>=0?n:"number"===typeof n?-n:`-${n}`}:"function"===typeof o?o:()=>{}}function dm(e){return um(e,"spacing",8)}function pm(e,t){return"string"===typeof t||null==t?t:e(t)}function fm(e,t,n,r){if(!t.includes(n))return null;const o=function(e,t){return n=>e.reduce(((e,r)=>(e[r]=pm(t,n),e)),{})}(im(n),r);return Xf(e,e[n],o)}function mm(e,t){const n=dm(e.theme);return Object.keys(e).map((r=>fm(e,t,r,n))).reduce(Kf,{})}function hm(e){return mm(e,sm)}function gm(e){return mm(e,lm)}function vm(e){return mm(e,cm)}hm.propTypes={},hm.filterProps=sm,gm.propTypes={},gm.filterProps=lm,vm.propTypes={},vm.filterProps=cm;const bm=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=t.reduce(((e,t)=>(t.filterProps.forEach((n=>{e[n]=t})),e)),{}),o=e=>Object.keys(e).reduce(((t,n)=>r[n]?Kf(t,r[n](e)):t),{});return o.propTypes={},o.filterProps=t.reduce(((e,t)=>e.concat(t.filterProps)),[]),o};function ym(e){return"number"!==typeof e?e:`${e}px solid`}function xm(e,t){return nm({prop:e,themeKey:"borders",transform:t})}const wm=xm("border",ym),Sm=xm("borderTop",ym),km=xm("borderRight",ym),jm=xm("borderBottom",ym),Cm=xm("borderLeft",ym),Em=xm("borderColor"),Tm=xm("borderTopColor"),Pm=xm("borderRightColor"),Om=xm("borderBottomColor"),Nm=xm("borderLeftColor"),Rm=xm("outline",ym),_m=xm("outlineColor"),Am=e=>{if(void 0!==e.borderRadius&&null!==e.borderRadius){const t=um(e.theme,"shape.borderRadius",4),n=e=>({borderRadius:pm(t,e)});return Xf(e,e.borderRadius,n)}return null};Am.propTypes={},Am.filterProps=["borderRadius"];bm(wm,Sm,km,jm,Cm,Em,Tm,Pm,Om,Nm,Am,Rm,_m);const zm=e=>{if(void 0!==e.gap&&null!==e.gap){const t=um(e.theme,"spacing",8),n=e=>({gap:pm(t,e)});return Xf(e,e.gap,n)}return null};zm.propTypes={},zm.filterProps=["gap"];const Mm=e=>{if(void 0!==e.columnGap&&null!==e.columnGap){const t=um(e.theme,"spacing",8),n=e=>({columnGap:pm(t,e)});return Xf(e,e.columnGap,n)}return null};Mm.propTypes={},Mm.filterProps=["columnGap"];const Im=e=>{if(void 0!==e.rowGap&&null!==e.rowGap){const t=um(e.theme,"spacing",8),n=e=>({rowGap:pm(t,e)});return Xf(e,e.rowGap,n)}return null};Im.propTypes={},Im.filterProps=["rowGap"];bm(zm,Mm,Im,nm({prop:"gridColumn"}),nm({prop:"gridRow"}),nm({prop:"gridAutoFlow"}),nm({prop:"gridAutoColumns"}),nm({prop:"gridAutoRows"}),nm({prop:"gridTemplateColumns"}),nm({prop:"gridTemplateRows"}),nm({prop:"gridTemplateAreas"}),nm({prop:"gridArea"}));function $m(e,t){return"grey"===t?t:e}bm(nm({prop:"color",themeKey:"palette",transform:$m}),nm({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:$m}),nm({prop:"backgroundColor",themeKey:"palette",transform:$m}));function Fm(e){return e<=1&&0!==e?100*e+"%":e}const Dm=nm({prop:"width",transform:Fm}),Lm=e=>{if(void 0!==e.maxWidth&&null!==e.maxWidth){const t=t=>{const n=e.theme?.breakpoints?.values?.[t]||Gf[t];return n?"px"!==e.theme?.breakpoints?.unit?{maxWidth:`${n}${e.theme.breakpoints.unit}`}:{maxWidth:n}:{maxWidth:Fm(t)}};return Xf(e,e.maxWidth,t)}return null};Lm.filterProps=["maxWidth"];const Bm=nm({prop:"minWidth",transform:Fm}),Um=nm({prop:"height",transform:Fm}),Wm=nm({prop:"maxHeight",transform:Fm}),Hm=nm({prop:"minHeight",transform:Fm}),Vm=(nm({prop:"size",cssProperty:"width",transform:Fm}),nm({prop:"size",cssProperty:"height",transform:Fm}),bm(Dm,Lm,Bm,Um,Wm,Hm,nm({prop:"boxSizing"})),{border:{themeKey:"borders",transform:ym},borderTop:{themeKey:"borders",transform:ym},borderRight:{themeKey:"borders",transform:ym},borderBottom:{themeKey:"borders",transform:ym},borderLeft:{themeKey:"borders",transform:ym},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ym},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Am},color:{themeKey:"palette",transform:$m},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:$m},backgroundColor:{themeKey:"palette",transform:$m},p:{style:gm},pt:{style:gm},pr:{style:gm},pb:{style:gm},pl:{style:gm},px:{style:gm},py:{style:gm},padding:{style:gm},paddingTop:{style:gm},paddingRight:{style:gm},paddingBottom:{style:gm},paddingLeft:{style:gm},paddingX:{style:gm},paddingY:{style:gm},paddingInline:{style:gm},paddingInlineStart:{style:gm},paddingInlineEnd:{style:gm},paddingBlock:{style:gm},paddingBlockStart:{style:gm},paddingBlockEnd:{style:gm},m:{style:hm},mt:{style:hm},mr:{style:hm},mb:{style:hm},ml:{style:hm},mx:{style:hm},my:{style:hm},margin:{style:hm},marginTop:{style:hm},marginRight:{style:hm},marginBottom:{style:hm},marginLeft:{style:hm},marginX:{style:hm},marginY:{style:hm},marginInline:{style:hm},marginInlineStart:{style:hm},marginInlineEnd:{style:hm},marginBlock:{style:hm},marginBlockStart:{style:hm},marginBlockEnd:{style:hm},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:zm},rowGap:{style:Im},columnGap:{style:Mm},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Fm},maxWidth:{style:Lm},minWidth:{transform:Fm},height:{transform:Fm},maxHeight:{transform:Fm},minHeight:{transform:Fm},boxSizing:{},font:{themeKey:"font"},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}});const qm=function(){function e(e,t,n,r){const o={[e]:t,theme:n},a=r[e];if(!a)return{[e]:t};const{cssProperty:i=e,themeKey:s,transform:l,style:c}=a;if(null==t)return null;if("typography"===s&&"inherit"===t)return{[e]:t};const u=em(n,s)||{};if(c)return c(o);return Xf(o,t,(t=>{let n=tm(u,l,t);return t===n&&"string"===typeof t&&(n=tm(u,l,`${e}${"default"===t?"":Wf(t)}`,t)),!1===i?n:{[i]:n}}))}return function t(n){const{sx:r,theme:o={}}=n||{};if(!r)return null;const a=o.unstable_sxConfig??Vm;function i(n){let r=n;if("function"===typeof n)r=n(o);else if("object"!==typeof n)return n;if(!r)return null;const i=Jf(o.breakpoints),s=Object.keys(i);let l=i;return Object.keys(r).forEach((n=>{const i=function(e,t){return"function"===typeof e?e(t):e}(r[n],o);if(null!==i&&void 0!==i)if("object"===typeof i)if(a[n])l=Kf(l,e(n,i,o,a));else{const e=Xf({theme:o},i,(e=>({[n]:e})));!function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=t.reduce(((e,t)=>e.concat(Object.keys(t))),[]),o=new Set(r);return t.every((e=>o.size===Object.keys(e).length))}(e,i)?l=Kf(l,e):l[n]=t({sx:i,theme:o})}else l=Kf(l,e(n,i,o,a))})),function(e,t){if(!e.containerQueries)return t;const n=Object.keys(t).filter((e=>e.startsWith("@container"))).sort(((e,t)=>{const n=/min-width:\s*([0-9.]+)/;return+(e.match(n)?.[1]||0)-+(t.match(n)?.[1]||0)}));return n.length?n.reduce(((e,n)=>{const r=t[n];return delete e[n],e[n]=r,e}),{...t}):t}(o,Zf(s,l))}return Array.isArray(r)?r.map(i):i(r)}}();qm.filterProps=["sx"];const Km=qm;function Gm(e){const{sx:t,...n}=e,{systemProps:r,otherProps:o}=(e=>{const t={systemProps:{},otherProps:{}},n=e?.theme?.unstable_sxConfig??Vm;return Object.keys(e).forEach((r=>{n[r]?t.systemProps[r]=e[r]:t.otherProps[r]=e[r]})),t})(n);let a;return a=Array.isArray(t)?[r,...t]:"function"===typeof t?function(){const e=t(...arguments);return Hf(e)?{...r,...e}:r}:{...r,...t},{...o,sx:a}}function Qm(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5,...o}=e,a=(e=>{const t=Object.keys(e).map((t=>({key:t,val:e[t]})))||[];return t.sort(((e,t)=>e.val-t.val)),t.reduce(((e,t)=>({...e,[t.key]:t.val})),{})})(t),i=Object.keys(a);function s(e){return`@media (min-width:${"number"===typeof t[e]?t[e]:e}${n})`}function l(e){return`@media (max-width:${("number"===typeof t[e]?t[e]:e)-r/100}${n})`}function c(e,o){const a=i.indexOf(o);return`@media (min-width:${"number"===typeof t[e]?t[e]:e}${n}) and (max-width:${(-1!==a&&"number"===typeof t[i[a]]?t[i[a]]:o)-r/100}${n})`}return{keys:i,values:a,up:s,down:l,between:c,only:function(e){return i.indexOf(e)+1<i.length?c(e,i[i.indexOf(e)+1]):s(e)},not:function(e){const t=i.indexOf(e);return 0===t?s(i[1]):t===i.length-1?l(i[t]):c(e,i[i.indexOf(e)+1]).replace("@media","@media not all and")},unit:n,...o}}const Ym={borderRadius:4};function Xm(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:dm({spacing:e});if(e.mui)return e;const n=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(0===n.length?[1]:n).map((e=>{const n=t(e);return"number"===typeof n?`${n}px`:n})).join(" ")};return n.mui=!0,n}function Jm(e,t){const n=this;if(n.vars){if(!n.colorSchemes?.[e]||"function"!==typeof n.getColorSchemeSelector)return{};let r=n.getColorSchemeSelector(e);return"&"===r?t:((r.includes("data-")||r.includes("."))&&(r=`*:where(${r.replace(/\s*&$/,"")}) &`),{[r]:t})}return n.palette.mode===e?t:{}}const Zm=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{breakpoints:t={},palette:n={},spacing:r,shape:o={},...a}=e;let i=qf({breakpoints:Qm(t),direction:"ltr",components:{},palette:{mode:"light",...n},spacing:Xm(r),shape:{...Ym,...o}},a);i=function(e){const t=(e,t)=>e.replace("@media",t?`@container ${t}`:"@container");function n(n,r){n.up=function(){return t(e.breakpoints.up(...arguments),r)},n.down=function(){return t(e.breakpoints.down(...arguments),r)},n.between=function(){return t(e.breakpoints.between(...arguments),r)},n.only=function(){return t(e.breakpoints.only(...arguments),r)},n.not=function(){const n=t(e.breakpoints.not(...arguments),r);return n.includes("not all and")?n.replace("not all and ","").replace("min-width:","width<").replace("max-width:","width>").replace("and","or"):n}}const r={},o=e=>(n(r,e),r);return n(o),{...e,containerQueries:o}}(i),i.applyStyles=Jm;for(var s=arguments.length,l=new Array(s>1?s-1:0),c=1;c<s;c++)l[c-1]=arguments[c];return i=l.reduce(((e,t)=>qf(e,t)),i),i.unstable_sxConfig={...Vm,...a?.unstable_sxConfig},i.unstable_sx=function(e){return Km({sx:e,theme:this})},i};const eh=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;const t=r.useContext(Tf);return t&&(n=t,0!==Object.keys(n).length)?t:e;var n},th=Zm();const nh=function(){return eh(arguments.length>0&&void 0!==arguments[0]?arguments[0]:th)};const rh=e=>e,oh=(()=>{let e=rh;return{configure(t){e=t},generate:t=>e(t),reset(){e=rh}}})();const ah=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.MIN_SAFE_INTEGER,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Number.MAX_SAFE_INTEGER;return Math.max(t,Math.min(e,n))};function ih(e){return ah(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,arguments.length>2&&void 0!==arguments[2]?arguments[2]:1)}function sh(e){if(e.type)return e;if("#"===e.charAt(0))return sh(function(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&1===n[0].length&&(n=n.map((e=>e+e))),n?`rgb${4===n.length?"a":""}(${n.map(((e,t)=>t<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3)).join(", ")})`:""}(e));const t=e.indexOf("("),n=e.substring(0,t);if(!["rgb","rgba","hsl","hsla","color"].includes(n))throw new Error(Uf(9,e));let r,o=e.substring(t+1,e.length-1);if("color"===n){if(o=o.split(" "),r=o.shift(),4===o.length&&"/"===o[3].charAt(0)&&(o[3]=o[3].slice(1)),!["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].includes(r))throw new Error(Uf(10,r))}else o=o.split(",");return o=o.map((e=>parseFloat(e))),{type:n,values:o,colorSpace:r}}const lh=(e,t)=>{try{return(e=>{const t=sh(e);return t.values.slice(0,3).map(((e,n)=>t.type.includes("hsl")&&0!==n?`${e}%`:e)).join(" ")})(e)}catch(n){return e}};function ch(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.includes("rgb")?r=r.map(((e,t)=>t<3?parseInt(e,10):e)):t.includes("hsl")&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),r=t.includes("color")?`${n} ${r.join(" ")}`:`${r.join(", ")}`,`${t}(${r})`}function uh(e){e=sh(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),i=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(e+n/30)%12;return o-a*Math.max(Math.min(t-3,9-t,1),-1)};let s="rgb";const l=[Math.round(255*i(0)),Math.round(255*i(8)),Math.round(255*i(4))];return"hsla"===e.type&&(s+="a",l.push(t[3])),ch({type:s,values:l})}function dh(e){let t="hsl"===(e=sh(e)).type||"hsla"===e.type?sh(uh(e)).values:e.values;return t=t.map((t=>("color"!==e.type&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4))),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function ph(e,t){return e=sh(e),t=ih(t),"rgb"!==e.type&&"hsl"!==e.type||(e.type+="a"),"color"===e.type?e.values[3]=`/${t}`:e.values[3]=t,ch(e)}function fh(e,t,n){try{return ph(e,t)}catch(r){return e}}function mh(e,t){if(e=sh(e),t=ih(t),e.type.includes("hsl"))e.values[2]*=1-t;else if(e.type.includes("rgb")||e.type.includes("color"))for(let n=0;n<3;n+=1)e.values[n]*=1-t;return ch(e)}function hh(e,t,n){try{return mh(e,t)}catch(r){return e}}function gh(e,t){if(e=sh(e),t=ih(t),e.type.includes("hsl"))e.values[2]+=(100-e.values[2])*t;else if(e.type.includes("rgb"))for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.includes("color"))for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return ch(e)}function vh(e,t,n){try{return gh(e,t)}catch(r){return e}}function bh(e,t,n){try{return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.15;return dh(e)>.5?mh(e,t):gh(e,t)}(e,t)}catch(r){return e}}const yh={black:"#000",white:"#fff"},xh={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},wh={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Sh={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},kh={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},jh={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ch={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Eh={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"};function Th(){return{text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:yh.white,default:yh.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}}}const Ph=Th();function Oh(){return{text:{primary:yh.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:yh.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}}}const Nh=Oh();function Rh(e,t,n,r){const o=r.light||r,a=r.dark||1.5*r;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:"light"===t?e.light=gh(e.main,o):"dark"===t&&(e.dark=mh(e.main,a)))}function _h(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2,...o}=e,a=e.primary||function(){return"dark"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light")?{main:jh[200],light:jh[50],dark:jh[400]}:{main:jh[700],light:jh[400],dark:jh[800]}}(t),i=e.secondary||function(){return"dark"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light")?{main:wh[200],light:wh[50],dark:wh[400]}:{main:wh[500],light:wh[300],dark:wh[700]}}(t),s=e.error||function(){return"dark"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light")?{main:Sh[500],light:Sh[300],dark:Sh[700]}:{main:Sh[700],light:Sh[400],dark:Sh[800]}}(t),l=e.info||function(){return"dark"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light")?{main:Ch[400],light:Ch[300],dark:Ch[700]}:{main:Ch[700],light:Ch[500],dark:Ch[900]}}(t),c=e.success||function(){return"dark"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light")?{main:Eh[400],light:Eh[300],dark:Eh[700]}:{main:Eh[800],light:Eh[500],dark:Eh[900]}}(t),u=e.warning||function(){return"dark"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light")?{main:kh[400],light:kh[300],dark:kh[700]}:{main:"#ed6c02",light:kh[500],dark:kh[900]}}(t);function d(e){const t=function(e,t){const n=dh(e),r=dh(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}(e,Nh.text.primary)>=n?Nh.text.primary:Ph.text.primary;return t}const p=e=>{let{color:t,name:n,mainShade:o=500,lightShade:a=300,darkShade:i=700}=e;if(t={...t},!t.main&&t[o]&&(t.main=t[o]),!t.hasOwnProperty("main"))throw new Error(Uf(11,n?` (${n})`:"",o));if("string"!==typeof t.main)throw new Error(Uf(12,n?` (${n})`:"",JSON.stringify(t.main)));return Rh(t,"light",a,r),Rh(t,"dark",i,r),t.contrastText||(t.contrastText=d(t.main)),t};let f;"light"===t?f=Th():"dark"===t&&(f=Oh());return qf({common:{...yh},mode:t,primary:p({color:a,name:"primary"}),secondary:p({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:s,name:"error"}),warning:p({color:u,name:"warning"}),info:p({color:l,name:"info"}),success:p({color:c,name:"success"}),grey:xh,contrastThreshold:n,getContrastText:d,augmentColor:p,tonalOffset:r,...f},o)}function Ah(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";function t(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];if(!r.length)return"";const a=r[0];return"string"!==typeof a||a.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)?`, ${a}`:`, var(--${e?`${e}-`:""}${a}${t(...r.slice(1))})`}return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return`var(--${e?`${e}-`:""}${n}${t(...o)})`}}function zh(e){const t={};return Object.entries(e).forEach((e=>{const[n,r]=e;"object"===typeof r&&(t[n]=`${r.fontStyle?`${r.fontStyle} `:""}${r.fontVariant?`${r.fontVariant} `:""}${r.fontWeight?`${r.fontWeight} `:""}${r.fontStretch?`${r.fontStretch} `:""}${r.fontSize||""}${r.lineHeight?`/${r.lineHeight} `:""}${r.fontFamily||""}`)})),t}const Mh=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=e;t.forEach(((e,a)=>{a===t.length-1?Array.isArray(o)?o[Number(e)]=n:o&&"object"===typeof o&&(o[e]=n):o&&"object"===typeof o&&(o[e]||(o[e]=r.includes(e)?[]:{}),o=o[e])}))};function Ih(e,t){const{prefix:n,shouldSkipGeneratingVar:r}=t||{},o={},a={},i={};var s,l;return s=(e,t,s)=>{if(("string"===typeof t||"number"===typeof t)&&(!r||!r(e,t))){const r=`--${n?`${n}-`:""}${e.join("-")}`,l=((e,t)=>"number"===typeof t?["lineHeight","fontWeight","opacity","zIndex"].some((t=>e.includes(t)))||e[e.length-1].toLowerCase().includes("opacity")?t:`${t}px`:t)(e,t);Object.assign(o,{[r]:l}),Mh(a,e,`var(${r})`,s),Mh(i,e,`var(${r}, ${l})`,s)}},l=e=>"vars"===e[0],function e(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];Object.entries(t).forEach((t=>{let[o,a]=t;(!l||l&&!l([...n,o]))&&void 0!==a&&null!==a&&("object"===typeof a&&Object.keys(a).length>0?e(a,[...n,o],Array.isArray(a)?[...r,o]:r):s([...n,o],a,r))}))}(e),{css:o,vars:a,varsWithDefaults:i}}const $h=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{getSelector:n=g,disableCssColorScheme:r,colorSchemeSelector:o}=t,{colorSchemes:a={},components:i,defaultColorScheme:s="light",...l}=e,{vars:c,css:u,varsWithDefaults:d}=Ih(l,t);let p=d;const f={},{[s]:m,...h}=a;if(Object.entries(h||{}).forEach((e=>{let[n,r]=e;const{vars:o,css:a,varsWithDefaults:i}=Ih(r,t);p=qf(p,i),f[n]={css:a,vars:o}})),m){const{css:e,vars:n,varsWithDefaults:r}=Ih(m,t);p=qf(p,r),f[s]={css:e,vars:n}}function g(t,n){let r=o;if("class"===o&&(r=".%s"),"data"===o&&(r="[data-%s]"),o?.startsWith("data-")&&!o.includes("%s")&&(r=`[${o}="%s"]`),t){if("media"===r){if(e.defaultColorScheme===t)return":root";const r=a[t]?.palette?.mode||t;return{[`@media (prefers-color-scheme: ${r})`]:{":root":n}}}if(r)return e.defaultColorScheme===t?`:root, ${r.replace("%s",String(t))}`:r.replace("%s",String(t))}return":root"}return{vars:p,generateThemeVars:()=>{let e={...c};return Object.entries(f).forEach((t=>{let[,{vars:n}]=t;e=qf(e,n)})),e},generateStyleSheets:()=>{const t=[],o=e.defaultColorScheme||"light";function i(e,n){Object.keys(n).length&&t.push("string"===typeof e?{[e]:{...n}}:e)}i(n(void 0,{...u}),u);const{[o]:s,...l}=f;if(s){const{css:e}=s,t=a[o]?.palette?.mode,l=!r&&t?{colorScheme:t,...e}:{...e};i(n(o,{...l}),l)}return Object.entries(l).forEach((e=>{let[t,{css:o}]=e;const s=a[t]?.palette?.mode,l=!r&&s?{colorScheme:s,...o}:{...o};i(n(t,{...l}),l)})),t}}};function Fh(e,t){return{toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}},...t}}const Dh={textTransform:"uppercase"},Lh='"Roboto", "Helvetica", "Arial", sans-serif';function Bh(e,t){const{fontFamily:n=Lh,fontSize:r=14,fontWeightLight:o=300,fontWeightRegular:a=400,fontWeightMedium:i=500,fontWeightBold:s=700,htmlFontSize:l=16,allVariants:c,pxToRem:u,...d}="function"===typeof t?t(e):t;const p=r/14,f=u||(e=>e/l*p+"rem"),m=(e,t,r,o,a)=>{return{fontFamily:n,fontWeight:e,fontSize:f(t),lineHeight:r,...n===Lh?{letterSpacing:(i=o/t,Math.round(1e5*i)/1e5)+"em"}:{},...a,...c};var i},h={h1:m(o,96,1.167,-1.5),h2:m(o,60,1.2,-.5),h3:m(a,48,1.167,0),h4:m(a,34,1.235,.25),h5:m(a,24,1.334,0),h6:m(i,20,1.6,.15),subtitle1:m(a,16,1.75,.15),subtitle2:m(i,14,1.57,.1),body1:m(a,16,1.5,.15),body2:m(a,14,1.43,.15),button:m(i,14,1.75,.4,Dh),caption:m(a,12,1.66,.4),overline:m(a,12,2.66,1,Dh),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return qf({htmlFontSize:l,pxToRem:f,fontFamily:n,fontSize:r,fontWeightLight:o,fontWeightRegular:a,fontWeightMedium:i,fontWeightBold:s,...h},d,{clone:!1})}function Uh(){return[`${arguments.length<=0?void 0:arguments[0]}px ${arguments.length<=1?void 0:arguments[1]}px ${arguments.length<=2?void 0:arguments[2]}px ${arguments.length<=3?void 0:arguments[3]}px rgba(0,0,0,0.2)`,`${arguments.length<=4?void 0:arguments[4]}px ${arguments.length<=5?void 0:arguments[5]}px ${arguments.length<=6?void 0:arguments[6]}px ${arguments.length<=7?void 0:arguments[7]}px rgba(0,0,0,0.14)`,`${arguments.length<=8?void 0:arguments[8]}px ${arguments.length<=9?void 0:arguments[9]}px ${arguments.length<=10?void 0:arguments[10]}px ${arguments.length<=11?void 0:arguments[11]}px rgba(0,0,0,0.12)`].join(",")}const Wh=["none",Uh(0,2,1,-1,0,1,1,0,0,1,3,0),Uh(0,3,1,-2,0,2,2,0,0,1,5,0),Uh(0,3,3,-2,0,3,4,0,0,1,8,0),Uh(0,2,4,-1,0,4,5,0,0,1,10,0),Uh(0,3,5,-1,0,5,8,0,0,1,14,0),Uh(0,3,5,-1,0,6,10,0,0,1,18,0),Uh(0,4,5,-2,0,7,10,1,0,2,16,1),Uh(0,5,5,-3,0,8,10,1,0,3,14,2),Uh(0,5,6,-3,0,9,12,1,0,3,16,2),Uh(0,6,6,-3,0,10,14,1,0,4,18,3),Uh(0,6,7,-4,0,11,15,1,0,4,20,3),Uh(0,7,8,-4,0,12,17,2,0,5,22,4),Uh(0,7,8,-4,0,13,19,2,0,5,24,4),Uh(0,7,9,-4,0,14,21,2,0,5,26,4),Uh(0,8,9,-5,0,15,22,2,0,6,28,5),Uh(0,8,10,-5,0,16,24,2,0,6,30,5),Uh(0,8,11,-5,0,17,26,2,0,6,32,5),Uh(0,9,11,-5,0,18,28,2,0,7,34,6),Uh(0,9,12,-6,0,19,29,2,0,7,36,6),Uh(0,10,13,-6,0,20,31,3,0,8,38,7),Uh(0,10,13,-6,0,21,33,3,0,8,40,7),Uh(0,10,14,-6,0,22,35,3,0,8,42,7),Uh(0,11,14,-7,0,23,36,3,0,9,44,8),Uh(0,11,15,-7,0,24,38,3,0,9,46,8)],Hh={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Vh={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function qh(e){return`${Math.round(e)}ms`}function Kh(e){if(!e)return 0;const t=e/36;return Math.min(Math.round(10*(4+15*t**.25+t/5)),3e3)}function Gh(e){const t={...Hh,...e.easing},n={...Vh,...e.duration};return{getAutoHeightDuration:Kh,create:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["all"],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{duration:o=n.standard,easing:a=t.easeInOut,delay:i=0,...s}=r;return(Array.isArray(e)?e:[e]).map((e=>`${e} ${"string"===typeof o?o:qh(o)} ${a} ${"string"===typeof i?i:qh(i)}`)).join(",")},...e,easing:t,duration:n}}const Qh={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500};function Yh(){const e={...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return function e(t){const n=Object.entries(t);for(let o=0;o<n.length;o++){const[a,i]=n[o];!Hf(r=i)&&"undefined"!==typeof r&&"string"!==typeof r&&"boolean"!==typeof r&&"number"!==typeof r&&!Array.isArray(r)||a.startsWith("unstable_")?delete t[a]:Hf(i)&&(t[a]={...i},e(t[a]))}var r}(e),`import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';\n\nconst theme = ${JSON.stringify(e,null,2)};\n\ntheme.breakpoints = createBreakpoints(theme.breakpoints || {});\ntheme.transitions = createTransitions(theme.transitions || {});\n\nexport default theme;`}function Xh(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{breakpoints:t,mixins:n={},spacing:r,palette:o={},transitions:a={},typography:i={},shape:s,...l}=e;if(e.vars&&void 0===e.generateThemeVars)throw new Error(Uf(20));const c=_h(o),u=Zm(e);let d=qf(u,{mixins:Fh(u.breakpoints,n),palette:c,shadows:Wh.slice(),typography:Bh(c,i),transitions:Gh(a),zIndex:{...Qh}});d=qf(d,l);for(var p=arguments.length,f=new Array(p>1?p-1:0),m=1;m<p;m++)f[m-1]=arguments[m];return d=f.reduce(((e,t)=>qf(e,t)),d),d.unstable_sxConfig={...Vm,...l?.unstable_sxConfig},d.unstable_sx=function(e){return Km({sx:e,theme:this})},d.toRuntimeSource=Yh,d}const Jh=Xh;function Zh(e){let t;return t=e<1?5.11916*e**2:4.5*Math.log(e+1)+2,Math.round(10*t)/1e3}const eg=[...Array(25)].map(((e,t)=>{if(0===t)return"none";const n=Zh(t);return`linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`}));function tg(e){return{inputPlaceholder:"dark"===e?.5:.42,inputUnderline:"dark"===e?.7:.42,switchTrackDisabled:"dark"===e?.2:.12,switchTrack:"dark"===e?.3:.38}}function ng(e){return"dark"===e?eg:[]}function rg(e){return!!e[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/)||!!e[0].match(/sxConfig$/)||"palette"===e[0]&&!!e[1]?.match(/(mode|contrastThreshold|tonalOffset)/)}const og=e=>[...[...Array(25)].map(((t,n)=>`--${e?`${e}-`:""}overlays-${n}`)),`--${e?`${e}-`:""}palette-AppBar-darkBg`,`--${e?`${e}-`:""}palette-AppBar-darkColor`],ag=e=>(t,n)=>{const r=e.rootSelector||":root",o=e.colorSchemeSelector;let a=o;if("class"===o&&(a=".%s"),"data"===o&&(a="[data-%s]"),o?.startsWith("data-")&&!o.includes("%s")&&(a=`[${o}="%s"]`),e.defaultColorScheme===t){if("dark"===t){const o={};return og(e.cssVarPrefix).forEach((e=>{o[e]=n[e],delete n[e]})),"media"===a?{[r]:n,"@media (prefers-color-scheme: dark)":{[r]:o}}:a?{[a.replace("%s",t)]:o,[`${r}, ${a.replace("%s",t)}`]:n}:{[r]:{...n,...o}}}if(a&&"media"!==a)return`${r}, ${a.replace("%s",String(t))}`}else if(t){if("media"===a)return{[`@media (prefers-color-scheme: ${String(t)})`]:{[r]:n}};if(a)return a.replace("%s",String(t))}return r};function ig(e,t,n){!e[t]&&n&&(e[t]=n)}function sg(e){return"string"===typeof e&&e.startsWith("hsl")?uh(e):e}function lg(e,t){`${t}Channel`in e||(e[`${t}Channel`]=lh(sg(e[t])))}const cg=e=>{try{return e()}catch(t){}};function ug(e,t,n,r){if(!t)return;t=!0===t?{}:t;const o="dark"===r?"dark":"light";if(!n)return void(e[r]=function(e){const{palette:t={mode:"light"},opacity:n,overlays:r,...o}=e,a=_h(t);return{palette:a,opacity:{...tg(a.mode),...n},overlays:r||ng(a.mode),...o}}({...t,palette:{mode:o,...t?.palette}}));const{palette:a,...i}=Jh({...n,palette:{mode:o,...t?.palette}});return e[r]={...t,palette:a,opacity:{...tg(o),...t?.opacity},overlays:t?.overlays||ng(o)},i}function dg(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{colorSchemes:t={light:!0},defaultColorScheme:n,disableCssColorScheme:r=!1,cssVarPrefix:o="mui",shouldSkipGeneratingVar:a=rg,colorSchemeSelector:i=(t.light&&t.dark?"media":void 0),rootSelector:s=":root",...l}=e,c=Object.keys(t)[0],u=n||(t.light&&"light"!==c?"light":c),d=function(){return Ah(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"mui")}(o),{[u]:p,light:f,dark:m,...h}=t,g={...h};let v=p;if(("dark"===u&&!("dark"in t)||"light"===u&&!("light"in t))&&(v=!0),!v)throw new Error(Uf(21,u));const b=ug(g,v,l,u);f&&!g.light&&ug(g,f,void 0,"light"),m&&!g.dark&&ug(g,m,void 0,"dark");let y={defaultColorScheme:u,...b,cssVarPrefix:o,colorSchemeSelector:i,rootSelector:s,getCssVar:d,colorSchemes:g,font:{...zh(b.typography),...b.font},spacing:(x=l.spacing,"number"===typeof x?`${x}px`:"string"===typeof x||"function"===typeof x||Array.isArray(x)?x:"8px")};var x;Object.keys(y.colorSchemes).forEach((e=>{const t=y.colorSchemes[e].palette,n=e=>{const n=e.split("-"),r=n[1],o=n[2];return d(e,t[r][o])};var r;if("light"===t.mode&&(ig(t.common,"background","#fff"),ig(t.common,"onBackground","#000")),"dark"===t.mode&&(ig(t.common,"background","#000"),ig(t.common,"onBackground","#fff")),r=t,["Alert","AppBar","Avatar","Button","Chip","FilledInput","LinearProgress","Skeleton","Slider","SnackbarContent","SpeedDialAction","StepConnector","StepContent","Switch","TableCell","Tooltip"].forEach((e=>{r[e]||(r[e]={})})),"light"===t.mode){ig(t.Alert,"errorColor",hh(t.error.light,.6)),ig(t.Alert,"infoColor",hh(t.info.light,.6)),ig(t.Alert,"successColor",hh(t.success.light,.6)),ig(t.Alert,"warningColor",hh(t.warning.light,.6)),ig(t.Alert,"errorFilledBg",n("palette-error-main")),ig(t.Alert,"infoFilledBg",n("palette-info-main")),ig(t.Alert,"successFilledBg",n("palette-success-main")),ig(t.Alert,"warningFilledBg",n("palette-warning-main")),ig(t.Alert,"errorFilledColor",cg((()=>t.getContrastText(t.error.main)))),ig(t.Alert,"infoFilledColor",cg((()=>t.getContrastText(t.info.main)))),ig(t.Alert,"successFilledColor",cg((()=>t.getContrastText(t.success.main)))),ig(t.Alert,"warningFilledColor",cg((()=>t.getContrastText(t.warning.main)))),ig(t.Alert,"errorStandardBg",vh(t.error.light,.9)),ig(t.Alert,"infoStandardBg",vh(t.info.light,.9)),ig(t.Alert,"successStandardBg",vh(t.success.light,.9)),ig(t.Alert,"warningStandardBg",vh(t.warning.light,.9)),ig(t.Alert,"errorIconColor",n("palette-error-main")),ig(t.Alert,"infoIconColor",n("palette-info-main")),ig(t.Alert,"successIconColor",n("palette-success-main")),ig(t.Alert,"warningIconColor",n("palette-warning-main")),ig(t.AppBar,"defaultBg",n("palette-grey-100")),ig(t.Avatar,"defaultBg",n("palette-grey-400")),ig(t.Button,"inheritContainedBg",n("palette-grey-300")),ig(t.Button,"inheritContainedHoverBg",n("palette-grey-A100")),ig(t.Chip,"defaultBorder",n("palette-grey-400")),ig(t.Chip,"defaultAvatarColor",n("palette-grey-700")),ig(t.Chip,"defaultIconColor",n("palette-grey-700")),ig(t.FilledInput,"bg","rgba(0, 0, 0, 0.06)"),ig(t.FilledInput,"hoverBg","rgba(0, 0, 0, 0.09)"),ig(t.FilledInput,"disabledBg","rgba(0, 0, 0, 0.12)"),ig(t.LinearProgress,"primaryBg",vh(t.primary.main,.62)),ig(t.LinearProgress,"secondaryBg",vh(t.secondary.main,.62)),ig(t.LinearProgress,"errorBg",vh(t.error.main,.62)),ig(t.LinearProgress,"infoBg",vh(t.info.main,.62)),ig(t.LinearProgress,"successBg",vh(t.success.main,.62)),ig(t.LinearProgress,"warningBg",vh(t.warning.main,.62)),ig(t.Skeleton,"bg",`rgba(${n("palette-text-primaryChannel")} / 0.11)`),ig(t.Slider,"primaryTrack",vh(t.primary.main,.62)),ig(t.Slider,"secondaryTrack",vh(t.secondary.main,.62)),ig(t.Slider,"errorTrack",vh(t.error.main,.62)),ig(t.Slider,"infoTrack",vh(t.info.main,.62)),ig(t.Slider,"successTrack",vh(t.success.main,.62)),ig(t.Slider,"warningTrack",vh(t.warning.main,.62));const e=bh(t.background.default,.8);ig(t.SnackbarContent,"bg",e),ig(t.SnackbarContent,"color",cg((()=>t.getContrastText(e)))),ig(t.SpeedDialAction,"fabHoverBg",bh(t.background.paper,.15)),ig(t.StepConnector,"border",n("palette-grey-400")),ig(t.StepContent,"border",n("palette-grey-400")),ig(t.Switch,"defaultColor",n("palette-common-white")),ig(t.Switch,"defaultDisabledColor",n("palette-grey-100")),ig(t.Switch,"primaryDisabledColor",vh(t.primary.main,.62)),ig(t.Switch,"secondaryDisabledColor",vh(t.secondary.main,.62)),ig(t.Switch,"errorDisabledColor",vh(t.error.main,.62)),ig(t.Switch,"infoDisabledColor",vh(t.info.main,.62)),ig(t.Switch,"successDisabledColor",vh(t.success.main,.62)),ig(t.Switch,"warningDisabledColor",vh(t.warning.main,.62)),ig(t.TableCell,"border",vh(fh(t.divider,1),.88)),ig(t.Tooltip,"bg",fh(t.grey[700],.92))}if("dark"===t.mode){ig(t.Alert,"errorColor",vh(t.error.light,.6)),ig(t.Alert,"infoColor",vh(t.info.light,.6)),ig(t.Alert,"successColor",vh(t.success.light,.6)),ig(t.Alert,"warningColor",vh(t.warning.light,.6)),ig(t.Alert,"errorFilledBg",n("palette-error-dark")),ig(t.Alert,"infoFilledBg",n("palette-info-dark")),ig(t.Alert,"successFilledBg",n("palette-success-dark")),ig(t.Alert,"warningFilledBg",n("palette-warning-dark")),ig(t.Alert,"errorFilledColor",cg((()=>t.getContrastText(t.error.dark)))),ig(t.Alert,"infoFilledColor",cg((()=>t.getContrastText(t.info.dark)))),ig(t.Alert,"successFilledColor",cg((()=>t.getContrastText(t.success.dark)))),ig(t.Alert,"warningFilledColor",cg((()=>t.getContrastText(t.warning.dark)))),ig(t.Alert,"errorStandardBg",hh(t.error.light,.9)),ig(t.Alert,"infoStandardBg",hh(t.info.light,.9)),ig(t.Alert,"successStandardBg",hh(t.success.light,.9)),ig(t.Alert,"warningStandardBg",hh(t.warning.light,.9)),ig(t.Alert,"errorIconColor",n("palette-error-main")),ig(t.Alert,"infoIconColor",n("palette-info-main")),ig(t.Alert,"successIconColor",n("palette-success-main")),ig(t.Alert,"warningIconColor",n("palette-warning-main")),ig(t.AppBar,"defaultBg",n("palette-grey-900")),ig(t.AppBar,"darkBg",n("palette-background-paper")),ig(t.AppBar,"darkColor",n("palette-text-primary")),ig(t.Avatar,"defaultBg",n("palette-grey-600")),ig(t.Button,"inheritContainedBg",n("palette-grey-800")),ig(t.Button,"inheritContainedHoverBg",n("palette-grey-700")),ig(t.Chip,"defaultBorder",n("palette-grey-700")),ig(t.Chip,"defaultAvatarColor",n("palette-grey-300")),ig(t.Chip,"defaultIconColor",n("palette-grey-300")),ig(t.FilledInput,"bg","rgba(255, 255, 255, 0.09)"),ig(t.FilledInput,"hoverBg","rgba(255, 255, 255, 0.13)"),ig(t.FilledInput,"disabledBg","rgba(255, 255, 255, 0.12)"),ig(t.LinearProgress,"primaryBg",hh(t.primary.main,.5)),ig(t.LinearProgress,"secondaryBg",hh(t.secondary.main,.5)),ig(t.LinearProgress,"errorBg",hh(t.error.main,.5)),ig(t.LinearProgress,"infoBg",hh(t.info.main,.5)),ig(t.LinearProgress,"successBg",hh(t.success.main,.5)),ig(t.LinearProgress,"warningBg",hh(t.warning.main,.5)),ig(t.Skeleton,"bg",`rgba(${n("palette-text-primaryChannel")} / 0.13)`),ig(t.Slider,"primaryTrack",hh(t.primary.main,.5)),ig(t.Slider,"secondaryTrack",hh(t.secondary.main,.5)),ig(t.Slider,"errorTrack",hh(t.error.main,.5)),ig(t.Slider,"infoTrack",hh(t.info.main,.5)),ig(t.Slider,"successTrack",hh(t.success.main,.5)),ig(t.Slider,"warningTrack",hh(t.warning.main,.5));const e=bh(t.background.default,.98);ig(t.SnackbarContent,"bg",e),ig(t.SnackbarContent,"color",cg((()=>t.getContrastText(e)))),ig(t.SpeedDialAction,"fabHoverBg",bh(t.background.paper,.15)),ig(t.StepConnector,"border",n("palette-grey-600")),ig(t.StepContent,"border",n("palette-grey-600")),ig(t.Switch,"defaultColor",n("palette-grey-300")),ig(t.Switch,"defaultDisabledColor",n("palette-grey-600")),ig(t.Switch,"primaryDisabledColor",hh(t.primary.main,.55)),ig(t.Switch,"secondaryDisabledColor",hh(t.secondary.main,.55)),ig(t.Switch,"errorDisabledColor",hh(t.error.main,.55)),ig(t.Switch,"infoDisabledColor",hh(t.info.main,.55)),ig(t.Switch,"successDisabledColor",hh(t.success.main,.55)),ig(t.Switch,"warningDisabledColor",hh(t.warning.main,.55)),ig(t.TableCell,"border",hh(fh(t.divider,1),.68)),ig(t.Tooltip,"bg",fh(t.grey[700],.92))}lg(t.background,"default"),lg(t.background,"paper"),lg(t.common,"background"),lg(t.common,"onBackground"),lg(t,"divider"),Object.keys(t).forEach((e=>{const n=t[e];"tonalOffset"!==e&&n&&"object"===typeof n&&(n.main&&ig(t[e],"mainChannel",lh(sg(n.main))),n.light&&ig(t[e],"lightChannel",lh(sg(n.light))),n.dark&&ig(t[e],"darkChannel",lh(sg(n.dark))),n.contrastText&&ig(t[e],"contrastTextChannel",lh(sg(n.contrastText))),"text"===e&&(lg(t[e],"primary"),lg(t[e],"secondary")),"action"===e&&(n.active&&lg(t[e],"active"),n.selected&&lg(t[e],"selected")))}))}));for(var w=arguments.length,S=new Array(w>1?w-1:0),k=1;k<w;k++)S[k-1]=arguments[k];y=S.reduce(((e,t)=>qf(e,t)),y);const j={prefix:o,disableCssColorScheme:r,shouldSkipGeneratingVar:a,getSelector:ag(y)},{vars:C,generateThemeVars:E,generateStyleSheets:T}=$h(y,j);return y.vars=C,Object.entries(y.colorSchemes[y.defaultColorScheme]).forEach((e=>{let[t,n]=e;y[t]=n})),y.generateThemeVars=E,y.generateStyleSheets=T,y.generateSpacing=function(){return Xm(l.spacing,dm(this))},y.getColorSchemeSelector=function(e){return function(t){return"media"===e?`@media (prefers-color-scheme: ${t})`:e?e.startsWith("data-")&&!e.includes("%s")?`[${e}="${t}"] &`:"class"===e?`.${t} &`:"data"===e?`[data-${t}] &`:`${e.replace("%s",t)} &`:"&"}}(i),y.spacing=y.generateSpacing(),y.shouldSkipGeneratingVar=a,y.unstable_sxConfig={...Vm,...l?.unstable_sxConfig},y.unstable_sx=function(e){return Km({sx:e,theme:this})},y.toRuntimeSource=Yh,y}function pg(e,t,n){e.colorSchemes&&n&&(e.colorSchemes[t]={...!0!==n&&n,palette:_h({...!0===n?{}:n.palette,mode:t})})}function fg(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{palette:t,cssVariables:n=!1,colorSchemes:r=(t?void 0:{light:!0}),defaultColorScheme:o=t?.mode,...a}=e,i=o||"light",s=r?.[i],l={...r,...t?{[i]:{..."boolean"!==typeof s&&s,palette:t}}:void 0};for(var c=arguments.length,u=new Array(c>1?c-1:0),d=1;d<c;d++)u[d-1]=arguments[d];if(!1===n){if(!("colorSchemes"in e))return Jh(e,...u);let n=t;"palette"in e||l[i]&&(!0!==l[i]?n=l[i].palette:"dark"===i&&(n={mode:"dark"}));const r=Jh({...e,palette:n},...u);return r.defaultColorScheme=i,r.colorSchemes=l,"light"===r.palette.mode&&(r.colorSchemes.light={...!0!==l.light&&l.light,palette:r.palette},pg(r,"dark",l.dark)),"dark"===r.palette.mode&&(r.colorSchemes.dark={...!0!==l.dark&&l.dark,palette:r.palette},pg(r,"light",l.light)),r}return t||"light"in l||"light"!==i||(l.light=!0),dg({...a,colorSchemes:l,defaultColorScheme:i,..."boolean"!==typeof n&&n},...u)}const mg="$$material",hg={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function gg(e,t){const n=hg[t];return n?`${arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Mui"}-${n}`:`${oh.generate(e)}-${t}`}function vg(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Mui";const r={};return t.forEach((t=>{r[t]=gg(e,t,n)})),r}const bg=vg("MuiBox",["root"]),yg=fg(),xg=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:n,defaultClassName:o="MuiBox-root",generateClassName:a}=e,i=Df("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(Km);return r.forwardRef((function(e,r){const s=nh(n),{className:l,component:c="div",...u}=Gm(e);return(0,Da.jsx)(i,{as:c,ref:r,className:rp(l,a?a(o):o),theme:t&&s[t]||s,...u})}))}({themeId:mg,defaultTheme:yg,defaultClassName:bg.root,generateClassName:oh.generate}),wg=xg;function Sg(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=Sg(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}const kg=function(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=Sg(e))&&(r&&(r+=" "),r+=t);return r};function jg(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;const r={};for(const o in e){const a=e[o];let i="",s=!0;for(let e=0;e<a.length;e+=1){const r=a[e];r&&(i+=(!0===s?"":" ")+t(r),s=!1,n&&n[r]&&(i+=" "+n[r]))}r[o]=i}return r}var Cg=function(e,t){var n=arguments;if(null==t||!Pf.call(t,"css"))return r.createElement.apply(void 0,n);var o=n.length,a=new Array(o);a[0]=_f,a[1]=function(e,t){var n={};for(var r in t)Pf.call(t,r)&&(n[r]=t[r]);return n[Of]=e,n}(e,t);for(var i=2;i<o;i++)a[i]=n[i];return r.createElement.apply(null,a)};!function(e){var t;t||(t=e.JSX||(e.JSX={}))}(Cg||(Cg={}));var Eg=Ef((function(e,t){var n=wf([e.styles],void 0,r.useContext(Tf)),o=r.useRef();return jf((function(){var e=t.key+"-global",r=new t.sheet.constructor({key:e,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),a=!1,i=document.querySelector('style[data-emotion="'+e+" "+n.name+'"]');return t.sheet.tags.length&&(r.before=t.sheet.tags[0]),null!==i&&(a=!0,i.setAttribute("data-emotion",e),r.hydrate([i])),o.current=[r,a],function(){r.flush()}}),[t]),jf((function(){var e=o.current,r=e[0];if(e[1])e[1]=!1;else{if(void 0!==n.next&&uf(t,n.next,!0),r.tags.length){var a=r.tags[r.tags.length-1].nextElementSibling;r.before=a,r.flush()}t.insert("",n,r,!1)}}),[t,n.name]),null}));function Tg(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return wf(t)}function Pg(){var e=Tg.apply(void 0,arguments),t="animation-"+e.name;return{name:t,styles:"@keyframes "+t+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}function Og(e){const{styles:t,defaultTheme:n={}}=e,r="function"===typeof t?e=>{return t(void 0===(r=e)||null===r||0===Object.keys(r).length?n:e);var r}:t;return(0,Da.jsx)(Eg,{styles:r})}const Ng=function(e){let{styles:t,themeId:n,defaultTheme:r={}}=e;const o=nh(r),a="function"===typeof t?t(n&&o[n]||o):t;return(0,Da.jsx)(Og,{styles:a})},Rg=fg();const _g=function(e){return(0,Da.jsx)(Ng,{...e,defaultTheme:Rg,themeId:mg})};function Ag(e){const{variants:t,...n}=e,r={variants:t,style:Bf(n),isProcessed:!0};return r.style===n||t&&t.forEach((e=>{"function"!==typeof e.style&&(e.style=Bf(e.style))})),r}const zg=Zm();function Mg(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}function Ig(e){return e?(t,n)=>n[e]:null}function $g(e,t){const n="function"===typeof t?t(e):t;if(Array.isArray(n))return n.flatMap((t=>$g(e,t)));if(Array.isArray(n?.variants)){let t;if(n.isProcessed)t=n.style;else{const{variants:e,...r}=n;t=r}return Fg(e,n.variants,[t])}return n?.isProcessed?n.style:n}function Fg(e,t){let n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];e:for(let o=0;o<t.length;o+=1){const a=t[o];if("function"===typeof a.props){if(n??={...e,...e.ownerState,ownerState:e.ownerState},!a.props(n))continue}else for(const t in a.props)if(e[t]!==a.props[t]&&e.ownerState?.[t]!==a.props[t])continue e;"function"===typeof a.style?(n??={...e,...e.ownerState,ownerState:e.ownerState},r.push(a.style(n))):r.push(a.style)}return r}function Dg(e,t){}function Lg(e){return e?e.charAt(0).toLowerCase()+e.slice(1):e}const Bg=function(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e},Ug=e=>Bg(e)&&"classes"!==e,Wg=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:n=zg,rootShouldForwardProp:r=Mg,slotShouldForwardProp:o=Mg}=e;function a(e){!function(e,t,n){e.theme=function(e){for(const t in e)return!1;return!0}(e.theme)?n:e.theme[t]||e.theme}(e,t,n)}return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(e,t){Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))}(e,(e=>e.filter((e=>e!==Km))));const{name:n,slot:i,skipVariantsResolver:s,skipSx:l,overridesResolver:c=Ig(Lg(i)),...u}=t,d=void 0!==s?s:i&&"Root"!==i&&"root"!==i||!1,p=l||!1;let f=Mg;"Root"===i||"root"===i?f=r:i?f=o:function(e){return"string"===typeof e&&e.charCodeAt(0)>96}(e)&&(f=void 0);const m=Df(e,{shouldForwardProp:f,label:Dg(n,i),...u}),h=e=>{if("function"===typeof e&&e.__emotion_real!==e)return function(t){return $g(t,e)};if(Hf(e)){const t=Ag(e);return t.variants?function(e){return $g(e,t)}:t.style}return e},g=function(){const t=[];for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];const s=o.map(h),l=[];if(t.push(a),n&&c&&l.push((function(e){const t=e.theme,r=t.components?.[n]?.styleOverrides;if(!r)return null;const o={};for(const n in r)o[n]=$g(e,r[n]);return c(e,o)})),n&&!d&&l.push((function(e){const t=e.theme,r=t?.components?.[n]?.variants;return r?Fg(e,r):null})),p||l.push(Km),Array.isArray(s[0])){const e=s.shift(),n=new Array(t.length).fill(""),r=new Array(l.length).fill("");let o;o=[...n,...e,...r],o.raw=[...n,...e.raw,...r],t.unshift(o)}const u=[...t,...s,...l],f=m(...u);return e.muiName&&(f.muiName=e.muiName),f};return m.withConfig&&(g.withConfig=m.withConfig),g}}({themeId:mg,defaultTheme:Rg,rootShouldForwardProp:Ug}),Hg=Wg,Vg={theme:void 0};const qg=function(e){let t,n;return function(r){let o=t;return void 0!==o&&r.theme===n||(Vg.theme=r.theme,o=Ag(e(Vg)),t=o,n=r.theme),o}};function Kg(e,t){const n={...t};for(const r in e)if(Object.prototype.hasOwnProperty.call(e,r)){const o=r;if("components"===o||"slots"===o)n[o]={...e[o],...n[o]};else if("componentsProps"===o||"slotProps"===o){const r=e[o],a=t[o];if(a)if(r){n[o]={...a};for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e)){const t=e;n[o][t]=Kg(r[t],a[t])}}else n[o]=a;else n[o]=r||{}}else void 0===n[o]&&(n[o]=e[o])}return n}const Gg=r.createContext(void 0);function Qg(e){let{props:t,name:n}=e;return function(e){const{theme:t,name:n,props:r}=e;if(!t||!t.components||!t.components[n])return r;const o=t.components[n];return o.defaultProps?Kg(o.defaultProps,r):o.styleOverrides||o.variants?r:Kg(o,r)}({props:t,name:n,theme:{components:r.useContext(Gg)}})}function Yg(e){return Qg(e)}const Xg=Wf;function Jg(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t=>{let[,n]=t;return n&&function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!function(e){return"string"===typeof e.main}(e))return!1;for(const n of t)if(!e.hasOwnProperty(n)||"string"!==typeof e[n])return!1;return!0}(n,e)}}function Zg(e){return gg("MuiTypography",e)}vg("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const ev={primary:!0,secondary:!0,error:!0,info:!0,success:!0,warning:!0,textPrimary:!0,textSecondary:!0,textDisabled:!0},tv=Gm,nv=Hg("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.variant&&t[n.variant],"inherit"!==n.align&&t[`align${Xg(n.align)}`],n.noWrap&&t.noWrap,n.gutterBottom&&t.gutterBottom,n.paragraph&&t.paragraph]}})(qg((e=>{let{theme:t}=e;return{margin:0,variants:[{props:{variant:"inherit"},style:{font:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}},...Object.entries(t.typography).filter((e=>{let[t,n]=e;return"inherit"!==t&&n&&"object"===typeof n})).map((e=>{let[t,n]=e;return{props:{variant:t},style:n}})),...Object.entries(t.palette).filter(Jg()).map((e=>{let[n]=e;return{props:{color:n},style:{color:(t.vars||t).palette[n].main}}})),...Object.entries(t.palette?.text||{}).filter((e=>{let[,t]=e;return"string"===typeof t})).map((e=>{let[n]=e;return{props:{color:`text${Xg(n)}`},style:{color:(t.vars||t).palette.text[n]}}})),{props:e=>{let{ownerState:t}=e;return"inherit"!==t.align},style:{textAlign:"var(--Typography-textAlign)"}},{props:e=>{let{ownerState:t}=e;return t.noWrap},style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},{props:e=>{let{ownerState:t}=e;return t.gutterBottom},style:{marginBottom:"0.35em"}},{props:e=>{let{ownerState:t}=e;return t.paragraph},style:{marginBottom:16}}]}}))),rv={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},ov=r.forwardRef((function(e,t){const{color:n,...r}=Yg({props:e,name:"MuiTypography"}),o=tv({...r,...!ev[n]&&{color:n}}),{align:a="inherit",className:i,component:s,gutterBottom:l=!1,noWrap:c=!1,paragraph:u=!1,variant:d="body1",variantMapping:p=rv,...f}=o,m={...o,align:a,color:n,className:i,component:s,gutterBottom:l,noWrap:c,paragraph:u,variant:d,variantMapping:p},h=s||(u?"p":p[d]||rv[d])||"span",g=(e=>{const{align:t,gutterBottom:n,noWrap:r,paragraph:o,variant:a,classes:i}=e;return jg({root:["root",a,"inherit"!==e.align&&`align${Xg(t)}`,n&&"gutterBottom",r&&"noWrap",o&&"paragraph"]},Zg,i)})(m);return(0,Da.jsx)(nv,{as:h,ref:t,className:kg(g.root,i),...f,ownerState:m,style:{..."inherit"!==a&&{"--Typography-textAlign":a},...f.style}})})),av=ov;function iv(e){return gg("MuiTableContainer",e)}vg("MuiTableContainer",["root"]);const sv=Hg("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:(e,t)=>t.root})({width:"100%",overflowX:"auto"}),lv=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTableContainer"}),{className:r,component:o="div",...a}=n,i={...n,component:o},s=(e=>{const{classes:t}=e;return jg({root:["root"]},iv,t)})(i);return(0,Da.jsx)(sv,{ref:t,as:o,className:kg(s.root,r),ownerState:i,...a})}));function cv(){const e=nh(Rg);return e[mg]||e}function uv(e){return gg("MuiPaper",e)}vg("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const dv=Hg("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,"elevation"===n.variant&&t[`elevation${n.elevation}`]]}})(qg((e=>{let{theme:t}=e;return{backgroundColor:(t.vars||t).palette.background.paper,color:(t.vars||t).palette.text.primary,transition:t.transitions.create("box-shadow"),variants:[{props:e=>{let{ownerState:t}=e;return!t.square},style:{borderRadius:t.shape.borderRadius}},{props:{variant:"outlined"},style:{border:`1px solid ${(t.vars||t).palette.divider}`}},{props:{variant:"elevation"},style:{boxShadow:"var(--Paper-shadow)",backgroundImage:"var(--Paper-overlay)"}}]}}))),pv=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiPaper"}),r=cv(),{className:o,component:a="div",elevation:i=1,square:s=!1,variant:l="elevation",...c}=n,u={...n,component:a,elevation:i,square:s,variant:l},d=(e=>{const{square:t,elevation:n,variant:r,classes:o}=e;return jg({root:["root",r,!t&&"rounded","elevation"===r&&`elevation${n}`]},uv,o)})(u);return(0,Da.jsx)(dv,{as:a,ownerState:u,className:kg(d.root,o),ref:t,...c,style:{..."elevation"===l&&{"--Paper-shadow":(r.vars||r).shadows[i],...r.vars&&{"--Paper-overlay":r.vars.overlays?.[i]},...!r.vars&&"dark"===r.palette.mode&&{"--Paper-overlay":`linear-gradient(${ph("#fff",Zh(i))}, ${ph("#fff",Zh(i))})`}},...c.style}})}));const fv=r.createContext();function mv(e){return gg("MuiTable",e)}vg("MuiTable",["root","stickyHeader"]);const hv=Hg("table",{name:"MuiTable",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.stickyHeader&&t.stickyHeader]}})(qg((e=>{let{theme:t}=e;return{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":{...t.typography.body2,padding:t.spacing(2),color:(t.vars||t).palette.text.secondary,textAlign:"left",captionSide:"bottom"},variants:[{props:e=>{let{ownerState:t}=e;return t.stickyHeader},style:{borderCollapse:"separate"}}]}}))),gv="table",vv=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTable"}),{className:o,component:a=gv,padding:i="normal",size:s="medium",stickyHeader:l=!1,...c}=n,u={...n,component:a,padding:i,size:s,stickyHeader:l},d=(e=>{const{classes:t,stickyHeader:n}=e;return jg({root:["root",n&&"stickyHeader"]},mv,t)})(u),p=r.useMemo((()=>({padding:i,size:s,stickyHeader:l})),[i,s,l]);return(0,Da.jsx)(fv.Provider,{value:p,children:(0,Da.jsx)(hv,{as:a,role:a===gv?null:"table",ref:t,className:kg(d.root,o),ownerState:u,...c})})})),bv=vv;const yv=r.createContext();function xv(e){return gg("MuiTableHead",e)}vg("MuiTableHead",["root"]);const wv=Hg("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-header-group"}),Sv={variant:"head"},kv="thead",jv=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTableHead"}),{className:r,component:o=kv,...a}=n,i={...n,component:o},s=(e=>{const{classes:t}=e;return jg({root:["root"]},xv,t)})(i);return(0,Da.jsx)(yv.Provider,{value:Sv,children:(0,Da.jsx)(wv,{as:o,className:kg(s.root,r),ref:t,role:o===kv?null:"rowgroup",ownerState:i,...a})})}));function Cv(e){return gg("MuiTableRow",e)}const Ev=vg("MuiTableRow",["root","selected","hover","head","footer"]),Tv=Hg("tr",{name:"MuiTableRow",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.head&&t.head,n.footer&&t.footer]}})(qg((e=>{let{theme:t}=e;return{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,[`&.${Ev.hover}:hover`]:{backgroundColor:(t.vars||t).palette.action.hover},[`&.${Ev.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:ph(t.palette.primary.main,t.palette.action.selectedOpacity),"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:ph(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity)}}}}))),Pv="tr",Ov=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTableRow"}),{className:o,component:a=Pv,hover:i=!1,selected:s=!1,...l}=n,c=r.useContext(yv),u={...n,component:a,hover:i,selected:s,head:c&&"head"===c.variant,footer:c&&"footer"===c.variant},d=(e=>{const{classes:t,selected:n,hover:r,head:o,footer:a}=e;return jg({root:["root",n&&"selected",r&&"hover",o&&"head",a&&"footer"]},Cv,t)})(u);return(0,Da.jsx)(Tv,{as:a,ref:t,className:kg(d.root,o),role:a===Pv?null:"row",ownerState:u,...l})})),Nv=Ov;function Rv(e){return gg("MuiTableCell",e)}const _v=vg("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]),Av=Hg("td",{name:"MuiTableCell",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`size${Xg(n.size)}`],"normal"!==n.padding&&t[`padding${Xg(n.padding)}`],"inherit"!==n.align&&t[`align${Xg(n.align)}`],n.stickyHeader&&t.stickyHeader]}})(qg((e=>{let{theme:t}=e;return{...t.typography.body2,display:"table-cell",verticalAlign:"inherit",borderBottom:t.vars?`1px solid ${t.vars.palette.TableCell.border}`:`1px solid\n    ${"light"===t.palette.mode?gh(ph(t.palette.divider,1),.88):mh(ph(t.palette.divider,1),.68)}`,textAlign:"left",padding:16,variants:[{props:{variant:"head"},style:{color:(t.vars||t).palette.text.primary,lineHeight:t.typography.pxToRem(24),fontWeight:t.typography.fontWeightMedium}},{props:{variant:"body"},style:{color:(t.vars||t).palette.text.primary}},{props:{variant:"footer"},style:{color:(t.vars||t).palette.text.secondary,lineHeight:t.typography.pxToRem(21),fontSize:t.typography.pxToRem(12)}},{props:{size:"small"},style:{padding:"6px 16px",[`&.${_v.paddingCheckbox}`]:{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}}},{props:{padding:"checkbox"},style:{width:48,padding:"0 0 0 4px"}},{props:{padding:"none"},style:{padding:0}},{props:{align:"left"},style:{textAlign:"left"}},{props:{align:"center"},style:{textAlign:"center"}},{props:{align:"right"},style:{textAlign:"right",flexDirection:"row-reverse"}},{props:{align:"justify"},style:{textAlign:"justify"}},{props:e=>{let{ownerState:t}=e;return t.stickyHeader},style:{position:"sticky",top:0,zIndex:2,backgroundColor:(t.vars||t).palette.background.default}}]}}))),zv=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTableCell"}),{align:o="inherit",className:a,component:i,padding:s,scope:l,size:c,sortDirection:u,variant:d,...p}=n,f=r.useContext(fv),m=r.useContext(yv),h=m&&"head"===m.variant;let g;g=i||(h?"th":"td");let v=l;"td"===g?v=void 0:!v&&h&&(v="col");const b=d||m&&m.variant,y={...n,align:o,component:g,padding:s||(f&&f.padding?f.padding:"normal"),size:c||(f&&f.size?f.size:"medium"),sortDirection:u,stickyHeader:"head"===b&&f&&f.stickyHeader,variant:b},x=(e=>{const{classes:t,variant:n,align:r,padding:o,size:a,stickyHeader:i}=e;return jg({root:["root",n,i&&"stickyHeader","inherit"!==r&&`align${Xg(r)}`,"normal"!==o&&`padding${Xg(o)}`,`size${Xg(a)}`]},Rv,t)})(y);let w=null;return u&&(w="asc"===u?"ascending":"descending"),(0,Da.jsx)(Av,{as:g,ref:t,className:kg(x.root,a),"aria-sort":w,scope:v,ownerState:y,...p})})),Mv=zv;function Iv(e){return gg("MuiTableBody",e)}vg("MuiTableBody",["root"]);const $v=Hg("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-row-group"}),Fv={variant:"body"},Dv="tbody",Lv=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTableBody"}),{className:r,component:o=Dv,...a}=n,i={...n,component:o},s=(e=>{const{classes:t}=e;return jg({root:["root"]},Iv,t)})(i);return(0,Da.jsx)(yv.Provider,{value:Fv,children:(0,Da.jsx)($v,{className:kg(s.root,r),as:o,ref:t,role:o===Dv?null:"rowgroup",ownerState:i,...a})})}));let Bv=0;const Uv={...o}.useId;function Wv(e){if(void 0!==Uv){const t=Uv();return e??t}return function(e){const[t,n]=r.useState(e),o=e||t;return r.useEffect((()=>{null==t&&(Bv+=1,n(`mui-${Bv}`))}),[t]),o}(e)}const Hv=Wv;function Vv(e){try{return e.matches(":focus-visible")}catch(t){0}return!1}function qv(e,t){"function"===typeof e?e(t):e&&(e.current=t)}function Kv(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return r.useMemo((()=>t.every((e=>null==e))?null:e=>{t.forEach((t=>{qv(t,e)}))}),t)}const Gv=Kv,Qv="undefined"!==typeof window?r.useLayoutEffect:r.useEffect;const Yv=function(e){const t=r.useRef(e);return Qv((()=>{t.current=e})),r.useRef((function(){return(0,t.current)(...arguments)})).current},Xv=Yv,Jv={};function Zv(e,t){const n=r.useRef(Jv);return n.current===Jv&&(n.current=e(t)),n}class eb{static create(){return new eb}static use(){const e=Zv(eb.create).current,[t,n]=r.useState(!1);return e.shouldMount=t,e.setShouldMount=n,r.useEffect(e.mountEffect,[t]),e}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=function(){let e,t;const n=new Promise(((n,r)=>{e=n,t=r}));return n.resolve=e,n.reject=t,n}(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&null!==this.ref.current&&(this.didMount=!0,this.mounted.resolve())};start(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.mount().then((()=>this.ref.current?.start(...t)))}stop(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.mount().then((()=>this.ref.current?.stop(...t)))}pulsate(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.mount().then((()=>this.ref.current?.pulsate(...t)))}}function tb(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(-1!==t.indexOf(r))continue;n[r]=e[r]}return n}function nb(e,t){return nb=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},nb(e,t)}function rb(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,nb(e,t)}const ob=r.createContext(null);function ab(e,t){var n=Object.create(null);return e&&r.Children.map(e,(function(e){return e})).forEach((function(e){n[e.key]=function(e){return t&&(0,r.isValidElement)(e)?t(e):e}(e)})),n}function ib(e,t,n){return null!=n[t]?n[t]:e.props[t]}function sb(e,t,n){var o=ab(e.children),a=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,o=Object.create(null),a=[];for(var i in e)i in t?a.length&&(o[i]=a,a=[]):a.push(i);var s={};for(var l in t){if(o[l])for(r=0;r<o[l].length;r++){var c=o[l][r];s[o[l][r]]=n(c)}s[l]=n(l)}for(r=0;r<a.length;r++)s[a[r]]=n(a[r]);return s}(t,o);return Object.keys(a).forEach((function(i){var s=a[i];if((0,r.isValidElement)(s)){var l=i in t,c=i in o,u=t[i],d=(0,r.isValidElement)(u)&&!u.props.in;!c||l&&!d?c||!l||d?c&&l&&(0,r.isValidElement)(u)&&(a[i]=(0,r.cloneElement)(s,{onExited:n.bind(null,s),in:u.props.in,exit:ib(s,"exit",e),enter:ib(s,"enter",e)})):a[i]=(0,r.cloneElement)(s,{in:!1}):a[i]=(0,r.cloneElement)(s,{onExited:n.bind(null,s),in:!0,exit:ib(s,"exit",e),enter:ib(s,"enter",e)})}})),a}var lb=Object.values||function(e){return Object.keys(e).map((function(t){return e[t]}))},cb=function(e){function t(t,n){var r,o=(r=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},r}rb(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,o,a=t.children,i=t.handleExited;return{children:t.firstRender?(n=e,o=i,ab(n.children,(function(e){return(0,r.cloneElement)(e,{onExited:o.bind(null,e),in:!0,appear:ib(e,"appear",n),enter:ib(e,"enter",n),exit:ib(e,"exit",n)})}))):sb(e,a,i),firstRender:!1}},n.handleExited=function(e,t){var n=ab(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState((function(t){var n=op({},t.children);return delete n[e.key],{children:n}})))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,o=tb(e,["component","childFactory"]),a=this.state.contextValue,i=lb(this.state.children).map(n);return delete o.appear,delete o.enter,delete o.exit,null===t?r.createElement(ob.Provider,{value:a},i):r.createElement(ob.Provider,{value:a},r.createElement(t,o,i))},t}(r.Component);cb.propTypes={},cb.defaultProps={component:"div",childFactory:function(e){return e}};const ub=cb,db=[];class pb{static create(){return new pb}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout((()=>{this.currentId=null,t()}),e)}clear=()=>{null!==this.currentId&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear}function fb(){const e=Zv(pb.create).current;var t;return t=e.disposeEffect,r.useEffect(t,db),e}const mb=function(e){const{className:t,classes:n,pulsate:o=!1,rippleX:a,rippleY:i,rippleSize:s,in:l,onExited:c,timeout:u}=e,[d,p]=r.useState(!1),f=kg(t,n.ripple,n.rippleVisible,o&&n.ripplePulsate),m={width:s,height:s,top:-s/2+i,left:-s/2+a},h=kg(n.child,d&&n.childLeaving,o&&n.childPulsate);return l||d||p(!0),r.useEffect((()=>{if(!l&&null!=c){const e=setTimeout(c,u);return()=>{clearTimeout(e)}}}),[c,l,u]),(0,Da.jsx)("span",{className:f,style:m,children:(0,Da.jsx)("span",{className:h})})};const hb=vg("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),gb=Pg`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,vb=Pg`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,bb=Pg`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,yb=Hg("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),xb=Hg(mb,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${hb.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${gb};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  &.${hb.ripplePulsate} {
    animation-duration: ${e=>{let{theme:t}=e;return t.transitions.duration.shorter}}ms;
  }

  & .${hb.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${hb.childLeaving} {
    opacity: 0;
    animation-name: ${vb};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  & .${hb.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${bb};
    animation-duration: 2500ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,wb=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTouchRipple"}),{center:o=!1,classes:a={},className:i,...s}=n,[l,c]=r.useState([]),u=r.useRef(0),d=r.useRef(null);r.useEffect((()=>{d.current&&(d.current(),d.current=null)}),[l]);const p=r.useRef(!1),f=fb(),m=r.useRef(null),h=r.useRef(null),g=r.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:r,rippleSize:o,cb:i}=e;c((e=>[...e,(0,Da.jsx)(xb,{classes:{ripple:kg(a.ripple,hb.ripple),rippleVisible:kg(a.rippleVisible,hb.rippleVisible),ripplePulsate:kg(a.ripplePulsate,hb.ripplePulsate),child:kg(a.child,hb.child),childLeaving:kg(a.childLeaving,hb.childLeaving),childPulsate:kg(a.childPulsate,hb.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:o},u.current)])),u.current+=1,d.current=i}),[a]),v=r.useCallback((function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>{};const{pulsate:r=!1,center:a=o||t.pulsate,fakeElement:i=!1}=t;if("mousedown"===e?.type&&p.current)return void(p.current=!1);"touchstart"===e?.type&&(p.current=!0);const s=i?null:h.current,l=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0};let c,u,d;if(a||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)c=Math.round(l.width/2),u=Math.round(l.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;c=Math.round(t-l.left),u=Math.round(n-l.top)}if(a)d=Math.sqrt((2*l.width**2+l.height**2)/3),d%2===0&&(d+=1);else{const e=2*Math.max(Math.abs((s?s.clientWidth:0)-c),c)+2,t=2*Math.max(Math.abs((s?s.clientHeight:0)-u),u)+2;d=Math.sqrt(e**2+t**2)}e?.touches?null===m.current&&(m.current=()=>{g({pulsate:r,rippleX:c,rippleY:u,rippleSize:d,cb:n})},f.start(80,(()=>{m.current&&(m.current(),m.current=null)}))):g({pulsate:r,rippleX:c,rippleY:u,rippleSize:d,cb:n})}),[o,g,f]),b=r.useCallback((()=>{v({},{pulsate:!0})}),[v]),y=r.useCallback(((e,t)=>{if(f.clear(),"touchend"===e?.type&&m.current)return m.current(),m.current=null,void f.start(0,(()=>{y(e,t)}));m.current=null,c((e=>e.length>0?e.slice(1):e)),d.current=t}),[f]);return r.useImperativeHandle(t,(()=>({pulsate:b,start:v,stop:y})),[b,v,y]),(0,Da.jsx)(yb,{className:kg(hb.root,a.root,i),ref:h,...s,children:(0,Da.jsx)(ub,{component:null,exit:!0,children:l})})}));function Sb(e){return gg("MuiButtonBase",e)}const kb=vg("MuiButtonBase",["root","disabled","focusVisible"]),jb=Hg("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${kb.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}});function Cb(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Xv((o=>(n&&n(o),r||e[t](o),!0)))}const Eb=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiButtonBase"}),{action:o,centerRipple:a=!1,children:i,className:s,component:l="button",disabled:c=!1,disableRipple:u=!1,disableTouchRipple:d=!1,focusRipple:p=!1,focusVisibleClassName:f,LinkComponent:m="a",onBlur:h,onClick:g,onContextMenu:v,onDragLeave:b,onFocus:y,onFocusVisible:x,onKeyDown:w,onKeyUp:S,onMouseDown:k,onMouseLeave:j,onMouseUp:C,onTouchEnd:E,onTouchMove:T,onTouchStart:P,tabIndex:O=0,TouchRippleProps:N,touchRippleRef:R,type:_,...A}=n,z=r.useRef(null),M=eb.use(),I=Gv(M.ref,R),[$,F]=r.useState(!1);c&&$&&F(!1),r.useImperativeHandle(o,(()=>({focusVisible:()=>{F(!0),z.current.focus()}})),[]);const D=M.shouldMount&&!u&&!c;r.useEffect((()=>{$&&p&&!u&&M.pulsate()}),[u,p,$,M]);const L=Cb(M,"start",k,d),B=Cb(M,"stop",v,d),U=Cb(M,"stop",b,d),W=Cb(M,"stop",C,d),H=Cb(M,"stop",(e=>{$&&e.preventDefault(),j&&j(e)}),d),V=Cb(M,"start",P,d),q=Cb(M,"stop",E,d),K=Cb(M,"stop",T,d),G=Cb(M,"stop",(e=>{Vv(e.target)||F(!1),h&&h(e)}),!1),Q=Xv((e=>{z.current||(z.current=e.currentTarget),Vv(e.target)&&(F(!0),x&&x(e)),y&&y(e)})),Y=()=>{const e=z.current;return l&&"button"!==l&&!("A"===e.tagName&&e.href)},X=Xv((e=>{p&&!e.repeat&&$&&" "===e.key&&M.stop(e,(()=>{M.start(e)})),e.target===e.currentTarget&&Y()&&" "===e.key&&e.preventDefault(),w&&w(e),e.target===e.currentTarget&&Y()&&"Enter"===e.key&&!c&&(e.preventDefault(),g&&g(e))})),J=Xv((e=>{p&&" "===e.key&&$&&!e.defaultPrevented&&M.stop(e,(()=>{M.pulsate(e)})),S&&S(e),g&&e.target===e.currentTarget&&Y()&&" "===e.key&&!e.defaultPrevented&&g(e)}));let Z=l;"button"===Z&&(A.href||A.to)&&(Z=m);const ee={};"button"===Z?(ee.type=void 0===_?"button":_,ee.disabled=c):(A.href||A.to||(ee.role="button"),c&&(ee["aria-disabled"]=c));const te=Gv(t,z),ne={...n,centerRipple:a,component:l,disabled:c,disableRipple:u,disableTouchRipple:d,focusRipple:p,tabIndex:O,focusVisible:$},re=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:o}=e,a=jg({root:["root",t&&"disabled",n&&"focusVisible"]},Sb,o);return n&&r&&(a.root+=` ${r}`),a})(ne);return(0,Da.jsxs)(jb,{as:Z,className:kg(re.root,s),ownerState:ne,onBlur:G,onClick:g,onContextMenu:B,onFocus:Q,onKeyDown:X,onKeyUp:J,onMouseDown:L,onMouseLeave:H,onMouseUp:W,onDragLeave:U,onTouchEnd:q,onTouchMove:K,onTouchStart:V,ref:te,tabIndex:c?-1:O,type:_,...ee,...A,children:[i,D?(0,Da.jsx)(wb,{ref:I,center:a,...N}):null]})}));function Tb(e){return gg("MuiCircularProgress",e)}vg("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Pb=44,Ob=Pg`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,Nb=Pg`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,Rb="string"!==typeof Ob?Tg`
        animation: ${Ob} 1.4s linear infinite;
      `:null,_b="string"!==typeof Nb?Tg`
        animation: ${Nb} 1.4s ease-in-out infinite;
      `:null,Ab=Hg("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`color${Xg(n.color)}`]]}})(qg((e=>{let{theme:t}=e;return{display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:t.transitions.create("transform")}},{props:{variant:"indeterminate"},style:Rb||{animation:`${Ob} 1.4s linear infinite`}},...Object.entries(t.palette).filter(Jg()).map((e=>{let[n]=e;return{props:{color:n},style:{color:(t.vars||t).palette[n].main}}}))]}}))),zb=Hg("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),Mb=Hg("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.circle,t[`circle${Xg(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(qg((e=>{let{theme:t}=e;return{stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:t.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&!t.disableShrink},style:_b||{animation:`${Nb} 1.4s ease-in-out infinite`}}]}}))),Ib=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiCircularProgress"}),{className:r,color:o="primary",disableShrink:a=!1,size:i=40,style:s,thickness:l=3.6,value:c=0,variant:u="indeterminate",...d}=n,p={...n,color:o,disableShrink:a,size:i,thickness:l,value:c,variant:u},f=(e=>{const{classes:t,variant:n,color:r,disableShrink:o}=e;return jg({root:["root",n,`color${Xg(r)}`],svg:["svg"],circle:["circle",`circle${Xg(n)}`,o&&"circleDisableShrink"]},Tb,t)})(p),m={},h={},g={};if("determinate"===u){const e=2*Math.PI*((Pb-l)/2);m.strokeDasharray=e.toFixed(3),g["aria-valuenow"]=Math.round(c),m.strokeDashoffset=`${((100-c)/100*e).toFixed(3)}px`,h.transform="rotate(-90deg)"}return(0,Da.jsx)(Ab,{className:kg(f.root,r),style:{width:i,height:i,...h,...s},ownerState:p,ref:t,role:"progressbar",...g,...d,children:(0,Da.jsx)(zb,{className:f.svg,ownerState:p,viewBox:"22 22 44 44",children:(0,Da.jsx)(Mb,{className:f.circle,style:m,ownerState:p,cx:Pb,cy:Pb,r:(Pb-l)/2,fill:"none",strokeWidth:l})})})})),$b=Ib;function Fb(e){return gg("MuiButton",e)}const Db=vg("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","colorPrimary","colorSecondary","colorSuccess","colorError","colorInfo","colorWarning","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","icon","iconSizeSmall","iconSizeMedium","iconSizeLarge","loading","loadingWrapper","loadingIconPlaceholder","loadingIndicator","loadingPositionCenter","loadingPositionStart","loadingPositionEnd"]);const Lb=r.createContext({});const Bb=r.createContext(void 0),Ub=[{props:{size:"small"},style:{"& > *:nth-of-type(1)":{fontSize:18}}},{props:{size:"medium"},style:{"& > *:nth-of-type(1)":{fontSize:20}}},{props:{size:"large"},style:{"& > *:nth-of-type(1)":{fontSize:22}}}],Wb=Hg(Eb,{shouldForwardProp:e=>Ug(e)||"classes"===e,name:"MuiButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`${n.variant}${Xg(n.color)}`],t[`size${Xg(n.size)}`],t[`${n.variant}Size${Xg(n.size)}`],"inherit"===n.color&&t.colorInherit,n.disableElevation&&t.disableElevation,n.fullWidth&&t.fullWidth,n.loading&&t.loading]}})(qg((e=>{let{theme:t}=e;const n="light"===t.palette.mode?t.palette.grey[300]:t.palette.grey[800],r="light"===t.palette.mode?t.palette.grey.A100:t.palette.grey[700];return{...t.typography.button,minWidth:64,padding:"6px 16px",border:0,borderRadius:(t.vars||t).shape.borderRadius,transition:t.transitions.create(["background-color","box-shadow","border-color","color"],{duration:t.transitions.duration.short}),"&:hover":{textDecoration:"none"},[`&.${Db.disabled}`]:{color:(t.vars||t).palette.action.disabled},variants:[{props:{variant:"contained"},style:{color:"var(--variant-containedColor)",backgroundColor:"var(--variant-containedBg)",boxShadow:(t.vars||t).shadows[2],"&:hover":{boxShadow:(t.vars||t).shadows[4],"@media (hover: none)":{boxShadow:(t.vars||t).shadows[2]}},"&:active":{boxShadow:(t.vars||t).shadows[8]},[`&.${Db.focusVisible}`]:{boxShadow:(t.vars||t).shadows[6]},[`&.${Db.disabled}`]:{color:(t.vars||t).palette.action.disabled,boxShadow:(t.vars||t).shadows[0],backgroundColor:(t.vars||t).palette.action.disabledBackground}}},{props:{variant:"outlined"},style:{padding:"5px 15px",border:"1px solid currentColor",borderColor:"var(--variant-outlinedBorder, currentColor)",backgroundColor:"var(--variant-outlinedBg)",color:"var(--variant-outlinedColor)",[`&.${Db.disabled}`]:{border:`1px solid ${(t.vars||t).palette.action.disabledBackground}`}}},{props:{variant:"text"},style:{padding:"6px 8px",color:"var(--variant-textColor)",backgroundColor:"var(--variant-textBg)"}},...Object.entries(t.palette).filter(Jg()).map((e=>{let[n]=e;return{props:{color:n},style:{"--variant-textColor":(t.vars||t).palette[n].main,"--variant-outlinedColor":(t.vars||t).palette[n].main,"--variant-outlinedBorder":t.vars?`rgba(${t.vars.palette[n].mainChannel} / 0.5)`:ph(t.palette[n].main,.5),"--variant-containedColor":(t.vars||t).palette[n].contrastText,"--variant-containedBg":(t.vars||t).palette[n].main,"@media (hover: hover)":{"&:hover":{"--variant-containedBg":(t.vars||t).palette[n].dark,"--variant-textBg":t.vars?`rgba(${t.vars.palette[n].mainChannel} / ${t.vars.palette.action.hoverOpacity})`:ph(t.palette[n].main,t.palette.action.hoverOpacity),"--variant-outlinedBorder":(t.vars||t).palette[n].main,"--variant-outlinedBg":t.vars?`rgba(${t.vars.palette[n].mainChannel} / ${t.vars.palette.action.hoverOpacity})`:ph(t.palette[n].main,t.palette.action.hoverOpacity)}}}}})),{props:{color:"inherit"},style:{color:"inherit",borderColor:"currentColor","--variant-containedBg":t.vars?t.vars.palette.Button.inheritContainedBg:n,"@media (hover: hover)":{"&:hover":{"--variant-containedBg":t.vars?t.vars.palette.Button.inheritContainedHoverBg:r,"--variant-textBg":t.vars?`rgba(${t.vars.palette.text.primaryChannel} / ${t.vars.palette.action.hoverOpacity})`:ph(t.palette.text.primary,t.palette.action.hoverOpacity),"--variant-outlinedBg":t.vars?`rgba(${t.vars.palette.text.primaryChannel} / ${t.vars.palette.action.hoverOpacity})`:ph(t.palette.text.primary,t.palette.action.hoverOpacity)}}}},{props:{size:"small",variant:"text"},style:{padding:"4px 5px",fontSize:t.typography.pxToRem(13)}},{props:{size:"large",variant:"text"},style:{padding:"8px 11px",fontSize:t.typography.pxToRem(15)}},{props:{size:"small",variant:"outlined"},style:{padding:"3px 9px",fontSize:t.typography.pxToRem(13)}},{props:{size:"large",variant:"outlined"},style:{padding:"7px 21px",fontSize:t.typography.pxToRem(15)}},{props:{size:"small",variant:"contained"},style:{padding:"4px 10px",fontSize:t.typography.pxToRem(13)}},{props:{size:"large",variant:"contained"},style:{padding:"8px 22px",fontSize:t.typography.pxToRem(15)}},{props:{disableElevation:!0},style:{boxShadow:"none","&:hover":{boxShadow:"none"},[`&.${Db.focusVisible}`]:{boxShadow:"none"},"&:active":{boxShadow:"none"},[`&.${Db.disabled}`]:{boxShadow:"none"}}},{props:{fullWidth:!0},style:{width:"100%"}},{props:{loadingPosition:"center"},style:{transition:t.transitions.create(["background-color","box-shadow","border-color"],{duration:t.transitions.duration.short}),[`&.${Db.loading}`]:{color:"transparent"}}}]}}))),Hb=Hg("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.startIcon,n.loading&&t.startIconLoadingStart,t[`iconSize${Xg(n.size)}`]]}})((e=>{let{theme:t}=e;return{display:"inherit",marginRight:8,marginLeft:-4,variants:[{props:{size:"small"},style:{marginLeft:-2}},{props:{loadingPosition:"start",loading:!0},style:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0}},{props:{loadingPosition:"start",loading:!0,fullWidth:!0},style:{marginRight:-8}},...Ub]}})),Vb=Hg("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.endIcon,n.loading&&t.endIconLoadingEnd,t[`iconSize${Xg(n.size)}`]]}})((e=>{let{theme:t}=e;return{display:"inherit",marginRight:-4,marginLeft:8,variants:[{props:{size:"small"},style:{marginRight:-2}},{props:{loadingPosition:"end",loading:!0},style:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0}},{props:{loadingPosition:"end",loading:!0,fullWidth:!0},style:{marginLeft:-8}},...Ub]}})),qb=Hg("span",{name:"MuiButton",slot:"LoadingIndicator",overridesResolver:(e,t)=>t.loadingIndicator})((e=>{let{theme:t}=e;return{display:"none",position:"absolute",visibility:"visible",variants:[{props:{loading:!0},style:{display:"flex"}},{props:{loadingPosition:"start"},style:{left:14}},{props:{loadingPosition:"start",size:"small"},style:{left:10}},{props:{variant:"text",loadingPosition:"start"},style:{left:6}},{props:{loadingPosition:"center"},style:{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled}},{props:{loadingPosition:"end"},style:{right:14}},{props:{loadingPosition:"end",size:"small"},style:{right:10}},{props:{variant:"text",loadingPosition:"end"},style:{right:6}},{props:{loadingPosition:"start",fullWidth:!0},style:{position:"relative",left:-10}},{props:{loadingPosition:"end",fullWidth:!0},style:{position:"relative",right:-10}}]}})),Kb=Hg("span",{name:"MuiButton",slot:"LoadingIconPlaceholder",overridesResolver:(e,t)=>t.loadingIconPlaceholder})({display:"inline-block",width:"1em",height:"1em"}),Gb=r.forwardRef((function(e,t){const n=r.useContext(Lb),o=r.useContext(Bb),a=Yg({props:Kg(n,e),name:"MuiButton"}),{children:i,color:s="primary",component:l="button",className:c,disabled:u=!1,disableElevation:d=!1,disableFocusRipple:p=!1,endIcon:f,focusVisibleClassName:m,fullWidth:h=!1,id:g,loading:v=null,loadingIndicator:b,loadingPosition:y="center",size:x="medium",startIcon:w,type:S,variant:k="text",...j}=a,C=Hv(g),E=b??(0,Da.jsx)($b,{"aria-labelledby":C,color:"inherit",size:16}),T={...a,color:s,component:l,disabled:u,disableElevation:d,disableFocusRipple:p,fullWidth:h,loading:v,loadingIndicator:E,loadingPosition:y,size:x,type:S,variant:k},P=(e=>{const{color:t,disableElevation:n,fullWidth:r,size:o,variant:a,loading:i,loadingPosition:s,classes:l}=e,c=jg({root:["root",i&&"loading",a,`${a}${Xg(t)}`,`size${Xg(o)}`,`${a}Size${Xg(o)}`,`color${Xg(t)}`,n&&"disableElevation",r&&"fullWidth",i&&`loadingPosition${Xg(s)}`],startIcon:["icon","startIcon",`iconSize${Xg(o)}`],endIcon:["icon","endIcon",`iconSize${Xg(o)}`],loadingIndicator:["loadingIndicator"],loadingWrapper:["loadingWrapper"]},Fb,l);return{...l,...c}})(T),O=(w||v&&"start"===y)&&(0,Da.jsx)(Hb,{className:P.startIcon,ownerState:T,children:w||(0,Da.jsx)(Kb,{className:P.loadingIconPlaceholder,ownerState:T})}),N=(f||v&&"end"===y)&&(0,Da.jsx)(Vb,{className:P.endIcon,ownerState:T,children:f||(0,Da.jsx)(Kb,{className:P.loadingIconPlaceholder,ownerState:T})}),R=o||"",_="boolean"===typeof v?(0,Da.jsx)("span",{className:P.loadingWrapper,style:{display:"contents"},children:v&&(0,Da.jsx)(qb,{className:P.loadingIndicator,ownerState:T,children:E})}):null;return(0,Da.jsxs)(Wb,{ownerState:T,className:kg(n.className,P.root,c,R),component:l,disabled:u||v,focusRipple:!p,focusVisibleClassName:kg(P.focusVisible,m),ref:t,type:S,id:v?C:g,...j,classes:P,children:[O,"end"!==y&&_,i,"end"===y&&_,N]})})),Qb=Gb;function Yb(e){return parseInt(r.version,10)>=19?e?.props?.ref||null:e?.ref||null}function Xb(e){return e&&e.ownerDocument||document}const Jb=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Zb(e){const t=[],n=[];return Array.from(e.querySelectorAll(Jb)).forEach(((e,r)=>{const o=function(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}(e);-1!==o&&function(e){return!(e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type)return!1;if(!e.name)return!1;const t=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}(e))}(e)&&(0===o?t.push(e):n.push({documentOrder:r,tabIndex:o,node:e}))})),n.sort(((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex)).map((e=>e.node)).concat(t)}function ey(){return!0}const ty=function(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:o=!1,disableRestoreFocus:a=!1,getTabbable:i=Zb,isEnabled:s=ey,open:l}=e,c=r.useRef(!1),u=r.useRef(null),d=r.useRef(null),p=r.useRef(null),f=r.useRef(null),m=r.useRef(!1),h=r.useRef(null),g=Kv(Yb(t),h),v=r.useRef(null);r.useEffect((()=>{l&&h.current&&(m.current=!n)}),[n,l]),r.useEffect((()=>{if(!l||!h.current)return;const e=Xb(h.current);return h.current.contains(e.activeElement)||(h.current.hasAttribute("tabIndex")||h.current.setAttribute("tabIndex","-1"),m.current&&h.current.focus()),()=>{a||(p.current&&p.current.focus&&(c.current=!0,p.current.focus()),p.current=null)}}),[l]),r.useEffect((()=>{if(!l||!h.current)return;const e=Xb(h.current),t=t=>{v.current=t,!o&&s()&&"Tab"===t.key&&e.activeElement===h.current&&t.shiftKey&&(c.current=!0,d.current&&d.current.focus())},n=()=>{const t=h.current;if(null===t)return;if(!e.hasFocus()||!s()||c.current)return void(c.current=!1);if(t.contains(e.activeElement))return;if(o&&e.activeElement!==u.current&&e.activeElement!==d.current)return;if(e.activeElement!==f.current)f.current=null;else if(null!==f.current)return;if(!m.current)return;let n=[];if(e.activeElement!==u.current&&e.activeElement!==d.current||(n=i(h.current)),n.length>0){const e=Boolean(v.current?.shiftKey&&"Tab"===v.current?.key),t=n[0],r=n[n.length-1];"string"!==typeof t&&"string"!==typeof r&&(e?r.focus():t.focus())}else t.focus()};e.addEventListener("focusin",n),e.addEventListener("keydown",t,!0);const r=setInterval((()=>{e.activeElement&&"BODY"===e.activeElement.tagName&&n()}),50);return()=>{clearInterval(r),e.removeEventListener("focusin",n),e.removeEventListener("keydown",t,!0)}}),[n,o,a,s,l,i]);const b=e=>{null===p.current&&(p.current=e.relatedTarget),m.current=!0};return(0,Da.jsxs)(r.Fragment,{children:[(0,Da.jsx)("div",{tabIndex:l?0:-1,onFocus:b,ref:u,"data-testid":"sentinelStart"}),r.cloneElement(t,{ref:g,onFocus:e=>{null===p.current&&(p.current=e.relatedTarget),m.current=!0,f.current=e.target;const n=t.props.onFocus;n&&n(e)}}),(0,Da.jsx)("div",{tabIndex:l?0:-1,onFocus:b,ref:d,"data-testid":"sentinelEnd"})]})};const ny=r.forwardRef((function(e,t){const{children:n,container:o,disablePortal:a=!1}=e,[i,s]=r.useState(null),l=Kv(r.isValidElement(n)?Yb(n):null,t);if(Qv((()=>{a||s(function(e){return"function"===typeof e?e():e}(o)||document.body)}),[o,a]),Qv((()=>{if(i&&!a)return qv(t,i),()=>{qv(t,null)}}),[t,i,a]),a){if(r.isValidElement(n)){const e={ref:l};return r.cloneElement(n,e)}return n}return i?or.createPortal(n,i):i}));const ry=function(e){return"string"===typeof e};const oy=function(e,t,n){return void 0===e||ry(e)?t:{...t,ownerState:{...t.ownerState,...n}}};const ay=function(e,t,n){return"function"===typeof e?e(t,n):e};function iy(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=iy(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}const sy=function(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=iy(e))&&(r&&(r+=" "),r+=t);return r};const ly=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(void 0===e)return{};const n={};return Object.keys(e).filter((n=>n.match(/^on[A-Z]/)&&"function"===typeof e[n]&&!t.includes(n))).forEach((t=>{n[t]=e[t]})),n};const cy=function(e){if(void 0===e)return{};const t={};return Object.keys(e).filter((t=>!(t.match(/^on[A-Z]/)&&"function"===typeof e[t]))).forEach((n=>{t[n]=e[n]})),t};const uy=function(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const e=sy(n?.className,a,o?.className,r?.className),t={...n?.style,...o?.style,...r?.style},i={...n,...o,...r};return e.length>0&&(i.className=e),Object.keys(t).length>0&&(i.style=t),{props:i,internalRef:void 0}}const i=ly({...o,...r}),s=cy(r),l=cy(o),c=t(i),u=sy(c?.className,n?.className,a,o?.className,r?.className),d={...c?.style,...n?.style,...o?.style,...r?.style},p={...c,...n,...l,...s};return u.length>0&&(p.className=u),Object.keys(d).length>0&&(p.style=d),{props:p,internalRef:c.ref}};function dy(e,t){const{className:n,elementType:r,ownerState:o,externalForwardedProps:a,internalForwardedProps:i,shouldForwardComponentProp:s=!1,...l}=t,{component:c,slots:u={[e]:void 0},slotProps:d={[e]:void 0},...p}=a,f=u[e]||r,m=ay(d[e],o),{props:{component:h,...g},internalRef:v}=uy({className:n,...l,externalForwardedProps:"root"===e?p:void 0,externalSlotProps:m}),b=Kv(v,m?.ref,t.ref),y="root"===e?h||c:h;return[f,oy(f,{..."root"===e&&!c&&!u[e]&&i,..."root"!==e&&!u[e]&&i,...g,...y&&!s&&{as:y},...y&&s&&{component:y},ref:b},o)]}const py=!1;var fy="unmounted",my="exited",hy="entering",gy="entered",vy="exiting",by=function(e){function t(t,n){var r;r=e.call(this,t,n)||this;var o,a=n&&!n.isMounting?t.enter:t.appear;return r.appearStatus=null,t.in?a?(o=my,r.appearStatus=hy):o=gy:o=t.unmountOnExit||t.mountOnEnter?fy:my,r.state={status:o},r.nextCallback=null,r}rb(t,e),t.getDerivedStateFromProps=function(e,t){return e.in&&t.status===fy?{status:my}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(e){var t=null;if(e!==this.props){var n=this.state.status;this.props.in?n!==hy&&n!==gy&&(t=hy):n!==hy&&n!==gy||(t=vy)}this.updateStatus(!1,t)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var e,t,n,r=this.props.timeout;return e=t=n=r,null!=r&&"number"!==typeof r&&(e=r.exit,t=r.enter,n=void 0!==r.appear?r.appear:t),{exit:e,enter:t,appear:n}},n.updateStatus=function(e,t){if(void 0===e&&(e=!1),null!==t)if(this.cancelNextCallback(),t===hy){if(this.props.unmountOnExit||this.props.mountOnEnter){var n=this.props.nodeRef?this.props.nodeRef.current:or.findDOMNode(this);n&&function(e){e.scrollTop}(n)}this.performEnter(e)}else this.performExit();else this.props.unmountOnExit&&this.state.status===my&&this.setState({status:fy})},n.performEnter=function(e){var t=this,n=this.props.enter,r=this.context?this.context.isMounting:e,o=this.props.nodeRef?[r]:[or.findDOMNode(this),r],a=o[0],i=o[1],s=this.getTimeouts(),l=r?s.appear:s.enter;!e&&!n||py?this.safeSetState({status:gy},(function(){t.props.onEntered(a)})):(this.props.onEnter(a,i),this.safeSetState({status:hy},(function(){t.props.onEntering(a,i),t.onTransitionEnd(l,(function(){t.safeSetState({status:gy},(function(){t.props.onEntered(a,i)}))}))})))},n.performExit=function(){var e=this,t=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:or.findDOMNode(this);t&&!py?(this.props.onExit(r),this.safeSetState({status:vy},(function(){e.props.onExiting(r),e.onTransitionEnd(n.exit,(function(){e.safeSetState({status:my},(function(){e.props.onExited(r)}))}))}))):this.safeSetState({status:my},(function(){e.props.onExited(r)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},n.setNextCallback=function(e){var t=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,t.nextCallback=null,e(r))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(e,t){this.setNextCallback(t);var n=this.props.nodeRef?this.props.nodeRef.current:or.findDOMNode(this),r=null==e&&!this.props.addEndListener;if(n&&!r){if(this.props.addEndListener){var o=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],a=o[0],i=o[1];this.props.addEndListener(a,i)}null!=e&&setTimeout(this.nextCallback,e)}else setTimeout(this.nextCallback,0)},n.render=function(){var e=this.state.status;if(e===fy)return null;var t=this.props,n=t.children,o=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,tb(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return r.createElement(ob.Provider,{value:null},"function"===typeof n?n(e,o):r.cloneElement(r.Children.only(n),o))},t}(r.Component);function yy(){}by.contextType=ob,by.propTypes={},by.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:yy,onEntering:yy,onEntered:yy,onExit:yy,onExiting:yy,onExited:yy},by.UNMOUNTED=fy,by.EXITED=my,by.ENTERING=hy,by.ENTERED=gy,by.EXITING=vy;const xy=by,wy=e=>e.scrollTop;function Sy(e,t){const{timeout:n,easing:r,style:o={}}=e;return{duration:o.transitionDuration??("number"===typeof n?n:n[t.mode]||0),easing:o.transitionTimingFunction??("object"===typeof r?r[t.mode]:r),delay:o.transitionDelay}}const ky={entering:{opacity:1},entered:{opacity:1}},jy=r.forwardRef((function(e,t){const n=cv(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:i=!0,children:s,easing:l,in:c,onEnter:u,onEntered:d,onEntering:p,onExit:f,onExited:m,onExiting:h,style:g,timeout:v=o,TransitionComponent:b=xy,...y}=e,x=r.useRef(null),w=Gv(x,Yb(s),t),S=e=>t=>{if(e){const n=x.current;void 0===t?e(n):e(n,t)}},k=S(p),j=S(((e,t)=>{wy(e);const r=Sy({style:g,timeout:v,easing:l},{mode:"enter"});e.style.webkitTransition=n.transitions.create("opacity",r),e.style.transition=n.transitions.create("opacity",r),u&&u(e,t)})),C=S(d),E=S(h),T=S((e=>{const t=Sy({style:g,timeout:v,easing:l},{mode:"exit"});e.style.webkitTransition=n.transitions.create("opacity",t),e.style.transition=n.transitions.create("opacity",t),f&&f(e)})),P=S(m);return(0,Da.jsx)(b,{appear:i,in:c,nodeRef:x,onEnter:j,onEntered:C,onEntering:k,onExit:T,onExited:P,onExiting:E,addEndListener:e=>{a&&a(x.current,e)},timeout:v,...y,children:(e,t)=>{let{ownerState:n,...o}=t;return r.cloneElement(s,{style:{opacity:0,visibility:"exited"!==e||c?void 0:"hidden",...ky[e],...g,...s.props.style},ref:w,...o})}})})),Cy=jy;function Ey(e){return gg("MuiBackdrop",e)}vg("MuiBackdrop",["root","invisible"]);const Ty=Hg("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),Py=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiBackdrop"}),{children:r,className:o,component:a="div",invisible:i=!1,open:s,components:l={},componentsProps:c={},slotProps:u={},slots:d={},TransitionComponent:p,transitionDuration:f,...m}=n,h={...n,component:a,invisible:i},g=(e=>{const{classes:t,invisible:n}=e;return jg({root:["root",n&&"invisible"]},Ey,t)})(h),v={slots:{transition:p,root:l.Root,...d},slotProps:{...c,...u}},[b,y]=dy("root",{elementType:Ty,externalForwardedProps:v,className:kg(g.root,o),ownerState:h}),[x,w]=dy("transition",{elementType:Cy,externalForwardedProps:v,ownerState:h});return(0,Da.jsx)(x,{in:s,timeout:f,...m,...w,children:(0,Da.jsx)(b,{"aria-hidden":!0,...y,classes:g,ref:t,children:r})})}));function Oy(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(((e,t)=>null==t?e:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];e.apply(this,r),t.apply(this,r)}),(()=>{}))}function Ny(e){return Xb(e).defaultView||window}function Ry(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;const t=e.document.documentElement.clientWidth;return e.innerWidth-t}function _y(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ay(e){return parseInt(Ny(e).getComputedStyle(e).paddingRight,10)||0}function zy(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,(e=>{const t=!a.includes(e),n=!function(e){const t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(e.tagName),n="INPUT"===e.tagName&&"hidden"===e.getAttribute("type");return t||n}(e);t&&n&&_y(e,o)}))}function My(e,t){let n=-1;return e.some(((e,r)=>!!t(e)&&(n=r,!0))),n}function Iy(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(function(e){const t=Xb(e);return t.body===e?Ny(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}(r)){const e=Ry(Ny(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ay(r)+e}px`;const t=Xb(r).querySelectorAll(".mui-fixed");[].forEach.call(t,(t=>{n.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight=`${Ay(t)+e}px`}))}let e;if(r.parentNode instanceof DocumentFragment)e=Xb(r).body;else{const t=r.parentElement,n=Ny(r);e="HTML"===t?.nodeName&&"scroll"===n.getComputedStyle(t).overflowY?t:r}n.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{n.forEach((e=>{let{value:t,el:n,property:r}=e;t?n.style.setProperty(r,t):n.style.removeProperty(r)}))}}const $y=()=>{},Fy=new class{constructor(){this.modals=[],this.containers=[]}add(e,t){let n=this.modals.indexOf(e);if(-1!==n)return n;n=this.modals.length,this.modals.push(e),e.modalRef&&_y(e.modalRef,!1);const r=function(e){const t=[];return[].forEach.call(e.children,(e=>{"true"===e.getAttribute("aria-hidden")&&t.push(e)})),t}(t);zy(t,e.mount,e.modalRef,r,!0);const o=My(this.containers,(e=>e.container===t));return-1!==o?(this.containers[o].modals.push(e),n):(this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:r}),n)}mount(e,t){const n=My(this.containers,(t=>t.modals.includes(e))),r=this.containers[n];r.restore||(r.restore=Iy(r,t))}remove(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const n=this.modals.indexOf(e);if(-1===n)return n;const r=My(this.containers,(t=>t.modals.includes(e))),o=this.containers[r];if(o.modals.splice(o.modals.indexOf(e),1),this.modals.splice(n,1),0===o.modals.length)o.restore&&o.restore(),e.modalRef&&_y(e.modalRef,t),zy(o.container,e.mount,e.modalRef,o.hiddenSiblings,!1),this.containers.splice(r,1);else{const e=o.modals[o.modals.length-1];e.modalRef&&_y(e.modalRef,!1)}return n}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}};const Dy=function(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:o=!1,closeAfterTransition:a=!1,onTransitionEnter:i,onTransitionExited:s,children:l,onClose:c,open:u,rootRef:d}=e,p=r.useRef({}),f=r.useRef(null),m=r.useRef(null),h=Kv(m,d),[g,v]=r.useState(!u),b=function(e){return!!e&&e.props.hasOwnProperty("in")}(l);let y=!0;"false"!==e["aria-hidden"]&&!1!==e["aria-hidden"]||(y=!1);const x=()=>(p.current.modalRef=m.current,p.current.mount=f.current,p.current),w=()=>{Fy.mount(x(),{disableScrollLock:o}),m.current&&(m.current.scrollTop=0)},S=Yv((()=>{const e=function(e){return"function"===typeof e?e():e}(t)||Xb(f.current).body;Fy.add(x(),e),m.current&&w()})),k=()=>Fy.isTopModal(x()),j=Yv((e=>{f.current=e,e&&(u&&k()?w():m.current&&_y(m.current,y))})),C=r.useCallback((()=>{Fy.remove(x(),y)}),[y]);r.useEffect((()=>()=>{C()}),[C]),r.useEffect((()=>{u?S():b&&a||C()}),[u,C,b,a,S]);const E=e=>t=>{e.onKeyDown?.(t),"Escape"===t.key&&229!==t.which&&k()&&(n||(t.stopPropagation(),c&&c(t,"escapeKeyDown")))},T=e=>t=>{e.onClick?.(t),t.target===t.currentTarget&&c&&c(t,"backdropClick")};return{getRootProps:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=ly(e);delete n.onTransitionEnter,delete n.onTransitionExited;const r={...n,...t};return{role:"presentation",...r,onKeyDown:E(r),ref:h}},getBackdropProps:function(){const e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{"aria-hidden":!0,...e,onClick:T(e),open:u}},getTransitionProps:()=>({onEnter:Oy((()=>{v(!1),i&&i()}),l?.props.onEnter??$y),onExited:Oy((()=>{v(!0),s&&s(),a&&C()}),l?.props.onExited??$y)}),rootRef:h,portalRef:j,isTopModal:k,exited:g,hasTransition:b}};function Ly(e){return gg("MuiModal",e)}vg("MuiModal",["root","hidden","backdrop"]);const By=Hg("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(qg((e=>{let{theme:t}=e;return{position:"fixed",zIndex:(t.vars||t).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:e=>{let{ownerState:t}=e;return!t.open&&t.exited},style:{visibility:"hidden"}}]}}))),Uy=Hg(Py,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Wy=r.forwardRef((function(e,t){const n=Yg({name:"MuiModal",props:e}),{BackdropComponent:o=Uy,BackdropProps:a,classes:i,className:s,closeAfterTransition:l=!1,children:c,container:u,component:d,components:p={},componentsProps:f={},disableAutoFocus:m=!1,disableEnforceFocus:h=!1,disableEscapeKeyDown:g=!1,disablePortal:v=!1,disableRestoreFocus:b=!1,disableScrollLock:y=!1,hideBackdrop:x=!1,keepMounted:w=!1,onBackdropClick:S,onClose:k,onTransitionEnter:j,onTransitionExited:C,open:E,slotProps:T={},slots:P={},theme:O,...N}=n,R={...n,closeAfterTransition:l,disableAutoFocus:m,disableEnforceFocus:h,disableEscapeKeyDown:g,disablePortal:v,disableRestoreFocus:b,disableScrollLock:y,hideBackdrop:x,keepMounted:w},{getRootProps:_,getBackdropProps:A,getTransitionProps:z,portalRef:M,isTopModal:I,exited:$,hasTransition:F}=Dy({...R,rootRef:t}),D={...R,exited:$},L=(e=>{const{open:t,exited:n,classes:r}=e;return jg({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Ly,r)})(D),B={};if(void 0===c.props.tabIndex&&(B.tabIndex="-1"),F){const{onEnter:e,onExited:t}=z();B.onEnter=e,B.onExited=t}const U={slots:{root:p.Root,backdrop:p.Backdrop,...P},slotProps:{...f,...T}},[W,H]=dy("root",{ref:t,elementType:By,externalForwardedProps:{...U,...N,component:d},getSlotProps:_,ownerState:D,className:kg(s,L?.root,!D.open&&D.exited&&L?.hidden)}),[V,q]=dy("backdrop",{ref:a?.ref,elementType:o,externalForwardedProps:U,shouldForwardComponentProp:!0,additionalProps:a,getSlotProps:e=>A({...e,onClick:t=>{S&&S(t),e?.onClick&&e.onClick(t)}}),className:kg(a?.className,L?.backdrop),ownerState:D});return w||E||F&&!$?(0,Da.jsx)(ny,{ref:M,container:u,disablePortal:v,children:(0,Da.jsxs)(W,{...H,children:[!x&&o?(0,Da.jsx)(V,{...q}):null,(0,Da.jsx)(ty,{disableEnforceFocus:h,disableAutoFocus:m,disableRestoreFocus:b,isEnabled:I,open:E,children:r.cloneElement(c,B)})]})}):null})),Hy=Wy;function Vy(e){return gg("MuiDialog",e)}const qy=vg("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);const Ky=r.createContext({}),Gy=Hg(Py,{name:"MuiDialog",slot:"Backdrop",overrides:(e,t)=>t.backdrop})({zIndex:-1}),Qy=Hg(Hy,{name:"MuiDialog",slot:"Root",overridesResolver:(e,t)=>t.root})({"@media print":{position:"absolute !important"}}),Yy=Hg("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.container,t[`scroll${Xg(n.scroll)}`]]}})({height:"100%","@media print":{height:"auto"},outline:0,variants:[{props:{scroll:"paper"},style:{display:"flex",justifyContent:"center",alignItems:"center"}},{props:{scroll:"body"},style:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}}}]}),Xy=Hg(pv,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.paper,t[`scrollPaper${Xg(n.scroll)}`],t[`paperWidth${Xg(String(n.maxWidth))}`],n.fullWidth&&t.paperFullWidth,n.fullScreen&&t.paperFullScreen]}})(qg((e=>{let{theme:t}=e;return{margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"},variants:[{props:{scroll:"paper"},style:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"}},{props:{scroll:"body"},style:{display:"inline-block",verticalAlign:"middle",textAlign:"initial"}},{props:e=>{let{ownerState:t}=e;return!t.maxWidth},style:{maxWidth:"calc(100% - 64px)"}},{props:{maxWidth:"xs"},style:{maxWidth:"px"===t.breakpoints.unit?Math.max(t.breakpoints.values.xs,444):`max(${t.breakpoints.values.xs}${t.breakpoints.unit}, 444px)`,[`&.${qy.paperScrollBody}`]:{[t.breakpoints.down(Math.max(t.breakpoints.values.xs,444)+64)]:{maxWidth:"calc(100% - 64px)"}}}},...Object.keys(t.breakpoints.values).filter((e=>"xs"!==e)).map((e=>({props:{maxWidth:e},style:{maxWidth:`${t.breakpoints.values[e]}${t.breakpoints.unit}`,[`&.${qy.paperScrollBody}`]:{[t.breakpoints.down(t.breakpoints.values[e]+64)]:{maxWidth:"calc(100% - 64px)"}}}}))),{props:e=>{let{ownerState:t}=e;return t.fullWidth},style:{width:"calc(100% - 64px)"}},{props:e=>{let{ownerState:t}=e;return t.fullScreen},style:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${qy.paperScrollBody}`]:{margin:0,maxWidth:"100%"}}}]}}))),Jy=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiDialog"}),o=cv(),a={enter:o.transitions.duration.enteringScreen,exit:o.transitions.duration.leavingScreen},{"aria-describedby":i,"aria-labelledby":s,"aria-modal":l=!0,BackdropComponent:c,BackdropProps:u,children:d,className:p,disableEscapeKeyDown:f=!1,fullScreen:m=!1,fullWidth:h=!1,maxWidth:g="sm",onBackdropClick:v,onClick:b,onClose:y,open:x,PaperComponent:w=pv,PaperProps:S={},scroll:k="paper",slots:j={},slotProps:C={},TransitionComponent:E=Cy,transitionDuration:T=a,TransitionProps:P,...O}=n,N={...n,disableEscapeKeyDown:f,fullScreen:m,fullWidth:h,maxWidth:g,scroll:k},R=(e=>{const{classes:t,scroll:n,maxWidth:r,fullWidth:o,fullScreen:a}=e;return jg({root:["root"],container:["container",`scroll${Xg(n)}`],paper:["paper",`paperScroll${Xg(n)}`,`paperWidth${Xg(String(r))}`,o&&"paperFullWidth",a&&"paperFullScreen"]},Vy,t)})(N),_=r.useRef(),A=Wv(s),z=r.useMemo((()=>({titleId:A})),[A]),M={slots:{transition:E,...j},slotProps:{transition:P,paper:S,backdrop:u,...C}},[I,$]=dy("root",{elementType:Qy,shouldForwardComponentProp:!0,externalForwardedProps:M,ownerState:N,className:kg(R.root,p),ref:t}),[F,D]=dy("backdrop",{elementType:Gy,shouldForwardComponentProp:!0,externalForwardedProps:M,ownerState:N}),[L,B]=dy("paper",{elementType:Xy,shouldForwardComponentProp:!0,externalForwardedProps:M,ownerState:N,className:kg(R.paper,S.className)}),[U,W]=dy("container",{elementType:Yy,externalForwardedProps:M,ownerState:N,className:kg(R.container)}),[H,V]=dy("transition",{elementType:Cy,externalForwardedProps:M,ownerState:N,additionalProps:{appear:!0,in:x,timeout:T,role:"presentation"}});return(0,Da.jsx)(I,{closeAfterTransition:!0,slots:{backdrop:F},slotProps:{backdrop:{transitionDuration:T,as:c,...D}},disableEscapeKeyDown:f,onClose:y,open:x,onClick:e=>{b&&b(e),_.current&&(_.current=null,v&&v(e),y&&y(e,"backdropClick"))},...$,...O,children:(0,Da.jsx)(H,{...V,children:(0,Da.jsx)(U,{onMouseDown:e=>{_.current=e.target===e.currentTarget},...W,children:(0,Da.jsx)(L,{as:w,elevation:24,role:"dialog","aria-describedby":i,"aria-labelledby":A,"aria-modal":l,...B,children:(0,Da.jsx)(Ky.Provider,{value:z,children:d})})})})})})),Zy=Jy;function ex(e){return gg("MuiDialogTitle",e)}const tx=vg("MuiDialogTitle",["root"]),nx=Hg(av,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),rx=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiDialogTitle"}),{className:o,id:a,...i}=n,s=n,l=(e=>{const{classes:t}=e;return jg({root:["root"]},ex,t)})(s),{titleId:c=a}=r.useContext(Ky);return(0,Da.jsx)(nx,{component:"h2",className:kg(l.root,o),ownerState:s,ref:t,variant:"h6",id:a??c,...i})}));function ox(e){return gg("MuiDialogContent",e)}vg("MuiDialogContent",["root","dividers"]);const ax=Hg("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dividers&&t.dividers]}})(qg((e=>{let{theme:t}=e;return{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px",variants:[{props:e=>{let{ownerState:t}=e;return t.dividers},style:{padding:"16px 24px",borderTop:`1px solid ${(t.vars||t).palette.divider}`,borderBottom:`1px solid ${(t.vars||t).palette.divider}`}},{props:e=>{let{ownerState:t}=e;return!t.dividers},style:{[`.${tx.root} + &`]:{paddingTop:0}}}]}}))),ix=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiDialogContent"}),{className:r,dividers:o=!1,...a}=n,i={...n,dividers:o},s=(e=>{const{classes:t,dividers:n}=e;return jg({root:["root",n&&"dividers"]},ox,t)})(i);return(0,Da.jsx)(ax,{className:kg(s.root,r),ownerState:i,ref:t,...a})}));function sx(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:166;function r(){for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];clearTimeout(t),t=setTimeout((()=>{e.apply(this,o)}),n)}return r.clear=()=>{clearTimeout(t)},r}function lx(e){return parseInt(e,10)||0}const cx={visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"};function ux(e){return function(e){for(const t in e)return!1;return!0}(e)||0===e.outerHeightStyle&&!e.overflowing}const dx=r.forwardRef((function(e,t){const{onChange:n,maxRows:o,minRows:a=1,style:i,value:s,...l}=e,{current:c}=r.useRef(null!=s),u=r.useRef(null),d=Kv(t,u),p=r.useRef(null),f=r.useRef(null),m=r.useCallback((()=>{const t=u.current,n=f.current;if(!t||!n)return;const r=Ny(t).getComputedStyle(t);if("0px"===r.width)return{outerHeightStyle:0,overflowing:!1};n.style.width=r.width,n.value=t.value||e.placeholder||"x","\n"===n.value.slice(-1)&&(n.value+=" ");const i=r.boxSizing,s=lx(r.paddingBottom)+lx(r.paddingTop),l=lx(r.borderBottomWidth)+lx(r.borderTopWidth),c=n.scrollHeight;n.value="x";const d=n.scrollHeight;let p=c;a&&(p=Math.max(Number(a)*d,p)),o&&(p=Math.min(Number(o)*d,p)),p=Math.max(p,d);return{outerHeightStyle:p+("border-box"===i?s+l:0),overflowing:Math.abs(p-c)<=1}}),[o,a,e.placeholder]),h=Yv((()=>{const e=u.current,t=m();if(!e||!t||ux(t))return!1;const n=t.outerHeightStyle;return null!=p.current&&p.current!==n})),g=r.useCallback((()=>{const e=u.current,t=m();if(!e||!t||ux(t))return;const n=t.outerHeightStyle;p.current!==n&&(p.current=n,e.style.height=`${n}px`),e.style.overflow=t.overflowing?"hidden":""}),[m]),v=r.useRef(-1);Qv((()=>{const e=sx(g),t=u?.current;if(!t)return;const n=Ny(t);let r;return n.addEventListener("resize",e),"undefined"!==typeof ResizeObserver&&(r=new ResizeObserver((()=>{h()&&(r.unobserve(t),cancelAnimationFrame(v.current),g(),v.current=requestAnimationFrame((()=>{r.observe(t)})))})),r.observe(t)),()=>{e.clear(),cancelAnimationFrame(v.current),n.removeEventListener("resize",e),r&&r.disconnect()}}),[m,g,h]),Qv((()=>{g()}));return(0,Da.jsxs)(r.Fragment,{children:[(0,Da.jsx)("textarea",{value:s,onChange:e=>{c||g(),n&&n(e)},ref:d,rows:a,style:i,...l}),(0,Da.jsx)("textarea",{"aria-hidden":!0,className:e.className,readOnly:!0,ref:f,tabIndex:-1,style:{...cx,...i,paddingTop:0,paddingBottom:0}})]})})),px=dx;const fx=function(e){return"string"===typeof e};function mx(e){let{props:t,states:n,muiFormControl:r}=e;return n.reduce(((e,n)=>(e[n]=t[n],r&&"undefined"===typeof t[n]&&(e[n]=r[n]),e)),{})}const hx=r.createContext(void 0);function gx(){return r.useContext(hx)}const vx=Qv;function bx(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function yx(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e&&(bx(e.value)&&""!==e.value||t&&bx(e.defaultValue)&&""!==e.defaultValue)}function xx(e){return gg("MuiInputBase",e)}const wx=vg("MuiInputBase",["root","formControl","focused","disabled","adornedStart","adornedEnd","error","sizeSmall","multiline","colorSecondary","fullWidth","hiddenLabel","readOnly","input","inputSizeSmall","inputMultiline","inputTypeSearch","inputAdornedStart","inputAdornedEnd","inputHiddenLabel"]);var Sx;const kx=(e,t)=>{const{ownerState:n}=e;return[t.root,n.formControl&&t.formControl,n.startAdornment&&t.adornedStart,n.endAdornment&&t.adornedEnd,n.error&&t.error,"small"===n.size&&t.sizeSmall,n.multiline&&t.multiline,n.color&&t[`color${Xg(n.color)}`],n.fullWidth&&t.fullWidth,n.hiddenLabel&&t.hiddenLabel]},jx=(e,t)=>{const{ownerState:n}=e;return[t.input,"small"===n.size&&t.inputSizeSmall,n.multiline&&t.inputMultiline,"search"===n.type&&t.inputTypeSearch,n.startAdornment&&t.inputAdornedStart,n.endAdornment&&t.inputAdornedEnd,n.hiddenLabel&&t.inputHiddenLabel]},Cx=Hg("div",{name:"MuiInputBase",slot:"Root",overridesResolver:kx})(qg((e=>{let{theme:t}=e;return{...t.typography.body1,color:(t.vars||t).palette.text.primary,lineHeight:"1.4375em",boxSizing:"border-box",position:"relative",cursor:"text",display:"inline-flex",alignItems:"center",[`&.${wx.disabled}`]:{color:(t.vars||t).palette.text.disabled,cursor:"default"},variants:[{props:e=>{let{ownerState:t}=e;return t.multiline},style:{padding:"4px 0 5px"}},{props:e=>{let{ownerState:t,size:n}=e;return t.multiline&&"small"===n},style:{paddingTop:1}},{props:e=>{let{ownerState:t}=e;return t.fullWidth},style:{width:"100%"}}]}}))),Ex=Hg("input",{name:"MuiInputBase",slot:"Input",overridesResolver:jx})(qg((e=>{let{theme:t}=e;const n="light"===t.palette.mode,r={color:"currentColor",...t.vars?{opacity:t.vars.opacity.inputPlaceholder}:{opacity:n?.42:.5},transition:t.transitions.create("opacity",{duration:t.transitions.duration.shorter})},o={opacity:"0 !important"},a=t.vars?{opacity:t.vars.opacity.inputPlaceholder}:{opacity:n?.42:.5};return{font:"inherit",letterSpacing:"inherit",color:"currentColor",padding:"4px 0 5px",border:0,boxSizing:"content-box",background:"none",height:"1.4375em",margin:0,WebkitTapHighlightColor:"transparent",display:"block",minWidth:0,width:"100%","&::-webkit-input-placeholder":r,"&::-moz-placeholder":r,"&::-ms-input-placeholder":r,"&:focus":{outline:0},"&:invalid":{boxShadow:"none"},"&::-webkit-search-decoration":{WebkitAppearance:"none"},[`label[data-shrink=false] + .${wx.formControl} &`]:{"&::-webkit-input-placeholder":o,"&::-moz-placeholder":o,"&::-ms-input-placeholder":o,"&:focus::-webkit-input-placeholder":a,"&:focus::-moz-placeholder":a,"&:focus::-ms-input-placeholder":a},[`&.${wx.disabled}`]:{opacity:1,WebkitTextFillColor:(t.vars||t).palette.text.disabled},variants:[{props:e=>{let{ownerState:t}=e;return!t.disableInjectingGlobalStyles},style:{animationName:"mui-auto-fill-cancel",animationDuration:"10ms","&:-webkit-autofill":{animationDuration:"5000s",animationName:"mui-auto-fill"}}},{props:{size:"small"},style:{paddingTop:1}},{props:e=>{let{ownerState:t}=e;return t.multiline},style:{height:"auto",resize:"none",padding:0,paddingTop:0}},{props:{type:"search"},style:{MozAppearance:"textfield"}}]}}))),Tx=function(e){return function(t){return(0,Da.jsx)(_g,{styles:"function"===typeof e?n=>e({theme:n,...t}):e})}}({"@keyframes mui-auto-fill":{from:{display:"block"}},"@keyframes mui-auto-fill-cancel":{from:{display:"block"}}}),Px=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiInputBase"}),{"aria-describedby":o,autoComplete:a,autoFocus:i,className:s,color:l,components:c={},componentsProps:u={},defaultValue:d,disabled:p,disableInjectingGlobalStyles:f,endAdornment:m,error:h,fullWidth:g=!1,id:v,inputComponent:b="input",inputProps:y={},inputRef:x,margin:w,maxRows:S,minRows:k,multiline:j=!1,name:C,onBlur:E,onChange:T,onClick:P,onFocus:O,onKeyDown:N,onKeyUp:R,placeholder:_,readOnly:A,renderSuffix:z,rows:M,size:I,slotProps:$={},slots:F={},startAdornment:D,type:L="text",value:B,...U}=n,W=null!=y.value?y.value:B,{current:H}=r.useRef(null!=W),V=r.useRef(),q=r.useCallback((e=>{0}),[]),K=Gv(V,x,y.ref,q),[G,Q]=r.useState(!1),Y=gx();const X=mx({props:n,muiFormControl:Y,states:["color","disabled","error","hiddenLabel","size","required","filled"]});X.focused=Y?Y.focused:G,r.useEffect((()=>{!Y&&p&&G&&(Q(!1),E&&E())}),[Y,p,G,E]);const J=Y&&Y.onFilled,Z=Y&&Y.onEmpty,ee=r.useCallback((e=>{yx(e)?J&&J():Z&&Z()}),[J,Z]);vx((()=>{H&&ee({value:W})}),[W,ee,H]);r.useEffect((()=>{ee(V.current)}),[]);let te=b,ne=y;j&&"input"===te&&(ne=M?{type:void 0,minRows:M,maxRows:M,...ne}:{type:void 0,maxRows:S,minRows:k,...ne},te=px);r.useEffect((()=>{Y&&Y.setAdornedStart(Boolean(D))}),[Y,D]);const re={...n,color:X.color||"primary",disabled:X.disabled,endAdornment:m,error:X.error,focused:X.focused,formControl:Y,fullWidth:g,hiddenLabel:X.hiddenLabel,multiline:j,size:X.size,startAdornment:D,type:L},oe=(e=>{const{classes:t,color:n,disabled:r,error:o,endAdornment:a,focused:i,formControl:s,fullWidth:l,hiddenLabel:c,multiline:u,readOnly:d,size:p,startAdornment:f,type:m}=e;return jg({root:["root",`color${Xg(n)}`,r&&"disabled",o&&"error",l&&"fullWidth",i&&"focused",s&&"formControl",p&&"medium"!==p&&`size${Xg(p)}`,u&&"multiline",f&&"adornedStart",a&&"adornedEnd",c&&"hiddenLabel",d&&"readOnly"],input:["input",r&&"disabled","search"===m&&"inputTypeSearch",u&&"inputMultiline","small"===p&&"inputSizeSmall",c&&"inputHiddenLabel",f&&"inputAdornedStart",a&&"inputAdornedEnd",d&&"readOnly"]},xx,t)})(re),ae=F.root||c.Root||Cx,ie=$.root||u.root||{},se=F.input||c.Input||Ex;return ne={...ne,...$.input??u.input},(0,Da.jsxs)(r.Fragment,{children:[!f&&"function"===typeof Tx&&(Sx||(Sx=(0,Da.jsx)(Tx,{}))),(0,Da.jsxs)(ae,{...ie,ref:t,onClick:e=>{V.current&&e.currentTarget===e.target&&V.current.focus(),P&&P(e)},...U,...!fx(ae)&&{ownerState:{...re,...ie.ownerState}},className:kg(oe.root,ie.className,s,A&&"MuiInputBase-readOnly"),children:[D,(0,Da.jsx)(hx.Provider,{value:null,children:(0,Da.jsx)(se,{"aria-invalid":X.error,"aria-describedby":o,autoComplete:a,autoFocus:i,defaultValue:d,disabled:X.disabled,id:v,onAnimationStart:e=>{ee("mui-auto-fill-cancel"===e.animationName?V.current:{value:"x"})},name:C,placeholder:_,readOnly:A,required:X.required,rows:M,value:W,onKeyDown:N,onKeyUp:R,type:L,...ne,...!fx(se)&&{as:te,ownerState:{...re,...ne.ownerState}},ref:K,className:kg(oe.input,ne.className,A&&"MuiInputBase-readOnly"),onBlur:e=>{E&&E(e),y.onBlur&&y.onBlur(e),Y&&Y.onBlur?Y.onBlur(e):Q(!1)},onChange:function(e){if(!H){const t=e.target||V.current;if(null==t)throw new Error(Uf(1));ee({value:t.value})}for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];y.onChange&&y.onChange(e,...n),T&&T(e,...n)},onFocus:e=>{O&&O(e),y.onFocus&&y.onFocus(e),Y&&Y.onFocus?Y.onFocus(e):Q(!0)}})}),m,z?z({...X,startAdornment:D}):null]})]})})),Ox=Px;function Nx(e){return gg("MuiInput",e)}const Rx={...wx,...vg("MuiInput",["root","underline","input"])},_x=Hg(Cx,{shouldForwardProp:e=>Ug(e)||"classes"===e,name:"MuiInput",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[...kx(e,t),!n.disableUnderline&&t.underline]}})(qg((e=>{let{theme:t}=e;let n="light"===t.palette.mode?"rgba(0, 0, 0, 0.42)":"rgba(255, 255, 255, 0.7)";return t.vars&&(n=`rgba(${t.vars.palette.common.onBackgroundChannel} / ${t.vars.opacity.inputUnderline})`),{position:"relative",variants:[{props:e=>{let{ownerState:t}=e;return t.formControl},style:{"label + &":{marginTop:16}}},{props:e=>{let{ownerState:t}=e;return!t.disableUnderline},style:{"&::after":{left:0,bottom:0,content:'""',position:"absolute",right:0,transform:"scaleX(0)",transition:t.transitions.create("transform",{duration:t.transitions.duration.shorter,easing:t.transitions.easing.easeOut}),pointerEvents:"none"},[`&.${Rx.focused}:after`]:{transform:"scaleX(1) translateX(0)"},[`&.${Rx.error}`]:{"&::before, &::after":{borderBottomColor:(t.vars||t).palette.error.main}},"&::before":{borderBottom:`1px solid ${n}`,left:0,bottom:0,content:'"\\00a0"',position:"absolute",right:0,transition:t.transitions.create("border-bottom-color",{duration:t.transitions.duration.shorter}),pointerEvents:"none"},[`&:hover:not(.${Rx.disabled}, .${Rx.error}):before`]:{borderBottom:`2px solid ${(t.vars||t).palette.text.primary}`,"@media (hover: none)":{borderBottom:`1px solid ${n}`}},[`&.${Rx.disabled}:before`]:{borderBottomStyle:"dotted"}}},...Object.entries(t.palette).filter(Jg()).map((e=>{let[n]=e;return{props:{color:n,disableUnderline:!1},style:{"&::after":{borderBottom:`2px solid ${(t.vars||t).palette[n].main}`}}}}))]}}))),Ax=Hg(Ex,{name:"MuiInput",slot:"Input",overridesResolver:jx})({}),zx=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiInput"}),{disableUnderline:r=!1,components:o={},componentsProps:a,fullWidth:i=!1,inputComponent:s="input",multiline:l=!1,slotProps:c,slots:u={},type:d="text",...p}=n,f=(e=>{const{classes:t,disableUnderline:n}=e,r=jg({root:["root",!n&&"underline"],input:["input"]},Nx,t);return{...t,...r}})(n),m={root:{ownerState:{disableUnderline:r}}},h=c??a?qf(c??a,m):m,g=u.root??o.Root??_x,v=u.input??o.Input??Ax;return(0,Da.jsx)(Ox,{slots:{root:g,input:v},slotProps:h,fullWidth:i,inputComponent:s,multiline:l,ref:t,type:d,...p,classes:f})}));zx.muiName="Input";const Mx=zx;function Ix(e){return gg("MuiFilledInput",e)}const $x={...wx,...vg("MuiFilledInput",["root","underline","input","adornedStart","adornedEnd","sizeSmall","multiline","hiddenLabel"])},Fx=Hg(Cx,{shouldForwardProp:e=>Ug(e)||"classes"===e,name:"MuiFilledInput",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[...kx(e,t),!n.disableUnderline&&t.underline]}})(qg((e=>{let{theme:t}=e;const n="light"===t.palette.mode,r=n?"rgba(0, 0, 0, 0.42)":"rgba(255, 255, 255, 0.7)",o=n?"rgba(0, 0, 0, 0.06)":"rgba(255, 255, 255, 0.09)",a=n?"rgba(0, 0, 0, 0.09)":"rgba(255, 255, 255, 0.13)",i=n?"rgba(0, 0, 0, 0.12)":"rgba(255, 255, 255, 0.12)";return{position:"relative",backgroundColor:t.vars?t.vars.palette.FilledInput.bg:o,borderTopLeftRadius:(t.vars||t).shape.borderRadius,borderTopRightRadius:(t.vars||t).shape.borderRadius,transition:t.transitions.create("background-color",{duration:t.transitions.duration.shorter,easing:t.transitions.easing.easeOut}),"&:hover":{backgroundColor:t.vars?t.vars.palette.FilledInput.hoverBg:a,"@media (hover: none)":{backgroundColor:t.vars?t.vars.palette.FilledInput.bg:o}},[`&.${$x.focused}`]:{backgroundColor:t.vars?t.vars.palette.FilledInput.bg:o},[`&.${$x.disabled}`]:{backgroundColor:t.vars?t.vars.palette.FilledInput.disabledBg:i},variants:[{props:e=>{let{ownerState:t}=e;return!t.disableUnderline},style:{"&::after":{left:0,bottom:0,content:'""',position:"absolute",right:0,transform:"scaleX(0)",transition:t.transitions.create("transform",{duration:t.transitions.duration.shorter,easing:t.transitions.easing.easeOut}),pointerEvents:"none"},[`&.${$x.focused}:after`]:{transform:"scaleX(1) translateX(0)"},[`&.${$x.error}`]:{"&::before, &::after":{borderBottomColor:(t.vars||t).palette.error.main}},"&::before":{borderBottom:`1px solid ${t.vars?`rgba(${t.vars.palette.common.onBackgroundChannel} / ${t.vars.opacity.inputUnderline})`:r}`,left:0,bottom:0,content:'"\\00a0"',position:"absolute",right:0,transition:t.transitions.create("border-bottom-color",{duration:t.transitions.duration.shorter}),pointerEvents:"none"},[`&:hover:not(.${$x.disabled}, .${$x.error}):before`]:{borderBottom:`1px solid ${(t.vars||t).palette.text.primary}`},[`&.${$x.disabled}:before`]:{borderBottomStyle:"dotted"}}},...Object.entries(t.palette).filter(Jg()).map((e=>{let[n]=e;return{props:{disableUnderline:!1,color:n},style:{"&::after":{borderBottom:`2px solid ${(t.vars||t).palette[n]?.main}`}}}})),{props:e=>{let{ownerState:t}=e;return t.startAdornment},style:{paddingLeft:12}},{props:e=>{let{ownerState:t}=e;return t.endAdornment},style:{paddingRight:12}},{props:e=>{let{ownerState:t}=e;return t.multiline},style:{padding:"25px 12px 8px"}},{props:e=>{let{ownerState:t,size:n}=e;return t.multiline&&"small"===n},style:{paddingTop:21,paddingBottom:4}},{props:e=>{let{ownerState:t}=e;return t.multiline&&t.hiddenLabel},style:{paddingTop:16,paddingBottom:17}},{props:e=>{let{ownerState:t}=e;return t.multiline&&t.hiddenLabel&&"small"===t.size},style:{paddingTop:8,paddingBottom:9}}]}}))),Dx=Hg(Ex,{name:"MuiFilledInput",slot:"Input",overridesResolver:jx})(qg((e=>{let{theme:t}=e;return{paddingTop:25,paddingRight:12,paddingBottom:8,paddingLeft:12,...!t.vars&&{"&:-webkit-autofill":{WebkitBoxShadow:"light"===t.palette.mode?null:"0 0 0 100px #266798 inset",WebkitTextFillColor:"light"===t.palette.mode?null:"#fff",caretColor:"light"===t.palette.mode?null:"#fff",borderTopLeftRadius:"inherit",borderTopRightRadius:"inherit"}},...t.vars&&{"&:-webkit-autofill":{borderTopLeftRadius:"inherit",borderTopRightRadius:"inherit"},[t.getColorSchemeSelector("dark")]:{"&:-webkit-autofill":{WebkitBoxShadow:"0 0 0 100px #266798 inset",WebkitTextFillColor:"#fff",caretColor:"#fff"}}},variants:[{props:{size:"small"},style:{paddingTop:21,paddingBottom:4}},{props:e=>{let{ownerState:t}=e;return t.hiddenLabel},style:{paddingTop:16,paddingBottom:17}},{props:e=>{let{ownerState:t}=e;return t.startAdornment},style:{paddingLeft:0}},{props:e=>{let{ownerState:t}=e;return t.endAdornment},style:{paddingRight:0}},{props:e=>{let{ownerState:t}=e;return t.hiddenLabel&&"small"===t.size},style:{paddingTop:8,paddingBottom:9}},{props:e=>{let{ownerState:t}=e;return t.multiline},style:{paddingTop:0,paddingBottom:0,paddingLeft:0,paddingRight:0}}]}}))),Lx=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiFilledInput"}),{disableUnderline:r=!1,components:o={},componentsProps:a,fullWidth:i=!1,hiddenLabel:s,inputComponent:l="input",multiline:c=!1,slotProps:u,slots:d={},type:p="text",...f}=n,m={...n,disableUnderline:r,fullWidth:i,inputComponent:l,multiline:c,type:p},h=(e=>{const{classes:t,disableUnderline:n,startAdornment:r,endAdornment:o,size:a,hiddenLabel:i,multiline:s}=e,l=jg({root:["root",!n&&"underline",r&&"adornedStart",o&&"adornedEnd","small"===a&&`size${Xg(a)}`,i&&"hiddenLabel",s&&"multiline"],input:["input"]},Ix,t);return{...t,...l}})(n),g={root:{ownerState:m},input:{ownerState:m}},v=u??a?qf(g,u??a):g,b=d.root??o.Root??Fx,y=d.input??o.Input??Dx;return(0,Da.jsx)(Ox,{slots:{root:b,input:y},slotProps:v,fullWidth:i,inputComponent:l,multiline:c,ref:t,type:p,...f,classes:h})}));Lx.muiName="Input";const Bx=Lx;var Ux;const Wx=Hg("fieldset",{shouldForwardProp:Ug})({textAlign:"left",position:"absolute",bottom:0,right:0,top:-5,left:0,margin:0,padding:"0 8px",pointerEvents:"none",borderRadius:"inherit",borderStyle:"solid",borderWidth:1,overflow:"hidden",minWidth:"0%"}),Hx=Hg("legend",{shouldForwardProp:Ug})(qg((e=>{let{theme:t}=e;return{float:"unset",width:"auto",overflow:"hidden",variants:[{props:e=>{let{ownerState:t}=e;return!t.withLabel},style:{padding:0,lineHeight:"11px",transition:t.transitions.create("width",{duration:150,easing:t.transitions.easing.easeOut})}},{props:e=>{let{ownerState:t}=e;return t.withLabel},style:{display:"block",padding:0,height:11,fontSize:"0.75em",visibility:"hidden",maxWidth:.01,transition:t.transitions.create("max-width",{duration:50,easing:t.transitions.easing.easeOut}),whiteSpace:"nowrap","& > span":{paddingLeft:5,paddingRight:5,display:"inline-block",opacity:0,visibility:"visible"}}},{props:e=>{let{ownerState:t}=e;return t.withLabel&&t.notched},style:{maxWidth:"100%",transition:t.transitions.create("max-width",{duration:100,easing:t.transitions.easing.easeOut,delay:50})}}]}})));function Vx(e){return gg("MuiOutlinedInput",e)}const qx={...wx,...vg("MuiOutlinedInput",["root","notchedOutline","input"])},Kx=Hg(Cx,{shouldForwardProp:e=>Ug(e)||"classes"===e,name:"MuiOutlinedInput",slot:"Root",overridesResolver:kx})(qg((e=>{let{theme:t}=e;const n="light"===t.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)";return{position:"relative",borderRadius:(t.vars||t).shape.borderRadius,[`&:hover .${qx.notchedOutline}`]:{borderColor:(t.vars||t).palette.text.primary},"@media (hover: none)":{[`&:hover .${qx.notchedOutline}`]:{borderColor:t.vars?`rgba(${t.vars.palette.common.onBackgroundChannel} / 0.23)`:n}},[`&.${qx.focused} .${qx.notchedOutline}`]:{borderWidth:2},variants:[...Object.entries(t.palette).filter(Jg()).map((e=>{let[n]=e;return{props:{color:n},style:{[`&.${qx.focused} .${qx.notchedOutline}`]:{borderColor:(t.vars||t).palette[n].main}}}})),{props:{},style:{[`&.${qx.error} .${qx.notchedOutline}`]:{borderColor:(t.vars||t).palette.error.main},[`&.${qx.disabled} .${qx.notchedOutline}`]:{borderColor:(t.vars||t).palette.action.disabled}}},{props:e=>{let{ownerState:t}=e;return t.startAdornment},style:{paddingLeft:14}},{props:e=>{let{ownerState:t}=e;return t.endAdornment},style:{paddingRight:14}},{props:e=>{let{ownerState:t}=e;return t.multiline},style:{padding:"16.5px 14px"}},{props:e=>{let{ownerState:t,size:n}=e;return t.multiline&&"small"===n},style:{padding:"8.5px 14px"}}]}}))),Gx=Hg((function(e){const{children:t,classes:n,className:r,label:o,notched:a,...i}=e,s=null!=o&&""!==o,l={...e,notched:a,withLabel:s};return(0,Da.jsx)(Wx,{"aria-hidden":!0,className:r,ownerState:l,...i,children:(0,Da.jsx)(Hx,{ownerState:l,children:s?(0,Da.jsx)("span",{children:o}):Ux||(Ux=(0,Da.jsx)("span",{className:"notranslate","aria-hidden":!0,children:"\u200b"}))})})}),{name:"MuiOutlinedInput",slot:"NotchedOutline",overridesResolver:(e,t)=>t.notchedOutline})(qg((e=>{let{theme:t}=e;const n="light"===t.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)";return{borderColor:t.vars?`rgba(${t.vars.palette.common.onBackgroundChannel} / 0.23)`:n}}))),Qx=Hg(Ex,{name:"MuiOutlinedInput",slot:"Input",overridesResolver:jx})(qg((e=>{let{theme:t}=e;return{padding:"16.5px 14px",...!t.vars&&{"&:-webkit-autofill":{WebkitBoxShadow:"light"===t.palette.mode?null:"0 0 0 100px #266798 inset",WebkitTextFillColor:"light"===t.palette.mode?null:"#fff",caretColor:"light"===t.palette.mode?null:"#fff",borderRadius:"inherit"}},...t.vars&&{"&:-webkit-autofill":{borderRadius:"inherit"},[t.getColorSchemeSelector("dark")]:{"&:-webkit-autofill":{WebkitBoxShadow:"0 0 0 100px #266798 inset",WebkitTextFillColor:"#fff",caretColor:"#fff"}}},variants:[{props:{size:"small"},style:{padding:"8.5px 14px"}},{props:e=>{let{ownerState:t}=e;return t.multiline},style:{padding:0}},{props:e=>{let{ownerState:t}=e;return t.startAdornment},style:{paddingLeft:0}},{props:e=>{let{ownerState:t}=e;return t.endAdornment},style:{paddingRight:0}}]}}))),Yx=r.forwardRef((function(e,t){var n;const o=Yg({props:e,name:"MuiOutlinedInput"}),{components:a={},fullWidth:i=!1,inputComponent:s="input",label:l,multiline:c=!1,notched:u,slots:d={},type:p="text",...f}=o,m=(e=>{const{classes:t}=e,n=jg({root:["root"],notchedOutline:["notchedOutline"],input:["input"]},Vx,t);return{...t,...n}})(o),h=gx(),g=mx({props:o,muiFormControl:h,states:["color","disabled","error","focused","hiddenLabel","size","required"]}),v={...o,color:g.color||"primary",disabled:g.disabled,error:g.error,focused:g.focused,formControl:h,fullWidth:i,hiddenLabel:g.hiddenLabel,multiline:c,size:g.size,type:p},b=d.root??a.Root??Kx,y=d.input??a.Input??Qx;return(0,Da.jsx)(Ox,{slots:{root:b,input:y},renderSuffix:e=>(0,Da.jsx)(Gx,{ownerState:v,className:m.notchedOutline,label:null!=l&&""!==l&&g.required?n||(n=(0,Da.jsxs)(r.Fragment,{children:[l,"\u2009","*"]})):l,notched:"undefined"!==typeof u?u:Boolean(e.startAdornment||e.filled||e.focused)}),fullWidth:i,inputComponent:s,multiline:c,ref:t,type:p,...f,classes:{...m,notchedOutline:null}})}));Yx.muiName="Input";const Xx=Yx;function Jx(e){return gg("MuiFormLabel",e)}const Zx=vg("MuiFormLabel",["root","colorSecondary","focused","disabled","error","filled","required","asterisk"]),ew=Hg("label",{name:"MuiFormLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,"secondary"===n.color&&t.colorSecondary,n.filled&&t.filled]}})(qg((e=>{let{theme:t}=e;return{color:(t.vars||t).palette.text.secondary,...t.typography.body1,lineHeight:"1.4375em",padding:0,position:"relative",variants:[...Object.entries(t.palette).filter(Jg()).map((e=>{let[n]=e;return{props:{color:n},style:{[`&.${Zx.focused}`]:{color:(t.vars||t).palette[n].main}}}})),{props:{},style:{[`&.${Zx.disabled}`]:{color:(t.vars||t).palette.text.disabled},[`&.${Zx.error}`]:{color:(t.vars||t).palette.error.main}}}]}}))),tw=Hg("span",{name:"MuiFormLabel",slot:"Asterisk",overridesResolver:(e,t)=>t.asterisk})(qg((e=>{let{theme:t}=e;return{[`&.${Zx.error}`]:{color:(t.vars||t).palette.error.main}}}))),nw=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiFormLabel"}),{children:r,className:o,color:a,component:i="label",disabled:s,error:l,filled:c,focused:u,required:d,...p}=n,f=mx({props:n,muiFormControl:gx(),states:["color","required","focused","disabled","error","filled"]}),m={...n,color:f.color||"primary",component:i,disabled:f.disabled,error:f.error,filled:f.filled,focused:f.focused,required:f.required},h=(e=>{const{classes:t,color:n,focused:r,disabled:o,error:a,filled:i,required:s}=e;return jg({root:["root",`color${Xg(n)}`,o&&"disabled",a&&"error",i&&"filled",r&&"focused",s&&"required"],asterisk:["asterisk",a&&"error"]},Jx,t)})(m);return(0,Da.jsxs)(ew,{as:i,ownerState:m,className:kg(h.root,o),ref:t,...p,children:[r,f.required&&(0,Da.jsxs)(tw,{ownerState:m,"aria-hidden":!0,className:h.asterisk,children:["\u2009","*"]})]})})),rw=nw;function ow(e){return gg("MuiInputLabel",e)}vg("MuiInputLabel",["root","focused","disabled","error","required","asterisk","formControl","sizeSmall","shrink","animated","standard","filled","outlined"]);const aw=Hg(rw,{shouldForwardProp:e=>Ug(e)||"classes"===e,name:"MuiInputLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[{[`& .${Zx.asterisk}`]:t.asterisk},t.root,n.formControl&&t.formControl,"small"===n.size&&t.sizeSmall,n.shrink&&t.shrink,!n.disableAnimation&&t.animated,n.focused&&t.focused,t[n.variant]]}})(qg((e=>{let{theme:t}=e;return{display:"block",transformOrigin:"top left",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%",variants:[{props:e=>{let{ownerState:t}=e;return t.formControl},style:{position:"absolute",left:0,top:0,transform:"translate(0, 20px) scale(1)"}},{props:{size:"small"},style:{transform:"translate(0, 17px) scale(1)"}},{props:e=>{let{ownerState:t}=e;return t.shrink},style:{transform:"translate(0, -1.5px) scale(0.75)",transformOrigin:"top left",maxWidth:"133%"}},{props:e=>{let{ownerState:t}=e;return!t.disableAnimation},style:{transition:t.transitions.create(["color","transform","max-width"],{duration:t.transitions.duration.shorter,easing:t.transitions.easing.easeOut})}},{props:{variant:"filled"},style:{zIndex:1,pointerEvents:"none",transform:"translate(12px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"}},{props:{variant:"filled",size:"small"},style:{transform:"translate(12px, 13px) scale(1)"}},{props:e=>{let{variant:t,ownerState:n}=e;return"filled"===t&&n.shrink},style:{userSelect:"none",pointerEvents:"auto",transform:"translate(12px, 7px) scale(0.75)",maxWidth:"calc(133% - 24px)"}},{props:e=>{let{variant:t,ownerState:n,size:r}=e;return"filled"===t&&n.shrink&&"small"===r},style:{transform:"translate(12px, 4px) scale(0.75)"}},{props:{variant:"outlined"},style:{zIndex:1,pointerEvents:"none",transform:"translate(14px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"}},{props:{variant:"outlined",size:"small"},style:{transform:"translate(14px, 9px) scale(1)"}},{props:e=>{let{variant:t,ownerState:n}=e;return"outlined"===t&&n.shrink},style:{userSelect:"none",pointerEvents:"auto",maxWidth:"calc(133% - 32px)",transform:"translate(14px, -9px) scale(0.75)"}}]}}))),iw=r.forwardRef((function(e,t){const n=Yg({name:"MuiInputLabel",props:e}),{disableAnimation:r=!1,margin:o,shrink:a,variant:i,className:s,...l}=n,c=gx();let u=a;"undefined"===typeof u&&c&&(u=c.filled||c.focused||c.adornedStart);const d=mx({props:n,muiFormControl:c,states:["size","variant","required","focused"]}),p={...n,disableAnimation:r,formControl:c,shrink:u,size:d.size,variant:d.variant,required:d.required,focused:d.focused},f=(e=>{const{classes:t,formControl:n,size:r,shrink:o,disableAnimation:a,variant:i,required:s}=e,l=jg({root:["root",n&&"formControl",!a&&"animated",o&&"shrink",r&&"normal"!==r&&`size${Xg(r)}`,i],asterisk:[s&&"asterisk"]},ow,t);return{...t,...l}})(p);return(0,Da.jsx)(aw,{"data-shrink":u,ref:t,className:kg(f.root,s),...l,ownerState:p,classes:f})}));const sw=function(e,t){return r.isValidElement(e)&&-1!==t.indexOf(e.type.muiName??e.type?._payload?.value?.muiName)};function lw(e){return gg("MuiFormControl",e)}vg("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);const cw=Hg("div",{name:"MuiFormControl",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`margin${Xg(n.margin)}`],n.fullWidth&&t.fullWidth]}})({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top",variants:[{props:{margin:"normal"},style:{marginTop:16,marginBottom:8}},{props:{margin:"dense"},style:{marginTop:8,marginBottom:4}},{props:{fullWidth:!0},style:{width:"100%"}}]}),uw=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiFormControl"}),{children:o,className:a,color:i="primary",component:s="div",disabled:l=!1,error:c=!1,focused:u,fullWidth:d=!1,hiddenLabel:p=!1,margin:f="none",required:m=!1,size:h="medium",variant:g="outlined",...v}=n,b={...n,color:i,component:s,disabled:l,error:c,fullWidth:d,hiddenLabel:p,margin:f,required:m,size:h,variant:g},y=(e=>{const{classes:t,margin:n,fullWidth:r}=e;return jg({root:["root","none"!==n&&`margin${Xg(n)}`,r&&"fullWidth"]},lw,t)})(b),[x,w]=r.useState((()=>{let e=!1;return o&&r.Children.forEach(o,(t=>{if(!sw(t,["Input","Select"]))return;const n=sw(t,["Select"])?t.props.input:t;n&&n.props.startAdornment&&(e=!0)})),e})),[S,k]=r.useState((()=>{let e=!1;return o&&r.Children.forEach(o,(t=>{sw(t,["Input","Select"])&&(yx(t.props,!0)||yx(t.props.inputProps,!0))&&(e=!0)})),e})),[j,C]=r.useState(!1);l&&j&&C(!1);const E=void 0===u||l?j:u;let T;r.useRef(!1);const P=r.useCallback((()=>{k(!0)}),[]),O=r.useCallback((()=>{k(!1)}),[]),N=r.useMemo((()=>({adornedStart:x,setAdornedStart:w,color:i,disabled:l,error:c,filled:S,focused:E,fullWidth:d,hiddenLabel:p,size:h,onBlur:()=>{C(!1)},onFocus:()=>{C(!0)},onEmpty:O,onFilled:P,registerEffect:T,required:m,variant:g})),[x,i,l,c,S,E,d,p,T,O,P,m,h,g]);return(0,Da.jsx)(hx.Provider,{value:N,children:(0,Da.jsx)(cw,{as:s,ownerState:b,className:kg(y.root,a),ref:t,...v,children:o})})})),dw=uw;function pw(e){return gg("MuiFormHelperText",e)}const fw=vg("MuiFormHelperText",["root","error","disabled","sizeSmall","sizeMedium","contained","focused","filled","required"]);var mw;const hw=Hg("p",{name:"MuiFormHelperText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.size&&t[`size${Xg(n.size)}`],n.contained&&t.contained,n.filled&&t.filled]}})(qg((e=>{let{theme:t}=e;return{color:(t.vars||t).palette.text.secondary,...t.typography.caption,textAlign:"left",marginTop:3,marginRight:0,marginBottom:0,marginLeft:0,[`&.${fw.disabled}`]:{color:(t.vars||t).palette.text.disabled},[`&.${fw.error}`]:{color:(t.vars||t).palette.error.main},variants:[{props:{size:"small"},style:{marginTop:4}},{props:e=>{let{ownerState:t}=e;return t.contained},style:{marginLeft:14,marginRight:14}}]}}))),gw=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiFormHelperText"}),{children:r,className:o,component:a="p",disabled:i,error:s,filled:l,focused:c,margin:u,required:d,variant:p,...f}=n,m=mx({props:n,muiFormControl:gx(),states:["variant","size","disabled","error","filled","focused","required"]}),h={...n,component:a,contained:"filled"===m.variant||"outlined"===m.variant,variant:m.variant,size:m.size,disabled:m.disabled,error:m.error,filled:m.filled,focused:m.focused,required:m.required};delete h.ownerState;const g=(e=>{const{classes:t,contained:n,size:r,disabled:o,error:a,filled:i,focused:s,required:l}=e;return jg({root:["root",o&&"disabled",a&&"error",r&&`size${Xg(r)}`,n&&"contained",s&&"focused",i&&"filled",l&&"required"]},pw,t)})(h);return(0,Da.jsx)(hw,{as:a,className:kg(g.root,o),ref:t,...f,ownerState:h,children:" "===r?mw||(mw=(0,Da.jsx)("span",{className:"notranslate","aria-hidden":!0,children:"\u200b"})):r})})),vw=Xb,bw=r.createContext();const yw=function(e){const{elementType:t,externalSlotProps:n,ownerState:r,skipResolvingSlotProps:o=!1,...a}=e,i=o?{}:ay(n,r),{props:s,internalRef:l}=uy({...a,externalSlotProps:i}),c=Kv(l,i?.ref,e.additionalProps?.ref);return oy(t,{...s,ref:c},r)};const xw=r.createContext({});function ww(e){return gg("MuiList",e)}vg("MuiList",["root","padding","dense","subheader"]);const Sw=Hg("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})({listStyle:"none",margin:0,padding:0,position:"relative",variants:[{props:e=>{let{ownerState:t}=e;return!t.disablePadding},style:{paddingTop:8,paddingBottom:8}},{props:e=>{let{ownerState:t}=e;return t.subheader},style:{paddingTop:0}}]}),kw=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiList"}),{children:o,className:a,component:i="ul",dense:s=!1,disablePadding:l=!1,subheader:c,...u}=n,d=r.useMemo((()=>({dense:s})),[s]),p={...n,component:i,dense:s,disablePadding:l},f=(e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return jg({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},ww,t)})(p);return(0,Da.jsx)(xw.Provider,{value:d,children:(0,Da.jsxs)(Sw,{as:i,className:kg(f.root,a),ref:t,ownerState:p,...u,children:[c,o]})})})),jw=Ry,Cw=Ny;function Ew(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Tw(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Pw(e,t){if(void 0===t)return!0;let n=e.innerText;return void 0===n&&(n=e.textContent),n=n.trim().toLowerCase(),0!==n.length&&(t.repeating?n[0]===t.keys[0]:n.startsWith(t.keys.join("")))}function Ow(e,t,n,r,o,a){let i=!1,s=o(e,t,!!t&&n);for(;s;){if(s===e.firstChild){if(i)return!1;i=!0}const t=!r&&(s.disabled||"true"===s.getAttribute("aria-disabled"));if(s.hasAttribute("tabindex")&&Pw(s,a)&&!t)return s.focus(),!0;s=o(e,s,n)}return!1}const Nw=r.forwardRef((function(e,t){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:i,className:s,disabledItemsFocusable:l=!1,disableListWrap:c=!1,onKeyDown:u,variant:d="selectedMenu",...p}=e,f=r.useRef(null),m=r.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});vx((()=>{o&&f.current.focus()}),[o]),r.useImperativeHandle(n,(()=>({adjustStyleForScrollbar:(e,t)=>{let{direction:n}=t;const r=!f.current.style.width;if(e.clientHeight<f.current.clientHeight&&r){const t=`${jw(Cw(e))}px`;f.current.style["rtl"===n?"paddingLeft":"paddingRight"]=t,f.current.style.width=`calc(100% + ${t})`}return f.current}})),[]);const h=Gv(f,t);let g=-1;r.Children.forEach(i,((e,t)=>{r.isValidElement(e)?(e.props.disabled||("selectedMenu"===d&&e.props.selected||-1===g)&&(g=t),g===t&&(e.props.disabled||e.props.muiSkipListHighlight||e.type.muiSkipListHighlight)&&(g+=1,g>=i.length&&(g=-1))):g===t&&(g+=1,g>=i.length&&(g=-1))}));const v=r.Children.map(i,((e,t)=>{if(t===g){const t={};return a&&(t.autoFocus=!0),void 0===e.props.tabIndex&&"selectedMenu"===d&&(t.tabIndex=0),r.cloneElement(e,t)}return e}));return(0,Da.jsx)(kw,{role:"menu",ref:h,className:s,onKeyDown:e=>{const t=f.current,n=e.key;if(e.ctrlKey||e.metaKey||e.altKey)return void(u&&u(e));const r=vw(t).activeElement;if("ArrowDown"===n)e.preventDefault(),Ow(t,r,c,l,Ew);else if("ArrowUp"===n)e.preventDefault(),Ow(t,r,c,l,Tw);else if("Home"===n)e.preventDefault(),Ow(t,null,c,l,Ew);else if("End"===n)e.preventDefault(),Ow(t,null,c,l,Tw);else if(1===n.length){const o=m.current,a=n.toLowerCase(),i=performance.now();o.keys.length>0&&(i-o.lastTime>500?(o.keys=[],o.repeating=!0,o.previousKeyMatched=!0):o.repeating&&a!==o.keys[0]&&(o.repeating=!1)),o.lastTime=i,o.keys.push(a);const s=r&&!o.repeating&&Pw(r,o);o.previousKeyMatched&&(s||Ow(t,r,!1,l,Ew,o))?e.preventDefault():o.previousKeyMatched=!1}u&&u(e)},tabIndex:o?0:-1,...p,children:v})})),Rw=sx;function _w(e){return`scale(${e}, ${e**2})`}const Aw={entering:{opacity:1,transform:_w(1)},entered:{opacity:1,transform:"none"}},zw="undefined"!==typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Mw=r.forwardRef((function(e,t){const{addEndListener:n,appear:o=!0,children:a,easing:i,in:s,onEnter:l,onEntered:c,onEntering:u,onExit:d,onExited:p,onExiting:f,style:m,timeout:h="auto",TransitionComponent:g=xy,...v}=e,b=fb(),y=r.useRef(),x=cv(),w=r.useRef(null),S=Gv(w,Yb(a),t),k=e=>t=>{if(e){const n=w.current;void 0===t?e(n):e(n,t)}},j=k(u),C=k(((e,t)=>{wy(e);const{duration:n,delay:r,easing:o}=Sy({style:m,timeout:h,easing:i},{mode:"enter"});let a;"auto"===h?(a=x.transitions.getAutoHeightDuration(e.clientHeight),y.current=a):a=n,e.style.transition=[x.transitions.create("opacity",{duration:a,delay:r}),x.transitions.create("transform",{duration:zw?a:.666*a,delay:r,easing:o})].join(","),l&&l(e,t)})),E=k(c),T=k(f),P=k((e=>{const{duration:t,delay:n,easing:r}=Sy({style:m,timeout:h,easing:i},{mode:"exit"});let o;"auto"===h?(o=x.transitions.getAutoHeightDuration(e.clientHeight),y.current=o):o=t,e.style.transition=[x.transitions.create("opacity",{duration:o,delay:n}),x.transitions.create("transform",{duration:zw?o:.666*o,delay:zw?n:n||.333*o,easing:r})].join(","),e.style.opacity=0,e.style.transform=_w(.75),d&&d(e)})),O=k(p);return(0,Da.jsx)(g,{appear:o,in:s,nodeRef:w,onEnter:C,onEntered:E,onEntering:j,onExit:P,onExited:O,onExiting:T,addEndListener:e=>{"auto"===h&&b.start(y.current||0,e),n&&n(w.current,e)},timeout:"auto"===h?null:h,...v,children:(e,t)=>{let{ownerState:n,...o}=t;return r.cloneElement(a,{style:{opacity:0,transform:_w(.75),visibility:"exited"!==e||s?void 0:"hidden",...Aw[e],...m,...a.props.style},ref:S,...o})}})}));Mw&&(Mw.muiSupportAuto=!0);const Iw=Mw;function $w(e){return gg("MuiPopover",e)}vg("MuiPopover",["root","paper"]);function Fw(e,t){if(!e)return t;if("function"===typeof e||"function"===typeof t)return n=>{const r="function"===typeof t?t(n):t,o="function"===typeof e?e({...n,...r}):e,a=kg(n?.className,r?.className,o?.className);return{...r,...o,...!!a&&{className:a},...r?.style&&o?.style&&{style:{...r.style,...o.style}},...r?.sx&&o?.sx&&{sx:[...Array.isArray(r.sx)?r.sx:[r.sx],...Array.isArray(o.sx)?o.sx:[o.sx]]}}};const n=t,r=kg(n?.className,e?.className);return{...t,...e,...!!r&&{className:r},...n?.style&&e?.style&&{style:{...n.style,...e.style}},...n?.sx&&e?.sx&&{sx:[...Array.isArray(n.sx)?n.sx:[n.sx],...Array.isArray(e.sx)?e.sx:[e.sx]]}}}function Dw(e,t){let n=0;return"number"===typeof t?n=t:"center"===t?n=e.height/2:"bottom"===t&&(n=e.height),n}function Lw(e,t){let n=0;return"number"===typeof t?n=t:"center"===t?n=e.width/2:"right"===t&&(n=e.width),n}function Bw(e){return[e.horizontal,e.vertical].map((e=>"number"===typeof e?`${e}px`:e)).join(" ")}function Uw(e){return"function"===typeof e?e():e}const Ww=Hg(Hy,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Hw=Hg(pv,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Vw=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiPopover"}),{action:o,anchorEl:a,anchorOrigin:i={vertical:"top",horizontal:"left"},anchorPosition:s,anchorReference:l="anchorEl",children:c,className:u,container:d,elevation:p=8,marginThreshold:f=16,open:m,PaperProps:h={},slots:g={},slotProps:v={},transformOrigin:b={vertical:"top",horizontal:"left"},TransitionComponent:y,transitionDuration:x="auto",TransitionProps:w={},disableScrollLock:S=!1,...k}=n,j=r.useRef(),C={...n,anchorOrigin:i,anchorReference:l,elevation:p,marginThreshold:f,transformOrigin:b,TransitionComponent:y,transitionDuration:x,TransitionProps:w},E=(e=>{const{classes:t}=e;return jg({root:["root"],paper:["paper"]},$w,t)})(C),T=r.useCallback((()=>{if("anchorPosition"===l)return s;const e=Uw(a),t=(e&&1===e.nodeType?e:vw(j.current).body).getBoundingClientRect();return{top:t.top+Dw(t,i.vertical),left:t.left+Lw(t,i.horizontal)}}),[a,i.horizontal,i.vertical,s,l]),P=r.useCallback((e=>({vertical:Dw(e,b.vertical),horizontal:Lw(e,b.horizontal)})),[b.horizontal,b.vertical]),O=r.useCallback((e=>{const t={width:e.offsetWidth,height:e.offsetHeight},n=P(t);if("none"===l)return{top:null,left:null,transformOrigin:Bw(n)};const r=T();let o=r.top-n.vertical,i=r.left-n.horizontal;const s=o+t.height,c=i+t.width,u=Cw(Uw(a)),d=u.innerHeight-f,p=u.innerWidth-f;if(null!==f&&o<f){const e=o-f;o-=e,n.vertical+=e}else if(null!==f&&s>d){const e=s-d;o-=e,n.vertical+=e}if(null!==f&&i<f){const e=i-f;i-=e,n.horizontal+=e}else if(c>p){const e=c-p;i-=e,n.horizontal+=e}return{top:`${Math.round(o)}px`,left:`${Math.round(i)}px`,transformOrigin:Bw(n)}}),[a,l,T,P,f]),[N,R]=r.useState(m),_=r.useCallback((()=>{const e=j.current;if(!e)return;const t=O(e);null!==t.top&&e.style.setProperty("top",t.top),null!==t.left&&(e.style.left=t.left),e.style.transformOrigin=t.transformOrigin,R(!0)}),[O]);r.useEffect((()=>(S&&window.addEventListener("scroll",_),()=>window.removeEventListener("scroll",_))),[a,S,_]);r.useEffect((()=>{m&&_()})),r.useImperativeHandle(o,(()=>m?{updatePosition:()=>{_()}}:null),[m,_]),r.useEffect((()=>{if(!m)return;const e=Rw((()=>{_()})),t=Cw(a);return t.addEventListener("resize",e),()=>{e.clear(),t.removeEventListener("resize",e)}}),[a,m,_]);let A=x;const z={slots:{transition:y,...g},slotProps:{transition:w,paper:h,...v}},[M,I]=dy("transition",{elementType:Iw,externalForwardedProps:z,ownerState:C,getSlotProps:e=>({...e,onEntering:(t,n)=>{e.onEntering?.(t,n),_()},onExited:t=>{e.onExited?.(t),R(!1)}}),additionalProps:{appear:!0,in:m}});"auto"!==x||M.muiSupportAuto||(A=void 0);const $=d||(a?vw(Uw(a)).body:void 0),[F,{slots:D,slotProps:L,...B}]=dy("root",{ref:t,elementType:Ww,externalForwardedProps:{...z,...k},shouldForwardComponentProp:!0,additionalProps:{slots:{backdrop:g.backdrop},slotProps:{backdrop:Fw("function"===typeof v.backdrop?v.backdrop(C):v.backdrop,{invisible:!0})},container:$,open:m},ownerState:C,className:kg(E.root,u)}),[U,W]=dy("paper",{ref:j,className:E.paper,elementType:Hw,externalForwardedProps:z,shouldForwardComponentProp:!0,additionalProps:{elevation:p,style:N?void 0:{opacity:0}},ownerState:C});return(0,Da.jsx)(F,{...B,...!fx(F)&&{slots:D,slotProps:L,disableScrollLock:S},children:(0,Da.jsx)(M,{...I,timeout:A,children:(0,Da.jsx)(U,{...W,children:c})})})}));function qw(e){return gg("MuiMenu",e)}vg("MuiMenu",["root","paper","list"]);const Kw={vertical:"top",horizontal:"right"},Gw={vertical:"top",horizontal:"left"},Qw=Hg(Vw,{shouldForwardProp:e=>Ug(e)||"classes"===e,name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Yw=Hg(Hw,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Xw=Hg(Nw,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Jw=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiMenu"}),{autoFocus:o=!0,children:a,className:i,disableAutoFocusItem:s=!1,MenuListProps:l={},onClose:c,open:u,PaperProps:d={},PopoverClasses:p,transitionDuration:f="auto",TransitionProps:{onEntering:m,...h}={},variant:g="selectedMenu",slots:v={},slotProps:b={},...y}=n,x=r.useContext(bw)??!1,w={...n,autoFocus:o,disableAutoFocusItem:s,MenuListProps:l,onEntering:m,PaperProps:d,transitionDuration:f,TransitionProps:h,variant:g},S=(e=>{const{classes:t}=e;return jg({root:["root"],paper:["paper"],list:["list"]},qw,t)})(w),k=o&&!s&&u,j=r.useRef(null);let C=-1;r.Children.map(a,((e,t)=>{r.isValidElement(e)&&(e.props.disabled||("selectedMenu"===g&&e.props.selected||-1===C)&&(C=t))}));const E={slots:v,slotProps:{list:l,transition:h,paper:d,...b}},T=yw({elementType:v.root,externalSlotProps:b.root,ownerState:w,className:[S.root,i]}),[P,O]=dy("paper",{className:S.paper,elementType:Yw,externalForwardedProps:E,shouldForwardComponentProp:!0,ownerState:w}),[N,R]=dy("list",{className:kg(S.list,l.className),elementType:Xw,shouldForwardComponentProp:!0,externalForwardedProps:E,getSlotProps:e=>({...e,onKeyDown:t=>{(e=>{"Tab"===e.key&&(e.preventDefault(),c&&c(e,"tabKeyDown"))})(t),e.onKeyDown?.(t)}}),ownerState:w}),_="function"===typeof E.slotProps.transition?E.slotProps.transition(w):E.slotProps.transition;return(0,Da.jsx)(Qw,{onClose:c,anchorOrigin:{vertical:"bottom",horizontal:x?"right":"left"},transformOrigin:x?Kw:Gw,slots:{root:v.root,paper:P,backdrop:v.backdrop,...v.transition&&{transition:v.transition}},slotProps:{root:T,paper:O,backdrop:"function"===typeof b.backdrop?b.backdrop(w):b.backdrop,transition:{..._,onEntering:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];((e,t)=>{j.current&&j.current.adjustStyleForScrollbar(e,{direction:x?"rtl":"ltr"}),m&&m(e,t)})(...t),_?.onEntering?.(...t)}}},open:u,ref:t,transitionDuration:f,ownerState:w,...y,classes:p,children:(0,Da.jsx)(N,{actions:j,autoFocus:o&&(-1===C||s),autoFocusItem:k,variant:g,...R,children:a})})}));function Zw(e){return gg("MuiNativeSelect",e)}const eS=vg("MuiNativeSelect",["root","select","multiple","filled","outlined","standard","disabled","icon","iconOpen","iconFilled","iconOutlined","iconStandard","nativeInput","error"]),tS=Hg("select")((e=>{let{theme:t}=e;return{MozAppearance:"none",WebkitAppearance:"none",userSelect:"none",borderRadius:0,cursor:"pointer","&:focus":{borderRadius:0},[`&.${eS.disabled}`]:{cursor:"default"},"&[multiple]":{height:"auto"},"&:not([multiple]) option, &:not([multiple]) optgroup":{backgroundColor:(t.vars||t).palette.background.paper},variants:[{props:e=>{let{ownerState:t}=e;return"filled"!==t.variant&&"outlined"!==t.variant},style:{"&&&":{paddingRight:24,minWidth:16}}},{props:{variant:"filled"},style:{"&&&":{paddingRight:32}}},{props:{variant:"outlined"},style:{borderRadius:(t.vars||t).shape.borderRadius,"&:focus":{borderRadius:(t.vars||t).shape.borderRadius},"&&&":{paddingRight:32}}}]}})),nS=Hg(tS,{name:"MuiNativeSelect",slot:"Select",shouldForwardProp:Ug,overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.select,t[n.variant],n.error&&t.error,{[`&.${eS.multiple}`]:t.multiple}]}})({}),rS=Hg("svg")((e=>{let{theme:t}=e;return{position:"absolute",right:0,top:"calc(50% - .5em)",pointerEvents:"none",color:(t.vars||t).palette.action.active,[`&.${eS.disabled}`]:{color:(t.vars||t).palette.action.disabled},variants:[{props:e=>{let{ownerState:t}=e;return t.open},style:{transform:"rotate(180deg)"}},{props:{variant:"filled"},style:{right:7}},{props:{variant:"outlined"},style:{right:7}}]}})),oS=Hg(rS,{name:"MuiNativeSelect",slot:"Icon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.icon,n.variant&&t[`icon${Xg(n.variant)}`],n.open&&t.iconOpen]}})({}),aS=r.forwardRef((function(e,t){const{className:n,disabled:o,error:a,IconComponent:i,inputRef:s,variant:l="standard",...c}=e,u={...e,disabled:o,variant:l,error:a},d=(e=>{const{classes:t,variant:n,disabled:r,multiple:o,open:a,error:i}=e;return jg({select:["select",n,r&&"disabled",o&&"multiple",i&&"error"],icon:["icon",`icon${Xg(n)}`,a&&"iconOpen",r&&"disabled"]},Zw,t)})(u);return(0,Da.jsxs)(r.Fragment,{children:[(0,Da.jsx)(nS,{ownerState:u,className:kg(d.select,n),disabled:o,ref:s||t,...c}),e.multiple?null:(0,Da.jsx)(oS,{as:i,ownerState:u,className:d.icon})]})}));const iS=function(e){let{controlled:t,default:n,name:o,state:a="value"}=e;const{current:i}=r.useRef(void 0!==t),[s,l]=r.useState(n);return[i?t:s,r.useCallback((e=>{i||l(e)}),[])]};function sS(e){return gg("MuiSelect",e)}const lS=vg("MuiSelect",["root","select","multiple","filled","outlined","standard","disabled","focused","icon","iconOpen","iconFilled","iconOutlined","iconStandard","nativeInput","error"]);var cS;const uS=Hg(tS,{name:"MuiSelect",slot:"Select",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[{[`&.${lS.select}`]:t.select},{[`&.${lS.select}`]:t[n.variant]},{[`&.${lS.error}`]:t.error},{[`&.${lS.multiple}`]:t.multiple}]}})({[`&.${lS.select}`]:{height:"auto",minHeight:"1.4375em",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}),dS=Hg(rS,{name:"MuiSelect",slot:"Icon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.icon,n.variant&&t[`icon${Xg(n.variant)}`],n.open&&t.iconOpen]}})({}),pS=Hg("input",{shouldForwardProp:e=>Bg(e)&&"classes"!==e,name:"MuiSelect",slot:"NativeInput",overridesResolver:(e,t)=>t.nativeInput})({bottom:0,left:0,position:"absolute",opacity:0,pointerEvents:"none",width:"100%",boxSizing:"border-box"});function fS(e,t){return"object"===typeof t&&null!==t?e===t:String(e)===String(t)}function mS(e){return null==e||"string"===typeof e&&!e.trim()}const hS=r.forwardRef((function(e,t){const{"aria-describedby":n,"aria-label":o,autoFocus:a,autoWidth:i,children:s,className:l,defaultOpen:c,defaultValue:u,disabled:d,displayEmpty:p,error:f=!1,IconComponent:m,inputRef:h,labelId:g,MenuProps:v={},multiple:b,name:y,onBlur:x,onChange:w,onClose:S,onFocus:k,onOpen:j,open:C,readOnly:E,renderValue:T,required:P,SelectDisplayProps:O={},tabIndex:N,type:R,value:_,variant:A="standard",...z}=e,[M,I]=iS({controlled:_,default:u,name:"Select"}),[$,F]=iS({controlled:C,default:c,name:"Select"}),D=r.useRef(null),L=r.useRef(null),[B,U]=r.useState(null),{current:W}=r.useRef(null!=C),[H,V]=r.useState(),q=Gv(t,h),K=r.useCallback((e=>{L.current=e,e&&U(e)}),[]),G=B?.parentNode;r.useImperativeHandle(q,(()=>({focus:()=>{L.current.focus()},node:D.current,value:M})),[M]),r.useEffect((()=>{c&&$&&B&&!W&&(V(i?null:G.clientWidth),L.current.focus())}),[B,i]),r.useEffect((()=>{a&&L.current.focus()}),[a]),r.useEffect((()=>{if(!g)return;const e=vw(L.current).getElementById(g);if(e){const t=()=>{getSelection().isCollapsed&&L.current.focus()};return e.addEventListener("click",t),()=>{e.removeEventListener("click",t)}}}),[g]);const Q=(e,t)=>{e?j&&j(t):S&&S(t),W||(V(i?null:G.clientWidth),F(e))},Y=r.Children.toArray(s),X=e=>t=>{let n;if(t.currentTarget.hasAttribute("tabindex")){if(b){n=Array.isArray(M)?M.slice():[];const t=M.indexOf(e.props.value);-1===t?n.push(e.props.value):n.splice(t,1)}else n=e.props.value;if(e.props.onClick&&e.props.onClick(t),M!==n&&(I(n),w)){const r=t.nativeEvent||t,o=new r.constructor(r.type,r);Object.defineProperty(o,"target",{writable:!0,value:{value:n,name:y}}),w(o,e)}b||Q(!1,t)}},J=null!==B&&$;let Z,ee;delete z["aria-invalid"];const te=[];let ne=!1,re=!1;(yx({value:M})||p)&&(T?Z=T(M):ne=!0);const oe=Y.map((e=>{if(!r.isValidElement(e))return null;let t;if(b){if(!Array.isArray(M))throw new Error(Uf(2));t=M.some((t=>fS(t,e.props.value))),t&&ne&&te.push(e.props.children)}else t=fS(M,e.props.value),t&&ne&&(ee=e.props.children);return t&&(re=!0),r.cloneElement(e,{"aria-selected":t?"true":"false",onClick:X(e),onKeyUp:t=>{" "===t.key&&t.preventDefault(),e.props.onKeyUp&&e.props.onKeyUp(t)},role:"option",selected:t,value:void 0,"data-value":e.props.value})}));ne&&(Z=b?0===te.length?null:te.reduce(((e,t,n)=>(e.push(t),n<te.length-1&&e.push(", "),e)),[]):ee);let ae,ie=H;!i&&W&&B&&(ie=G.clientWidth),ae="undefined"!==typeof N?N:d?null:0;const se=O.id||(y?`mui-component-select-${y}`:void 0),le={...e,variant:A,value:M,open:J,error:f},ce=(e=>{const{classes:t,variant:n,disabled:r,multiple:o,open:a,error:i}=e;return jg({select:["select",n,r&&"disabled",o&&"multiple",i&&"error"],icon:["icon",`icon${Xg(n)}`,a&&"iconOpen",r&&"disabled"],nativeInput:["nativeInput"]},sS,t)})(le),ue={...v.PaperProps,...v.slotProps?.paper},de=Wv();return(0,Da.jsxs)(r.Fragment,{children:[(0,Da.jsx)(uS,{as:"div",ref:K,tabIndex:ae,role:"combobox","aria-controls":J?de:void 0,"aria-disabled":d?"true":void 0,"aria-expanded":J?"true":"false","aria-haspopup":"listbox","aria-label":o,"aria-labelledby":[g,se].filter(Boolean).join(" ")||void 0,"aria-describedby":n,"aria-required":P?"true":void 0,"aria-invalid":f?"true":void 0,onKeyDown:e=>{if(!E){[" ","ArrowUp","ArrowDown","Enter"].includes(e.key)&&(e.preventDefault(),Q(!0,e))}},onMouseDown:d||E?null:e=>{0===e.button&&(e.preventDefault(),L.current.focus(),Q(!0,e))},onBlur:e=>{!J&&x&&(Object.defineProperty(e,"target",{writable:!0,value:{value:M,name:y}}),x(e))},onFocus:k,...O,ownerState:le,className:kg(O.className,ce.select,l),id:se,children:mS(Z)?cS||(cS=(0,Da.jsx)("span",{className:"notranslate","aria-hidden":!0,children:"\u200b"})):Z}),(0,Da.jsx)(pS,{"aria-invalid":f,value:Array.isArray(M)?M.join(","):M,name:y,ref:D,"aria-hidden":!0,onChange:e=>{const t=Y.find((t=>t.props.value===e.target.value));void 0!==t&&(I(t.props.value),w&&w(e,t))},tabIndex:-1,disabled:d,className:ce.nativeInput,autoFocus:a,required:P,...z,ownerState:le}),(0,Da.jsx)(dS,{as:m,className:ce.icon,ownerState:le}),(0,Da.jsx)(Jw,{id:`menu-${y||""}`,anchorEl:G,open:J,onClose:e=>{Q(!1,e)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},...v,slotProps:{...v.slotProps,list:{"aria-labelledby":g,role:"listbox","aria-multiselectable":b?"true":void 0,disableListWrap:!0,id:de,...v.MenuListProps},paper:{...ue,style:{minWidth:ie,...null!=ue?ue.style:null}}},children:oe})]})})),gS=hS;function vS(e){return gg("MuiSvgIcon",e)}vg("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const bS=Hg("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,"inherit"!==n.color&&t[`color${Xg(n.color)}`],t[`fontSize${Xg(n.fontSize)}`]]}})(qg((e=>{let{theme:t}=e;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",flexShrink:0,transition:t.transitions?.create?.("fill",{duration:(t.vars??t).transitions?.duration?.shorter}),variants:[{props:e=>!e.hasSvgAsChild,style:{fill:"currentColor"}},{props:{fontSize:"inherit"},style:{fontSize:"inherit"}},{props:{fontSize:"small"},style:{fontSize:t.typography?.pxToRem?.(20)||"1.25rem"}},{props:{fontSize:"medium"},style:{fontSize:t.typography?.pxToRem?.(24)||"1.5rem"}},{props:{fontSize:"large"},style:{fontSize:t.typography?.pxToRem?.(35)||"2.1875rem"}},...Object.entries((t.vars??t).palette).filter((e=>{let[,t]=e;return t&&t.main})).map((e=>{let[n]=e;return{props:{color:n},style:{color:(t.vars??t).palette?.[n]?.main}}})),{props:{color:"action"},style:{color:(t.vars??t).palette?.action?.active}},{props:{color:"disabled"},style:{color:(t.vars??t).palette?.action?.disabled}},{props:{color:"inherit"},style:{color:void 0}}]}}))),yS=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiSvgIcon"}),{children:o,className:a,color:i="inherit",component:s="svg",fontSize:l="medium",htmlColor:c,inheritViewBox:u=!1,titleAccess:d,viewBox:p="0 0 24 24",...f}=n,m=r.isValidElement(o)&&"svg"===o.type,h={...n,color:i,component:s,fontSize:l,instanceFontSize:e.fontSize,inheritViewBox:u,viewBox:p,hasSvgAsChild:m},g={};u||(g.viewBox=p);const v=(e=>{const{color:t,fontSize:n,classes:r}=e;return jg({root:["root","inherit"!==t&&`color${Xg(t)}`,`fontSize${Xg(n)}`]},vS,r)})(h);return(0,Da.jsxs)(bS,{as:s,className:kg(v.root,a),focusable:"false",color:c,"aria-hidden":!d||void 0,role:d?"img":void 0,ref:t,...g,...f,...m&&o.props,ownerState:h,children:[m?o.props.children:o,d?(0,Da.jsx)("title",{children:d}):null]})}));yS.muiName="SvgIcon";const xS=yS;const wS=function(e,t){function n(n,r){return(0,Da.jsx)(xS,{"data-testid":`${t}Icon`,ref:r,...n,children:e})}return n.muiName=xS.muiName,r.memo(r.forwardRef(n))}((0,Da.jsx)("path",{d:"M7 10l5 5 5-5z"}),"ArrowDropDown"),SS={name:"MuiSelect",overridesResolver:(e,t)=>t.root,shouldForwardProp:e=>Ug(e)&&"variant"!==e,slot:"Root"},kS=Hg(Mx,SS)(""),jS=Hg(Xx,SS)(""),CS=Hg(Bx,SS)(""),ES=r.forwardRef((function(e,t){const n=Yg({name:"MuiSelect",props:e}),{autoWidth:o=!1,children:a,classes:i={},className:s,defaultOpen:l=!1,displayEmpty:c=!1,IconComponent:u=wS,id:d,input:p,inputProps:f,label:m,labelId:h,MenuProps:g,multiple:v=!1,native:b=!1,onClose:y,onOpen:x,open:w,renderValue:S,SelectDisplayProps:k,variant:j="outlined",...C}=n,E=b?aS:gS,T=mx({props:n,muiFormControl:gx(),states:["variant","error"]}),P=T.variant||j,O={...n,variant:P,classes:i},N=(e=>{const{classes:t}=e,n=jg({root:["root"]},sS,t);return{...t,...n}})(O),{root:R,..._}=N,A=p||{standard:(0,Da.jsx)(kS,{ownerState:O}),outlined:(0,Da.jsx)(jS,{label:m,ownerState:O}),filled:(0,Da.jsx)(CS,{ownerState:O})}[P],z=Gv(t,Yb(A));return(0,Da.jsx)(r.Fragment,{children:r.cloneElement(A,{inputComponent:E,inputProps:{children:a,error:T.error,IconComponent:u,variant:P,type:void 0,multiple:v,...b?{id:d}:{autoWidth:o,defaultOpen:l,displayEmpty:c,labelId:h,MenuProps:g,onClose:y,onOpen:x,open:w,renderValue:S,SelectDisplayProps:{id:d,...k}},...f,classes:f?qf(_,f.classes):_,...p?p.props.inputProps:{}},...(v&&b||c)&&"outlined"===P?{notched:!0}:{},ref:z,className:kg(A.props.className,s,N.root),...!p&&{variant:P},...C})})}));ES.muiName="Select";const TS=ES;function PS(e){return gg("MuiTextField",e)}vg("MuiTextField",["root"]);const OS={standard:Mx,filled:Bx,outlined:Xx},NS=Hg(dw,{name:"MuiTextField",slot:"Root",overridesResolver:(e,t)=>t.root})({}),RS=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiTextField"}),{autoComplete:r,autoFocus:o=!1,children:a,className:i,color:s="primary",defaultValue:l,disabled:c=!1,error:u=!1,FormHelperTextProps:d,fullWidth:p=!1,helperText:f,id:m,InputLabelProps:h,inputProps:g,InputProps:v,inputRef:b,label:y,maxRows:x,minRows:w,multiline:S=!1,name:k,onBlur:j,onChange:C,onFocus:E,placeholder:T,required:P=!1,rows:O,select:N=!1,SelectProps:R,slots:_={},slotProps:A={},type:z,value:M,variant:I="outlined",...$}=n,F={...n,autoFocus:o,color:s,disabled:c,error:u,fullWidth:p,multiline:S,required:P,select:N,variant:I},D=(e=>{const{classes:t}=e;return jg({root:["root"]},PS,t)})(F);const L=Wv(m),B=f&&L?`${L}-helper-text`:void 0,U=y&&L?`${L}-label`:void 0,W=OS[I],H={slots:_,slotProps:{input:v,inputLabel:h,htmlInput:g,formHelperText:d,select:R,...A}},V={},q=H.slotProps.inputLabel;"outlined"===I&&(q&&"undefined"!==typeof q.shrink&&(V.notched=q.shrink),V.label=y),N&&(R&&R.native||(V.id=void 0),V["aria-describedby"]=void 0);const[K,G]=dy("input",{elementType:W,externalForwardedProps:H,additionalProps:V,ownerState:F}),[Q,Y]=dy("inputLabel",{elementType:iw,externalForwardedProps:H,ownerState:F}),[X,J]=dy("htmlInput",{elementType:"input",externalForwardedProps:H,ownerState:F}),[Z,ee]=dy("formHelperText",{elementType:gw,externalForwardedProps:H,ownerState:F}),[te,ne]=dy("select",{elementType:TS,externalForwardedProps:H,ownerState:F}),re=(0,Da.jsx)(K,{"aria-describedby":B,autoComplete:r,autoFocus:o,defaultValue:l,fullWidth:p,multiline:S,name:k,rows:O,maxRows:x,minRows:w,type:z,value:M,id:L,inputRef:b,onBlur:j,onChange:C,onFocus:E,placeholder:T,inputProps:J,slots:{input:_.htmlInput?X:void 0},...G});return(0,Da.jsxs)(NS,{className:kg(D.root,i),disabled:c,error:u,fullWidth:p,ref:t,required:P,color:s,variant:I,ownerState:F,...$,children:[null!=y&&""!==y&&(0,Da.jsx)(Q,{htmlFor:L,id:U,...Y,children:y}),N?(0,Da.jsx)(te,{"aria-describedby":B,id:L,labelId:U,value:M,input:re,...ne,children:a}):re,f&&(0,Da.jsx)(Z,{id:B,...ee,children:f})]})})),_S=RS;function AS(e){return gg("MuiDialogActions",e)}vg("MuiDialogActions",["root","spacing"]);const zS=Hg("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disableSpacing&&t.spacing]}})({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto",variants:[{props:e=>{let{ownerState:t}=e;return!t.disableSpacing},style:{"& > :not(style) ~ :not(style)":{marginLeft:8}}}]}),MS=r.forwardRef((function(e,t){const n=Yg({props:e,name:"MuiDialogActions"}),{className:r,disableSpacing:o=!1,...a}=n,i={...n,disableSpacing:o},s=(e=>{const{classes:t,disableSpacing:n}=e;return jg({root:["root",!n&&"spacing"]},AS,t)})(i);return(0,Da.jsx)(zS,{className:kg(s.root,r),ownerState:i,ref:t,...a})}));const IS=function(){var e;const[t,n]=(0,r.useState)([]),[o,a]=(0,r.useState)(null),[i,s]=(0,r.useState)(!1),[l,c]=(0,r.useState)(""),[u,d]=(0,r.useState)(!1),[p,f]=(0,r.useState)(!1),[m,h]=(0,r.useState)(""),[g,v]=(0,r.useState)(!1),[b,y]=(0,r.useState)({valor_total:"",observacoes:""});(0,r.useEffect)((()=>{x()}),[]),(0,r.useEffect)((()=>{console.log("Consultas atualizadas:",t)}),[t]);const x=async()=>{try{d(!0),console.log("Iniciando carregamento de consultas do m\xe9dico");const e=await qd.getConsultas();console.log("Resposta da API para consultas:",e),Array.isArray(e)?(n(e),console.log(`Carregadas ${e.length} consultas`)):(console.error("A resposta n\xe3o \xe9 um array:",e),n([])),d(!1)}catch(e){console.error("Erro detalhado ao carregar consultas:",e),e.response&&(console.error("Status do erro:",e.response.status),console.error("Dados do erro:",e.response.data)),He.error("Erro ao carregar consultas"),n([]),d(!1)}};return(0,Da.jsxs)(wg,{children:[(0,Da.jsx)(av,{variant:"h6",gutterBottom:!0,children:"Gest\xe3o de Consultas"}),(0,Da.jsx)("button",{onClick:()=>x(),style:{padding:"0.5rem 1rem",margin:"1rem 0"},children:"Recarregar Consultas"}),u?(0,Da.jsx)("p",{children:"Carregando consultas..."}):0===t.length?(0,Da.jsxs)("div",{style:{textAlign:"center",padding:"2rem"},children:[(0,Da.jsx)("p",{children:"Nenhuma consulta encontrada."}),(0,Da.jsx)("small",{children:"Se isso parecer incorreto, verifique se h\xe1 algum problema com a conex\xe3o."})]}):(0,Da.jsx)(lv,{component:pv,children:(0,Da.jsxs)(bv,{children:[(0,Da.jsx)(jv,{children:(0,Da.jsxs)(Nv,{children:[(0,Da.jsx)(Mv,{children:"Data/Hora"}),(0,Da.jsx)(Mv,{children:"Paciente"}),(0,Da.jsx)(Mv,{children:"Status"}),(0,Da.jsx)(Mv,{children:"A\xe7\xf5es"})]})}),(0,Da.jsx)(Lv,{children:t.map((e=>{var t,n,r,o,i,l,c,u;return(0,Da.jsxs)(Nv,{children:[(0,Da.jsx)(Mv,{children:new Date(e.data_hora).toLocaleString("pt-PT")}),(0,Da.jsx)(Mv,{children:(null===(t=e.utilizador)||void 0===t?void 0:t.nome)||"Paciente n\xe3o identificado"}),(0,Da.jsx)(Mv,{children:(null===(n=e.status)||void 0===n?void 0:n.nome)||"Status desconhecido"}),(0,Da.jsxs)(Mv,{children:["Pendente"===(null===(r=e.status)||void 0===r?void 0:r.nome)&&(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Qb,{color:"primary",onClick:()=>(async e=>{try{await xc.aceitarConsulta(e),He.success("Consulta aprovada com sucesso!"),x()}catch(t){He.error("Erro ao aprovar consulta")}})(e.id),children:"Aprovar"}),(0,Da.jsx)(Qb,{color:"error",onClick:()=>(async e=>{try{await xc.recusarConsulta(e),He.success("Consulta recusada"),x()}catch(t){He.error("Erro ao recusar consulta")}})(e.id),children:"Recusar"})]}),"Confirmada"===(null===(o=e.status)||void 0===o?void 0:o.nome)&&(0,Da.jsx)(Qb,{color:"success",onClick:()=>{a(e),s(!0)},children:"Finalizar"}),"Conclu\xedda"===(null===(i=e.status)||void 0===i?void 0:i.nome)&&!e.tem_fatura&&(0,Da.jsx)(Qb,{color:"warning",variant:"contained",onClick:()=>(e=>{a(e),y({valor_total:"50.00",observacoes:`Consulta realizada em ${new Date(e.data_hora).toLocaleDateString("pt-PT")}`}),v(!0)})(e),children:"Criar Fatura"}),"Conclu\xedda"===(null===(l=e.status)||void 0===l?void 0:l.nome)&&e.tem_fatura&&(0,Da.jsx)(Qb,{color:"success",variant:"outlined",onClick:()=>(async e=>{try{const t=await Ia.get(`http://localhost:8000/api/consulta/${e.id}/fatura`);if(t.data&&t.data.id){const e=Gc.getPDFUrl(t.data.id);window.open(e,"_blank")}else He.error("N\xe3o foi poss\xedvel localizar a fatura desta consulta")}catch(t){console.error("Erro ao buscar fatura:",t),He.error("Erro ao buscar informa\xe7\xf5es da fatura")}})(e),children:"Ver Fatura"}),"Conclu\xedda"!==(null===(c=e.status)||void 0===c?void 0:c.nome)&&"Cancelada"!==(null===(u=e.status)||void 0===u?void 0:u.nome)&&(0,Da.jsx)(Qb,{color:"info",sx:{ml:1},onClick:()=>{var t;a(e),h((null===(t=e.status)||void 0===t?void 0:t.nome)||""),f(!0)},children:"Editar Status"})]})]},e.id)}))})]})}),(0,Da.jsxs)(Zy,{open:i,onClose:()=>s(!1),children:[(0,Da.jsx)(rx,{children:"Finalizar Consulta"}),(0,Da.jsx)(ix,{children:(0,Da.jsx)(_S,{fullWidth:!0,multiline:!0,rows:4,label:"Observa\xe7\xf5es",value:l,onChange:e=>c(e.target.value),margin:"normal"})}),(0,Da.jsxs)(MS,{children:[(0,Da.jsx)(Qb,{onClick:()=>s(!1),children:"Cancelar"}),(0,Da.jsx)(Qb,{onClick:async()=>{try{await xc.finalizarConsulta(o.id,l),He.success("Consulta finalizada com sucesso!"),s(!1),x()}catch(e){He.error("Erro ao finalizar consulta")}},color:"primary",children:"Confirmar"})]})]}),(0,Da.jsxs)(Zy,{open:p,onClose:()=>f(!1),children:[(0,Da.jsx)(rx,{children:"Alterar Status da Consulta"}),(0,Da.jsx)(ix,{children:(0,Da.jsxs)(wg,{component:"form",sx:{mt:2},children:[(0,Da.jsx)(av,{variant:"subtitle1",gutterBottom:!0,children:"Selecione o novo status:"}),(0,Da.jsx)(wg,{sx:{display:"flex",flexDirection:"column",gap:1,mt:1},children:["Pendente","Confirmada","Conclu\xedda","Cancelada"].map((e=>(0,Da.jsx)(Qb,{variant:m===e?"contained":"outlined",onClick:()=>h(e),color:"Pendente"===e?"warning":"Confirmada"===e?"primary":"Conclu\xedda"===e?"success":"error",children:e},e)))})]})}),(0,Da.jsxs)(MS,{children:[(0,Da.jsx)(Qb,{onClick:()=>f(!1),children:"Cancelar"}),(0,Da.jsx)(Qb,{onClick:async()=>{try{const e={Pendente:1,Confirmada:2,"Conclu\xedda":3,Cancelada:4};await xc.updateConsulta(o.id,{status_id:e[m]}),He.success(`Status da consulta alterado para ${m}`),f(!1),x()}catch(e){console.error("Erro ao atualizar status:",e),He.error("Erro ao atualizar status da consulta")}},color:"primary",variant:"contained",children:"Salvar Altera\xe7\xe3o"})]})]}),(0,Da.jsxs)(Zy,{open:g,onClose:()=>v(!1),children:[(0,Da.jsx)(rx,{children:"Criar Fatura para Consulta"}),(0,Da.jsx)(ix,{children:(0,Da.jsxs)(wg,{sx:{pt:2},children:[(0,Da.jsxs)(av,{variant:"subtitle2",gutterBottom:!0,children:["Consulta de: ",null===o||void 0===o||null===(e=o.utilizador)||void 0===e?void 0:e.nome]}),(0,Da.jsxs)(av,{variant:"subtitle2",gutterBottom:!0,children:["Data: ",o?new Date(o.data_hora).toLocaleString("pt-PT"):""]}),(0,Da.jsx)(_S,{fullWidth:!0,type:"number",label:"Valor Total (\u20ac)",value:b.valor_total,onChange:e=>y({...b,valor_total:e.target.value}),margin:"normal",inputProps:{step:"0.01",min:"0"},required:!0}),(0,Da.jsx)(_S,{fullWidth:!0,multiline:!0,rows:3,label:"Observa\xe7\xf5es",value:b.observacoes,onChange:e=>y({...b,observacoes:e.target.value}),margin:"normal"})]})}),(0,Da.jsxs)(MS,{children:[(0,Da.jsx)(Qb,{onClick:()=>v(!1),children:"Cancelar"}),(0,Da.jsx)(Qb,{onClick:async()=>{try{if(!b.valor_total||parseFloat(b.valor_total)<=0)return void He.error("O valor da fatura deve ser maior que zero");await Gc.criarFatura(o.id,{valor_total:parseFloat(b.valor_total),observacoes:b.observacoes,status_id:1}),He.success("Fatura criada com sucesso!"),v(!1),x()}catch(e){console.error("Erro ao criar fatura:",e),He.error("Erro ao criar fatura")}},color:"warning",variant:"contained",children:"Emitir Fatura"})]})]})]})},$S=Kn.div`
  margin: 1rem 0;
`,FS=Kn.div`
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`,DS=Kn.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 1rem;
    color: #34495e;
    font-weight: 600;
    background-color: #f8f9fa;
  }
  
  td {
    padding: 1rem;
    border-top: 1px solid #ecf0f1;
  }
  
  tr:hover {
    background-color: #f8f9fa;
  }
`,LS=Kn.span`
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  
  &.emitida {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.paga {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
  }
`,BS=Kn.div`
  display: flex;
  gap: 0.5rem;
`,US=Kn.button`
  background-color: ${e=>e.secondary?"#f39c12":e.danger?"#e74c3c":"#3498db"};
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${e=>e.secondary?"#d35400":e.danger?"#c0392b":"#2980b9"};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,WS=Kn.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
`,HS=Kn.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,VS=Kn.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`,qS=Kn.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 0.5rem;
`,KS=Kn.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;const GS=function(e){let{faturas:t,recarregarDados:n}=e;const[o,a]=(0,r.useState)(!1),[i,s]=(0,r.useState)(null),[l,c]=(0,r.useState)({valor_total:"",observacoes:""}),u=async(e,t)=>{try{await Gc.atualizarStatusFatura(e,t),el.success("Status da fatura atualizado com sucesso"),n&&n()}catch(r){console.error("Erro ao atualizar status:",r),el.error("Erro ao atualizar status da fatura")}},d=e=>{var t;if(!e)return"";switch(console.log("Status da fatura:",e),null===(t=e.nome)||void 0===t?void 0:t.toLowerCase()){case"emitida":return"emitida";case"paga":return"paga";case"cancelada":return"cancelada";default:return""}};return(0,Da.jsxs)($S,{children:[t.length>0?(0,Da.jsx)(FS,{children:(0,Da.jsxs)(DS,{children:[(0,Da.jsx)("thead",{children:(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("th",{children:"ID"}),(0,Da.jsx)("th",{children:"Data"}),(0,Da.jsx)("th",{children:"Paciente"}),(0,Da.jsx)("th",{children:"Valor"}),(0,Da.jsx)("th",{children:"Status"}),(0,Da.jsx)("th",{children:"A\xe7\xf5es"})]})}),(0,Da.jsx)("tbody",{children:t.map((e=>{var t,n,r,o,i,l,p,f;return(0,Da.jsxs)("tr",{children:[(0,Da.jsxs)("td",{children:["#",e.id]}),(0,Da.jsx)("td",{children:(f=e.createdAt,new Date(f).toLocaleDateString("pt-PT"))}),(0,Da.jsx)("td",{children:(null===(t=e.consulta)||void 0===t||null===(n=t.utilizador)||void 0===n?void 0:n.nome)||"Paciente"}),(0,Da.jsx)("td",{children:(p=e.valor_total,`${parseFloat(p).toFixed(2)} \u20ac`)}),(0,Da.jsx)("td",{children:(0,Da.jsx)(LS,{className:d(e.status),children:(null===(r=e.status)||void 0===r?void 0:r.nome)||"Desconhecido"})}),(0,Da.jsx)("td",{children:(0,Da.jsxs)(BS,{children:[e.status&&["emitida","Emitida","EMITIDA"].includes(e.status.nome)&&(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(US,{onClick:()=>u(e.id,2),secondary:!0,children:"Marcar Paga"}),(0,Da.jsx)(US,{onClick:()=>(e=>{console.log("Abrindo modal de edi\xe7\xe3o para fatura:",e),s(e),c({valor_total:e.valor_total.toString(),observacoes:e.observacoes||""}),a(!0)})(e),style:{backgroundColor:"#3498db",marginLeft:"0.5rem"},children:"Editar"}),(0,Da.jsx)(US,{onClick:()=>u(e.id,3),danger:!0,style:{marginLeft:"0.5rem"},children:"Cancelar"})]}),!["emitida","Emitida","EMITIDA"].includes(null===(o=e.status)||void 0===o?void 0:o.nome)&&(0,Da.jsxs)("span",{style:{color:"#666",fontSize:"0.8rem"},children:["Status: ",null===(i=e.status)||void 0===i?void 0:i.nome," (ID: ",null===(l=e.status)||void 0===l?void 0:l.id,")"]})]})})]},e.id)}))})]})}):(0,Da.jsx)(WS,{children:"Nenhuma fatura encontrada."}),o&&(0,Da.jsx)(HS,{children:(0,Da.jsxs)(VS,{children:[(0,Da.jsx)(qS,{children:"Editar Fatura"}),(0,Da.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!l.valor_total||parseFloat(l.valor_total)<=0)el.error("O valor da fatura deve ser maior que zero");else try{await Gc.editarFatura(i.id,{valor_total:parseFloat(l.valor_total),observacoes:l.observacoes}),el.success("Fatura atualizada com sucesso"),a(!1),n&&n()}catch(t){console.error("Erro ao atualizar fatura:",t),el.error("Erro ao atualizar fatura")}},children:[(0,Da.jsxs)(KS,{children:[(0,Da.jsx)("label",{children:"Valor (\u20ac) *"}),(0,Da.jsx)("input",{type:"number",step:"0.01",value:l.valor_total,onChange:e=>c({...l,valor_total:e.target.value}),required:!0})]}),(0,Da.jsxs)(KS,{children:[(0,Da.jsx)("label",{children:"Observa\xe7\xf5es"}),(0,Da.jsx)("textarea",{rows:"3",value:l.observacoes,onChange:e=>c({...l,observacoes:e.target.value})})]}),(0,Da.jsxs)(BS,{style:{justifyContent:"flex-end",marginTop:"1.5rem"},children:[(0,Da.jsx)(US,{type:"button",onClick:()=>a(!1),style:{backgroundColor:"#7f8c8d"},children:"Cancelar"}),(0,Da.jsx)(US,{type:"submit",children:"Atualizar Fatura"})]})]})]})})]})},QS=Kn.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`,YS=Kn.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`,XS=Kn.div`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,JS=Kn.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ecf0f1;
`,ZS=Kn.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: ${e=>e.active?"#3498db":"#7f8c8d"};
  border: none;
  border-bottom: ${e=>e.active?"2px solid #3498db":"none"};
  font-weight: ${e=>e.active?"600":"400"};
  cursor: pointer;
`,ek=Kn.div`
  width: 100%;
  overflow-x: auto;
`,tk=Kn.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 1rem;
    color: #34495e;
    font-weight: 600;
    background-color: #f8f9fa;
  }
  
  td {
    padding: 1rem;
    border-top: 1px solid #ecf0f1;
  }
  
  tr:hover {
    background-color: #f8f9fa;
  }
`,nk=(Kn.span`
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  
  &.emitida {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.paga {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
  }
`,Kn.div`
  display: flex;
  gap: 0.5rem;
`),rk=Kn.button`
  background-color: ${e=>e.secondary?"#f39c12":e.danger?"#e74c3c":"#3498db"};
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${e=>e.secondary?"#d35400":e.danger?"#c0392b":"#2980b9"};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ok=Kn.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
`,ak=Kn.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,ik=Kn.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`,sk=Kn.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 0.5rem;
`,lk=Kn.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;const ck=function(){var e;const[t,n]=(0,r.useState)([]),[o,a]=(0,r.useState)([]),[i,s]=(0,r.useState)(!0),[l,c]=(0,r.useState)("todas"),[u,d]=(0,r.useState)(!1),[p,f]=(0,r.useState)(null),[m,h]=(0,r.useState)({valor_total:"",observacoes:""});(0,r.useEffect)((()=>{g()}),[]);const g=async()=>{s(!0);try{const[e,t]=await Promise.all([Gc.getFaturasByMedico(),xc.getConsultasConcluidas()]);console.log("Faturas carregadas da API:",e),n(e||[]);const r=t.filter((e=>{var t;return!e.tem_fatura&&"Conclu\xedda"===(null===(t=e.status)||void 0===t?void 0:t.nome)}));a(r||[])}catch(e){console.error("Erro ao carregar dados:",e),el.error("N\xe3o foi poss\xedvel carregar os dados")}finally{s(!1)}},v=e=>new Date(e).toLocaleDateString("pt-PT");return(0,Da.jsxs)(QS,{children:[(0,Da.jsxs)(YS,{children:[(0,Da.jsxs)(XS,{children:["Gest\xe3o de Faturas",(0,Da.jsxs)(rk,{onClick:g,children:[(0,Da.jsx)("i",{className:"fas fa-sync"})," Atualizar"]})]}),(0,Da.jsxs)(JS,{children:[(0,Da.jsx)(ZS,{active:"todas"===l,onClick:()=>c("todas"),children:"Todas"}),(0,Da.jsx)(ZS,{active:"emitida"===l,onClick:()=>c("emitida"),children:"Pendentes"}),(0,Da.jsx)(ZS,{active:"paga"===l,onClick:()=>c("paga"),children:"Pagas"}),(0,Da.jsx)(ZS,{active:"cancelada"===l,onClick:()=>c("cancelada"),children:"Canceladas"})]}),i?(0,Da.jsx)(ok,{children:"Carregando faturas..."}):(0,Da.jsx)(GS,{faturas:"todas"===l?t:t.filter((e=>{var t;return(null===(t=e.status)||void 0===t?void 0:t.nome.toLowerCase())===l})),recarregarDados:g}),"todas"===l&&(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(XS,{style:{marginTop:"2rem"},children:"Consultas Conclu\xeddas sem Fatura"}),o.length>0?(0,Da.jsx)(ek,{children:(0,Da.jsxs)(tk,{children:[(0,Da.jsx)("thead",{children:(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("th",{children:"ID"}),(0,Da.jsx)("th",{children:"Data"}),(0,Da.jsx)("th",{children:"Paciente"}),(0,Da.jsx)("th",{children:"Observa\xe7\xf5es"}),(0,Da.jsx)("th",{children:"A\xe7\xf5es"})]})}),(0,Da.jsx)("tbody",{children:o.map((e=>{var t;return(0,Da.jsxs)("tr",{children:[(0,Da.jsxs)("td",{children:["#",e.id]}),(0,Da.jsx)("td",{children:v(e.data_hora)}),(0,Da.jsx)("td",{children:(null===(t=e.utilizador)||void 0===t?void 0:t.nome)||"Paciente"}),(0,Da.jsx)("td",{children:e.observacoes||"-"}),(0,Da.jsx)("td",{children:(0,Da.jsx)(rk,{onClick:()=>(e=>{f(e),h({valor_total:"50.00",observacoes:`Consulta realizada em ${v(e.data_hora)}`}),d(!0)})(e),children:"Criar Fatura"})})]},e.id)}))})]})}):(0,Da.jsx)(ok,{children:"N\xe3o h\xe1 consultas conclu\xeddas sem fatura."})]})]}),u&&(0,Da.jsx)(ak,{children:(0,Da.jsxs)(ik,{children:[(0,Da.jsx)(sk,{children:"Criar Fatura"}),(0,Da.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!m.valor_total||parseFloat(m.valor_total)<=0)el.error("O valor da fatura deve ser maior que zero");else try{await Gc.criarFatura(p.id,{valor_total:parseFloat(m.valor_total),observacoes:m.observacoes,status_id:1}),el.success("Fatura criada com sucesso"),d(!1),g()}catch(t){console.error("Erro ao criar fatura:",t),el.error("Erro ao criar fatura")}},children:[(0,Da.jsxs)(lk,{children:[(0,Da.jsx)("label",{children:"Consulta"}),(0,Da.jsx)("input",{type:"text",value:`Consulta #${p.id} - ${v(p.data_hora)}`,disabled:!0})]}),(0,Da.jsxs)(lk,{children:[(0,Da.jsx)("label",{children:"Paciente"}),(0,Da.jsx)("input",{type:"text",value:(null===(e=p.utilizador)||void 0===e?void 0:e.nome)||"Paciente",disabled:!0})]}),(0,Da.jsxs)(lk,{children:[(0,Da.jsx)("label",{children:"Valor (\u20ac) *"}),(0,Da.jsx)("input",{type:"number",step:"0.01",value:m.valor_total,onChange:e=>h({...m,valor_total:e.target.value}),required:!0})]}),(0,Da.jsxs)(lk,{children:[(0,Da.jsx)("label",{children:"Observa\xe7\xf5es"}),(0,Da.jsx)("textarea",{rows:"3",value:m.observacoes,onChange:e=>h({...m,observacoes:e.target.value})})]}),(0,Da.jsxs)(nk,{style:{justifyContent:"flex-end",marginTop:"1.5rem"},children:[(0,Da.jsx)(rk,{type:"button",onClick:()=>d(!1),style:{backgroundColor:"#7f8c8d"},children:"Cancelar"}),(0,Da.jsx)(rk,{type:"submit",children:"Emitir Fatura"})]})]})]})})]})};const uk=function(){const[e,t]=(0,r.useState)([]),[n,o]=(0,r.useState)(!0);(0,r.useEffect)((()=>{a()}),[]);const a=async()=>{try{o(!0),console.log("Carregando hist\xf3rico de consultas conclu\xeddas...");const e=await qd.getConsultasConcluidas();console.log("Consultas conclu\xeddas carregadas:",e),t(e||[]),o(!1)}catch(e){console.error("Erro ao carregar hist\xf3rico de consultas:",e),He.error("Erro ao carregar hist\xf3rico de consultas"),t([]),o(!1)}};return(0,Da.jsxs)(wg,{children:[(0,Da.jsx)(av,{variant:"h6",gutterBottom:!0,children:"Hist\xf3rico de Consultas Conclu\xeddas"}),(0,Da.jsx)("button",{onClick:()=>a(),style:{padding:"0.5rem 1rem",margin:"1rem 0"},children:"Atualizar Hist\xf3rico"}),n?(0,Da.jsx)("p",{children:"Carregando hist\xf3rico..."}):0===e.length?(0,Da.jsxs)("div",{style:{textAlign:"center",padding:"2rem"},children:[(0,Da.jsx)("p",{children:"Nenhuma consulta conclu\xedda encontrada."}),(0,Da.jsx)("small",{children:"Quando voc\xea finalizar consultas, elas aparecer\xe3o aqui."})]}):(0,Da.jsx)(lv,{component:pv,children:(0,Da.jsxs)(bv,{children:[(0,Da.jsx)(jv,{children:(0,Da.jsxs)(Nv,{children:[(0,Da.jsx)(Mv,{children:"Data/Hora"}),(0,Da.jsx)(Mv,{children:"Paciente"}),(0,Da.jsx)(Mv,{children:"Observa\xe7\xf5es"}),(0,Da.jsx)(Mv,{children:"Fatura"})]})}),(0,Da.jsx)(Lv,{children:e.map((e=>{var t;return(0,Da.jsxs)(Nv,{children:[(0,Da.jsx)(Mv,{children:new Date(e.data_hora).toLocaleString("pt-PT")}),(0,Da.jsx)(Mv,{children:(null===(t=e.utilizador)||void 0===t?void 0:t.nome)||"Paciente n\xe3o identificado"}),(0,Da.jsx)(Mv,{style:{maxWidth:"300px",whiteSpace:"normal",wordWrap:"break-word"},children:e.observacoes||"Sem observa\xe7\xf5es"}),(0,Da.jsx)(Mv,{children:e.tem_fatura?(0,Da.jsx)(Qb,{color:"success",variant:"outlined",onClick:()=>(async e=>{try{const t=await Ia.get(`http://localhost:8000/api/consulta/${e.id}/fatura`);if(t.data&&t.data.id){const e=Gc.getPDFUrl(t.data.id);window.open(e,"_blank")}else He.error("N\xe3o foi poss\xedvel localizar a fatura desta consulta")}catch(t){console.error("Erro ao buscar fatura:",t),He.error("Erro ao buscar informa\xe7\xf5es da fatura")}})(e),children:"Ver Fatura"}):(0,Da.jsx)(Qb,{color:"warning",variant:"contained",onClick:()=>{window.location.href="/medico-dashboard/faturas"},children:"Criar Fatura"})})]},e.id)}))})]})})]})},dk=Kn.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f6fa;
  padding-top: 64px;
`,pk=Kn.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  position: fixed;
  left: 0;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  z-index: 98;
`,fk=Kn.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  min-height: calc(100vh - 64px);
  background-color: #f5f6fa;

  h2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
  }
`,mk=Kn.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
`,hk=Kn.div`
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
`,gk=Kn.div`
  flex: 1;

  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .info-item {
    margin: 0.5rem 0;
    color: #7f8c8d;
  }
`,vk=Kn.nav`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;

  a {
    color: #3498db;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`,bk=(Kn.div`
  background-color: #3498db;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Kn.div`
  padding: 1rem 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: #3498db;
  }

  i {
    width: 20px;
    text-align: center;
  }
`);const yk=function(){const[e,t]=(0,r.useState)(null),[n,o]=(0,r.useState)("perfil"),[a,i]=(0,r.useState)(!0);return(0,r.useEffect)((()=>{const e=Fa.getCurrentUser();e&&"medico"===e.tipo?(t(e),i(!1)):window.location.href="/login"}),[]),a?(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsx)("div",{style:{marginTop:"64px",padding:"2rem"},children:"Carregando..."})]}):(0,Da.jsxs)(Da.Fragment,{children:[(0,Da.jsx)(Ga,{}),(0,Da.jsxs)(dk,{children:[(0,Da.jsxs)(pk,{children:[(0,Da.jsxs)(bk,{className:"perfil"===n?"active":"",onClick:()=>o("perfil"),children:[(0,Da.jsx)("i",{className:"fas fa-user"}),"Meu Perfil"]}),(0,Da.jsxs)(bk,{className:"consultas"===n?"active":"",onClick:()=>o("consultas"),children:[(0,Da.jsx)("i",{className:"fas fa-calendar-check"}),"Consultas"]}),(0,Da.jsxs)(bk,{className:"historico"===n?"active":"",onClick:()=>o("historico"),children:[(0,Da.jsx)("i",{className:"fas fa-history"}),"Hist\xf3rico de Consultas"]}),(0,Da.jsxs)(bk,{className:"faturas"===n?"active":"",onClick:()=>o("faturas"),children:[(0,Da.jsx)("i",{className:"fas fa-file-invoice-dollar"}),"Gest\xe3o de Faturas"]}),(0,Da.jsxs)(bk,{onClick:()=>{Fa.logout(),window.location.href="/login"},children:[(0,Da.jsx)("i",{className:"fas fa-sign-out-alt"}),"Sair"]})]}),(0,Da.jsxs)(fk,{children:[(0,Da.jsxs)(vk,{children:[(0,Da.jsx)(fr,{to:"/",children:"In\xedcio"})," / \xc1rea do M\xe9dico / ","perfil"===n?"Meu Perfil":"consultas"===n?"Consultas":"historico"===n?"Hist\xf3rico de Consultas":"faturas"===n?"Gest\xe3o de Faturas":""]}),(0,Da.jsx)("h2",{children:"perfil"===n?"Meu Perfil":"consultas"===n?"Consultas":"historico"===n?"Hist\xf3rico de Consultas":"faturas"===n?"Gest\xe3o de Faturas":""}),(0,Da.jsxs)(mk,{children:[(0,Da.jsx)(hk,{children:(s=null===e||void 0===e?void 0:e.nome,(null===s||void 0===s?void 0:s.split(" ").map((e=>e[0])).join("").toUpperCase().slice(0,2))||"MD")}),(0,Da.jsxs)(gk,{children:[(0,Da.jsxs)("h2",{children:["Bem-vindo, Dr(a). ",null===e||void 0===e?void 0:e.nome]}),(0,Da.jsxs)("div",{className:"info-item",children:["Email: ",null===e||void 0===e?void 0:e.email]}),(0,Da.jsxs)("div",{className:"info-item",children:["CRM: ",(null===e||void 0===e?void 0:e.crm)||"N\xe3o informado"]}),(0,Da.jsxs)("div",{className:"info-item",children:["Especialidade: ",(null===e||void 0===e?void 0:e.especialidade)||"N\xe3o informada"]})]})]}),(()=>{switch(n){case"perfil":default:return(0,Da.jsx)(tp,{});case"consultas":return(0,Da.jsx)(IS,{});case"historico":return(0,Da.jsx)(uk,{});case"faturas":return(0,Da.jsx)(ck,{})}})()]})]})]});var s},xk=Kn.div`
  padding: 1.5rem;
`,wk=Kn.h2`
  margin-bottom: 1.5rem;
  color: #2c3e50;
`,Sk=Kn.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  tr:hover {
    background-color: #f1f2f3;
  }
`,kk=Kn.button`
  background-color: ${e=>e.accept?"#2ecc71":"#e74c3c"};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${e=>e.accept?"#27ae60":"#c0392b"};
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`,jk=Kn.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;const Ck=function(){const[e,t]=(0,r.useState)([]),[n,o]=(0,r.useState)(!0);Fa.getCurrentUser(),(0,r.useEffect)((()=>{a()}),[]);const a=async()=>{try{o(!0);const e=await xc.getConsultasPendentes();t(e.data),o(!1)}catch(e){console.error("Erro ao carregar consultas pendentes:",e),el.error("Erro ao carregar consultas pendentes"),o(!1)}},i=e=>new Date(e).toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"});return(0,Da.jsxs)(xk,{children:[(0,Da.jsx)(wk,{children:"Consultas Pendentes"}),n?(0,Da.jsx)(jk,{children:"Carregando consultas pendentes..."}):e.length>0?(0,Da.jsxs)(Sk,{children:[(0,Da.jsx)("thead",{children:(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("th",{children:"Data"}),(0,Da.jsx)("th",{children:"Hora"}),(0,Da.jsx)("th",{children:"Paciente"}),(0,Da.jsx)("th",{children:"Tratamento"}),(0,Da.jsx)("th",{children:"Observa\xe7\xf5es"}),(0,Da.jsx)("th",{children:"A\xe7\xf5es"})]})}),(0,Da.jsx)("tbody",{children:e.map((e=>{var t,n,r;return(0,Da.jsxs)("tr",{children:[(0,Da.jsx)("td",{children:(r=e.data_hora,new Date(r).toLocaleDateString("pt-PT"))}),(0,Da.jsx)("td",{children:i(e.data_hora)}),(0,Da.jsx)("td",{children:(null===(t=e.cliente)||void 0===t?void 0:t.nome)||"Paciente"}),(0,Da.jsx)("td",{children:(null===(n=e.tratamento)||void 0===n?void 0:n.nome)||"N\xe3o especificado"}),(0,Da.jsx)("td",{children:e.observacoes||"Sem observa\xe7\xf5es"}),(0,Da.jsxs)("td",{children:[(0,Da.jsx)(kk,{accept:!0,onClick:()=>(async e=>{try{await xc.aceitarConsulta(e),el.success("Consulta aceita com sucesso!"),a()}catch(t){console.error("Erro ao aceitar consulta:",t),el.error("Erro ao aceitar consulta")}})(e.id),children:"Aceitar"}),(0,Da.jsx)(kk,{onClick:()=>(async e=>{try{await xc.recusarConsulta(e),el.success("Consulta recusada"),a()}catch(t){console.error("Erro ao recusar consulta:",t),el.error("Erro ao recusar consulta")}})(e.id),children:"Recusar"})]})]},e.id)}))})]}):(0,Da.jsx)(jk,{children:"N\xe3o h\xe1 consultas pendentes no momento."})]})};const Ek=function(){const[e,t]=(0,r.useState)(void 0);(0,r.useEffect)((()=>{const e=Fa.getCurrentUser();e&&t(e)}),[]);const n=e=>{let{children:t,adminRequired:n=!1,clienteRequired:r=!1,medicoRequired:o=!1}=e;const a=Fa.getCurrentUser();if(!a)return(0,Da.jsx)(he,{to:"/login"});if(n&&"admin"!==a.role&&"admin"!==a.tipo)return(0,Da.jsx)(he,{to:"/"});if(r){const e=(e=>!!e&&"cliente"===e.tipo)(a);if(!e)return(0,Da.jsx)(he,{to:"/"})}return o&&!(e=>!!e&&"medico"===e.tipo)(a)?(0,Da.jsx)(he,{to:"/"}):t};return(0,Da.jsxs)("div",{className:"App",children:[(0,Da.jsx)(gt,{position:"top-center"}),(0,Da.jsxs)(ye,{children:[(0,Da.jsx)(ve,{path:"/",element:(0,Da.jsx)(Xi,{})}),(0,Da.jsx)(ve,{path:"/sobre",element:(0,Da.jsx)(ms,{})}),(0,Da.jsx)(ve,{path:"/contactos",element:(0,Da.jsx)(js,{})}),(0,Da.jsx)(ve,{path:"/clientes",element:(0,Da.jsx)(hl,{})}),(0,Da.jsx)(ve,{path:"/login",element:(0,Da.jsx)(Tl,{})}),(0,Da.jsx)(ve,{path:"/register",element:(0,Da.jsx)(Wl,{})}),(0,Da.jsx)(ve,{path:"/servicos/:title",element:(0,Da.jsx)(Hd,{})}),(0,Da.jsxs)(ve,{path:"/dashboard",element:(0,Da.jsx)(n,{adminRequired:!0,children:(0,Da.jsx)(lc,{})}),children:[(0,Da.jsx)(ve,{index:!0,element:(0,Da.jsx)(Ad,{})}),(0,Da.jsx)(ve,{path:"clientes",element:(0,Da.jsx)(Qu,{})}),(0,Da.jsx)(ve,{path:"faturas",element:(0,Da.jsx)(id,{})}),(0,Da.jsx)(ve,{path:"agendamentos",element:(0,Da.jsx)(Cd,{})}),(0,Da.jsx)(ve,{path:"estatisticas",element:(0,Da.jsx)(Ad,{})})]}),(0,Da.jsx)(ve,{path:"/cliente-dashboard/*",element:(0,Da.jsx)(n,{clienteRequired:!0,children:(0,Da.jsx)(_u,{})})}),(0,Da.jsx)(ve,{path:"/medico/*",element:(0,Da.jsx)(n,{medicoRequired:!0,children:(0,Da.jsx)(yk,{})})}),(0,Da.jsx)(ve,{path:"/medico/consultas-pendentes",element:(0,Da.jsx)(Ck,{})}),(0,Da.jsx)(ve,{path:"*",element:(0,Da.jsx)(he,{to:"/"})})]})]})},Tk=e=>{e&&e instanceof Function&&n.e(453).then(n.bind(n,453)).then((t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:a,getTTFB:i}=t;n(e),r(e),o(e),a(e),i(e)}))};a.createRoot(document.getElementById("root")).render((0,Da.jsx)(r.StrictMode,{children:(0,Da.jsx)(ur,{children:(0,Da.jsx)(Ek,{})})})),Tk()})()})();
//# sourceMappingURL=main.dc701e83.js.map