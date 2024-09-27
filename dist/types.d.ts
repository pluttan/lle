import { Element } from './interface';
/**
 * * Тип сигнала
 * 1 - сигнал "1"
 * 0 - сигнал "0"
 * "x" - сигнал "x" (неопределенный)
 * "z" - сигнал "z" (обрыв)
 */
type Signal = 1 | 0 | "x" | "z";
/**
 * ! Стандартный способ задания сигналов элементов
 * * Массив сигналов
 */
type SignalArray = Signal[];
/**
 * * Массив сигналов теперь можно задавать и через строки
 */
type StringSignalArray = (SignalArray | string);
/**
 * ! Упрощенный способ задания сигналов элементов
 * * Массив состояний
 * Используется для описания состояния элемента при одном логическом сигнале.
 * `name`: имя состояния (строка)
 * `signal`: сигнал состояния (тип `Signal`)
 * `SignalArray`: массив сигналов, описывающий выходные сигналы
 * `StateArray`: объединение состояний элементов
 *
 * Пример:
 *
 * Состояние элемента: если вход "E_n" имеет сигнал 0, то все выходы элемента
 * будут {0, 0, 0, 0}
 * const stateArray1: StateArray = ["E_n", 0, [0, 0, 0, 0]];
 *
 * Состояние "else": если сигнал не указан явно, то выходы будут {1, 0, 1, 0},
 * если текущий сигнал "x"
 * const stateArray2: StateArray = ["else", "x", [1, 0, 1, 0]];
 *
 * Состояние "else": если сигнал не указан явно, то выходы будут {0, 0, 0, 0}
 * const stateArray2: StateArray = ["else", "0", [1, 0, 1, 0]];
 *
 * Состояние "control" с сигналом 1 и вложенное состояние "enable" с сигналом 0,
 * результатом которого будет {1, 1, 1, 0}
 * const nestedStateArray: StateArray = ["control", 1, ["enable", 0, [1, 1, 1, 0]]];
 *
 */
type StateSignal = {
    name: string;
    state: Signal;
    out: StringSignalArray | StateSignal;
};
/**
 * * Массив состояний сигналов
 * Используется при описании всех сигналов элемента
 * Объеденияет в себе стандартный способ задания элементов и упрощенный
 * Пример:
 *
 * const stateSignalArray1: StateSignalArray = [
 *    [1, 0, 1, "z"],
 *    ["E_n", 0, [0, 0, 0, 0]],
 *    ["else", "x", [1, 1, 0, 0]]
 * ];
 */
type StateSignalArray = (StringSignalArray | StateSignal)[];
/**
 * ! Детальный способ задания сигналов элементов
 * * Массив сигналов входа и выхода
 * Сигнал входа в стандартном способе отсутствует, так как считается, что сигналы
 * выхода просто задаются по порядку, но это не всегда удобно, поэтому был создан
 * детальный способ создания с сигналами и входа и выхода
 */
type DetailSignal = {
    in: StringSignalArray;
    out: StringSignalArray;
};
/**
 * * Массив детальных сигналов
 * Пример:
 * const DetailSignalArray1: DetailSignalArray = [
 *  [[0, 0],   [0, 0, 1]],
 *  [[0, 1],   [0, 1, 0]],
 *  [[1, 0],   [1, 0, 0]],
 *  [[1, 1],   [0, 0, 0]]
 * ];
 */
type DetailSignalArray = DetailSignal[];
/**
 * ? DSSSArray - Detail Signal, State, Signal Array
 * * Массив состояний сигналов
 * Используется при описании всех сигналов элемента
 * Объеденияет в себе детальный, стандартный и упрощенный способ задания сигналов элементов
 * Пример:
 *
 * const DSSSArray1: DSSSArray = [
 *    [1, 0, 1, "z"],   // стандартный способ
 *    ["E_n", 0, [0, 0, 0, 0]], // упрощенный способ
 *    [[1, 1, 0],[0, 1, 0, 0]], // детальный способ
 *    ["else", "x", [1, 1, 0, 0]]  // упрощенный способ
 * ];
 */
type DSSSArray = (DetailSignal | StringSignalArray | StateSignal)[];
/**
 * * Определение входа/выхода для соединения
 */
type Sources = {
    name: string;
    element: Element;
};
/**
 * * Массив входов/выходов для соединения
 */
type SourcesArray = Sources[];
export { Signal, SignalArray, StateSignal, StateSignalArray, StringSignalArray, DetailSignal, DetailSignalArray, DSSSArray, Sources, SourcesArray };
//# sourceMappingURL=types.d.ts.map