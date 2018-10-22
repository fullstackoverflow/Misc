"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autowired = (params = "") => {
    return (target, propertyKey) => {
        const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
        const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
        const descriptor = originDescriptor || { writable: true, configurable: true };
        descriptor.value = params ? new typeClass(params) : new typeClass();
        Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
    };
};
//# sourceMappingURL=Autowired.js.map