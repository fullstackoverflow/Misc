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
	if (!Container.has(typeClass)) {
		Container.set(typeClass, new typeClass());
	}
	descriptor.value = Container.get(typeClass);
	Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
}
