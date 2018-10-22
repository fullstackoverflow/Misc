import Koa from "koa";
import { validate, ValidationOptions, SchemaLike } from "joi";
import { logger } from "../util/log";
import { ResWarn } from "../util/response";

enum HttpMap {
	post = "body",
	get = "query"
}

export function Validate(
	ValidateOptions: { schema: SchemaLike; options?: ValidationOptions },
	ValidateObject: { params?: Boolean } = { params: false }
): MethodDecorator {
	const { schema, options } = ValidateOptions;
	const { params } = ValidateObject;
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const originFunction: Function = descriptor.value;
		descriptor.value = async function(ctx: Koa.Context) {
			const config = Reflect.getOwnMetadata(key, target);
			if (HttpMap[config.method] == undefined) {
				logger.error("unsupport http method");
			} else {
				const prop = params === true ? ctx.params : ctx.request[HttpMap[config.method]];
				const { error } = validate(prop, schema, options);
				if (error) {
					throw new ResWarn("params error", error);
				}
			}
			await originFunction.apply(this, arguments);
		};
	};
}
