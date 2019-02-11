import { scheduleJob, RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";

export const Schedule = (rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string): MethodDecorator => {
	return function(target: any, key: string, descriptor: PropertyDescriptor) {
		scheduleJob(rule, descriptor.value);
	};
};
