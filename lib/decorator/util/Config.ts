import { Type, ClassDecoratorType, ConfigType } from "../../core/type/enum";

export const Config = (env = "default"): ClassDecorator => {
	return target => {
		Reflect.defineMetadata(ConfigType.ENV, env, target);
		Reflect.defineMetadata(Type.ClassType, ClassDecoratorType.Config, target);
	};
};
