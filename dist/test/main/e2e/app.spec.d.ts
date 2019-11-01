import { Misc } from "../../../lib/core/app";
import request from "supertest";
export declare class ExampleTestFixture {
    instance: request.SuperTest<request.Test>;
    app: Misc;
    setup(): void;
    test2(): Promise<void>;
    test3(): Promise<void>;
    test4(): Promise<void>;
    test5(): Promise<void>;
    test7(): Promise<void>;
}
