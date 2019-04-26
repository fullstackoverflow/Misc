import { ClassDecoratorType, ControllerType, MethodDecoratorType, Type } from "../type/enum";
import Koa from "koa";
import Router from "koa-router";

export class Dispatch {
	[ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa) {
		const prefix = Reflect.getMetadata(ControllerType.PREFIX, clazz);
		const router: Router = new Router(prefix ? { prefix } : null);
		const instance = new clazz();
		const prototype = Object.getPrototypeOf(instance);
		const methodsNames = Object.getOwnPropertyNames(prototype).filter(
			item => typeof prototype[item] == "function" && item != "constructor"
		);
		methodsNames.forEach(methodName => {
			const fn = prototype[methodName];
			if (Reflect.getMetadata(Type.MethodType, fn) == MethodDecoratorType.Http) {
				const path = Reflect.getMetadata(ControllerType.PATH, fn);
				const method = Reflect.getMetadata(ControllerType.METHOD, fn);
				console.log(prefix, path, method);
				router[method](path, fn.bind(instance));
			}
		});
		app.use(router.routes()).use(router.allowedMethods());
	}
}
