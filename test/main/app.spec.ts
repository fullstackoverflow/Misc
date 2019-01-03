import { Misc } from "../../lib/core/app";
import { Config } from "../../lib/util/config";
import request from "supertest";
import Koa from "koa";
import "jest";
import { resolve } from "path";
import { logger } from "../../lib/util/log";
import { Res } from "../../lib/util/response";

describe("app", () => {
	it("should be instance of koa", () => {
		const app = new Misc({
			protocol: "http",
			port: 8001
		});
		expect(app instanceof Koa).toBe(true);
		app.server.close();
	});

	it("should parse body default", async () => {
		const app = new Misc({
			protocol: "http",
			routerpath: resolve(__dirname, "../router"),
			port: 8002
		});
		const response = await request(app.server)
			.post("/basetest")
			.send({ test: true });
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: { test: true } });
		app.server.close();
	});

	it("should parse formdata with option", async () => {
		const app = new Misc({
			protocol: "http",
			routerpath: resolve(__dirname, "../router"),
			body: {
				multipart: true
			},
			port: 8003
		});
		const response = await request(app.server)
			.post("/formdata")
			.attach("file", resolve(__dirname, "../assets/test.md"));
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
		app.server.close();
	});

	it("should parse formdata with option", async () => {
		const app = new Misc({
			protocol: "http",
			routerpath: resolve(__dirname, "../router"),
			body: {
				multipart: true
			},
			port: 8004
		});
		const response = await request(app.server)
			.post("/formdata")
			.attach("file", resolve(__dirname, "../assets/test.md"));
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
		app.server.close();
	});

	it("should beforeall option worked", async () => {
		const middleware = async (ctx, next) => {
			ctx.body = "test";
			await next();
		};
		const app = new Misc({
			protocol: "http",
			routerpath: resolve(__dirname, "../router"),
			beforeall: [middleware],
			port: 8005
		});
		const response = await request(app.server).post("/beforealltest");
		expect(response.status).toBe(200);
		expect(response.text).toBe("test");
		app.server.close();
	});

	it("should session worked", async () => {
		const app = new Misc({
			protocol: "http",
			routerpath: resolve(__dirname, "../router"),
			keys: ["test"],
			session: {
				maxAge: 30 * 60 * 1000,
				overwrite: true,
				httpOnly: true,
				signed: true
			},
			port: 8006
		});
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
		const errorHandler = async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				if (err.code!=undefined) {
					ctx.body = new Res(err.code, err.message, err.data);
				}
			}
		};
		const app = new Misc({
			protocol: "http",
			routerpath: resolve(__dirname, "../router"),
			beforeall: [errorHandler],
			port: 8007
		});
		const agent = request.agent(app.server);
		const response1 = await agent.post("/reswarn");
		expect(response1.status).toBe(200);
		expect(response1.body).toEqual({ code: 1, message: "reswarn", data: null });
		const response2 = await agent.post("/reserr");
		expect(response2.status).toBe(200);
		expect(response2.body).toEqual({ code: 0, message: "reserr", data: null });
	});
});
