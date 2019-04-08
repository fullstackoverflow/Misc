import { ValidatorOptions, ValidationError } from "class-validator";
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
 *		throw new Error(`${errors.map(error=>Object.value(error.constraints))}`)
 * 	})
 * 	async test(){
 * 		ctx.body = 'origin';
 * 	}
 * }
 *
 * ```
 */
export declare function Validate(ValidateOptions: {
    schema: any;
    options?: ValidatorOptions;
    error?: (errors: ValidationError[]) => any;
}, ValidateObject?: {
    params?: Boolean;
}): MethodDecorator;
