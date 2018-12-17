"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../util/config");
exports.Value = (params) => {
    return (target, propertyKey) => {
        const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
        const descriptor = originDescriptor || { configurable: true };
        descriptor.get = () => {
            return config_1.Config.instance[params];
        };
        Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
    };
};
//# sourceMappingURL=Value.js.map