"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../core/type/enum");
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
exports.Schedule = (rule) => {
    return target => {
        Reflect.defineMetadata(enum_1.ScheduleType.SCHEDULE, rule, target);
        Reflect.defineMetadata(enum_1.Type.ClassType, enum_1.ClassDecoratorType.Schedule, target);
    };
};
//# sourceMappingURL=Schedule.js.map