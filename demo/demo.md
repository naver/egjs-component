### Basic

{% include_relative assets/html/demo.html %}

```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  hi: ComponentEvent;
}> {
  foo() {
    this.trigger(new ComponentEvent("hi")); // fire hi event.
  }
}

const some = new Some();
some.on("hi", e => {
  console.log("hi event fired");
  console.log(e.eventType); // "hi"
  console.log(e.currentTarget); // some
});
```
