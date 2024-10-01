'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const lle = require('../../dist/lle');
const element1_1 = require('./element1');
const element2 = new lle.Element(['A_7', 'A_6', 'A_5', 'A_4', 'A_3', 'A_2', 'A_1', 'A_0', 'E_n'], ['F_2', 'F_1', 'F_0'], [
    { name: 'E_n', state: 0, out: '00000000' },
    { in: '000000011', out: '000' },
    { in: '000000101', out: '001' },
    { in: '000001001', out: '010' },
    { in: '000010001', out: '011' },
    { in: '000100001', out: '100' },
    { in: '001000001', out: '101' },
    { in: '010000001', out: '110' },
    { in: '100000001', out: '111' },
    { name: 'else', state: 'x', out: '' },
]);
element1_1.default.add(element2);
// console.log(element1.in_connections)
// console.log(element1.out_connections)
// console.log(element2.in_connections)
// console.log(element2.out_connections)
exports.default = element2;
