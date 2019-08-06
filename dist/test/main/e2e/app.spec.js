"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../lib/core/app");
const config_1 = require("../../../lib/util/config");
const supertest_1 = __importDefault(require("supertest"));
const koa_1 = __importDefault(require("koa"));
const path_1 = require("path");
const response_1 = require("../../../lib/util/response");
const alsatian_1 = require("alsatian");
let ExampleTestFixture = class ExampleTestFixture {
    setup() {
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
        this.app = new app_1.Misc({
            protocol: "http",
            body: {
                multipart: true
            },
            beforeall: [errorHandler, middleware],
            scan: path_1.resolve(__dirname, "../../router/**/*.ts"),
            keys: ["test"],
            session: {
                maxAge: 30 * 60 * 1000,
                overwrite: true,
                httpOnly: true,
                signed: true
            },
            port: 7891
        });
        this.instance = supertest_1.default(this.app.server);
    }
    async test2() {
        alsatian_1.Expect(this.app instanceof koa_1.default).toBe(true);
    }
    async test3() {
        const response = await this.instance.post("/basetest").send({ test: true });
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.body).toEqual({ code: 2, message: "", data: { test: true } });
    }
    async test4() {
        const response = await this.instance.post("/formdata").attach("file", path_1.resolve(__dirname, "../../assets/test.md"));
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.body).toEqual({ code: 2, message: "", data: "test.md" });
    }
    async test5() {
        const response = await this.instance.post("/beforealltest");
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.text).toBe("test");
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
    async test7() {
        const response1 = await this.instance.post("/reswarn");
        alsatian_1.Expect(response1.status).toBe(200);
        alsatian_1.Expect(response1.body).toEqual({ code: 1, message: "reswarn", data: null });
        const response2 = await this.instance.post("/reserr");
        alsatian_1.Expect(response2.status).toBe(200);
        alsatian_1.Expect(response2.body).toEqual({ code: 0, message: "reserr", data: null });
    }
};
__decorate([
    alsatian_1.SetupFixture,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleTestFixture.prototype, "setup", null);
__decorate([
    alsatian_1.Test("should be instance of koa"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test2", null);
__decorate([
    alsatian_1.Test("should parse body default"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test3", null);
__decorate([
    alsatian_1.Test("should parse formdata with option"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test4", null);
__decorate([
    alsatian_1.Test("should beforeall option worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test5", null);
__decorate([
    alsatian_1.Test("should return value correct"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test7", null);
ExampleTestFixture = __decorate([
    alsatian_1.TestFixture('App test')
], ExampleTestFixture);
exports.ExampleTestFixture = ExampleTestFixture;
//# sourceMappingURL=app.spec.js.map