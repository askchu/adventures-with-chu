(this["webpackJsonpblog-app"]=this["webpackJsonpblog-app"]||[]).push([[7],{530:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return p}));var n=c(62),o=c(5),s=c.n(o),a=(c(9),c(10)),l=c(4),r=c(2),i=(c(181),c(11)),u=c(14),d=c(112),j=c(88),b=c(7),O=c(173),g=c(115),h=c(174),f=c(1);function p(){var e=Object(r.useRef)(),t=Object(r.useRef)(),c=Object(r.useRef)(),o=Object(i.b)(),p=o.currentUser,v=(o.updateProfile,Object(r.useState)("")),m=Object(l.a)(v,2),x=m[0],S=m[1],N=Object(r.useState)(null),k=Object(l.a)(N,2),w=k[0],y=k[1],C=Object(j.a)(p.uid).docs,D=Object(u.g)(),I=Object(r.useState)([]),B=Object(l.a)(I,2),J=B[0],q=(B[1],Object(r.useState)("")),F=Object(l.a)(q,2),M=F[0],P=F[1],R=Object(r.useState)(null),Y=Object(l.a)(R,2),A=Y[0],E=Y[1],T=Object(r.useState)(null),U=Object(l.a)(T,2),L=U[0],z=U[1],G=Object(r.useState)(null),H=Object(l.a)(G,2),K=H[0],Q=H[1],V=Object(r.useState)(null),W=Object(l.a)(V,2),X=W[0],Z=W[1],$=Object(r.useState)(null),_=Object(l.a)($,2),ee=_[0],te=_[1],ce=Object(r.useState)(!1),ne=Object(l.a)(ce,2),oe=ne[0],se=ne[1],ae=Object(u.h)().id;console.log(ae);var le=Object(r.useState)([]),re=Object(l.a)(le,2),ie=re[0],ue=re[1],de=Object(O.a)(C,ae,X,ee).datas;console.log(de);var je=new Date,be=["January","February","March","April","May","June","July","August","September","October","November","December"][je.getMonth()],Oe=String(je.getDate()).padStart(2,"0"),ge=je.getFullYear(),he="".concat(be," ").concat(Oe,"/").concat(ge);console.log(J.id);var fe=function(){b.a.request({method:"delete",url:"users/".concat(p.uid,"/drafts/").concat(ae,".json")}).then((function(e){console.log(e),console.log("draft ".concat(ae," deleted"))})).catch((function(e){return console.log(e)})),b.a.request({method:"delete",url:"users/".concat(p.uid,"/count/").concat(J.id,".json")}).then((function(e){console.log(e),console.log("".concat(J.id," count file is deleted"))})).catch((function(e){return console.log(e)})),D.push("/profile-blogs")},pe=function(e){e.target.classList.contains("backdrop")&&se(!1)},ve=[];!0===oe&&(ve=Object(f.jsx)("div",{className:"container",children:Object(f.jsx)("div",{className:"backdrop",onClick:pe,children:Object(f.jsxs)("div",{className:"options",children:[Object(f.jsx)("h2",{children:"Save to Drafts?"}),Object(f.jsxs)("div",{className:"actions",children:[Object(f.jsx)("button",{onClick:function(){var e="";(ye||t.current.value!==e)&&(ye!==t.current.value&&(e=t.current.value),ye===t.current.value&&(e=ye));var n=Be;c.current.value!==n&&(n=c.current.value),de.length>0&&Ae&&Ae.push(J.id),de.length>0&&!Ae&&J.id,de.length;var o="",s="";console.log(o),console.log(s),ie.length>0&&(o=ie[0].content,s=Object.keys(o),Ce(o[s].title),Je(o[s].content)),console.log(n);var a={title:e,content:n};b.a.put("users/".concat(p.uid,"/drafts/").concat(ae,"/content/").concat(s,".json"),a).then((function(e){console.log(e)})).catch((function(e){return console.log(e)})),b.a.request({method:"delete",url:"users/".concat(p.uid,"/count/").concat(J.id,".json")}).then((function(e){console.log(e),console.log("".concat(J.id," count file is deleted"))})).catch((function(e){return console.log(e)})),console.log("saved to drafts"),D.push("/profile-blogs")},children:"Yes"}),Object(f.jsx)("button",{onClick:fe,children:"No"})]})]})})}));var me=Object(r.useState)(!1),xe=Object(l.a)(me,2),Se=xe[0],Ne=xe[1];!0===Se&&(ve=Object(f.jsx)("div",{className:"container",children:Object(f.jsx)("div",{className:"backdrop",onClick:pe,children:Object(f.jsxs)("div",{className:"options",children:[Object(f.jsx)("h2",{children:"Delete Draft?"}),Object(f.jsxs)("div",{className:"actions",children:[Object(f.jsx)("button",{onClick:fe,children:"Yes"}),Object(f.jsx)("button",{onClick:function(){Ne(!1)},children:"No"})]})]})})}));var ke=Object(r.useState)(""),we=Object(l.a)(ke,2),ye=we[0],Ce=we[1],De=Object(r.useState)(""),Ie=Object(l.a)(De,2),Be=Ie[0],Je=Ie[1],qe=Object(r.useState)([]),Fe=Object(l.a)(qe,2),Me=Fe[0],Pe=Fe[1],Re=Object(r.useState)([]),Ye=Object(l.a)(Re,2),Ae=Ye[0];Ye[1];console.log(Be);var Ee=function(){var e=Object(a.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("users/".concat(p.uid,"/drafts/").concat(ae,".json")).then((function(e){console.log(e);var t=[];t.push({content:e.data.content,images:e.data.images}),ue(t),Pe(e.data.images);var c="",n="";t.length>0&&(c=t[0].content,n=Object.keys(c),Ce(c[n].title),Je(c[n].content))})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();console.log(Me),console.log(ye);Object(r.useEffect)(function(){var e=Object(a.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.scrollTo(0,0),Ee();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[ee]),console.log(ye);console.log(de);return Object(f.jsxs)("div",{className:"container-add",children:[Object(f.jsxs)("div",{className:"title",children:[Object(f.jsxs)("h1",{children:["Edit Draft #",ae]}),Object(f.jsxs)("div",{className:"choices",children:[Object(f.jsx)("button",{onClick:function(){se(!0)},children:"Back"}),Object(f.jsx)("button",{className:"delete",onClick:function(){Ne(!0)},children:"Delete"})]})]}),Object(f.jsxs)("form",{className:"newBlog",children:[Object(f.jsxs)("div",{className:"newBlog-input",children:[Object(f.jsx)("label",{children:"Title "}),Object(f.jsx)("input",{type:"text",ref:t,value:ye,onChange:function(e){return Ce(e.target.value)}})]}),Object(f.jsxs)("div",{className:"newBlog-input",children:[Object(f.jsx)("label",{children:"Images "}),Object(f.jsxs)("div",{className:"inputFile",children:[Object(f.jsx)("input",{type:"file",onChange:function(e){var t=e.target.files[0],c=0;J.length>1&&(c=J.length-1),console.log(c),t&&["image/png","image/jpeg"].includes(t.type)?(y(t),P(ae),S("")):(y(null),P(""),S("Please select an image file (png or jpeg)"))},ref:e}),Object(f.jsx)("span",{children:Object(f.jsx)("i",{className:"fas fa-plus"})})]}),Object(f.jsx)("h4",{children:"Click on any image to edit and add a description"}),Object(f.jsxs)("div",{className:"output",children:[x&&Object(f.jsx)("div",{className:"errors",children:x}),w&&w.name,w&&Object(f.jsx)(d.a,{file:w,setFile:y,id:M,setId:P})]})]}),Object(f.jsx)(g.a,{data:de,setSelectedImg:E,setSelectedId:z,setSelectedDescription:Q,imageDraft:Me}),A&&Object(f.jsx)(h.a,{selectedImg:A,setSelectedImg:E,selectedId:L,setSelectedId:z,selectedDescription:K,setSelectedDescription:Q,count:ae,savedDescription:Z,deletedImage:te,deletedImageUrl:""}),Object(f.jsxs)("div",{className:"newBlog-input",children:[Object(f.jsx)("label",{children:"Content "}),Object(f.jsx)("textarea",{rows:"20",cols:"100",value:Be,ref:c,onChange:function(e){return Je(e.target.value)}})]}),Object(f.jsx)("div",{className:"newBlog-post",children:Object(f.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault();var o={date:he,title:t.current.value,content:c.current.value};b.a.post("users/".concat(p.uid,"/blogs/").concat(ae,"/content.json"),o).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}));var s,a=Object(n.a)(de);try{for(a.s();!(s=a.n()).done;){var l=s.value;console.log(l),b.a.post("users/".concat(p.uid,"/blogs/").concat(ae,"/images.json"),l).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))}}catch(r){a.e(r)}finally{a.f()}b.a.request({method:"delete",url:"users/".concat(p.uid,"/drafts/").concat(ae,".json")}).then((function(e){console.log(e),console.log("draft ".concat(ae," deleted"))})).catch((function(e){return console.log(e)})),D.push("/profile-blogs")},children:"Post"})})]}),ve]})}}}]);
//# sourceMappingURL=7.f708bd85.chunk.js.map