"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../type/enum");
const koa_router_1 = __importDefault(require("koa-router"));
const util_1 = require("@tosee/util");
const Http_1 = require("./methods/Http");
const log_1 = require("../../../util/log");
class ControllerLoader {
    Load(clazz, app) {
        const prefix = Reflect.getMetadata(enum_1.ControllerType.PREFIX, clazz);
        const router = new koa_router_1.default(prefix ? { prefix } : null);
        log_1.logger.success(`Load router ${prefix || "/"}`);
        const instance = new clazz();
        const prototype = Object.getPrototypeOf(instance);
        const methodsNames = Object.getOwnPropertyNames(prototype).filter(item => typeof prototype[item] == "function" && item != "constructor");
        methodsNames.forEach(methodName => {
            const fn = prototype[methodName];
            const MethodType = Reflect.getMetadata(enum_1.Type.MethodType, fn);
            if (MethodType != undefined) {
                this[MethodType].Load(fn, instance, router);
            }
        });
        app.use(router.routes()).use(router.allowedMethods());
    }
}
_a = enum_1.MethodDecoratorType.Http;
__decorate([
    util_1.Autowired(),
    __metadata("design:type", Http_1.Http)
], ControllerLoader.prototype, _a, void 0);
exports.ControllerLoader = ControllerLoader;
//# sourceMappingURL=ControllerLoader.js.map