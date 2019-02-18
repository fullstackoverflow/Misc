import { Misc } from "../../lib/core/app";
import { Config } from "../../lib/util/config";
import request from "supertest";
import Koa from "koa";
import "jest";
import { resolve } from "path";
import { logger } from "../../lib/util/log";

Config.path = resolve(__dirname, "../config");

let app;
let agent;

describe("app", () => {
	beforeAll(done => {
		app = new Misc({
			protocol: "http",
			routerpath: resolve(__dirname, "../router"),
			body: {
				multipart: true
			},
			callback: done,
			port: 7890
		});
		agent = request.agent(app.server);
	});

	afterAll(async done => {
		app.server.close(done);
	});

	it("should autowired decorator worked", async () => {
		const response = await agent.post("/autowired");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "success" });
	});

	it("should value decorator worked", async () => {
		const response = await agent.post("/value");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "value" });
	});

	it("should get decorator worked", async () => {
		const response = await agent.get("/get");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "success" });
	});

	it("should delete decorator worked", async () => {
		const response = await agent.delete("/delete");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "success" });
	});

	it("should put decorator worked", async () => {
		const response = await agent.put("/put");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "success" });
	});

	it("should validate decorator worked", async () => {
		const response = await agent.post("/validate").send({ test: true, test2: "aaa" });
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "success" });
		const response2 = await agent.post("/validate");
		expect(response2.status).toBe(500);
	});

	it("should before decorator worked", async () => {
		const response = await agent.post("/before").send({ test: true });
		expect(response.status).toBe(200);
		expect(response.text).toEqual("test");
	});

	it("should after decorator worked", async () => {
		const response = await agent.post("/after").send({ test: true });
		expect(response.status).toBe(200);
		expect(response.text).toEqual("test");
	});

	it("should after and before decorator worked", async () => {
		const response = await agent.post("/combin").send({ test: true });
		expect(response.status).toBe(200);
		expect(response.text).toEqual("test2");
	});
});
