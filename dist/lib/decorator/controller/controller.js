"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../core/type/enum");
exports.Controller = (path) => {
    return target => {
        Reflect.defineMetadata(enum_1.ControllerType.PREFIX, path, target);
        Reflect.defineMetadata(enum_1.Type.ClassType, enum_1.ClassDecoratorType.Controller, target);
    };
};
//# sourceMappingURL=controller.js.map