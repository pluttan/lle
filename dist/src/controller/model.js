/**
 * Класс, представляющий возможности моделирования элементов
 */
class Model {
    /**
     * Конструктор моделирования
     * @param graph сгенерированный граф элементов
     */
    constructor(graph) {
        this.gcd = (a, b) => {
            return b === 0 ? a : this.gcd(b, a % b);
        };
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
    autoFreq() {
        this.time.freq = this.generators[0].frequency;
        for (let i = 0; i < this.generators.length; i++) {
            this.time.freq =
                (this.generators[i].frequency * this.time.freq) /
                    this.gcd(this.generators[i].frequency, this.time.freq);
        }
    }
    /**
     * Автоматически устанавливает конец паттерна (наверное с триггерами плохо будет работать)
     */
    autoPatternEnd() {
        const periods = this.generators.map((gen) => 1 / gen.frequency);
        this.time.pattern_end = periods.reduce((acc, num) => (acc * num) / this.gcd(acc, num));
    }
    /**
     * Определяет состояние системы перед моделированием. Все генераторы равны нулю.
     */
    preModel() {
        for (let i = 0; i < this.generators.length; i++) {
            this.setState('0', this.model_table[i], 0);
        }
        for (let i = this.generators.length; i < this.model_table.length; i++) {
            this.setState(this.model_table[i].element.state[parseInt(this.getState(this.model_table[i]), 2)].join(''), this.model_table[i], 0);
        }
    }
    /**
     * Устанавливает значения элемента
     * @param st значения
     * @param modelStates моделируемый элемент
     * @param time
     */
    setState(st, modelStates, time) {
        for (let i = 0; i < st.length; i++) {
            modelStates.element.out_connections[i].state = st[i];
        }
        const s = modelStates.states.find((el) => el.time === time);
        if (s) {
            s.state = st;
        }
        else {
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
    getState(modelStates) {
        let ret = '';
        for (let j = 0; j < modelStates.element.in_connections.length; j++) {
            ret += modelStates.element.in_connections[j]
                .state;
        }
        return ret;
    }
    /**
     * Переходит к следующему такту, записывая поведение всех элементов текущего
     */
    modelNext() {
        this.time.now++;
        for (let i = 0; i < this.generators.length; i++) {
            if (this.time.now % this.model_table[i].element.frequency === 0) {
                this.setState(this.model_table[i].states[this.time.now - 1].state === '0' ? '1' : '0', this.model_table[i], 0);
            }
            else {
                this.setState(this.model_table[i].states[this.time.now - 1].state, this.model_table[i], 0);
            }
        }
        for (let i = this.generators.length; i < this.model_table.length; i++) {
            this.setState(this.model_table[i].element.state[parseInt(this.getState(this.model_table[i]), 2)].join(''), this.model_table[i], this.time.now);
        }
    }
    /**
     * Моделируем весь паттерн до конца
     */
    modelPattern() {
        for (let i = this.time.now; i < this.time.pattern_end; i++) {
            this.modelNext();
        }
    }
    /**
     * Моделируем все до конца
     */
    modelAll() {
        for (let i = this.time.now; i < this.time.end; i++) {
            this.modelNext();
        }
    }
    /**
     * Удаляет текущий такт и его состояние модели. Может быть полезно при изменении входов-выходов.
     */
    deleteNowModel() { }
    /**
     * Удаляет все моделирование
     */
    deleteModel() { }
    /**
     * Удаляет и еще раз выполняет текущий такт
     */
    remodelNow() { }
    /**
     * Удаляет все отмоделированное и еще раз выполняет
     */
    remodelAll() { }
    /**
     * Находит сигнал выхода по соединению
     * @param out Соединение
     * @returns Массив сигналов для данного соединения
     */
    findOutput(out) {
        return 0;
    }
    /**
     * Находит сигнал выхода по соединению с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и сигнал
     */
    findOutputT(out) {
        return [];
    }
    /**
     * * Находит все выходные сигналы по элементу
     * @param element Элемент
     * @returns Массив сигналов для данного элемента (текущее)
     */
    findElement(element) {
        return '';
    }
    /**
     * * Находит все выходные сигналы по элементу с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и массив сигналов
     */
    findElementT(out) {
        return [];
    }
}
export { Model };
