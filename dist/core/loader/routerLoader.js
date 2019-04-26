"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const glob_1 = __importDefault(require("glob"));
const koa_router_1 = __importDefault(require("koa-router"));
const __1 = require("../..");
function routerLoader(instance, basePath) {
    let routerPath = [];
    glob_1.default.sync(path_1.join(basePath, "**/*.*{ts,js}")).forEach(item => {
        if (require(item).default) {
            let router = new (require(item)).default();
            if (router instanceof koa_router_1.default) {
                routerPath.push(item);
                instance.use(router.routes()).use(router.allowedMethods());
            }
            else {
                __1.logger.error("Without @Controller decorator", item);
            }
        }
        else {
            __1.logger.error("Router without default export", item);
        }
    });
    __1.logger.success("Router Loading:", routerPath.map(item => {
        return item.split("/").pop();
    }));
}
exports.routerLoader = routerLoader;
class test {
}
exports.test = test;
//# sourceMappingURL=routerLoader.js.map