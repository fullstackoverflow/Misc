/// <reference types="node" />
import "reflect-metadata";
import Koa from "koa";
import { Server as httpServer } from "http";
import { Server as httpsServer } from "https";
import { options } from "./type/opts";
export declare class Misc extends Koa {
    server: httpServer | httpsServer;
    /**
     * create application instance
     * @example
     * ```typescript
     *
     * const app = new Misc({
     * 	protocol:'http',
     * 	port:8080
     * })
     * ```
     */
    constructor(opts: options);
}
