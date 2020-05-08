import Keygrip from "keygrip";
import compose from "koa-compose";
import { ServerOptions } from "https";
import { Options } from "@koa/cors";
import { IKoaBodyOptions } from "koa-body";

export interface options {
	keys?: Keygrip | string[];
	beforeall?: Array<compose.Middleware<any>>;
	router?: string;
	body?: IKoaBodyOptions;
	protocol: "http" | "https";
	callback?: ()=>void;
	port: number;
	tls?: ServerOptions;
	cors?: Options;
}
