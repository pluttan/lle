import * as d3 from 'd3';
import * as Types from '../types';

/**
 * Класс реализующий отображение графа элементов
 */
class graphView {
    private treeData: Types.dataElementGraph;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private g: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    private width: number;
    private height: number;

    /**
     * Создает основу для графа
     * @param treeData
     * @param width
     * @param height
     */
    constructor(treeData: Types.dataElementGraph, width: number = 800, height: number = 600) {
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
}

export {graphView};
