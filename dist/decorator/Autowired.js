"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MODE;
(function (MODE) {
    MODE[MODE["Sigleton"] = 0] = "Sigleton";
    MODE[MODE["Ordinary"] = 1] = "Ordinary";
})(MODE = exports.MODE || (exports.MODE = {}));
const Container = new Map();
function Autowired(options = { mode: MODE.Ordinary, arguments: [] }) {
    return (target, propertyKey) => {
        const { mode } = options;
        const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
        const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
        const descriptor = originDescriptor || { writable: true, configurable: true };
        if (mode == MODE.Sigleton) {
            if (!Container.has(typeClass)) {
                Container.set(typeClass, new typeClass());
            }
            descriptor.value = Container.get(typeClass);
        }
        else {
            descriptor.value = new typeClass(...options.arguments);
        }
        Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
    };
}
exports.Autowired = Autowired;
//# sourceMappingURL=Autowired.js.map