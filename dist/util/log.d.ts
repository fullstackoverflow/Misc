/// <reference types="koa-session" />
import Koa from "koa";
import { Namespace } from "./context";
declare class Logger {
    private initNameSpace;
    constructor();
    readonly NameSpace: Namespace;
    Middleware(ctx: Koa.Context, next: Function): void;
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
}
declare const logger: Logger;
export { logger };
