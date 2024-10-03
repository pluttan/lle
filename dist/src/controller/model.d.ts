import * as Interface from '../interface';
import * as Types from '../types';
/**
 * Класс, представляющий возможности моделирования элементов
 */
declare class Model implements Interface.Model {
    /**
     * Массив генераторов для моделирования
     */
    generators: Interface.Element[];
    /**
     * Объект времени, содержащий текущее время, частоту, начало/конец моделирования и конец паттерна
     */
    time: Types.ModelTime;
    /**
     * Таблица моделирования, содержащая элементы их состояния и время текущего состояния
     */
    model_table: Types.ModelStateArray[];
    /**
     * Конструктор моделирования
     * @param graph сгенерированный граф элементов
     */
    constructor(graph: Interface.ElementGraph);
    /**
     * Автоматически устанавливает частоту моделирования по частотам генераторов
     */
    autoFreq(): void;
    /**
     * Автоматически устанавливает конец паттерна (наверное с триггерами плохо будет работать)
     */
    autoPatternEnd(): void;
    private gcd;
    /**
     * Определяет состояние системы перед моделированием. Все генераторы равны нулю.
     */
    preModel(): void;
    /**
     * Устанавливает значения элемента
     * @param st значения
     * @param modelStates моделируемый элемент
     * @param time
     */
    private setState;
    /**
     * Собирает значения элемента
     * @param modelStates моделируемый элемент
     * @param time
     * @returns входные состояния элемента
     */
    private getState;
    /**
     * Переходит к следующему такту, записывая поведение всех элементов текущего
     */
    modelNext(): void;
    /**
     * Моделируем весь паттерн до конца
     */
    modelPattern(): void;
    /**
     * Моделируем все до конца
     */
    modelAll(): void;
    /**
     * Удаляет текущий такт и его состояние модели. Может быть полезно при изменении входов-выходов.
     */
    deleteNowModel(): void;
    /**
     * Удаляет все моделирование
     */
    deleteModel(): void;
    /**
     * Удаляет и еще раз выполняет текущий такт
     */
    remodelNow(): void;
    /**
     * Удаляет все отмоделированное и еще раз выполняет
     */
    remodelAll(): void;
    /**
     * Находит сигнал выхода по соединению
     * @param out Соединение
     * @returns Массив сигналов для данного соединения
     */
    findOutput(out: Interface.Connection): Types.Signal;
    /**
     * Находит сигнал выхода по соединению с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и сигнал
     */
    findOutputT(out: Interface.Connection): Types.ModelState[];
    /**
     * * Находит все выходные сигналы по элементу
     * @param element Элемент
     * @returns Массив сигналов для данного элемента (текущее)
     */
    findElement(element: Interface.Element): string;
    /**
     * * Находит все выходные сигналы по элементу с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и массив сигналов
     */
    findElementT(out: Interface.Element): Types.ModelState[];
}
export { Model };
//# sourceMappingURL=model.d.ts.map