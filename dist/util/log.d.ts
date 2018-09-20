declare class Logger {
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
}
declare const logger: Logger;
export { logger };
