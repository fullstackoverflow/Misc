"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../core/type/enum");
exports.Component = () => {
    return target => {
        Reflect.defineMetadata(enum_1.Type.ClassType, enum_1.ClassDecoratorType.Component, target);
    };
};
//# sourceMappingURL=Component.js.map