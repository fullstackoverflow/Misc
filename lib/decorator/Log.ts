
import Koa from 'koa';
import { logger } from '../util/log';

export function Log() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value;
        descriptor.value = async function (ctx: Koa.Context, next: Function) {
            if (ctx.method == 'GET') {
                logger.success(`${ctx.method} ${ctx.url} ${ctx.request.querystring}`);
            }
            if (ctx.method == 'POST') {
                logger.success(`${ctx.method} ${ctx.url} ${JSON.stringify(ctx.request.body)}`);
            }
            await originFunction.apply(this, arguments);
        }
    }
}