import { Logger as Log } from "@tosee/log";

class Logger extends Log {
	constructor(namespace: string) {
		super(namespace);
	}
}

const logger = new Logger(Date.now() + "");

export { logger };
