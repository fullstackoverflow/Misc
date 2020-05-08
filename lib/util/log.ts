import { Logger as Log } from "@tosee/log";
import moment from "moment";

class Logger extends Log {
	constructor(namespace: string) {
		super(namespace);
	}
}

const logger = new Logger(moment().valueOf() + "");

export { logger };
