import "reflect-metadata";
import Koa from "koa";
import compose from "koa-compose";
import { logger } from "../util/log";
import http, { Server as httpServer } from "http";
import https, { Server as httpsServer } from "https";
import { options } from "./type/opts";
import cors from "@koa/cors";
import body from "koa-bodyparser";
import { ClassScanner } from "./ClassScanner";
import { Type } from "./type/enum";
import { Dispatch } from "./loader/dispatch";

export class Misc extends Koa {
	server: httpServer | httpsServer;

	private start: Promise<void>;

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
	constructor(opts: options) {
		super();
		this.start = new Promise(resolve => {
			this.Before()
				.then(() => this.Load(opts))
				.then(() => this.After())
				.then(() => resolve());
		})
	}

	private Load(opts: options) {
		const default_options = { body: body, cors: cors, beforeall: compose };
		const pack = require("../../package.json");
		logger.info("version:", pack.version);
		/**
		 * 内置插件
		 */
		if (!opts.body) {
			this.use(body());
		}
		const indexs = [];
		Object.keys(opts).forEach(key => {
			const index = Object.keys(default_options).findIndex(i => i == key);
			indexs.push(index);
		});

		indexs
			.filter(i => i != -1)
			.sort((a, b) => a - b)
			.forEach(index => {
				const key = Object.keys(default_options)[index];
				const func = default_options[key];
				const option = opts[key];
				this.use(func(option));
			});
		this.keys = opts.keys;
		const dipatch = new Dispatch();
		const scan_path = [
			opts.router || "src/router/**/*.ts"
		];
		logger.info("scan path:", scan_path);
		new ClassScanner(scan_path).scan().forEach(clazz => {
			const ClassType = Reflect.getMetadata(Type.ClassType, clazz);
			if (ClassType != undefined) {
				dipatch[ClassType](clazz, this);
			}
		});
		if (opts.protocol == "http") {
			this.server = http.createServer(this.callback()).listen(opts.port, opts.callback);
		} else if (opts.protocol == "https") {
			this.server = https.createServer(opts.tls, this.callback()).listen(opts.port, opts.callback);
		} else {
			throw new Error("protocol must be http or https");
		}

		logger.success("NODE_ENV:" + process.env.NODE_ENV);
		logger.success("server start at:" + opts.port);
		logger.success("protocol:", opts.protocol);
	}

	async Before() {

	}

	async After() {

	}

	Wait() {
		return this.start;
	}
}
