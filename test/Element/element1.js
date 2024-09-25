"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lle = require("../../dist/lle");
var element1 = new lle.Element(["A_2", "A_1", "A_0", "E_n"], ["F_0", "F_1", "F_2", "F_3", "F_4", "F_5", "F_6", "F_7"], [
    { name: "E_n", state: 0, out: "00000000" },
    "10000000",
    "01000000",
    "00100000",
    "00010000",
    "00001000",
    "00000100",
    "00000010",
    "00000001",
]);
console.log(element1.in_connections);
console.log(element1.out_connections);
exports.default = element1;
