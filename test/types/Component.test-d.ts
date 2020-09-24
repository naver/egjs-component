import Component from ".";

const test = (testName: string, func: (...args: any[]) => any) => {}

class TestClass extends Component<{
  evt1: {
    a: number;
  };
  evt2: (arg0: {
    b: string;
  }, arg1: boolean) => void;
  evt3: (arg0: {
    c: boolean;
  }) => any;
}> {};

const component = new TestClass();

// ✅
test("Correct event definitions", () => {
  // $ExpectType SomeCorrectClass
  class SomeCorrectClass extends Component<{
    evt1: {
      prop0: number;
      prop1: string;
      prop2: object;
      prop3: {
        nested0: number;
        nested1: string;
      };
      prop4: (arg0: number) => void;
    };
    evt2: (arg0: {
      b: string;
    }, arg1: boolean) => any;
    evt3: (arg0: {
      c: boolean;
    }) => any;
  }> {};
});

test("Correct trigger() usage", () => {
  // $ExpectType boolean
  component.trigger("evt1", { a : 1 });

  // $ExpectType boolean
  component.trigger("evt2", { b : "" }, true);

  // $ExpectType boolean
  component.trigger("evt3", { c : true });
});

test("Correct on, once usage", () => {
  ["on", "once"].forEach((method: "on" | "once") => {
    // $ExpectType TestClass
    component[method]("evt1", e => {
      // $ExpectType number
      e.a;
    });

    // $ExpectType TestClass
    component[method]("evt2", (arg0, arg1) => {
      // $ExpectType string
      arg0.b

      // $ExpectType boolean
      arg1
    });

    // $ExpectType TestClass
    component[method]("evt3", e => {
      // $ExpectType boolean
      e.c
    });

    // $ExpectType TestClass
    component[method]({
      evt1: e => {
        // $ExpectType number
        e.a;
      },
      evt2: (arg0, arg1) => {
        // $ExpectType string
        arg0.b

        // $ExpectType boolean
        arg1
      },
    })
  });
});

test("Correct off() usage", () => {
  // $ExpectType TestClass
  component.off();

  // $ExpectType TestClass
  component.off("evt1");

  // $ExpectType TestClass
  component.off("evt1", e => {
    // $ExpectType number
    e.a;
  });

  // $ExpectType TestClass
  component.off({
    evt1: e => {
      // $ExpectType number
      e.a;
    },
    evt2: (arg0, arg1) => {
      // $ExpectType string
      arg0.b

      // $ExpectType boolean
      arg1
    },
  })
});

test("Default props check", () => {
  ["on", "once"].forEach((method: "on" | "once") => {
    // $ExpectType TestClass
    component[method]("evt1", () => {});

    // $ExpectType TestClass
    component[method]("evt1", e => {
      // $ExpectType string
      e.eventType

      // $ExpectType () => void
      e.stop
    });

    // $ExpectType TestClass
    component[method]("evt2", (arg0) => {});

    // $ExpectType TestClass
    component[method]("evt2", (arg0, arg1) => {
      // $ExpectType string
      arg0.eventType

      // $ExpectType () => void
      arg0.stop
    });

    // $ExpectType TestClass
    component[method]("evt3", () => {});

    // $ExpectType TestClass
    component[method]("evt3", e => {
      // $ExpectType string
      e.eventType

      // $ExpectType () => void
      e.stop

      return false;
    });
  });
});

test("hasOn has correct type", () => {
  // $ExpectType boolean
  component.hasOn("evt1");

  // $ExpectType boolean
  component.hasOn("evt2");

  // $ExpectType boolean
  component.hasOn("evt3");
});

// ❌
test("Wrong event definitions", () => {
  // $ExpectError
  class SomeWrongClass extends Component<{
    evt1: number;
  }> {};

  // $ExpectError
  class SomeWrongClass2 extends Component<{
    evt1: (arg0: number) => void;
  }> {};
});

test("Wrong trigger() usage", () => {
  // $ExpectError
  component.trigger();

  // $ExpectError
  component.trigger("evt1");

  // $ExpectError
  component.trigger("evt1", 1);

  // $ExpectError
  component.trigger("evt2", { b: "" });

  // $ExpectError
  component.trigger("evt3", { c: true }, 123);
});

test("Wrong on, once usage", () => {
  ["on", "once"].forEach((method: "on" | "once") => {
    // $ExpectError
    component[method]();

    component[method]("evt1", e => {
      // $ExpectError
      e.propThatNotExist;
    });

    // $ExpectError
    component[method]("evt1", (e, argThatNotExist) => {});

    // $ExpectError
    component[method]("evt2", (arg0, arg1, argThatNotExist) => {});

    // $ExpectError
    component[method]("evt3");
  });
});

test("Wrong off usage", () => {
  // $ExpectError
  component.off("event-that-not-exist");

  // $ExpectError
  component.off("evt1", (e, argThatNotExist) => {});
});

test("Wrong hasOn() usage", () => {
  // $ExpectError
  component.hasOn();

  // $ExpectError
  component.hasOn("evt-that-dont-exist");
});
