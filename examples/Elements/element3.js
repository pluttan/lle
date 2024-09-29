'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const lle = require('../../dist/lle');
const element1_1 = require('./element1');
const element2_1 = require('./element2');
const element3 = (new lle.Element()).concat(element1_1.default, element2_1.default);
console.log(element3.in_connections);
console.log(element3.out_connections);
