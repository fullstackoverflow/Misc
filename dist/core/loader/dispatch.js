"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../type/enum");
const koa_router_1 = __importDefault(require("koa-router"));
class Dispatch {
    [enum_1.ClassDecoratorType.Controller](clazz, app) {
        const prefix = Reflect.getMetadata(enum_1.ControllerType.PREFIX, clazz);
        const router = new koa_router_1.default(prefix ? { prefix } : null);
        const instance = new clazz();
        const prototype = Object.getPrototypeOf(instance);
        const methodsNames = Object.getOwnPropertyNames(prototype).filter(item => typeof prototype[item] == "function" && item != "constructor");
        methodsNames.forEach(methodName => {
            const fn = prototype[methodName];
            if (Reflect.getMetadata(enum_1.Type.MethodType, fn) == enum_1.MethodDecoratorType.Http) {
                const path = Reflect.getMetadata(enum_1.ControllerType.PATH, fn);
                const method = Reflect.getMetadata(enum_1.ControllerType.METHOD, fn);
                console.log(prefix, path, method);
                router[method](path, fn.bind(instance));
            }
        });
        app.use(router.routes()).use(router.allowedMethods());
    }
}
exports.Dispatch = Dispatch;
//# sourceMappingURL=dispatch.js.map