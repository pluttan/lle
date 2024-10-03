"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const d3 = __importStar(require("d3"));
const app = (0, express_1.default)();
const port = 3000;
const data = {
    title: 'Array Data',
    array1: [10, 20, 30, 40],
    array2: [5, 15, 25]
};
const widthColumn = 50; // Ширина столбцов
const heightRect = 200; // Высота прямоугольников
const padding = 10; // Отступы между элементами
const outerRectWidth = widthColumn;
const middleRectWidth = data.title.length * 10 + data.array1.length * 10;
// Функция создания SVG с прямоугольниками
const createSvg = () => {
    var _a;
    const svg = d3
        .create('svg')
        .attr('width', outerRectWidth * 2 + middleRectWidth + padding * 4)
        .attr('height', heightRect + padding * 2);
    // Первый прямоугольник
    svg.append('rect')
        .attr('x', padding)
        .attr('y', padding)
        .attr('width', outerRectWidth)
        .attr('height', heightRect)
        .attr('fill', 'lightblue');
    svg.selectAll('.array1')
        .data(data.array1)
        .enter()
        .append('text')
        .attr('x', padding + outerRectWidth / 2)
        .attr('y', (d, i) => padding + (i + 1) * 20)
        .attr('text-anchor', 'middle')
        .text((d) => d);
    // Средний прямоугольник
    svg.append('rect')
        .attr('x', outerRectWidth + padding * 2)
        .attr('y', padding)
        .attr('width', middleRectWidth)
        .attr('height', heightRect)
        .attr('fill', 'lightgreen');
    svg.append('text')
        .attr('x', outerRectWidth + padding * 2 + middleRectWidth / 2)
        .attr('y', padding + 20)
        .attr('text-anchor', 'middle')
        .text(data.title);
    svg.append('text')
        .attr('x', outerRectWidth + padding * 2 + middleRectWidth / 2)
        .attr('y', padding + 40)
        .attr('text-anchor', 'middle')
        .text(`Length: ${data.array2.length}`);
    // Третий прямоугольник
    svg.append('rect')
        .attr('x', outerRectWidth + middleRectWidth + padding * 3)
        .attr('y', padding)
        .attr('width', outerRectWidth)
        .attr('height', heightRect)
        .attr('fill', 'lightcoral');
    svg.selectAll('.array2')
        .data(data.array2)
        .enter()
        .append('text')
        .attr('x', outerRectWidth + middleRectWidth + padding * 3 + outerRectWidth / 2)
        .attr('y', (d, i) => padding + (i + 1) * 20)
        .attr('text-anchor', 'middle')
        .text((d) => d);
    return (_a = svg.node()) === null || _a === void 0 ? void 0 : _a.outerHTML;
};
// Маршрут для отображения SVG
app.get('/', (req, res) => {
    const svg = createSvg();
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>D3.js Visualization</title>
    </head>
    <body>
      ${svg}
    </body>
    </html>
  `);
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=model.js.map