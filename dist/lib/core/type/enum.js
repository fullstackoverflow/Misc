"use strict";
// export const Type = {
// 	ClassType: Symbol("ClassType"),
// 	MethodType: Symbol("MethodType")
// };
Object.defineProperty(exports, "__esModule", { value: true });
class Type {
}
Type.ClassType = Symbol("ClassType");
Type.MethodType = Symbol("MethodType");
exports.Type = Type;
class ClassDecoratorType {
}
ClassDecoratorType.Controller = Symbol("controller");
ClassDecoratorType.Schedule = Symbol("schedule");
ClassDecoratorType.Config = Symbol("config");
ClassDecoratorType.Component = Symbol("component");
ClassDecoratorType.Singleton = Symbol("singleton");
exports.ClassDecoratorType = ClassDecoratorType;
var MethodDecoratorType;
(function (MethodDecoratorType) {
    MethodDecoratorType["Http"] = "Http";
})(MethodDecoratorType = exports.MethodDecoratorType || (exports.MethodDecoratorType = {}));
class ControllerType {
}
ControllerType.PREFIX = Symbol("prefix");
ControllerType.PATH = Symbol("path");
ControllerType.METHOD = Symbol("method");
ControllerType.VALUE = Symbol("value");
exports.ControllerType = ControllerType;
class ScheduleType {
}
ScheduleType.SCHEDULE = Symbol("schedule");
exports.ScheduleType = ScheduleType;
class ConfigType {
}
ConfigType.ENV = Symbol("env");
exports.ConfigType = ConfigType;
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
//# sourceMappingURL=enum.js.map