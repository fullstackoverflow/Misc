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
var Code;
(function (Code) {
    Code[Code["basetest"] = 0] = "basetest";
    Code[Code["get"] = 1] = "get";
    Code[Code["formdata"] = 2] = "formdata";
    Code[Code["delete"] = 3] = "delete";
    Code[Code["put"] = 4] = "put";
    Code[Code["validateerror"] = 5] = "validateerror";
    Code[Code["beforealltest"] = 6] = "beforealltest";
})(Code = exports.Code || (exports.Code = {}));
let Router = class Router {
    async staus(ctx) {
        ctx.body = new index_1.Response(Code.basetest, ctx.request.body, "");
    }
    async get(ctx) {
        ctx.body = new index_1.Response(Code.get, "success", "");
    }
    async formdata(ctx) {
        ctx.body = new index_1.Response(Code.formdata, ctx.request.files.file.name, "");
    }
    async delete(ctx) {
        ctx.body = new index_1.Response(Code.delete, "success", "");
    }
    async put(ctx) {
        ctx.body = new index_1.Response(Code.put, "success", "");
    }
    async validateerror(ctx) {
        ctx.body = new index_1.Response(Code.validateerror, "success", "");
    }
    async beforealltest(ctx) {
        index_1.logger.info(ctx.body);
    }
};
__decorate([
    Method_1.POST("/basetest"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "staus", null);
__decorate([
    Method_1.GET("/get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "get", null);
__decorate([
    Method_1.POST("/formdata"),
    index_1.Validate({ schema: Upload }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "formdata", null);
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
    Method_1.POST("/validateerror"),
    index_1.Validate({
        schema: Test,
        error: (err) => {
            throw "validateerror";
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "validateerror", null);
__decorate([
    Method_1.POST("/beforealltest"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Router.prototype, "beforealltest", null);
Router = __decorate([
    Controller_1.Controller()
], Router);
exports.default = Router;
//# sourceMappingURL=router.js.map