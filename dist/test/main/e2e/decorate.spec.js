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
const path_1 = require("path");
const alsatian_1 = require("alsatian");
let ExampleTestFixture = class ExampleTestFixture {
    setup() {
        config_1.Config.path = path_1.resolve(__dirname, "../../config");
        this.app = new app_1.Misc({
            protocol: "http",
            body: {
                multipart: true
            },
            scan: path_1.resolve(__dirname, '../../router/**/*.ts'),
            port: 7890
        });
        this.instance = supertest_1.default(this.app.server);
    }
    async test1() {
        const response = await this.instance.post("/autowired");
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
    }
    async test2() {
        const response = await this.instance.post("/value");
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.body).toEqual({ code: 2, message: "", data: "value" });
    }
    async test3() {
        const response = await this.instance.get("/get");
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
    }
    async test4() {
        const response = await this.instance.delete("/delete");
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
    }
    async test5() {
        const response = await this.instance.post("/validate").send({ test: true, test2: "aaa" });
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.body).toEqual({ code: 2, message: "", data: "success" });
        const response2 = await this.instance.post("/validate");
        alsatian_1.Expect(response2.status).toBe(500);
    }
    async test6() {
        const response = await this.instance.post("/before").send({ test: true });
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.text).toEqual("test");
    }
    async test7() {
        const response = await this.instance.post("/after").send({ test: true });
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.text).toEqual("test");
    }
    async test8() {
        const response = await this.instance.post("/combin").send({ test: true });
        alsatian_1.Expect(response.status).toBe(200);
        alsatian_1.Expect(response.text).toEqual("test2");
    }
};
__decorate([
    alsatian_1.SetupFixture,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleTestFixture.prototype, "setup", null);
__decorate([
    alsatian_1.Test("should autowired decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test1", null);
__decorate([
    alsatian_1.Test("should value decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test2", null);
__decorate([
    alsatian_1.Test("should get decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test3", null);
__decorate([
    alsatian_1.Test("should delete decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test4", null);
__decorate([
    alsatian_1.Test("should validate decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test5", null);
__decorate([
    alsatian_1.Test("should before decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test6", null);
__decorate([
    alsatian_1.Test("should after decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test7", null);
__decorate([
    alsatian_1.Test("should after and before decorator worked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test8", null);
ExampleTestFixture = __decorate([
    alsatian_1.TestFixture('Decorate test')
], ExampleTestFixture);
exports.ExampleTestFixture = ExampleTestFixture;
//# sourceMappingURL=decorate.spec.js.map