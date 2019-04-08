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
export declare function Before<T>(...func: Array<compose.Middleware<T>>): (target: any, key: string, descriptor: PropertyDescriptor) => void;
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
export declare function After<T>(...func: Array<compose.Middleware<T>>): (target: any, key: string, descriptor: PropertyDescriptor) => void;
