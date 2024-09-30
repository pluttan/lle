import * as Interface from '../interface';
import * as Types from '../types';
/**
 * Класс Element представляет элемент схемы с входными и выходными соединениями.
 * Он используется для моделирования сигналов и управления связями между элементами.
 */
declare class Element implements Interface.Element {
    /**
     * Имя элемента
     */
    name: string;
    /**
     * Входные соединения (могут быть строками или объектами Connection)
     */
    in_connections: (Interface.Connection | string)[];
    /**
     * Выходные соединения
     */
    out_connections: Interface.Connection[];
    /**
     * Текущее состояние сигнала на выходах
     */
    state: Types.SignalArray[];
    /**
     * Конструктор класса Element.
     * Создает пустой элемент без входов, выходов, состояний и названия.
     */
    constructor();
    /**
     * Конструктор класса Element.
     * Создает пустой элемент с именем без входов, выходов, состояний
     * @param name Название элемента
     */
    constructor(name: string);
    /**
     * Конструктор класса Element.
     * Создает элемент без названия с входами, выходами и состояниями
     * @param inName Массив имен входов элемента
     * @param outName Массив имен выходов элемента
     * @param signals Сигналы на выходе элемента при входных сигналах (подробнее {@link Types.DSSSArray})
     */
    constructor(inName: string[], outName: string[], signals: Types.DSSSArray);
    /**
     * Конструктор класса Element.
     * Создает элемент с названием с входами, выходами и состояниями
     * @param name Название элемента
     * @param inName Массив имен входов элемента
     * @param outName Массив имен выходов элемента
     * @param signals Сигналы на выходе элемента при входных сигналах (подробнее {@link Types.DSSSArray})
     */
    constructor(name: string, inName: string[], outName: string[], signals: Types.DSSSArray);
    /**
     * Конструктор класса Element.
     * Создает элемент без названия через клонирование
     * и соединение двух переданных (подробнее {@link Element.concat})
     * @param elementOut Первый элемент, чьи выходы соединяться со входами второго
     * @param elementIn Второй элемент
     */
    constructor(elementOut: Element, elementIn: Element);
    /**
     * Конструктор класса Element.
     * Создает элемент c названием через клонирование
     * и соединение двух переданных (подробнее {@link Element.concat})
     * @param name Название элемента
     * @param elementOut Первый элемент, чьи выходы соединяться со входами второго
     * @param elementIn Второй элемент
     */
    constructor(name: string, elementOut: Element, elementIn: Element);
    /**
     * Устанавливает параметры элемента.
     * @param inName Массив входных имен.
     * @param outName Массив выходных имен.
     * @param signals Массив сигналов для состояния.
     * @returns Экземпляр текущего элемента.
     */
    setParams(inName: string[], outName: string[], signals: Types.DSSSArray): Element;
    /**
     * Клонирует два элемента и соединяет выходы нового первого элемента с входами другого.
     *
     * Если у первого элемента больше выходов, чем у второго входов, то
     * неиспользованные выходы становятся выходами нового элемента.
     *
     * Если у второго элемента больше входов, чем выходов у первого, неиспользованные
     * входы становятся входами нового элемента.
     *
     * @param elementOut Элемент, выходы которого соединяются.
     * @param elementIn Элемент, входы которого принимают соединение.
     * @returns Экземпляр текущего элемента после соединения.
     */
    concat(elementOut: Element, elementIn: Element): Interface.Element;
    /**
     * Подключает текущий элемент к другому
     * Выходы первого элемента последовательно соединяются со входами второго.
     * Если у первого элемента больше выходов, чем у второго входов, неиспользованные
     * выходы становятся выходами нового элемента. Если у второго элемента
     * больше входов, то неиспользованные входы становятся входами нового элемента.
     * @param elementOut Элемент, чьи выходы соединяются с входами текущего
     * @returns соединенный элемент
     */
    add(elementOut: Element): Element;
    /**
     * Соедиеняет текущий вход name с соединением connection
     * @param name Название входа
     * @param connection Соединение с которым вход соединяется
     */
    in(name: string, connection: Interface.Connection): Interface.Connection | string;
    /**
     * Выдает текущее соединение входа (если оно есть) или просто название входа
     * @param name Название входа
     */
    in(name: string): Interface.Connection | string;
    /**
     * Находит индекс входа по его имени.
     * @param name Имя входа.
     * @returns Индекс входа или -1, если не найдено.
     */
    inIndex(name: string): number;
    /**
     * Возвращает выходное соединение по имени.
     * @param name Имя выхода.
     * @returns Объект соединения.
     */
    out(name: string): Interface.Connection;
    /**
     * Генерирует состояние на выходах элемента. Про состояния подробнее см. {@link Types.DSSSArray}
     * @param array Массив сигналов.
     * @returns Обновленный массив состояний.
     */
    genState(array: Types.DSSSArray): Types.SignalArray[];
    /**
     * Дополнительная функция для genState
     * @param state
     */
    private genSignal;
    /**
     * Дополнительная функция для genState
     * @param state
     */
    private genStateDetailSignal;
    /**
     * Дополнительная функция для genState
     * @param s
     * @returns
     */
    private getSignalGenerateVariations;
    /**
     * Дополнительная функция для genState
     * @param state
     * @param arri
     */
    private genStateSignal;
    /**
     * Дополнительная функция для genState
     * @param outState
     * @returns
     */
    private genStateGenOutFromStr;
    /**
     * Клонирует текущий элемент.
     * Вместе с элементом клонируются его выходные соединения.
     * Входы отсоединяются.
     *
     * @returns Новый экземпляр элемента с теми же параметрами.
     */
    clone(): Element;
    /**
     * Проверяет, все ли входы элемента подключены.
     * @returns true, если все входы подключены, иначе false.
     */
    isAllInConnected(): boolean;
    /**
     * Проверяет, все ли сигналы элемента отличны от 'z'.
     * @returns true, если все сигналы известны, иначе false.
     */
    isAllSignalNotZ(): boolean;
    /**
     * Проверяет, готов ли элемент для моделирования.
     * @returns true, если элемент готов, иначе false.
     */
    isReady(): boolean;
}
/**
 * Класс Generator представляет активный элемент цепи,
 * который генерирует сигнал (чередующийся меандр 0 и 1) с заданной частотой.
 * У генератора нет входных соединений, но есть одно выходное,
 * через которое передаётся сигнал.
 */
declare class Generator implements Interface.Element {
    /**
     * Массив выходных соединений элемента.
     * В данном случае у генератора есть только одно выходное соединение.
     */
    out_connections: Interface.Connection[];
    /**
     * Частота генератора, определяющая, с какой скоростью
     * будет происходить переключение сигнала (меандра).
     */
    frequency: number;
    /**
     * Конструктор для создания генератора с указанной частотой.
     * @param frequency - Частота переключения сигнала (число).
     */
    constructor(frequency: number);
    /**
     * Конструктор для создания генератора с заданным именем выхода и частотой.
     * @param name - Имя выходного соединения.
     * @param frequency - Частота переключения сигнала.
     */
    constructor(name: string, frequency: number);
    /**
     * Метод для получения выходного соединения.
     * Если передано имя, обновляет имя выхода, если оно отличается от текущего.
     *
     * @param name - Имя для выходного соединения (необязательно).
     * @returns Возвращает выходное соединение.
     */
    out(name?: string): Interface.Connection;
    /**
     * Метод для клонирования текущего генератора.
     * Клонирует частоту и имя выходного соединения.
     *
     * @returns Новый объект Generator с теми же параметрами.
     */
    clone(): Generator;
    /**
     * Проверяет, подключено ли выходное соединение.
     * Если выходное соединение не подключено (значение `in` равно `false`),
     * возвращает `false`.
     *
     * @returns `true`, если выход подключён, иначе `false`.
     */
    isAllInConnected(): boolean;
    /**
     * Проверяет, готов ли генератор к работе.
     * Генератор считается готовым, если его выходное соединение подключено и у него есть имя.
     *
     * @returns `true`, если генератор готов к работе, иначе `false`.
     */
    isReady(): boolean;
}
export { Element, Generator };
//# sourceMappingURL=element.d.ts.map