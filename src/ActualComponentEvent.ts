import { DefaultProps } from "./types";

// This is named same to ComponentEvent intentionally
class ComponentEvent<PROPS extends Record<string, any>, TYPE extends string = string, THIS = any> implements DefaultProps<TYPE, THIS> {
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

export default ComponentEvent;
