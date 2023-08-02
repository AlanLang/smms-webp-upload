/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={745:(e,r,t)=>{var n=t(533);r.s=n.createRoot,n.hydrateRoot},251:(e,r,t)=>{var n=t(363),a=Symbol.for("react.element"),o=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function s(e,r,t){var n,s={},c=null,u=null;for(n in void 0!==t&&(c=""+t),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(u=r.ref),r)o.call(r,n)&&!i.hasOwnProperty(n)&&(s[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===s[n]&&(s[n]=r[n]);return{$$typeof:a,type:e,key:c,ref:u,props:s,_owner:l.current}}r.jsx=s,r.jsxs=s},893:(e,r,t)=>{e.exports=t(251)},363:e=>{e.exports=React},533:e=>{e.exports=ReactDOM}},r={};function t(n){var a=r[n];if(void 0!==a)return a.exports;var o=r[n]={exports:{}};return e[n](o,o.exports,t),o.exports}(()=>{var e=t(893),r=t(745),n=t(363),a=function(r){return(0,e.jsxs)("label",{id:"upload-container",className:"flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300 h-full",children:[(0,e.jsxs)("div",{className:"space-y-1 text-center",children:[(0,e.jsx)("div",{className:"mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100",children:(0,e.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"h-6 w-6 text-gray-500",children:(0,e.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"})})}),(0,e.jsxs)("div",{className:"text-gray-600",children:[(0,e.jsx)("span",{className:"font-medium text-primary-500 hover:text-primary-700 pr-1",children:"Click to upload"}),"or drag and drop"]})]}),(0,e.jsx)("input",{id:"file-uploader",type:"file",multiple:!0,className:"sr-only",accept:"image/*",onChange:function(e){r.onUpload(e.target.files)}})]})};function o(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function l(r){return(0,e.jsx)("ul",{className:"mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3",children:Array.from(r.files).map((function(r){return(0,e.jsx)(i,{file:r},r.name)}))})}function i(r){var t,a,l=(t=(0,n.useState)(null),a=2,function(e){if(Array.isArray(e))return e}(t)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],l=!0,i=!1;try{for(t=t.call(e);!(l=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);l=!0);}catch(e){i=!0,a=e}finally{try{l||null==t.return||t.return()}finally{if(i)throw a}}return o}}(t,a)||function(e,r){if(e){if("string"==typeof e)return o(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(e,r):void 0}}(t,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=l[0],u=l[1],d=r.file;return(0,n.useEffect)((function(){console.log("update url"),function(e){var r=new FormData,t=localStorage.getItem("token");return r.append("smfile",e),fetch("/api/upload",{headers:{Authorization:t},method:"POST",body:r}).then((function(e){return e.json()}))}(d).then((function(e){u(e)})).catch((function(){u(null)}))}),[d]),(0,e.jsxs)("li",{children:[(0,e.jsx)("img",{className:"aspect-[3/2] w-full rounded-2xl object-cover",src:URL.createObjectURL(d),alt:""}),(0,e.jsx)("h3",{className:"mt-1 leading-8 text-slate-500",children:d.name}),null===i?(0,e.jsx)(s,{}):(0,e.jsx)(c,{result:i})]},d.name)}function s(){return(0,e.jsx)("div",{className:"animate-pulse flex space-x-4",children:(0,e.jsx)("div",{className:"flex-1 space-y-6 py-1",children:(0,e.jsx)("div",{className:"h-6 bg-slate-200 rounded"})})})}function c(r){var t=r.result;if("error"in t)return(0,e.jsx)("div",{className:"text-red-600",children:t.error});var n="images"in t?t.images:t.data.url;return(0,e.jsx)("div",{className:"mt-2 flex rounded-md shadow-sm",children:(0,e.jsx)("div",{className:"relative flex flex-grow items-stretch focus-within:z-10",children:(0,e.jsx)("input",{disabled:!0,className:"block w-full rounded-none rounded-l-md px-1 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",value:n})})})}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function d(){var r,t,o=(r=(0,n.useState)(),t=2,function(e){if(Array.isArray(e))return e}(r)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],l=!0,i=!1;try{for(t=t.call(e);!(l=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);l=!0);}catch(e){i=!0,a=e}finally{try{l||null==t.return||t.return()}finally{if(i)throw a}}return o}}(r,t)||function(e,r){if(e){if("string"==typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],s=o[1];return(0,e.jsx)("div",{className:"flex items-center justify-center flex-col h-full",children:(0,e.jsxs)("div",{className:"mx-auto w-[90%] h-[90%] grid  gap-3 grid-rows-[40vh_50vh]",children:[(0,e.jsx)(a,{onUpload:function(e){s(e)}}),i&&(0,e.jsx)(l,{files:i})]})})}localStorage.getItem("token")?(0,r.s)(document.getElementById("app")).render((0,e.jsx)(d,{})):window.location.href="/config.html"})()})();