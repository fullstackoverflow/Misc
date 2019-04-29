"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type["ClassType"] = "ClassType";
    Type["MethodType"] = "MethodType";
})(Type = exports.Type || (exports.Type = {}));
var ClassDecoratorType;
(function (ClassDecoratorType) {
    ClassDecoratorType["Controller"] = "controller";
    ClassDecoratorType["Schedule"] = "schedule";
    ClassDecoratorType["Config"] = "config";
    ClassDecoratorType["Component"] = "component";
})(ClassDecoratorType = exports.ClassDecoratorType || (exports.ClassDecoratorType = {}));
var MethodDecoratorType;
(function (MethodDecoratorType) {
    MethodDecoratorType["Http"] = "Http";
})(MethodDecoratorType = exports.MethodDecoratorType || (exports.MethodDecoratorType = {}));
var ControllerType;
(function (ControllerType) {
    ControllerType["PREFIX"] = "prefix";
    ControllerType["PATH"] = "path";
    ControllerType["METHOD"] = "method";
})(ControllerType = exports.ControllerType || (exports.ControllerType = {}));
var ScheduleType;
(function (ScheduleType) {
    ScheduleType["SCHEDULE"] = "schedule";
})(ScheduleType = exports.ScheduleType || (exports.ScheduleType = {}));
var ConfigType;
(function (ConfigType) {
    ConfigType["ENV"] = "env";
})(ConfigType = exports.ConfigType || (exports.ConfigType = {}));
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
//# sourceMappingURL=enum.js.map