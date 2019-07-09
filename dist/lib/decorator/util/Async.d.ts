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
export declare function Retry(opts: number | {
    times: number;
    interval: number | ((retryCount: number) => number);
}): (target: any, key: string, descriptor: PropertyDescriptor) => {
    get(): any;
};
