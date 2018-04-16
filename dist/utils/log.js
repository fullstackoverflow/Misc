"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const moment = require("moment");
class Logger {
    info(data) {
        console.log(chalk_1.default.greenBright('[Misc] ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' ' + process.pid + ' ' + data));
    }
    warn(data) {
        console.log(chalk_1.default.greenBright('[Misc] ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' ' + process.pid + ' ') + chalk_1.default.yellowBright(data));
    }
    err(data) {
        console.log(chalk_1.default.greenBright('[Misc] ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' ' + process.pid + ' ') + chalk_1.default.redBright(data));
    }
}
exports.Log = new Logger();
//# sourceMappingURL=log.js.map