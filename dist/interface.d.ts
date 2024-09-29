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
    setParams?(inName: string[], outName: string[], signals: Types.DSSSArray): Element;
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
    concat?(elementOut: Element, elementIn: Element): Element;
    /**
     * * Соеденяет текущий элемент с другим
     * Выходы первого элемента последовательно соединяются со входами второго
     * при этом если у первого выходов больше чем у второго входов то выходы,
     * не соединенные со вторым элементом становятся выходами нового. Если у
     * второго больше входов, то входы, не соедененные с первым элементом
     * @param elementOut Элемент, чьи выходы соединятся со входами текущего
     * @returns connected element
     */
    add?(elementOut: Element): Element;
    /**
     * * Cоеденяет вход с названием name с заданным соединением
     * @param name Название входа, который необходимо соеденить
     * @param connection Соединение, имеющее выход с другим(или тем же самым) элементом
     * @returns Общее соединение
     */
    in?(name: string, connection: Connection): (Connection | string);
    /**
     * * Ищет вход с названием name
     * @param name Название входа
     * @returns Соединение, если вход соединен с выходом или название входа, если не подключен
     */
    in?(name: string): (Connection | string);
    /**
     * * Ищет вход с названием name и возвращает его индекс
     * @param name Название входа
     * @returns Индекс в массиве in_connections
     */
    inIndex?(name: string): number;
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
    genState?(array: Types.DSSSArray): Types.SignalArray[];
    /**
     * * Клонирует элемент вместе с подключениями
     * @returns Новый элемент -- копия this
     */
    clone(): Element;
    /**
     * * Проверяет все ли входы подключены к выходам
     * @returns True если все входы подключены
     */
    isAllInConnected(): boolean;
    /**
     * * Проверяет не находится ли ни один сигнал в разрывном состоянии
     * @returns True не находится ни один сигнал в разрывном состоянии
     */
    isAllSignalNotZ?(): boolean;
    /**
     * * Проверяет готовность элемента к симуляции
     * @returns True если элемент готов к симуляции
     */
    isReady(): boolean;
    /**
     * * Соединения/названия сигналов входа
     */
    in_connections?: (Connection | string)[];
    /**
     * * Соединения сигналов выхода
     */
    out_connections: Connection[];
    /**
     * * Массив состояний
     */
    state?: Types.SignalArray[];
    /**
     * * Имя элемента
     */
    name?: string;
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
     * * Количество соединенных входов
     * @returns Количество
     */
    lenInConnected(): number;
    /**
     * * Клонирует подключения
     * @param element Элемент, чьи выходы теперь будут
     * @returns Новый элемент -- копия this
     */
    clone(element: Element): Connection;
    /**
     * * Возвращает массив входов в виде строки
     * @returns массив входов в виде строки
     */
    getArrayInString(): string[];
    /**
     * * Находит вход по элементу
     * @param element Элемент, чей вход мы ищем
     * @returns массив входов в виде строки
     */
    findInString(element: Element): string;
    /**
     * * Проверяет наличие соединения
     * @returns True если есть соединение
     */
    isConnected(): boolean;
    /**
     * * Массив входов соединения
     */
    in: (Types.SourcesArray | false);
    /**
     * * Выход соединения
     */
    readonly out: Types.Sources;
}
interface Model {
    /**
     * * Массив генераторов для моделирования
     */
    generators: Element[];
    /**
     * * Массив всех элементов, учавствующих в моделировании
     */
    elements_array: Element[];
    /**
     * * Объект времени, содержащий текущее время, частоту, начало/конец моделирования и конец паттерна
     */
    time: {
        now: number;
        freq: number;
        begin: number;
        end: number;
        pattern_end: number;
    };
    /**
     * * Таблица-результат моделирования, содержащий информацию о времени, генераторах и элементах
     */
    model_table: {
        t: number;
        generators: Types.SignalArray;
        elements: Types.SignalArray[];
    }[];
    /**
     * * Автоматически устанавливает частоту моделирования по частотам генераторов
     */
    autoFreq(): void;
    /**
     * * Автоматически устанавливает конец паттерна (наверное с триггерами плохо будет работать)
     */
    autoPatternEnd(): void;
    /**
     * * Переходит к следующему такту, записывая поведение всех элементов текущего
     */
    modelNext(): void;
    /**
     * * Моделируем весь паттерн до конца
     */
    modelPattern(): void;
    /**
     * * Моделируем все до конца
     */
    modelAll(): void;
    /**
     * * Удаляет текущий такт и его состояние модели. Может быть полезно при изменении входов-выходов.
     */
    deleteNowModel(): void;
    /**
     * * Удаляет все моделирование
     */
    deleteModel(): void;
    /**
     * * Удаляет и еще раз выполняет текущий такт
     */
    remodelNow(): void;
    /**
     * * Удаляет все отмоделированное и еще раз выполняет
     */
    remodelAll(): void;
    /**
     * * Находит выход по соединению
     * @param out Соединение
     * @returns Массив сигналов для данного соединения
     */
    findOutput(out: Connection): Types.SignalArray;
    /**
     * * Находит выход по соединению с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и сигнал
     */
    findOutputT(out: Connection): {
        t: number;
        signal: Types.Signal;
    }[];
    /**
     * * Находит все выходы по соединению
     * @param out Соединение
     * @returns Массив массивов сигналов для данного соединения
     */
    findOutputs(out: Connection): Types.SignalArray[];
    /**
     * * Находит все выходы по соединению с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и массив сигналов
     */
    findOutputsT(out: Connection): {
        t: number;
        signals: Types.Signal[];
    }[];
}
interface ElementGraph {
    /**
     * * Граф элементов
     */
    tree: Types.ElementGraphNode[];
    /**
     * * Генерируем граф элементов
     */
    genGraph(pointElement: Element): void;
    /**
     * * Находим элемент в графе
     */
    findElement(pointElement: Element): (Types.ElementGraphNode | false);
    /**
     * * Возвращает массив выходов, которые ни к чему не подключены
     * @returns Массив соединений
     */
    getOutputs(): Connection[];
    /**
     * * Возвращает массив входов, которые ни к чему не подключены
     * @returns Массив соединений
     */
    getInputs(): Connection[];
    /**
     * * Возвращает массив генераторов
     * @returns Массив генераторов
     */
    getGenerators(): Element[];
    /**
     * * Возвращает обход графа в глубину
     * @returns Массив элементов дерева
     */
    getAllElementsDFS(): Element[];
    /**
     * * Возвращает обход графа в ширину
     * @returns Массив элементов дерева
     */
    getAllElementsBFS(): Element[];
    /**
     * * Возвращает ноды обхода графа в глубину
     * @returns Массив нод графа
     */
    getAllNodeDFS(): Types.ElementGraphNode[];
    /**
     * * Возвращает ноды обхода графа в ширину
     * @returns Массив нод графа
     */
    getAllNodeBFS(): Types.ElementGraphNode[];
    /**
     * * Возвращает уникальные ноды обхода графа в грубину
     * @returns Массив нод графа
     */
    getSetNodeDFS(): Types.ElementGraphNode[];
    /**
     * * Возвращает уникальные ноды обхода графа в ширину
     * @returns Массив нод графа
     */
    getSetNodeBFS(): Types.ElementGraphNode[];
}
export { Scene, Diagramm, Model, Cell, Element, Connection, ElementGraph };
//# sourceMappingURL=interface.d.ts.map