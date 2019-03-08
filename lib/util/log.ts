import chalk from "chalk";
import moment from "moment";
import pkg from "read-pkg-up";
import { v1 as uuid } from "uuid";
import Koa from "koa";
import { createNamespace, getNamespace, Namespace } from "./context";

class Logger {
	private NameSpace: Namespace;
	constructor() {
		this.NameSpace = createNamespace(pkg.sync().pkg.name);
	}

	Middleware() {
		const namespace = this.NameSpace;
		return async function(ctx: Koa.Context, next: Function) {
			namespace.run(async () => {
				const tid = uuid();
				namespace.context.set("tid", tid);
				await next();
			});
		};
	}

	info(...args) {
		if (!this.NameSpace.context) {
			console.log(chalk.yellow(`[${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `), ...args);
		} else {
			console.log(
				chalk.yellow(`[${this.NameSpace.context.get("tid")}] [${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `),
				...args
			);
		}
	}

	success(...args) {
		if (!this.NameSpace.context) {
			console.log(chalk.green(`[${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `), ...args);
		} else {
			console.log(
				chalk.green(`[${this.NameSpace.context.get("tid")}] [${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `),
				...args
			);
		}
	}

	error(...args) {
		if (!this.NameSpace.context) {
			console.log(chalk.red(`[${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `), ...args);
		} else {
			console.log(
				chalk.red(`[${this.NameSpace.context.get("tid")}] [${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `),
				...args
			);
		}
	}
}

const logger = new Logger();

export { logger };
