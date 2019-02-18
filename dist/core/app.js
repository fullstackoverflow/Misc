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
const default_options = { body: koa_body_1.default, cors: cors_1.default, session: koa_session_1.default, beforeall: koa_compose_1.default };
class Misc extends koa_1.default {
    constructor(opts) {
        const pack = read_pkg_up_1.default.sync().pkg;
        log_1.logger.info("project:", pack.name);
        log_1.logger.info("version:", pack.version);
        super();
        if (!opts.body) {
            this.use(koa_body_1.default());
        }
        const indexs = [];
        Object.keys(opts).forEach(key => {
            const index = Object.keys(default_options).findIndex(i => i == key);
            indexs.push(index);
        });
        indexs
            .filter(i => i != -1)
            .sort((a, b) => a - b)
            .forEach(index => {
            const key = Object.keys(default_options)[index];
            const func = default_options[key];
            const option = opts[key];
            if (key === "session") {
                this.use(func(option, this));
            }
            else {
                this.use(func(option));
            }
        });
        this.keys = opts.keys;
        let routerPath = [];
        const base = opts.routerpath || path_1.resolve("src/router");
        glob_1.default.sync(path_1.join(base, "**/*.*{ts,js}")).forEach(item => {
            if (require(item).default) {
                let router = new (require(item)).default();
                if (router instanceof koa_router_1.default) {
                    routerPath.push(item);
                    this.use(router.routes()).use(router.allowedMethods());
                }
                else {
                    log_1.logger.error("Without @Controller decorator", item);
                }
            }
            else {
                log_1.logger.error("Router without default export", item);
            }
        }, this);
        log_1.logger.success("Router Loading:", routerPath.map(item => {
            return item.split("/").pop();
        }));
        if (opts.protocol == "http") {
            this.server = http_1.default.createServer(this.callback()).listen(opts.port, opts.callback);
        }
        else if (opts.protocol == "https") {
            this.server = https_1.default.createServer(opts.tls, this.callback()).listen(opts.port, opts.callback);
        }
        else {
            throw new Error("protocol must be http or https");
        }
        log_1.logger.success("NODE_ENV:" + process.env.NODE_ENV);
        log_1.logger.success("server start at:" + opts.port);
        log_1.logger.success("protocol:", opts.protocol);
    }
}
exports.Misc = Misc;
//# sourceMappingURL=app.js.map