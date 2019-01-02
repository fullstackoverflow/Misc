import { ValidatorOptions } from "class-validator";
export declare function Validate(ValidateOptions: {
    schema: any;
    options?: ValidatorOptions;
}, ValidateObject?: {
    params?: Boolean;
}): MethodDecorator;
