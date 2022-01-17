import { Parameters, ParameterDecoratorType } from "../../core/type/enum";

function ParameterDecoratorFactory(type: ParameterDecoratorType): Function {
    return function ParameterDecorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let parameterIndexs: { type: ParameterDecoratorType, index: number }[] = Reflect.getOwnMetadata(Parameters, target, propertyKey) || [];
        parameterIndexs.push({ type, index: parameterIndex });
        Reflect.defineMetadata(Parameters, parameterIndexs, target, propertyKey);
    }
}

/**
 * Http Params Decorator
 * @example
 * ```
 * 	
 *  @POST("/transform")
 *	@Validate({
 *		schema: Trans,
 *		error: (err) => {
 *			throw "validateerror";
 *		}
 *	}, ValidateType.Body)
 *	async transform(@Body body: Trans) {
 *		return new Response(200, null, success);
 *	}
 * 
 * ```
 */
export const Body = ParameterDecoratorFactory(ParameterDecoratorType.Body);
/**
 * Http Params Decorator
 * @example
 * ```
 * 	
 *  @POST("/transform")
 *	@Validate({
 *		schema: Trans,
 *		error: (err) => {
 *			throw "validateerror";
 *		}
 *	}, ValidateType.QueryParams)
 *	async transform(@Query query: Trans) {
 *		return new Response(200, null, success);
 *	}
 * 
 * ```
 */
export const Query = ParameterDecoratorFactory(ParameterDecoratorType.Query);
/**
 * Http Params Decorator
 * @example
 * ```
 * 	
 *  @POST("/transform")
 *	@Validate({
 *		schema: Trans,
 *		error: (err) => {
 *			throw "validateerror";
 *		}
 *	}, ValidateType.QueryParams)
 *	async transform(@Params params: Trans) {
 *		return new Response(200, null, success);
 *	}
 * 
 * ```
 */
export const Params = ParameterDecoratorFactory(ParameterDecoratorType.Params);
/**
 * Http Params Decorator
 * @example
 * ```
 * 	
 *  @POST("/transform")
 *	@Validate({
 *		schema: Trans,
 *		error: (err) => {
 *			throw "validateerror";
 *		}
 *	}, ValidateType.Headers)
 *	async transform(@Headers headers: Trans) {
 *		return new Response(200, null, success);
 *	}
 * 
 * ```
 */
export const Headers = ParameterDecoratorFactory(ParameterDecoratorType.Header);
/**
 * Http Params Decorator
 * @example
 * ```
 * 	
 *  @POST("/transform")
 *	async transform(@Ctx ctx: Koa.Context) {
 *		return new Response(200, null, success);
 *	}
 * 
 * ```
 */
export const Ctx = ParameterDecoratorFactory(ParameterDecoratorType.Context);
