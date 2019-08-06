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
const alsatian_1 = require("alsatian");
class test {
    async case1(param1) {
        throw new Error('throwed');
    }
}
__decorate([
    index_1.Catch(err => {
        throw new Error("Catched");
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], test.prototype, "case1", null);
let instance = new test();
let ExampleTestFixture = class ExampleTestFixture {
    async test1() {
        try {
            instance.case1({});
        }
        catch (e) {
            alsatian_1.Expect(e.message).toEqual("Catched");
        }
    }
    async test2() {
        try {
            await instance.case1({});
        }
        catch (e) {
            alsatian_1.Expect(e.message).toEqual("Catched");
        }
    }
};
__decorate([
    alsatian_1.Test('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test1", null);
__decorate([
    alsatian_1.Test('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleTestFixture.prototype, "test2", null);
ExampleTestFixture = __decorate([
    alsatian_1.TestFixture('Catch test')
], ExampleTestFixture);
exports.ExampleTestFixture = ExampleTestFixture;
//# sourceMappingURL=Catch.spec.js.map