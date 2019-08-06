import { Misc } from "../../../lib/core/app";
import { Config } from "../../../lib/util/config";
import request from "supertest";
import { resolve } from "path";
import { Test, Expect, TestFixture, SetupFixture } from "alsatian";


@TestFixture('Decorate test')
export class ExampleTestFixture {
	instance: request.SuperTest<request.Test>
	app: Misc

	@SetupFixture
	setup() {
		Config.path = resolve(__dirname, "../../config");
		this.app = new Misc({
			protocol: "http",
			body: {
				multipart: true
			},
			scan:resolve(__dirname,'../../router/**/*.ts'),
			port: 7890
		});
		this.instance = request(this.app.server);
	}

	
	@Test("should autowired decorator worked")
	public async test1() {
		const response = await this.instance.post("/autowired");
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
	}

	@Test("should value decorator worked")
	public async test2() {
		const response = await this.instance.post("/value");
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: 2, message: "", data: "value" });
	}

	@Test("should get decorator worked")
	public async test3() {
		const response = await this.instance.get("/get");
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
	}

	@Test("should delete decorator worked")
	public async test4() {
		const response = await this.instance.delete("/delete");
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
	}

	@Test("should validate decorator worked")
	public async test5() {
		const response = await this.instance.post("/validate").send({ test: true, test2: "aaa" });
		Expect(response.status).toBe(200);
		Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
		const response2 = await this.instance.post("/validate");
		Expect(response2.status).toBe(500);
	}

	@Test("should before decorator worked")
	public async test6() {
		const response = await this.instance.post("/before").send({ test: true });
		Expect(response.status).toBe(200);
		Expect(response.text).toEqual("test");
	}

	@Test("should after decorator worked")
	public async test7() {
		const response = await this.instance.post("/after").send({ test: true });
		Expect(response.status).toBe(200);
		Expect(response.text).toEqual("test");
	}

	@Test("should after and before decorator worked")
	public async test8() {
		const response = await this.instance.post("/combin").send({ test: true });
		Expect(response.status).toBe(200);
		Expect(response.text).toEqual("test2");
	}
}