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
    constructor() {
        this.retry = 0;
    }
    case1(param1) {
        this.retry++;
        throw new Error('throwed');
    }
    async case2(param1) {
        this.retry++;
        throw new Error('throwed');
    }
}
__decorate([
    index_1.Retry(3),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Test.prototype, "case1", null);
__decorate([
    index_1.Retry(3),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "case2", null);
describe("Retry", () => {
    it("Retry Sync should work", () => {
        let instance = new Test();
        try {
            instance.case1({});
        }
        catch (e) {
            expect(instance.retry).toStrictEqual(3);
        }
    });
    it("Retry Async should work", async () => {
        let instance = new Test();
        try {
            await instance.case1({});
        }
        catch (e) {
            expect(instance.retry).toStrictEqual(3);
        }
    });
});
//# sourceMappingURL=Retry.spec.js.map