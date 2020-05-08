"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("@tosee/log");
const moment_1 = __importDefault(require("moment"));
class Logger extends log_1.Logger {
    constructor(namespace) {
        super(namespace);
    }
}
const logger = new Logger(moment_1.default().valueOf() + "");
exports.logger = logger;
//# sourceMappingURL=log.js.map