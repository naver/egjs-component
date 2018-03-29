// Type definitions for egjs-component 2.0
// Project: https://github.com/naver/egjs-component
// Definitions by: Naver <https://github.com/naver>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export as namespace eg;


declare class Component {
  constructor(options?: { [key: string]: any });
  trigger(eventName: string, customEvent?: { [key: string]: any }): boolean;
  hasOn(eventName: string): boolean;
  on(eventName: string, handlerToAttach: (event: { [key: string]: any }) => any): this;
  on(events: { [key: string]: (event: { [key: string]: any }) => any }): this;
  off(eventName?: string, handlerToAttach?: (event: { [key: string]: any }) => any): this;
  once(events: { [key: string]: (event: { [key: string]: any }) => any }): this;
  once(eventName: string, handlerToAttach: (event: { [key: string]: any }) => any): this;
  options: { [key: string]: any };
}
declare namespace Component {
  function trigger(eventName: string, customEvent?: { [key: string]: any }): boolean;
  function hasOn(eventName: string): boolean;
  function on(eventName: string, handlerToAttach: (event: { [key: string]: any }) => any): Component;
  function on(events: { [key: string]: (event: { [key: string]: any }) => any }): Component;
  function off(eventName?: string, handlerToAttach?: (event: { [key: string]: any }) => any): Component;
  function once(events: { [key: string]: (event: { [key: string]: any }) => any }): Component;
  function once(eventName: string, handlerToAttach: (event: { [key: string]: any }) => any): Component;
  let options: { [key: string]: any };
}

export default Component;
