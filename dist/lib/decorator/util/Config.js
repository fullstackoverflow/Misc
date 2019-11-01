"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../core/type/enum");
exports.ConfigComponent = (env = "default") => {
    return target => {
        Reflect.defineMetadata(enum_1.ConfigType.ENV, env, target);
        Reflect.defineMetadata(enum_1.Type.ClassType, enum_1.ClassDecoratorType.Config, target);
    };
};
//# sourceMappingURL=Config.js.map