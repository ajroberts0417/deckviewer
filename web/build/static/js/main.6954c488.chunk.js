(this.webpackJsonpdeckviewer=this.webpackJsonpdeckviewer||[]).push([[0],{217:function(e,a,n){"use strict";n.r(a);var t=n(0),o=n.n(t),r=n(77),c=n.n(r),l=(n(86),n(80)),i=n(78),s=n.n(i),u=(n(87),n(79)),d=n.n(u);var p=function(){var e=Object(t.useState)([]),a=Object(l.a)(e,2),n=a[0],r=a[1];return console.log("REACT STATE DECK: ",n),Object(t.useEffect)((function(){var e=new d.a({apiKey:"XXXXXXXXX"}).base("appr7aUJe07RDR9Ho"),a=[];e("Card").select({maxRecords:10,view:"Grid view"}).eachPage((function(e,n){e.forEach((function(e){a.push(e),console.log("Retrieved",e)})),n()}),(function(e){e?console.error(e):(console.log(a),r(a))}))}),[]),o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),o.a.createElement("p",null,"Edit ",o.a.createElement("code",null,"src/App.js")," and save to reload."),o.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React"),o.a.createElement("div",null,"blah blah blah"),n.map((function(e){return o.a.createElement("div",null,JSON.stringify(e.fields))}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},78:function(e,a,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},81:function(e,a,n){e.exports=n(217)},86:function(e,a,n){},87:function(e,a,n){}},[[81,1,2]]]);
//# sourceMappingURL=main.6954c488.chunk.js.map