### Basic

{% include_relative assets/html/demo.html %}

```js
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
