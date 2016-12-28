/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/
import Component from "../src/index";
import {module, test, strictEqual, deepEqual, ok, equal} from "qunitjs/qunit/qunit";

class TestClass extends Component{
	constructor(option){
		super();
		this.option(option);
	}
}

module("Component Test");

function noop() {}

var oClass;
module("on method", {
	setup : () => {
		oClass = new TestClass();
	}
});

test("Basic test",() => {
	//Given
	//When
	const returnVal = oClass.on("returnTest", noop);
	//Then
	strictEqual(returnVal, oClass, "When custom event added by on(), return value must be instance itself");
});

test("Add event handler by Object type",() => {
	//Given
	//When
	const returnVal = oClass.on({
		"test2" : noop,
		"test3" : noop
	});

	oClass.on({
		"test2" : noop,
		"test3" : noop
	});

	oClass.on('test3', noop);
	//Then
	strictEqual(returnVal.eventHandler.test2.length,2,"Event handler must added to 'test2'.");
	strictEqual(returnVal.eventHandler.test3.length,3,"Event handler must added to 'test3'");
	strictEqual(returnVal, oClass, "When custom event added by Object type, return value must be instance itself.");
});

test("Add event handler by invalid type",function(){
	//Given
	function getPropertyCount(obj) {
		let count = 0;
		for(let prop in obj) {
			if(Object.prototype.hasOwnProperty.call(window, prop)) {
				// remove constructor (es6) in case of phantomjs
				if(prop !== "constructor") {
					count = count + 1;
				}
			}
		}
		return count;
	}
	//When
	const returnVal1 = oClass.on("test_string");
	const returnVal2 = oClass.on(123);
	const returnVal3 = oClass.on(true);
	const returnVal4 = oClass.on(noop);
	const returnVal5 = oClass.on({test: 123});

	//Then
	strictEqual(getPropertyCount(returnVal1), 0,  "When parameter has string only, it doesn't added to event handler.");
	strictEqual(returnVal1, oClass, "Return value must be instance itself.");
	strictEqual(getPropertyCount(returnVal2), 0, "When parameter has number only, it doesn't added to event handler.");
	strictEqual(returnVal2, oClass, "Return value must be instance itself.");
	strictEqual(getPropertyCount(returnVal3), 0, "When parameter has boolean only, it doesn't added to event handler.");
	strictEqual(returnVal3, oClass, "Return value must be instance itself.");
	strictEqual(getPropertyCount(returnVal4), 0, "When parameter has function only, it doesn't added to event handler.");
	strictEqual(returnVal4, oClass, "Return value must be instance itself.");
	strictEqual(getPropertyCount(returnVal5), 0, "When parameter has invalid, it doesn't added to event handler.");
	strictEqual(returnVal5, oClass, "Return value must be instance itself.");
});

module("on method", {
	setup : function(){
		oClass = new TestClass();
	}
});

test("Basic part",function(){
	//Given
	let oClass2 = oClass.on("customEvent", noop);
	//When
	const nHandlerLength = oClass.eventHandler["customEvent"].length;
	//Then
	strictEqual(oClass2 , oClass, "When remove custom event handler, return value must be instance itself.");
	strictEqual(nHandlerLength , 1, "Event handler length must be 1");
});

test("Re-attach after event detach by string type",function(){
	//Given
	//When
	oClass.on("customEvent", noop);
	oClass.on("customEvent", noop);
	oClass.off("customEvent");
	const oClass2 = oClass.on("customEvent", noop);
	//Then
	strictEqual(oClass2.eventHandler.customEvent.length, 1, "When attach two events to same name and detach event by it name re-attach again, eventHandler length should be 1.");
	strictEqual(oClass2.eventHandler.customEvent[0], noop, "Handler of customEvent should be noop.");
});

test("Re-attach after event detach by string, function type",function(){
	//Given
	//When
	oClass.on("customEvent", noop);
	oClass.on("customEvent", noop);
	oClass.off("customEvent", noop);
	const oClass2 = oClass.on("customEvent", noop);
	//Then
	strictEqual(oClass2.eventHandler.customEvent.length, 2, "When attach two events to same name and detach event by it name re-attach again, eventHandler length should be 2.");
	strictEqual(oClass2.eventHandler.customEvent[0], noop, "First handler of customEvent should be noop.");
	strictEqual(oClass2.eventHandler.customEvent[1], noop, "Second handler of customEvent should be noop.");
});

module("off method", {
	setup : function(){
		oClass = new TestClass();
	}
});

test("Basic part",function(){
	//Given
	oClass.on("customEvent", noop);
	//When
	const oClass2 = oClass.off("customEvent", noop);
	const nHandlerLength = oClass.eventHandler["customEvent"].length;
	//Then
	strictEqual(oClass2 , oClass, "When remove custom event handler, return value must be instance itself.");
	strictEqual(nHandlerLength ,0, "Event handler length must be decrease.");
});

test("Remove nonexistence event handler",function(){
	//Given
	oClass.on("test1", noop);
	//When
	let oClass2 = oClass.off("noevent", noop);
	//Then
	strictEqual(oClass2.eventHandler.test1.length, 1, "It shouldn't remove existing 'test1'");
	strictEqual(oClass2, oClass, "When remove nonexistence custom event handler, return value must be instance itself.");
});

test("Remove event handler by Object type",function(){
	//Given
	var count = 0;
	function test(){
		count++;
	}
	oClass.on("customEvent", test);
	//When
	const oClass2 = oClass.off({
		"customEvent" : test
	});
	oClass2.trigger("customEvent");
	//Then
	strictEqual(count , 0, "Remove event handler must be possible by Object type.");
	strictEqual(oClass2 , oClass, "Return value must be instance itself.");

});

test("Remove all event handlers for same.",function(){
	//Given
	var allOffTestCount = 0;
	oClass.on("allOffTest",function(oCustomEvent){
		allOffTestCount++;
	});
	oClass.on("allOffTest",function(oCustomEvent){
		allOffTestCount++;
	});
	//When
	oClass.off("allOffTest");

	oClass.trigger("allOffTest");
	oClass.trigger("allOffTest");
	//Then
	strictEqual(allOffTestCount,0,"When event name given, it must be removed all event handlers for same.");
});

test("Remove all event handlers.",function(){
	//Given
	var allOffTestCount = 0;
	oClass.on("allOffTest",function(oCustomEvent){
		allOffTestCount++;
	});
	oClass.on("allOffTest",function(oCustomEvent){
		allOffTestCount++;
	});
	oClass.on("allOffTest2",function(oCustomEvent){
		allOffTestCount++;
	});
	oClass.on("allOffTest2",function(oCustomEvent){
		allOffTestCount++;
	});
	//When
	oClass.off();

	oClass.trigger("allOffTest");
	oClass.trigger("allOffTest2");
	//Then
	strictEqual(allOffTestCount,0,"If there is no event name for off(), it must be removed all event handlers of component.");
});





module("trigger method", {
	setup : function(){
		oClass = new TestClass();
	}
});
test("Return value test for trigger method",function(){
	//Given
	//When
	let returnVal = oClass.trigger("noevent");
	//Then
	ok(returnVal, "If there is no event handler for event name, return value must be true.");

	//Given
	oClass.on("test", noop);
	//When
	returnVal = oClass.trigger("test");
	//Then
	ok(returnVal, "When pull the event handler trigger for 'test', return value must be true.");
});

test("Test for run trigger method",function(){
	//Given
	var oCustomEvent = { nValue : 3 };
	var param = [];
	oClass.on("test", function (oCustomEvent,a,b,c) {
		oCustomEvent.nValue = 100;
		param.push(a);
		param.push(b);
		param.push(c);
	});
	//When
	const parameterCheck = oClass.trigger("test", oCustomEvent, 1, 2, 3);
	//Then
	strictEqual(oCustomEvent.nValue,100, "After event handler running, value of 'oCustomEvent.nValue' must be change to 100.");
	deepEqual(param,[1,2,3], "More than 2 parameters will be passed to 'trigger()' method.");

});
test("Check custom event",function(){
	//Given
	var eventType, stopType;
	oClass.on("eventType",function(oCustomEvent){
		eventType = oCustomEvent.eventType;
		stopType = typeof oCustomEvent.stop;
	});
	//When
	oClass.trigger("eventType");
	//Then
	strictEqual(eventType,"eventType","EventType value must be appointed event name.");
	strictEqual(stopType,"function","It should have stop method.");
});

module("stop method", {
	setup : function(){
		oClass = new TestClass();
	}
});

test("Basic test",function(){
	//Given
	oClass.on("test", function(oCustomEvent){
		oCustomEvent.stop();
	});
	//When
	const result = oClass.trigger("test");
	//Then
	ok( result === false, "Stop() method should return false.");
});

test("Test for multiple event handler",function(){
	//Given
	oClass.on("test", (oCustomEvent)=>{
		oCustomEvent.stop();
	});
	oClass.on("test", noop);
	//When
	const result = oClass.trigger("test");
	//Then
	ok( result === false, "When stop method called while running multiple event handler for same custom event, return value must be false.");
});

module("hasOn method", {
	setup : function(){
		oClass = new TestClass();
	}
});

test("Event existence/nonexistence",function(){
	//Given
	oClass.on("test", noop);
	//When
	const result = oClass.hasOn("test");
	//Then
	ok( result, "Event existence.");

	//When
	const result2 = oClass.hasOn("test2");
	//Then
	ok( !result2, "Event nonexistence.");
});



module("option method", {
	setup : function(){
		oClass = new TestClass({
			"foo": 1,
			"bar": 2
		});
	}
});

test("Option method should be support 4 features.",function(){
	//Given
	//When
	let result = oClass.option("foo");
	//Then
	ok( result, 1);

	//Given
	//When
	result = oClass.option("foo",2);
	//Then
	equal( oClass.option("foo"), 2);
	ok( result instanceof TestClass );

	//Given
	//When
	result = oClass.option({
		"foo": 3,
		"bar": 4
	});
	//Then
	equal( oClass.option("foo"), 3);
	equal( oClass.option("bar"), 4);
	ok( result instanceof TestClass );

	//Given
	//When
	result = oClass.option();
	//Then
	deepEqual( result, {
		"foo": 3,
		"bar": 4
	});
});

test("The error should not occur without initialization of options property in SubClass construct of Component.",function(){
	//Given
	class MyClass extends Component{
		constructor(option){
			super();
			this.option(option);
		}
	}
	var result = true;

	//When
	try{
		new MyClass({
			"foo" : 1
		});
	}catch(e){
		result = false;
	}
	//Then
	ok(result);
});

module("once method", {
	setup : function(){
		oClass = new TestClass({
			"foo": 1,
			"bar": 2
		});
	}
});

// test("once method should be fire event one time.",function(){
// 	//Given
// 	let callCount = 0;
// 	//When
// 	oClass.once("test",()=>{
// 		callCount++;
// 	});
// 	oClass.trigger("test");
// 	//Then
// 	ok( callCount, 1);

// 	//Given
// 	//When
// 	oClass.trigger("test");
// 	//Then
// 	ok( callCount, 1);
// });

// test("should be support object type.",function(){
// 	//Given
// 	let callCount = 0, callCount2 = 0;
// 	//When
// 	oClass.once({
// 		"test"(){
// 			callCount++;
// 		},
// 		"test2"(){
// 			callCount2++;
// 		}
// 	});
// 	oClass.trigger("test");
// 	oClass.trigger("test2");
// 	//Then
// 	ok( callCount, 1);
// 	ok( callCount2, 1);

// 	//Given
// 	//When
// 	oClass.trigger("test");
// 	oClass.trigger("test2");
// 	//Then
// 	ok( callCount, 1);
// 	ok( callCount2, 1);
// });

test("should be recevied parameters",function(){
	//Given
	let callCount = 0, e, a = {"a":1}, b = {"b":1}, param1;
	oClass.once("test", (event, aa) => {
		callCount++;
		e = event;
		param1 = aa;
	});

	//When
	oClass.trigger("test", a, b);

	//Then
	equal(a.a, e.a);
	ok(typeof e.stop === "function");
	equal(b, param1);
});

