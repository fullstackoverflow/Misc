import { default as chalk } from "chalk";
import * as moment from 'moment'

class Logger {
    info(data: any) {
        console.log(chalk.greenBright('[Misc] ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' ' + process.pid + ' ' + data));
    }

    warn(data: any) {
        console.log(chalk.greenBright('[Misc] ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' ' + process.pid + ' ') + chalk.yellowBright(data));
    }

    err(data: any) {
        console.log(chalk.greenBright('[Misc] ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' ' + process.pid + ' ') + chalk.redBright(data));
    }
}

export const Log = new Logger();