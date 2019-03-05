import { resolve, join } from "path";
import glob from "glob";
import Router from "koa-router";
import Koa from "koa";
import { logger } from "../..";

export function scheduleLoader(basePath: string) {
	let routerPath = [];
	glob.sync(join(basePath, "**/*.*{ts,js}")).forEach(item => {
		if (require(item).default) {
			new (require(item)).default();
			routerPath.push(item);
		} else {
			logger.error("Schedule without default export", item);
		}
	});
	logger.success(
		"Schedule Loading:",
		routerPath.map(item => {
			return item.split("/").pop();
		})
	);
}
