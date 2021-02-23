/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
class ComponentEvent<PROPS, TYPE extends string = string, THIS = any> {
  public currentTarget: THIS;

  private _isCanceled: boolean;

  public constructor(
    public readonly eventType: TYPE,
    props: PROPS
  ) {
    for (const key of Object.keys(props)) {
      const value = props[key];

      this[key] = value;
    }

    this._isCanceled = false;
  }

  public stop() {
    this._isCanceled = true;
  }

  public isCanceled() {
    return this._isCanceled;
  }
}

export default ComponentEvent;
