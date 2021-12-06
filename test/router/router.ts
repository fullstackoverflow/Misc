import Koa, { Context } from "koa";
import { Validate, logger, Response, ValidateType } from "../../lib/index";
import { IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { Controller } from "../../lib/decorator/controller/Controller";
import { POST, GET, DELETE, PUT } from "../../lib/decorator/controller/Method";
import { Autowired, MODE } from "@tosee/util";
import { Body, Ctx, Headers, Params, Query } from "../../lib/decorator/controller/Parameter";

export class Test {
	/**
	 * test describe
	 */
	@IsBoolean()
	test: boolean;

	@IsString()
	test2: string;
}

export class Trans {
	@IsNumber()
	@Transform(
		({ value }) => Number(value)
	)
	test2: number;
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

	@POST("/transform")
	@Validate({
		schema: Trans,
		error: (err) => {
			throw "validateerror";
		}
	}, ValidateType.QueryParams)
	async transform(@Query query: any) {
		return new Response(Code.basetest, query, "");
	}

	@POST("/transform2")
	@Validate({
		schema: Trans,
		error: (err) => {
			throw "validateerror";
		}
	}, ValidateType.QueryParams)
	async transform2(@Query query: any, @Ctx ctx: Context) {
		return new Response(Code.basetest, ctx.query, "");
	}

	@POST("/head")
	async head(@Headers headers: any) {
		return new Response(Code.basetest, headers, "");
	}

	@POST("/query")
	async query(@Query query: any) {
		return new Response(Code.basetest, query, "");
	}

	@POST("/body")
	async body(@Body body: any) {
		return new Response(Code.basetest, body, "");
	}

	@POST("/params/:id")
	async params(@Params params: any) {
		return new Response(Code.basetest, params, "");
	}

	@POST("/basetest")
	async staus(@Body body: any) {
		return new Response(Code.basetest, body, "");
	}

	@GET("/get")
	async get() {
		return new Response(Code.get, "success", "");
	}

	@DELETE("/delete")
	async delete() {
		return new Response(Code.delete, "success", "");
	}

	@PUT("/put")
	async put() {
		return new Response(Code.put, "success", "");
	}

	@POST("/validateerror")
	@Validate({
		schema: Test,
		error: (err) => {
			throw new Response(Code.validateerror, '', "validateerror");
		}
	}, ValidateType.Body)
	async validateerror(@Body body: Test) {
		return new Response(Code.validateerror, "success", "");
	}

	@PUT("/validateerror2")
	@Validate({
		schema: Test,
		error: (err) => {
			throw "validateerror";
		}
	})
	async validateerror2(@Body body: string) {
		return new Response(Code.validateerror, "success", body);
	}

	@POST("/beforealltest")
	async beforealltest(@Body body) {
		logger.info(body);
	}

	@POST("/response")
	async response(@Body body) {
		return new Response(1, null);
	}

	@POST("/requestscope")
	async requestscope(@Body body) {
		this.TestRequest.num++;
	}

	@POST("/requestscope")
	async requestscope2(@Body body) {
		this.TestRequest.num++;
		return new Response(2, this.TestRequest.num);
	}

	@POST("/requestscope3")
	async requestscope3(@Body body) {
		return new Response(2, this.Service.getnum());
	}
}
