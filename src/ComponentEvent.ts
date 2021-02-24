/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEventConstructor } from "./types";

export class _ComponentEvent<PROPS extends Record<string, any>, TYPE extends string = string, THIS = any> {
  public currentTarget: THIS;

  private _canceled: boolean;

  public constructor(
    public readonly eventType: TYPE,
    props: PROPS
  ) {
    this._canceled = false;

    if (!props) return;

    for (const key of Object.keys(props as Record<string, any>)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this[key] = props[key];
    }
  }

  public stop() {
    this._canceled = true;
  }

  public isCanceled() {
    return this._canceled;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ComponentEvent = _ComponentEvent as ComponentEventConstructor;

export default ComponentEvent;
