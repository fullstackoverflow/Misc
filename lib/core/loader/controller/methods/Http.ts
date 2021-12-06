import { MethodLoader } from "../../../type/interface";
import Router from "@koa/router";
import { ControllerType, ParameterDecoratorType, Parameters } from "../../../type/enum";
import { RequestContext } from "@tosee/util";
import { Context } from "koa";
import compose from 'koa-compose';
import { FunctionCache } from "../../../../util/cache";

export class Http implements MethodLoader {
	Load(fn: Function, instance: any, router: Router, prototype: any, key: string) {
		const path = Reflect.getMetadata(ControllerType.PATH, fn);
		const method = Reflect.getMetadata(ControllerType.METHOD, fn);
		const func = async (ctx: Context, next: Function) => {
			let parameterIndexs: { type: ParameterDecoratorType, index: number }[] = Reflect.getOwnMetadata(Parameters, prototype, key);
			const paramters = parameterIndexs.sort((a, b) => a.index - b.index).map(item => {
				return RequestContext.getInstance().ContextCache.get(ctx).get(item.type);
			});
			ctx.body = await fn.apply(instance, paramters) || ctx.body;
			await next();
		};
		router[method](path, compose([...FunctionCache.get(fn).sort((a, b) => a.priority - b.priority).map(i => i.func), func]));
		FunctionCache.delete(fn);
	}
}
