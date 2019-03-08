"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
class Logger {
    info(...args) {
        console.log(chalk_1.default.yellow(`[${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
    }
    success(...args) {
        console.log(chalk_1.default.green(`[${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
    }
    error(...args) {
        console.log(chalk_1.default.red(`[${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
    }
}
const logger = new Logger();
exports.logger = logger;
//# sourceMappingURL=log.js.map