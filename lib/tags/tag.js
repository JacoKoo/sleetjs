var Tag,isArray,isString,toString;toString=Object.prototype.toString,isString=function(t){return"[object String]"===toString.call(t)},isArray=function(t){return"[object Array]"===toString.call(t)},exports.Tag=Tag=function(){function t(t,e){var n,i,s,r;for(this.options=t,this.parent=null!=e?e:{},this.attributes={},this.content=this.options.text||"",this.name=this.options.name||"div",this.indent=this.options.indent||0,this.options.hash&&this.setAttribute("id",this.options.hash),r=this.options.dot,i=0,s=r.length;s>i;i++)n=r[i],this.setAttribute("class",n);this.attributeGroups=this.options.attributeGroups,this.children=this.options.children,this.haveInlineChild=!1,this.isInline=this.indent===this.parent.indent,this.parent.haveInlineChild=this.isInline}return t.prototype.isString=isString,t.prototype.isArray=isArray,t.prototype.setAttribute=function(t,e){return"clazz"===t||"class"===t?this.attributes["class"]?this.attributes["class"]+=" "+e:this.attributes["class"]=e:this.attributes[t]=e},t.prototype.generate=function(t){return this.generateOpenStart(t),this.generateAttributes(t),this.generateOpenEnd(t),this.generateContent(t),this.generateClose(t)},t.prototype.generateOpenStart=function(t){return this.isInline?t.pop():t.indent(this.indent),t.push("<").push(this.name)},t.prototype.generateAttributes=function(t){var e,n,i,s,r,o,h,p,a,u,l,g,c;for(s=[],u=this.attributeGroups,o=0,p=u.length;p>o;o++)if(e=u[o],e.predict)s.push(e);else{l=e.attributes;for(n in l)r=l[n],this.setAttribute(n,r)}for(h=0,a=s.length;a>h;h++)e=s[h],i=t.createPredict(e.predict.name,e,this),i.generate(t);g=this.attributes,c=[];for(n in g)r=g[n],c.push(this.generateAttribute(n,r,t));return c},t.prototype.generateAttribute=function(t,e,n){return n.push(" ").push(t).push('="').push(e).push('"')},t.prototype.generateOpenEnd=function(t){return t.push(this.selfClosing()?"/>":">"),this.needNewLineTokenAfterTagOpen()||this.selfClosing()?t.eol():void 0},t.prototype.needNewLineTokenAfterTagOpen=function(){return this.children.length>0?!0:isArray(this.content)?!0:!1},t.prototype.needTextIndent=function(){return this.needNewLineTokenAfterTagOpen()&&isString(this.content)},t.prototype.selfClosing=function(){return!1},t.prototype.generateContent=function(t){var e,n,i,s,r;for(this.content&&(this.needTextIndent()&&t.indent(this.indent+1),t.push(isString(this.content)?this.content:this.content.join(t.newlineToken)),(this.needTextIndent()||isArray(this.content))&&t.eol()),s=this.children,r=[],n=0,i=s.length;i>n;n++)e=s[n],r.push(isString(e)?t.push(e).eol():t.createTag(e,this).generate(t));return r},t.prototype.generateClose=function(t){return this.selfClosing()?void 0:(this.needNewLineTokenAfterTagOpen()&&!this.haveInlineChild&&t.indent(this.indent),this.haveInlineChild&&t.pop(),t.push("</").push(this.name).push(">").eol())},t}();