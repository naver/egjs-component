/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * Types that can be used when attaching new event definition as generic on a class
 *
 * @ko 클래스 타입 등록시 사용가능한 타입
 * @example
 * ```
 * new SomeClass<{
 *   // Using it as object
 *   evt0: {
 *     param0: number;
 *     param1: string
 *   };
 *   // Using it as function with other arguments
 *   evt1: (arg0: {
 *     param0: number;
 *     param1: string
 *   }, arg1: string, arg2: boolean) => boolean;
 * }>
 * ```
 */

import { _ComponentEvent } from "./ComponentEvent";

export type AnyFunction = (...args: any[]) => any;
export type NoArguments = undefined | null | void | never;
export type EventMap = Record<string, any>;
export type EventKey<T extends EventMap> = string & keyof T;
export type EventHash<T extends EventMap, THIS> = Partial<{ [K in EventKey<T>]: EventCallback<T, K, THIS> }>;

export type EventCallback<T extends EventMap, K extends EventKey<T>, THIS>
  = T[K] extends NoArguments
    ? () => any
    : T[K] extends AnyFunction
      ? T[K]
      : T[K] extends EventProps<infer PROPS>
        ? (event: _ComponentEvent<PROPS, K, THIS> & PROPS) => any
        : (event: T[K]) => any;

export type EventTriggerParams<T, K extends EventKey<T>>
  = T[K] extends NoArguments
    ? void[]
    : T[K] extends AnyFunction
      ? Parameters<T[K]>
      : [T[K]];

export interface ComponentEventConstructor {
  new<PROPS extends Record<string, any>, TYPE extends string = string, THIS = any>(eventType: TYPE, props: PROPS): _ComponentEvent<PROPS, TYPE, THIS> & PROPS;
  new<TYPE extends string = string, THIS = any>(eventType: TYPE): _ComponentEvent<Record<string, never>, TYPE, THIS>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type EventProps<PROPS extends Record<string, any> = {}> = _ComponentEvent<PROPS> & PROPS;
