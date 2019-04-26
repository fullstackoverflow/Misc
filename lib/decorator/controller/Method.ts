import { ControllerType, Methods, MethodDecoratorType, Type } from "../../core/type/enum";

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
	return (target, key, descriptor) => {
		Reflect.defineMetadata(Type.MethodType, MethodDecoratorType.Http, descriptor.value);
		Reflect.defineMetadata(ControllerType.PATH, path, descriptor.value);
		Reflect.defineMetadata(ControllerType.METHOD, method, descriptor.value);
	};
};

export const GET = createMappingDecorator(Methods.GET);
export const POST = createMappingDecorator(Methods.POST);
export const PUT = createMappingDecorator(Methods.PUT);
export const DELETE = createMappingDecorator(Methods.DELETE);
