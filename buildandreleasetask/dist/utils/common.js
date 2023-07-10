"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedAuthParams = exports.validatedEnvVar = void 0;
const tl = require("azure-pipelines-task-lib/task");
const constants_1 = require("./constants");
const validatedEnvVar = (inputName) => {
    const value = tl.getInput(inputName, true);
    console.log('getting ', inputName, ', value = ', value);
    if (!value) {
        throw new Error(`Varialbe ${inputName} not found!`);
    }
    return value;
};
exports.validatedEnvVar = validatedEnvVar;
const validatedAuthParams = (inputName) => {
    const serviceConnectionName = (0, exports.validatedEnvVar)(constants_1.INPUT.connection);
    const value = tl.getEndpointAuthorizationParameter(serviceConnectionName, inputName, false);
    console.log('getting ', inputName, ', value = ', value);
    if (!value) {
        throw new Error(`Input varialbe ${inputName} not found!`);
    }
    return value;
};
exports.validatedAuthParams = validatedAuthParams;
