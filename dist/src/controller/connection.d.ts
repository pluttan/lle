import * as Interface from '../interface';
import * as Types from '../types';
/**
 * Класс `Connection` позволяет соединять входы и выходы различных элементов.
 * Соединение всегда имеет обязательный выход, а входы могут быть
 * как отсутствовать, так и быть в единственном или множественном числе.
 */
declare class Connection implements Interface.Connection {
    /**
     * * Массив подключенных входов или false, если входы отсутствуют
     */
    in: Types.SourcesArray | false;
    /**
     * * Выход соединения (только для чтения)
     */
    readonly out: Types.Sources;
    /**
     * * Текущий сигнал соединения
     */
    state: Types.Signal;
    /**
     * Создает новое соединение с подключением только выхода,
     * оставляя вход свободным.
     * @param outSource выход соединения
     */
    constructor(outSource: Types.Sources);
    /**
     * Создает новое соединение с одним выходом и одним входом.
     * @param outSource выход соединения
     * @param inSource вход соединения
     */
    constructor(outSource: Types.Sources, inSource: Types.Sources);
    /**
     * Создает новое соединение с одним выходом и несколькими входами.
     * @param outSource выход соединения
     * @param inSourceArray массив входов соединения
     */
    constructor(outSource: Types.Sources, inSourceArray: Types.SourcesArray);
    /**
     * Создает новое соединение и его состояние с одним выходом и одним входом.
     * @param outSource выход соединения
     * @param inSource вход соединения
     * @param state Текущее состояние элемента
     */
    constructor(outSource: Types.Sources, inSource: Types.Sources, state: Types.Signal);
    /**
     * Создает новое соединение и его состояние с одним выходом и несколькими входами.
     * @param outSource выход соединения
     * @param inSourceArray массив входов соединения
     * @param state Текущее состояние элемента
     */
    constructor(outSource: Types.Sources, inSourceArray: Types.SourcesArray, state: Types.Signal);
    /**
     * Подключает вход другого элемента к текущему соединению.
     * @param inSource вход элемента
     * @returns текущее соединение
     */
    inConnect(inSource: Types.Sources): Interface.Connection;
    /**
     * Отключает вход от текущего соединения.
     * @param inSource вход, который нужно отсоединить
     * @returns текущее соединение
     */
    disConnect(inSource: Types.Sources): Interface.Connection;
    /**
     * Подключает несколько входов к текущему соединению.
     * @param inSourceArray массив входов
     * @returns текущее соединение
     */
    inConnects(inSourceArray: Types.SourcesArray): Interface.Connection;
    /**
     * Отключает несколько входов от текущего соединения.
     * @param inSourceArray массив входов, которые нужно отсоединить
     * @returns текущее соединение
     */
    disConnects(inSourceArray: Types.SourcesArray): Interface.Connection;
    /**
     * Проверяет, подключено ли текущее соединение хотя бы к одному входу.
     * @returns true, если подключен хотя бы один вход
     */
    isConnected(): boolean;
    /**
     * Возвращает количество подключенных входов.
     * @returns количество входов
     */
    lenInConnected(): number;
    /**
     * Клонирует текущее соединение, создавая новое с такими же входами,
     * но подключенное к другому элементу.
     * @param element элемент, к которому подключен выход нового соединения
     * @returns новое соединение с клонированными входами
     */
    clone(element: Interface.Element): Interface.Connection;
    /**
     * Возвращает массив имен входов, подключенных к текущему соединению.
     * @returns массив строк с именами входов
     */
    getArrayInString(): string[];
    /**
     * Находит вход, который принадлежит указанному элементу.
     * @param element элемент, для которого нужно найти подключенный вход
     * @returns название входа
     */
    findInString(element: Interface.Element): string;
}
export { Connection };
//# sourceMappingURL=connection.d.ts.map