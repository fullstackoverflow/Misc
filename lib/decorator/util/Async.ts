import { retry } from "async";

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
export function Retry(
	opts:
		| number
		| {
				times: number;
				interval: number | ((retryCount: number) => number);
		  }
) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const fn = descriptor.value;
		return {
			get(): any {
				const boundFn = fn.bind(this);
				if (fn.constructor.name === "AsyncFunction") {
					return async function() {
						return new Promise((resolve, reject) => {
							retry(opts, boundFn, function(err, result) {
								if (err) {
									reject(err);
								}
								resolve(result);
							});
						});
					};
				} else {
					return function() {
						let error;
						for (let count = 0; count < opts; count++) {
							try {
								return boundFn.apply(this, arguments);
							} catch (e) {
								error = e;
							}
						}
						throw error;
					};
				}
			}
		};
	};
}