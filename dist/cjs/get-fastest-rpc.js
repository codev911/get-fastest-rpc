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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.testRpc = exports.testAllRpc = void 0;
var axios = require('axios');
var testAllRpc = function (listrpc, rto) { return __awaiter(void 0, void 0, void 0, function () {
    var run, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                run = [];
                listrpc.forEach(function (rpc) {
                    run.push((0, exports.testRpc)(rpc, rto));
                });
                return [4, Promise.all(run)];
            case 1:
                value = _a.sent();
                return [2, value];
        }
    });
}); };
exports.testAllRpc = testAllRpc;
var testRpc = function (rpc, rto) { return __awaiter(void 0, void 0, void 0, function () {
    var ms, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4, getRpcSpeed(rpc, rto)];
            case 1:
                ms = _b.sent();
                return [2, returnSuccess(rpc, ms)];
            case 2:
                _a = _b.sent();
                return [2, returnTimeout(rpc)];
            case 3: return [2];
        }
    });
}); };
exports.testRpc = testRpc;
var getRpcSpeed = function (rpc, rto) { return __awaiter(void 0, void 0, void 0, function () {
    var dateStart, _a, status_1, data, dateEnd, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                dateStart = new Date().getTime();
                return [4, axios.post(rpc, {
                        "method": "eth_blockNumber",
                        "params": [],
                        "id": 1,
                        "jsonrpc": "2.0"
                    }, {
                        headers: {
                            Accept: 'application/json'
                        },
                        timeout: rto
                    })["catch"](function () {
                        return "timeout";
                    })];
            case 1:
                _a = _c.sent(), status_1 = _a.status, data = _a.data;
                dateEnd = new Date().getTime();
                return [4, status_1];
            case 2:
                if ((_c.sent()) !== 200) {
                    return [2, "timeout"];
                }
                return [4, (data === null || data === void 0 ? void 0 : data.result)];
            case 3:
                if ((_c.sent()) === undefined) {
                    return [2, "timeout"];
                }
                return [2, dateEnd - dateStart];
            case 4:
                _b = _c.sent();
                throw "timeout";
            case 5: return [2];
        }
    });
}); };
var returnTimeout = function (rpc) {
    return { rpc: rpc, ms: "timeout" };
};
var returnSuccess = function (rpc, ms) {
    return { rpc: rpc, ms: ms };
};
//# sourceMappingURL=get-fastest-rpc.js.map