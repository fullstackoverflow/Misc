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
const enum_1 = require("../type/enum");
const Autowired_1 = require("../../decorator/util/Autowired");
const ControllerLoader_1 = require("./controller/ControllerLoader");
const ScheduleLoader_1 = require("./schedule/ScheduleLoader");
const ConfigLoader_1 = require("./config/ConfigLoader");
class Dispatch {
    [enum_1.ClassDecoratorType.Controller](clazz, app) {
        this.ControllerLoader.Load(clazz, app);
    }
    [enum_1.ClassDecoratorType.Config](clazz, app) {
        return this.ConfigLoader.Load(clazz, app);
    }
    [enum_1.ClassDecoratorType.Schedule](clazz, app) {
        this.ScheduleLoader.Load(clazz, app);
    }
}
__decorate([
    Autowired_1.Autowired,
    __metadata("design:type", ControllerLoader_1.ControllerLoader)
], Dispatch.prototype, "ControllerLoader", void 0);
__decorate([
    Autowired_1.Autowired,
    __metadata("design:type", ScheduleLoader_1.ScheduleLoader)
], Dispatch.prototype, "ScheduleLoader", void 0);
__decorate([
    Autowired_1.Autowired,
    __metadata("design:type", ConfigLoader_1.ConfigLoader)
], Dispatch.prototype, "ConfigLoader", void 0);
exports.Dispatch = Dispatch;
//# sourceMappingURL=dispatch.js.map