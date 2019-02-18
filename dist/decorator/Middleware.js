"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compose_1 = __importDefault(require("koa-compose"));
function Before(...func) {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = async function (ctx, next) {
            const middlewares = koa_compose_1.default(func);
            await middlewares(ctx, next);
            await originFunction.apply(this, arguments);
        };
    };
}
exports.Before = Before;
function After(...func) {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = async function (ctx, next) {
            await originFunction.apply(this, arguments);
            const middlewares = koa_compose_1.default(func);
            await middlewares(ctx, next);
        };
    };
}
exports.After = After;
//# sourceMappingURL=Middleware.js.map