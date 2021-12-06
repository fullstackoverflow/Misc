import Koa from "koa";
import { plainToInstance } from "class-transformer";
import { validate, ValidatorOptions, ValidationError } from "class-validator";
import { RequestContext } from "@tosee/util";
import { ParameterDecoratorType, Parameters } from "../../core/type/enum";
import { FunctionCache } from "../../util/cache";

export enum ValidateType {
	Body = 'body',
	QueryParams = 'query',
	Headers = 'headers',
	Params = 'params'
}

/**
 * use class-validator to validate request object
 * @param ValidateOptions
 * @param ValidateObject
 * @example
 * ```typescript
 *
 * class Test{
 * 	@IsBoolean()
 * 	test:Boolean;
 * }
 *
 * export class Router{
 * 	@GET('/test')
 * 	@Validate({schema:Test,error:(errors)=> {
 *		throw new Error(`${errors.map(error=>Object.values(error.constraints))}`)
 * 	})
 * 	async test(){
 * 		ctx.body = 'origin';
 * 	}
 * }
 *
 * ```
 */
export function Validate(
	ValidateOptions: { schema: any; options?: ValidatorOptions; error?: (errors: ValidationError[]) => any },
	type?: ValidateType
): MethodDecorator {
	const { schema, options, error } = ValidateOptions;
	return function (target: any, key: string, descriptor: PropertyDescriptor) {
		const fn = async function (ctx: Koa.Context, next: Function) {
			const default_property = ctx.method == "POST" ? ValidateType.Body :
				ctx.method == "GET" ? ValidateType.QueryParams : undefined;
			const property = type || default_property;
			if (property == undefined) {
				throw new Error(`Please specified second param to tell what property to validate`);
			}
			const prop = property === ValidateType.Params ? ctx.params : ctx.request[property];
			const obj = plainToInstance(schema, prop, { excludePrefixes: ["_", "__"] });
			const errors = await validate(obj, options);
			if (errors && errors.length > 0) {
				if (error) {
					error(errors);
				} else {
					throw new Error(`${[...errors.map(error => Object.values(error.constraints))]}`);
				}
			}
			switch (property) {
				case ValidateType.Body:
					RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Body, obj);
					break;
				case ValidateType.QueryParams:
					RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Query, obj);
					break;
				case ValidateType.Headers:
					RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Header, obj);
					break;
				case ValidateType.Params:
					RequestContext.getInstance().ContextCache.get(ctx).set(ParameterDecoratorType.Params, obj);
					break;
			}
			await next();
		};
		const func: Function = descriptor.value;
		if (!FunctionCache.has(func)) {
			FunctionCache.set(func, []);
		}
		FunctionCache.get(func).push({ priority: 1, func: fn });
	};
}
