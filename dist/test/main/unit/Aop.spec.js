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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../lib/index");
class Test {
    case1(param1) {
        return param1;
    }
    case2(param1) {
        param1.test = 111;
        return param1;
    }
    case3(param1) {
        param1.test = 222;
        return param1;
    }
    async case4(param1) {
        return param1;
    }
    async case5(param1) {
        param1.test = 111;
        return param1;
    }
    async case6(param1) {
        param1.test = 222;
        return param1;
    }
}
__decorate([
    index_1.Before(param1 => {
        param1.test = 222;
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Test.prototype, "case1", null);
__decorate([
    index_1.After(param1 => {
        param1.test = 333;
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Test.prototype, "case2", null);
__decorate([
    index_1.Around(param1 => {
        param1.test = 111;
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Test.prototype, "case3", null);
__decorate([
    index_1.Before(param1 => {
        param1.test = 222;
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "case4", null);
__decorate([
    index_1.After(param1 => {
        param1.test = 333;
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "case5", null);
__decorate([
    index_1.Around(param1 => {
        param1.test = 111;
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "case6", null);
let instance = new Test();
describe("Aop", () => {
    it("Before should change sync function params correct", () => {
        expect(instance.case1({})).toStrictEqual({ test: 222 });
    });
    it("After should change sync function params correct", () => {
        expect(instance.case2({})).toStrictEqual({ test: 333 });
    });
    it("Around should change sync function params correct", () => {
        expect(instance.case3({})).toStrictEqual({ test: 111 });
    });
    it("Before should change Async function params correct", async () => {
        expect(await instance.case4({})).toStrictEqual({ test: 222 });
    });
    it("After should change Async function params correct", async () => {
        expect(await instance.case5({})).toStrictEqual({ test: 333 });
    });
    it("Around should change Async function params correct", async () => {
        expect(await instance.case6({})).toStrictEqual({ test: 111 });
    });
});
//# sourceMappingURL=Aop.spec.js.map