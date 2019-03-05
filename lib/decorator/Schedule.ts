import { scheduleJob, RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";

export interface ISchedule {
	exec: Function;
}

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
export function Schedule(rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string): ClassDecorator {
	return function(constructor: Function) {
		const originalConstructor = constructor;
		function instanciate(constructor: any, ...args) {
			const instance = new constructor(...args);
			if (!instance.exec) {
				throw new Error("exec method must be implemented in schedule class");
			}
			scheduleJob(rule, instance.exec);
		}

		// the new constructor behaviour
		const newConstructor = function(...args: any[]) {
			return instanciate(originalConstructor, args);
		};

		// copy prototype so instanceof operator still works
		newConstructor.prototype = originalConstructor.prototype;

		// return new constructor (will override original)
		return newConstructor as any;
	};
}
