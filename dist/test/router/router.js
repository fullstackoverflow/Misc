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
const koa_1 = __importDefault(require("koa"));
const index_1 = require("../../lib/index");
const TestService_1 = require("../service/TestService");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Controller_1 = require("../../lib/decorator/controller/Controller");
const Method_1 = require("../../lib/decorator/controller/Method");
class Test {
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Test.prototype, "test", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Test.prototype, "test2", void 0);
exports.Test = Test;
class FormFile {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FormFile.prototype, "path", void 0);
class Upload {
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => FormFile),
    __metadata("design:type", FormFile)
], Upload.prototype, "file", void 0);
exports.Upload = Upload;
let Router = class Router {
    async staus(ctx) {
        ctx.body = new index_1.ResSuccess("", ctx.request.body);
    }
    async formdata(ctx) {
        ctx.body = new index_1.ResSuccess("", ctx.request.body.file.name);
    }
    async autowired(ctx) {
        ctx.body = new index_1.ResSuccess("", this.TestService.test());
    }
    async value(ctx) {
        ctx.body = new index_1.ResSuccess("", this.value_test);
    }
    async get(ctx) {
        ctx.body = new index_1.ResSuccess("", "success");
    }
    async delete(ctx) {
        ctx.body = new index_1.ResSuccess("", "success");
    }
    async put(ctx) {
        ctx.body = new index_1.ResSuccess("", "success");
    }
    /**
     * @api {post} /basetest basetest
     * @apiGroup test
     * @apiName basetest
     * @apiParamClass (test/router/router.ts) {Test}
     */
    async validate(ctx) {
        ctx.body = new index_1.ResSuccess("", "success");
    }
    async config(ctx) {
        ctx.body = new index_1.ResSuccess("", index_1.Config.instance.test);
    }
    async beforealltest(ctx) {
        index_1.logger.info(ctx.body);
    }
    async session(ctx) {
        ctx.session.user = true;
        ctx.body = new index_1.ResSuccess("", null);
    }
    async sessionCheck(ctx) {
        ctx.body = ctx.session.user;
    }
    async reswarn(ctx) {
        index_1.logger.info("reswarn");
        throw new index_1.ResWarn("reswarn", null);
    }
    async reserr(ctx) {
        index_1.logger.error("reserr");
        throw new index_1.ResError("reserr", null);
    }
    async before(ctx) {
        ctx.body = ctx.state;
    }
    async after(ctx) {
        ctx.body = "after";
    }
    async combin(ctx) {
        ctx.body = "after";
    }
};
__decorate([
    index_1.Value("test"),
    __metadata("design:type", String)
], Router.prototype, "value_test", void 0);
__decorate([
    index_1.Autowired,
    __metadata("design:type", TestService_1.TestService)
], Router.prototype, "TestService", void 0);
__decorate([
    Method_1.POST("/basetest"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "staus", null);
__decorate([
    Method_1.POST("/formdata"),
    index_1.Validate({ schema: Upload }),
    index_1.File(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "formdata", null);
__decorate([
    Method_1.POST("/autowired"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "autowired", null);
__decorate([
    Method_1.POST("/value"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "value", null);
__decorate([
    Method_1.GET("/get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "get", null);
__decorate([
    Method_1.DELETE("/delete"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "delete", null);
__decorate([
    Method_1.PUT("/put"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "put", null);
__decorate([
    Method_1.POST("/validate"),
    index_1.Validate({
        schema: Test
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "validate", null);
__decorate([
    Method_1.POST("/config"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "config", null);
__decorate([
    Method_1.POST("/beforealltest"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "beforealltest", null);
__decorate([
    Method_1.POST("/session"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "session", null);
__decorate([
    Method_1.POST("/sessionCheck"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "sessionCheck", null);
__decorate([
    Method_1.POST("/reswarn"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "reswarn", null);
__decorate([
    Method_1.POST("/reserr"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "reserr", null);
__decorate([
    Method_1.POST("/before"),
    index_1.Before(async (ctx, next) => {
        ctx.state = "test";
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "before", null);
__decorate([
    Method_1.POST("/after"),
    index_1.After((ctx, next) => {
        ctx.body = "test";
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "after", null);
__decorate([
    Method_1.POST("/combin"),
    index_1.Before((ctx, next) => {
        ctx.state = "test1";
    }),
    index_1.After((ctx, next) => {
        ctx.body = "test2";
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "combin", null);
Router = __decorate([
    Controller_1.Controller()
], Router);
exports.default = Router;
//# sourceMappingURL=router.js.map