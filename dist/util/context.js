"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_hooks_1 = __importDefault(require("async_hooks"));
class Namespace {
    constructor() {
        this.ContextManager = new Map();
    }
    run(fn) {
        const eid = async_hooks_1.default.executionAsyncId();
        this.ContextManager.set(eid, new Map());
        fn();
    }
    get context() {
        const eid = async_hooks_1.default.executionAsyncId();
        return this.ContextManager.get(eid);
    }
}
exports.Namespace = Namespace;
const namespaces = {};
function createHooks(namespace) {
    function init(asyncId, type, triggerId, resource) {
        if (namespace.ContextManager.has(triggerId)) {
            namespace.ContextManager.set(asyncId, namespace.ContextManager.get(triggerId));
        }
    }
    function destroy(asyncId) {
        namespace.ContextManager.delete(asyncId);
    }
    const asyncHook = async_hooks_1.default.createHook({ init, destroy });
    asyncHook.enable();
}
function createNamespace(name) {
    if (namespaces[name]) {
        throw new Error(`A namespace for ${name} is already exists`);
    }
    const namespace = new Namespace();
    namespaces[name] = namespace;
    createHooks(namespace);
    return namespace;
}
exports.createNamespace = createNamespace;
function getNamespace(name) {
    return namespaces[name];
}
exports.getNamespace = getNamespace;
//# sourceMappingURL=context.js.map