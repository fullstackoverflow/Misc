export declare class Res {
    code: any;
    message: any;
    data: any;
    constructor(code: any, message: any, data: any);
}
export declare class ResSuccess {
    code: any;
    message: any;
    data: any;
    constructor(message: any, data: any);
}
export declare class ResWarn extends Error {
    code: any;
    message: any;
    data: any;
    constructor(message: any, data: any);
}
export declare class ResError extends Error {
    code: any;
    message: any;
    data: any;
    constructor(message: any, data: any);
}
export declare enum Status {
    ERROR = 0,
    WARN = 1,
    SUCCESS = 2,
    MIX = 3
}
