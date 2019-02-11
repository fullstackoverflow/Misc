"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
exports.Schedule = (rule) => {
    return function (target, key, descriptor) {
        node_schedule_1.scheduleJob(rule, descriptor.value);
    };
};
//# sourceMappingURL=Schedule.js.map