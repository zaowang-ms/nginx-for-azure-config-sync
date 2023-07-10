"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const axios_1 = __importDefault(require("axios"));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["TooManyRequests"] = 429] = "TooManyRequests";
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
})(StatusCode || (StatusCode = {}));
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};
class Http {
    constructor() {
        this.instance = null;
    }
    get http() {
        return this.instance != null ? this.instance : this.initHttp();
    }
    initHttp() {
        const http = axios_1.default.create({
            baseURL: "https://management.azure.com",
            headers,
            withCredentials: true,
        });
        http.interceptors.response.use((response) => response, (error) => {
            return this.handleError(error);
        });
        this.instance = http;
        return http;
    }
    request(config) {
        return this.http.request(config);
    }
    get(url, config) {
        return this.http.get(url, config);
    }
    post(url, data, config) {
        return this.http.post(url, data, config);
    }
    put(url, data, config) {
        return this.http.put(url, data, config);
    }
    delete(url, config) {
        return this.http.delete(url, config);
    }
    // Handle global app errors
    // We can handle generic app errors depending on the status code
    handleError(error) {
        const { response, code } = error;
        console.log('=====HTTP Request Error=====', '\ncode:', code, '\nresponse:', response);
        return Promise.reject(error);
    }
}
exports.http = new Http();
