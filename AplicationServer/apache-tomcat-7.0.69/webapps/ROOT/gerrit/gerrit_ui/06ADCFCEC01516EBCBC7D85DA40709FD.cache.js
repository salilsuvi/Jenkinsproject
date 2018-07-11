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
(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("go",function(f){function g(a,c){var b=a.next();if('"'==b||"'"==b||"`"==b)return c.tokenize=q(b),c.tokenize(a,c);if(/[\d\.]/.test(b))return"."==b?a.match(/^[0-9]+([eE][\-+]?[0-9]+)?/):"0"==b?a.match(/^[xX][0-9a-fA-F]+/)||a.match(/^0[0-7]+/):a.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/),"number";
if(/[\[\]{}\(\),;\:\.]/.test(b))return e=b,null;if("/"==b){if(a.eat("*"))return c.tokenize=k,k(a,c);if(a.eat("/"))return a.skipToEnd(),"comment"}if(l.test(b))return a.eatWhile(l),"operator";a.eatWhile(/[\w\$_\xa1-\uffff]/);b=a.current();if(r.propertyIsEnumerable(b)){if("case"==b||"default"==b)e="case";return"keyword"}return s.propertyIsEnumerable(b)?"atom":"variable"}function q(a){return function(c,b){for(var d=!1,e,f=!1;null!=(e=c.next());){if(e==a&&!d){f=!0;break}d=!d&&"`"!=a&&"\\"==e}if(f||!d&&
"`"!=a)b.tokenize=g;return"string"}}function k(a,c){for(var b=!1,d;d=a.next();){if("/"==d&&b){c.tokenize=g;break}b="*"==d}return"comment"}function m(a,c,b,d,e){this.indented=a;this.column=c;this.type=b;this.align=d;this.prev=e}function h(a,c,b){return a.context=new m(a.indented,c,b,null,a.context)}function n(a){if(a.context.prev){var c=a.context.type;if(")"==c||"]"==c||"}"==c)a.indented=a.context.indented;return a.context=a.context.prev}}var p=f.indentUnit,r={"break":!0,"case":!0,chan:!0,"const":!0,
"continue":!0,"default":!0,defer:!0,"else":!0,fallthrough:!0,"for":!0,func:!0,go:!0,"goto":!0,"if":!0,"import":!0,"interface":!0,map:!0,"package":!0,range:!0,"return":!0,select:!0,struct:!0,"switch":!0,type:!0,"var":!0,bool:!0,"byte":!0,complex64:!0,complex128:!0,float32:!0,float64:!0,int8:!0,int16:!0,int32:!0,int64:!0,string:!0,uint8:!0,uint16:!0,uint32:!0,uint64:!0,"int":!0,uint:!0,uintptr:!0},s={"true":!0,"false":!0,iota:!0,nil:!0,append:!0,cap:!0,close:!0,complex:!0,copy:!0,imag:!0,len:!0,make:!0,
"new":!0,panic:!0,print:!0,println:!0,real:!0,recover:!0},l=/[+\-*&^%:=<>!|\/]/,e;return{startState:function(a){return{tokenize:null,context:new m((a||0)-p,0,"top",!1),indented:0,startOfLine:!0}},token:function(a,c){var b=c.context;a.sol()&&(null==b.align&&(b.align=!1),c.indented=a.indentation(),c.startOfLine=!0,"case"==b.type&&(b.type="}"));if(a.eatSpace())return null;e=null;var d=(c.tokenize||g)(a,c);if("comment"==d)return d;null==b.align&&(b.align=!0);"{"==e?h(c,a.column(),"}"):"["==e?h(c,a.column(),
"]"):"("==e?h(c,a.column(),")"):"case"==e?b.type="case":"}"==e&&"}"==b.type?n(c):e==b.type&&n(c);c.startOfLine=!1;return d},indent:function(a,c){if(a.tokenize!=g&&null!=a.tokenize)return 0;var b=a.context,d=c&&c.charAt(0);if("case"==b.type&&/^(?:case|default)\b/.test(c))return a.context.type="}",b.indented;d=d==b.type;return b.align?b.column+(d?0:1):b.indented+(d?0:p)},electricChars:"{}):",fold:"brace",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}});f.defineMIME("text/x-go","go")});
