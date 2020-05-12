import { Misc } from "../../../lib/core/app";
import request from "supertest";
import Koa from "koa";
import { resolve } from "path";
import { Response } from "../../../lib/util/response";
import { Test, Expect, TestFixture, SetupFixture } from "alsatian";
import { Code } from '../../router/router'

@TestFixture('App test')
export class ExampleTestFixture {
	instance: request.SuperTest<request.Test>
	app: Misc

	@SetupFixture
	setup() {
		const middleware = async (ctx, next) => {
			ctx.body = "test";
			await next();
		};
		const errorHandler = async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				console.log(err);
				if (err.code != undefined) {
					ctx.body = new Response(err.code, err.data, err.message);
				} else {
					ctx.body = err;
				}
			}
		};
		this.app = new Misc({
			protocol: "http",
			beforeall: [errorHandler, middleware],
			router: resolve(__dirname, "../../router/**/*.ts"),
			keys: ["test"],
			port: 7891
		});
		this.instance = request(this.app.server);
	}

	@Test("should be instance of koa")
	public async test2() {
		Expect(this.app instanceof Koa).toBe(true);
	}

	@Test("should parse body default")
	public async test3() {
		const response = await this.instance.post("/basetest").send({ test: true });
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: Code.basetest, message: "", data: { test: true } });
	}

	@Test("should beforeall option worked")
	public async test5() {
		const response = await this.instance.post("/beforealltest");
		Expect(response.status).toBe(200);
		Expect(response.text).toBe("test");
	}

	@Test("should validate custom error worked")
	public async test6() {
		const response = await this.instance.post("/validateerror");
		Expect(response.status).toBe(200);
		Expect(response.text).toEqual("validateerror");
	}

	@Test("should validate worked")
	public async test7() {
		const response = await this.instance.post("/validateerror").send({ test: true, test2: "111" });;
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: Code.validateerror, message: "", data: "success" });
	}
}