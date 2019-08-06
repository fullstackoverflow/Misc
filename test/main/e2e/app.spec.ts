import { Misc } from "../../../lib/core/app";
import { Config } from "../../../lib/util/config";
import request from "supertest";
import Koa from "koa";
import { resolve } from "path";
import { Res } from "../../../lib/util/response";
import { Test, Expect, TestFixture, SetupFixture } from "alsatian";

@TestFixture('App test')
export class ExampleTestFixture {
	instance: request.SuperTest<request.Test>
	app: Misc

	@SetupFixture
	setup() {
		Config.path = resolve(__dirname, "../../config");
		const middleware = async (ctx, next) => {
			ctx.body = "test";
			await next();
		};
		const errorHandler = async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				if (err.code != undefined) {
					ctx.body = new Res(err.code, err.message, err.data);
				}
			}
		};
		this.app = new Misc({
			protocol: "http",
			body: {
				multipart: true
			},
			beforeall: [errorHandler, middleware],
			scan: resolve(__dirname, "../../router/**/*.ts"),
			keys: ["test"],
			session: {
				maxAge: 30 * 60 * 1000,
				overwrite: true,
				httpOnly: true,
				signed: true
			},
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
		Expect(response.body).toEqual({ code: 2, message: "", data: { test: true } });
	}

	@Test("should parse formdata with option")
	public async test4() {
		const response = await this.instance.post("/formdata").attach("file", resolve(__dirname, "../../assets/test.md"));
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
	}

	@Test("should beforeall option worked")
	public async test5() {
		const response = await this.instance.post("/beforealltest");
		Expect(response.status).toBe(200);
		Expect(response.text).toBe("test");
	}

	// @Test("should session worked")
	// public async test6() {
	// 	const response1 = await this.instance.post("/session");
	// 	Expect(response1.status).toBe(200);
	// 	response1.header["set-cookie"][0]
	// 		.split(",")
	// 		.map(item => item.split(";")[0])
	// 		.forEach(c => {
	// 			console.log(this.instance.jar);
	// 			return this.instance.jar.setCookie(c)
	// 		});
	// 	const response2 = await this.instance.post("/sessionCheck");
	// 	Expect(response2.status).toBe(200);
	// 	Expect(response2.text).toBe("true");
	// }

	@Test("should return value correct")
	public async test7() {
		const response1 = await this.instance.post("/reswarn");
		Expect(response1.status).toBe(200);
		Expect(response1.body).toEqual({ code: 1, message: "reswarn", data: null });
		const response2 = await this.instance.post("/reserr");
		Expect(response2.status).toBe(200);
		Expect(response2.body).toEqual({ code: 0, message: "reserr", data: null });
	}
}