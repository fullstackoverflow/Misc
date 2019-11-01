"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ClassScanner_1 = require("../core/ClassScanner");
const enum_1 = require("../core/type/enum");
const loader_1 = require("../core/loader");
class Config {
    static set path(path) {
        const dipatch = new loader_1.Dispatch();
        const configs = new ClassScanner_1.ClassScanner(path_1.resolve(path, "**/*.ts"))
            .scan()
            .map(clazz => {
            const ClassType = Reflect.getMetadata(enum_1.Type.ClassType, clazz);
            if (ClassType === enum_1.ClassDecoratorType.Config) {
                return dipatch[enum_1.ClassDecoratorType.Config](clazz, null);
            }
        })
            .filter(Boolean);
        if (Config.instance == undefined) {
            const defaultConfig = configs.find(i => i.env == "default");
            const envConfig = configs.find(i => i.env == process.env.NODE_ENV);
            if (defaultConfig && envConfig) {
                Config.instance = Object.assign({}, defaultConfig.instance, envConfig.instance);
            }
            else if (defaultConfig && !envConfig) {
                Config.instance = Object.assign({}, defaultConfig.instance);
            }
            else if (!defaultConfig && envConfig) {
                Config.instance = Object.assign({}, envConfig.instance);
            }
            else {
                throw new Error(`Config file load failed`);
            }
        }
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map