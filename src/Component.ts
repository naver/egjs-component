/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { isUndefined } from "./utils";
import { EventCallback, EventHash, EventKey, EventMap, EventTriggerParams } from "./types";
import ComponentEvent from "./ComponentEvent";

/**
 * A class used to manage events in a component
 * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
 * @alias eg.Component
 */
class Component<T extends EventMap> {
  /**
   * Version info string
   * @ko 버전정보 문자열
   * @name VERSION
   * @static
   * @example
   * eg.Component.VERSION;  // ex) 3.0.0
   * @memberof eg.Component
   */
  public static VERSION: string = "#__VERSION__#";

  private _eventHandler: { [keys: string]: Array<(...args: any[]) => any> };

  /**
   * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
   */
  public constructor() {
    this._eventHandler = {};
  }

  public trigger<K extends EventKey<T>>(event: ComponentEvent<T[K], K>): this;
  public trigger<K extends EventKey<T>>(eventName: K, ...params: EventTriggerParams<T, K>): this;
  /**
   * Triggers a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @param {string} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
   * @param {object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @param {any[]} restParam Additional parameters when triggering a custom event <ko>커스텀 이벤트가 발생할 때 필요시 추가적으로 전달할 데이터</ko>
   * @return Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   some(){
   *     if(this.trigger("beforeHi")){ // When event call to stop return false.
   *       this.trigger("hi");// fire hi event.
   *     }
   *   }
   * }
   *
   * const some = new Some();
   * some.on("beforeHi", (e) => {
   *   if(condition){
   *     e.stop(); // When event call to stop, `hi` event not call.
   *   }
   * });
   * some.on("hi", (e) => {
   *   // `currentTarget` is component instance.
   *   console.log(some === e.currentTarget); // true
   * });
   * // If you want to more know event design. You can see article.
   * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
   * ```
   */
  public trigger<K extends EventKey<T>>(event: K | ComponentEvent<K, T[K]>, ...params: EventTriggerParams<T, K> | void[]): this {
    const eventName = event instanceof ComponentEvent
      ? event.eventType
      : event;

    const handlers = this._eventHandler[eventName] || [];

    if (handlers.length <= 0) {
      return this;
    }

    if (event instanceof ComponentEvent) {
      handlers.forEach((handler: (event: ComponentEvent<T[K], K, this>) => any) => {
        handler(event);
      });
    } else {
      handlers.forEach(handler => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        handler(...params);
      });
    }

    return this;
  }

  public once<K extends EventKey<T>>(eventName: K, handlerToAttach: EventCallback<T, K, this>): this;
  public once(eventHash: EventHash<T, this>): this;
  /**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   * hi() {
   *   alert("hi");
   * }
   * thing() {
   *   this.once("hi", this.hi);
   * }
   *
   * var some = new Some();
   * some.thing();
   * some.trigger("hi");
   * // fire alert("hi");
   * some.trigger("hi");
   * // Nothing happens
   * ```
   */
  public once<K extends EventKey<T>>(eventName: K | EventHash<T, this>, handlerToAttach?: EventCallback<T, K, this>): this {
    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      const eventHash = eventName;

      for (const key in eventHash) {
        this.once((key as K), eventHash[key] as EventCallback<T, K, this>);
      }
      return this;
    } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
      const listener: any = (...args: any[]) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        handlerToAttach(...args);
        this.off(eventName, listener);
      };

      this.on(eventName, listener);
    }

    return this;
  }

  /**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   some() {
   *     this.hasOn("hi");// check hi event.
   *   }
   * }
   * ```
   */
  public hasOn<K extends EventKey<T>>(eventName: K): boolean {
    return !!this._eventHandler[eventName];
  }

  public on<K extends EventKey<T>>(eventName: K, handlerToAttach: EventCallback<T, K, this>): this;
  public on(eventHash: EventHash<T, this>): this;
  /**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.on("hi",this.hi); //attach event
   *   }
   * }
   * ```
   */
  public on<K extends EventKey<T>>(eventName: K | EventHash<T, this>, handlerToAttach?: EventCallback<T, K, this>): this {
    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      const eventHash = eventName;

      for (const name in eventHash) {
        this.on(name, eventHash[name] as any);
      }

      return this;
    } else if (typeof eventName === "string" &&
      typeof handlerToAttach === "function") {
      let handlerList = this._eventHandler[eventName];

      if (isUndefined(handlerList)) {
        this._eventHandler[eventName] = [];
        handlerList = this._eventHandler[eventName];
      }

      handlerList.push(handlerToAttach as EventCallback<T, EventKey<T>, this>);
    }

    return this;
  }

  public off(eventHash?: EventHash<T, this>): this;
  public off<K extends EventKey<T>>(eventName: K, handlerToDetach?: EventCallback<T, K, this>): this;
  /**
   * Detaches an event from the component.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다
   * @param {string} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.off("hi",this.hi); //detach event
   *   }
   * }
   * ```
   */
  public off<K extends EventKey<T>>(eventName?: K | EventHash<T, this>, handlerToDetach?: EventCallback<T, K, this>): this {
    // Detach all event handlers.
    if (isUndefined(eventName)) {
      this._eventHandler = {};
      return this;
    }

    // Detach all handlers for eventname or detach event handlers by object.
    if (isUndefined(handlerToDetach)) {
      if (typeof eventName === "string") {
        delete this._eventHandler[eventName];
        return this;
      } else {
        const eventHash = eventName;

        for (const name in eventHash) {
          this.off(name, eventHash[name] as any);
        }
        return this;
      }
    }

    // Detach single event handler
    const handlerList = this._eventHandler[eventName as K];

    if (handlerList) {
      let idx = 0;
      for (const handlerFunction of handlerList) {
        if (handlerFunction === handlerToDetach) {
          handlerList.splice(idx, 1);
          break;
        }
        idx++;
      }
    }

    return this;
  }
}

export default Component;
