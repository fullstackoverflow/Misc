import { Misc } from "../../../lib/core/app";
import request from "supertest";
import Koa from "koa";
import { resolve } from "path";
import { Response } from "../../../lib/util/response";
import { Test, Expect, TestFixture, SetupFixture, Timeout } from "alsatian";
import { Code } from '../../router/router'

@TestFixture('App test')
export class ExampleTestFixture {
	instance: request.SuperTest<request.Test>
	app: Misc

	@SetupFixture
	async setup() {
		const middleware = async (ctx, next) => {
			ctx.body = "test";
			await next();
		};
		const errorHandler = async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				if (err.code != undefined) {
					ctx.body = new Response(err.code, err.data, err.message);
				} else {
					ctx.body = err.message;
				}
			}
		};
		class App extends Misc {
			async Before(){
				console.log("====>Beofre");
			}

			async After(){
				console.log('====>After');
			}
		}
		this.app = new App({
			protocol: "http",
			beforeall: [errorHandler, middleware],
			router: resolve(__dirname, "../../router/**/*.ts"),
			keys: ["test"],
			port: 7892
		});
		await this.app.Wait();
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
	@Timeout(10000)
	public async test6() {
		const response = await this.instance.post("/validateerror");
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: Code.validateerror, message: "validateerror", data: "" });
	}

	@Test("should validate worked")
	public async test7() {
		const response = await this.instance.post("/validateerror").send({ test: true, test2: "111" });;
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: Code.validateerror, message: "", data: "success" });
	}

	@Test("should validate throw error")
	public async test9() {
		const response = await this.instance.put("/validateerror2");
		// Expect(response.status).toBe(200);
		// Expect(response.body).toEqual({ code: Code.validateerror, message: "", data: "success" });
	}

	@Test("should inside Response worked")
	public async test8() {
		const response = await this.instance.post("/response").send();;
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: 1, message: "", data: null });
	}
}