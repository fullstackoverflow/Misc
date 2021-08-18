import Koa, { Context } from "koa";
import { Validate, logger, Response, ValidateType } from "../../lib/index";
import { IsBoolean, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Controller } from "../../lib/decorator/controller/Controller";
import { POST, GET, DELETE, PUT } from "../../lib/decorator/controller/Method";
import { Autowired, MODE } from "@tosee/util";

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

export class TestRequest {
	constructor(ctx: Context) {
		this.num = ctx.request.body.num;
	}

	num: number = 0;
}

class Service {

	@Autowired({ mode: MODE.Request })
	TestRequest: TestRequest

	getnum() {
		const num = this.TestRequest.num + 1;
		return num;
	}
}

@Controller()
export default class Router {
	test: "test"

	@Autowired({ mode: MODE.Request })
	TestRequest: TestRequest

	@Autowired({ mode: MODE.Singleton })
	Service: Service

	@POST("/basetest")
	async staus(ctx: Koa.Context) {
		ctx.body = new Response(Code.basetest, ctx.request.body, "");
	}

	@GET("/get")
	async get(ctx: Koa.Context) {
		ctx.body = new Response(Code.get, "success", "");
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
			throw new Response(Code.validateerror, '', "validateerror");
		}
	}, ValidateType.Body)
	async validateerror(ctx: Koa.Context) {
		ctx.body = new Response(Code.validateerror, "success", "");
	}

	@PUT("/validateerror2")
	@Validate({
		schema: Test,
		error: (err) => {
			throw "validateerror";
		}
	})
	async validateerror2(ctx: Koa.Context) {
		ctx.body = new Response(Code.validateerror, "success", ctx.request.body);
	}

	@POST("/beforealltest")
	async beforealltest(ctx: Koa.Context) {
		logger.info(ctx.body);
	}

	@POST("/response")
	async response(ctx: Koa.Context) {
		ctx.body = new Response(1, null);
	}

	@POST("/requestscope")
	async requestscope(ctx: Koa.Context, next: Function) {
		this.TestRequest.num++;
		await next();
	}

	@POST("/requestscope")
	async requestscope2(ctx: Koa.Context) {
		this.TestRequest.num++;
		ctx.body = new Response(2, this.TestRequest.num);
	}

	@POST("/requestscope3")
	async requestscope3(ctx: Koa.Context) {
		ctx.body = new Response(2, this.Service.getnum());
	}
}
