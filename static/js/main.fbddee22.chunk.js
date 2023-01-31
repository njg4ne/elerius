(this["webpackJsonpshop-elerius"]=this["webpackJsonpshop-elerius"]||[]).push([[0],{108:function(e){e.exports=JSON.parse('{"document":{"startTime":"08:00","hoursVisible":11,"incMinutes":15,"locks":[true,true],"schedule":{"expectation":[{"duration":4,"color":{"h":187,"s":100,"l":50},"description":"Email"},{"duration":6,"color":{"h":88,"s":100,"l":50},"description":"Class"},{"duration":8,"color":{"h":291,"s":100,"l":50},"description":"Reading"},{"duration":4,"color":{"h":12,"s":100,"l":50},"description":"Break"},{"duration":22,"color":{"h":60,"s":100,"l":50},"description":"Reading"}],"reality":[{"duration":8,"color":"red-700","description":"Email"},{"duration":6,"color":"blue-200","description":"Class"},{"duration":4,"color":"purple-700","description":"Reading"},{"duration":4,"color":"gray-700","description":"Break"},{"duration":22,"color":"blue-500","description":"Reading"}]}}}')},157:function(e,t,n){},158:function(e,t,n){},168:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),a=n(16),r=n.n(a),o=(n(157),n(9)),l=(n(158),n(35)),s=n(15),d=n(268),u=(n(269),n(270),n(267)),h=n(263),j=n(255),b=n(184),p=n(76),m=n(14),x=n(40),O=n(108);var g=Object(x.b)({name:"page",initialState:O,reducers:{setStartingTime:function(e,t){e.document.startTime=t.payload.time},setSchedule:function(e,t){var n=e.document.schedule,c=60*e.document.hoursVisible,i=e.document.incMinutes,a=function(e,t,n){return Object(m.a)(e).map((function(e){var c=n/t*100,i=Math.round(e/c);return(i+=0===i?1:0)*c}))}(t.payload.adjustedSizes,c,i),r=function(e,t,n,c){for(var i=Object(m.a)(e),a=0;a<Math.min(c.length,e.length);a++){var r=t*Number(parseFloat(c[a]))/100/n;i[a].duration=r.valueOf()}return i}("reality"===t.payload.which?n.reality:n.expectation,c,i,a);"reality"===t.payload.which?e.document.schedule.reality=r:e.document.schedule.expectation=r},deleteBlock:function(e,t){var n=t.payload.index,c="reality"===t.payload.which?e.document.schedule.reality:e.document.schedule.expectation;if(1!==c.length){var i=c[n].duration;c.splice(n,1);for(var a=0;i>0;a=a===c.length-1?0:a+1)c[a].duration++,i--;"reality"===t.payload.which?e.document.schedule.reality=c:e.document.schedule.expectation=c}},reorderSchedule:function(e,t){var n="reality"===t.payload.which?e.document.schedule.reality:e.document.schedule.expectation,c=n.splice(t.payload.move[0],1),i=Object(o.a)(c,1)[0];n.splice(t.payload.move[1],0,i),"reality"===t.payload.which?e.document.schedule.reality=n:e.document.schedule.expectation=n},splitBlock:function(e,t){var n="reality"===t.payload.which?e.document.schedule.reality:e.document.schedule.expectation,c=Object(m.a)(n),i=t.payload.index,a=c[i];if(1!==a.duration){var r=a.duration;c.splice(i,0,JSON.parse(JSON.stringify(a))),c[i].duration=0,c[i+1].duration=0,r%2!==0&&(c[i].duration++,r--),r/=2,c[i].duration+=r,c[i+1].duration+=r,"reality"===t.payload.which?e.document.schedule.reality=c:e.document.schedule.expectation=c}},setLock:function(e,t){var n="reality"===t.payload.which?1:0,c=e.document.locks[n];e.document.locks[n]=!c},overwritePage:function(e,t){e.document=t.payload.document},setDurations:function(e,t){var n="reality"===t.payload.which?e.document.schedule.reality:e.document.schedule.expectation;n.map((function(e,n){return e.duration=t.payload.durations[n],e})),"reality"===t.payload.which?e.document.schedule.reality=n:e.document.schedule.expectation=n},updateLabel:function(e,t){("reality"===t.payload.which?e.document.schedule.reality:e.document.schedule.expectation)[t.payload.index].description=t.payload.value},updateColor:function(e,t){("reality"===t.payload.which?e.document.schedule.reality:e.document.schedule.expectation)[t.payload.index].color=t.payload.value}}}),f=g.actions,v=(f.setStartingTime,f.setSchedule,f.deleteBlock),y=f.reorderSchedule,w=f.splitBlock,S=(f.setLock,f.overwritePage),C=f.setDurations,k=f.updateLabel,I=f.updateColor,T=function(e){return e.page.document.startTime},P=function(e){return e.page.document.hoursVisible},E=function(e){return 60/e.page.document.incMinutes},U=function(e){return function(t){var n=t.page.document.schedule;return"reality"===e?n.reality:n.expectation}},A=g.reducer,R=Object(x.b)({name:"user",initialState:{userId:null},reducers:{setActiveUser:function(e,t){e.userId=t.payload.id},setUserLogOutState:function(e){console.log(e.userId),e.userId=null}}}),B=R.actions,D=(B.setActiveUser,B.setUserLogOutState,R.reducer),N=Object(x.b)({name:"filesystem",initialState:{folder:!1,file:!1,saved:null},reducers:{setFolder:function(e,t){e.folder=t.payload.folder}}}),F=(N.actions.setFolder,N.reducer),M=Object(x.a)({reducer:{user:D,page:A,filesystem:F}}),H=n(271),V=n(110),z=n.n(V),L=n(111),W=n.n(L),G=n(112),J=n.n(G),X=n(257),Y=n(2);function q(){return Object(Y.jsx)(X.a,{title:"View saved schedule",children:Object(Y.jsx)(H.a,{"aria-label":"load",onClick:function(){var e=JSON.parse(localStorage.getItem("page"));console.log(e),e&&M.dispatch(S(e))},children:Object(Y.jsx)(z.a,{})})})}function $(){return Object(Y.jsx)(X.a,{title:"Save this schedule to my browser",children:Object(Y.jsx)(H.a,{"aria-label":"save",onClick:function(){var e=M.getState().page;localStorage.setItem("page",JSON.stringify(e))},children:Object(Y.jsx)(W.a,{})})})}function K(){return Object(Y.jsx)(X.a,{title:"Clear my browser storage",children:Object(Y.jsx)(H.a,{"aria-label":"clear",onClick:function(){M.getState().page,localStorage.removeItem("page")},children:Object(Y.jsx)(J.a,{})})})}var Q=n(264),Z=n(272),_=n(276),ee=n(274),te=n(275),ne=n(254),ce=n(113),ie=n.n(ce);function ae(e){return Object(Y.jsx)(X.a,{title:"Instructions",children:Object(Y.jsx)(H.a,{onClick:e.onOpen,"aria-label":"help",children:Object(Y.jsx)(ie.a,{})})})}function re(e){return Object(Y.jsxs)(Z.a,{open:e.open,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(Y.jsx)(ne.a,{id:"alert-dialog-title",children:"Saving Your Schedule"}),Object(Y.jsx)(ee.a,{children:Object(Y.jsx)(te.a,{id:"alert-dialog-description",children:"The save button saves the schedule you see to your browser's local storage. When you come back in the future, use the load button to load that schedule. To clear the schedule saved in your browser, use the clear button."})}),Object(Y.jsx)(_.a,{children:Object(Y.jsx)(Q.a,{onClick:e.onClose,children:"got it!"})})]})}function oe(){var e=Object(c.useState)(!1),t=Object(o.a)(e,2),n=t[0],i=t[1];return Object(Y.jsxs)(j.a,{direction:"row",width:"max-content",ml:"auto",children:[Object(Y.jsx)($,{}),Object(Y.jsx)(q,{}),Object(Y.jsx)(K,{}),Object(Y.jsx)(ae,{onOpen:function(){return i(!0)}}),Object(Y.jsx)(re,{open:n,onClose:function(){return i(!1)}})]})}var le=n(256),se=n(117),de=n(266),ue=n(4),he=n(282),je=n(283),be=n(277),pe=n(278),me=n(279),xe=n(280),Oe=n(281),ge=n.p+"static/media/profile.dd74fee6.jpg";function fe(e){return Object(Y.jsx)(d.a,{sx:e.sx,children:Object(Y.jsx)(be.a,{href:"https://elerius.ga/Nicholas-Gardella.pdf",children:Object(Y.jsxs)(pe.a,{elevation:4,children:[Object(Y.jsx)(me.a,{title:"Nicholas Gardella",sx:{m:2,mb:0,p:0}}),Object(Y.jsxs)(d.a,{sx:{display:"flex"},children:[Object(Y.jsx)(xe.a,{sx:{width:"3cm",borderRadius:"10px",m:2},component:"img",src:ge}),Object(Y.jsx)(Oe.a,{children:"Nicholas is a PhD student in Systems Engineering at University of Virginia under Dr. Sara Riggs. His current research area is psychophysics."})]})]})})})}var ve=n(265);function ye(e){var t="https://elerius.ga"+e.data.path;return Object(Y.jsxs)(u.a,{sx:{p:1.5,bgcolor:"inherit"},elevation:1,children:[Object(Y.jsx)(u.a,{elevation:4,sx:{width:"max-content",bgcolor:"inherit"},children:Object(Y.jsx)(be.a,{href:t,children:Object(Y.jsx)(b.a,{variant:"h6",sx:{m:1,mt:0,py:1,px:.75},children:e.data.title})})}),Object(Y.jsx)(b.a,{sx:{m:1,mb:.5},children:e.data.subtitle}),Object(Y.jsx)(d.a,{children:e.data.tags.map((function(e){return Object(Y.jsx)(ve.a,{label:e,sx:{m:.5}})}))})]})}function we(e){return Object(Y.jsx)(d.a,{sx:e.sx,children:Object(Y.jsxs)(pe.a,{elevation:4,sx:{bgcolor:e.color},children:[Object(Y.jsxs)(j.a,{direction:"row",children:[Object(Y.jsx)(me.a,{title:e.name,sx:{m:2,mb:1,p:0}}),Object(Y.jsx)(b.a,{variant:"h7",sx:{mt:2.75,ml:1},children:"Project Portfolio"})]}),Object(Y.jsx)(j.a,{direction:"column",justifyContent:"flex-start",alignItems:"stretch",spacing:2,sx:{w:1,p:2},children:e.projects.map((function(e){return Object(Y.jsx)(ye,{data:e})}))})]})})}var Se=[{name:"University of Virginia",projects:[{title:"Tactile Concept Mapping",subtitle:"Academic research examining vibrotactile psychophysics to support Anesthesia monitoring.",time:["Summer 2021","Present"],tags:["Research","Human Factors and Ergonomics","Psychophysics","Systems Engineering","HCI","UI/UX"],path:"/TactileConceptMapping.pdf"},{title:"Pavlov's Desk",subtitle:"A well-being focused smart desk hutch",time:["Fall 2021","Present"],tags:["Systems Engineering","Electrical Engineering","Computer Engineering","Mechatronics","HCI","UI/UX"],path:"/PavlovsDesk.pdf"}],color:"#232D4B"},{name:"Virginia Tech",projects:[{title:"Workoutology",subtitle:"An interactive logbook for the gym",time:["Fall 2020",null],tags:["Front End","iOS","Software Engineering","UX/UI","Swift","HCI"],path:"/Workoutology.pdf"},{title:"Bike Broadcast",subtitle:"A cycling communication system",time:["Summer 2020","Fall 2020"],tags:["Systems Engineering","Mechatronics","HCI","UI/UX"],path:"/BikeBroadcast.pdf"},{title:"Animated Mosquito Stimuli",subtitle:"Python LED animation software written for customizable animation creation in biochemistry research",time:["Fall 2020","Spring 2021"],tags:["Graphics","Python","Research","Mechatronics","Biochemistry"],path:"/AedesAegyptiStimuli.pdf"}],color:"#630031"},{name:"Personal",projects:[{title:"www.elerius.ga",subtitle:"Nicholas Gardella's personal and professional home on the web",time:["Summer 2021","Present"],tags:["Front End","DevOps","Docker","React.js","UX/UI","HCI"],path:"/about"}]}];function Ce(){var e=Object(m.a)(Se),t=e[0],n=e[1],c=e[2];return Object(Y.jsxs)(h.a,{container:!0,spacing:2,sx:{p:2},justifyContent:"center",children:[Object(Y.jsx)(h.a,{item:!0,xs:12,md:6,lg:4.5,children:Object(Y.jsxs)(j.a,{direction:"column",spacing:2,children:[Object(Y.jsx)(fe,{}),Object(Y.jsx)(d.a,{children:Object(Y.jsx)(be.a,{component:l.b,to:"/time",children:Object(Y.jsxs)(pe.a,{elevation:4,sx:{bgcolor:"blueviolet"},children:[Object(Y.jsx)(me.a,{title:"Interactve Demo App",sx:{m:2,mb:0,p:0}}),Object(Y.jsx)(d.a,{sx:{display:"flex"},children:Object(Y.jsx)(Oe.a,{children:"Try the Time Blocking tool to build your daily schedule. It utilizes browser storage to save your schedule and is built on React Redux. It is still under development as of January 2022."})}),Object(Y.jsx)(d.a,{sx:{m:2,mt:0},children:["Time Block Planner","Cal Newport","Time Blocking"].map((function(e){return Object(Y.jsx)(ve.a,{label:e,sx:{m:.5}})}))})]})})}),we(t)]})}),Object(Y.jsx)(h.a,{item:!0,xs:12,md:6,lg:4.5,children:Object(Y.jsxs)(j.a,{direction:"column",spacing:2,children:[we(c),we(n)]})})]})}function ke(){var e;return Object(Y.jsx)(he.a,{position:"static",children:Object(Y.jsxs)(je.a,{children:[Object(Y.jsx)(b.a,(e={variant:"h5",component:"div",sx:{flexGrow:1}},Object(ue.a)(e,"component",l.b),Object(ue.a)(e,"to","/"),Object(ue.a)(e,"children","Elerius"),e)),Object(Y.jsx)(s.c,{children:Object(Y.jsx)(s.a,{path:"/time",element:oe()})})]})})}var Ie=n(114),Te=n.n(Ie),Pe=n(22),Ee=n(259);function Ue(e){Object(Pe.d)(U(e.whichSchedule));var t,n=Object(Pe.c)(),c=Object(Pe.d)(P),i=Object(Pe.d)(E),a=Object(Pe.d)((t=e.whichSchedule,function(e){for(var n=e.page.document.schedule,c=("reality"===t?n.reality:n.expectation).map((function(e){return e.duration})),i=Object(m.a)(Array(c.length)),a=0;a<c.length;a++)0===a?i[0]=c[0]:i[a]=c[a]+i[a-1];i.pop(),i.reverse();var r=e.page.document.hoursVisible*(60/e.page.document.incMinutes);return i.map((function(e){return r-e}))}));return e.lockState?Object(Y.jsx)(Y.Fragment,{}):Object(Y.jsx)(d.a,{minHeight:1,children:Object(Y.jsx)(Ee.a,{sx:{color:"var(--spotify-2)",borderRadius:"0px",margin:"0px -2px"},orientation:"vertical",value:a,disableSwap:!0,track:!1,step:1,min:0,max:44,onChange:function(t,a){var r=a.reverse(),o=i*c;r=r.map((function(e){return o-e}));var l=Object(m.a)(r);l.unshift(0),l.pop();var s=(r=r.map((function(e,t){return e-l[t]}))).reduce((function(e,t){return e+t}));r.push(o-s),r.includes(0)||n(C({which:e.whichSchedule,durations:r}))}})})}var Ae=n(38),Re=n(83),Be=n(118),De=n(262),Ne=n(258);function Fe(e){var t=Object(c.useState)(""),n=Object(o.a)(t,2),i=n[0],a=n[1],r=Object(c.useState)(!0),l=Object(o.a)(r,2),s=l[0],d=l[1];return Object(Y.jsxs)(Z.a,{open:e.open,onClose:e.handleClose,children:[Object(Y.jsx)(ne.a,{children:"Update Label"}),Object(Y.jsxs)(ee.a,{children:[Object(Y.jsx)(te.a,{children:"Enter your new label and click update."}),Object(Y.jsx)(Ne.a,{error:s,helperText:s?"The label cannot be blank":"Click update to save",autoFocus:!0,margin:"dense",id:"name",label:"New Label",type:"email",fullWidth:!0,variant:"standard",value:i,onChange:function(e){a(e.target.value.trim()),""===e.target.value.trim()?d(!0):d(!1)}})]}),Object(Y.jsxs)(_.a,{children:[Object(Y.jsx)(Q.a,{onClick:e.handleClose,children:"Cancel"}),Object(Y.jsx)(Q.a,{disabled:s,onClick:function(){e.onCommit(i),e.handleClose()},children:"Update"})]})]})}var Me=n(116);function He(e){var t=Object(c.useState)("purple"),n=Object(o.a)(t,2),i=n[0],a=n[1];return Object(Y.jsxs)(Z.a,{open:e.open,onClose:e.handleClose,disableTextfield:!0,children:[Object(Y.jsx)(ne.a,{children:"Update Color"}),Object(Y.jsxs)(ee.a,{children:[Object(Y.jsx)(te.a,{children:"Click the box to choose a color."}),Object(Y.jsx)(Me.a,{inputFormats:["hsl","hex"],disableAlpha:!0,hideTextfield:!0,value:i,onChange:function(e){return a(e)}})]}),Object(Y.jsxs)(_.a,{children:[Object(Y.jsx)(Q.a,{onClick:e.handleClose,children:"Cancel"}),Object(Y.jsx)(Q.a,{disabled:"purple"===i,onClick:function(){var t={h:0,s:0,l:0};console.log(i),t.h=i.hsl[0],t.s=i.hsl[1],t.l=i.hsl[2],e.onCommit(t),e.handleClose()},children:"Update"})]})]})}function Ve(e){var t,n=e.lockState,i=Object(Pe.c)(),a=Object(Pe.d)(P),r=Object(Pe.d)(E),l=Object(Pe.d)(U(e.whichSchedule)),s=Object(Pe.d)((t=e.whichSchedule,function(e){var n,c=[],i=0,a=60*e.page.document.hoursVisible,r=0,o=e.page.document.schedule,l="reality"===t,s=Object(p.a)(l?o.reality:o.expectation);try{for(s.s();!(n=s.n()).done;){var d=n.value.duration*e.page.document.incMinutes;if(i+d>a){var u=100-r;r+=u,c.push(u);break}i+=d;var h=d/a*100;c.push(h),r+=h}}catch(O){s.e(O)}finally{s.f()}if(r<100){var j=100-(r-=c.pop());c.push(j)}for(var b=Object(m.a)(Array(c.length)),x=0;x<c.length;x++)0===x?b[0]=c[0]:b[x]=c[x]+b[x-1];return b.pop(),b.reverse(),b.map((function(e){return 100-e}))})),u=Object(c.useState)(null),h=Object(o.a)(u,2),x=h[0],O=h[1],g=Object(c.useState)(!1),f=Object(o.a)(g,2),S=(f[0],f[1],Object(c.useState)(!1)),C=Object(o.a)(S,2),T=(C[0],C[1],Object(c.useState)({which:null,index:null})),A=Object(o.a)(T,2),R=A[0],B=A[1];function D(e){var t={};for(var n in R)t[n]=R[n];t.value=e,console.log(t),i(k(t))}function N(e){var t={};for(var n in R)t[n]=R[n];t.value=e,console.log(t),i(I(t))}var F=Object(c.useState)(null),M=Object(o.a)(F,2),H=M[0],V=M[1],z=Object(c.useState)(null),L=Object(o.a)(z,2),W=L[0],G=L[1],J=function(t){if(null!==W){var n=W,c=e.whichSchedule;switch(t){case"delete":!function(e,t){if(0===s.length)return;i(v({which:e,index:t}))}(c,n);break;case"split":!function(e,t){if(1===l[t].duration)return;i(w({which:e,index:t}))}(c,n);break;case"rename":B({which:c,index:n}),O(t);case"colorize":B({which:c,index:n}),O(t)}}V(null)};function q(e){e.color.l;var t={textColor:e.color.l/2>30?"black":"white",contrastColor:ze(e.color.h,e.color.s,e.color.l/2)};function n(){return Object(Y.jsx)(b.a,{hidden:e.length<2,id:"desc",sx:{fontSize:"14px",color:t.textColor,overflow:"hidden",fontWeight:400,width:"max-content",px:.75,py:.25,m:.75,position:"absolute",bgcolor:t.contrastColor,borderRadius:"8px",border:1,borderColor:"black"},children:e.data.description})}function c(e){function t(){return Object(Y.jsx)(j.a,{direction:"column",sx:{width:1,height:1,position:"absolute"},children:Object(m.a)(Array(e.length)).map((function(t,n){var c=1/e.length,i=0===n;return Object(Y.jsx)(d.a,{borderTop:i?0:1,borderStyle:"dotted",borderColor:"black",sx:{width:1,height:c,borderStyle:"dotted"}})}))})}return Object(Y.jsx)(t,{})}return Object(Y.jsxs)(j.a,{direction:"row",sx:{width:"100%",height:"100%"},children:[Object(Y.jsx)(He,{open:"colorize"===x,handleClose:function(){return O(null)},onCommit:N}),Object(Y.jsxs)(j.a,{direction:"column",sx:{width:1,position:"relative"},children:[Object(Y.jsx)(Fe,{open:"rename"===x,handleClose:function(){return O(null)},onCommit:D}),Object(Y.jsx)(c,{length:e.length})]}),Object(Y.jsx)(n,{})]})}function $(e){var t=r*a;return e?Number(t).toString():t}var K=function(e,t){var c=ze.apply(null,Object.values(e.color));return Object(Y.jsx)(Re.b,{draggableId:Number(t).toString(),index:t,isDragDisabled:n,children:function(n){return Object(Y.jsx)(X.a,{title:e.description,children:Object(Y.jsxs)(d.a,Object(Ae.a)(Object(Ae.a)(Object(Ae.a)({ref:n.innerRef},n.draggableProps),n.dragHandleProps),{},{id:"timecell",border:1,borderColor:"black",sx:{bgcolor:c,m:"1px",height:"calc(100% / "+$(!0)+" * "+Number(e.duration).toString()+" - 2px)"},onContextMenu:function(e){return function(e,t){e.preventDefault(),G(t),console.log(t),V(null===H?{mouseX:e.clientX-2,mouseY:e.clientY-4}:null)}(e,t)},children:[Object(Y.jsx)(q,{data:e,length:e.duration,color:e.color}),Object(Y.jsxs)(Be.a,{open:null!==H,onClose:J,anchorReference:"anchorPosition",anchorPosition:null!==H?{top:H.mouseY,left:H.mouseX}:void 0,children:[Object(Y.jsx)(De.a,{onClick:function(){return J("rename")},children:"Rename"}),Object(Y.jsx)(De.a,{onClick:function(){return J("split")},children:"Split"}),Object(Y.jsx)(De.a,{onClick:function(){return J("delete")},children:"Delete"}),Object(Y.jsx)(De.a,{onClick:function(){return J("colorize")},children:"Change Color"})]})]}))})}},([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)})))};return Object(Y.jsx)(Re.a,{onDragEnd:function(t){t.destination&&t.destination.index!==t.source.index&&i(y({which:e.whichSchedule,move:[t.source.index,t.destination.index]}))},children:Object(Y.jsx)(Re.c,{droppableId:e.whichSchedule,children:function(e){return Object(Y.jsx)(j.a,Object(Ae.a)(Object(Ae.a)({ref:e.innerRef},e.droppableProps),{},{sx:{width:1},minHeight:1,direction:"column",alignItems:"stretch",children:l.map(K)}))}})})}function ze(e,t,n){var c="hsl(";return c+=e+",",c+=t+"%,",c+=n+"%)"}function Le(){var e=Object(Pe.d)(T);Je.navFont;function t(t){var n=function(e,t){var n="0000-01-01T"+e+":00";return Te()(n).add(t,"minute")}(e,60*t).format("h:mm a");return Object(Y.jsx)(d.a,{id:"timecell",sx:{minHeight:"calc(calc(100vh) / 13)",pt:"0.25em",px:"0.5em",m:"1px",backgroundColor:"var(--spotify-3)"},children:Object(Y.jsx)(b.a,{id:"timetext",sx:{fontWeight:400,width:"max-content",color:"white",margin:"0 auto 0"},children:n})},t)}function n(){return Object(Y.jsx)(j.a,{direction:"column",justifyContent:"flex-start",alignItems:"stretch",children:Object(m.a)(Array(11)).map((function(e,n){return t(n)}))})}return Object(Y.jsxs)(j.a,{id:"schedulezone",direction:"row",justifyContent:"flex-start",alignItems:"stretch",sx:{mt:3,maxWidth:"6in",mx:"auto"},children:[Object(Y.jsx)(n,{}),Object(Y.jsxs)(h.a,{container:!0,children:[Object(Y.jsx)(h.a,{item:!0,xs:1,children:Object(Y.jsx)(j.a,{direction:"row",justifyContent:"center",alignItems:"stretch",height:1,width:1,children:Object(Y.jsx)(Ue,{lockState:!1,whichSchedule:"expectation"})})}),Object(Y.jsx)(h.a,{item:!0,xs:11,children:Object(Y.jsx)(j.a,{direction:"row",justifyContent:"center",alignItems:"stretch",height:1,width:1,children:Object(Y.jsx)(Ve,{whichSchedule:"expectation",lockState:!1})})})]})]})}n(284);var We="clamp(7mm, 6vh, 14mm)";function Ge(){var e=Object(s.e)().pathname;return Object(c.useEffect)((function(){window.scrollTo(0,0)}),[e]),null}var Je={nav:"clamp(9mm, 8vh, 18mm)",tab:We,navFont:"clamp(4mm, 3vh, 8mm)",buttonFont:"clamp(3mm, 2vh, 4mm)"};var Xe=Object(se.a)({palette:{mode:"dark"}});var Ye=function(){return Object(Y.jsx)(de.a,{theme:Xe,children:Object(Y.jsxs)(l.a,{children:[Object(Y.jsx)(le.a,{}),Object(Y.jsx)(Ge,{}),Object(Y.jsxs)(u.a,{sx:{w:1,minHeight:"100vh"},children:[Object(Y.jsx)(ke,{}),Object(Y.jsxs)(s.c,{children:[Object(Y.jsx)(s.a,{exact:!0,strict:!0,path:"/time",element:Le()}),Object(Y.jsx)(s.a,{exact:!0,strict:!0,path:"/about",element:Object(Y.jsx)(d.a,{sx:{m:2},children:Object(Y.jsxs)(pe.a,{elevation:4,children:[Object(Y.jsx)(j.a,{direction:"column",justifyContent:"flex-start",alignItems:"stretch",spacing:2,sx:{w:1,p:2},children:Object(Y.jsx)(ye,{data:Se[2].projects[0]})}),Object(Y.jsxs)(u.a,{sx:{p:1.5,m:2},elevation:1,children:[Object(Y.jsx)(b.a,{variant:"h6",sx:{m:1,mb:.5},children:"Overview"}),Object(Y.jsx)(b.a,{sx:{m:1,mb:.5},children:"You are currently accessing www.elerius.ga, a public website hosted by Nicholas Gardella. Originally written using Angular, Elerius has been fully converted to React.js."}),Object(Y.jsx)(b.a,{variant:"h6",sx:{m:1,mb:.5},children:"Construction"}),Object(Y.jsx)(b.a,{sx:{m:1,mb:.5},children:"Elerius GA is built using nginx and is containerized using Docker. Reverse proxying protects the server from attacks and HTTPS security is enforced end-to-end."}),Object(Y.jsx)(b.a,{variant:"h6",sx:{m:1,mb:.5},children:"Purpose"}),Object(Y.jsx)(b.a,{sx:{m:1,mb:.5},children:"This application provides a location for publicly accessible tools produced by Nicholas Gardella. Additionally, you can peruse other work products not related to web development."})]})]})})}),Object(Y.jsx)(s.a,{exact:!0,strict:!0,path:"/",element:Ce()}),Object(Y.jsx)(s.a,{exact:!0,strict:!0,path:"/*",element:Object(Y.jsx)(b.a,{sx:{m:2},children:"Coming soon!"})})]})]})]})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(Object(Y.jsx)(i.a.StrictMode,{children:Object(Y.jsx)(Pe.a,{store:M,children:Object(Y.jsx)(Ye,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[168,1,2]]]);
//# sourceMappingURL=main.fbddee22.chunk.js.map