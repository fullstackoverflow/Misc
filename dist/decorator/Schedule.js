"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
function Schedule(rule) {
    return function (constructor) {
        const originalConstructor = constructor;
        function instanciate(constructor, ...args) {
            const instance = new constructor(...args);
            if (!instance.exec) {
                throw new Error("exec method must be implemented in schedule class");
            }
            node_schedule_1.scheduleJob(rule, instance.exec);
        }
        const newConstructor = function (...args) {
            return instanciate(originalConstructor, args);
        };
        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    };
}
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map