"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("./controller/connection"));
// ==================================== ConnectionFactory =====================================//
var ConnectionFactory = /** @class */ (function () {
    function ConnectionFactory(connectionClass) {
        this.connectionClass = connectionClass;
    }
    ConnectionFactory.prototype.create = function (outSource, arg2) {
        if (arg2) {
            return new this.connectionClass(outSource, arg2);
        }
        return new this.connectionClass(outSource);
    };
    return ConnectionFactory;
}());
// ==================================== ConnectionFactory =====================================//
var Factories = {
    Connection: new ConnectionFactory(connection_1.default)
};
exports.default = Factories;
//# sourceMappingURL=factories.js.map