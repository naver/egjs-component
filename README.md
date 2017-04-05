# egjs-component
A class used to manage events and options in a component

## Documentation
* API Documentation
    - Latest: [http://naver.github.io/egjs/latest/doc/eg.Component.html](http://naver.github.io/egjs/latest/doc/eg.Component.html)
    - Specific version: [http://naver.github.io/egjs/[VERSION]/doc/eg.Component.html](http://naver.github.io/egjs/[VERSION]/doc/eg.Component.html)
* An advanced demo is available here: [http://naver.github.io/egjs/demo/component/](http://naver.github.io/egjs/demo/component/)

## Supported Browsers
The following table shows browsers supported by eg.InfiniteGrid

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|7+|Latest|Latest|Latest|7+|2.1+(except 3.x)|



## Dependency
Nothing.

## How to Use

### 1. Load component.js
```html
<script src="../dist/infinitegrid.js"></script>
```

### 2. Use eg.Component
```javascript
class Some extends eg.Component {
  hi() {
    alert("hi");
  }
  thing() {
    this.once("hi", this.hi);
  }
}

var some = new Some();
some.thing();
some.trigger("hi");
// fire alert("hi");
some.trigger("hi");
// Nothing happens
```

## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-component/issues) page on GitHub.


## License
eg.Component is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2015 NAVER Corp.

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
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
