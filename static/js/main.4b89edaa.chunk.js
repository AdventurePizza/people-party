(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{140:function(e,t){},216:function(e,t,n){},218:function(e,t,n){},248:function(e,t){},250:function(e,t){},260:function(e,t){},262:function(e,t){},289:function(e,t){},291:function(e,t){},292:function(e,t){},298:function(e,t){},300:function(e,t){},318:function(e,t){},320:function(e,t){},332:function(e,t){},335:function(e,t){},365:function(e,t,n){"use strict";n.r(t);var r=n(12),s=(n(216),n(0)),a=n.n(s),c=n(51),i=n(4),o=n(72),u=n(19),l=(n(218),n(1)),d=n.n(l),p=n(386),f=n(392),j=n(389),h=n(391),b=n(390),m=n(201),v=n.n(m),O=n(20),x=n(205),y=Object(p.a)((function(e){return Object(f.a)({root:{display:"flex"},sizeBig:{width:e.spacing(12),height:e.spacing(12)},sizeSmall:{width:e.spacing(6),height:e.spacing(6)}})})),g=function(e){var t=e.avatar,n=e.username,s=e.userCursorRef,a=y();return Object(r.jsxs)("div",{ref:s,className:e.className,style:{position:"absolute",overflow:"hidden"},children:[Object(r.jsx)(h.a,{variant:"rounded",src:t,alt:"change avatar",className:a.sizeSmall}),Object(r.jsxs)("div",{style:{textAlign:"center"},children:[n," "]})]})};g.defaultProps={shouldShowIsActive:!0};var w=function(e){var t=e.avatar,n=e.x,s=e.y,a=e.username,c=y();return Object(r.jsxs)("div",{className:e.className,style:{position:"absolute",top:s,left:n,overflow:"hidden"},children:[Object(r.jsx)(h.a,{variant:"rounded",src:t,alt:"change avatar",className:c.sizeSmall}),Object(r.jsxs)("div",{style:{textAlign:"center"},children:[a," "]})]})},k='\nquery collectorGallery($address: String!) {\n  hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, token: {creator: {address: {_neq: $address}}}, quantity: {_gt: "0"}}, order_by: {token_id: desc}) {\n\ttoken {\n\t  id\n\t  artifact_uri\n\t  display_uri\n\t  thumbnail_uri\n\t  timestamp\n\t  mime\n\t  title\n\t  description\n\t  supply\n\t  royalties\n\t  creator {\n\t\taddress\n\t  }\n\t}\n  }\n}\n',S="localhost"===window.location.hostname?"ws://localhost:8000":"wss://peopleparty-server.herokuapp.com",A=v()(S,{transports:["websocket"]}),C=new O.i({name:"Beacon Docs"}),_=Object(p.a)((function(e){return Object(f.a)({root:{display:"flex"},sizeBig:{width:e.spacing(12),height:e.spacing(12)},sizeSmall:{width:e.spacing(6),height:e.spacing(6)}})}));var N=function(){var e=_(),t=Object(l.useState)(),n=Object(u.a)(t,2),s=n[0],p=n[1],f=Object(l.useState)("sync"),m=Object(u.a)(f,2),v=m[0],O=m[1],y=Object(l.useState)(!1),S=Object(u.a)(y,2),N=S[0],z=S[1],I=window.innerWidth<=500,F=Object(l.useState)(!1),q=Object(u.a)(F,2),P=q[0],R=q[1],B=Object(l.useState)([]),E=Object(u.a)(B,2),L=E[0],T=E[1],D=Object(l.useState)("anon"),H=Object(u.a)(D,2),J=H[0],G=H[1],V=Object(l.useState)("https://ipfs.io/ipfs/QmVAiRHjVLPJYnf7jCpVeqrqRBE7HFN9nm5ZB2QSZ5BY52"),W=Object(u.a)(V,2),Y=W[0],$=W[1],Q=d.a.createRef(),U=Object(l.useState)({}),Z=Object(u.a)(U,2),M=Z[0],X=Z[1];A.emit("username",J),A.emit("avatar",Y);var K=Object(l.useCallback)((function(e,t,n){var r=Object(u.a)(t,2),s=r[0],a=r[1],c=window.innerWidth,l=window.innerHeight,d=c*s,p=l*a;X((function(t){return Object(o.a)(Object(o.a)({},t),{},Object(i.a)({},e,Object(o.a)(Object(o.a)({},t[e]),{},{x:d,y:p,avatar:n.avatar,username:n.name})))}))}),[]);Object(l.useEffect)((function(){var e=function(e){X((function(t){var n=Object(o.a)({},t);return delete n[e],n}))};return A.on("roommate disconnect",e),A.on("cursor move",K),function(){A.off("roomate disconnect",e),A.off("cursor move",K)}}),[K]),Object(l.useEffect)((function(){function e(e,n,r){return t.apply(this,arguments)}function t(){return(t=Object(c.a)(a.a.mark((function e(t,n,r){var s,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://hdapi.teztools.io/v1/graphql",{method:"POST",body:JSON.stringify({query:t,variables:r,operationName:n})});case 2:return s=e.sent,e.next=5,s.json();case 5:return c=e.sent,e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function n(){return(n=Object(c.a)(a.a.mark((function t(n){var r,s,c,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(k,"collectorGallery",{address:n});case 2:return r=t.sent,s=r.errors,c=r.data,s&&console.error(s),i=c?c.hic_et_nunc_token_holder:null,T(i),t.abrupt("return",i);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}s&&function(e){n.apply(this,arguments)}(s.address)}),[s]);var ee=function(e,t){if(void 0===e)return"";switch(t){case"HIC":return e.replace("ipfs://","https://pinata.hicetnunc.xyz/ipfs/");case"CLOUDFLARE":return e.replace("ipfs://","https://cloudflare-ipfs.com/ipfs/");case"PINATA":return e.replace("ipfs://","https://gateway.pinata.cloud/ipfs/");case"IPFS":return e.replace("ipfs://","https://ipfs.io/ipfs/");case"INFURA":try{var n=new ipfsClient.CID(e.replace("ipfs://","")).toV1().toBaseEncodedString("base32");return"https://".concat(n,".ipfs.infura-ipfs.io/")}catch(r){return}case"DWEB":return e.replace("ipfs://","http://dweb.link/ipfs/");default:return console.error("please specify type"),e}};function te(e){return ne.apply(this,arguments)}function ne(){return(ne=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.tezos.domains/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:'\n            {\n              reverseRecord(address: "'+t+'"){owner domain{name}}\n            }\n            ',variables:{}})}).then((function(e){return e.json()})).then((function(e){e.data.reverseRecord&&(n=e.data.reverseRecord.domain.name,O(n),G(n))}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var re=Object(l.useMemo)((function(){return x.a.throttle((function(e){A.emit("cursor move",{x:e[0],y:e[1]})}),200)}),[]),se=Object(l.useCallback)((function(e){var t=e.clientX,n=e.clientY,r=window.innerWidth,s=window.innerHeight;re([(t-60)/r,(n-60)/s]),Q.current&&(Q.current.style.left=t+20+"px",Q.current.style.top=n+20+"px")}),[re,Q]);function ae(){return(ae=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p,e.next=3,C.getActiveAccount();case 3:e.t1=e.sent,(0,e.t0)(e.t1),s&&C.clearActiveAccount().then(Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p,e.next=3,C.getActiveAccount();case 3:e.t1=e.sent,(0,e.t0)(e.t1),O("sync"),G("anon"),z(!1);case 8:case"end":return e.stop()}}),e)}))));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ce(){return ie.apply(this,arguments)}function ie(){return(ie=Object(c.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p,e.next=3,C.getActiveAccount();case 3:if(e.t1=e.sent,(0,e.t0)(e.t1),!s){e.next=12;break}return O(s.address),z(!0),te(s.address),e.abrupt("return",s);case 12:return e.prev=12,console.log("Requesting permissions..."),e.next=16,C.requestPermissions();case 16:return t=e.sent,e.t2=p,e.next=20,C.getActiveAccount();case 20:e.t3=e.sent,(0,e.t2)(e.t3),console.log("Got permissions:",t.address),O(t.address),z(!0),te(t.address),e.next=31;break;case 28:e.prev=28,e.t4=e.catch(12),console.log("Got error:",e.t4);case 31:case"end":return e.stop()}}),e,null,[[12,28]])})))).apply(this,arguments)}return Object(l.useEffect)((function(){window.addEventListener("mousemove",se)}),[se]),Object(l.useEffect)((function(){function e(){return(e=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p,e.next=3,C.getActiveAccount();case 3:e.t1=e.sent,(0,e.t0)(e.t1),s?(O(s.address.slice(0,6)+"..."+s.address.slice(32,36)),G(s.address.slice(0,6)+"..."+s.address.slice(32,36)),z(!0),te(s.address)):(O("sync"),z(!1));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[s]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(g,{avatar:Y,userCursorRef:Q,username:J}),Object(r.jsxs)("div",{style:{height:"100vh"},children:[M&&Object.entries(M).map((function(e){var t=Object(u.a)(e,2),n=t[0];t[1];return Object(r.jsx)(w,{x:M[n].x,y:M[n].y,avatar:M[n].avatar,username:M[n].username})})),Object(r.jsx)("div",{className:"top-left",style:{fontSize:I?"1em":"1.5em",display:"flex",alignItems:"center"},children:"people party"}),Object(r.jsx)("div",{}),Object(r.jsxs)("div",{className:"bottom",style:{position:"absolute"},children:[Object(r.jsx)("div",{children:P&&Object(r.jsx)("div",{className:"panel",style:{display:"flex",width:"100%",overflowY:"auto"},children:L&&L.map((function(t){var n=t.token;return Object(r.jsx)(j.a,{onClick:function(){$(ee(n.display_uri,"IPFS")),A.emit("avatar",ee(n.display_uri,"IPFS"))},children:Object(r.jsx)(h.a,{variant:"rounded",src:ee(n.display_uri,"IPFS"),alt:n.id,className:e.sizeBig})},n.id)}))})}),Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)("div",{style:{marginRight:"auto"},children:Object(r.jsxs)(b.a,{title:"Adventure Networks",size:I?"small":"medium",onClick:function(){},children:["  ",Object(r.jsxs)("div",{style:{textAlign:"left"},children:[" Adventure ",Object(r.jsx)("br",{}),"Networks "]})," "]})}),Object(r.jsx)("div",{style:{display:"flex",alignItems:"end",justifyContent:"flex-end"},children:Object(r.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-end"},children:[N&&Object(r.jsxs)(b.a,{size:I?"small":"medium",title:"unsync",onClick:function(){!function(){ae.apply(this,arguments)}()},children:[Object(r.jsx)("u",{children:"unsync"})," "]}),N&&Object(r.jsx)("div",{children:" | "}),Object(r.jsxs)(b.a,{title:"sync",size:I?"small":"medium",onClick:Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ce();case 2:case"end":return e.stop()}}),e)}))),children:[Object(r.jsx)("u",{children:v})," "]}),N&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{children:" | "}),Object(r.jsx)(b.a,{size:I?"small":"medium",title:"unsync",onClick:function(){R(!P)},children:Object(r.jsx)(h.a,{variant:"rounded",src:Y,alt:"change avatar",className:e.sizeSmall})})]})]})})]})]})]})]})},z=n(30),I=n.n(z),F=n(206),q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,394)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),s(e),a(e),c(e)}))};I.a.render(Object(r.jsx)(F.a,{maxSnack:3,children:Object(r.jsx)(N,{})}),document.getElementById("root")),q()}},[[365,1,2]]]);
//# sourceMappingURL=main.4b89edaa.chunk.js.map