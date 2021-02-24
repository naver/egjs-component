import ComponentEvent from "../../src/ComponentEvent";

describe("ComponentEvent", () => {
  describe("properties", () => {
    it("should have default properties", () => {
      // Given
      const evtName = "test-event-name";

      // When
      const evt = new ComponentEvent(evtName);

      // Then
      expect(evt.eventType).to.equal(evtName);
      expect(typeof evt.stop).to.equal("function");
      expect(typeof evt.isCanceled).to.equal("function");
    });

    it("should have currentTarget as undefined", () => {
      expect(new ComponentEvent("test").currentTarget).to.be.undefined;
    });

    it("should have provided properties in it", () => {
      // Given
      const props = {
        a: 5,
        b: "123",
        c: ["abc", 123, null],
        d: null
      };

      // When
      const evt = new ComponentEvent("test", props);

      // Then
      expect(evt.a).to.equal(props.a);
      expect(evt.b).to.equal(props.b);
      expect(evt.c).to.equal(props.c);
      expect(evt.d).to.equal(props.d);
    });
  });

  describe("stop", () => {
    it("should make isCanceled to return true after calling it", () => {
      // Given
      const evt = new ComponentEvent("test");

      // When
      evt.stop();

      // Then
      expect(evt.isCanceled()).to.be.true;
    });
  });

  describe("isCanceled", () => {
    it("should return false by default", () => {
      expect(new ComponentEvent("test").isCanceled()).to.be.false;
    });
  });
});
