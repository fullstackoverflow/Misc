"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const chokidar_1 = require("chokidar");
const log_1 = require("./log");
class Config {
    static get instance() {
        if (this.path === undefined) {
            throw new Error('Config path is not init, set path first');
        }
        const absolute = path_1.resolve(this.path, `./${process.env.NODE_ENV}.ts`);
        if (this._instance == undefined) {
            this._instance = require(absolute).default;
            log_1.logger.success('Config file load:', `${process.env.NODE_ENV}.ts`);
            chokidar_1.watch(this.path, {
                ignored: /(^|[\/\\])\../,
                persistent: true,
            }).on('change', () => {
                delete require.cache[absolute];
                this._instance = require(absolute).default;
                log_1.logger.success('Config file reload:', `${process.env.NODE_ENV}.ts`);
            });
        }
        return this._instance;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map