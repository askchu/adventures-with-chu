(this["webpackJsonpblog-app"]=this["webpackJsonpblog-app"]||[]).push([[7],{533:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var c=n(5),a=n.n(c),r=n(11),s=n(4),o=n(2),u=n(66),i=n(10),l=n(14),j=n(75),f=n(26),b=n(6),p=function(e,t,n,c){var u=Object(o.useState)(0),l=Object(s.a)(u,2),j=l[0],p=l[1],d=Object(o.useState)(null),O=Object(s.a)(d,2),h=O[0],g=O[1],v=Object(o.useState)(null),x=Object(s.a)(v,2),m=x[0],w=x[1],k=Object(i.b)().currentUser,y=Object(o.useState)(""),S=Object(s.a)(y,2),N=(S[0],S[1],k.uid);return Object(o.useEffect)(Object(r.a)(a.a.mark((function n(){var s,o,u;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:s=f.c.ref(e.name),o=f.b.collection(N),u=function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="",e.next=3,b.a.get("users/".concat(k.uid,"/profile.json")).then((function(e){console.log(e.data);var n=Object.keys(e.data);t=n[0]})).catch((function(e){return console.log(e)}));case 3:return e.next=5,t;case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s.put(e).on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;p(t)}),(function(e){g(e)}),Object(r.a)(a.a.mark((function e(){var n,i,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.getDownloadURL();case 2:return n=e.sent,i=Object(f.d)(),o.add({url:n,createdAt:i}),w(n),l={imageUrl:n,description:""},e.next=9,b.a.delete("users/".concat(k.uid,"/profile/").concat(t,"/images/").concat(c,".json")).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}));case 9:if(!t){e.next=12;break}return e.next=12,b.a.post("users/".concat(k.uid,"/profile/").concat(t,"/images.json"),l).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}));case 12:t||u().then(function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.post("users/".concat(k.uid,"/profile/").concat(t,"/images.json"),l).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 13:case"end":return e.stop()}}),e)}))));case 4:case"end":return n.stop()}}),n)}))),[e]),{progress:j,url:m,error:h}},d=(n(183),n(1));function O(e){var t=e.file,n=e.setFile,c=e.id,u=e.setId,l=Object(o.useState)(!1),j=Object(s.a)(l,2),f=j[0],O=j[1],h=Object(o.useState)(""),g=Object(s.a)(h,2),v=g[0],x=g[1],m=p(t,c,f,v),w=m.url,k=m.progress;console.log(c+" from progressBar.js"),console.log(k,w);var y=Object(i.b)().currentUser;return Object(o.useEffect)(Object(r.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w&&n(null),e.next=3,b.a.get("users/".concat(y.uid,"/profile.json")).then((function(e){if(console.log(e.data),e.data){var t=Object.keys(e.data);console.log(t),x(t[0]),console.log("there is data"),O(!0)}})).catch((function(e){return console.log(e)}));case 3:console.log(v);case 4:case"end":return e.stop()}}),e)}))),[w,n,u,t]),Object(d.jsx)("div",{className:"progress-bar",style:{width:k+"%"}})}n(117);var h=n(9);var g=n(74);function v(){var e=Object(o.useRef)(),t=Object(o.useRef)(),n=Object(o.useRef)(),c=Object(o.useRef)(),f=Object(o.useRef)(),p=Object(o.useRef)(),v=Object(i.b)(),x=v.currentUser,m=v.updateProfile,w=Object(o.useState)(""),k=Object(s.a)(w,2),y=k[0],S=k[1],N=Object(o.useState)(!1),C=Object(s.a)(N,2),P=C[0],U=C[1],R=Object(o.useState)(null),D=Object(s.a)(R,2),E=D[0],L=D[1],F=Object(l.g)(),A=Object(o.useState)([]),B=Object(s.a)(A,2),J=(B[0],B[1],Object(o.useState)("")),I=Object(s.a)(J,2),M=I[0],T=I[1],Y=Object(g.a)(x.uid).docs;function _(){return(_=Object(r.a)(a.a.mark((function n(r){var s,o,u,i,l;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r.preventDefault(),f.current.value===p.current.value){n.next=3;break}return n.abrupt("return",S("Passwords do not match"));case 3:if(s=W,o=ee,u=ue,t.current.value!==o&&(o=t.current.value),e.current.value!==s&&(s=e.current.value),ue||(u=""),i={images:u,location:o,name:s,following:"",followers:""},l=M,c.current.value!==M&&(l=c.current.value),!ae){n.next=20;break}return S(""),U(!0),n.next=17,b.a.put("users/".concat(x.uid,"/profile/").concat(ae,".json"),i).then((function(e){}));case 17:return n.next=19,m(l,f.current.value);case 19:F.push("/profile-blogs");case 20:if(ae){n.next=34;break}return n.prev=21,S(""),U(!0),n.next=26,m(l,f.current.value);case 26:return n.next=28,b.a.post("users/".concat(x.uid,"/profile.json"),i).then((function(e){})).catch((function(e){return console.log(e)}));case 28:F.push("/profile-blogs"),n.next=34;break;case 31:n.prev=31,n.t0=n.catch(21),S("Failed to update account, ".concat(n.t0));case 34:U(!1);case 35:case"end":return n.stop()}}),n,null,[[21,31]])})))).apply(this,arguments)}var q=function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={images:"",location:"",name:"",following:"",followers:""},e.next=3,b.a.post("users/".concat(x.uid,"/profile.json"),t).then((function(e){})).catch((function(e){return console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=Object(o.useState)(!1),G=Object(s.a)(z,2),H=G[0],K=G[1],Q=Object(o.useState)(""),V=Object(s.a)(Q,2),W=V[0],X=V[1],Z=Object(o.useState)(""),$=Object(s.a)(Z,2),ee=$[0],te=$[1],ne=Object(o.useState)(""),ce=Object(s.a)(ne,2),ae=ce[0],re=ce[1],se=Object(o.useState)([]),oe=Object(s.a)(se,2),ue=oe[0],ie=oe[1],le=Object(o.useState)(null),je=Object(s.a)(le,2),fe=je[0],be=je[1],pe=function(e,t,n){var c=Object(o.useState)(null),u=Object(s.a)(c,2),l=u[0],j=u[1],f=Object(o.useState)(null),p=Object(s.a)(f,2),d=p[0],O=(p[1],Object(i.b)().currentUser),g=new Date,v=(g.getMonth(),String(g.getDate()).padStart(2,"0"),g.getFullYear(),function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="",e.next=3,b.a.get("users/".concat(O.uid,"/profile.json")).then((function(e){var n=Object.keys(e.data);t=n[0]})).catch((function(e){return console.log(e)}));case 3:return e.next=5,t;case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return Object(o.useEffect)(Object(r.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=3;break}return e.next=3,b.a.get("users/".concat(O.uid,"/profile/").concat(t,"/images.json")).then((function(e){var t=[];for(var n in e.data)t.unshift(Object(h.a)(Object(h.a)({},e.data[n]),{},{id:n}));j(t)})).catch((function(e){return console.log(e)}));case 3:t||v().then(function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("users/".concat(O.uid,"/profile/").concat(t,"/images.json")).then((function(e){var t=[];for(var n in e.data)t.unshift(Object(h.a)(Object(h.a)({},e.data[n]),{},{id:n}));j(t)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:case"end":return e.stop()}}),e)}))),[e,n]),{datas:l,changed:d}}(Y,ae,fe).datas;Object(o.useEffect)(Object(r.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("users/".concat(x.uid,"/profile.json")).then((function(e){var t="",n="";e.data,e.data&&(t=Object.values(e.data),n=Object.keys(e.data),K(!0)),W||t&&X(t[0].name),ee||t&&te(t[0].location),re(n[0]),ie(t[0].images),T(x.email)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)}))),[pe]);var de=function(){var e=Object(r.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,b.a.delete("users/".concat(x.uid,"/profile/").concat(ae,"/images/").concat(pe[0].id,".json")).then((function(e){be("changed")})).catch((function(e){return console.log(e)}));case 3:n.current.value=null;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Oe="";if(pe||(Oe=Object(d.jsx)("div",{})),null!==pe&&pe.length>0){var he=Object.values(pe[0]);Oe=Object(d.jsxs)("div",{className:"img",children:[Object(d.jsx)("img",{src:he[1]},pe[0].id),Object(d.jsx)("button",{onClick:de,children:"Delete"})]})}return Object(d.jsx)("div",{className:"container",children:Object(d.jsxs)("div",{className:"signUp",children:[Object(d.jsx)("figure",{children:Object(d.jsx)("img",{src:u.a,alt:"adventures with chu"})}),Object(d.jsx)("h1",{children:"Edit Profile"}),y&&Object(d.jsx)(j.a,{message:y}),Object(d.jsxs)("form",{children:[Object(d.jsxs)("div",{className:"input-form",children:[Object(d.jsx)("label",{children:"Profile Name:"}),Object(d.jsx)("input",{type:"text",ref:e,value:W,onChange:function(e){return X(e.target.value)}})]}),Object(d.jsxs)("div",{className:"input-form",children:[Object(d.jsx)("label",{children:"Location:"}),Object(d.jsx)("input",{type:"text",ref:t,value:ee,onChange:function(e){return te(e.target.value)}})]}),Object(d.jsxs)("div",{className:"input-form",children:[Object(d.jsx)("label",{children:"Profile Picture:"}),Object(d.jsx)("input",{type:"file",accept:"image/png, image/jpeg",onChange:function(e){0==H&&q();var t=e.target.files[0];t&&["image/png","image/jpeg"].includes(t.type)?(L(t),S("")):(L(null),S("Please select an image file (png or jpeg)"))},ref:n}),E&&Object(d.jsx)("div",{children:E.name}),E&&Object(d.jsx)(O,{file:E,setFile:L,id:ae})]}),Oe,Object(d.jsxs)("div",{className:"input-form",children:[Object(d.jsx)("label",{children:"Email Address"}),Object(d.jsx)("input",{type:"email",ref:c,value:M,onChange:function(e){return T(e.target.value)}})]}),Object(d.jsxs)("div",{className:"input-form",children:[Object(d.jsx)("label",{children:"Password"}),Object(d.jsx)("input",{type:"password",ref:f,minLength:"6",autoComplete:"off",placeholder:"Leave blank to keep original"})]}),Object(d.jsxs)("div",{className:"input-form",children:[Object(d.jsx)("label",{children:"Confirm New Password"}),Object(d.jsx)("input",{type:"password",ref:p,minLength:"6",autoComplete:"off",placeholder:"Leave blank to keep original"})]}),Object(d.jsx)("button",{disabled:P,type:"submit",className:"button",onClick:function(e){return _.apply(this,arguments)},children:"Update"})]}),Object(d.jsx)("div",{className:"login",children:Object(d.jsx)("p",{children:Object(d.jsx)("span",{children:Object(d.jsx)("a",{href:"/profile-blogs",children:"Cancel"})})})})]})})}}}]);
//# sourceMappingURL=7.9b2868cf.chunk.js.map