"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../util/log");
function Deprecated() {
    return function (target, key, descriptor) {
        Object.defineProperty(target, key, Object.assign({}, descriptor, { value: function (...arg) {
                log_1.logger.info(`Function ${key} is deprecated`);
                return descriptor.value.apply(this, arg);
            } }));
    };
}
exports.Deprecated = Deprecated;
//# sourceMappingURL=Deprecated.js.map