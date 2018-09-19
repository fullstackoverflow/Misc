import * as Keygrip from "keygrip";
import compose from 'koa-compose';
import { ServerOptions } from "https";
import cors from '@koa/cors';
import body from 'koa-body';

export interface options {
    keys?: Keygrip | string[];
    beforeall?: Array<compose.Middleware<any>>,
    routerpath: string,
    configpath: string,
    body: body.IKoaBodyOptions,
    protocol: "http" | "https",
    port: number,
    tls?: ServerOptions,
    cors?: cors.Options,
    session?: Object,
}