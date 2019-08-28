import { resolve } from "path";
import { watch } from "chokidar";
import { logger } from "./log";
import { existsSync, readFileSync } from "fs";

class Config {
	static path: string;
	private static _instance: any;

	static get instance() {
		if (this.path === undefined) {
			throw new Error("Config path is not init, set path first");
		}
		const config_path = existsSync(resolve(this.path, `./default.ts`)) ? resolve(this.path, `./default.ts`) : resolve(this.path, `./default.js`);
		const default_path = existsSync(resolve(this.path, `./${process.env.NODE_ENV}.ts`)) ? resolve(this.path, `./${process.env.NODE_ENV}.ts`) : resolve(this.path, `./${process.env.NODE_ENV}.js`);;
		if (this._instance == undefined) {
			if (existsSync(default_path) && existsSync(config_path)) {
				this._instance = Object.assign({}, require(default_path).default, require(config_path).default);
				logger.success(`Config file load: ${process.env.NODE_ENV}.ts(merged default.ts)`);
			} else if (existsSync(config_path)) {
				this._instance = require(config_path).default;
				logger.success(`Config file load: ${process.env.NODE_ENV}.ts`);
			} else {
				throw new Error(`Config file ${config_path} load failed, file not exist`);
			}
			watch(this.path, {
				ignored: /(^|[\/\\])\../,
				persistent: true
			}).on("change", () => {
				delete require.cache[config_path];
				if (existsSync(default_path)) {
					delete require.cache[default_path];
					this._instance = Object.assign({}, require(default_path).default, require(config_path).default);
					logger.success(`Config file load: ${process.env.NODE_ENV}.ts(merged default.ts)`);
				} else {
					this._instance = require(config_path).default;
					logger.success("Config file reload:", `${process.env.NODE_ENV}.ts`);
				}
			});
		}
		return this._instance;
	}
}

export { Config };
