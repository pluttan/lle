"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lle = require("../../dist/lle");
var element1_1 = require("./element1");
var element2_1 = require("./element2");
var element3 = (new lle.Element()).concat(element1_1.default, element2_1.default);
console.log(element3.in_connections);
console.log(element3.out_connections);
