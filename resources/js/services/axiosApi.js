"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseAxios = void 0;
var axios_1 = require("axios");
var envBase = (_b = (_a = import.meta) === null || _a === void 0 ? void 0 : _a.env) === null || _b === void 0 ? void 0 : _b.API_DOMAIN;
exports.baseAxios = axios_1.default.create({
    baseURL: envBase || "http://localhost:8080",
    withCredentials: true,
});
