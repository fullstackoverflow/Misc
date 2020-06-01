import { ControllerType, ClassDecoratorType, Type } from "../../core/type/enum";

/**
 * Controller Decorator
 * @param path router prefix
 * @example
 * ```
 * 	
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 	}
 * 
 * ```
 */
export const Controller = (path?: string): ClassDecorator => {
	return target => {
		Reflect.defineMetadata(ControllerType.PREFIX, path, target);
		Reflect.defineMetadata(Type.ClassType, ClassDecoratorType.Controller, target);
	};
};
