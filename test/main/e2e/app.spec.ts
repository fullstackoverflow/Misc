import { Misc } from "../../../lib/core/app";
import { Config } from "../../../lib/util/config";
import request from "supertest";
import Koa from "koa";
import "jest";
import { resolve } from "path";
import { logger } from "../../../lib/util/log";
import { Res } from "../../../lib/util/response";

let app;
let agent;

describe("app", () => {
	beforeAll(done => {
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
		app = new Misc({
			protocol: "http",
			body: {
				multipart: true
			},
			beforeall: [errorHandler, middleware],
			scan: resolve(__dirname, "../../router/**/*.ts"),
			callback: done,
			keys: ["test"],
			session: {
				maxAge: 30 * 60 * 1000,
				overwrite: true,
				httpOnly: true,
				signed: true
			},
			port: 7891
		});
		console.log(app);
		agent = request.agent(app.server);
	});

	afterAll(async done => {
		app.server.close(done);
	});

	it("should be instance of koa", () => {
		expect(app instanceof Koa).toBe(true);
	});

	it("should parse body default", async () => {
		const response = await agent.post("/basetest").send({ test: true });
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: { test: true } });
	});

	it("should parse formdata with option", async () => {
		const response = await agent.post("/formdata").attach("file", resolve(__dirname, "../../assets/test.md"));
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
	});

	it("should parse formdata with option", async () => {
		const response = await agent.post("/formdata").attach("file", resolve(__dirname, "../../assets/test.md"));
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
	});

	it("should beforeall option worked", async () => {
		const response = await agent.post("/beforealltest");
		expect(response.status).toBe(200);
		expect(response.text).toBe("test");
	});

	it("should session worked", async () => {
		const agent = request.agent(app.server);
		const response1 = await agent.post("/session");
		expect(response1.status).toBe(200);
		response1.header["set-cookie"][0]
			.split(",")
			.map(item => item.split(";")[0])
			.forEach(c => agent.jar.setCookie(c));
		const response2 = await agent.post("/sessionCheck");
		expect(response2.status).toBe(200);
		expect(response2.text).toBe("true");
	});

	it("should return value correct", async () => {
		const response1 = await agent.post("/reswarn");
		expect(response1.status).toBe(200);
		expect(response1.body).toEqual({ code: 1, message: "reswarn", data: null });
		const response2 = await agent.post("/reserr");
		expect(response2.status).toBe(200);
		expect(response2.body).toEqual({ code: 0, message: "reserr", data: null });
	});
});
