(this["webpackJsonpsalute-demo-app"]=this["webpackJsonpsalute-demo-app"]||[]).push([[0],{106:function(t,e,a){},107:function(t,e,a){},108:function(t,e,a){},143:function(t,e,a){},144:function(t,e,a){},145:function(t,e,a){},146:function(t,e,a){},166:function(t,e,a){"use strict";a.r(e);var s=a(2),n=a(0),i=a.n(n),r=a(37),c=a.n(r),o=(a(74),a(15)),l=a.n(o),u=a(16),m=a(8),p=a(9),d=a(11),h=a(10),f=a(61),j=a(62),b=a(1),y=a(24),g=a(3),v=a(67);a(106),a(107);function O(t){return Object(s.jsx)("div",{className:"name-item",children:Object(s.jsx)("p",{className:t.from,children:t.name})})}var S=a(27);var x=function(t,e){var a,s=e;if((t=t.toLowerCase()).length<=1)return 1;if(t.includes(" "))return 2;if(!function(t){var e,a=Object(S.a)(t);try{for(a.s();!(e=a.n()).done;){var s=e.value;if(!(s.codePointAt()<=1103&&s.codePointAt()>=1072||1105===s.codePointAt()))return!1}}catch(n){a.e(n)}finally{a.f()}return!0}(t))return 3;if(0!==s.length){if(a=function(t){for(var e,a=!0,s="\u044c\u044a\u044b",n=t.length-1;n>0;n--){a=!0;var i,r=Object(S.a)(s);try{for(r.s();!(i=r.n()).done;){var c=i.value;if(t[n]===c){a=!1;break}}}catch(o){r.e(o)}finally{r.f()}if(a){e=t[n];break}}return e}(s[s.length-1].name.toLowerCase()),t[0]!==a)return a;if(function(t,e){var a,s=Object(S.a)(e);try{for(s.s();!(a=s.n()).done;){var n=a.value;if(t.toLowerCase()===n.name.toLowerCase())return!0}}catch(i){s.e(i)}finally{s.f()}return!1}(t,s))return 4}return 0},k=a(7),C=a(6),w=(a(108),!1),P=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(t){var s;return Object(m.a)(this,a),(s=e.call(this,t)).updateScroll=function(){var t=document.getElementById("block");t.scrollTop=t.scrollHeight},s.toNameFormat=function(t){return 0!==t.length&&(t=(t=t.toLowerCase())[0].toUpperCase()+t.slice(1)),t},s.sayName=function(t){if(!s.props.isPause)if(s.state.lastSayPlayer)s.state.assistantSaing||s.assistantSayName(s.state.nameForAssistant);else{t=s.toNameFormat(t);var e=s.props.messages,a=x(t,e);if(0===a){e.push({name:t,from:"from-me"});var n=e[e.length-1].name;return n=n[n.length-1].toUpperCase()+"\u0430",s.setState({textName:s.tfRef.current.value,lastSayPlayer:!0,nameForAssistant:n}),s.props.allowPause(!0),s.props.updateCount(!0),void s.createAssistantSayTime()}if(1===a||2===a||3===a||4===a)return void s.props.assistant.sendData({action:{action_id:a}});s.props.assistant.sendData({action:{action_id:"firstSym",parameters:{sym:a.toUpperCase()}}})}},s.getRandomInt=function(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t))+t},s.createAssistantSayTime=function(){var t=s.getRandomInt(0,102);console.log(t),t=t>100?-1:10+t%10,console.log(t),s.props.setAssistantSayTime(t),s.setState({assistantSaing:!0})},s.assistantSayName=function(t){w=!0,console.log("assistantSayName"),s.props.assistant.sendData({action:{action_id:"assistantSay",parameters:{name:t}}}),s.props.messages.push({name:t,from:"from-them"}),s.setState({lastSayPlayer:!1,nameForAssistant:"",assistantSaing:!1}),s.props.updateCount(!1),s.props.allowPause(!1),s.updateScroll()},s.click=function(){s.tfRef.current.value="",s.sayName(s.state.textName),w=!0},s.enters=function(t){"Enter"===t.code&&s.click()},s.tfRef=i.a.createRef(),s.state={textName:"",lastSayPlayer:!1,assistantSaing:!1,nameForAssistant:"",isPause:!1},s}return Object(p.a)(a,[{key:"componentDidUpdate",value:function(){w&&this.updateScroll(),w=!1}},{key:"shouldComponentUpdate",value:function(t,e){return this.props.restarted!==t.restarted?(console.log("restart from chat"),this.setState({textName:"",lastSayPlayer:!1,assistantSaing:!1,nameForAssistant:"",isPause:!1}),!1):t.assistantSay?(console.log("assistantSay from chat = ".concat(this.props.assistantSay)),this.assistantSayName(this.state.nameForAssistant),t.assistantSaied(),!1):this.props.newname!==t.newname?(this.sayName(t.newname),w=!0,!0):this.props.messages!==t.messages||this.state!==e}},{key:"render",value:function(){var t=this,e=this.props.messages.map((function(t,e){return Object(s.jsx)(O,{name:t.name,from:t.from},e)}));return Object(s.jsxs)("div",{className:"chat",children:[Object(s.jsx)("div",{className:"subChat",id:"block",children:e}),Object(s.jsx)(k.TextField,{id:"tf",ref:this.tfRef,value:this.state.textName,className:"editText",label:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",onChange:function(e){return t.setState({textName:e.target.value})},onKeyDown:this.enters,contentRight:Object(s.jsx)(k.ActionButton,{id:"ab",size:"l",view:"primary",onClick:this.click,contentRight:Object(s.jsx)(C.f,{})})})]})}}]),a}(i.a.Component),N=(a(143),a.p+"static/media/logo_salut.b0e7eb26.png"),A=a.p+"static/media/logo_user.cc672939.png",L=a.p+"static/media/versus.3401d851.png",T=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){return Object(m.a)(this,a),e.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){var t;switch(this.props.assistant){case"sber":t="\u0421\u0431\u0435\u0440";break;case"eva":t="\u0410\u0444\u0438\u043d\u0430";break;case"joy":t="\u0414\u0436\u043e\u0439";break;default:t="\u0421\u0431\u0435\u0440"}return Object(s.jsxs)("div",{className:"header_container",children:[Object(s.jsxs)("div",{className:"info-container",children:[Object(s.jsx)("img",{src:N,className:"logo-header"}),Object(s.jsx)("div",{className:"player-name",children:t})]}),Object(s.jsx)("div",{className:"info-container",children:Object(s.jsx)("img",{src:L,className:"logo-header"})}),Object(s.jsxs)("div",{className:"info-container",children:[Object(s.jsx)("img",{src:A,className:"logo-header"}),Object(s.jsx)("div",{className:"player-name",children:this.props.nickname})]})]})}}]),a}(i.a.Component),_=(a(144),{info:{color:"green"},warning:{color:"orange",threshold:10},alert:{color:"red",threshold:5}}),B=20,E=0,G=_.info.color,F=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(t){var s;return Object(m.a)(this,a),(s=e.call(this,t)).formatTimeLeft=function(t){var e=Math.floor(t/60),a=t%60;return a<10&&(a="0".concat(a)),"".concat(e,":").concat(a)},s.calculateTimeFraction=function(){var t=s.state.timeLeft/B;return t-.05*(1-t)},s.setCircleDasharray=function(){var t="".concat((283*s.calculateTimeFraction()).toFixed(0)," 283");document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray",t)},s.setRemainingPathColor=function(t){var e=_.alert,a=_.warning,s=_.info;t<=e.threshold?(document.getElementById("base-timer-path-remaining").classList.remove(a.color),document.getElementById("base-timer-path-remaining").classList.add(e.color)):t<=a.threshold?(document.getElementById("base-timer-path-remaining").classList.remove(s.color),document.getElementById("base-timer-path-remaining").classList.add(a.color)):t>a.threshold&&(document.getElementById("base-timer-path-remaining").classList.remove(e.color),document.getElementById("base-timer-path-remaining").classList.remove(a.color),document.getElementById("base-timer-path-remaining").classList.add(s.color))},s.startTimer=function(){setInterval((function(){s.state.isEnd||(s.props.isPause||(E=E>=B?0:E+=1,s.setState({timeLeft:B-E,isEnd:!1}),s.props.assistantSayTime===s.state.timeLeft&&s.props.assistantSay(),document.getElementById("base-timer-label").innerHTML=s.formatTimeLeft(s.state.timeLeft),s.setRemainingPathColor(s.state.timeLeft)),s.state.timeLeft<=0&&(s.setState({timeLeft:0,isEnd:!0}),s.props.endGame()),s.setCircleDasharray())}),1e3)},s.endGame=function(){s.props.endGame()},s.restartTimer=function(){E=0,s.setState({timeLeft:B,isEnd:!1})},s.startTimer(),s.state={timeLeft:B,isEnd:!1,isRestart:!1,isPause:s.props.isPause},s}return Object(p.a)(a,[{key:"shouldComponentUpdate",value:function(t,e){return this.props.update!==t.update&&(this.restartTimer(),!0)}},{key:"render",value:function(){var t="base-timer__path-remaining ".concat(G);return console.log("timer updated"),Object(s.jsxs)("div",{className:"base-timer",children:[Object(s.jsx)("svg",{className:"base-timer__svg",viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",children:Object(s.jsxs)("g",{className:"base-timer__circle",children:[Object(s.jsx)("circle",{className:"base-timer__path-elapsed",cx:"50",cy:"50",r:"45"}),Object(s.jsx)("path",{id:"base-timer-path-remaining",strokeDasharray:"283",className:t,d:"\r M 50, 50\r m -45, 0\r a 45,45 0 1,0 90,0\r a 45,45 0 1,0 -90,0\r "})]})}),Object(s.jsx)("span",{id:"base-timer-label",className:"base-timer__label",children:this.formatTimeLeft(this.state.timeLeft)})]})}}]),a}(i.a.Component),R=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){var t;Object(m.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).endGame=function(){t.props.endGame()},t.assistantSay=function(){t.props.assistantSay()},t}return Object(p.a)(a,[{key:"render",value:function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)(k.Badge,{text:"\u0421\u043a\u0430\u0437\u0430\u043d\u043e \u0438\u043c\u0451\u043d: ".concat(this.props.\u0441ount),size:"l",style:{width:"150px",margin:"30px auto"}}),Object(s.jsx)(F,{endGame:this.endGame,update:this.props.update,isPause:this.props.isPause,assistantSayTime:this.props.assistantSayTime,assistantSay:this.assistantSay})]})}}]),a}(i.a.Component),I=(a(145),function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){var t;Object(m.a)(this,a);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(t=e.call.apply(e,[this].concat(i))).updatePauseButton=function(){return t.props.isPause?Object(s.jsx)(C.i,{size:"l"}):Object(s.jsx)(C.h,{size:"l"})},t.clickPause=function(){t.props.allowPause&&t.props.pause()},t.clickRestart=function(){t.props.restart()},t.clickClose=function(){setTimeout((function(){console.log("closed"),t.props.assistant.close()}),1)},t}return Object(p.a)(a,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:"controllers-container",children:[Object(s.jsx)(k.Button,{style:{marginRight:"20px"},size:"l",view:"primary",pin:"circle-circle",contentLeft:this.updatePauseButton(),onClick:this.clickPause}),Object(s.jsx)(k.Button,{size:"l",view:"warning",pin:"circle-circle",contentLeft:Object(s.jsx)(C.k,{size:"l"}),onClick:this.clickRestart}),Object(s.jsx)(k.Button,{style:{marginLeft:"20px"},size:"l",view:"critical",pin:"circle-circle",contentLeft:Object(s.jsx)(C.d,{size:"l"}),onClick:this.clickClose})]})}}]),a}(i.a.Component)),z=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){var t;Object(m.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).endGame=function(){t.props.endGame()},t.assistantSay=function(){t.props.assistantSay()},t}return Object(p.a)(a,[{key:"render",value:function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)(T,{assistant:this.props.character,nickname:this.props.nickname}),Object(s.jsx)(R,{"\u0441ount":this.props.count,endGame:this.endGame,update:this.props.update,isPause:this.props.isPause,assistantSayTime:this.props.assistantSayTime,assistantSay:this.assistantSay}),Object(s.jsx)(I,{restart:this.props.restart,assistant:this.props.assistant,allowPause:this.props.allowPause,pause:this.props.pause,isPause:this.props.isPause})]})}}]),a}(i.a.Component),D=(a(146),function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){var t;Object(m.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).clickRestart=function(){t.props.restart()},t.clickClose=function(){setTimeout((function(){console.log("closed"),t.props.assistant.close()}),1)},t}return Object(p.a)(a,[{key:"render",value:function(){var t=this.props.count;return Object(s.jsx)(k.Card,{className:"card-container",style:{zIndex:21},children:Object(s.jsx)(k.CardBody,{children:Object(s.jsxs)(k.CardContent,{children:[Object(s.jsx)(k.CardHeadline1,{children:this.props.isWin?"\u0412\u044b \u043f\u043e\u0431\u0435\u0434\u0438\u043b\u0438!":"\u0412\u044b \u043f\u0440\u043e\u0438\u0433\u0440\u0430\u043b\u0438!"}),Object(s.jsx)(k.Badge,{text:"\u0421\u043a\u0430\u0437\u0430\u043d\u043e \u0438\u043c\u0451\u043d: ".concat(t),size:"l",style:{width:"150px",margin:"30px auto"}}),Object(s.jsxs)("div",{className:"btn-container",children:[Object(s.jsx)(k.Button,{style:{marginRight:"15px"},size:"l",view:"warning",pin:"circle-circle",contentLeft:Object(s.jsx)(C.k,{size:"l"}),onClick:this.clickRestart}),Object(s.jsx)(k.Button,{style:{marginLeft:"15px"},size:"l",view:"critical",pin:"circle-circle",contentLeft:Object(s.jsx)(C.d,{size:"l"}),onClick:this.clickClose})]})]})})})}}]),a}(i.a.Component));a(21);function U(){var t=Object(f.a)(["\n    html:root {\n        min-height: 100vh;\n        color: ",";\n        background-color: ",";\n        background-image: ",";\n    }\n"]);return U=function(){return t},t}var W=Object(b.createGlobalStyle)(y.darkEva),M=Object(b.createGlobalStyle)(y.darkSber),H=Object(b.createGlobalStyle)(y.darkJoy),J=Object(b.createGlobalStyle)(U(),g.text,g.background,g.gradient),K="",q=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(t){var s,n;return Object(m.a)(this,a),(s=e.call(this,t)).updateCount=function(t){s.setState({nameCount:s.state.nameCount+1,timerUpdate:!s.state.timerUpdate,playerWin:t})},s.endGame=Object(u.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.setState({isEndGame:!0,isPause:!0});case 2:return t.next=4,s.assistant.sendData({action:{action_id:s.state.playerWin?"assistantLose":"assistantWin"}});case 4:case"end":return t.stop()}}),t)}))),s.restart=function(){console.log("restart from App"),K="",s.setState({messages:[],nameCount:0,isEndGame:!1,restarted:!s.state.restarted,timerUpdate:!s.state.timerUpdate,playerWin:!1,isPause:!1,pauseAllow:!0,assistantSayTime:-1,assistantSay:!1})},s.pause=function(){s.state.pauseAllow&&s.setState({isPause:!s.state.isPause})},s.allowPause=function(t){s.setState({pauseAllow:t})},s.assistantSay=function(){s.setState({assistantSay:!0,assistantSayTime:-1})},s.assistantSaied=function(){s.setState({assistantSay:!1})},s.setAssistantSayTime=function(t){s.setState({assistantSayTime:t})},s.state={messages:[],nameCount:0,character:"sber",isEndGame:!1,restarted:!1,timerUpdate:!1,playerWin:!1,isPause:!0,pauseAllow:!0,assistantSayTime:-1,assistantSay:!1,nickname:"player"},s.assistant=(n=function(){return s.getStateForAssistant()},Object(j.createAssistant)({getState:n})),s.assistant.on("start",(function(t){s.assistant.sendData({action:{action_id:"addNickname"}}),console.log("assistant.on(start)",t)})),s.assistant.on("data",(function(t){switch(t.type){case"initSub":t.sub;break;case"character":"eva"===t.character.id&&(K="\u0410\u0444\u0438\u043d\u0430"),"joy"===t.character.id&&(K="\u0414\u0436\u043e\u0439"),s.setState({character:t.character.id})}var e=t.action;s.dispatchAssistantAction(e)})),s}return Object(p.a)(a,[{key:"getStateForAssistant",value:function(){return{item_selector:{items:this.state.messages.map((function(t,e){return{name:t.name,from:t.from}}))}}}},{key:"dispatchAssistantAction",value:function(t){if(console.log("dispatchAssistantAction",t),t)switch(t.type){case"add_nickname":var e=t.data;console.log("\u0418\u0433\u0440\u043e\u0432\u043e\u0435 \u0438\u043c\u044f: "+e),e.length<15?(console.log("Correct nick"),this.setState({nickname:t.data})):this.assistant.sendData({action:{action_id:"repeat"}});break;case"add_name":K=t.data,this.setState(this.state);break;case"restart_game":this.restart();break;case"pause_game":this.pause();break;case"continue_game":this.state.isPause&&this.pause()}}},{key:"render",value:function(){var t=this;return Object(s.jsxs)(v.DeviceThemeProvider,{children:[Object(s.jsx)(J,{}),function(){switch(t.state.character){case"sber":return Object(s.jsx)(M,{});case"eva":return Object(s.jsx)(W,{});case"joy":return Object(s.jsx)(H,{});default:return}}(),Object(s.jsx)("div",{className:"fill-container",style:{display:this.state.isEndGame?"flex":"none"},children:this.state.isEndGame?Object(s.jsx)(D,{count:this.state.nameCount,restart:this.restart,assistant:this.assistant,isWin:this.state.playerWin}):Object(s.jsx)("div",{})}),Object(s.jsxs)("div",{className:"main-container",children:[Object(s.jsx)(P,{newname:K,updateCount:this.updateCount,assistant:this.assistant,messages:this.state.messages,restarted:this.state.restarted,isPause:this.state.isPause,allowPause:this.allowPause,setAssistantSayTime:this.setAssistantSayTime,assistantSaied:this.assistantSaied,assistantSay:this.state.assistantSay}),Object(s.jsx)("div",{className:"statistic-container",children:Object(s.jsx)(z,{character:this.state.character,count:this.state.nameCount,endGame:this.endGame,restart:this.restart,pause:this.pause,isPause:this.state.isPause,allowPause:this.state.pauseAllow,update:this.state.timerUpdate,assistant:this.assistant,assistantSayTime:this.state.assistantSayTime,assistantSay:this.assistantSay,nickname:this.state.nickname})})]})]})}}]),a}(i.a.Component),Q=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,167)).then((function(e){var a=e.getCLS,s=e.getFID,n=e.getFCP,i=e.getLCP,r=e.getTTFB;a(t),s(t),n(t),i(t),r(t)}))};c.a.render(Object(s.jsx)(q,{}),document.getElementById("root")),Q()},74:function(t,e,a){}},[[166,1,2]]]);
//# sourceMappingURL=main.ad273a9b.chunk.js.map