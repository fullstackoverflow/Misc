import { ClassDecoratorType, Type } from "../../core/type/enum";

export const Singleton = target => {
	Reflect.defineMetadata(Type.ClassType, ClassDecoratorType.Singleton, target);
};
