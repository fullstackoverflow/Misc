import { Middleware } from "koa";

export const FunctionCache = new Map<Function, { priority: number, func: Middleware }[]>();