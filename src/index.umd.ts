/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component, * as modules from "./index";

for (const name in modules) {
  (Component as any)[name] = (modules as any)[name];
}
export default Component;
