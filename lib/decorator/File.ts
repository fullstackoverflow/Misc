
import Koa from 'koa';

export function File() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value;
        descriptor.value = async function (ctx: Koa.Context, next: Function) {
            ctx.request.body = Object.assign({}, ctx.request.body.fields, ctx.request.body.files);
            await originFunction.apply(this, arguments);
        }
    }
}