
import Koa from 'koa';

/**
 * merge ctx.request.files to ctx.request.body
 */
export function File() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value;
        descriptor.value = async function (ctx: Koa.Context, next: Function) {
            ctx.request.body = Object.assign({}, ctx.request.body, ctx.request.files);
            await originFunction.apply(this, arguments);
        }
    }
}