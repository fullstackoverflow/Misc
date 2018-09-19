import { resolve } from 'path';
import { watch } from 'chokidar';
import { logger } from './log';

class Config {
	static path: string;
	private static _instance: any;

	static get instance() {
		if (this.path === undefined) {
			throw new Error('Config path is not init, set path first');
		}
		const absolute = resolve(this.path, `./${process.env.NODE_ENV}.ts`);
		if (this._instance == undefined) {
			this._instance = require(absolute).default;
			logger.success('Config file load:', `${process.env.NODE_ENV}.ts`);
			watch(this.path, {
				ignored: /(^|[\/\\])\../,
				persistent: true,
			}).on('change', () => {
				delete require.cache[absolute];
				this._instance = require(absolute).default;
				logger.success('Config file reload:', `${process.env.NODE_ENV}.ts`);
			});
		}
		return this._instance;
	}
}

export { Config };
