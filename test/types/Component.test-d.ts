import assert from "static-type-assert";

import Component from "../../src/Component";
import ComponentEvent from "../../src/ComponentEvent";

import { test } from "./type-utils";

interface TestEventDefinitions {
  evt1: {
    a: number;
  };
  evt2: (arg0: {
    b: string;
  }, arg1: boolean) => void;
  evt3: (arg0: {
    c: boolean;
  }) => any;
  evt4: void;
  evt5: ComponentEvent;
  evt6: ComponentEvent<{ a: number; b: string }>;
}

class TestClass extends Component<TestEventDefinitions> {}

const component = new TestClass();

// ✅
test("Correct event definitions", () => {
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
    evt4: void;
    evt5: null;
    evt6: undefined;
    evt7: never;
    evt8: ComponentEvent<{ a: number }>;
  }> {}

  assert<SomeCorrectClass>(new SomeCorrectClass());
});

test("Can receive interface as event types", () => {
  interface SubEventInterface {
    a: string;
    b: number;
  }

  interface TestEventInterface {
    evt1: string;
    evt2: ComponentEvent<{ b: number }>;
    evt3: SubEventInterface;
    evt4: { a: number; b: string };
  }

  class SomeCorrectClass3 extends Component<TestEventInterface> {}

  assert<SomeCorrectClass3>(new SomeCorrectClass3());
});

test("Can make component with event definitions and call methods of it", () => {
  class SomeCorrectClass extends Component<{
    a: any;
  }> {}

  assert<SomeCorrectClass>(new SomeCorrectClass().trigger("a"));
  assert<SomeCorrectClass>(new SomeCorrectClass().on("a", () => {}));
  assert<SomeCorrectClass>(new SomeCorrectClass().once("a", () => {}));
  assert<SomeCorrectClass>(new SomeCorrectClass().off("a", () => {}));
});

test("Correct trigger() usage", () => {
  assert<TestClass>(component.trigger("evt1", { a : 1 }));
  assert<TestClass>(component.trigger("evt2", { b : "" }, true));
  assert<TestClass>(component.trigger("evt3", { c : true }));
  assert<TestClass>(component.trigger("evt4"));
  assert<TestClass>(component.trigger(new ComponentEvent("evt5")));
  assert<TestClass>(component.trigger(new ComponentEvent("evt6", { a: 1, b: "" })));
});

test("Correct on, once usage", () => {
  (["on", "once"] as const).forEach((method: "on" | "once") => {
    assert<TestClass>(component[method]("evt1", e => {
      assert<number>(e.a);
    }));

    assert<TestClass>(component[method]("evt2", (arg0, arg1) => {
      assert<string>(arg0.b);
      assert<boolean>(arg1);
    }));

    assert<TestClass>(component[method]("evt3", e => {
      assert<boolean>(e.c);
    }));

    assert<TestClass>(component[method]({
      evt1: e => {
        assert<number>(e.a);
      },
      evt2: (arg0, arg1) => {
        assert<string>(arg0.b);
        assert<boolean>(arg1);
      }
    }));
  });
});

test("Correct off() usage", () => {
  assert<TestClass>(component.off());
  assert<TestClass>(component.off("evt1"));
  assert<TestClass>(component.off("evt1", e => {
    assert<number>(e.a);
  }));

  assert<TestClass>(
    component.off({
      evt1: e => {
        assert<number>(e.a);
      },
      evt2: (arg0, arg1) => {
        assert<string>(arg0.b);
        assert<boolean>(arg1);
      }
    })
  );
});

test("Default props check for ComponentEvent", () => {
  (["on", "once"] as const).forEach((method: "on" | "once") => {
    assert<TestClass>(component[method]("evt5", e => {
      assert<TestClass>(e.currentTarget);
      assert<"evt5">(e.eventType);
      assert<() => void>(e.stop);
    }));
  });
});

test("Custom props check for ComponentEvent", () => {
  (["on", "once"] as const).forEach((method: "on" | "once") => {
    assert<TestClass>(component[method]("evt6", e => {
      assert<TestClass>(e.currentTarget);
      assert<"evt6">(e.eventType);
      assert<() => void>(e.stop);
      assert<number>(e.a);
      assert<string>(e.b);
    }));
  });
});

test("hasOn has correct type", () => {
  assert<boolean>(component.hasOn("evt1"));
  assert<boolean>(component.hasOn("evt2"));
  assert<boolean>(component.hasOn("evt3"));
});

// ❌
test("Cannot create component without event definitions", () => {
  // @ts-expect-error
  class SomeWrongClass3 extends Component {
    // NOTHING
  }
});

test("Should show error when calling method with not defined event name", () => {
  class NotDefinedClass extends Component<{ b: { prop: number } }> {}

  // @ts-expect-error
  new NotDefinedClass().trigger("a");

  // @ts-expect-error
  new NotDefinedClass().on("a", e => {});

  // @ts-expect-error
  new NotDefinedClass().once("a", e => {});

  // @ts-expect-error
  new NotDefinedClass().off("a", e => {});
});

test("Wrong trigger() usage", () => {
  // @ts-expect-error
  component.trigger();

  // @ts-expect-error
  component.trigger("evt1");

  // @ts-expect-error
  component.trigger("evt1", 1);

  // @ts-expect-error
  component.trigger("evt2", { b: "" });

  // @ts-expect-error
  component.trigger("evt3", { c: true }, 123);

  // @ts-expect-error
  component.trigger("evt4", { a : 1 });

  // @ts-expect-error
  component.trigger("evt4", 1);

  // @ts-expect-error
  component.trigger("evt5");

  // @ts-expect-error
  component.trigger(new ComponentEvent("evt6"));

  // @ts-expect-error
  component.trigger(new ComponentEvent("evt6", { a: 1 }));

  // @ts-expect-error
  component.trigger(new ComponentEvent("not-defined-event"));
});

test("Wrong on, once usage", () => {
  ["on", "once"].forEach((method: string) => {
    const onOnce = method as "on" | "once";

    // @ts-expect-error
    component[onOnce]();

    component[onOnce]("evt1", e => {
      // @ts-expect-error
      e.propThatNotExist;
    });

    // @ts-expect-error
    component[onOnce]("evt1", (e, argThatNotExist) => {});

    // @ts-expect-error
    component[onOnce]("evt2", (arg0, arg1, argThatNotExist) => {});

    // @ts-expect-error
    component[onOnce]("evt3");
  });
});

test("Wrong off usage", () => {
  // @ts-expect-error
  component.off("event-that-not-exist");

  // @ts-expect-error
  component.off("evt1", (e, argThatNotExist) => {});
});

test("Wrong hasOn() usage", () => {
  // @ts-expect-error
  component.hasOn();

  // @ts-expect-error
  component.hasOn("evt-that-dont-exist");
});

test("Parameters of ComponentEvent at on/once", () => {
  ["on", "once"].forEach((method: string) => {
    const onOnce = method as "on" | "once";

    component[onOnce]("evt5", e => {
      // @ts-expect-error
      e.propThatNotExist;

      // @ts-expect-error
      e.a;

      assert<TestClass>(e.currentTarget);
      assert<"evt5">(e.eventType);
      assert<boolean>(e.isCanceled());
      assert<void>(e.stop());
    });

    component[onOnce]("evt6", e => {
      // @ts-expect-error
      e.propThatNotExist;

      assert<TestClass>(e.currentTarget);
      assert<"evt6">(e.eventType);
      assert<boolean>(e.isCanceled());
      assert<void>(e.stop());
      assert<number>(e.a);
      assert<string>(e.b);
    });
  });
});
