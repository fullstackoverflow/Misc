import request from "supertest";
import { Server } from "../app";
import { Expect, TestFixture, AsyncTest, SetupFixture, AsyncSetupFixture, Test, TeardownFixture } from "alsatian";
import Koa from "koa";

@TestFixture("app")
export class ExampleTestFixture {
	instance: request.SuperTest<request.Test>;

	@AsyncSetupFixture
	async init() {
		try {
			this.instance = request(Server);
		} catch (e) {
			console.log(e);
		}
	}

	// @Test("should be instance of koa")
	// public async test0() {
	// 	Expect(Server instanceof Koa).toBe(true);
	// }

	@AsyncTest("should parse body default")
	public async test1() {
		try {
			const response = await this.instance.post("/test/basetest").send({ test: true });
			Expect(response.status).toBe(200);
			Expect(response.body).toEqual({ code: 2, message: "", data: { test: true } });
		} catch (e) {
			console.log(e);
		}
	}

	@TeardownFixture
	public teardownFixture() {
		Server.close()
		process.exit()
	}

	// @AsyncTest("should parse body default")
	// public async test2() {
	// 	try {
	// 		const response = await this.instance.post("/test/basetest").send({ test: true });
	// 		Expect(response.status).toBe(200);
	// 		Expect(response.body).toEqual({ code: 2, message: "", data: { test: true } });
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	// @AsyncTest("test")
	// public async test3() {
	// 	const instance = request(Server);
	// 	const response = await instance.get("/test?test=111");
	// 	Expect(response.status).toBe(200);
	// 	Expect(response.text).toBe("6769");
	// }
}
