"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function Before(func) {
    return function (target, key, descriptor) {
        const method = descriptor.value;
        if (method.constructor.name === "AsyncFunction") {
            descriptor.value = async function () {
                func(...arguments);
                return await method.apply(this, arguments);
            };
        }
        else {
            descriptor.value = function () {
                func(...arguments);
                return method.apply(this, arguments);
            };
        }
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
function After(func) {
    return function (target, key, descriptor) {
        const method = descriptor.value;
        if (method.constructor.name === "AsyncFunction") {
            descriptor.value = async function () {
                const result = await method.apply(this, arguments);
                func(...arguments);
                return result;
            };
        }
        else {
            descriptor.value = function () {
                const result = method.apply(this, arguments);
                func(...arguments);
                return result;
            };
        }
    };
}
exports.After = After;
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
function Around(func) {
    return function (target, key, descriptor) {
        const method = descriptor.value;
        if (method.constructor.name === "AsyncFunction") {
            descriptor.value = async function () {
                func(...arguments);
                const result = await method.apply(this, arguments);
                func(...arguments);
                return result;
            };
        }
        else {
            descriptor.value = function () {
                func(...arguments);
                const result = method.apply(this, arguments);
                func(...arguments);
                return result;
            };
        }
    };
}
exports.Around = Around;
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
function Catch(func) {
    return function (target, key, descriptor) {
        const method = descriptor.value;
        descriptor.value = async function () {
            try {
                const result = await method.apply(this, arguments);
                return result;
            }
            catch (e) {
                return func(e);
            }
        };
    };
}
exports.Catch = Catch;
//# sourceMappingURL=Aop.js.map