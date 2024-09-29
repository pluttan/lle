import * as Interface from '../interface';
import * as Types from '../types';
import Factories from '../factories';

class ElementGraph implements Interface.ElementGraph {
    tree: Types.ElementGraphNode[];

    constructor(pointElement: Interface.Element) {
        this.tree = [];
        this.genGraph(pointElement);
    }
    genGraph(pointElement: Interface.Element): void {
        let set = new Set<Interface.Element>();
        this.findGenerators(pointElement, set);
        let arregn: Types.ElementGraphNode[] = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.genGraphNode(this.tree[i], arregn);
        }
    }

    private findGenerators(
        pointElement: Interface.Element,
        set: Set<Interface.Element>
    ): Types.ElementGraphNode[] {
        set.add(pointElement);
        if ('in_connections' in (pointElement as object)) {
            for (let i = 0; i < (pointElement as any).in_connections.length; i++) {
                let elem = (pointElement as any).in_connections[i].out.element;
                if (!set.has(elem)) this.findGenerators(elem, set);
            }
            for (let i = 0; i < pointElement.out_connections.length; i++) {
                if (pointElement.out_connections[i].in) {
                    for (
                        let j = 0;
                        j < (pointElement.out_connections[i].in as Types.SourcesArray).length;
                        j++
                    ) {
                        let elem = (pointElement.out_connections[i].in as Types.SourcesArray)[j]
                            .element;
                        if (!set.has(elem)) this.findGenerators(elem, set);
                    }
                }
            }
        } else {
            this.tree.push({element: pointElement, connection: [], out: []});
        }
        return this.tree;
    }

    private genGraphNode(node: Types.ElementGraphNode, arregn: Types.ElementGraphNode[]) {
        let pointElement = node.element;
        for (let j = 0; j < pointElement.out_connections.length; j++) {
            if (pointElement.out_connections[j].in) {
                for (
                    let k = 0;
                    k < (pointElement.out_connections[j].in as Types.SourcesArray).length;
                    k++
                ) {
                    let elem = (pointElement.out_connections[j].in as Types.SourcesArray)[k]
                        .element;
                    let egn = arregn.find((el) => el.element === elem);
                    if (!egn) {
                        let newNode = {
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

    findElement(pointElement: Interface.Element): Types.ElementGraphNode | false {
        for (let i = 0; i < this.tree.length; i++) {
            let e = this.findElementNode(pointElement, this.tree[i]);
            if (e) return e;
        }
        return false;
    }

    private findElementNode(
        pointElement: Interface.Element,
        firstNode: Types.ElementGraphNode
    ): Types.ElementGraphNode | false {
        if (pointElement === firstNode.element) return firstNode;
        for (let j = 0; j < firstNode.out.length; j++) {
            let e = this.findElementNode(pointElement, firstNode.out[j]);
            if (e) return e;
        }
        return false;
    }

    getOutputs(): Interface.Connection[] {
        return [];
    }

    getInputs(): Interface.Connection[] {
        return [];
    }
    getGenerators(): Interface.Element[] {
        return [];
    }
    getAllElementsDFS(): Interface.Element[] {
        let nodes = this.getSetNodeDFS();
        let ret: Interface.Element[] = [];
        for (let i = 0; i < nodes.length; i++) {
            ret.push(nodes[i].element);
        }
        return ret;
    }
    getAllElementsBFS(): Interface.Element[] {
        let nodes = this.getAllNodeBFS();
        let ret: Interface.Element[] = [];
        for (let i = 0; i < nodes.length; i++) {
            if (!ret.find((el) => el === nodes[i].element)) ret.push(nodes[i].element);
        }
        return ret;
    }
    getAllNodeDFS(): Types.ElementGraphNode[] {
        let ret: Types.ElementGraphNode[] = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.DFSrec(this.tree[i], ret);
        }
        return ret;
    }
    private DFSrec(node: Types.ElementGraphNode, ret: Types.ElementGraphNode[]): void {
        ret.push(node);
        for (let j = 0; j < node.out.length; j++) {
            this.DFSrec(node.out[j], ret);
        }
    }
    getAllNodeBFS(): Types.ElementGraphNode[] {
        let ret = [...this.tree];
        let allel = this.getSetNodeDFS();
        let conn: Interface.Connection[] = [];
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

    getSetNodeDFS(): Types.ElementGraphNode[] {
        let arr = this.getAllNodeDFS();
        return arr.filter((value, index, self) => self.indexOf(value) === index);
    }

    getSetNodeBFS(): Types.ElementGraphNode[] {
        return [];
    }
}

export default ElementGraph;
