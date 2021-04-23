"use strict";window.raise=function(){},window.log=function(){},window.addEventListener("load",function(){Site.applyToAllElements(".subscribe-submit",function(e){e.addEventListener("click",Site.subscribe)}),Site.applyToAllElements("#feedback-submit",function(e){e.addEventListener("click",Site.feedback)}),Site.applyToAllElements(".tools.cards .card .block",function(e){Site.attachCardHandler(e)}),Site.applyToAllElements(".coming-soon-list.cards .card .block",function(e){Site.attachNotifyHandler(e)}),Site.applyToAllElements(".section.tool-unlisted .unlisted-feedback",function(e){e.addEventListener("click",Site.unlistedFeedback)}),Site.applyToAllElements(".all-tools .search",function(e){e.addEventListener("keyup",function(){Site.sortAllTools(e.value||"")})}),Site.applyToAllElements(".pro-tip .omnibox",function(e){Site.attachProTipInputHandler(e)}),Site.applyToAllElements(".network select",function(e){Site.attachNetworkHandler(e)}),Site.applyToAllElements(".subscribe-cancel",function(e){e.addEventListener("click",Site.hideNotify)});var e=!1;/MSIE (9\.0|10\.0)/.test(navigator.userAgent)&&(e=!0),e&&Site.equalHeightLayout(),Site.sortAllTools(),Site.loadSocialWidgets(),Site.resources.updatePreloaded()});var Site={GET:function(e,t){if("function"!=typeof t)return console.error("Callback must be passed as function."),!1;var n=new XMLHttpRequest;return n.onreadystatechange=function(){t(this)},n.open("GET",e,!0),n.send(),!0},POST:function(e,t,n){if("object"!=typeof t)return console.error("Parameters must be passed as object."),!1;if("function"!=typeof n)return console.error("Callback must be passed as function."),!1;var o=[];for(var i in t)o.push(encodeURIComponent(i)+"="+encodeURIComponent(t[i]));o=o.join("&");var s=new XMLHttpRequest;return s.onreadystatechange=function(){n(this)},s.open("POST",e,!0),s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),s.send(o),!0},loadSocialWidgets:function(){var e,t,n,o,i,s,a,r,l,c,u;e=document,t="script",n="facebook-jssdk",i=e.getElementsByTagName(t)[0],e.getElementById(n)||((o=e.createElement(t)).id=n,o.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10",i.parentNode.insertBefore(o,i)),window.twttr=(s=document,a="script",r="twitter-wjs",c=s.getElementsByTagName(a)[0],u=window.twttr||{},s.getElementById(r)||((l=s.createElement(a)).id=r,l.src="https://platform.twitter.com/widgets.js",c.parentNode.insertBefore(l,c),u._e=[],u.ready=function(e){u._e.push(e)}),u)},equalHeightAttached:!1,equalHeightLayout:function(){Site.equalHeightAttached||(window.addEventListener("resize",Site.equalHeightLayout),Site.equalHeightAttached=!0);for(var e=document.querySelectorAll(".cards.equal-height .card"),t=0;t<e.length;t++)!function(e){e.style.height="",setTimeout(function(){e.style.height=e.offsetHeight+"px"},1)}(e[t])},applyToAllElements:function(e,t){var n=document.querySelectorAll(e);if(n)for(var o=0;o<n.length;o++)t(n[o])},toolFeedback:function(e){var t=document.querySelector(".section.feedback"),n=document.getElementById("feedback-input-subject"),o=document.querySelector(".all-tools .search").value,i=document.getElementById("feedback-input-text");n.value="Empty search results",i.value='I was searching for "'+o+'" but nothing was found...',zenscroll&&(zenscroll.to(t,250),e.preventDefault(),e.stopPropagation())},unlistedFeedback:function(e){var t=document.querySelector(".section.feedback"),n=document.getElementById("feedback-input-subject");document.getElementById("feedback-input-text");n.value="Unlisted tool feedback",zenscroll&&(zenscroll.to(t,250),e.preventDefault(),e.stopPropagation())},sortAllTools:function(e){e||(e=""),e=Site.removeStopWords(e.toLowerCase());document.querySelector(".tools.cards");var t=window.localStorage&&window.localStorage.favorite_tools||"[]";t=JSON.parse(t)},attachCardHandler:function(o){o.addEventListener("click",function(e){var t=o.querySelector(".title a");if(e.target!=t){if("function"==typeof Event)t.dispatchEvent(new MouseEvent(e.type,e));else{var n=document.createEvent("MouseEvents");n.initMouseEvent(e.type,e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),t.dispatchEvent(n)}return!1}})},attachNotifyHandler:function(t){t.addEventListener("click",function(){var e=t.querySelector(".title").textContent;Site.showNotify(e)})},removeStopWords:function(e){var t=e.replace(/\b(a|an|the|of|for|to|any|all|from|in|into|-)\b/gi," ");return t=(t=(t=t.replace(/\s+/g," ")).replace(/^\s+/,"")).replace(/\s+$/,"")},attachProTipInputHandler:function(t){t.addEventListener("click",function(){var e=t.getAttribute("data-location");window.location.assign(e)})},attachNetworkHandler:function(n){for(var e=0;e<n.options.length;e++)if(null!=n.options[e].getAttribute("selected")){n.selectedIndex=e;break}n.addEventListener("change",function(){var e=n.selectedIndex,t=n.options[e].getAttribute("data-location");window.location.assign(t)})},showNotify:function(e){if(e){Site.hideNotify();var t=document.querySelector(".fullwidth-wrapper");if(t)t.setAttribute("data-interested-in",e),t.classList.add("show-notification"),t.classList.add("shadow-lock"),t.querySelector(".which-tool").textContent=e,zenscroll.center(t,250)}else console.error("Can't show notifications for an unknown tool.")},hideNotify:function(){var e=document.querySelector(".fullwidth-wrapper");e&&(e.setAttribute("data-interested-in",""),e.classList.remove("show-notification"),e.classList.remove("shadow-lock"))},subscribe:function(){var n=document.querySelector(".fullwidth-wrapper"),e=n.classList.contains("show-notification"),o=e?n.querySelector(".section.notification"):n.querySelector(".section.subscription"),t=n.getAttribute("data-interested-in"),i=o.querySelector(".onlinetools-subscribe-box"),s=o.querySelector(".subscribe-input-email").value,a=window.location.href,r=o.querySelector(".subscribe-submit");if(Site.validateEmail(s)){var l={site:a,type:"subscribe",email:s};e&&(l.tool=t,l.type="notify");var c=i.querySelector(".subscribe-success"),u=r.textContent;Site.POST("https://www.browserling.com/api/tools-subscribe",l,function(e){r.textContent="Wait...";var t=e.responseText;4==e.readyState&&200==e.status&&-1===t.toLowerCase().indexOf("error")?(i.classList.add("complete"),c.textContent=t,r.textContent=u,o.querySelector(".subscribe-input-email").value="",n.classList.remove("shadow-lock")):4==e.readyState&&(i.classList.add("complete"),c.textContent="Something has gone wrong. Try again later. ("+t+")",r.textContent=u,o.querySelector(".subscribe-input-email").value="",Site.hideNotify(),setTimeout(function(){i.classList.remove("complete")},2e3))})}else Site.shake(o.querySelector(".onlinetools-subscribe-box"))},feedback:function(){var n=document.getElementById("feedback-box"),e=document.getElementById("feedback-input-email").value,t=document.getElementById("feedback-input-text").value,o=document.getElementById("feedback-input-subject").value,i=window.location.href,s=n.querySelector("button");if(Site.validateEmail(e)&&0<t.length&&0<o.length){s.textContent="Submitting...";var a={site:i,email:e,message:t,subject:o},r=n.querySelector(".feedback-success");Site.POST("https://www.browserling.com/api/tools-feedback",a,function(e){var t=e.responseText;4==e.readyState&&200==e.status&&-1===t.toLowerCase().indexOf("error")?(n.classList.add("complete"),r.textContent=t):4==e.readyState&&(n.classList.add("complete"),r.textContent="Something has gone wrong. Try again later. ("+t+")",setTimeout(function(){n.classList.remove("complete")},2e3))})}else Site.shake(n)},validateEmail:function(e){var t=!1;if(-1!==e.indexOf("@")&&2==(e=e.split("@")).length){var n=e[0],o=e[1];if(0<n.length){var i=2<=(o=o.split(".")).length,s=0<o[0].length,a=0<o[i-1].length;t=i&&s&&a}Z}return t},shake:function(e){e.classList.remove("shaking"),setTimeout(function(){e.classList.add("shaking")},5),e.addEventListener("animationend",function(){e.classList.remove("shaking")})}};Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(this))return null;do{if(t.matches(e))return t;t=t.parentElement}while(null!==t);return null}),String.prototype.format=function(){for(var e=this,t=0;t<arguments.length;t++){var n=new RegExp("\\{"+t+"\\}","gi");e=e.replace(n,arguments[t])}return e},Site.resources={list:{js:[],css:[]},updatePreloaded:function(){for(var e=document.head.querySelectorAll("link.unique-resource, script.unique-resource"),t=0;t<e.length;t++){var n=e[t];"script"!=n.tagName.toLowerCase()||this.isLoaded("js",n.src)?"link"!=n.tagName.toLowerCase()||this.isLoaded("css",n.href)||this.list.css.push(n.getAttribute("href")):this.list.js.push(n.getAttribute("src"))}},isLoaded:function(e,t){return-1!==this.list[e].indexOf(t)},loadRecursive:function(e,t){var n=this;if(0!=e.length){var o=e.shift();o?n.load(o.type,o.source,function(){n.loadRecursive(e,t)}):n.loadRecursive(e,t)}else t()},load:function(e,t,n){var o=this;if(this.isLoaded(e,t))n();else{if("js"==e)(i=document.createElement("script")).addEventListener("load",function(){o.list.js.push(t),n()}),i.src=t;else if("css"==e){var i;(i=document.createElement("link")).rel="stylesheet",i.addEventListener("load",function(){o.list.css.push(t),n()}),i.href=t}i.className="unique-resource loaded-asynchronously";var s=document.head.querySelector("meta[data-marker=resources]");document.head.insertBefore(i,s)}},importFrom:function(e,t){for(var n=[],o=["css","js"],i=0;i<o.length;i++)for(var s=o[i],a=0;a<e[s].length;a++){var r=e[s][a];this.isLoaded(s,r)||n.push({type:s,source:r})}0!==n.length?this.loadRecursive(n,t):t()}};