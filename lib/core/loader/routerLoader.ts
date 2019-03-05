import { resolve, join } from "path";
import glob from "glob";
import Router from "koa-router";
import Koa from "koa";
import { logger } from "../..";

export function routerLoader(instance: Koa, basePath: string) {
	let routerPath = [];
	glob.sync(join(basePath, "**/*.*{ts,js}")).forEach(item => {
		if (require(item).default) {
			let router: Router = new (require(item)).default();
			if (router instanceof Router) {
				routerPath.push(item);
				instance.use(router.routes()).use(router.allowedMethods());
			} else {
				logger.error("Without @Controller decorator", item);
			}
		} else {
			logger.error("Router without default export", item);
		}
	});
	logger.success(
		"Router Loading:",
		routerPath.map(item => {
			return item.split("/").pop();
		})
	);
}
