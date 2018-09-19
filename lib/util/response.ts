export class Res {
    public code;
    public message;
    public data;

    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}



export class ResSuccess {
    public code;
    public message;
    public data;

    constructor(message, data) {
        this.code = Status.SUCCESS;
        this.message = message;
        this.data = data;
    }
}

export class ResWarn extends Error {
    public code;
    public message;
    public data;
    constructor(message, data) {
        super();
        this.code = Status.WARN;
        this.message = message;
        this.data = data;
    }
}

export class ResError extends Error {
    public code;
    public message;
    public data;
    constructor(message, data) {
        super();
        this.code = Status.ERROR;
        this.message = message;
        this.data = data;
    }
}

export enum Status {
    ERROR = 0,
    WARN,
    SUCCESS,
    MIX
}