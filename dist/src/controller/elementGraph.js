"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementGraph = void 0;
/**
 * Класс, представляющий граф элементов. Он строит и обрабатывает граф на основе заданного элемента.
 * Граф элементов может быть использован для обхода, поиска элементов и анализа соединений.
 */
class ElementGraph {
    /**
     * Конструктор, инициализирующий граф и генерирующий его на основе начального элемента.
     * @param pointElement Элемент, с которого начинается генерация графа.
     */
    constructor(pointElement) {
        this.tree = [];
        this.genGraph(pointElement);
    }
    /**
     * Генерирует граф элементов, начиная с указанного элемента.
     * @param pointElement Элемент, с которого начинается генерация графа.
     */
    genGraph(pointElement) {
        const set = new Set();
        this.findGenerators(pointElement, set);
        const arregn = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.genGraphNode(this.tree[i], arregn);
        }
    }
    /**
     * Рекурсивно ищет генераторы (начальные элементы) в графе и строит дерево элементов.
     * @param pointElement Элемент, с которого начинается поиск.
     * @param set Множество элементов, уже обработанных для предотвращения циклов.
     * @returns Массив нод графа.
     */
    findGenerators(pointElement, set) {
        set.add(pointElement);
        if (pointElement.in_connections !== undefined) {
            for (let i = 0; i < pointElement.in_connections.length; i++) {
                if (typeof pointElement.in_connections[i] !== 'string') {
                    const elem = pointElement.in_connections[i].out
                        .element;
                    if (!set.has(elem)) {
                        this.findGenerators(elem, set);
                    }
                }
            }
            for (let i = 0; i < pointElement.out_connections.length; i++) {
                if (pointElement.out_connections[i].in) {
                    for (let j = 0; j < pointElement.out_connections[i].in.length; j++) {
                        const elem = pointElement.out_connections[i].in[j]
                            .element;
                        if (!set.has(elem)) {
                            this.findGenerators(elem, set);
                        }
                    }
                }
            }
        }
        else {
            this.tree.push({ element: pointElement, connection: [], out: [] });
        }
        return this.tree;
    }
    /**
     * Генерирует ноды графа и их связи.
     * @param node Текущая нода для обработки.
     * @param arregn Массив уже обработанных нод для предотвращения повторов.
     */
    genGraphNode(node, arregn) {
        const pointElement = node.element;
        for (let j = 0; j < pointElement.out_connections.length; j++) {
            if (pointElement.out_connections[j].in) {
                for (let k = 0; k < pointElement.out_connections[j].in.length; k++) {
                    const elem = pointElement.out_connections[j].in[k]
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
                    }
                    else {
                        egn.connection.push(pointElement.out_connections[j]);
                        node.out.push(egn);
                    }
                }
            }
        }
    }
    /**
     * Находит элемент в графе.
     * @param pointElement Элемент для поиска.
     * @returns Нода графа с указанным элементом или `false`, если элемент не найден.
     */
    findElement(pointElement) {
        for (let i = 0; i < this.tree.length; i++) {
            const e = this.findElementNode(pointElement, this.tree[i]);
            if (e) {
                return e;
            }
        }
        return false;
    }
    /**
     * Рекурсивно находит элемент в графе.
     * @param pointElement Элемент для поиска.
     * @param firstNode Нода, с которой начинается поиск.
     * @returns Нода графа с указанным элементом или `false`, если элемент не найден.
     */
    findElementNode(pointElement, firstNode) {
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
     * Получаем массив элементов из элементов нод
     * @param na элементы нод
     * @returns массив элементов
     */
    getElementArrayFromNodeArray(na) {
        const ret = [];
        for (let i = 0; i < na.length; i++) {
            ret.push(na[i].element);
        }
        return ret;
    }
    /**
     * Возвращает массив выходов, которые ни к чему не подключены.
     * @returns Массив соединений.
     */
    getOutputs() {
        const it = this.getSetNodeDFS();
        const ret = [];
        for (let i = 0; i < it.length; i++) {
            if (it[i].element.out_connections.length !== it[i].out.length) {
                for (let j = 0; j < it[i].element.out_connections.length; j++) {
                    if (!it[i].element.out_connections[j].in) {
                        ret.push(it[i].element.out_connections[j]);
                    }
                }
            }
        }
        return ret;
    }
    /**
     * Возвращает массив входов, которые ни к чему не подключены.
     * @returns Массив соединений.
     */
    getInputs() {
        const it = this.getSetNodeDFS();
        const ret = [];
        for (let i = 0; i < it.length; i++) {
            if ('in_connections' in it[i].element) {
                const nuo = it[i].element.in_connections;
                if (nuo.length !== it[i].out.length) {
                    for (let j = 0; j < nuo.length; j++) {
                        if (typeof nuo[j] === 'string') {
                            ret.push({ name: nuo[j], element: it[i].element });
                        }
                    }
                }
            }
        }
        return ret;
    }
    /**
     * Возвращает массив генераторов графа.
     * @returns Массив генераторов (начальных элементов).
     */
    getGenerators() {
        return this.getElementArrayFromNodeArray(this.tree);
    }
    /**
     * Возвращает обход графа в глубину.
     * @returns Массив элементов графа.
     */
    getAllElementsDFS() {
        return this.getElementArrayFromNodeArray(this.getSetNodeDFS());
    }
    /**
     * Возвращает обход графа в ширину.
     * @returns Массив элементов графа.
     */
    getAllElementsBFS() {
        return this.getElementArrayFromNodeArray(this.getAllNodeBFS());
    }
    /**
     * Возвращает массив всех нод в глубину.
     * @returns Массив нод графа.
     */
    getAllNodeDFS() {
        const ret = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.DFSrec(this.tree[i], ret);
        }
        return ret;
    }
    /**
     * Рекурсивно обходит граф в глубину.
     * @param node Нода для обработки.
     * @param ret Массив результата обхода.
     */
    DFSrec(node, ret) {
        ret.push(node);
        for (let j = 0; j < node.out.length; j++) {
            this.DFSrec(node.out[j], ret);
        }
    }
    /**
     * Находит все соединения, к которым подключена данная нода
     * @param node Данная нода
     * @returns Массив соединений
     */
    getConnectionsNode(node) {
        const ret = [];
        for (let i = 0; i < node.element.out_connections.length; i++) {
            if (node.element.out_connections[i].in) {
                ret.push(node.element.out_connections[i]);
            }
        }
        return ret;
    }
    /**
     * Возвращает массив всех нод в ширину.
     * @returns Массив нод графа.
     */
    getAllNodeBFS() {
        const ret = [...this.tree];
        const allel = this.getSetNodeDFS();
        const conn = [];
        while (allel.length > 0) {
            for (let i = 0; i < allel.length; i++) {
                if (!ret.find((el) => el === allel[i])) {
                    let fl = true;
                    for (let j = 0; j < allel[i].connection.length; j++) {
                        if (!ret.find((el) => el.element === allel[i].connection[j].out.element)) {
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
                }
                else {
                    allel.splice(i, 1);
                    i--;
                }
            }
        }
        return ret;
    }
    /**
     * Возвращает уникальные ноды графа после обхода в глубину.
     * @returns Массив уникальных нод графа.
     */
    getSetNodeDFS() {
        const arr = this.getAllNodeDFS();
        return arr.filter((value, index, self) => self.indexOf(value) === index);
    }
}
exports.ElementGraph = ElementGraph;
//# sourceMappingURL=elementGraph.js.map