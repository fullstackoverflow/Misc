"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
require("reflect-metadata");
function USE(url) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata(key, {
            path: url,
            method: "use",
            value: descriptor.value
        }, target);
    };
}
exports.USE = USE;
function POST(url) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata(key, {
            path: url,
            method: "post",
            value: descriptor.value
        }, target);
    };
}
exports.POST = POST;
function GET(url) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata(key, {
            path: url,
            method: "get",
            value: descriptor.value
        }, target);
    };
}
exports.GET = GET;
function DELETE(url) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata(key, {
            path: url,
            method: "delete",
            value: descriptor.value
        }, target);
    };
}
exports.DELETE = DELETE;
function PUT(url) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata(key, {
            path: url,
            method: "put",
            value: descriptor.value
        }, target);
    };
}
exports.PUT = PUT;
/**
 * rewrite class constructor
 * @param prefix router prefix
 * @example
 * ```
 *
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 	}
 *
 * ```
 */
function Controller(prefix = "") {
    return function (constructor) {
        Reflect.defineMetadata("test", "test-value", constructor.prototype);
        const originalConstructor = constructor;
        function instanciate(constructor, ...args) {
            const instance = new constructor(...args);
            let router = new koa_router_1.default({
                prefix
            });
            Reflect.getMetadataKeys(instance).forEach(key => {
                const config = Reflect.getMetadata(key, instance);
                router[config.method](config.path, config.value.bind(instance));
            });
            return router;
        }
        // the new constructor behaviour
        const newConstructor = function (...args) {
            return instanciate(originalConstructor, args);
        };
        // copy prototype so instanceof operator still works
        newConstructor.prototype = originalConstructor.prototype;
        // return new constructor (will override original)
        return newConstructor;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=Http.js.map