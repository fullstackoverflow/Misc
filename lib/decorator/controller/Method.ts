import { ControllerType, Methods, MethodDecoratorType, Type } from "../../core/type/enum";

const createMappingDecorator = (method: string) => (path: string | RegExp): MethodDecorator => {
	return (target: any, key, descriptor) => {
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
 * 		test(ctx:Context,next:Function){
 * 			ctx.body="hello world";
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
 * 		test(ctx:Context,next:Function){
 * 			ctx.body="hello world";
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
 * 		test(ctx:Context,next:Function){
 * 			ctx.body="hello world";
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
 * 		test(ctx:Context,next:Function){
 * 			ctx.body="hello world";
 * 		}
 * 	}
 * 
 * ```
 */
export function DELETE(path: string | RegExp) {
	return createMappingDecorator(Methods.DELETE)(path);
}
