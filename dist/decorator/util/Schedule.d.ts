import { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
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
export declare const Schedule: (rule: string | Date | RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit) => ClassDecorator;
