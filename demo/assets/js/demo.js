
window.onload = function(){
	function Some(){

	}
	Some.prototype = new Component(); //extends
	Some.prototype.constructor = Some;
	Some.prototype.foo = function(){
		this.trigger("hi");// fire hi event.
	}

	var some = new Some();


	function desc(str) {
		document.getElementById('desc').innerText = str;
	}
	function desc2(str) {
		document.getElementById('desc2').innerText = str;
	}
	var count = 0;
	function fired(){
		count++;
		desc2(count+" fired hi event");
	}

	document.getElementById('btn_trigger').addEventListener("click",function(e) {
		e.preventDefault();
		some.foo();
		desc("'hi' event trigger.");
	});

	document.getElementById('btn_attach').addEventListener("click",function(e) {
		e.preventDefault();
		some.on("hi",fired);
		desc("'hi' event on.");
	});

	document.getElementById('btn_detach').addEventListener("click",function(e) {
		e.preventDefault();
		some.off("hi",fired);
		desc("'hi' event off.");
	});
}
