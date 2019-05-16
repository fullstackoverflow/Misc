import { Logger as Log } from "@tosee/log";
declare class Logger extends Log {
    constructor(namespace: string);
}
declare const logger: Logger;
export { logger };
