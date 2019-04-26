import { ClassDecoratorType, Type } from "../../core/type/enum";

export const Component = (): ClassDecorator => {
	return target => {
		Reflect.defineMetadata(Type.ClassType, ClassDecoratorType.Component, target);
	};
};
