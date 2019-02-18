import { ValidatorOptions, ValidationError } from "class-validator";
export declare function Validate(ValidateOptions: {
    schema: any;
    options?: ValidatorOptions;
    error?: (errors: ValidationError[]) => any;
}, ValidateObject?: {
    params?: Boolean;
}): MethodDecorator;
