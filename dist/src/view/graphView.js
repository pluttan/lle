import * as d3 from 'd3';
/**
 * Класс реализующий отображение графа элементов
 */
class graphView {
    /**
     * Создает основу для графа
     * @param treeData
     * @param width
     * @param height
     */
    constructor(treeData, width = 800, height = 600) {
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
export { graphView };
// const graph = new graphView({'elements':[{'id':0,'connections_in':[],'connections_out':[{'conn_name':'g1','id':[4]}]},{'id':1,'connections_in':[],'connections_out':[{'conn_name':'g2','id':[4]}]},{'id':2,'connections_in':[],'connections_out':[{'conn_name':'g4','id':[6]}]},{'id':3,'connections_in':[],'connections_out':[{'conn_name':'g3','id':[5]}]},{'name':'e1','id':4,'connections_in':[{'conn_name':'A','id':0},{'conn_name':'B','id':1}],'connections_out':[{'conn_name':'A','id':[7]},{'conn_name':'B','id':[5]},{'conn_name':'C','id':[5]}]},{'name':'e2','id':5,'connections_in':[{'conn_name':'A','id':4},{'conn_name':'B','id':4},{'conn_name':'C','id':3}],'connections_out':[{'conn_name':'A','id':[7]},{'conn_name':'B','id':[6]}]},{'name':'e3','id':6,'connections_in':[{'conn_name':'A','id':5},{'conn_name':'B','id':2}],'connections_out':[{'conn_name':'A','id':[7]},{'conn_name':'B','id':[7]}]},{'name':'e4','id':7,'connections_in':[{'conn_name':'A','id':4},{'conn_name':'B','id':5},{'conn_name':'C','id':6},{'conn_name':'D','id':6}],'connections_out':[{'conn_name':'A','id':[]},{'conn_name':'B','id':[]},{'conn_name':'C','id':[]}]}],'elementGraph':[{'id':0,'out':[{'id':4,'out':[{'id':7,'out':[]},{'id':5,'out':[{'id':7,'out':[]},{'id':6,'out':[{'id':7,'out':[]},{'id':7,'out':[]}]}]},{'id':5,'out':[{'id':7,'out':[]},{'id':6,'out':[{'id':7,'out':[]},{'id':7,'out':[]}]}]}]}]},{'id':1,'out':[{'id':4,'out':[{'id':7,'out':[]},{'id':5,'out':[{'id':7,'out':[]},{'id':6,'out':[{'id':7,'out':[]},{'id':7,'out':[]}]}]},{'id':5,'out':[{'id':7,'out':[]},{'id':6,'out':[{'id':7,'out':[]},{'id':7,'out':[]}]}]}]}]},{'id':2,'out':[{'id':6,'out':[{'id':7,'out':[]},{'id':7,'out':[]}]}]},{'id':3,'out':[{'id':5,'out':[{'id':7,'out':[]},{'id':6,'out':[{'id':7,'out':[]},{'id':7,'out':[]}]}]}]}]});
const graph = new graphView({ 'elements': [{ 'name': '', 'id': 0, 'connections_in': [], 'connections_out': [{ 'conn_name': 'g1', 'id': [4] }] }, { 'name': '', 'id': 1, 'connections_in': [], 'connections_out': [{ 'conn_name': 'g2', 'id': [4] }] }, { 'name': '', 'id': 2, 'connections_in': [], 'connections_out': [{ 'conn_name': 'g4', 'id': [6] }] }, { 'name': '', 'id': 3, 'connections_in': [], 'connections_out': [{ 'conn_name': 'g3', 'id': [5] }] }, { 'name': 'e1', 'id': 4, 'connections_in': [{ 'conn_name': 'A', 'id': 0 }, { 'conn_name': 'B', 'id': 1 }], 'connections_out': [{ 'conn_name': 'A', 'id': [7] }, { 'conn_name': 'B', 'id': [5] }, { 'conn_name': 'C', 'id': [5] }] }, { 'name': 'e2', 'id': 5, 'connections_in': [{ 'conn_name': 'A', 'id': 4 }, { 'conn_name': 'B', 'id': 4 }, { 'conn_name': 'C', 'id': 3 }], 'connections_out': [{ 'conn_name': 'A', 'id': [7] }, { 'conn_name': 'B', 'id': [6] }] }, { 'name': 'e3', 'id': 6, 'connections_in': [{ 'conn_name': 'A', 'id': 5 }, { 'conn_name': 'B', 'id': 2 }], 'connections_out': [{ 'conn_name': 'A', 'id': [7] }, { 'conn_name': 'B', 'id': [7] }] }, { 'name': 'e4', 'id': 7, 'connections_in': [{ 'conn_name': 'A', 'id': 4 }, { 'conn_name': 'B', 'id': 5 }, { 'conn_name': 'C', 'id': 6 }, { 'conn_name': 'D', 'id': 6 }], 'connections_out': [{ 'conn_name': 'A', 'id': [] }, { 'conn_name': 'B', 'id': [] }, { 'conn_name': 'C', 'id': [] }] }], 'elementGraph': [{ 'id': 0, 'out': [{ 'id': 4, 'out': [{ 'id': 7, 'out': [] }, { 'id': 5, 'out': [{ 'id': 7, 'out': [] }, { 'id': 6, 'out': [{ 'id': 7, 'out': [] }, { 'id': 7, 'out': [] }] }] }, { 'id': 5, 'out': [{ 'id': 7, 'out': [] }, { 'id': 6, 'out': [{ 'id': 7, 'out': [] }, { 'id': 7, 'out': [] }] }] }] }] }, { 'id': 1, 'out': [{ 'id': 4, 'out': [{ 'id': 7, 'out': [] }, { 'id': 5, 'out': [{ 'id': 7, 'out': [] }, { 'id': 6, 'out': [{ 'id': 7, 'out': [] }, { 'id': 7, 'out': [] }] }] }, { 'id': 5, 'out': [{ 'id': 7, 'out': [] }, { 'id': 6, 'out': [{ 'id': 7, 'out': [] }, { 'id': 7, 'out': [] }] }] }] }] }, { 'id': 2, 'out': [{ 'id': 6, 'out': [{ 'id': 7, 'out': [] }, { 'id': 7, 'out': [] }] }] }, { 'id': 3, 'out': [{ 'id': 5, 'out': [{ 'id': 7, 'out': [] }, { 'id': 6, 'out': [{ 'id': 7, 'out': [] }, { 'id': 7, 'out': [] }] }] }] }] });
console.log(graph);
