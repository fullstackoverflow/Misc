import { Logger as Log } from "@tosee/log";
import pkg from "read-pkg-up";

class Logger extends Log {
	constructor(namespace: string) {
		super(namespace);
	}
}

const logger = new Logger(pkg.sync().pkg.name);

export { logger };
