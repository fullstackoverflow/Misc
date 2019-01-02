import Koa from "koa";
import { plainToClass } from "class-transformer";
import { validate, ValidatorOptions, IsInt } from "class-validator";
import { logger } from "../util/log";
import { ResWarn } from "../util/response";

enum HttpMap {
	post = "body",
	get = "query"
}

export function Validate(
	ValidateOptions: { schema: any; options?: ValidatorOptions },
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
				const obj = plainToClass(schema, prop);
				const errors = await validate(obj, options);
				if (errors && errors.length > 0) {
					throw new ResWarn("params error", errors);
				}
			}
			await originFunction.apply(this, arguments);
		};
	};
}
