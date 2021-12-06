import { Misc } from "../../../lib/core/app";
import request from "supertest";
import Koa from "koa";
import { resolve } from "path";
import { Response } from "../../../lib/util/response";
import { Test, Expect, TestFixture, SetupFixture, Timeout, Focus } from "alsatian";
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
		this.app = new Misc({
			protocol: "http",
			beforeall: [errorHandler, middleware],
			router: resolve(__dirname, "../../router/**/*.ts"),
			keys: ["test"],
			port: 7891
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

	@Test("should request scope worked")
	public async test10() {
		const response_1 = await this.instance.post("/requestscope").send({ num: 1 });
		Expect(response_1.status).toBe(200);
		Expect(response_1.body).toEqual({ code: 2, message: "", data: 3 });
		const response_2 = await this.instance.post("/requestscope").send({ num: 4 });
		Expect(response_2.status).toBe(200);
		Expect(response_2.body).toEqual({ code: 2, message: "", data: 6 });
		const response_3 = await this.instance.post("/requestscope3").send({ num: 7 });
		Expect(response_3.status).toBe(200);
		Expect(response_3.body).toEqual({ code: 2, message: "", data: 8 });
	}

	@Test("should parameter decorator worked")
	@Focus
	public async test11() {
		const response_1 = await this.instance.post("/head").set("accept", "application/json").send();
		Expect(response_1.status).toBe(200);
		Expect(response_1.body.data.accept).toEqual("application/json");
		const response_2 = await this.instance.post("/body").send({ test: 1 });
		Expect(response_2.status).toBe(200);
		Expect(response_2.body.data.test).toEqual(1);
		const response_3 = await this.instance.post("/query?uid=5").send();
		Expect(response_3.status).toBe(200);
		Expect(response_3.body.data.uid).toEqual(5);
		const response_4 = await this.instance.post("/params/5").send();
		Expect(response_4.status).toBe(200);
		Expect(response_4.body.data.id).toEqual(5);
		const response_5 = await this.instance.post("/transform?test2=5").send();
		Expect(response_5.status).toBe(200);
		Expect(response_5.body.data.test2).toEqual(5);
		Expect(typeof response_5.body.data.test2).toEqual("number");
		const response_6 = await this.instance.post("/transform2?test2=5").send();
		Expect(response_6.status).toBe(200);
		Expect(response_6.body.data.test2).toEqual('5');
		Expect(typeof response_6.body.data.test2).toEqual("string");
	}
}