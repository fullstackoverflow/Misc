"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = new Map();
/**
 * Inject a class instance
 * @param params class constructor params
 * @example
 * ```typescript
 *
 * class Service{
 * }
 *
 * class Test{
 *  @Autowired()
 *  Service:Service
 * }
 * ```
 */
function Autowired(target, propertyKey) {
    const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
    const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
    const descriptor = originDescriptor || { writable: true, configurable: true };
    if (!exports.Container.has(typeClass)) {
        exports.Container.set(typeClass, new typeClass());
    }
    descriptor.value = exports.Container.get(typeClass);
    Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
}
exports.Autowired = Autowired;
//# sourceMappingURL=Autowired.js.map