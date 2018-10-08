"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const koa_compose_1 = __importDefault(require("koa-compose"));
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
const koa_router_1 = __importDefault(require("koa-router"));
const log_1 = require("../util/log");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_body_1 = __importDefault(require("koa-body"));
const read_pkg_up_1 = __importDefault(require("read-pkg-up"));
class Misc extends koa_1.default {
    constructor(opts) {
        const pack = read_pkg_up_1.default.sync().pkg;
        log_1.logger.info('project:', pack.name);
        super();
        if (opts.body) {
            this.use(koa_body_1.default(opts.body));
        }
        else {
            this.use(koa_body_1.default());
        }
        this.keys = opts.keys;
        if (opts.cors) {
            log_1.logger.success('cors true');
            this.use(cors_1.default());
        }
        if (opts.session) {
            this.use(koa_session_1.default(opts.session, this));
        }
        if (opts.beforeall) {
            this.use(koa_compose_1.default(opts.beforeall));
        }
        let routerPath = [];
        if (opts.routerpath) {
            glob_1.default.sync(path_1.join(opts.routerpath, './**/*.*{ts,js}')).forEach((item) => {
                if (require(item).default) {
                    try {
                        let router = new (require(item).default)();
                        if (router instanceof koa_router_1.default) {
                            routerPath.push(item);
                            this.use(router.routes()).use(router.allowedMethods());
                        }
                        else {
                            log_1.logger.error('router is not a Router instance:', item);
                        }
                    }
                    catch (e) {
                        log_1.logger.error('router load failed:', item);
                    }
                }
                else {
                    log_1.logger.error('router without default export', item);
                }
            }, this);
        }
        if (opts.protocol == 'http') {
            this.server = http_1.default.createServer(this.callback()).listen(opts.port);
        }
        else if (opts.protocol == 'https') {
            this.server = https_1.default.createServer(opts.tls, this.callback()).listen(opts.port);
        }
        else {
            log_1.logger.error('lack of protocol');
        }
        if (opts.routerpath) {
            log_1.logger.success('Router Loading:', routerPath.map((item) => {
                return item.split('/').pop();
            }));
        }
        log_1.logger.success('NODE_ENV:' + process.env.NODE_ENV);
        log_1.logger.success('server start at:' + opts.port);
        log_1.logger.success('protocol:', opts.protocol);
    }
}
exports.Misc = Misc;
//# sourceMappingURL=app.js.map