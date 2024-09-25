"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connection = /** @class */ (function () {
    function Connection(outSource, arg2) {
        this.in = false;
        this.out = outSource;
        if (arg2) {
            if (Array.isArray(arg2)) {
                this.out = outSource;
                this.in = arg2;
            }
            else {
                this.out = outSource;
                this.in = [arg2];
            }
        }
    }
    Connection.prototype.inConnect = function (inSource) {
        if (Array.isArray(this.in)) {
            this.in.push(inSource);
        }
        else {
            this.in = [inSource];
        }
        return this;
    };
    Connection.prototype.disConnect = function (inSource) {
        if (Array.isArray(this.in)) {
            this.in = this.in.filter(function (source) { return source !== inSource; });
        }
        return this;
    };
    Connection.prototype.inConnects = function (inSourceArray) {
        var _a;
        if (Array.isArray(this.in)) {
            (_a = this.in).push.apply(_a, inSourceArray);
        }
        else {
            this.in = inSourceArray;
        }
        return this;
    };
    Connection.prototype.disConnects = function (inSourceArray) {
        if (Array.isArray(this.in)) {
            for (var i = 0; i < inSourceArray.length; i++) {
                this.disConnect(inSourceArray[i]);
            }
        }
        return this;
    };
    Connection.prototype.isConnected = function () {
        return Array.isArray(this.in) && this.in.length > 0;
    };
    Connection.prototype.lenInConnected = function () {
        return Array.isArray(this.in) ? this.in.length : 0;
    };
    return Connection;
}());
exports.default = Connection;
//# sourceMappingURL=connection.js.map