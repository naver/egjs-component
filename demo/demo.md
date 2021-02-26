### Basic

{% include_relative assets/html/demo.html %}

```js
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component{
	foo() {
		this.trigger("hi"); // fire hi event.
	}

  bar() {
    this.trigger(new ComponentEvent("bye", { foo: 1, bar: "bye" })) // Fire bye event with the additional properties
  }
}

const some = new Some();
some.on("hi", () => {
	console.log("fire hi event");
});

some.on("bye", e => {
  // These properties are supported additionally by using ComponentEvent
  e.eventType; // string
  e.currentTarget; // some(instance of the class Some)
  e.stop();
  e.isCanceled();

  // Additional event parameters
  e.foo; // 1
  e.bar; // "bye"
});
```
