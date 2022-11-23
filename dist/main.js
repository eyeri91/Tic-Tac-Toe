(()=>{"use strict";const e=function(){const e={};return{subscribe:function(n,t){e[n]?e[n].push(t):e[n]=[t]},publish:function(n,t){const s=e[n];for(const e of s)e(t)}}}(),n=(e,n,t)=>({name:e,sign:n,isCurrentlyPlaying:t,togglePlayingStatus:function(e){e.isCurrentlyPlaying=!e.isCurrentlyPlaying}});(function(t){const s=e;let i;s.subscribe("gameStart",(e=>{a.renderGamePage(),i.assignPlayers(e)})),s.subscribe("announceActivePlayer",(e=>{a.toggleActivePlayerColor(e)})),s.subscribe("assignCell",(e=>i.assignCell(e))),s.subscribe("cellAssigned",(e=>{a.changePickedCellColorAndText(e)})),s.subscribe("toggleActivePlayer",(e=>{a.toggleActivePlayerColor(e)})),s.subscribe("gameEnd",(e=>{a.updateResults(e)}));const a=function(e,n,t,s){const i=e;function a(e,n=""){const t=document.createElement(e);return t.textContent=n,t}function l(e,n){e.classList.add("user-sign"),n.classList.contains("user-sign")&&n.classList.remove("user-sign")}function r(e){const n=document.getElementById("player1"),t=document.getElementById("player2");e.sign===n.textContent?(n.classList.add("active-player"),t.classList.remove("active-player")):(n.classList.remove("active-player"),t.classList.add("active-player")),"draw"===e&&(n.classList.remove("active-player"),t.classList.remove("active-player"))}function d(e){for(let n=0;n<e.length;n++)document.getElementById(`${e[n]}`).classList.add("winning-line-border")}return i.classList.add("container","my-10","flex","h-4/6","flex-col","content-center","items-center","justify-center","rounded-md","min-w-min"),{renderStartPage:function(){i.hasChildNodes()&&i.replaceChildren();const e=a("h1","Tic-Tac-Toe");e.classList.add("text-8xl","my-5","px-3","game-title","rounded-md"),i.append(e);const t=a("p","Select the player!");t.classList.add("text-xl","mt-4","mb-1"),i.append(t);const s=a("div");s.classList.add("flex","flex-row","justify-between","my-2"),i.append(s);const r=a("button","X");r.classList.add("bg-red-400");const d=a("button","O");d.classList.add("bg-blue-400");const o=[r,d];for(const e of o)e.type="button",e.classList.add("px-5","mx-5","text-8xl","rounded-md","hover:-translate-y-1","hover:ease-linear","duration-150"),s.append(e),e.addEventListener("click",(()=>{c.disabled=!1,e===r?l(r,d):l(d,r)}));const c=a("button","Start Game");c.classList.add("mb-6","start-btn","mt-4","py-1","px-2","text-2xl","rounded-md","hover:-translate-y-1","hover:ease-linear","hover:bg-amber-400","duration-100"),c.disabled=!0,i.append(c),c.addEventListener("click",(()=>{const e=function(e,n){return e.classList.contains("user-sign")?[e.textContent,n.textContent]:[n.textContent,e.textContent]}(r,d);n(e)}))},renderGamePage:function(){i.hasChildNodes()&&i.replaceChildren();const e=a("div");e.id="results-container",i.append(e);const n=a("div");n.classList.add("flex","flex-row","content-center","justify-center","items-center"),i.append(n);const s=a("div","X");s.id="player1",s.classList.add("bg-red-400","mr-5"),n.append(s);const l=a("div");l.id="grid-container",l.classList.add("my-10","grid-container"),n.append(l),function(e){for(let n=0;n<9;n++){const s=a("div");s.id=n,s.classList.add("grid-item","flex","justify-center","content-center","text-6xl","p-2"),s.addEventListener("click",(()=>{t(s.id)})),e.append(s)}}(l);const r=a("div","O");r.id="player2",r.classList.add("bg-blue-400","ml-5"),n.append(r);const d=[s,r];for(const e of d)e.classList.add("h-3/6","px-5","text-8xl","rounded-md");const o=a("div");o.id="replay-container",i.append(o)},changePickedCellColorAndText:function(e){const n=document.getElementById(e.id);n.textContent=e.sign,("user"===e.owner.name||"oponent"===e.owner.name)&&("X"===e.sign?n.classList.add("xSignColor"):n.classList.add("oSignColor"))},updateResults:function(e){!function(){const e=document.getElementsByClassName("grid-item");for(const n of e)n.style.pointerEvents="none"}();const n=document.getElementById("grid-container");n.classList.remove("my-10"),n.classList.add("my-4");const t=document.getElementById("replay-container"),i=a("button","Replay");i.classList.add("mb-3","start-btn","py-1","px-3","text-2xl","rounded-md","hover:-translate-y-1","hover:ease-linear","hover:bg-amber-400","duration-100"),t.append(i),i.addEventListener("click",s);const l=document.getElementById("results-container");l.classList.add("text-5xl","px-2","mt-3","rounded-md","results-display"),"X"===e.sign?(l.classList.add("bg-red-400"),l.textContent=`Winner : ${e.sign}`,d(e.winningLine),r(e)):"O"===e.sign?(l.classList.add("bg-blue-400"),l.textContent=`Winner : ${e.sign}`,d(e.winningLine),r(e)):(l.classList.add("results-draw"),l.textContent="DRAW!!!",r("draw"))},toggleActivePlayerColor:r}}(t,(e=>s.publish("gameStart",e)),(e=>s.publish("assignCell",e)),(()=>l()));function l(){a.renderStartPage(),i=function(e,t,s,i){let a=0;const l=[];let r=null;const d=[],o=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];function c(e){for(const n of o){let t=e.find((e=>e.id===n[0])),s=e.find((e=>e.id===n[1])),i=e.find((e=>e.id===n[2]));if(null!==t.assignedPlayerSign&&t.assignedPlayerSign===s.assignedPlayerSign&&t.assignedPlayerSign===i.assignedPlayerSign){r=n,u();break}}9===a&&null===r&&u()}function u(){if(r){const e={winner:l[r[0]].assignedPlayer,sign:l[r[0]].assignedPlayerSign,winningLine:r};i(e)}else i("draw")}return(()=>{for(let e=0;e<9;e++){let n={};n.id=e,n.isEmpty=!0,n.assignedPlayerSign=null,n.assignedPlayer=null,l.push(n)}})(),{assignPlayers:function(t){const s=n("user",t[0],!0),i=n("oponent",t[1],!1);d.push(s,i),e(s)},assignCell:function(e){const n=l.find((n=>n.id===parseInt(e))),i=d[0].isCurrentlyPlaying?d[0]:d[1];if(n.isEmpty){n.isEmpty=!1,n.assignedPlayerSign=i.sign,n.assignedPlayer=i.name,a++,d[0].isCurrentlyPlaying=!d[0].isCurrentlyPlaying,d[1].isCurrentlyPlaying=!d[1].isCurrentlyPlaying,d[0].isCurrentlyPlaying?s(d[0]):s(d[1]);const e={id:n.id,owner:i,sign:i.sign};t(e)}a>=5&&c(l)},checkWinningLine:c}}((e=>s.publish("announceActivePlayer",e)),(e=>s.publish("cellAssigned",e)),(e=>s.publish("toggleActivePlayer",e)),(e=>s.publish("gameEnd",e)))}return{init:l}})(document.getElementById("game-container")).init()})();