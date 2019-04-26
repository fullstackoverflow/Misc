"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
require("reflect-metadata");
class ClassScanner {
    constructor(path) {
        this.path = path;
    }
    scan() {
        return glob_1.default.sync(this.path).reduce((pre, curr) => {
            return pre.concat(Object.values(require(curr)));
        }, []);
    }
}
exports.ClassScanner = ClassScanner;
new ClassScanner("../../test/router/router.ts").scan().forEach(i => {
    console.log(Reflect.getMetadata("test", i));
});
//# sourceMappingURL=ClassScanner.js.map