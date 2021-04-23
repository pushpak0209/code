window.bridges["generate-random-json"]=function(){return{converter:function(){var e=this.options.get(),t=+e.depth,n=+e["max-elements"],a=e["english-strings"],s=(e["random-strings"],+e["max-string-length"]),r=e["always-max-elements"];if(a)var i="english";else i="random";if(isNaN(t))return this.output.showNegativeBadge("Can't generate","Depth is not a valid number."),"";if(isNaN(n))return this.output.showNegativeBadge("Can't generate","Elements per depth level is not a valid number."),"";if(t<0)return this.output.showNegativeBadge("Can't generate","Depth is negative."),"";if(n<0)return this.output.showNegativeBadge("Can't generate","Elements per depth level is negative."),"";if("string"==i){if(isNaN(s))return this.output.showNegativeBadge("Can't generate","Max string length is not a number."),"";if(s<0)return this.output.showNegativeBadge("Can't generate","Max string length is negative."),""}var o=[];if(e.booleans&&o.push("booleans"),e.numbers&&o.push("numbers"),e.strings&&o.push("strings"),e.arrays&&o.push("arrays"),e.objects&&o.push("objects"),!e.arrays&&!e.objects&&0<t)return this.output.showWarningBadge("Can't generate","To generate depth, you need to allow to generate arrays and/or objects."),"";if(!e.booleans&&!e.numbers&&!e.strings)return this.output.showWarningBadge("Can't generate","Neither booleans, nor numbers, nor strings selected. There is nothing to generate."),"";var g=new RandomJsonGenerator({maxDepth:t,satisfyDepth:r,elementsPerBranch:n,stringType:i,maxStringLength:s,possibleElements:o}),u=null;e["formatting-none"]?u=0:e["formatting-tabs"]?u="\t":e["formatting-spaces"]&&(u=2);var h=g.generate();console.log(h),$(".randomjson").val(JSON.stringify(h,0,u));var l=$(".randomjson").data("ace").editor.ace;return $(".randomjson").ace({lang:"json"}),l.setValue(JSON.stringify(h,0,u)),l.commands.removeCommand("find"),JSON.stringify(h,0,u)},config:{}}};