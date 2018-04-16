"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqLog_1 = require("./../middleware/reqLog");
const Router = require("koa-router");
const glob = require("glob");
const path = require("path");
const restc_1 = require("restc");
const log_1 = require("../utils/log");
const router = new Router();
exports.symbolRoutePrefix = Symbol("routePrefix");
exports.symbolConfig = Symbol('config');
class Core {
    constructor(app, config) {
        this.app = app;
        this.router = router;
    }
    fileScan(dir) {
        try {
            glob.sync(path.join(dir, '**/*.ts')).forEach((item) => require(item));
        }
        catch (e) {
            throw new Error(e);
        }
    }
    registerRouters() {
        log_1.Log.info('Router loading...');
        this.app.use(reqLog_1.logger);
        for (let [controller, config] of Core.__DecoratedRouters) {
            let controllers = Array.isArray(controller) ? controller : [controller];
            let prefixPath = config.target[exports.symbolRoutePrefix];
            let _config = config.target[exports.symbolConfig];
            if (prefixPath && (!prefixPath.startsWith('/'))) {
                prefixPath = '/' + prefixPath;
            }
            if (_config && _config.restc == true) {
                this.router.use(prefixPath, restc_1.koa2());
            }
            let routerPath = prefixPath + config.path;
            controllers.forEach((controller) => {
                if (config.restc === true) {
                    this.router.use(routerPath, restc_1.koa2());
                }
                log_1.Log.warn(config.method.toUpperCase() + ':' + routerPath + (config.describe ? '   description:' + config.describe : ''));
                this.router[config.method](routerPath, controller);
            });
        }
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }
}
Core.__DecoratedRouters = new Map();
exports.Core = Core;
//# sourceMappingURL=core.js.map