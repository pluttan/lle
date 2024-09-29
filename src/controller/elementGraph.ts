import * as Interface from '../interface';
import * as Types from '../types';

/**
 *
 */
class ElementGraph implements Interface.ElementGraph {
    tree: Types.ElementGraphNode[];

    /**
     *
     * @param pointElement
     */
    constructor(pointElement: Interface.Element) {
        this.tree = [];
        this.genGraph(pointElement);
    }
    /**
     *
     * @param pointElement
     */
    genGraph(pointElement: Interface.Element): void {
        const set = new Set<Interface.Element>();
        this.findGenerators(pointElement, set);
        const arregn: Types.ElementGraphNode[] = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.genGraphNode(this.tree[i], arregn);
        }
    }

    /**
     *
     * @param pointElement
     * @param set
     */
    private findGenerators(
        pointElement: Interface.Element,
        set: Set<Interface.Element>
    ): Types.ElementGraphNode[] {
        set.add(pointElement);
        if (pointElement.in_connections !== undefined) {
            for (let i = 0; i < pointElement.in_connections.length; i++) {
                if (typeof pointElement.in_connections[i] !== 'string') {
                    const elem = (pointElement.in_connections[i] as Interface.Connection).out
                        .element;
                    if (!set.has(elem)) {
                        this.findGenerators(elem, set);
                    }
                }
            }
            for (let i = 0; i < pointElement.out_connections.length; i++) {
                if (pointElement.out_connections[i].in) {
                    for (
                        let j = 0;
                        j < (pointElement.out_connections[i].in as Types.SourcesArray).length;
                        j++
                    ) {
                        const elem = (pointElement.out_connections[i].in as Types.SourcesArray)[j]
                            .element;
                        if (!set.has(elem)) {
                            this.findGenerators(elem, set);
                        }
                    }
                }
            }
        } else {
            this.tree.push({element: pointElement, connection: [], out: []});
        }
        return this.tree;
    }

    /**
     *
     * @param node
     * @param arregn
     */
    private genGraphNode(node: Types.ElementGraphNode, arregn: Types.ElementGraphNode[]) {
        const pointElement = node.element;
        for (let j = 0; j < pointElement.out_connections.length; j++) {
            if (pointElement.out_connections[j].in) {
                for (
                    let k = 0;
                    k < (pointElement.out_connections[j].in as Types.SourcesArray).length;
                    k++
                ) {
                    const elem = (pointElement.out_connections[j].in as Types.SourcesArray)[k]
                        .element;
                    const egn = arregn.find((el) => el.element === elem);
                    if (!egn) {
                        const newNode = {
                            element: elem,
                            connection: [pointElement.out_connections[j]],
                            out: []
                        };
                        node.out.push(newNode);
                        arregn.push(newNode);
                        this.genGraphNode(newNode, arregn);
                    } else {
                        egn.connection.push(pointElement.out_connections[j]);
                        node.out.push(egn);
                    }
                }
            }
        }
    }

    /**
     *
     * @param pointElement
     */
    findElement(pointElement: Interface.Element): Types.ElementGraphNode | false {
        for (let i = 0; i < this.tree.length; i++) {
            const e = this.findElementNode(pointElement, this.tree[i]);
            if (e) {
                return e;
            }
        }
        return false;
    }

    /**
     *
     * @param pointElement
     * @param firstNode
     */
    private findElementNode(
        pointElement: Interface.Element,
        firstNode: Types.ElementGraphNode
    ): Types.ElementGraphNode | false {
        if (pointElement === firstNode.element) {
            return firstNode;
        }
        for (let j = 0; j < firstNode.out.length; j++) {
            const e = this.findElementNode(pointElement, firstNode.out[j]);
            if (e) {
                return e;
            }
        }
        return false;
    }

    /**
     *
     */
    getOutputs(): Interface.Connection[] {
        return [];
    }

    /**
     *
     */
    getInputs(): Interface.Connection[] {
        return [];
    }
    /**
     *
     */
    getGenerators(): Interface.Element[] {
        return [];
    }
    /**
     *
     */
    getAllElementsDFS(): Interface.Element[] {
        const nodes = this.getSetNodeDFS();
        const ret: Interface.Element[] = [];
        for (let i = 0; i < nodes.length; i++) {
            ret.push(nodes[i].element);
        }
        return ret;
    }
    /**
     *
     */
    getAllElementsBFS(): Interface.Element[] {
        const nodes = this.getAllNodeBFS();
        const ret: Interface.Element[] = [];
        for (let i = 0; i < nodes.length; i++) {
            if (!ret.find((el) => el === nodes[i].element)) {
                ret.push(nodes[i].element);
            }
        }
        return ret;
    }
    /**
     *
     */
    getAllNodeDFS(): Types.ElementGraphNode[] {
        const ret: Types.ElementGraphNode[] = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.DFSrec(this.tree[i], ret);
        }
        return ret;
    }
    /**
     *
     * @param node
     * @param ret
     */
    private DFSrec(node: Types.ElementGraphNode, ret: Types.ElementGraphNode[]): void {
        ret.push(node);
        for (let j = 0; j < node.out.length; j++) {
            this.DFSrec(node.out[j], ret);
        }
    }
    /**
     *
     */
    getAllNodeBFS(): Types.ElementGraphNode[] {
        const ret = [...this.tree];
        const allel = this.getSetNodeDFS();
        const conn: Interface.Connection[] = [];
        while (allel.length > 0) {
            for (let i = 0; i < allel.length; i++) {
                if (!ret.find((el) => el === allel[i])) {
                    let fl = true;
                    for (let j = 0; j < allel[i].connection.length; j++) {
                        if (!conn.find((el) => el === allel[i].connection[j])) {
                            fl = false;
                            break;
                        }
                    }
                    if (fl) {
                        ret.push(allel[i]);
                        conn.push(...allel[i].connection);
                        allel.splice(i, 1);
                        i--;
                    }
                } else {
                    allel.splice(i, 1);
                    i--;
                }
            }
        }
        return ret;
    }

    /**
     *
     */
    getSetNodeDFS(): Types.ElementGraphNode[] {
        const arr = this.getAllNodeDFS();
        return arr.filter((value, index, self) => self.indexOf(value) === index);
    }

    /**
     *
     */
    getSetNodeBFS(): Types.ElementGraphNode[] {
        return [];
    }
}

export default ElementGraph;
