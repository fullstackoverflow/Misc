"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../lib/core/app");
const config_1 = require("../../../lib/util/config");
const supertest_1 = __importDefault(require("supertest"));
require("jest");
const path_1 = require("path");
let app;
let agent;
describe("app", () => {
    beforeAll(done => {
        config_1.Config.path = path_1.resolve(__dirname, "../../config");
        app = new app_1.Misc({
            protocol: "http",
            body: {
                multipart: true
            },
            scan: path_1.resolve(__dirname, '../../router/**/*.ts'),
            callback: done,
            port: 7890
        });
        agent = supertest_1.default.agent(app.server);
    });
    afterAll(async (done) => {
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
//# sourceMappingURL=decorate.spec.js.map