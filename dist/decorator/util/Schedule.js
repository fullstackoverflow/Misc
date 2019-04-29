"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function Schedule(rule, obj) {
    console.log(11111, obj);
    return function (target, key, descriptor) {
        console.log(this);
    };
}
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map