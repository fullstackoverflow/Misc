import { RequestContext } from "@tosee/util";
import { Context } from "koa";
import { ControllerType, Methods, MethodDecoratorType, Type, ParameterDecoratorType } from "../../core/type/enum";
import { FunctionCache } from "../../util/cache";

const createMappingDecorator = (method: string) => (path: string | RegExp) => {
	return (target: Object, key: string, descriptor: TypedPropertyDescriptor<Function>) => {
		const fn = async function (ctx: Context, next: Function) {
			RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Body, ctx.request.body);
			RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Params, ctx.params);
			RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Query, ctx.request.query);
			RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Header, ctx.request.headers);
			RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Context, ctx);
			await next();
		};
		const func = descriptor.value;
		if (!FunctionCache.has(func)) {
			FunctionCache.set(func, []);
		}
		FunctionCache.get(func).push({ priority: 0, func: fn });
		Reflect.defineMetadata(Type.MethodType, MethodDecoratorType.Http, descriptor.value);
		Reflect.defineMetadata(ControllerType.PATH, path, descriptor.value);
		Reflect.defineMetadata(ControllerType.METHOD, method, descriptor.value);
	};
};

/**
 * Http Method Decorator
 * @param path router prefix
 * @example
 * ```
 * 	
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 		@Get("/test")
 * 		test(@Ctx ctx){
 * 			return new Response(200,null,"hello world");
 * 		}
 * 	}
 * 
 * ```
 */
export function GET(path: string | RegExp) {
	return createMappingDecorator(Methods.GET)(path);
}

/**
 * Http Method Decorator
 * @param path path
 * @example
 * ```
 * 	
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 		@POST("/test")
 * 		test(@Ctx ctx){
 * 			return new Response(200,null,"hello world");
 * 		}
 * 	}
 * 
 * ```
 */

export function POST(path: string | RegExp) {
	return createMappingDecorator(Methods.POST)(path);
}

/**
 * Http Method Decorator
 * @param path path
 * @example
 * ```
 * 	
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 		@PUT("/test")
 * 		test(@Ctx ctx){
 * 			return new Response(200,null,"hello world");
 * 		}
 * 	}
 * 
 * ```
 */
export function PUT(path: string | RegExp) {
	return createMappingDecorator(Methods.PUT)(path);
}

/**
 * Http Method Decorator
 * @param path path
 * @example
 * ```
 * 	
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 		@DELETE("/test")
 * 		test(@Ctx ctx){
 * 			return new Response(200,null,"hello world");
 * 		}
 * 	}
 * 
 * ```
 */
export function DELETE(path: string | RegExp) {
	return createMappingDecorator(Methods.DELETE)(path);
}
