"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const api_1 = require("./utils/api");
const constants_1 = require("./utils/constants");
const fileHandler_1 = require("./utils/fileHandler");
const common_1 = require("./utils/common");
const identity_1 = require("@azure/identity");
class ConfigUpdater {
    constructor() {
        this.f = new fileHandler_1.FileHandler;
        this.getAuthorizationTokenFromKey = () => __awaiter(this, void 0, void 0, function* () {
            let params = {
                tenantID: (0, common_1.validatedAuthParams)('tenantid'),
                clientID: (0, common_1.validatedAuthParams)('servicePrincipalId'),
                servicePrincipalKey: (0, common_1.validatedAuthParams)('servicePrincipalKey'),
            };
            console.log('== got params', params);
            let clientSecretCredential = new identity_1.ClientSecretCredential(params.tenantID, params.clientID, params.servicePrincipalKey);
            let accessToken = yield clientSecretCredential.getToken(constants_1.SCOPE);
            if (!accessToken) {
                throw new identity_1.AuthenticationError(0, {
                    error: 'Access token fetch failed'
                });
            }
            return accessToken;
        });
        this.getConvertedFileObject = () => __awaiter(this, void 0, void 0, function* () {
            const file = yield this.f.compressFile((0, common_1.validatedEnvVar)(constants_1.INPUT.source), (0, common_1.validatedEnvVar)(constants_1.INPUT.target), constants_1.OUTPUT_PATH);
            return {
                properties: {
                    rootFile: `${(0, common_1.validatedEnvVar)(constants_1.INPUT.target)}nginx.conf`,
                    package: {
                        data: this.f.convertFileToBase64String(file),
                    }
                }
            };
        });
        this.getRequestConfig = () => __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getAuthorizationTokenFromKey();
            const config = { headers: {
                    Authorization: `Bearer ${token.token}`,
                } };
            return config;
        });
        this.getRequestResource = () => {
            return {
                subscriptionId: (0, common_1.validatedEnvVar)(constants_1.INPUT.subscription),
                resourceGroupName: (0, common_1.validatedEnvVar)(constants_1.INPUT.resource),
                deploymentName: (0, common_1.validatedEnvVar)(constants_1.INPUT.deployment),
                apiVersion: constants_1.API_VERSION,
            };
        };
        this.updateNginxConfig = () => __awaiter(this, void 0, void 0, function* () {
            console.log('updateNginxConfig...');
            try {
                const res = yield (0, api_1.updateUserConfig)(this.getRequestResource(), yield this.getConvertedFileObject(), yield this.getRequestConfig());
                console.log('Nginx config successfully uploaded!\n', res);
            }
            catch (error) {
                tl.setResult(tl.TaskResult.Failed, error);
                throw new Error("Nginx config uploading failed!");
            }
        });
    }
}
const updater = new ConfigUpdater();
updater.updateNginxConfig();
