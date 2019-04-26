import { ControllerType, ClassDecoratorType, Type } from "../../core/type/enum";

export const Controller = (path?: string): ClassDecorator => {
	return target => {
		Reflect.defineMetadata(ControllerType.PREFIX, path, target);
		Reflect.defineMetadata(Type.ClassType, ClassDecoratorType.Controller, target);
	};
};
