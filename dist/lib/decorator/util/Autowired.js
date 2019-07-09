"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../core/type/enum");
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
    const singleton = Reflect.getMetadata(enum_1.Type.ClassType, typeClass);
    let obj;
    if (singleton === enum_1.ClassDecoratorType.Singleton) {
        if (!exports.Container.has(typeClass)) {
            exports.Container.set(typeClass, new typeClass());
        }
        obj = exports.Container.get(typeClass);
    }
    else {
        obj = new typeClass();
    }
    descriptor.value = obj;
    Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
}
exports.Autowired = Autowired;
//# sourceMappingURL=Autowired.js.map