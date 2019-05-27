import { Misc } from "../lib/core/app";
import { resolve } from "path";
import { Config } from "../lib";

console.log(resolve(__dirname,'./config'));
Config.path = resolve(__dirname,'./config');

const app = new Misc({
	protocol: "http",
	scan: resolve(__dirname, "./router/**/*.ts"),
	body: {
		multipart: true
	},
	port: 7890
});
