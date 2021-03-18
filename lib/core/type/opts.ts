import Keygrip from "keygrip";
import compose from "koa-compose";
import { ServerOptions } from "https";
import { Options } from "@koa/cors";
import { Options as IBodyOptions } from "koa-bodyparser";
import Koa from 'koa';

declare module "koa" {
	interface Request extends Koa.BaseRequest {
		body?: any;
	}

	interface DefaultContext extends Koa.DefaultContextExtends {
		params:any
	}
}

export interface options {
	keys?: Keygrip | string[];
	beforeall?: Array<compose.Middleware<any>>;
	router?: string;
	body?: IBodyOptions;
	protocol: "http" | "https";
	callback?: () => void;
	port: number;
	tls?: ServerOptions;
	cors?: Options;
}
