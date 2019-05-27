import { ClassDecoratorType, Type } from "../../core/type/enum";

export const Container = new Map();

/**
 * Inject a class instance
 * @param params class constructor params
 * @example
 * ```typescript
 *
 * class Service{
 * }
 *
 * class Test{
 *  @Autowired()
 *  Service:Service
 * }
 * ```
 */
export function Autowired(target: any, propertyKey: string) {
	const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
	const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
	const descriptor = originDescriptor || { writable: true, configurable: true };
	const singleton = Reflect.getMetadata(Type.ClassType, typeClass);
	let obj: any;
	if (singleton === ClassDecoratorType.Singleton) {
		if (!Container.has(typeClass)) {
			Container.set(typeClass, new typeClass());
		}
		obj = Container.get(typeClass);
	} else {
		obj = new typeClass();
	}
	descriptor.value = obj;
	Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
}
