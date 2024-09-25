import * as Types from './types';
interface Scene {
    width: number;
    height: number;
}
interface Diagramm {
}
interface Model {
}
interface Cell {
}
interface Element {
    /**
     * * Задает параметры элемента: входы, выходы и сигналы.
     * Сигналы вводятся по очереди так: {{0,0,0,0},{1,1,0,0}}
     * Или используется механизм объединения по одному сигналу,
     * а затем остальные недостающие вводятся по очереди:
     * {{"E_n", 0, {0,0,0,0}}, {0,1,0,0}...}
     * @param inName Имена входов
     * @param outName Имена выходов
     * @param signals Массив сигналов
     * Сигналы могут быть заданы последовательным перечислением или в группах.
     * Особый случай: `"else"` — все необъявленные состояния принимают
     * указанный массив сигналов при `signal = "x"`, при `signal = 0|1|"z"`
     * все необъявленные состояния принимают `0|1|"z"` соответственно в не
     * зависимости от массива.
     * Подробнее см. Типы:Сигналы.
     */
    setParams(inName: string[], outName: string[], signals: Types.DSSSArray): Element;
    /**
     * * Объединение двух элементов
     * Выходы первого элемента последовательно соединяются со входами второго
     * при этом если у первого выходов больше чем у второго входов то выходы,
     * не соединенные со вторым элементом становятся выходами нового. Если у
     * второго больше входов, то входы, не соедененные с первым элементом
     * становятся входами нового.
     * @param elementOut Элемент, чьи выходы соединятся со входами
     * @param elementIn Элемент, чьи входы соединятся с выходами
     */
    concat(elementOut: Element, elementIn: Element): Element;
    /**
     * * Соеденяет текущий элемент с другим
     * Выходы первого элемента последовательно соединяются со входами второго
     * при этом если у первого выходов больше чем у второго входов то выходы,
     * не соединенные со вторым элементом становятся выходами нового. Если у
     * второго больше входов, то входы, не соедененные с первым элементом
     * @param elementOut Элемент, чьи выходы соединятся со входами текущего
     * @returns connected element
     */
    add(elementOut: Element): Element;
    /**
     * * Cоеденяет вход с названием name с заданным соединением
     * @param name Название входа, который необходимо соеденить
     * @param connection Соединение, имеющее выход с другим(или тем же самым) элементом
     * @returns Общее соединение
     */
    in(name: string, connection: Connection): (Connection | string);
    /**
     * * Ищет вход с названием name
     * @param name Название входа
     * @returns Соединение, если вход соединен с выходом или название входа, если не подключен
     */
    in(name: string): (Connection | string);
    /**
     * * Ищет выход с названием name
     * @param name Название выхода
     * @returns Соединение
     */
    out(name: string): Connection;
    /**
     * * Переводит упрощенную/полную форму записи сигнала в стандартную
     * @param array Упрощенная/полная/стандартная форма записи
     * @returns Общая стандартная форма записи
     */
    genState(array: Types.DSSSArray): Types.SignalArray[];
    /**
     * * Проверяет все ли входы подключены к выходам
     * @returns True если все входы подключены
     */
    isAllInConnected(): boolean;
    /**
     * * Проверяет не находится ли ни один сигнал в разрывном состоянии
     * @returns True не находится ни один сигнал в разрывном состоянии
     */
    isAllSignalNotZ(): boolean;
    /**
     * * Проверяет готовность элемента к симуляции
     * @returns True если элемент готов к симуляции
     */
    isReady(): boolean;
    /**
     * * Соединения/названия сигналов входа
     */
    in_connections: (Connection | string)[];
    /**
     * * Соединения сигналов выхода
     */
    out_connections: Connection[];
    /**
     * * Массив состояний
     */
    state: Types.SignalArray[];
}
interface Connection {
    /**
     * * Присоеденияет соединение ко входу
     * @param inSource Вход соединения
     * @returns Соединение
     */
    inConnect(inSource: Types.Sources): Connection;
    /**
     * * Отсоединяет соединение от входа
     * @param inSource Вход соединения
     * @returns Соединение
     */
    disConnect(inSource: Types.Sources): Connection;
    /**
     * * Присоеденияет соединение ко входам
     * @param inSourceArray Массив входов соединения
     * @returns Соединение
     */
    inConnects(inSourceArray: Types.SourcesArray): Connection;
    /**
     * * Отсоединяет соединение от входов
     * @param inSourceArray Массив входов соединения
     * @returns Соединение
     */
    disConnects(inSourceArray: Types.SourcesArray): Connection;
    /**
     * * Проверяет наличие соединения
     * @returns True если есть соединение
     */
    isConnected(): boolean;
    /**
     * * Количество соединенных входов
     * @returns Количество
     */
    lenInConnected(): number;
    /**
     * * Массив входов соединения
     */
    in: (Types.SourcesArray | false);
    /**
     * * Выход соединения
     */
    readonly out: Types.Sources;
}
export { Scene, Diagramm, Model, Cell, Element, Connection };
//# sourceMappingURL=interface.d.ts.map