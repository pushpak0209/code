$(document).ready(function(){var e=$("#viewName").val();"un-google-link"==e&&($("#temp").attr("value","Un-Link"),$("#temp").attr("title","Un-Google Link"),$("#unescape").hide(),$("#loadEscape").hide(),$("#me").hide()),$("#"+e).addClass("currentselected")});var escapeHtmlArray={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};function setToEditor(e){$("#input").val(""),$("#input").val(e.trim()),$("#temp").click()}function escapeHtml(e){return String(e).replace(/[&<>"']/g,function(e){return escapeHtmlArray[e]})}function unEscapeHtml(e){return String(e).replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">")}function escapeSQL(e){return String(e).replace(/'/g,'"')}function unEscapeSQL(e){return String(e).replace(/"/g,"'")}function escapeCSV(e){var r=String(e).replace(/"/g,'""');return'"'!=r.charAt(0)&&(r='"'+r),'"'!=r.charAt(r.length-1)&&(r+='"'),r}function unEscapeCSV(e){return'"'==e.charAt(0)&&(e=e.substring(1,e.length-1)),'"'==e.charAt(e.length-1)&&(e=e.substring(0,e.length-2)),String(e).replace(/""/g,'"')}function escapeJava(e){var r="",a=0;for(a=0;a<e.length;a++)r+=javaEscapeCode(e.charAt(a),!1);return r}function unEscapeJava(e){return e.replace(/\\r/g,"\r").replace(/\\n/g,"\n").replace(/\\'/g,"'").replace(/\\\"/g,'"').replace(/\\\\/g,"\\").replace(/\\t/g,"\t").replace(/\\b/g,"\b").replace(/\\f/g,"\f")}function unEscapeJavaScript(e){return e.replace(/\\r/g,"\r").replace(/\\n/g,"\n").replace(/\\'/g,"'").replace(/\\\"/g,'"').replace(/\\&/g,"&").replace(/\\\\/g,"\\").replace(/\\t/g,"\t").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\x2F/g,"/").replace(/\\x3C/g,"<").replace(/\\x3E/g,">")}function javaEscapeCode(e,r){if(!r||"\n"!=e)switch(e.charAt(0)){case"\n":return"\\n";case"\r":return"\\r";case"'":return"\\'";case'"':return'\\"';case"\\":return"\\\\";case"\t":return"\\t";case"\b":return"\\b";case"\f":return"\\f";default:return e}}function escapeJavascript(e){var r="",a=0;for(a=0;a<e.length;a++)r+=javascriptEscapeCode(e.charAt(a),!1);return r}function javascriptEscapeCode(e){switch(e.charAt(0)){case"\r":return"\\r";case"\n":return"\\n";case"\v":return"\\v";case"'":return"\\'";case'"':return'\\"';case"&":return"\\&";case"\\":return"\\\\";case"\t":return"\\t";case"\b":return"\\b";case"\f":return"\\f";default:return e}}function makeLink(e,r){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(r);return null==a?"":decodeURIComponent(a[1].replace(/\+/g," "))}function unLink(e){var r=makeLink("url",e);return r||(r=makeLink("adurl",e)),r}function escape(e){var r=$("#input").val(),a=$("#viewName").val().split("-")[0];null!=a&&0!=a.trim().length&&("html"==a.trim().toLowerCase()||"xml"==a.trim().toLowerCase()?r=escapeHtml(r):"java"==a.trim().toLowerCase()||"csharp"==a.trim().toLowerCase()?r=escapeJava(r):"javascript"==a.trim().toLowerCase()||"json"==a.trim().toLowerCase()?r=escapeJavascript(r):"sql"==a.trim().toLowerCase()?r=escapeSQL(r):"csv"==a.trim().toLowerCase()?r=escapeCSV(r):"un"==a.trim().toLowerCase()&&(r=unLink(r)),$("#output").val(r))}function unescape(e){var r=$("#input").val(),a=$("#viewName").val().split("-")[0];null!=a&&0!=a.trim().length&&("html"==a.trim().toLowerCase()||"xml"==a.trim().toLowerCase()?r=unEscapeHtml(r):"java"==a.trim().toLowerCase()||"csharp"==a.trim().toLowerCase()?r=unEscapeJava(r):"javascript"==a.trim().toLowerCase()||"json"==a.trim().toLowerCase()?r=unEscapeJavaScript(r):"sql"==a.trim().toLowerCase()?r=unEscapeSQL(r):"csv"==a.trim().toLowerCase()&&(r=unEscapeCSV(r)),$("#output").val(r))}