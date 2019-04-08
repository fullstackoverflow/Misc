"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compose_1 = __importDefault(require("koa-compose"));
/**
 *
 * @param func Middlewares
 * @example
 * ```
 *
 * 	@Controller()
 * 	export default class Router {
 * 		@GET('/test')
 * 		@Before((ctx,next)=>{
 * 			ctx.state='test';
 * 		})
 * 		async test(){
 * 			ctx.body = ctx.state;
 * 		}
 * 	}
 *
 * ```
 */
function Before(...func) {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = async function (ctx, next) {
            console.log(Reflect.getMetadata("config", target).value);
            const middlewares = koa_compose_1.default(func.map(f => f.apply(Reflect.getMetadata("config", target).value)));
            await middlewares(ctx, next);
            await originFunction.apply(this, arguments);
        };
        // descriptor.value.prototype = originFunction.prototype;
    };
}
exports.Before = Before;
/**
 *
 * @param func Middlewares
 * @example
 * ```
 *
 * 	@Controller()
 * 	export default class Router {
 * 		@GET('/test')
 * 		@After((ctx,next)=>{
 * 			ctx.body='changed';
 * 		})
 * 		async test(){
 * 			ctx.body = 'origin';
 * 		}
 * 	}
 *
 * ```
 */
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