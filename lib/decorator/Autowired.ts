export enum MODE {
	Sigleton = 0,
	Ordinary
}

const Container = new Map();

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
export function Autowired(options: { mode: MODE; arguments?: any[] } = { mode: MODE.Ordinary, arguments: [] }): PropertyDecorator {
	return (target: any, propertyKey: string) => {
		const { mode } = options;
		const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
		const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
		const descriptor = originDescriptor || { writable: true, configurable: true };
		if (mode == MODE.Sigleton) {
			if (!Container.has(typeClass)) {
				Container.set(typeClass, new typeClass());
			}
			descriptor.value = Container.get(typeClass);
		} else {
			descriptor.value = new typeClass(...options.arguments);
		}
		Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
	};
}
