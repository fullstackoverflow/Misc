import Koa from "koa";
import { Validate, logger, Response } from "../../lib/index";
import { IsBoolean, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Controller } from "../../lib/decorator/controller/Controller";
import { POST, GET, DELETE, PUT } from "../../lib/decorator/controller/Method";

export class Test {
	/**
	 * test describe
	 */
	@IsBoolean()
	test: boolean;

	@IsString()
	test2: string;
}

class FormFile {
	@IsString()
	path: string;
}

export class Upload {
	@ValidateNested()
	@Type(() => FormFile)
	file: FormFile;
}

export enum Code {
	basetest,
	get,
	formdata,
	delete,
	put,
	validateerror,
	beforealltest
}

@Controller()
export default class Router {
	test: "test"

	@POST("/basetest")
	async staus(ctx: Koa.Context) {
		ctx.body = new Response(Code.basetest, ctx.request.body, "");
	}

	@GET("/get")
	async get(ctx: Koa.Context) {
		ctx.body = new Response(Code.get, "success", "");
	}

	@POST("/formdata")
	@Validate({ schema: Upload })
	async formdata(ctx: Koa.Context) {
		ctx.body = new Response(Code.formdata, ctx.request.files.file.name, "");
	}

	@DELETE("/delete")
	async delete(ctx: Koa.Context) {
		ctx.body = new Response(Code.delete, "success", "");
	}

	@PUT("/put")
	async put(ctx: Koa.Context) {
		ctx.body = new Response(Code.put, "success", "");
	}

	@POST("/validateerror")
	@Validate({
		schema: Test,
		error: (err) => {
			throw "validateerror";
		}
	})
	async validateerror(ctx: Koa.Context) {
		ctx.body = new Response(Code.validateerror, "success", "");
	}

	@POST("/beforealltest")
	async beforealltest(ctx: Koa.Context) {
		logger.info(ctx.body);
	}
}
