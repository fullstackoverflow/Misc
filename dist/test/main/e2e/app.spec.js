"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../lib/core/app");
const config_1 = require("../../../lib/util/config");
const supertest_1 = __importDefault(require("supertest"));
const koa_1 = __importDefault(require("koa"));
require("jest");
const path_1 = require("path");
const response_1 = require("../../../lib/util/response");
let app;
let agent;
describe("app", () => {
    beforeAll(done => {
        config_1.Config.path = path_1.resolve(__dirname, "../../config");
        const middleware = async (ctx, next) => {
            ctx.body = "test";
            await next();
        };
        const errorHandler = async (ctx, next) => {
            try {
                await next();
            }
            catch (err) {
                if (err.code != undefined) {
                    ctx.body = new response_1.Res(err.code, err.message, err.data);
                }
            }
        };
        app = new app_1.Misc({
            protocol: "http",
            body: {
                multipart: true
            },
            beforeall: [errorHandler, middleware],
            scan: path_1.resolve(__dirname, "../../router/**/*.ts"),
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
        agent = supertest_1.default.agent(app.server);
    });
    afterAll(async (done) => {
        app.server.close(done);
    });
    it("should be instance of koa", () => {
        expect(app instanceof koa_1.default).toBe(true);
    });
    it("should parse body default", async () => {
        const response = await agent.post("/basetest").send({ test: true });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ code: 2, message: "", data: { test: true } });
    });
    it("should parse formdata with option", async () => {
        const response = await agent.post("/formdata").attach("file", path_1.resolve(__dirname, "../../assets/test.md"));
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
    });
    it("should parse formdata with option", async () => {
        const response = await agent.post("/formdata").attach("file", path_1.resolve(__dirname, "../../assets/test.md"));
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
    });
    it("should beforeall option worked", async () => {
        const response = await agent.post("/beforealltest");
        expect(response.status).toBe(200);
        expect(response.text).toBe("test");
    });
    it("should session worked", async () => {
        const agent = supertest_1.default.agent(app.server);
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
//# sourceMappingURL=app.spec.js.map