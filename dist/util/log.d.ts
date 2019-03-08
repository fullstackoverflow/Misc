/// <reference types="koa-session" />
import Koa from "koa";
declare class Logger {
    constructor();
    readonly NameSpace: import("./context").Namespace;
    Middleware(ctx: Koa.Context, next: Function): void;
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
}
declare const logger: Logger;
export { logger };
