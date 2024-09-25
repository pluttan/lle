"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factories_1 = __importDefault(require("../factories"));
var Element = /** @class */ (function () {
    function Element(arg1, arg2, signals) {
        this.in_connections = [];
        this.out_connections = [];
        this.state = [];
        if (arg1 instanceof Element && arg2 instanceof Element) {
            this.concat(arg1, arg2);
        }
        if (arg1 instanceof Array && arg2 instanceof Array && signals instanceof Array) {
            this.setParams(arg1, arg2, signals);
        }
    }
    Element.prototype.setParams = function (inName, outName, signals) {
        for (var i = 0; i < outName.length; i++) {
            this.out_connections.push(factories_1.default.Connection.create([outName[i], this]));
        }
        this.in_connections = inName;
        this.state = this.genState(signals);
        return this;
    };
    Element.prototype.concat = function (elementOut, elementIn) {
        if (elementOut.out_connections.length < elementIn.in_connections.length) {
            for (var i = 0; i < elementOut.out_connections.length; i++) {
                elementOut.in(elementIn.in_connections[i], elementOut.out_connections[i]);
                this.in_connections.push(elementOut.in_connections[i]);
            }
            for (var i = elementOut.out_connections.length; i < elementIn.in_connections.length; i++) {
                this.in_connections.push(elementIn.in_connections[i]);
            }
            for (var i = 0; i < elementIn.out_connections.length; i++) {
                this.out_connections.push(elementIn.out_connections[i]);
            }
        }
        else {
            for (var i = 0; i < elementIn.in_connections.length; i++) {
                elementOut.in(elementIn.in_connections[i], elementOut.out_connections[i]);
                this.out_connections.push(elementIn.out_connections[i]);
            }
            for (var i = elementIn.in_connections.length; i < elementOut.out_connections.length; i++) {
                this.out_connections.push(elementOut.out_connections[i]);
            }
            for (var i = 0; i < elementIn.out_connections.length; i++) {
                this.in_connections.push(elementOut.in_connections[i]);
            }
        }
        // далее для state тут надо просимулировать
        return this;
    };
    Element.prototype.add = function (elementOut) {
        if (this.in_connections.length < elementOut.out_connections.length) {
            for (var i = 0; i < this.in_connections.length; i++) {
                this.in(this.in_connections[i], elementOut.out_connections[i]);
            }
        }
        else {
            for (var i = 0; i < elementOut.out_connections.length; i++) {
                this.in(this.in_connections[i], elementOut.out_connections[i]);
            }
        }
        return this;
    };
    Element.prototype.in = function (name, connection) {
        if (connection) {
            connection.inConnect([name, this]);
            this.in_connections[this.in_connections.indexOf(name)] = connection;
            return connection;
        }
        return this.in_connections[this.in_connections.indexOf(name)];
    };
    Element.prototype.out = function (name) {
        for (var i = 0; i < this.out_connections.length; i++) {
            if (this.out_connections[i].out[0] === name) {
                return this.out_connections[i];
            }
        }
        return {};
    };
    Element.prototype.genState = function (array) {
        for (var i = 0; i < array.length; i++) {
            console.log(typeof array[i]);
        }
        return [];
    };
    Element.prototype.isAllInConnected = function () {
        for (var i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                return false;
            }
        }
        return true;
    };
    Element.prototype.isAllSignalNotZ = function () {
        for (var i = 0; i < this.state.length; i++) {
            for (var j = 0; j < this.state[i].length; j++) {
                if (this.state[i][j] === 'z') {
                    return false;
                }
            }
        }
        return true;
    };
    Element.prototype.isReady = function () {
        return this.isAllInConnected() && this.isAllSignalNotZ();
    };
    return Element;
}());
exports.default = Element;
//# sourceMappingURL=element.js.map