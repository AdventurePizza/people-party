(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{135:function(e,t){},209:function(e,t,n){},211:function(e,t,n){},241:function(e,t){},243:function(e,t){},253:function(e,t){},255:function(e,t){},282:function(e,t){},284:function(e,t){},285:function(e,t){},291:function(e,t){},293:function(e,t){},311:function(e,t){},313:function(e,t){},325:function(e,t){},328:function(e,t){},358:function(e,t,n){"use strict";n.r(t);var r=n(6),a=(n(209),n(0)),s=n.n(a),i=n(28),c=n(3),o=n(66),u=n(14),l=(n(211),n(1)),d=n.n(l),p=n(372),f=n(379),b=n(375),h=n(374),j=n(378),m=n(376),v=n(377),g=n.p+"static/media/grid.8a9501cf.png",O=n.p+"static/media/background.40494036.png",x=n.p+"static/media/frames.d47d7d58.png",y=n.p+"static/media/marker.78c7854c.png",w=n(196),k=n.n(w),S=n(19),C=n(201),P=Object(p.a)((function(e){return Object(f.a)({root:{display:"flex"},sizeBig:{width:e.spacing(12),height:e.spacing(12)},sizeSmall:{width:e.spacing(6),height:e.spacing(6)}})})),T=function(e){var t=e.avatar,n=e.username,a=e.userCursorRef,s=P();return Object(r.jsxs)("div",{ref:a,className:e.className,style:{position:"absolute",overflow:"hidden"},children:[Object(r.jsx)(j.a,{variant:"rounded",src:t,alt:"change avatar",className:s.sizeSmall}),Object(r.jsxs)("div",{style:{textAlign:"center"},children:[n," "]})]})};T.defaultProps={shouldShowIsActive:!0};var F=function(e){var t=e.avatar,n=e.x,a=e.y,s=e.username,i=P();return Object(r.jsxs)("div",{className:e.className,style:{position:"absolute",top:a+20,left:n+20,overflow:"hidden"},children:[Object(r.jsx)(j.a,{variant:"rounded",src:t,alt:"change avatar",className:i.sizeSmall}),Object(r.jsxs)("div",{style:{textAlign:"center"},children:[s," "]})]})},N=d.a.createContext({getProfile:function(){return Promise.resolve({isSuccessful:!1})},setProfile:function(){return Promise.resolve({isSuccessful:!1})},getBgFirebase:function(){return Promise.resolve({isSuccessful:!1})},setBgFirebase:function(){return Promise.resolve({isSuccessful:!1})},getFrames:function(){return Promise.resolve({isSuccessful:!1})},setFrame:function(){return Promise.resolve({isSuccessful:!1})},getTemplate:function(){return Promise.resolve({isSuccessful:!1})},setTemplate:function(){return Promise.resolve({isSuccessful:!1})}}),_="https://peopleparty-server.herokuapp.com",A=function(e){var t=e.children,n=Object(l.useCallback)(function(){var e=Object(i.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/profile/".concat(t),{method:"GET"});case 2:if(!(n=e.sent).ok){e.next=7;break}return e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),a=Object(l.useCallback)(function(){var e=Object(i.a)(s.a.mark((function e(t,n,r){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/profile/".concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,avatar:r})});case 2:if(!(a=e.sent).ok){e.next=5;break}return e.abrupt("return",{isSuccessful:!0});case 5:return e.abrupt("return",{isSuccessful:!1,message:a.statusText});case 6:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),[]),c=Object(l.useCallback)(Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/background",{method:"GET"});case 2:if(!(t=e.sent).ok){e.next=7;break}return e.next=6,t.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))),[]),o=Object(l.useCallback)(function(){var e=Object(i.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/background",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({background:t})});case 2:if(!(n=e.sent).ok){e.next=5;break}return e.abrupt("return",{isSuccessful:!0});case 5:return e.abrupt("return",{isSuccessful:!1,message:n.statusText});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),u=Object(l.useCallback)(Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/frame",{method:"GET"});case 2:if(!(t=e.sent).ok){e.next=7;break}return e.next=6,t.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))),[]),d=Object(l.useCallback)(function(){var e=Object(i.a)(s.a.mark((function e(t,n,r){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/frame",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({image:t,title:n,id:r})});case 2:if(!(a=e.sent).ok){e.next=5;break}return e.abrupt("return",{isSuccessful:!0});case 5:return e.abrupt("return",{isSuccessful:!1,message:a.statusText});case 6:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),[]),p=Object(l.useCallback)(Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/template",{method:"GET"});case 2:if(!(t=e.sent).ok){e.next=7;break}return e.next=6,t.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))),[]),f=Object(l.useCallback)(function(){var e=Object(i.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+"/users/template",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({template:t})});case 2:if(!(n=e.sent).ok){e.next=5;break}return e.abrupt("return",{isSuccessful:!0});case 5:return e.abrupt("return",{isSuccessful:!1,message:n.statusText});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(r.jsx)(N.Provider,{value:{getProfile:n,setProfile:a,getBgFirebase:c,setBgFirebase:o,getFrames:u,setFrame:d,getTemplate:p,setTemplate:f},children:t})};function I(e){var t=e.onWhiteboardPanel,n=e.canvasRef,a=e.brushColor,s=e.onAction,i=Object(l.useState)(!1),c=Object(u.a)(i,2),o=c[0],d=c[1],p=Object(l.useRef)({x:0,y:0});return Object(l.useEffect)((function(){var e=n.current;e.width=window.innerWidth,e.height=window.innerHeight,e.getContext("2d").lineCap="round"}),[n]),Object(r.jsx)("canvas",{ref:n,style:t?z:B,onTouchMove:function(e){if(t){var r=e.touches[0].clientX,i=e.touches[0].clientY;if(o){var c=p.current,u=c.x,l=c.y,d=M(u,l,0,0),f=d.x,b=d.y,h=M(r,i,0,0),j=h.x,m=h.y;E(!1,n,u,l,r,i,a,!1);var v={prevX:f,prevY:b,currentX:j,currentY:m,color:a},g=JSON.stringify(v);s("whiteboard",g)}p.current={x:r,y:i}}},onTouchEnd:function(){t&&d(!1)},onTouchStart:function(e){t&&(d(!0),p.current={x:e.touches[0].clientX,y:e.touches[0].clientY})},onMouseDown:function(e){t&&(d(!0),p.current={x:e.clientX,y:e.clientY})},onMouseUp:function(){t&&d(!1)},onMouseMove:function(e){if(t){var r=e.clientX,i=e.clientY;if(o){var c=p.current,u=c.x,l=c.y,d=M(u,l,0,0),f=d.x,b=d.y,h=M(r,i,0,0),j=h.x,m=h.y;E(!1,n,u,l,r,i,a,!1);var v={prevX:f,prevY:b,currentX:j,currentY:m,color:a},g=JSON.stringify(v);s("whiteboard",g)}p.current={x:r,y:i}}}})}var z={cursor:"crosshair",width:window.innerWidth,height:window.innerHeight,backgroundColor:"transparent",position:"absolute",top:0,right:0},B={width:window.innerWidth,height:window.innerHeight,backgroundColor:"transparent",position:"absolute",top:0,right:0,pointerEvents:"none"};function E(e,t,n,r,a,s,i){var c=arguments.length>7&&void 0!==arguments[7]&&arguments[7],o=t.current,u=o.getContext("2d");if(c?(u.globalCompositeOperation="destination-out",u.lineWidth=5):(u.globalCompositeOperation="source-over",u.lineWidth=3),u.beginPath(),e){var l=n*window.innerWidth,d=r*window.innerHeight,p=a*window.innerWidth,f=s*window.innerHeight;u.moveTo(l,d),u.lineTo(p,f)}else u.moveTo(n,r),u.lineTo(a,s);u.strokeStyle=i,u.stroke(),u.closePath(),c||setTimeout((function(){E(e,t,n,r,a,s,i,!0)}),3e4)}var R=["yellow","orange","red","pink","violet","blue","green","gray"];var W=function(e){var t=e.setMarkerColor,n=R.map((function(e){return Object(r.jsx)(h.a,{style:{backgroundColor:e,width:"5px",height:"5px",marginRight:"2px",borderRadius:1},onClick:function(){return t(e)}},e)}));return Object(r.jsx)("div",{style:{padding:10},children:n})},Y="localhost"===window.location.hostname?"ws://localhost:8000":"wss://peopleparty-server.herokuapp.com",q=k()(Y,{transports:["websocket"]}),H=new S.i({name:"Beacon Docs"}),J=Object(p.a)((function(e){return Object(f.a)({root:{display:"flex"},sizeBig:{width:e.spacing(12),height:e.spacing(12)},sizeSmall:{width:e.spacing(6),height:e.spacing(6)},sizeVerySmall:{width:e.spacing(3),height:e.spacing(3)}})}));var X=function(){var e=J(),t=Object(l.useContext)(N),n=t.getProfile,a=t.setProfile,p=t.getBgFirebase,f=t.setBgFirebase,w=t.getFrames,k=t.setFrame,S=t.getTemplate,P=t.setTemplate,_=Object(l.useState)(),A=Object(u.a)(_,2),z=A[0],B=A[1],R=Object(l.useState)("sync"),Y=Object(u.a)(R,2),X=Y[0],M=Y[1],L=Object(l.useState)(!1),D=Object(u.a)(L,2),V=D[0],U=D[1],$=window.innerWidth<=500,Q=Object(l.useState)(!0),Z=Object(u.a)(Q,2),K=Z[0],ee=Z[1],te=Object(l.useState)("wallet"),ne=Object(u.a)(te,2),re=ne[0],ae=ne[1],se=Object(l.useState)([]),ie=Object(u.a)(se,2),ce=ie[0],oe=ie[1],ue=Object(l.useState)("anon"),le=Object(u.a)(ue,2),de=le[0],pe=le[1],fe=Object(l.useState)("https://ipfs.io/ipfs/QmVAiRHjVLPJYnf7jCpVeqrqRBE7HFN9nm5ZB2QSZ5BY52"),be=Object(u.a)(fe,2),he=be[0],je=be[1],me=d.a.createRef(),ve=Object(l.useState)({}),ge=Object(u.a)(ve,2),Oe=ge[0],xe=ge[1],ye=Object(l.useState)(""),we=Object(u.a)(ye,2),ke=we[0],Se=we[1],Ce=d.a.useState(!1),Pe=Object(u.a)(Ce,2),Te=Pe[0],Fe=Pe[1],Ne=Object(l.useState)("background"),_e=Object(u.a)(Ne,2),Ae=_e[0],Ie=_e[1],ze=Object(l.useState)(0),Be=Object(u.a)(ze,2),Ee=Be[0],Re=Be[1],We=Object(l.useState)({image:"",title:""}),Ye=Object(u.a)(We,2),qe=Ye[0],He=Ye[1],Je=Object(l.useState)({image:"",title:""}),Xe=Object(u.a)(Je,2),Ge=Xe[0],Me=Xe[1],Le=Object(l.useState)({image:"",title:""}),De=Object(u.a)(Le,2),Ve=De[0],Ue=De[1],$e=Object(l.useState)("black"),Qe=Object(u.a)($e,2),Ze=Qe[0],Ke=Qe[1],et=Object(l.useRef)(null);q.emit("username",de),q.emit("avatar",he),Object(l.useEffect)((function(){p().then((function(e){e&&Se(e.background)})),w().then((function(e){e&&(He({image:e[0].image,title:e[0].title}),Me({image:e[1].image,title:e[1].title}),Ue({image:e[2].image,title:e[2].title}))})),S().then((function(e){e&&Ie(e.template)}))}),[p,w,S]),Object(l.useEffect)((function(){n(z?z.address:"").then((function(e){e&&(q.emit("username",e.username),q.emit("avatar",e.avatar),pe(e.username),je(e.avatar))}))}),[n,z]);var tt=Object(l.useCallback)((function(e,t,n){var r=Object(u.a)(t,2),a=r[0],s=r[1],i=window.innerWidth,l=window.innerHeight,d=i*a,p=l*s;xe((function(t){return Object(o.a)(Object(o.a)({},t),{},Object(c.a)({},e,Object(o.a)(Object(o.a)({},t[e]),{},{x:d,y:p,avatar:n.avatar,username:n.name})))}))}),[]),nt=Object(l.useCallback)((function(e){Se(e)}),[]),rt=Object(l.useCallback)((function(e){1===e.id?He({image:e.image,title:e.title}):2===e.id?Me({image:e.image,title:e.title}):Ue({image:e.image,title:e.title})}),[]),at=Object(l.useCallback)((function(e){Ie(e)}),[]),st=Object(l.useCallback)((function(e){var t=JSON.parse(e),n=t.prevX,r=t.prevY,a=t.currentX,s=t.currentY,i=t.color;E(!0,et,n,r,a,s,i,!1)}),[]);Object(l.useEffect)((function(){var e=function(e){xe((function(t){var n=Object(o.a)({},t);return delete n[e],n}))};return q.on("roommate disconnect",e),q.on("cursor move",tt),q.on("background",nt),q.on("frame",rt),q.on("template",at),q.on("whiteboard",st),function(){q.off("roomate disconnect",e),q.off("cursor move",tt),q.off("background",nt),q.on("frame",rt),q.on("template",at),q.on("whiteboard",st)}}),[tt,nt,rt,at,st]),Object(l.useEffect)((function(){function e(e,n,r){return t.apply(this,arguments)}function t(){return(t=Object(i.a)(s.a.mark((function e(t,n,r){var a,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://hdapi.teztools.io/v1/graphql",{method:"POST",body:JSON.stringify({query:t,variables:r,operationName:n})});case 2:return a=e.sent,e.next=5,a.json();case 5:return i=e.sent,e.abrupt("return",i);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function n(){return(n=Object(i.a)(s.a.mark((function t(n){var r,a,i,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(G,"collectorGallery",{address:n});case 2:return r=t.sent,a=r.errors,i=r.data,a&&console.error(a),c=i?i.hic_et_nunc_token_holder:null,oe(c),t.abrupt("return",c);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}z&&function(e){n.apply(this,arguments)}(z.address)}),[z]);var it=function(e,t){if(void 0===e)return"";switch(t){case"HIC":return e.replace("ipfs://","https://pinata.hicetnunc.xyz/ipfs/");case"CLOUDFLARE":return e.replace("ipfs://","https://cloudflare-ipfs.com/ipfs/");case"PINATA":return e.replace("ipfs://","https://gateway.pinata.cloud/ipfs/");case"IPFS":return e.replace("ipfs://","https://ipfs.io/ipfs/");case"INFURA":try{var n=new ipfsClient.CID(e.replace("ipfs://","")).toV1().toBaseEncodedString("base32");return"https://".concat(n,".ipfs.infura-ipfs.io/")}catch(r){return}case"DWEB":return e.replace("ipfs://","http://dweb.link/ipfs/");default:return console.error("please specify type"),e}};function ct(e){return ot.apply(this,arguments)}function ot(){return(ot=Object(i.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.tezos.domains/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:'\n            {\n              reverseRecord(address: "'+t+'"){owner domain{name}}\n            }\n            ',variables:{}})}).then((function(e){return e.json()})).then((function(e){e.data.reverseRecord&&(n=e.data.reverseRecord.domain.name,M(n),pe(n))}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ut=Object(l.useMemo)((function(){return C.a.throttle((function(e){q.emit("cursor move",{x:e[0],y:e[1]})}),5)}),[]),lt=Object(l.useCallback)((function(e){var t=e.clientX,n=e.clientY,r=window.innerWidth,a=window.innerHeight;ut([(t-60)/r,(n-60)/a]),me.current&&(me.current.style.left=t+20+"px",me.current.style.top=n+20+"px")}),[ut,me]);function dt(){return(dt=Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=B,e.next=3,H.getActiveAccount();case 3:e.t1=e.sent,(0,e.t0)(e.t1),z&&H.clearActiveAccount().then(Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=B,e.next=3,H.getActiveAccount();case 3:e.t1=e.sent,(0,e.t0)(e.t1),M("sync"),pe("anon"),U(!1);case 8:case"end":return e.stop()}}),e)}))));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function pt(){return ft.apply(this,arguments)}function ft(){return(ft=Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=B,e.next=3,H.getActiveAccount();case 3:if(e.t1=e.sent,(0,e.t0)(e.t1),!z){e.next=12;break}return M(z.address),U(!0),ct(z.address),e.abrupt("return",z);case 12:return e.prev=12,console.log("Requesting permissions..."),e.next=16,H.requestPermissions();case 16:return t=e.sent,e.t2=B,e.next=20,H.getActiveAccount();case 20:e.t3=e.sent,(0,e.t2)(e.t3),console.log("Got permissions:",t.address),M(t.address),U(!0),ct(t.address),e.next=31;break;case 28:e.prev=28,e.t4=e.catch(12),console.log("Got error:",e.t4);case 31:case"end":return e.stop()}}),e,null,[[12,28]])})))).apply(this,arguments)}return Object(l.useEffect)((function(){window.addEventListener("mousemove",lt)}),[lt]),Object(l.useEffect)((function(){function e(){return(e=Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=B,e.next=3,H.getActiveAccount();case 3:e.t1=e.sent,(0,e.t0)(e.t1),z?(M(z.address.slice(0,6)+"..."+z.address.slice(32,36)),pe(z.address.slice(0,6)+"..."+z.address.slice(32,36)),U(!0),ct(z.address)):(M("sync"),U(!1));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[z]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(T,{avatar:he,userCursorRef:me,username:de}),Object(r.jsxs)("div",{style:{height:window.innerHeight,backgroundImage:"background"===Ae?"url(".concat(ke,")"):"",backgroundPosition:"center",backgroundRepeat:"no-repeat"},onClick:function(){ee(!1),Re(0)},children:[Oe&&Object.entries(Oe).map((function(e){var t=Object(u.a)(e,1)[0];return Object(r.jsx)(F,{x:Oe[t].x,y:Oe[t].y,avatar:Oe[t].avatar,username:Oe[t].username})})),Object(r.jsx)(I,{onWhiteboardPanel:"marker"===Ae,canvasRef:et,brushColor:Ze,onAction:function(e){switch(e){case"whiteboard":var t=arguments.length<=1?void 0:arguments[1];q.emit("whiteboard",t)}}}),Object(r.jsx)("div",{className:"top-left",style:{fontSize:$?"1.5em":"3em",display:"flex",alignItems:"center",paddingLeft:10},children:"people party"}),"frames"===Ae&&Object(r.jsxs)("div",{class:"wrapper",children:[Object(r.jsx)("div",{class:"item",style:{border:1===Ee?"dashed":"none"},onClick:function(e){Re(1),e.stopPropagation()},children:Object(r.jsxs)("div",{class:"polaroid",children:[Object(r.jsx)("img",{src:qe.image}),Object(r.jsx)("div",{class:"caption",children:qe.title})]})}),Object(r.jsx)("div",{class:"item",style:{border:2===Ee?"dashed":"none"},onClick:function(e){Re(2),e.stopPropagation()},children:Object(r.jsxs)("div",{class:"polaroid",children:[Object(r.jsx)("img",{src:Ge.image}),Object(r.jsx)("div",{class:"caption",children:Ge.title})]})}),Object(r.jsx)("div",{class:"item",style:{border:3===Ee?"dashed":"none"},onClick:function(e){Re(3),e.stopPropagation()},children:Object(r.jsxs)("div",{class:"polaroid",children:[Object(r.jsx)("img",{src:Ve.image}),Object(r.jsxs)("div",{class:"caption",children:[Ve.title," "]})]})})]}),Object(r.jsx)("div",{className:"top-right",style:{position:"absolute"},children:Object(r.jsx)(b.a,{elevation:3,children:Object(r.jsx)(h.a,{onClick:function(e){"templates"!==re&&K||ee(!K),ae("templates"),e.stopPropagation()},children:Object(r.jsx)(j.a,{variant:"rounded",src:g,alt:"templates",className:e.sizeVerySmall})})})}),"marker"===Ae&&Object(r.jsx)(W,{setMarkerColor:Ke}),Object(r.jsxs)("div",{className:"bottom",style:{position:"absolute",backgroundColor:"white"},onClick:function(e){e.stopPropagation()},children:[Object(r.jsxs)("div",{children:[K&&"wallet"===re&&Object(r.jsx)("div",{className:"panel",style:{display:"flex",width:"100%",overflowY:"auto"},children:ce&&ce.map((function(t){var n=t.token;return Object(r.jsx)(h.a,{onClick:function(){Te?(Se(it(n.display_uri,"IPFS")),q.emit("background",it(n.display_uri,"IPFS")),f(it(n.display_uri,"IPFS"))):0!=Ee?(1===Ee?He({image:it(n.display_uri,"IPFS"),title:n.title}):2===Ee?Me({image:it(n.display_uri,"IPFS"),title:n.title}):Ue({image:it(n.display_uri,"IPFS"),title:n.title}),q.emit("frame",{image:it(n.display_uri,"IPFS"),title:n.title,id:Ee}),k(it(n.display_uri,"IPFS"),n.title,Ee)):(je(it(n.display_uri,"IPFS")),q.emit("avatar",it(n.display_uri,"IPFS")),a(z.address,de,it(n.display_uri,"IPFS")))},children:Object(r.jsx)(j.a,{variant:"rounded",src:it(n.display_uri,"IPFS"),alt:n.id,className:e.sizeBig})},n.id)}))}),K&&"templates"===re&&Object(r.jsxs)("div",{className:"panel",style:{display:"flex",width:"100%",overflowY:"auto"},children:[Object(r.jsx)(h.a,{onClick:function(){Ie("background"),q.emit("template","background"),P("background")},children:Object(r.jsx)(j.a,{variant:"rounded",src:O,alt:"Wallpaper",className:e.sizeBig})}),Object(r.jsx)(h.a,{onClick:function(){Ie("frames"),q.emit("template","frames"),P("frames")},children:Object(r.jsx)(j.a,{variant:"rounded",src:x,alt:"Exhibition",className:e.sizeBig})}),Object(r.jsx)(h.a,{onClick:function(){Ie("marker"),q.emit("template","marker"),P("marker")},children:Object(r.jsx)(j.a,{variant:"rounded",src:y,alt:"Whiteboard",className:e.sizeBig})})]})]}),Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)("div",{style:{marginRight:"auto"},children:Object(r.jsxs)(m.a,{title:"Adventure Networks",size:$?"small":"medium",onClick:function(){},children:["  ",Object(r.jsxs)("div",{style:{textAlign:"left"},children:[" Adventure ",Object(r.jsx)("br",{}),"Networks "]})," "]})}),Object(r.jsx)("div",{style:{display:"flex",alignItems:"end",justifyContent:"flex-end"},children:Object(r.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-end"},children:[V&&Object(r.jsxs)(m.a,{size:$?"small":"medium",title:"unsync",onClick:function(){!function(){dt.apply(this,arguments)}()},children:[Object(r.jsx)("u",{children:"unsync"})," "]}),V&&Object(r.jsx)("div",{children:" | "}),Object(r.jsxs)(m.a,{title:"sync",size:$?"small":"medium",onClick:Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,pt();case 2:case"end":return e.stop()}}),e)}))),children:[Object(r.jsx)("u",{children:X})," "]}),V&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{children:" | "}),Object(r.jsx)(m.a,{size:$?"small":"medium",title:"unsync",onClick:function(e){"wallet"!==re&&K||ee(!K),ae("wallet"),e.stopPropagation()},children:Object(r.jsx)(j.a,{variant:"rounded",src:he,alt:"change avatar",className:e.sizeSmall})}),"|",Object(r.jsx)(v.a,{checked:Te,onChange:function(e){Fe(e.target.checked)}}),Object(r.jsx)("b",{children:" Background "}),"   \xa0"]})]})})]})]})]})]})},G='\nquery collectorGallery($address: String!) {\n  hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, token: {creator: {address: {_neq: $address}}}, quantity: {_gt: "0"}}, order_by: {token_id: desc}) {\n\ttoken {\n\t  id\n\t  artifact_uri\n\t  display_uri\n\t  thumbnail_uri\n\t  timestamp\n\t  mime\n\t  title\n\t  description\n\t  supply\n\t  royalties\n\t  creator {\n\t\taddress\n\t  }\n\t}\n  }\n}\n',M=function(e,t,n,r){var a=t;return{x:(e-n)/window.innerWidth,y:(a-r)/window.innerHeight}},L=n(64),D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,381)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),s(e),i(e)}))};n.n(L).a.render(Object(r.jsx)(A,{children:Object(r.jsx)(X,{})}),document.getElementById("root")),D()}},[[358,1,2]]]);
//# sourceMappingURL=main.1689d467.chunk.js.map