import { symbolRoutePrefix } from "../core/core";

export function Controller(path: string):ClassDecorator {
  return function (target: Function) {
      target.prototype[symbolRoutePrefix]=path;
  }
}