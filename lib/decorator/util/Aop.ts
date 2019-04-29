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
export function Before(func: Function) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const method = descriptor.value;
		descriptor.value = async function() {
			func(this, arguments);
			const result = method.apply(this, arguments);
			return result;
		};
	};
}

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
export function After(func: Function) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const method = descriptor.value;
		descriptor.value = async function() {
			const result = method.apply(this, arguments);
			func.apply(this, arguments);
			return result;
		};
	};
}

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
export function Around(func: Function) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const method = descriptor.value;
		descriptor.value = async function() {
			func.apply(this, arguments);
			const result = await method.apply(this, arguments);
			func.apply(this, arguments);
			return result;
		};
	};
}

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
export function Catch(func: Function) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const method = descriptor.value;
		descriptor.value = async function() {
			try {
				const result = await method.apply(this, arguments);
				return result;
			} catch (e) {
				return func(e);
			}
		};
	};
}
