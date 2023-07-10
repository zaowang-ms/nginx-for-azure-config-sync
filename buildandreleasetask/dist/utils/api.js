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
exports.updateUserConfig = void 0;
const http_1 = require("./http");
const updateUserConfig = (resource, nginxConfig, config) => __awaiter(void 0, void 0, void 0, function* () {
    return yield http_1.http.put(`/subscriptions/${resource.subscriptionId}/resourceGroups/${resource.resourceGroupName}/providers/NGINX.NGINXPLUS/nginxDeployments/${resource.deploymentName}/configurations/default?api-version=${resource.apiVersion}`, nginxConfig, config);
});
exports.updateUserConfig = updateUserConfig;
