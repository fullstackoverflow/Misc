import { logger } from "../util/log";

export function Deprecated(): MethodDecorator {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    Object.defineProperty(target, key, {
      ...descriptor,
      value: function(...arg) {
        logger.info(`Function ${key} is deprecated`);
        return descriptor.value.apply(this, arg);
      }
    });
  };
}
