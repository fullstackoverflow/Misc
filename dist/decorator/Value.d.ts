/**
 * Inject value from local config file
 *
 * @example
 * ```typescript
 *
 * class Test{
 * 	@Value('param')
 * 	param:string;
 * }
 * ```
 * @param params
 */
export declare function Value(params: string): PropertyDecorator;
