"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../../type/enum");
const __1 = require("../../../..");
class Http {
    Load(fn, instance, router) {
        const path = Reflect.getMetadata(enum_1.ControllerType.PATH, fn);
        const method = Reflect.getMetadata(enum_1.ControllerType.METHOD, fn);
        __1.logger.success(`Load method ${method} ${path}`);
        router[method](path, fn.bind(instance));
    }
}
exports.Http = Http;
//# sourceMappingURL=Http.js.map