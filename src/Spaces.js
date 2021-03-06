define("amber_core/Spaces", ["amber_vm/smalltalk", "amber_vm/nil", "amber_vm/_st", "amber_vm/globals", "amber_core/Kernel-Objects", "amber_core/Kernel-Exceptions", "amber_core/SUnit"], function(smalltalk,nil,_st, globals){
smalltalk.addPackage('Spaces');
smalltalk.packages["Spaces"].transport = {"type":"amd","amdNamespace":"amber_core"};

smalltalk.addClass('ObjectSpace', globals.Object, ['frame'], 'Spaces');
globals.ObjectSpace.comment="I am a connection to another Smalltalk environment.\x0aThe implementation creates an iframe on the same location as the window, and connect to the Amber environment.\x0a\x0a\x0a\x0a## Usage example:\x0a\x0a\x09| space |\x0a\x09\x0a\x09space := ObjectSpace new.\x0a\x09space do: [ smalltalk ] \x22Answers aSmalltalk\x22\x0a\x09(space do: [ smalltalk ]) == smalltalk \x22Answers false\x22\x0a\x09\x0a\x09space release \x22Remove the object space environment\x22";
smalltalk.addMethod(
smalltalk.method({
selector: "connectTo:",
protocol: 'initialization',
fn: function (aFrame){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._release();
self["@frame"]=aFrame;
return self}, function($ctx1) {$ctx1.fill(self,"connectTo:",{aFrame:aFrame},globals.ObjectSpace)})},
args: ["aFrame"],
source: "connectTo: aFrame\x0a\x09self release.\x0a\x09frame := aFrame",
messageSends: ["release"],
referencedClasses: []
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "create",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1="body"._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
_st($1)._append_("<iframe style=\x22display: none;\x22></iframe>");
self["@frame"]=_st(_st("iframe"._asJQuery())._get())._last();
_st(_st(self["@frame"])._contentWindow())._location_(_st(window)._location());
return self}, function($ctx1) {$ctx1.fill(self,"create",{},globals.ObjectSpace)})},
args: [],
source: "create\x0a\x09'body' asJQuery append: '<iframe style=\x22display: none;\x22></iframe>'.\x0a\x09frame := 'iframe' asJQuery get last.\x0a\x09frame contentWindow location: window location",
messageSends: ["append:", "asJQuery", "last", "get", "location:", "contentWindow", "location"],
referencedClasses: []
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "destroy",
protocol: 'releasing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$receiver;
$1=self["@frame"];
if(($receiver = $1) == nil || $receiver == null){
return self;
} else {
$1;
};
_st(_st(self["@frame"])._asJQuery())._remove();
self._release();
return self}, function($ctx1) {$ctx1.fill(self,"destroy",{},globals.ObjectSpace)})},
args: [],
source: "destroy\x0a\x09frame ifNil: [ ^ self ].\x0a\x09frame asJQuery remove.\x0a\x0a\x09self release",
messageSends: ["ifNil:", "remove", "asJQuery", "release"],
referencedClasses: []
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "do:",
protocol: 'evaluating',
fn: function (aBlock){
var self=this;
function $ObjectSpaceConnectionError(){return globals.ObjectSpaceConnectionError||(typeof ObjectSpaceConnectionError=="undefined"?nil:ObjectSpaceConnectionError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$4,$5,$3;
$1=self._isConnected();
if(! smalltalk.assert($1)){
$2=_st($ObjectSpaceConnectionError())._signal();
return $2;
};
$4=_st(self["@frame"])._contentWindow();
$5=_st("(".__comma(_st(aBlock)._compiledSource())).__comma(")()");
$ctx1.sendIdx[","]=1;
$3=_st($4)._eval_($5);
return $3;
}, function($ctx1) {$ctx1.fill(self,"do:",{aBlock:aBlock},globals.ObjectSpace)})},
args: ["aBlock"],
source: "do: aBlock\x0a\x09self isConnected ifFalse: [ ^ ObjectSpaceConnectionError signal ].\x0a\x09^ frame contentWindow eval: '(', aBlock compiledSource, ')()'",
messageSends: ["ifFalse:", "isConnected", "signal", "eval:", "contentWindow", ",", "compiledSource"],
referencedClasses: ["ObjectSpaceConnectionError"]
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "frame",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@frame"];
return $1;
},
args: [],
source: "frame\x0a\x09^ frame",
messageSends: [],
referencedClasses: []
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
globals.ObjectSpace.superclass.fn.prototype._initialize.apply(_st(self), []);
self._create();
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.ObjectSpace)})},
args: [],
source: "initialize\x0a\x09super initialize.\x0a\x09self create",
messageSends: ["initialize", "create"],
referencedClasses: []
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "isConnected",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._frame())._notNil();
return $1;
}, function($ctx1) {$ctx1.fill(self,"isConnected",{},globals.ObjectSpace)})},
args: [],
source: "isConnected\x0a\x09^ self frame notNil",
messageSends: ["notNil", "frame"],
referencedClasses: []
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "release",
protocol: 'releasing',
fn: function (){
var self=this;
self["@frame"]=nil;
return self},
args: [],
source: "release\x0a\x09frame := nil",
messageSends: [],
referencedClasses: []
}),
globals.ObjectSpace);

smalltalk.addMethod(
smalltalk.method({
selector: "whenReadyDo:",
protocol: 'events',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(self["@frame"])._asJQuery())._bind_do_("load",aBlock);
return self}, function($ctx1) {$ctx1.fill(self,"whenReadyDo:",{aBlock:aBlock},globals.ObjectSpace)})},
args: ["aBlock"],
source: "whenReadyDo: aBlock\x0a\x09frame asJQuery\x0a\x09\x09bind: 'load'\x0a\x09\x09do: aBlock",
messageSends: ["bind:do:", "asJQuery"],
referencedClasses: []
}),
globals.ObjectSpace);


smalltalk.addMethod(
smalltalk.method({
selector: "on:",
protocol: 'instance creation',
fn: function (aFrame){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._basicNew();
_st($2)._connectTo_(aFrame);
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"on:",{aFrame:aFrame},globals.ObjectSpace.klass)})},
args: ["aFrame"],
source: "on: aFrame\x0a\x09^ self basicNew\x0a\x09\x09connectTo: aFrame;\x0a\x09\x09yourself",
messageSends: ["connectTo:", "basicNew", "yourself"],
referencedClasses: []
}),
globals.ObjectSpace.klass);


smalltalk.addClass('ObjectSpaceConnectionError', globals.Error, [], 'Spaces');
smalltalk.addMethod(
smalltalk.method({
selector: "messageText",
protocol: 'accessing',
fn: function (){
var self=this;
return "The ObjectSpace is not connected";
},
args: [],
source: "messageText\x0a\x09^ 'The ObjectSpace is not connected'",
messageSends: [],
referencedClasses: []
}),
globals.ObjectSpaceConnectionError);



smalltalk.addClass('ObjectSpaceTest', globals.TestCase, ['space'], 'Spaces');
smalltalk.addMethod(
smalltalk.method({
selector: "setUp",
protocol: 'initialization',
fn: function (){
var self=this;
function $ObjectSpace(){return globals.ObjectSpace||(typeof ObjectSpace=="undefined"?nil:ObjectSpace)}
return smalltalk.withContext(function($ctx1) { 
self["@space"]=_st($ObjectSpace())._new();
return self}, function($ctx1) {$ctx1.fill(self,"setUp",{},globals.ObjectSpaceTest)})},
args: [],
source: "setUp\x0a\x09space := ObjectSpace new",
messageSends: ["new"],
referencedClasses: ["ObjectSpace"]
}),
globals.ObjectSpaceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "tearDown",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self["@space"])._destroy();
return self}, function($ctx1) {$ctx1.fill(self,"tearDown",{},globals.ObjectSpaceTest)})},
args: [],
source: "tearDown\x0a\x09space destroy",
messageSends: ["destroy"],
referencedClasses: []
}),
globals.ObjectSpaceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testConnection",
protocol: 'tests',
fn: function (){
var self=this;
function $ObjectSpaceConnectionError(){return globals.ObjectSpaceConnectionError||(typeof ObjectSpaceConnectionError=="undefined"?nil:ObjectSpaceConnectionError)}
return smalltalk.withContext(function($ctx1) { 
_st(self["@space"])._destroy();
self._deny_(_st(self["@space"])._isConnected());
self._should_raise_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(self["@space"])._do_((function(){
}));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$ObjectSpaceConnectionError());
return self}, function($ctx1) {$ctx1.fill(self,"testConnection",{},globals.ObjectSpaceTest)})},
args: [],
source: "testConnection\x0a\x09space destroy.\x0a\x09self deny: space isConnected.\x0a\x09self should: [ space do: [] ] raise: ObjectSpaceConnectionError",
messageSends: ["destroy", "deny:", "isConnected", "should:raise:", "do:"],
referencedClasses: ["ObjectSpaceConnectionError"]
}),
globals.ObjectSpaceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testCreate",
protocol: 'tests',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._assert_(_st(_st(self["@space"])._frame())._notNil());
$ctx1.sendIdx["assert:"]=1;
self._assert_(_st(self["@space"])._isConnected());
return self}, function($ctx1) {$ctx1.fill(self,"testCreate",{},globals.ObjectSpaceTest)})},
args: [],
source: "testCreate\x0a\x0a\x09self assert: space frame notNil.\x0a\x09self assert: space isConnected",
messageSends: ["assert:", "notNil", "frame", "isConnected"],
referencedClasses: []
}),
globals.ObjectSpaceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testEvaluation",
protocol: 'tests',
fn: function (){
var self=this;
var result;
function $Smalltalk(){return globals.Smalltalk||(typeof Smalltalk=="undefined"?nil:Smalltalk)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
_st(self["@space"])._whenReadyDo_((function(){
return smalltalk.withContext(function($ctx2) {
result=_st(self["@space"])._do_((function(){
return smalltalk;
}));
result;
$2=_st(result)._class();
$ctx2.sendIdx["class"]=1;
$1=_st($2)._name();
self._assert_equals_($1,"Smalltalk");
self._deny_(_st(_st(result)._class()).__eq($Smalltalk()));
$ctx2.sendIdx["deny:"]=1;
return self._deny_(_st(result).__eq_eq(smalltalk));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testEvaluation",{result:result},globals.ObjectSpaceTest)})},
args: [],
source: "testEvaluation\x0a\x09| result |\x0a\x0a\x09space whenReadyDo: [\x0a\x09\x09result := space do: [ smalltalk ].\x0a\x0a\x09\x09self assert: result class name equals: 'Smalltalk'.\x0a\x09\x09self deny: result class = Smalltalk.\x0a\x09\x09self deny: result == smalltalk ]",
messageSends: ["whenReadyDo:", "do:", "assert:equals:", "name", "class", "deny:", "=", "=="],
referencedClasses: ["Smalltalk"]
}),
globals.ObjectSpaceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRelease",
protocol: 'tests',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=_st(self["@space"])._frame();
$ctx1.sendIdx["frame"]=1;
$1=_st($2)._isNil();
$ctx1.sendIdx["isNil"]=1;
self._deny_($1);
_st(self["@space"])._release();
self._assert_(_st(_st(self["@space"])._frame())._isNil());
return self}, function($ctx1) {$ctx1.fill(self,"testRelease",{},globals.ObjectSpaceTest)})},
args: [],
source: "testRelease\x0a\x0a\x09self deny: space frame isNil.\x0a\x0a\x09space release.\x0a\x09\x0a\x09self assert: space frame isNil",
messageSends: ["deny:", "isNil", "frame", "release", "assert:"],
referencedClasses: []
}),
globals.ObjectSpaceTest);


});
