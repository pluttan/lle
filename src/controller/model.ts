import * as Interface from '../interface';
import * as Types from '../types';

/**
 * Класс, представляющий возможности моделирования элементов
 */
class Model implements Interface.Model {
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
    constructor(graph: Interface.ElementGraph) {
        this.generators = graph.getGenerators();
        this.model_table = [];
        const mtc = graph.getAllElementsBFS();
        for (let i = 0; i < mtc.length; i++) {
            this.model_table.push({
                element: mtc[i],
                states: []
            });
        }
        this.time = {
            now: 0,
            freq: 0,
            begin: 0,
            end: 0,
            pattern_end: 0
        };
        this.autoFreq();
    }

    /**
     * Автоматически устанавливает частоту моделирования по частотам генераторов
     */
    autoFreq(): void {
        this.time.freq = this.generators[0].frequency as number;
        for (let i = 0; i < this.generators.length; i++) {
            this.time.freq =
                ((this.generators[i].frequency as number) * this.time.freq) /
                this.gcd(this.generators[i].frequency as number, this.time.freq);
        }
    }

    /**
     * Автоматически устанавливает конец паттерна (наверное с триггерами плохо будет работать)
     */
    autoPatternEnd(): void {
        const periods = this.generators.map(
            (gen: Interface.Element) => 1 / (gen.frequency as number)
        );
        this.time.pattern_end = periods.reduce((acc, num) => (acc * num) / this.gcd(acc, num));
    }

    private gcd = (a: number, b: number): number => {
        return b === 0 ? a : this.gcd(b, a % b);
    };

    /**
     * Определяет состояние системы перед моделированием. Все генераторы равны нулю.
     */
    preModel(): void {
        for (let i = 0; i < this.generators.length; i++) {
            this.setState('0', this.model_table[i], 0);
        }
        for (let i = this.generators.length; i < this.model_table.length; i++) {
            this.setState(
                (this.model_table[i].element.state as Types.SignalArray[])[
                    parseInt(this.getState(this.model_table[i]), 2)
                ].join(''),
                this.model_table[i],
                0
            );
        }
    }

    /**
     * Устанавливает значения элемента
     * @param st значения
     * @param modelStates моделируемый элемент
     * @param time
     */
    private setState(st: string, modelStates: Types.ModelStateArray, time: number): void {
        for (let i = 0; i < st.length; i++) {
            modelStates.element.out_connections[i].state = st[i] as Types.Signal;
        }
        const s = modelStates.states.find((el) => el.time === time);
        if (s) {
            s.state = st;
        } else {
            modelStates.states.push({
                time: time,
                state: st
            });
        }
    }

    /**
     * Собирает значения элемента
     * @param modelStates моделируемый элемент
     * @param time
     * @returns входные состояния элемента
     */
    private getState(modelStates: Types.ModelStateArray): string {
        let ret = '';
        for (
            let j = 0;
            j < (modelStates.element.in_connections as Interface.Connection[]).length;
            j++
        ) {
            ret += (modelStates.element.in_connections as Interface.Connection[])[j]
                .state as string;
        }
        return ret;
    }

    /**
     * Переходит к следующему такту, записывая поведение всех элементов текущего
     */
    modelNext(): void {
        this.time.now++;
        for (let i = 0; i < this.generators.length; i++) {
            if (this.time.now % (this.model_table[i].element.frequency as number) === 0) {
                this.setState(
                    this.model_table[i].states[this.time.now - 1].state === '0' ? '1' : '0',
                    this.model_table[i],
                    0
                );
            } else {
                this.setState(
                    this.model_table[i].states[this.time.now - 1].state,
                    this.model_table[i],
                    0
                );
            }
        }
        for (let i = this.generators.length; i < this.model_table.length; i++) {
            this.setState(
                (this.model_table[i].element.state as Types.SignalArray[])[
                    parseInt(this.getState(this.model_table[i]), 2)
                ].join(''),
                this.model_table[i],
                this.time.now
            );
        }
    }

    /**
     * Моделируем весь паттерн до конца
     */
    modelPattern(): void {
        for (let i = this.time.now; i < this.time.pattern_end; i++) {
            this.modelNext();
        }
    }

    /**
     * Моделируем все до конца
     */
    modelAll(): void {
        for (let i = this.time.now; i < this.time.end; i++) {
            this.modelNext();
        }
    }

    /**
     * Удаляет текущий такт и его состояние модели. Может быть полезно при изменении входов-выходов.
     */
    deleteNowModel(): void {}

    /**
     * Удаляет все моделирование
     */
    deleteModel(): void {}

    /**
     * Удаляет и еще раз выполняет текущий такт
     */
    remodelNow(): void {}

    /**
     * Удаляет все отмоделированное и еще раз выполняет
     */
    remodelAll(): void {}

    /**
     * Находит сигнал выхода по соединению
     * @param out Соединение
     * @returns Массив сигналов для данного соединения
     */
    findOutput(out: Interface.Connection): Types.Signal {
        return 0;
    }

    /**
     * Находит сигнал выхода по соединению с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и сигнал
     */
    findOutputT(out: Interface.Connection): Types.ModelState[] {
        return [];
    }

    /**
     * * Находит все выходные сигналы по элементу
     * @param element Элемент
     * @returns Массив сигналов для данного элемента (текущее)
     */
    findElement(element: Interface.Element): string {
        return '';
    }

    /**
     * * Находит все выходные сигналы по элементу с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и массив сигналов
     */
    findElementT(out: Interface.Element): Types.ModelState[] {
        return [];
    }
}

export {Model};
