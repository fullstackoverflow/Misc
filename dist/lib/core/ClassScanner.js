"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const fs_1 = require("fs");
const path_1 = require("path");
class ClassScanner {
    constructor(path) {
        if (Array.isArray(path)) {
            this.path = path.map(p => {
                return this.pathResolve(p);
            });
        }
        else {
            this.path = [this.pathResolve(path)];
        }
    }
    pathResolve(path) {
        return path_1.resolve(path);
    }
    scan() {
        return this.path
            .map(p => {
            return glob_1.default.sync(p).reduce((pre, curr) => {
                if (fs_1.statSync(curr).isFile()) {
                    return pre.concat(Object.values(require(curr)));
                }
                else {
                    return pre;
                }
            }, []);
        })
            .reduce((pre, curr) => {
            return pre.concat(curr);
        }, []);
    }
}
exports.ClassScanner = ClassScanner;
//# sourceMappingURL=ClassScanner.js.map