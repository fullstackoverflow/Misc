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
const log_1 = require("../util/log");
function Log() {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = function (ctx, next) {
            return __awaiter(this, arguments, void 0, function* () {
                if (ctx.method == 'GET') {
                    log_1.logger.success(`${ctx.method} ${ctx.url} ${ctx.request.querystring}`);
                }
                if (ctx.method == 'POST') {
                    log_1.logger.success(`${ctx.method} ${ctx.url} ${JSON.stringify(ctx.request.body)}`);
                }
                yield originFunction.apply(this, arguments);
            });
        };
    };
}
exports.Log = Log;
//# sourceMappingURL=Log.js.map