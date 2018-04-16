"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./../core/core");
function Restc(flag) {
    return function (target) {
        if (flag !== false) {
            if (!target.prototype[core_1.symbolConfig]) {
                target.prototype[core_1.symbolConfig] = {};
            }
            target.prototype[core_1.symbolConfig].restc = true;
        }
    };
}
exports.Restc = Restc;
function restc(flag) {
    return function (target, propertyKey, descriptor) {
        if (flag !== false) {
            let config = core_1.Core.__DecoratedRouters.get(target[propertyKey]);
            Object.assign(config, { restc: true });
        }
    };
}
exports.restc = restc;
function describe(data) {
    return function (target, propertyKey, descriptor) {
        let config = core_1.Core.__DecoratedRouters.get(target[propertyKey]);
        Object.assign(config, { describe: data });
    };
}
exports.describe = describe;
//# sourceMappingURL=utils.js.map