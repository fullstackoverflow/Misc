import Koa from "koa";
import { plainToClass } from "class-transformer";
import { validate, ValidatorOptions, ValidationError } from "class-validator";

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
		const originFunction: Function = descriptor.value;
		descriptor.value = async function (ctx: Koa.Context) {
			const default_property = ctx.method == "POST" ? ValidateType.Body :
				ctx.method == "GET" ? ValidateType.QueryParams : undefined;
			const property = type || default_property;
			if (property == undefined) {
				throw new Error(`Please specified second param to tell what property to validate`);
			}
			const prop = ctx.request[type || default_property];
			const obj = plainToClass(schema, prop, { excludePrefixes: ["_", "__"] });
			const errors = await validate(obj, options);
			if (errors && errors.length > 0) {
				if (error) {
					error(errors);
				} else {
					throw new Error(`${[...errors.map(error => Object.values(error.constraints))]}`);
				}
			}
			ctx.request.body = obj;
			await originFunction.apply(this, arguments);
		};
	};
}
