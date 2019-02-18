import { Context } from "koa";
import compose from "koa-compose";

export function Before<T>(...func: Array<compose.Middleware<T>>) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const originFunction: Function = descriptor.value;
		descriptor.value = async function(ctx, next) {
			const middlewares = compose(func);
			await middlewares(ctx, next);
			await originFunction.apply(this, arguments);
		};
	};
}

export function After<T>(...func: Array<compose.Middleware<T>>) {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const originFunction: Function = descriptor.value;
		descriptor.value = async function(ctx, next) {
			await originFunction.apply(this, arguments);
			const middlewares = compose(func);
			await middlewares(ctx, next);
		};
	};
}
