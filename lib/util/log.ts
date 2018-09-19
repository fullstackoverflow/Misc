import chalk from "chalk";
import moment from 'moment';

class Logger {
    info(...args){
        console.log(chalk.yellow(`[${moment().format('YYYY-MM-DD')}] [${moment().format('HH:mm:ss')}] `), ...args);
    }

    success(...args) {
        console.log(chalk.green(`[${moment().format('YYYY-MM-DD')}] [${moment().format('HH:mm:ss')}] `), ...args);
    }

    error(...args) {
        console.log(chalk.red(`[${moment().format('YYYY-MM-DD')}] [${moment().format('HH:mm:ss')}] `), ...args);
    }
}

const logger = new Logger();

export { logger };
