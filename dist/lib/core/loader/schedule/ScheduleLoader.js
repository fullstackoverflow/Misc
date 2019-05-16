"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../type/enum");
const node_schedule_1 = require("node-schedule");
const log_1 = require("../../../util/log");
class ScheduleLoader {
    Load(clazz, app) {
        const rule = Reflect.getMetadata(enum_1.ScheduleType.SCHEDULE, clazz);
        const instance = new clazz();
        if (!instance.exec) {
            throw new Error("Schedule class must implements exec() function");
        }
        log_1.logger.info(`Load schedule:${rule}`);
        node_schedule_1.scheduleJob(rule, instance.exec.bind(instance));
    }
}
exports.ScheduleLoader = ScheduleLoader;
//# sourceMappingURL=ScheduleLoader.js.map