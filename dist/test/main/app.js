"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const path_1 = require("path");
const app = new lib_1.Misc({
    protocol: "http",
    routerpath: path_1.resolve(__dirname, "../router"),
    body: {
        multipart: true
    },
    port: 7890
});
//# sourceMappingURL=app.js.map