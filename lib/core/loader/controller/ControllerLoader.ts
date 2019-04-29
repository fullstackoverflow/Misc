import { ClassLoader } from "../../type/interface";
import { ControllerType, Type, MethodDecoratorType } from "../../type/enum";
import Koa from "koa";
import Router from "koa-router";
import { Autowired, Container } from "../../../decorator/util/Autowired";
import { Http } from "./methods/Http";

export class ControllerLoader implements ClassLoader {
	@Autowired
	[MethodDecoratorType.Http]: Http;

	Load(clazz: FunctionConstructor, app: Koa) {
		const prefix = Reflect.getMetadata(ControllerType.PREFIX, clazz);
		const router: Router = new Router(prefix ? { prefix } : null);
		const instance = new clazz();
		const prototype = Object.getPrototypeOf(instance);
		const methodsNames = Object.getOwnPropertyNames(prototype).filter(
			item => typeof prototype[item] == "function" && item != "constructor"
		);
		methodsNames.forEach(methodName => {
			const fn = prototype[methodName];
			const MethodType = Reflect.getMetadata(Type.MethodType, fn);
			if (MethodType != undefined) {
				this[MethodType].Load(fn, instance, router);
			}
			Object.defineProperty(prototype,methodName,fn.bind(instance));
			// prototype[methodName] = fn.bind(instance);
		});
		app.use(router.routes()).use(router.allowedMethods());
	}
}
