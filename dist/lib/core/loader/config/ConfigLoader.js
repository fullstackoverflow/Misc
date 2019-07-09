"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../type/enum");
class ConfigLoader {
    Load(clazz, app) {
        const instance = new clazz();
        const env = Reflect.getMetadata(enum_1.ConfigType.ENV, clazz);
        return { env, instance };
    }
}
exports.ConfigLoader = ConfigLoader;
//# sourceMappingURL=ConfigLoader.js.map