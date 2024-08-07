(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{10:function(e,t,a){},14:function(e,t,a){e.exports=a(27)},22:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(12),c=a.n(o),l=(a(22),a(9)),s=a(3),i=(a(10),a(28));const m=Object(n.createContext)({token:null,setToken:()=>{}});var u=e=>{let{temperature:t,maxTokens:a}=e;const[o,c]=Object(n.useState)([]),[l,s]=Object(n.useState)(""),[u,g]=Object(n.useState)(""),p=Object(n.useRef)(null),[d,E]=Object(n.useState)(null),{token:f}=Object(n.useContext)(m);Object(n.useEffect)(()=>{const e=localStorage.getItem("user");e&&E(JSON.parse(e))},[]),Object(n.useEffect)(()=>{d&&c([{role:"assistant",content:"Hello, I am GPT-4. AMA."}])},[d]),Object(n.useEffect)(()=>{p.current&&p.current.scrollIntoView({behavior:"smooth"})},[o]);return r.a.createElement("div",{className:"chat-container"},r.a.createElement("h1",null,"Conversation Tool"),r.a.createElement("hr",null),r.a.createElement("div",{className:"p-4 mb-4 border rounded"},r.a.createElement("h2",{className:"text-lg font-semibold mb-2"},"System Message"),r.a.createElement("textarea",{className:"w-full p-2 border rounded",value:u,onChange:e=>g(e.target.value),placeholder:"Enter system message here...",rows:"3"})),r.a.createElement("div",{className:"message-container"},o.map((e,t)=>{return r.a.createElement("div",{key:t,className:"message-row ".concat(e.role,"-row")},"assistant"===e.role&&r.a.createElement("div",{className:"profile-picture-container"},r.a.createElement("img",{src:"logo192.png",alt:"".concat(e.role," profile picture"),className:"profile-picture"})),r.a.createElement("div",{className:"message ".concat(e.role)},"string"===typeof(a=e.content)?r.a.createElement("p",null,a):a.map((e,t)=>{if("string"===typeof e&&e.startsWith("[Correction]"))return r.a.createElement("p",{key:t,className:"correction"},e.replace("[Correction]","").trim());if("string"===typeof e&&e.startsWith("[Response]"))try{let a=e.replace(/\\u([\dA-Fa-f]{4})/g,(e,t)=>String.fromCharCode(parseInt(t,16))).replace("[Response]","").trim().replace(/\(/g,"[").replace(/\)/g,"]").replace(/\\"/g,"").replace(/\\/g,"").replace(/,\s*\[/g,"--[").replace(/,/g,"--").replace(/----/g,",--").replace(/,--\s*--/g,",--,").replace(/--\]/g,",]").slice(1,-1),n=function(e){const t=[];let a=["",""];for(const[n,r]of e)".,!?".includes(n)?(a[0]+=n,a[1]+=r):(a[0]&&(t.push(a),a=["",""]),a=[n,r]);return a[0]&&t.push(a),t}(a.slice(2,-2).split("]--[").map(e=>e.split("--")));return console.log(a),console.log(n),r.a.createElement("p",{key:t,className:"text-container"},n.map((e,t)=>{let[a,n]=e;return r.a.createElement("span",{key:t,className:"hoverable-word"},a+" ",r.a.createElement("span",{className:"tooltiptext badge badge-light"},n))}))}catch(a){return console.error("Error parsing response:",a),r.a.createElement("p",{key:t},e)}else if("string"===typeof e&&e.startsWith("[Translation]"))return r.a.createElement("p",{key:t,className:"translation"},e.replace("[Translation]","").trim());return r.a.createElement("p",{key:t},e)})),"assistant"!==e.role&&r.a.createElement("div",{className:"profile-picture-container"},r.a.createElement("img",{src:"flame_img.jpeg",alt:"".concat(e.role," profile picture"),className:"profile-picture"})));var a}),r.a.createElement("div",{ref:p})),r.a.createElement("div",{className:"input-container"},r.a.createElement("input",{type:"text",value:l,onChange:e=>s(e.target.value),onKeyDown:e=>{"Enter"===e.key&&(async()=>{if(!l.trim())return;const e={role:"user",content:l};c(t=>[...t,e]),s("");try{const n=await i.a.post("https://asia-south1-ppt-tts.cloudfunctions.net/ai-backend/chat",{messages:[...o,e],systemMessage:u,temperature:parseFloat(t),maxTokens:parseInt(a)},{headers:{Authorization:"Bearer ".concat(f)}});console.log("Chat data:",f),console.log("Server response:",n.data),c(e=>[...e,n.data])}catch(n){console.error("Error sending message:",n)}})()},placeholder:"Type your message..."})))};var g=e=>{let{onLoginSuccess:t}=e;const[a,o]=Object(n.useState)(!1);return Object(n.useEffect)(()=>{(async()=>{await new Promise(e=>{if(document.querySelector("script#google-login"))return void e();const t=document.createElement("script");t.src="https://accounts.google.com/gsi/client",t.id="google-login",t.async=!0,t.defer=!0,t.onload=()=>e(),document.body.appendChild(t)}),o(!0)})()},[]),Object(n.useEffect)(()=>{if(a&&window.google){const e=async e=>{console.log("Encoded JWT ID token: "+JSON.stringify(e));try{const a=await i.a.post("https://asia-south1-ppt-tts.cloudfunctions.net/ai-backend/login",{},{headers:{Authorization:"Bearer ".concat(e.credential)}});console.log("Login success:",a.data),localStorage.setItem("token",e.credential),t(a.data)}catch(a){console.error("Login failed:",a)}};window.google.accounts.id.initialize({client_id:"1066118926351-dskshp8i64e3e4i5rr76h85rfbhh5cc0.apps.googleusercontent.com",callback:e}),window.google.accounts.id.renderButton(document.getElementById("googleSignInDiv"),{theme:"outline",size:"large"})}},[a,t]),r.a.createElement("div",{id:"googleSignInDiv"})};var p=e=>{let{onLoginSuccess:t}=e;const[a,o]=Object(n.useState)(!1),[c,l]=Object(n.useState)(!1);return Object(n.useEffect)(()=>{1===window.performance.navigation.type&&l(!0)},[]),Object(n.useEffect)(()=>{const e=()=>{window.gapi&&window.gapi.accounts.id?o(!0):setTimeout(e,100)};if(e(),!c){const e=setTimeout(()=>{a||window.location.reload()},1e3);return()=>clearTimeout(e)}},[a,c]),r.a.createElement("div",{className:"login-container"},r.a.createElement("div",{className:"image-container"},r.a.createElement("img",{src:"./flame_img.jpeg",alt:"Logo 1",className:"logo-image"}),r.a.createElement("div",{className:"vertical-line"}),r.a.createElement("img",{src:"./CAI_logo.jpg",alt:"Logo 2",className:"logo-image"})),r.a.createElement("h1",null,"Welcome to the AI Language Practice Application"),r.a.createElement("p",null,"Please log in to continue"),r.a.createElement("div",{className:"google-signin-button"},r.a.createElement("div",{style:{display:"inline-block"}},r.a.createElement(g,{onLoginSuccess:t}))))};var d=e=>{let{user:t,children:a}=e;return t?a:r.a.createElement(s.a,{to:"/login",replace:!0})};var E=function(){const[e,t]=Object(n.useState)(null),[a,o]=Object(n.useState)(.3),[c,i]=Object(n.useState)(100),m=Object(n.useRef)(null),g=()=>{t(null),localStorage.removeItem("user"),clearTimeout(m.current),localStorage.removeItem("user"),localStorage.removeItem("token"),localStorage.removeItem("expiryTime")},E=()=>{clearTimeout(m.current),m.current=setTimeout(()=>{alert("You have been logged out due to inactivity."),g()},36e5)};return Object(n.useEffect)(()=>{const e=localStorage.getItem("user");return e&&t(JSON.parse(e)),window.addEventListener("mousemove",E),window.addEventListener("keydown",E),()=>{window.removeEventListener("mousemove",E),window.removeEventListener("keydown",E),clearTimeout(m.current)}},[]),Object(n.useEffect)(()=>{e&&E()},[e]),r.a.createElement(l.a,null,r.a.createElement("div",{className:"App d-flex"},e&&r.a.createElement("nav",{className:"sidebar d-flex flex-column align-items-center"},r.a.createElement("div",{className:"logo my-3"},r.a.createElement("img",{src:"flame_img.jpeg",alt:"FLAME Logo",className:"img-fluid"})),r.a.createElement("hr",{className:"w-75"}),r.a.createElement("ul",{className:"nav flex-column w-100 text-center"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.b,{to:"/conversation-companion",className:"nav-link"},"Conversation Tool"))),r.a.createElement("div",{className:"mt-auto w-100 p-3"},r.a.createElement("h3",{className:"text-center mb-3"},"Parameters"),r.a.createElement("div",{className:"mb-3"},r.a.createElement("label",{className:"d-block mb-2"},"Temperature: ",a),r.a.createElement("input",{type:"range",min:"0",max:"1",step:"0.1",value:a,onChange:e=>o(e.target.value),className:"w-100"})),r.a.createElement("div",null,r.a.createElement("label",{className:"d-block mb-2"},"Max Tokens: ",c),r.a.createElement("input",{type:"range",min:"0",max:"1000",step:"100",value:c,onChange:e=>i(e.target.value),className:"w-100"})))),r.a.createElement("div",{className:"content flex-grow-1"},e&&r.a.createElement("div",{className:"logout-container"},r.a.createElement("button",{onClick:g,className:"logout-button"},"Logout")),r.a.createElement(s.d,null,e?r.a.createElement(r.a.Fragment,null,r.a.createElement(s.b,{path:"/conversation-companion",element:r.a.createElement(d,{user:e},r.a.createElement(u,{temperature:a,maxTokens:c}))}),r.a.createElement(s.b,{path:"*",element:r.a.createElement(s.a,{to:"/conversation-companion"})})):r.a.createElement(r.a.Fragment,null,r.a.createElement(s.b,{path:"/login",element:r.a.createElement(p,{onLoginSuccess:e=>{const{token:a,expiresIn:n}=e;t(e),localStorage.setItem("user",JSON.stringify(e)),localStorage.setItem("token",a);const r=(new Date).getTime()+6*n*60*60*1e3;localStorage.setItem("expiryTime",r),E()}})}),r.a.createElement(s.b,{path:"*",element:r.a.createElement(s.a,{to:"/login"})}))))))};var f=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,29)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:o,getTTFB:c}=t;a(e),n(e),r(e),o(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null))),f()}},[[14,1,2]]]);
//# sourceMappingURL=main.368c8f18.chunk.js.map