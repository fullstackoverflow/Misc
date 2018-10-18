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
const joi_1 = require("joi");
const log_1 = require("../util/log");
const response_1 = require("../util/response");
function Validate(schema, options) {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = function (ctx) {
            return __awaiter(this, arguments, void 0, function* () {
                const config = Reflect.getOwnMetadata(key, target);
                if (config.method == "post") {
                    const { error } = joi_1.validate(ctx.request.body, schema, options);
                    if (error) {
                        throw new response_1.ResWarn("params error", error);
                    }
                }
                else if (config.method == "get") {
                    const { error } = joi_1.validate(ctx.request.query, schema, options);
                    if (error) {
                        throw new response_1.ResWarn("params error", error);
                    }
                }
                else {
                    log_1.logger.error("unsupport http method");
                }
                yield originFunction.apply(this, arguments);
            });
        };
    };
}
exports.Validate = Validate;
//# sourceMappingURL=validate.js.map