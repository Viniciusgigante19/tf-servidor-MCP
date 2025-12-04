"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.default = (function (error) {
    var _a, _b;
    if (axios_1.default.isAxiosError(error)) {
        if (error.status === 401) {
            return { error: "UNAUTHORIZED" };
        }
        var msg = (typeof ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === 'string' && error.response.data) ||
            error.message;
        return { error: msg };
    }
    return { error: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Unknown error' };
});
