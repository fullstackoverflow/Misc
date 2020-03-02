import { ControllerType, ClassDecoratorType, Type } from "../../core/type/enum";
import { ControllerCache, RelationCache,MethodCache } from "../../core/cache";

export const Controller = (path?: string): ClassDecorator => {
	return target => {
		ControllerCache.set(target.prototype, {
			prefix: path
		});
		if (!RelationCache.get(target.prototype)) {
			RelationCache.set(target.prototype, []);
		}
		Reflect.defineMetadata(ControllerType.PREFIX, path, target);
		Reflect.defineMetadata(Type.ClassType, ClassDecoratorType.Controller, target);
	};
};
