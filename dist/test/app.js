"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../lib/core/app");
const path_1 = require("path");
const lib_1 = require("../lib");
lib_1.Config.path = path_1.resolve(__dirname, "./config");
const middleware = async (ctx, next) => {
    ctx.body = "test";
    await next();
};
const errorHandler = async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        if (err.code != undefined) {
            ctx.body = new lib_1.Res(err.code, err.message, err.data);
        }
    }
};
const app = new app_1.Misc({
    protocol: "http",
    body: {
        multipart: true
    },
    beforeall: [errorHandler, middleware],
    scan: path_1.resolve(__dirname, "../router/**/*.ts"),
    keys: ["test"],
    session: {
        maxAge: 30 * 60 * 1000,
        overwrite: true,
        httpOnly: true,
        signed: true
    },
    port: 7891
});
//# sourceMappingURL=app.js.map