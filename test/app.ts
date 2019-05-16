import { resolve } from 'path';
import { Config, Misc } from '../dist';

Config.path = resolve(__dirname, './config');

const app = new Misc({
	keys: ['web_platform'],
	scan: resolve(__dirname, './**/*.ts'),
	protocol: "http",
	port: 7890,
});

const Server = app.server;

export { Server };
