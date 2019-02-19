import { Context } from "koa";
import compose from "koa-compose";

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
export function Before<T>(...func: Array<compose.Middleware<T>>) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const originFunction: Function = descriptor.value;
		descriptor.value = async function(ctx, next) {
			const middlewares = compose(func);
			await middlewares(ctx, next);
			await originFunction.apply(this, arguments);
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
export function After<T>(...func: Array<compose.Middleware<T>>) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const originFunction: Function = descriptor.value;
		descriptor.value = async function(ctx, next) {
			await originFunction.apply(this, arguments);
			const middlewares = compose(func);
			await middlewares(ctx, next);
		};
	};
}
