(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{7108:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return y}});var t=i(9008),r=i(7294),o=i(5769),a=i(6010),l=i(882),s=i(7803),d=i(5893);function c(e){var n=e.musume,i=e.weaponIdToTypeMapping,t=(0,r.useContext)(s.ZP),o=m();function l(){t.onChangeOwn(n.id,!t.owns.includes(n.id))}var c="other";n.weapon in i&&(c=i[n.weapon]);var g=function(e,n){var i="000000000"+e.toString();return i.substr(i.length-n)}(n.id,4);t.owns.includes(n.id);return(0,d.jsxs)("a",{className:(0,a.Z)(o.container,o.containerReadOnly),href:"https://scre.swiki.jp/index.php?"+n.name,target:"_blank",rel:"noreferrer",children:[(0,d.jsx)("img",{className:(0,a.Z)(o.musumeIcon,o.musumeIconReadOnly),src:"musume_images/"+g+".png",alt:n.name,onClick:l}),(0,d.jsxs)("div",{className:(0,a.Z)(o.textContainer,o.textContainerReadOnly,"melee"===c&&o.textContainerMelee,"ranged"===c&&o.textContainerRanged,"both"===c&&o.textContainerBoth,"other"===c&&o.textContainerOther),children:[(0,d.jsx)("div",{className:o.musumeId,children:g}),(0,d.jsx)("div",{className:o.musumeName,children:n.name})]})]})}var m=(0,o.Z)({container:{display:"inline-flex",flexDirection:"column",alignItems:"center",width:"72px",borderStyle:"solid",borderColor:"#888888",borderWidth:"1px",borderRadius:"4px",margin:"3px",overflow:"hidden",textDecoration:"none",color:"#323232"},containerReadOnly:{transition:"0.2s","&:hover":{boxShadow:"0px 0px 10px 2px rgba(136, 136, 136, 0.7)"},"&:hover $textContainer":{color:"black",textShadow:"0px 0px 1px rgba(50, 50, 50, 0.5)"}},musumeIcon:{width:"72px",height:"72px",cursor:"pointer",transition:"0.2s",filter:"grayscale(75%) brightness(30%)","&:hover":{filter:"grayscale(75%) brightness(40%)"}},musumeIconOwn:{filter:"brightness(90%)","&:hover":{filter:"none"}},musumeIconReadOnly:{filter:"none","&:hover":{filter:"none"}},textContainer:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",padding:"2px",filter:"grayscale(40%) brightness(70%)",transition:"0.2s",textDecoration:"none",color:"#323232"},textContainerReadOnly:{filter:"none"},textContainerWritable:{"&:hover":{color:"black",textShadow:"0px 0px 1px rgba(50, 50, 50, 0.5)"}},textContainerOwn:{filter:"none"},textContainerMelee:{backgroundColor:"#f7c9d4"},textContainerRanged:{backgroundColor:"#cbeaf6"},textContainerBoth:{backgroundImage:"linear-gradient(to right, #f7c9d4, #f7c9d4, #cbeaf6, #cbeaf6)"},textContainerOther:{backgroundColor:"#f6f6ca"},musumeId:{textAlign:"center"},musumeName:{textAlign:"center"}}),g=i(2809);function h(e){var n=e.filters,i=e.selections,t=e.imageUriBase,r=e.onSelect,o=u();return(0,d.jsx)("div",{className:o.container,children:n.map((function(e){return(0,d.jsx)("div",{className:(0,a.Z)(o.rowContainer,(0,g.Z)({},o.selected,i.includes(e.id))),style:{backgroundColor:e.color},onClick:function(){r(e.id)},children:void 0!==t?(0,d.jsx)("img",{className:o.img,src:t+"/"+e.id+".png",alt:""}):(0,d.jsx)("div",{className:o.txt,children:e.name})},e.id)}))})}var u=(0,o.Z)({container:{display:"flex",flexDirection:"column","@media (max-width: 768px)":{display:"block",lineHeight:"1"}},rowContainer:{width:"35px",height:"22px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:"1px",marginBottom:"1px",overflowX:"hidden",borderRadius:"5px",filter:"brightness(60%)",userSelect:"none",cursor:"pointer",transition:"0.2s","&:hover":{filter:"brightness(75%)"},"@media (max-width: 768px)":{display:"inline-flex",marginLeft:"2px",marginRight:"2px"}},selected:{filter:"brightness(95%)","&:hover":{filter:"brightness(105%)"}},img:{height:"auto",maxHeight:"100%"},txt:{whiteSpace:"nowrap",color:"white"}}),p=JSON.parse('[{"id":"plain","name":"\u5e73","color":"rgb(0, 153, 75)"},{"id":"hill","name":"\u5e73\u5c71","color":"rgb(102, 153, 0)"},{"id":"mountain","name":"\u5c71","color":"rgb(153, 75, 0)"},{"id":"water","name":"\u6c34","color":"rgb(0, 153, 153)"},{"id":"hell","name":"\u5730\u7344","color":"rgb(75, 0, 153)"},{"id":"none","name":"\u7121","color":"rgb(75, 75, 75)"}]'),x=JSON.parse('[{"id":"hokkaido","name":"\u5317\u6d77\u9053","color":"#7058a3"},{"id":"touhoku","name":"\u6771\u5317","color":"#7058a3"},{"id":"kantou","name":"\u95a2\u6771","color":"#7058a3"},{"id":"koushinetsu","name":"\u7532\u4fe1\u8d8a","color":"#7058a3"},{"id":"hokuriku","name":"\u5317\u9678","color":"#7058a3"},{"id":"toukai","name":"\u6771\u6d77","color":"#7058a3"},{"id":"kinki","name":"\u8fd1\u757f","color":"#7058a3"},{"id":"chuugoku","name":"\u4e2d\u56fd","color":"#7058a3"},{"id":"shigoku","name":"\u56db\u56fd","color":"#7058a3"},{"id":"kyuushuu","name":"\u4e5d\u5dde","color":"#7058a3"},{"id":"okinawa","name":"\u6c96\u7e04","color":"#7058a3"},{"id":"kaigai","name":"\u6d77\u5916","color":"#7058a3"},{"id":"sonohoka","name":"\u305d\u306e\u4ed6","color":"#7058a3"},{"id":"ikai","name":"\u7570\u754c","color":"#7058a3"}]'),f=JSON.parse('[{"id":"sword","name":"\u5200","color":"rgb(213, 28, 28)","type":"melee"},{"id":"spear","name":"\u69cd","color":"rgb(210, 91, 12)","type":"melee"},{"id":"hammer","name":"\u69cc","color":"rgb(210, 12, 157)","type":"melee"},{"id":"shield","name":"\u76fe","color":"rgb(28, 81, 5)","type":"melee"},{"id":"gaunlets","name":"\u62f3","color":"rgb(163, 73, 164)","type":"melee"},{"id":"scythe","name":"\u938c","color":"rgb(22, 44, 44)","type":"melee"},{"id":"mace","name":"\u68cd","color":"rgb(91, 247, 54)","type":"melee"},{"id":"bow","name":"\u5f13","color":"rgb(38, 86, 208)","type":"ranged"},{"id":"crossbow","name":"\u77f3","color":"rgb(48, 43, 178)","type":"ranged"},{"id":"gun","name":"\u9244","color":"rgb(12, 156, 148)","type":"ranged"},{"id":"cannon","name":"\u5927","color":"rgb(56, 54, 55)","type":"ranged"},{"id":"dancing","name":"\u6b4c","color":"rgb(60, 173, 10)","type":"ranged"},{"id":"spell","name":"\u8853","color":"rgb(11, 140, 194)","type":"ranged"},{"id":"bell","name":"\u9234","color":"rgb(89, 12, 148)","type":"ranged"},{"id":"staff","name":"\u6756","color":"rgb(98, 160, 143)","type":"ranged"},{"id":"oonusa","name":"\u7953","color":"rgb(139, 0, 0)","type":"ranged"},{"id":"book","name":"\u672c","color":"rgb(157, 171, 41)","type":"ranged"},{"id":"throwing","name":"\u6295","color":"rgb(247, 166, 60)","type":"both"},{"id":"whip","name":"\u97ad","color":"rgb(255, 125, 203)","type":"both"},{"id":"other","name":"\u4ed6","color":"rgb(127, 127, 127)","type":"other"}]');function b(){for(var e=w(),n=(0,r.useContext)(s.ZP),i=(0,r.useState)(!1),t=i[0],o=i[1],m=(0,l.Z)("(max-width:768px)"),g=(0,r.useState)([]),u=g[0],b=g[1],y=(0,r.useState)([]),v=y[0],k=y[1],C=(0,r.useState)([]),j=C[0],S=C[1],N=(0,r.useState)([]),I=N[0],O=N[1],R=[],_=1;_<=7;_++)R.push({id:_.toString(),name:"\u2605 "+_.toString(),color:"#e0815e"});function B(e,n){return function(i){var t=!e.includes(i),r=e.filter((function(e){return e!==i}));t&&r.push(i),n(r)}}function Z(e){o(!1)}var T={};return f.forEach((function(e){T[e.id]=e.type})),(0,d.jsxs)("div",{className:e.container,children:[m&&(0,d.jsx)("div",{className:(0,a.Z)(e.mask,t&&e.maskShown),onClick:Z}),(0,d.jsxs)("div",{className:(0,a.Z)(e.filtersContainer,m&&t&&e.filtersContainerOpened),children:[(0,d.jsxs)("div",{className:e.filtersScrollContainer,children:[(0,d.jsx)(h,{filters:p,selections:v,onSelect:B(v,k)}),(0,d.jsx)("div",{className:e.divider}),(0,d.jsx)(h,{filters:f,selections:j,imageUriBase:"weapon_images",onSelect:B(j,S)}),(0,d.jsx)("div",{className:e.divider}),(0,d.jsx)(h,{filters:R,selections:u,onSelect:B(u,b)}),(0,d.jsx)("div",{className:e.divider}),(0,d.jsx)(h,{filters:x,selections:I,onSelect:B(I,O)})]}),m&&(0,d.jsxs)("div",{className:e.filterButtonContainer,onClick:t?Z:function(e){o(!0)},children:[(0,d.jsx)("svg",{viewBox:"0 0 512 512",className:(0,a.Z)(e.filterIcon,t&&e.filterIconOpened),children:(0,d.jsx)("g",{children:(0,d.jsx)("polygon",{points:"440.189,92.085 256.019,276.255 71.83,92.085 0,163.915 256.019,419.915 512,163.915"})})}),(0,d.jsx)("div",{className:e.filterButtonText,children:"\u7d5e\u8fbc"})]})]}),(0,d.jsx)("div",{className:e.itemsContainer,children:n.musumes.filter((function(e){return 0===v.length||0!==e.terrains.filter((function(e){return v.includes(e)})).length})).filter((function(e){return 0===j.length||j.includes(e.weapon)})).filter((function(e){return 0===u.length||u.includes(e.rarity.toString())})).filter((function(e){return 0===I.length||I.includes(e.location)})).map((function(e){return(0,d.jsx)(c,{musume:e,weaponIdToTypeMapping:T},e.id)}))})]})}var w=(0,o.Z)({container:{display:"flex",flexDirection:"row",alignItems:"stretch",width:"100vw",height:"100vh"},filtersContainer:{minHeight:"0px",minWidth:"40px",height:"100%",width:"40px",borderColor:"#888888",borderRightStyle:"solid",borderRightWidth:"1px",display:"flex",flexDirection:"column",alignItems:"stretch","@media (max-width: 768px)":{transition:"0.2s",position:"fixed",width:"100%",height:"auto",maxHeight:"75%",backgroundColor:"rgba(230, 230, 230, 0.8)",borderRightStyle:"none",borderBottomStyle:"solid",borderBottomWidth:"1px",left:"0",top:"0",transform:"translateY(calc(25px - 100%))"}},filtersContainerOpened:{transform:"translateY(0)",backgroundColor:"#e6e6e6"},filtersScrollContainer:{display:"flex",flexDirection:"column",alignItems:"center",height:"100%",overflowY:"auto",overflowX:"hidden",paddingTop:"5px",paddingBottom:"5px",boxSizing:"border-box","&::-webkit-scrollbar":{display:"none"},"@media (max-width: 768px)":{alignItems:"flex-start",padding:"5px",height:"auto"}},divider:{marginTop:"3px",marginBottom:"3px",minHeight:"1px",height:"1px",backgroundColor:"transparent",width:"100%"},filterButtonContainer:{height:"25px",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",transition:"0.2s",cursor:"pointer","&:hover":{backgroundColor:"rgba(0, 0, 0, 0.1)"}},filterIcon:{fill:"#888888",display:"block",minWidth:"25px",minHeight:"25px",width:"25px",height:"25px",transition:"0.2s",marginRight:"10px"},filterIconOpened:{transform:"rotate(180deg)"},filterButtonText:{fontSize:"14px",lineHeight:"1"},itemsContainer:{minHeight:"0px",minWidth:"0px",height:"100%",flex:"1",overflowY:"auto",boxSizing:"border-box",padding:"3px",textAlign:"center","&::-webkit-scrollbar-thumb":{backgroundColor:"#888888"},"&::-webkit-scrollbar-thumb:hover":{backgroundColor:"#707070"},"&::-webkit-scrollbar":{width:"8px",backgroundColor:"#cdcdcd"},"@media (max-width: 768px)":{paddingTop:"25px"}},mask:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.5)",transition:"opacity 0.2s",visibility:"hidden",opacity:"0"},maskShown:{visibility:"visible",opacity:"1"}});function y(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.default,{children:(0,d.jsx)("title",{children:"\u57ce\u30d7\u30edRE\uff1a\u57ce\u5a18\u56f3\u9451"})}),(0,d.jsx)(b,{})]})}},5301:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(7108)}])}},function(e){e.O(0,[774,956,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);