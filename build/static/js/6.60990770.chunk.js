(this["webpackJsonpblog-app"]=this["webpackJsonpblog-app"]||[]).push([[6],{529:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return d}));var a=c(5),n=c.n(a),s=c(9),r=c(11),i=c(4),l=c(2),o=c(6),j=c(10),u=(c(118),c(64)),b=c(25),f=c(63),O=c(1);function d(){var e=Object(j.b)().currentUser,t=Object(l.useState)([]),c=Object(i.a)(t,2),a=c[0],d=c[1],p=Object(l.useState)([]),h=Object(i.a)(p,2),v=(h[0],h[1],Object(l.useState)("")),x=Object(i.a)(v,2),m=x[0],g=x[1],w=Object(l.useState)(null),k=Object(i.a)(w,2),N=(k[0],k[1],Object(l.useState)([])),y=Object(i.a)(N,2),S=y[0],U=y[1],I=Object(l.useState)(!1),J=Object(i.a)(I,2),P=J[0],Y=J[1],E=function(){var e=Object(r.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=4;break}if(!(Object.keys(a).length>0)){e.next=4;break}return e.delegateYield(n.a.mark((function e(){var t,c,r,i,l,j,u;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object.keys(a[0].profile),c=Object.values(a[0].profile),r=Object.keys(c[0].following),i=Object.values(c[0].following),l=[],j=n.a.mark((function e(c){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("/users/".concat(i[c].id,".json")).then((function(e){l.push(Object(s.a)(Object(s.a)({},e.data),{},{userId:i[c].id,userObjectId:r[c],profileObjectValue:t[0]}))})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})),u=0;case 7:if(!(u<i.length)){e.next=12;break}return e.delegateYield(j(u),"t0",9);case 9:u++,e.next=7;break;case 12:l.length>0&&U(l);case 13:case"end":return e.stop()}}),e)}))(),"t0",4);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var t=Object(r.a)(n.a.mark((function t(){return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("/users/".concat(e.uid,".json")).then((function(e){var t=[];t.push(Object(s.a)({},e.data)),d(t),g("logged in"),Y(!1)})).catch((function(e){return console.log(e)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(l.useEffect)(Object(r.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.scrollTo(0,0),F(),a&&E();case 3:case"end":return e.stop()}}),e)}))),[m,P]);var T=Object(O.jsx)("div",{});return S&&S.length>0&&(T=S.map((function(e){Object.keys(e.profile);var t=Object.values(e.profile),c=Object(O.jsx)("img",{src:f.a});if(t[0].images){var a=Object.values(t[0].images);return c=Object(O.jsx)("img",{src:a[0].imageUrl}),Object(O.jsx)("div",{className:"followingUsers",children:Object(O.jsxs)("div",{className:"following",children:[Object(O.jsx)("div",{className:"profilePic",children:c}),Object(O.jsx)("div",{className:"profileName",children:Object(O.jsx)("h2",{children:t[0].name})})]})},e.id)}if(!t[0].images)return Object(O.jsx)("div",{className:"followingUsers",children:Object(O.jsxs)("div",{className:"following",children:[Object(O.jsx)("div",{className:"profilePic",children:c}),Object(O.jsx)("div",{className:"profileName",children:Object(O.jsx)("h2",{children:t[0].name})})]})},e.id)}))),Object(O.jsxs)("div",{className:"home",children:[Object(O.jsxs)("div",{className:"profile",children:[Object(O.jsx)(u.a,{}),Object(O.jsxs)("div",{className:"followers",children:[Object(O.jsx)("h1",{children:"Following"}),T]})]}),Object(O.jsx)(b.a,{})]})}}}]);
//# sourceMappingURL=6.60990770.chunk.js.map