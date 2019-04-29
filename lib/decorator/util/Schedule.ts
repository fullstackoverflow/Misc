import { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import { Type, ClassDecoratorType, ScheduleType } from "../../core/type/enum";

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

export const Schedule = (rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string): ClassDecorator => {
	return target => {
		Reflect.defineMetadata(ScheduleType.SCHEDULE, rule, target);
		Reflect.defineMetadata(Type.ClassType, ClassDecoratorType.Schedule, target);
	};
};
