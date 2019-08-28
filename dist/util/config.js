"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const chokidar_1 = require("chokidar");
const log_1 = require("./log");
const fs_1 = require("fs");
class Config {
    static get instance() {
        if (this.path === undefined) {
            throw new Error("Config path is not init, set path first");
        }
        const config_path = fs_1.existsSync(path_1.resolve(this.path, `./default.ts`)) ? path_1.resolve(this.path, `./default.ts`) : path_1.resolve(this.path, `./default.js`);
        const default_path = fs_1.existsSync(path_1.resolve(this.path, `./${process.env.NODE_ENV}.ts`)) ? path_1.resolve(this.path, `./${process.env.NODE_ENV}.ts`) : path_1.resolve(this.path, `./${process.env.NODE_ENV}.js`);
        ;
        if (this._instance == undefined) {
            if (fs_1.existsSync(default_path) && fs_1.existsSync(config_path)) {
                this._instance = Object.assign({}, require(default_path).default, require(config_path).default);
                log_1.logger.success(`Config file load: ${process.env.NODE_ENV}.ts(merged default.ts)`);
            }
            else if (fs_1.existsSync(config_path)) {
                this._instance = require(config_path).default;
                log_1.logger.success(`Config file load: ${process.env.NODE_ENV}.ts`);
            }
            else {
                throw new Error(`Config file ${config_path} load failed, file not exist`);
            }
            chokidar_1.watch(this.path, {
                ignored: /(^|[\/\\])\../,
                persistent: true
            }).on("change", () => {
                delete require.cache[config_path];
                if (fs_1.existsSync(default_path)) {
                    delete require.cache[default_path];
                    this._instance = Object.assign({}, require(default_path).default, require(config_path).default);
                    log_1.logger.success(`Config file load: ${process.env.NODE_ENV}.ts(merged default.ts)`);
                }
                else {
                    this._instance = require(config_path).default;
                    log_1.logger.success("Config file reload:", `${process.env.NODE_ENV}.ts`);
                }
            });
        }
        return this._instance;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map