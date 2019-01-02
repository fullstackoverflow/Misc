"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function File() {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = function (ctx, next) {
            return __awaiter(this, arguments, void 0, function* () {
                ctx.request.body = Object.assign({}, ctx.request.body, ctx.request.files);
                yield originFunction.apply(this, arguments);
            });
        };
    };
}
exports.File = File;
//# sourceMappingURL=File.js.map