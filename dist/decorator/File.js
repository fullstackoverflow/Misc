"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * merge ctx.request.files to ctx.request.body
 */
function File() {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = async function (ctx, next) {
            ctx.request.body = Object.assign({}, ctx.request.body, ctx.request.files);
            await originFunction.apply(this, arguments);
        };
    };
}
exports.File = File;
//# sourceMappingURL=File.js.map