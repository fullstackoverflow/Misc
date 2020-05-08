"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../core/type/enum");
const createMappingDecorator = (method) => (path) => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(enum_1.Type.MethodType, enum_1.MethodDecoratorType.Http, descriptor.value);
        Reflect.defineMetadata(enum_1.ControllerType.PATH, path, descriptor.value);
        Reflect.defineMetadata(enum_1.ControllerType.METHOD, method, descriptor.value);
    };
};
exports.GET = createMappingDecorator(enum_1.Methods.GET);
exports.POST = createMappingDecorator(enum_1.Methods.POST);
exports.PUT = createMappingDecorator(enum_1.Methods.PUT);
exports.DELETE = createMappingDecorator(enum_1.Methods.DELETE);
//# sourceMappingURL=Method.js.map