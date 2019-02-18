import Koa from "koa";
import { plainToClass } from "class-transformer";
import { validate, ValidatorOptions, IsInt, ValidationError } from "class-validator";
import { logger } from "../util/log";
import { ResWarn } from "../util/response";

enum HttpMap {
	post = "body",
	get = "query"
}

export function Validate(
	ValidateOptions: { schema: any; options?: ValidatorOptions; error?: (errors: ValidationError[]) => any },
	ValidateObject: { params?: Boolean } = { params: false }
): MethodDecorator {
	const { schema, options, error } = ValidateOptions;
	const { params } = ValidateObject;
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		const originFunction: Function = descriptor.value;
		descriptor.value = async function(ctx: Koa.Context) {
			const config = Reflect.getOwnMetadata(key, target);
			if (HttpMap[config.method] == undefined) {
				throw new Error("Unsupported HTTP methods");
			} else {
				const prop = params === true ? ctx.params : ctx.request[HttpMap[config.method]];
				const obj = plainToClass(schema, prop);
				const errors = await validate(obj, options);
				if (errors && errors.length > 0) {
					if (error) {
						error(errors);
					} else {
						throw new Error(`${[...errors.map(error => Object.values(error.constraints))]}`);
					}
				}
			}
			await originFunction.apply(this, arguments);
		};
	};
}
