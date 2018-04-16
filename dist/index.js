"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core/core");
const log_1 = require("./utils/log");
class Misc extends core_1.Core {
    constructor(rootPath) {
        super();
        this.rootPath = rootPath;
        log_1.Log.info('Misc start');
        log_1.Log.info('Platform:' + process.platform + ' node:' + process.version);
        super.fileScan(this.rootPath);
        super.registerRouters();
        log_1.Log.info('Misc start success');
    }
}
exports.Misc = Misc;
var http_methods_1 = require("./decorate/http-methods");
exports.Get = http_methods_1.Get;
exports.Post = http_methods_1.Post;
exports.Put = http_methods_1.Put;
exports.Delete = http_methods_1.Delete;
var controller_1 = require("./decorate/controller");
exports.Controller = controller_1.Controller;
var utils_1 = require("./decorate/utils");
exports.Restc = utils_1.Restc;
exports.restc = utils_1.restc;
//# sourceMappingURL=index.js.map