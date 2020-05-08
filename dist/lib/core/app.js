"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const koa_compose_1 = __importDefault(require("koa-compose"));
const log_1 = require("../util/log");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_body_1 = __importDefault(require("koa-body"));
const read_pkg_up_1 = __importDefault(require("read-pkg-up"));
const ClassScanner_1 = require("./ClassScanner");
const enum_1 = require("./type/enum");
const dispatch_1 = require("./loader/dispatch");
const path_1 = require("path");
class Misc extends koa_1.default {
    /**
     * create application instance
     * @example
     * ```typescript
     *
     * const app = new Misc({
     * 	protocol:'http',
     * 	port:8080
     * })
     * ```
     */
    constructor(opts) {
        const default_options = { body: koa_body_1.default, cors: cors_1.default, beforeall: koa_compose_1.default };
        const pack = read_pkg_up_1.default.sync().pkg;
        log_1.logger.info("project:", pack.name);
        log_1.logger.info("version:", pack.version);
        super();
        /**
         * 内置插件
         */
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
            this.use(func(option));
        });
        this.keys = opts.keys;
        const dipatch = new dispatch_1.Dispatch();
        log_1.logger.info("router path:", opts.router || "src/router/**/*.ts");
        new ClassScanner_1.ClassScanner(opts.router || require(path_1.resolve("tsconfig.json")).include || "src/**/*.ts").scan().forEach(clazz => {
            const ClassType = Reflect.getMetadata(enum_1.Type.ClassType, clazz);
            if (ClassType != undefined) {
                dipatch[ClassType](clazz, this);
            }
        });
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