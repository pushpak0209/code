__whitespace={" ":!0,"\t":!0,"\n":!0,"\f":!0,"\r":!0},difflib={defaultJunkFunction:function(t){return __whitespace.hasOwnProperty(t)},stripLinebreaks:function(t){return t.replace(/^[\n\r]*|[\n\r]*$/g,"")},stringAsLines:function(t){for(var i=t.indexOf("\n"),n=t.indexOf("\r"),e=-1<i&&-1<n||n<0?"\n":"\r",s=t.split(e),h=0;h<s.length;h++)s[h]=difflib.stripLinebreaks(s[h]);return s},__reduce:function(t,i,n){if(null!=n)var e=n,s=0;else{if(!i)return null;e=i[0],s=1}for(;s<i.length;s++)e=t(e,i[s]);return e},__ntuplecomp:function(t,i){for(var n=Math.max(t.length,i.length),e=0;e<n;e++){if(t[e]<i[e])return-1;if(t[e]>i[e])return 1}return t.length==i.length?0:t.length<i.length?-1:1},__calculate_ratio:function(t,i){return i?2*t/i:1},__isindict:function(i){return function(t){return i.hasOwnProperty(t)}},__dictget:function(t,i,n){return t.hasOwnProperty(i)?t[i]:n},SequenceMatcher:function(t,i,n){this.set_seqs=function(t,i){this.set_seq1(t),this.set_seq2(i)},this.set_seq1=function(t){t!=this.a&&(this.a=t,this.matching_blocks=this.opcodes=null)},this.set_seq2=function(t){t!=this.b&&(this.b=t,this.matching_blocks=this.opcodes=this.fullbcount=null,this.__chain_b())},this.__chain_b=function(){for(var t=this.b,i=t.length,n=this.b2j={},e={},s=0;s<t.length;s++){var h=t[s];if(n.hasOwnProperty(h)){var r=n[h];200<=i&&100*r.length>i?(e[h]=1,delete n[h]):r.push(s)}else n[h]=[s]}for(var h in e)e.hasOwnProperty(h)&&delete n[h];var l=this.isjunk,u={};if(l){for(var h in e)e.hasOwnProperty(h)&&l(h)&&(u[h]=1,delete e[h]);for(var h in n)n.hasOwnProperty(h)&&l(h)&&(u[h]=1,delete n[h])}this.isbjunk=difflib.__isindict(u),this.isbpopular=difflib.__isindict(e)},this.find_longest_match=function(t,i,n,e){for(var s=this.a,h=this.b,r=this.b2j,l=this.isbjunk,u=t,a=n,o=0,c=null,f={},_=[],b=t;b<i;b++){var g={},p=difflib.__dictget(r,s[b],_);for(var d in p)if(p.hasOwnProperty(d)){if((c=p[d])<n)continue;if(e<=c)break;g[c]=k=difflib.__dictget(f,c-1,0)+1,k>o&&(u=b-k+1,a=c-k+1,o=k)}f=g}for(;t<u&&n<a&&!l(h[a-1])&&s[u-1]==h[a-1];)u--,a--,o++;for(;u+o<i&&a+o<e&&!l(h[a+o])&&s[u+o]==h[a+o];)o++;for(;t<u&&n<a&&l(h[a-1])&&s[u-1]==h[a-1];)u--,a--,o++;for(;u+o<i&&a+o<e&&l(h[a+o])&&s[u+o]==h[a+o];)o++;return[u,a,o]},this.get_matching_blocks=function(){if(null!=this.matching_blocks)return this.matching_blocks;for(var t,i,n,e,s,h,r,l,u,a=this.a.length,o=this.b.length,c=[[0,a,0,o]],f=[];c.length;)t=(s=c.pop())[0],i=s[1],n=s[2],e=s[3],h=(u=this.find_longest_match(t,i,n,e))[0],r=u[1],(l=u[2])&&(f.push(u),t<h&&n<r&&c.push([t,h,n,r]),h+l<i&&r+l<e&&c.push([h+l,i,r+l,e]));f.sort(difflib.__ntuplecomp);var _=j1=k1=block=0,b=[];for(var g in f)f.hasOwnProperty(g)&&(block=f[g],i2=block[0],j2=block[1],k2=block[2],_+k1==i2&&j1+k1==j2?k1+=k2:(k1&&b.push([_,j1,k1]),_=i2,j1=j2,k1=k2));return k1&&b.push([_,j1,k1]),b.push([a,o,0]),this.matching_blocks=b,this.matching_blocks},this.get_opcodes=function(){if(null!=this.opcodes)return this.opcodes;var t,i,n,e,s,h=0,r=0,l=[];this.opcodes=l;var u=this.get_matching_blocks();for(var a in u)u.hasOwnProperty(a)&&(i=(t=u[a])[0],n=t[1],e=t[2],s="",h<i&&r<n?s="replace":h<i?s="delete":r<n&&(s="insert"),s&&l.push([s,h,i,r,n]),h=i+e,r=n+e,e&&l.push(["equal",i,h,n,r]));return l},this.get_grouped_opcodes=function(t){t||(t=3);var i,n,e,s,h,r,l=this.get_opcodes();l||(l=[["equal",0,1,0,1]]),"equal"==l[0][0]&&(n=(i=l[0])[0],e=i[1],s=i[2],h=i[3],r=i[4],l[0]=[n,Math.max(e,s-t),s,Math.max(h,r-t),r]),"equal"==l[l.length-1][0]&&(n=(i=l[l.length-1])[0],e=i[1],s=i[2],h=i[3],r=i[4],l[l.length-1]=[n,e,Math.min(s,e+t),h,Math.min(r,h+t)]);var u=t+t,a=[],o=[];for(var c in l)l.hasOwnProperty(c)&&(n=(i=l[c])[0],e=i[1],s=i[2],h=i[3],r=i[4],"equal"==n&&u<s-e&&(a.push([n,e,Math.min(s,e+t),h,Math.min(r,h+t)]),o.push(a),a=[],e=Math.max(e,s-t),h=Math.max(h,r-t)),a.push([n,e,s,h,r]));return!a||1==a.length&&"equal"==a[0][0]||o.push(a),o},this.ratio=function(){return matches=difflib.__reduce(function(t,i){return t+i[i.length-1]},this.get_matching_blocks(),0),difflib.__calculate_ratio(matches,this.a.length+this.b.length)},this.quick_ratio=function(){var t,i;if(null==this.fullbcount){this.fullbcount=t={};for(var n=0;n<this.b.length;n++)t[i=this.b[n]]=difflib.__dictget(t,i,0)+1}t=this.fullbcount;var e={},s=difflib.__isindict(e),h=numb=0;for(n=0;n<this.a.length;n++)s(i=this.a[n])?numb=e[i]:numb=difflib.__dictget(t,i,0),e[i]=numb-1,0<numb&&h++;return difflib.__calculate_ratio(h,this.a.length+this.b.length)},this.real_quick_ratio=function(){var t=this.a.length,i=this.b.length;return _calculate_ratio(Math.min(t,i),t+i)},console.log(difflib.defaultJunkFunction),this.isjunk=n||difflib.defaultJunkFunction,this.a=this.b=null,this.set_seqs(t,i)}};