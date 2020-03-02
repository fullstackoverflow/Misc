import { ControllerType, Methods, MethodDecoratorType, Type } from "../../core/type/enum";
import { MethodCache, RelationCache, ControllerCache } from "../../core/cache";

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
	return (target: any, key, descriptor) => {
		let info = MethodCache.get(descriptor.value);
		if (!info) {
			MethodCache.set(descriptor.value, {
				method,
				path
			});
		} else {
			MethodCache.set(descriptor.value, {
				...info,
				method,
				path
			});
		}
		let relation = RelationCache.get(target);
		if (!relation) {
			relation = [];
		}
		relation.push(descriptor.value);
		RelationCache.set(target, relation);
		const originalValue = descriptor.value;
		Reflect.defineMetadata(Type.MethodType, MethodDecoratorType.Http, descriptor.value);
		Reflect.defineMetadata(ControllerType.PATH, path, descriptor.value);
		Reflect.defineMetadata(ControllerType.METHOD, method, descriptor.value);
	};
};

export const GET = createMappingDecorator(Methods.GET);
export const POST = createMappingDecorator(Methods.POST);
export const PUT = createMappingDecorator(Methods.PUT);
export const DELETE = createMappingDecorator(Methods.DELETE);
