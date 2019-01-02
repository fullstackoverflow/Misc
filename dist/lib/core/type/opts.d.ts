/// <reference types="node" />
/// <reference types="koa__cors" />
import Keygrip from "keygrip";
import compose from "koa-compose";
import { ServerOptions } from "https";
import { Options } from "@koa/cors";
import { IKoaBodyOptions } from "koa-body";
export interface options {
    keys?: Keygrip | string[];
    beforeall?: Array<compose.Middleware<any>>;
    routerpath?: string;
    body?: IKoaBodyOptions;
    protocol: "http" | "https";
    callback?: Function;
    port: number;
    tls?: ServerOptions;
    cors?: Options;
    session?: Object;
}
