"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./../core/core");
function MethodFactory(method, path) {
    return function (target, propertyKey, descriptor) {
        core_1.Core.__DecoratedRouters.set(target[propertyKey], {
            target: target,
            path: path,
            method: method
        });
    };
}
function Get(path) {
    return MethodFactory('get', path);
}
exports.Get = Get;
function Post(path) {
    return MethodFactory('post', path);
}
exports.Post = Post;
function Put(path) {
    return MethodFactory('put', path);
}
exports.Put = Put;
function Delete(path) {
    return MethodFactory('delete', path);
}
exports.Delete = Delete;
//# sourceMappingURL=http-methods.js.map