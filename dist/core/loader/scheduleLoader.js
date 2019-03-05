"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const glob_1 = __importDefault(require("glob"));
const __1 = require("../..");
function scheduleLoader(basePath) {
    let routerPath = [];
    glob_1.default.sync(path_1.join(basePath, "**/*.*{ts,js}")).forEach(item => {
        if (require(item).default) {
            new (require(item)).default();
            routerPath.push(item);
        }
        else {
            __1.logger.error("Schedule without default export", item);
        }
    });
    __1.logger.success("Schedule Loading:", routerPath.map(item => {
        return item.split("/").pop();
    }));
}
exports.scheduleLoader = scheduleLoader;
//# sourceMappingURL=scheduleLoader.js.map