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

#### Use Component(ES5)

``` javascript
//es5 style
function Some(){

}
Some.prototype = new Component(); //extends
Some.prototype.constructor = Some;
Some.prototype.foo = function() {
  this.trigger("hi"); // fire hi event.
}

var some = new Some();
some.on("hi", function() {
  console.log("fire hi event");
});
```
