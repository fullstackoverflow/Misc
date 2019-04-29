"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
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
function Retry(opts) {
    return function (target, key, descriptor) {
        const fn = descriptor.value;
        return {
            get() {
                const boundFn = fn.bind(this);
                return async function () {
                    return new Promise((resolve, reject) => {
                        console.log(typeof boundFn);
                        async_1.retry(opts, boundFn, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            resolve(result);
                        });
                    });
                };
            }
        };
    };
}
exports.Retry = Retry;
//# sourceMappingURL=Async.js.map