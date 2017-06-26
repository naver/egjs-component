### Browser support
IE 7+ (possibly 9 also), latest of Chrome/FF/Safari, iOS 7+ and Android 2.3+ (except 3.x)

### Quick steps to use:

#### Load files


``` html
<!-- 1) Load egjs packaged file -->
{% for dist in site.data.egjs.dist %}
<script src="//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ dist }}"></script>
{% endfor %}
```

#### Use Component(ES6)

``` javascript
// es6 style
class Some extends eg.Component{
	foo(){
		this.trigger("hi");// fire hi event.
	}
}

var some = new Some();
some.on("hi",()=>{
	console.log("fire hi event");
});
```

#### Use Component(ES5)

``` javascript
//es5 style
function Some(){
	
}
Some.prototype = new eg.Component(); //extends
Some.prototype.constructor = Some;
Some.prototype.foo = function(){
	this.trigger("hi");// fire hi event.
}

var some = new Some();
some.on("hi",function(){
	console.log("fire hi event");
});
```