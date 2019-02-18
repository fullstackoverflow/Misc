"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var HttpMap;
(function (HttpMap) {
    HttpMap["post"] = "body";
    HttpMap["get"] = "query";
})(HttpMap || (HttpMap = {}));
function Validate(ValidateOptions, ValidateObject = { params: false }) {
    const { schema, options, error } = ValidateOptions;
    const { params } = ValidateObject;
    return function (target, key, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = async function (ctx) {
            const config = Reflect.getOwnMetadata(key, target);
            if (HttpMap[config.method] == undefined) {
                throw new Error("Unsupported HTTP methods");
            }
            else {
                const prop = params === true ? ctx.params : ctx.request[HttpMap[config.method]];
                const obj = class_transformer_1.plainToClass(schema, prop);
                const errors = await class_validator_1.validate(obj, options);
                if (errors && errors.length > 0) {
                    if (error) {
                        error(errors);
                    }
                    else {
                        throw new Error(`${[...errors.map(error => Object.values(error.constraints))]}`);
                    }
                }
            }
            await originFunction.apply(this, arguments);
        };
    };
}
exports.Validate = Validate;
//# sourceMappingURL=Validate.js.map