import Koa from "koa";
import {
	Controller,
	Autowired,
	POST,
	Validate,
	ResSuccess,
	GET,
	File,
	DELETE,
	PUT,
	Value,
	Config,
	logger,
	ResWarn,
	ResError,
	Schedule
} from "../../lib/index";
import { TestService } from "../service/TestService";
import { IsBoolean } from "class-validator";
import { writeFileSync } from "fs";
import { resolve } from "path";
import moment = require("moment");

export class Test {
	/**
	 * test describe
	 */
	@IsBoolean()
	test: boolean;
}

@Controller()
export default class Router {
	@Value("test")
	value_test: string;

	@Autowired()
	TestService: TestService;

	@POST("/basetest")
	async staus(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", ctx.request.body);
	}

	@POST("/formdata")
	@File()
	async formdata(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", ctx.request.body.file.name);
	}

	@POST("/autowired")
	async autowired(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", this.TestService.test());
	}

	@POST("/value")
	async value(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", this.value_test);
	}

	@GET("/get")
	async get(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
	}

	@DELETE("/delete")
	async delete(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
	}

	@PUT("/put")
	async put(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
	}

	/**
	 * @api {post} /basetest basetest
	 * @apiGroup test
	 * @apiName basetest
	 * @apiParamClass (test/router/router.ts) {Test}
	 */
	@POST("/validate")
	@Validate({
		schema: Test
	})
	async validate(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
	}

	@POST("/config")
	async config(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", Config.instance.test);
	}

	@POST("/beforealltest")
	async beforealltest(ctx: Koa.Context) {
		logger.info(ctx.body);
	}

	@POST("/session")
	async session(ctx: Koa.Context) {
		ctx.session.user = true;
		ctx.body = new ResSuccess("", null);
	}

	@POST("/sessionCheck")
	async sessionCheck(ctx: Koa.Context) {
		ctx.body = ctx.session.user;
	}

	@POST("/reswarn")
	async reswarn(ctx: Koa.Context) {
		logger.info("reswarn");
		throw new ResWarn("reswarn", null);
	}

	@POST("/reserr")
	async reserr(ctx: Koa.Context) {
		logger.error("reserr");
		throw new ResError("reserr", null);
	}

	// @Schedule(
	// 	moment()
	// 		.add(2, "seconds")
	// 		.toDate()
	// )
	// async function() {
	// 	writeFileSync(resolve(__dirname, "../test.md"), "1111");
	// }
}
