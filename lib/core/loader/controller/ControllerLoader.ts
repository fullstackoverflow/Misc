import { ClassLoader } from "../../type/interface";
import { ControllerType, Type, MethodDecoratorType, Parameters } from "../../type/enum";
import Koa from "koa";
import Router from "@koa/router";
import { Autowired } from "@tosee/util";
import { Http } from "./methods/Http";

export class ControllerLoader implements ClassLoader {
	@Autowired()
	[MethodDecoratorType.Http]: Http;

	Load(clazz: FunctionConstructor, app: Koa) {
		const prefix = Reflect.getMetadata(ControllerType.PREFIX, clazz);
		const router: Router = new Router({ prefix });
		const instance = new clazz();
		const prototype = Object.getPrototypeOf(instance);
		const methodsNames = Object.getOwnPropertyNames(prototype).filter(
			item => Object.getOwnPropertyDescriptor(prototype, item).get == undefined && typeof prototype[item] == "function" && item != "constructor"
		);
		methodsNames.forEach(methodName => {
			const fn = prototype[methodName];
			const MethodType = Reflect.getMetadata(Type.MethodType, fn);
			if (MethodType != undefined) {
				this[MethodType].Load(fn, instance, router, prototype, methodName);
			}
		});
		app.use(router.routes()).use(router.allowedMethods());
	}
}
