import Router from "koa-router";

export function USE(url: string): MethodDecorator {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata(
			key,
			{
				path: url,
				method: "use",
				value: descriptor.value
			},
			target
		);
	};
}

export function POST(url: string): MethodDecorator {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata(
			key,
			{
				path: url,
				method: "post",
				value: descriptor.value
			},
			target
		);
	};
}

export function GET(url: string): MethodDecorator {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata(
			key,
			{
				path: url,
				method: "get",
				value: descriptor.value
			},
			target
		);
	};
}

export function DELETE(url: string): MethodDecorator {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata(
			key,
			{
				path: url,
				method: "delete",
				value: descriptor.value
			},
			target
		);
	};
}

export function PUT(url: string): MethodDecorator {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata(
			key,
			{
				path: url,
				method: "put",
				value: descriptor.value
			},
			target
		);
	};
}

/**
 * rewrite class constructor
 * @param prefix router prefix
 * @example
 * ```
 * 	
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 	}
 * 
 * ```
 */

export function Controller(prefix = ""): ClassDecorator {
	return function(constructor: Function) {
		const originalConstructor = constructor;
		function instanciate(constructor: any, ...args) {
			const instance = new constructor(...args);
			let router: Router = new Router({
				prefix
			});
			Reflect.getMetadataKeys(instance).forEach(key => {
				const config = Reflect.getMetadata(key, instance);
				router[config.method](config.path, config.value.bind(instance));
			});
			return router;
		}

		// the new constructor behaviour
		const newConstructor = function(...args: any[]) {
			return instanciate(originalConstructor, args);
		};

		// copy prototype so instanceof operator still works
		newConstructor.prototype = originalConstructor.prototype;

		// return new constructor (will override original)
		return newConstructor as any;
	};
}
