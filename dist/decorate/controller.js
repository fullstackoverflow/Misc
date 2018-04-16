"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core/core");
function Controller(path) {
    return function (target) {
        target.prototype[core_1.symbolRoutePrefix] = path;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map