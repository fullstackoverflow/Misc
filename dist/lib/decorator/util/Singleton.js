"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../core/type/enum");
exports.Singleton = target => {
    Reflect.defineMetadata(enum_1.Type.ClassType, enum_1.ClassDecoratorType.Singleton, target);
};
//# sourceMappingURL=Singleton.js.map