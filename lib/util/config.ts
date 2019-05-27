import { resolve } from "path";
import { watch } from "chokidar";
import { logger } from "./log";
import { existsSync, readFileSync } from "fs";
import { ClassScanner } from "../core/ClassScanner";
import { Type, ClassDecoratorType } from "../core/type/enum";
import { Dispatch } from "../core/loader";

class Config {
	static instance: any;

	static set path(path: string) {
		const dipatch = new Dispatch();
		const configs = new ClassScanner(resolve(path, "**/*.ts"))
			.scan()
			.map(clazz => {
				const ClassType = Reflect.getMetadata(Type.ClassType, clazz);
				if (ClassType === ClassDecoratorType.Config) {
					return dipatch[ClassDecoratorType.Config](clazz, null);
				}
			})
			.filter(Boolean);
		if (Config.instance == undefined) {
			const defaultConfig = configs.find(i => i.env == "default");
			const envConfig = configs.find(i => i.env == process.env.NODE_ENV);
			if (defaultConfig && envConfig) {
				Config.instance = Object.assign({}, defaultConfig.instance, envConfig.instance);
			} else if (defaultConfig && !envConfig) {
				Config.instance = Object.assign({}, defaultConfig.instance);
			} else if (!defaultConfig && envConfig) {
				Config.instance = Object.assign({}, envConfig.instance);
			} else {
				throw new Error(`Config file load failed`);
			}
		}
	}
}

export { Config };
