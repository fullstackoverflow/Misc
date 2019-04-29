import Koa from "koa";
import { plainToClass } from "class-transformer";
import { validate, ValidatorOptions, IsInt, ValidationError } from "class-validator";

enum HttpMap {
	post = "body",
	get = "query"
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
				const obj = plainToClass(schema, prop, { excludePrefixes: ["_", "__"] });
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
