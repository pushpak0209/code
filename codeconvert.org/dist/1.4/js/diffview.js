diffview={buildView:function(e){var t=e.baseTextLines,n=e.newTextLines,i=e.opcodes,d=e.baseTextName?e.baseTextName:"Base Text",a=e.newTextName?e.newTextName:"New Text",l=e.contextSize,o=0==e.viewType||1==e.viewType?e.viewType:0;if(null==t)throw"Cannot build diff view; baseTextLines is not defined.";if(null==n)throw"Cannot build diff view; newTextLines is not defined.";if(!i)throw"Canno build diff view; opcodes is not defined.";function c(e,t){var n=document.createElement(e);return n.className=t,n}function h(e,t){var n=document.createElement(e);return n.appendChild(document.createTextNode(t)),n}function p(e,t,n){var i=document.createElement(e);return i.className=t,i.appendChild(document.createTextNode(n)),i}var r=document.createElement("thead"),f=document.createElement("tr");r.appendChild(f),o?(f.appendChild(document.createElement("th")),f.appendChild(document.createElement("th")),f.appendChild(p("th","texttitle",d+" vs. "+a))):(f.appendChild(document.createElement("th")),f.appendChild(p("th","texttitle",d)),f.appendChild(document.createElement("th")),f.appendChild(p("th","texttitle",a))),r=[r];var s,u=[];function m(e,t,n,i,d){return t<n?(e.appendChild(h("th",(t+1).toString())),e.appendChild(p("td",d,i[t].replace(/\t/g,"    "))),t+1):(e.appendChild(document.createElement("th")),e.appendChild(c("td","empty")),t)}function C(e,t,n,i,d){e.appendChild(h("th",null==t?"":(t+1).toString())),e.appendChild(h("th",null==n?"":(n+1).toString())),e.appendChild(p("td",d,i[null!=t?t:n].replace(/\t/g,"    ")))}for(var g=0;g<i.length;g++){code=i[g],change=code[0];for(var w=code[1],x=code[2],v=code[3],b=code[4],E=Math.max(x-w,b-v),T=[],N=[],y=0;y<E;y++){if(l&&1<i.length&&(0<g&&y==l||0==g&&0==y)&&"equal"==change){var S=E-(0==g?1:2)*l;if(1<S){if(T.push(f=document.createElement("tr")),w+=S,v+=S,y+=S-1,f.appendChild(h("th","...")),o||f.appendChild(p("td","skip","")),f.appendChild(h("th","...")),f.appendChild(p("td","skip","")),g+1==i.length)break;continue}}T.push(f=document.createElement("tr")),o?"insert"==change?C(f,null,v++,n,change):"replace"==change?(N.push(s=document.createElement("tr")),w<x&&C(f,w++,null,t,"delete"),v<b&&C(s,null,v++,n,"insert")):"delete"==change?C(f,w++,null,t,change):C(f,w++,v++,t,change):(w=m(f,w,x,t,change),v=m(f,v,b,n,change))}for(y=0;y<T.length;y++)u.push(T[y]);for(y=0;y<N.length;y++)u.push(N[y])}for(var g in r.push(f=document.createElement("tbody")),u)u.hasOwnProperty(g)&&f.appendChild(u[g]);for(var g in f=c("table","diff"+(o?" inlinediff":"")),r)r.hasOwnProperty(g)&&f.appendChild(r[g]);var k=0,D=0,L=0,O=0,P=0,q=0,z=0,A=0;return $(f).find("tr").each(function(n){n=0;$(this).children("td").each(function(e){var t=$(this).attr("class");"replace"==t?0==n?k++:D++:"insert"==t?0==n?P++:q++:"delete"==t?0==n?L++:O++:"empty"==t&&(0==n?z++:A++),n++})}),0==k&&0==D&&0==z&&0==A&&0==P&&0==q&&0==L&&0==O?($(".diffinfo span").text("NO CHANGES FOUND"),$(".diffinfo ul").hide(),$(".diffinfo .successmessage").show(),$("#showDiff").hide(),$(".difftable").css("display","block!important"),$(".option").hide(),$(".custombtn").css("text-align","center")):($(".diffinfo ul").show(),$(".diffinfo .successmessage").hide(),$(".diffinfo li #R").text("("+k+","+D+")"),$(".diffinfo li #E").text("("+z+","+A+")"),$(".diffinfo li #I").text("("+P+","+q+")"),$(".diffinfo li #D").text("("+L+","+O+")"),$("#showDiff").show(),$(".option").show(),$(".difftable").css("display","none!important"),$(".custombtn").css("text-align","left")),f}};