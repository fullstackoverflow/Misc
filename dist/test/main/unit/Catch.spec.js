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
require("jest");
const lib_1 = require("../../../lib");
class Test {
    async case1(param1) {
        throw new Error('throwed');
    }
}
__decorate([
    lib_1.Catch(err => {
        throw new Error("Catched");
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "case1", null);
let instance = new Test();
describe("Catch", () => {
    it("Catch should catch sync exception", () => {
        try {
            instance.case1({});
        }
        catch (e) {
            expect(e.message).toStrictEqual("Catched");
        }
    });
    it("Catch should catch Async exception", async () => {
        try {
            await instance.case1({});
        }
        catch (e) {
            expect(e.message).toStrictEqual("Catched");
        }
    });
});
//# sourceMappingURL=Catch.spec.js.map