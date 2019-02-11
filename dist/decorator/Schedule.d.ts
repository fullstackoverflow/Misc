import { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
export declare const Schedule: (rule: string | Date | RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit) => MethodDecorator;
