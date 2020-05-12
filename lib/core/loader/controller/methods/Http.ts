import { MethodLoader } from "../../../type/interface";
import Router from "@koa/router";
import { ControllerType } from "../../../type/enum";
import { logger } from "../../../..";

export class Http implements MethodLoader {
	Load(fn: Function, instance: any, router: Router) {
		const path = Reflect.getMetadata(ControllerType.PATH, fn);
		const method = Reflect.getMetadata(ControllerType.METHOD, fn);
		router[method](path, fn.bind(instance));
	}
}
