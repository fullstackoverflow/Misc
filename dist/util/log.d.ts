/// <reference types="koa-session" />
import Koa from "koa";
declare class Logger {
    private NameSpace;
    constructor();
    Middleware(): (ctx: Koa.Context, next: Function) => Promise<void>;
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
}
declare const logger: Logger;
export { logger };
