import Koa from 'koa';
import { validate, ValidationOptions, SchemaLike } from "joi";
import { logger } from '../util/log';
import { ResWarn } from '../util/response';
export function Validate(schema: SchemaLike, options?: ValidationOptions): MethodDecorator {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value;
        descriptor.value = async function (ctx: Koa.Context) {
            const config = Reflect.getOwnMetadata(key, target);
            if (config.method == 'post') {
                const { error } = validate(ctx.request.body, schema, options);
                if (error) {
                    throw new ResWarn('params error', null);
                }
            } else if (config.method == 'get') {
                const { error } = validate(ctx.request.query, schema, options);
                if (error) {
                    throw new ResWarn('params error', null);
                }
            } else {
                logger.error('unsupport http method');
            }
            await originFunction.apply(this, arguments);
        }
    }
}