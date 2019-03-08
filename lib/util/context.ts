import asyncHooks from "async_hooks";

export class Namespace {
	ContextManager: Map<number, Map<string, any>>;

	constructor() {
		this.ContextManager = new Map();
	}

	run(fn: Function) {
		const eid = asyncHooks.executionAsyncId();
		this.ContextManager.set(eid, new Map());
		fn();
	}

	get context() {
		const eid = asyncHooks.executionAsyncId();
		return this.ContextManager.get(eid);
	}
}

const namespaces = {};

function createHooks(namespace: Namespace) {
	function init(asyncId: number, type: string, triggerId: number, resource: Object) {
		if (namespace.ContextManager.has(triggerId)) {
			namespace.ContextManager.set(asyncId, namespace.ContextManager.get(triggerId));
		}
	}

	function destroy(asyncId: number) {
		namespace.ContextManager.delete(asyncId);
	}

	const asyncHook = asyncHooks.createHook({ init, destroy });

	asyncHook.enable();
}

export function createNamespace(name: string): Namespace {
	if (namespaces[name]) {
		throw new Error(`A namespace for ${name} is already exists`);
	}

	const namespace = new Namespace();
	namespaces[name] = namespace;

	createHooks(namespace);

	return namespace;
}

export function getNamespace(name: string): Namespace {
	return namespaces[name];
}
