"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Res {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
exports.Res = Res;
class ResSuccess {
    constructor(message, data) {
        this.code = Status.SUCCESS;
        this.message = message;
        this.data = data;
    }
}
exports.ResSuccess = ResSuccess;
class ResWarn extends Error {
    constructor(message, data) {
        super();
        this.code = Status.WARN;
        this.message = message;
        this.data = data;
    }
}
exports.ResWarn = ResWarn;
class ResError extends Error {
    constructor(message, data) {
        super();
        this.code = Status.ERROR;
        this.message = message;
        this.data = data;
    }
}
exports.ResError = ResError;
var Status;
(function (Status) {
    Status[Status["ERROR"] = 0] = "ERROR";
    Status[Status["WARN"] = 1] = "WARN";
    Status[Status["SUCCESS"] = 2] = "SUCCESS";
    Status[Status["MIX"] = 3] = "MIX";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=response.js.map