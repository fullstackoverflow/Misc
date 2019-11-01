"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("@tosee/log");
const read_pkg_up_1 = __importDefault(require("read-pkg-up"));
class Logger extends log_1.Logger {
    constructor(namespace) {
        super(namespace);
    }
}
const logger = new Logger(read_pkg_up_1.default.sync().pkg.name);
exports.logger = logger;
//# sourceMappingURL=log.js.map