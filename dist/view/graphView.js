"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphView = void 0;
var d3 = require("d3");
/**
 * Класс реализующий отображение графа элементов
 */
var graphView = /** @class */ (function () {
    /**
     * Создает основу для графа
     * @param treeData
     * @param width
     * @param height
     */
    function graphView(treeData, width, height) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        this.treeData = treeData;
        this.width = width;
        this.height = height;
        this.svg = d3
            .select('body')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        this.g = this.svg.append('g').attr('transform', 'translate(50, 50)');
        console.log(treeData);
    }
    return graphView;
}());
exports.graphView = graphView;
