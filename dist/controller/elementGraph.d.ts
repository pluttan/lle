import * as Interface from '../interface';
import * as Types from '../types';
declare class ElementGraph implements Interface.ElementGraph {
    tree: Types.ElementGraphNode[];
    constructor(pointElement: Interface.Element);
    genGraph(pointElement: Interface.Element): void;
    private findGenerators;
    private genGraphNode;
    findElement(pointElement: Interface.Element): (Types.ElementGraphNode | false);
    private findElementNode;
    getOutputs(): Interface.Connection[];
    getInputs(): Interface.Connection[];
    getGenerators(): Interface.Element[];
    getAllElementsDFS(): Interface.Element[];
    getAllElementsBFS(): Interface.Element[];
    getAllNodeDFS(): Types.ElementGraphNode[];
    private DFSrec;
    getAllNodeBFS(): Types.ElementGraphNode[];
    getSetNodeDFS(): Types.ElementGraphNode[];
    getSetNodeBFS(): Types.ElementGraphNode[];
}
export default ElementGraph;
//# sourceMappingURL=elementGraph.d.ts.map