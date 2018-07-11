/*

Copyright (C) 2015 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function(q){"object"==typeof exports&&"object"==typeof module?q(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],q):q(CodeMirror)})(function(q){q.defineMode("javascript",function(na,r){function p(a,d,e){A=a;I=e;return d}function w(a,d){var e=a.next();if('"'==e||"'"==e)return d.tokenize=oa(e),d.tokenize(a,d);if("."==e&&a.match(/^\d+(?:[eE][+\-]?\d+)?/))return p("number","number");if("."==e&&a.match(".."))return p("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(e))return p(e);
if("="==e&&a.eat(">"))return p("=>","operator");if("0"==e&&a.eat(/x/i))return a.eatWhile(/[\da-f]/i),p("number","number");if("0"==e&&a.eat(/o/i))return a.eatWhile(/[0-7]/i),p("number","number");if("0"==e&&a.eat(/b/i))return a.eatWhile(/[01]/i),p("number","number");if(/\d/.test(e))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),p("number","number");if("/"==e){if(a.eat("*"))return d.tokenize=J,J(a,d);if(a.eat("/"))return a.skipToEnd(),p("comment","comment");if("operator"==d.lastType||"keyword c"==
d.lastType||"sof"==d.lastType||/^[\[{}\(,;:]$/.test(d.lastType)){a:for(var e=!1,c,b=!1;null!=(c=a.next());){if(!e){if("/"==c&&!b)break a;"["==c?b=!0:b&&"]"==c&&(b=!1)}e=!e&&"\\"==c}a.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);return p("regexp","string-2")}a.eatWhile(K);return p("operator","operator",a.current())}if("`"==e)return d.tokenize=Q,Q(a,d);if("#"==e)return a.skipToEnd(),p("error","error");if(K.test(e))return a.eatWhile(K),p("operator","operator",a.current());if(R.test(e))return a.eatWhile(R),
e=a.current(),(c=Z.propertyIsEnumerable(e)&&Z[e])&&"."!=d.lastType?p(c.type,c.style,e):p("variable","variable",e)}function oa(a){return function(d,e){var c=!1,b;if(L&&"@"==d.peek()&&d.match(pa))return e.tokenize=w,p("jsonld-keyword","meta");for(;null!=(b=d.next())&&(b!=a||c);)c=!c&&"\\"==b;c||(e.tokenize=w);return p("string","string")}}function J(a,d){for(var b=!1,c;c=a.next();){if("/"==c&&b){d.tokenize=w;break}b="*"==c}return p("comment","comment")}function Q(a,d){for(var b=!1,c;null!=(c=a.next());){if(!b&&
("`"==c||"$"==c&&a.eat("{"))){d.tokenize=w;break}b=!b&&"\\"==c}return p("quasi","string-2",a.current())}function S(a,d){d.fatArrowAt&&(d.fatArrowAt=null);var b=a.string.indexOf("=>",a.start);if(!(0>b)){for(var c=0,f=!1,b=b-1;0<=b;--b){var h=a.string.charAt(b),g="([{}])".indexOf(h);if(0<=g&&3>g){if(!c){++b;break}if(0==--c)break}else if(3<=g&&6>g)++c;else if(R.test(h))f=!0;else{if(/["'\/]/.test(h))return;if(f&&!c){++b;break}}}f&&!c&&(d.fatArrowAt=b)}}function $(a,d,b,c,f,h){this.indented=a;this.column=
d;this.type=b;this.prev=f;this.info=h;null!=c&&(this.align=c)}function g(){for(var a=arguments.length-1;0<=a;a--)f.cc.push(arguments[a])}function b(){g.apply(null,arguments);return!0}function B(a){function d(b){for(;b;b=b.next)if(b.name==a)return!0;return!1}var b=f.state;f.marked="def";b.context?d(b.localVars)||(b.localVars={name:a,next:b.localVars}):!d(b.globalVars)&&r.globalVars&&(b.globalVars={name:a,next:b.globalVars})}function C(){f.state.context={prev:f.state.context,vars:f.state.localVars};
f.state.localVars=qa}function D(){f.state.localVars=f.state.context.vars;f.state.context=f.state.context.prev}function m(a,b){var e=function(){var c=f.state,e=c.indented;if("stat"==c.lexical.type)e=c.lexical.indented;else for(var h=c.lexical;h&&")"==h.type&&h.align;h=h.prev)e=h.indented;c.lexical=new $(e,f.stream.column(),a,null,c.lexical,b)};e.lex=!0;return e}function k(){var a=f.state;a.lexical.prev&&(")"==a.lexical.type&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function n(a){function d(e){return e==
a?b():";"==a?g():b(d)}return d}function s(a,d){return"var"==a?b(m("vardef",d.length),T,n(";"),k):"keyword a"==a?b(m("form"),l,s,k):"keyword b"==a?b(m("form"),s,k):"{"==a?b(m("}"),U,k):";"==a?b():"if"==a?("else"==f.state.lexical.info&&f.state.cc[f.state.cc.length-1]==k&&f.state.cc.pop()(),b(m("form"),l,s,k,aa)):"function"==a?b(u):"for"==a?b(m("form"),ba,s,k):"variable"==a?b(m("stat"),ra):"switch"==a?b(m("form"),l,m("}","switch"),n("{"),U,k,k):"case"==a?b(l,n(":")):"default"==a?b(n(":")):"catch"==a?
b(m("form"),C,n("("),V,n(")"),s,k,D):"class"==a?b(m("form"),sa,k):"export"==a?b(m("stat"),ta,k):"import"==a?b(m("stat"),ua,k):g(m("stat"),l,n(";"),k)}function l(a){return ca(a,!1)}function t(a){return ca(a,!0)}function ca(a,d){if(f.state.fatArrowAt==f.stream.start){var e=d?da:ea;if("("==a)return b(C,m(")"),E(v,")"),k,n("=>"),e,D);if("variable"==a)return g(C,v,n("=>"),e,D)}e=d?M:F;return va.hasOwnProperty(a)?b(e):"async"==a?b(l):"function"==a?b(u,e):"keyword c"==a?b(d?fa:W):"("==a?b(m(")"),W,N,n(")"),
k,e):"operator"==a||"spread"==a?b(d?t:l):"["==a?b(m("]"),wa,k,e):"{"==a?G(ga,"}",null,e):"quasi"==a?g(O,e):"new"==a?b(xa(d)):b()}function W(a){return a.match(/[;\}\)\],]/)?g():g(l)}function fa(a){return a.match(/[;\}\)\],]/)?g():g(t)}function F(a,d){return","==a?b(l):M(a,d,!1)}function M(a,d,e){var c=0==e?F:M,f=0==e?l:t;if("=>"==a)return b(C,e?da:ea,D);if("operator"==a)return/\+\+|--/.test(d)?b(c):"?"==d?b(l,n(":"),f):b(f);if("quasi"==a)return g(O,c);if(";"!=a){if("("==a)return G(t,")","call",c);
if("."==a)return b(ya,c);if("["==a)return b(m("]"),W,n("]"),k,c)}}function O(a,d){return"quasi"!=a?g():"${"!=d.slice(d.length-2)?b(O):b(l,za)}function za(a){if("}"==a)return f.marked="string-2",f.state.tokenize=Q,b(O)}function ea(a){S(f.stream,f.state);return g("{"==a?s:l)}function da(a){S(f.stream,f.state);return g("{"==a?s:t)}function xa(a){return function(d){return"."==d?b(a?Aa:Ba):g(a?t:l)}}function Ba(a,d){if("target"==d)return f.marked="keyword",b(F)}function Aa(a,d){if("target"==d)return f.marked=
"keyword",b(M)}function ra(a){return":"==a?b(k,s):g(F,n(";"),k)}function ya(a){if("variable"==a)return f.marked="property",b()}function ga(a,d){if("async"==a)return b(ga);if("variable"==a||"keyword"==f.style)return f.marked="property","get"==d||"set"==d?b(Ca):b(H);if("number"==a||"string"==a)return f.marked=L?"property":f.style+" property",b(H);if("jsonld-keyword"==a)return b(H);if("["==a)return b(l,n("]"),H)}function Ca(a){if("variable"!=a)return g(H);f.marked="property";return b(u)}function H(a){if(":"==
a)return b(t);if("("==a)return g(u)}function E(a,d){function e(c){return","==c?(c=f.state.lexical,"call"==c.info&&(c.pos=(c.pos||0)+1),b(a,e)):c==d?b():b(n(d))}return function(c){return c==d?b():g(a,e)}}function G(a,d,e){for(var c=3;c<arguments.length;c++)f.cc.push(arguments[c]);return b(m(d,e),E(a,d),k)}function U(a){return"}"==a?b():g(s,U)}function ha(a){if(ia&&":"==a)return b(Da)}function Ea(a,d){if("="==d)return b(t)}function Da(a){if("variable"==a)return f.marked="variable-3",b()}function T(){return g(v,
ha,X,Fa)}function v(a,d){if("variable"==a)return B(d),b();if("spread"==a)return b(v);if("["==a)return G(v,"]");if("{"==a)return G(Ga,"}")}function Ga(a,d){if("variable"==a&&!f.stream.match(/^\s*:/,!1))return B(d),b(X);"variable"==a&&(f.marked="property");return"spread"==a?b(v):b(n(":"),v,X)}function X(a,d){if("="==d)return b(t)}function Fa(a){if(","==a)return b(T)}function aa(a,d){if("keyword b"==a&&"else"==d)return b(m("form","else"),s,k)}function ba(a){if("("==a)return b(m(")"),Ha,n(")"),k)}function Ha(a){return"var"==
a?b(T,n(";"),P):";"==a?b(P):"variable"==a?b(Ia):g(l,n(";"),P)}function Ia(a,d){return"in"==d||"of"==d?(f.marked="keyword",b(l)):b(F,P)}function P(a,d){return";"==a?b(ja):"in"==d||"of"==d?(f.marked="keyword",b(l)):g(l,n(";"),ja)}function ja(a){")"!=a&&b(l)}function u(a,d){if("*"==d)return f.marked="keyword",b(u);if("variable"==a)return B(d),b(u);if("("==a)return b(C,m(")"),E(V,")"),k,s,D)}function V(a){return"spread"==a?b(V):g(v,ha,Ea)}function sa(a,d){if("variable"==a)return B(d),b(ka)}function ka(a,
d){if("extends"==d)return b(l,ka);if("{"==a)return b(m("}"),x,k)}function x(a,d){if("variable"==a||"keyword"==f.style){if("static"==d)return f.marked="keyword",b(x);f.marked="property";return"get"==d||"set"==d?b(Ja,u,x):b(u,x)}if("*"==d)return f.marked="keyword",b(x);if(";"==a)return b(x);if("}"==a)return b()}function Ja(a){if("variable"!=a)return g();f.marked="property";return b()}function ta(a,d){return"*"==d?(f.marked="keyword",b(la,n(";"))):"default"==d?(f.marked="keyword",b(l,n(";"))):g(s)}function ua(a){return"string"==
a?b():g(Y,la)}function Y(a,d){if("{"==a)return G(Y,"}");"variable"==a&&B(d);"*"==d&&(f.marked="keyword");return b(Ka)}function Ka(a,d){if("as"==d)return f.marked="keyword",b(Y)}function la(a,d){if("from"==d)return f.marked="keyword",b(l)}function wa(a){return"]"==a?b():g(t,La)}function La(a){return"for"==a?g(N,n("]")):","==a?b(E(fa,"]")):g(E(t,"]"))}function N(a){if("for"==a)return b(ba,N);if("if"==a)return b(l,N)}var y=na.indentUnit,ma=r.statementIndent,L=r.jsonld,z=r.json||L,ia=r.typescript,R=r.wordCharacters||
/[\w$\xa1-\uffff]/,Z=function(){function a(a){return{type:a,style:"keyword"}}var b=a("keyword a"),e=a("keyword b"),c=a("keyword c"),f=a("operator"),h={type:"atom",style:"atom"},b={"if":a("if"),"while":b,"with":b,"else":e,"do":e,"try":e,"finally":e,"return":c,"break":c,"continue":c,"new":a("new"),"delete":c,"throw":c,"debugger":c,"var":a("var"),"const":a("var"),let:a("var"),async:a("async"),"function":a("function"),"catch":a("catch"),"for":a("for"),"switch":a("switch"),"case":a("case"),"default":a("default"),
"in":f,"typeof":f,"instanceof":f,"true":h,"false":h,"null":h,undefined:h,NaN:h,Infinity:h,"this":a("this"),"class":a("class"),"super":a("atom"),await:c,yield:c,"export":a("export"),"import":a("import"),"extends":c};if(ia){var e={type:"variable",style:"variable-3"},e={"interface":a("interface"),"extends":a("extends"),constructor:a("constructor"),"public":a("public"),"private":a("private"),"protected":a("protected"),"static":a("static"),string:e,number:e,"boolean":e,any:e},g;for(g in e)b[g]=e[g]}return b}(),
K=/[+\-*&%=<>!?|~^]/,pa=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,A,I,va={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},f={state:null,column:null,marked:null,cc:null},qa={name:"this",next:{name:"arguments"}};k.lex=!0;return{startState:function(a){a={tokenize:w,lastType:"sof",cc:[],lexical:new $((a||0)-y,0,"block",!1),localVars:r.localVars,context:r.localVars&&{vars:r.localVars},indented:0};r.globalVars&&"object"==typeof r.globalVars&&
(a.globalVars=r.globalVars);return a},token:function(a,b){a.sol()&&(b.lexical.hasOwnProperty("align")||(b.lexical.align=!1),b.indented=a.indentation(),S(a,b));if(b.tokenize!=J&&a.eatSpace())return null;var e=b.tokenize(a,b);if("comment"==A)return e;b.lastType="operator"!=A||"++"!=I&&"--"!=I?A:"incdec";a:{var c=A,g=I,h=b.cc;f.state=b;f.stream=a;f.marked=null;f.cc=h;f.style=e;b.lexical.hasOwnProperty("align")||(b.lexical.align=!0);for(;;)if((h.length?h.pop():z?l:s)(c,g)){for(;h.length&&h[h.length-1].lex;)h.pop()();
if(f.marked){e=f.marked;break a}if(c="variable"==c)b:{for(c=b.localVars;c;c=c.next)if(c.name==g){c=!0;break b}for(h=b.context;h;h=h.prev)for(c=h.vars;c;c=c.next)if(c.name==g){c=!0;break b}c=void 0}if(c){e="variable-2";break a}break a}}return e},indent:function(a,b){if(a.tokenize==J)return q.Pass;if(a.tokenize!=w)return 0;var e=b&&b.charAt(0),c=a.lexical;if(!/^\s*else\b/.test(b))for(var f=a.cc.length-1;0<=f;--f){var g=a.cc[f];if(g==k)c=c.prev;else if(g!=aa)break}"stat"==c.type&&"}"==e&&(c=c.prev);
ma&&")"==c.type&&"stat"==c.prev.type&&(c=c.prev);f=c.type;g=e==f;return"vardef"==f?c.indented+("operator"==a.lastType||","==a.lastType?c.info+1:0):"form"==f&&"{"==e?c.indented:"form"==f?c.indented+y:"stat"==f?(e=c.indented,c="operator"==a.lastType||","==a.lastType||K.test(b.charAt(0))||/[,.]/.test(b.charAt(0)),e+(c?ma||y:0)):"switch"!=c.info||g||0==r.doubleIndentSwitch?c.align?c.column+(g?0:1):c.indented+(g?0:y):c.indented+(/^(?:case|default)\b/.test(b)?y:2*y)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,
blockCommentStart:z?null:"/*",blockCommentEnd:z?null:"*/",lineComment:z?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:z?"json":"javascript",jsonldMode:L,jsonMode:z}});q.registerHelper("wordChars","javascript",/[\w$]/);q.defineMIME("text/javascript","javascript");q.defineMIME("text/ecmascript","javascript");q.defineMIME("application/javascript","javascript");q.defineMIME("application/x-javascript","javascript");q.defineMIME("application/ecmascript","javascript");q.defineMIME("application/json",
{name:"javascript",json:!0});q.defineMIME("application/x-json",{name:"javascript",json:!0});q.defineMIME("application/ld+json",{name:"javascript",jsonld:!0});q.defineMIME("text/typescript",{name:"javascript",typescript:!0});q.defineMIME("application/typescript",{name:"javascript",typescript:!0})});