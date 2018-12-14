import { Config } from "../util/config";

export const Value = (params: string): PropertyDecorator => {
	return (target: any, propertyKey: string) => {
		const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
		const descriptor = originDescriptor || { writable: true, configurable: true };
		descriptor.value = Config.instance[params];
		Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
	};
};
