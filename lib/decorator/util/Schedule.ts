import { scheduleJob, RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import { Container } from "./Autowired";

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
export function Schedule(rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string): MethodDecorator {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		console.log(this);
	};
}
