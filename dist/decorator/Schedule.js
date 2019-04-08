"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
/**
 *
 * @param rule
 * @example
 * ```
 *
 * 	@Schedule('* * * * *') //Execute task every minute
 * 	async test(){
 * 		console.log('trigger');
 * 	}
 *
 * ```
 */
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
        // the new constructor behaviour
        const newConstructor = function (...args) {
            return instanciate(originalConstructor, args);
        };
        // copy prototype so instanceof operator still works
        newConstructor.prototype = originalConstructor.prototype;
        // return new constructor (will override original)
        return newConstructor;
    };
}
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map