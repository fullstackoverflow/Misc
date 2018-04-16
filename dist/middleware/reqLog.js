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
const log_1 = require("../utils/log");
exports.logger = function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let method = ctx.method.toUpperCase();
        if (method === 'GET') {
            log_1.Log.info('URL:' + ctx.url + ' Method:' + method + ' Params:' + JSON.stringify(ctx.query));
        }
        else {
            log_1.Log.info('URL:' + ctx.url + ' Method:' + method + ' Params:' + JSON.stringify(ctx.body));
        }
        next();
    });
};
//# sourceMappingURL=reqLog.js.map