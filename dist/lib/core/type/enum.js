"use strict";
// export const Type = {
// 	ClassType: Symbol("ClassType"),
// 	MethodType: Symbol("MethodType")
// };
Object.defineProperty(exports, "__esModule", { value: true });
class Type {
}
exports.Type = Type;
Type.ClassType = Symbol("ClassType");
Type.MethodType = Symbol("MethodType");
class ClassDecoratorType {
}
exports.ClassDecoratorType = ClassDecoratorType;
ClassDecoratorType.Controller = Symbol("controller");
ClassDecoratorType.Schedule = Symbol("schedule");
ClassDecoratorType.Config = Symbol("config");
ClassDecoratorType.Component = Symbol("component");
ClassDecoratorType.Singleton = Symbol("singleton");
var MethodDecoratorType;
(function (MethodDecoratorType) {
    MethodDecoratorType["Http"] = "Http";
})(MethodDecoratorType = exports.MethodDecoratorType || (exports.MethodDecoratorType = {}));
class ControllerType {
}
exports.ControllerType = ControllerType;
ControllerType.PREFIX = Symbol("prefix");
ControllerType.PATH = Symbol("path");
ControllerType.METHOD = Symbol("method");
ControllerType.VALUE = Symbol("value");
class ScheduleType {
}
exports.ScheduleType = ScheduleType;
ScheduleType.SCHEDULE = Symbol("schedule");
class ConfigType {
}
exports.ConfigType = ConfigType;
ConfigType.ENV = Symbol("env");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
//# sourceMappingURL=enum.js.map