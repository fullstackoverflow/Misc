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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const index_1 = require("../../lib/index");
const TestService_1 = require("../service/TestService");
const class_validator_1 = require("class-validator");
class Test {
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Test.prototype, "test", void 0);
exports.Test = Test;
let Router = class Router {
    staus(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", ctx.request.body);
        });
    }
    formdata(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", ctx.request.body.file.name);
        });
    }
    autowired(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", this.TestService.test());
        });
    }
    value(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", this.value_test);
        });
    }
    get(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", "success");
        });
    }
    delete(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", "success");
        });
    }
    put(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", "success");
        });
    }
    validate(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", "success");
        });
    }
    config(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = new index_1.ResSuccess("", index_1.Config.instance.test);
        });
    }
};
__decorate([
    index_1.Value("test"),
    __metadata("design:type", String)
], Router.prototype, "value_test", void 0);
__decorate([
    index_1.Autowired(),
    __metadata("design:type", TestService_1.TestService)
], Router.prototype, "TestService", void 0);
__decorate([
    index_1.POST("/basetest"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "staus", null);
__decorate([
    index_1.POST("/formdata"),
    index_1.File(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "formdata", null);
__decorate([
    index_1.POST("/autowired"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "autowired", null);
__decorate([
    index_1.POST("/value"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "value", null);
__decorate([
    index_1.GET("/get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "get", null);
__decorate([
    index_1.DELETE("/delete"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "delete", null);
__decorate([
    index_1.PUT("/put"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "put", null);
__decorate([
    index_1.POST("/validate"),
    index_1.Validate({
        schema: Test
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "validate", null);
__decorate([
    index_1.POST("/config"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "config", null);
Router = __decorate([
    index_1.Controller()
], Router);
exports.default = Router;
//# sourceMappingURL=router.js.map