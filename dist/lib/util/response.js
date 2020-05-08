"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(code, data, message = '') {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map