window.bridges["generate-random-date"]=function(){return{converter:function(){var e=this.options.get(),t=+e.count,a=e.format,n=e.start,r=e.end,i=new Date(n).getTime(),o=new Date(r).getTime();isNaN(i)&&(i=new Date(1900,0,1).getTime(),this.output.showWarningBadge("Invalid starting date","You specified an invalid starting date. We reset it to 1900-01-01 00:00:00."));isNaN(o)&&(o=new Date(2099,0,31).getTime(),this.output.showWarningBadge("Invalid starting date","You specified an invalid ending date. We reset it to 2099-12-31 00:00:00."));for(var s="",m=0;m<t;m++){var g=new Date(i+Math.random()*(o-i+1e3)),d=g.getFullYear(),l=g.getFullYear().toString().substr(2,2),c=["January","February","March","April","May","June","July","August","September","October","November","December"][g.getMonth()],h=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][g.getMonth()],u=g.getMonth()+1;u<10&&(u="0"+u.toString());var p=g.getDate(),y=g.getDate();y<10&&(y="0"+y.toString());var f=g.getHours(),v=g.getHours();v<10&&(v="0"+v.toString());var j=g.getMinutes(),M=g.getMinutes();M<10&&(M="0"+M.toString());var S=g.getSeconds(),D=g.getSeconds();if(D<10&&(D="0"+D.toString()),"yyyy-mm-dd-hh-mm-ss"==a)s+=[d,u,y].join("-")+" "+[v,M,D].join(":");else if("yyyy-dd-mm-hh-mm-ss"==a)s+=[d,y,u].join("-")+" "+[v,M,D].join(":");else if("mm-dd-yyyy-hh-mm-ss"==a)s+=[u,y,d].join("-")+" "+[v,M,D].join(":");else if("iso8601"==a){var Y=g.toISOString();s+=Y=Y.replace(/\.\d+Z/,"Z")}else if("year-month-date-hh-mm-ss"==a)s+=[d,c,y].join(" ")+" "+[v,M,D].join(":");else if("year-date-month-hh-mm-ss"==a)s+=[d,c,y].join(" ")+" "+[v,M,D].join(":");else if("month-date-year-hh-mm-ss"==a)s+=[c,y,d].join(" ")+" "+[v,M,D].join(":");else if("custom"==a){var w=e["custom-format"];s+=w=(w=(w=(w=(w=(w=(w=(w=(w=(w=(w=(w=(w=w.replace("YYYY",d)).replace("YY",l)).replace("MM",u)).replace("month",c)).replace("mon",h)).replace("DD",y)).replace("d",p)).replace("hh",v)).replace("h",f)).replace("mm",M)).replace("m",j)).replace("ss",D)).replace("s",S)}m!=t-1&&(s+="\n")}return s},config:{}}};