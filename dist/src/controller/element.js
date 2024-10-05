import { Factories } from '../factories';
/**
 * Класс Element представляет элемент схемы с входными и выходными соединениями.
 * Он используется для моделирования сигналов и управления связями между элементами.
 */
class Element {
    /**
     * Конструктор класса Element. (см. перегрузки)
     * @param arg1 Может быть строкой (имя), массивом строк (входные имена), либо экземпляром Element (элемент для соединения).
     * @param arg2 Может быть массивом строк (выходные имена) или элементом Element (элемент для соединения).
     * @param arg3 Массив сигналов или экземпляр Element.
     * @param signals Массив сигналов для состояния.
     */
    constructor(arg1, arg2, arg3, signals) {
        this.in_connections = [];
        this.out_connections = [];
        this.state = [];
        this.name = '';
        if (typeof arg1 === 'string') {
            this.name = arg1;
            if (arg2 instanceof Element && arg3 instanceof Element) {
                this.concat(arg2, arg3);
            }
            if (arg2 instanceof Array && arg3 instanceof Array && signals instanceof Array) {
                this.setParams(arg2, arg3, signals);
            }
        }
        else {
            if (arg1 instanceof Element && arg2 instanceof Element) {
                this.concat(arg1, arg2);
            }
            if (arg1 instanceof Array && arg2 instanceof Array && arg3 instanceof Array) {
                this.setParams(arg1, arg2, arg3);
            }
        }
    }
    /**
     * Устанавливает параметры элемента.
     * @param inName Массив входных имен.
     * @param outName Массив выходных имен.
     * @param signals Массив сигналов для состояния.
     * @returns Экземпляр текущего элемента.
     */
    setParams(inName, outName, signals) {
        for (let i = 0; i < outName.length; i++) {
            this.out_connections.push(Factories.Connection.create({ name: outName[i], element: this }));
        }
        this.in_connections = inName;
        this.state = this.genState(signals);
        return this;
    }
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
    concat(elementOut, elementIn) {
        const elementOutn = elementOut.clone();
        const elementInn = elementIn.clone();
        if (elementOutn.out_connections.length < elementInn.in_connections.length) {
            for (let i = 0; i < elementOutn.out_connections.length; i++) {
                elementInn.in(elementInn.in_connections[i], elementOutn.out_connections[i]);
            }
            for (let i = 0; i < elementOutn.in_connections.length; i++) {
                this.in_connections.push(elementOutn.in_connections[i]);
            }
            for (let i = elementOutn.out_connections.length; i < elementInn.in_connections.length; i++) {
                this.in_connections.push(elementInn.in_connections[i]);
            }
            for (let i = 0; i < elementInn.out_connections.length; i++) {
                this.out_connections.push(elementInn.out_connections[i]);
            }
        }
        else {
            for (let i = 0; i < elementInn.in_connections.length; i++) {
                elementInn.in(elementInn.in_connections[i], elementOutn.out_connections[i]);
                // this.out_connections.push(elementIn.out_connections[i]);
            }
            for (let i = 0; i < elementInn.out_connections.length; i++) {
                this.out_connections.push(elementInn.out_connections[i]);
            }
            for (let i = elementInn.in_connections.length; i < elementOutn.out_connections.length; i++) {
                this.out_connections.push(elementOutn.out_connections[i]);
            }
            for (let i = 0; i < elementOutn.in_connections.length; i++) {
                this.in_connections.push(elementOutn.in_connections[i]);
            }
        }
        // for (let i = 0; i < this.in_connections.length; i++) {
        //     if (typeof this.in_connections[i] !== 'string') {
        //         this.in_connections[i] = (this.in_connections[i] as Interface.Connection).clone(this);
        //     }
        // }
        for (let i = 0; i < this.out_connections.length; i++) {
            this.out_connections[i] = this.out_connections[i].clone(this);
        }
        // далее для state тут надо просимулировать
        return this;
    }
    /**
     * Подключает текущий элемент к другому
     * Выходы первого элемента последовательно соединяются со входами второго.
     * Если у первого элемента больше выходов, чем у второго входов, неиспользованные
     * выходы становятся выходами нового элемента. Если у второго элемента
     * больше входов, то неиспользованные входы становятся входами нового элемента.
     * @param elementOut Элемент, чьи выходы соединяются с входами текущего
     * @returns соединенный элемент
     */
    add(elementOut) {
        if (this.in_connections.length < elementOut.out_connections.length) {
            const len = this.in_connections.length;
            for (let i = 0; i < len; i++) {
                this.in(this.in_connections[i], elementOut.out_connections[i]);
            }
        }
        else {
            for (let i = 0; i < elementOut.out_connections.length; i++) {
                this.in(this.in_connections[i], elementOut.out_connections[i]);
            }
        }
        return this;
    }
    /**
     * Добавляет в соединение/просто возвращяет уже добавленное
     * входное соединение элемента. (см. перегрузки)
     * @param name Имя входа.
     * @param connection Объект соединения (необязательный параметр).
     * @returns Объект соединения или строку имени.
     */
    in(name, connection) {
        if (connection) {
            connection.inConnect({ name: name, element: this });
            for (let i = 0; i < this.in_connections.length; i++) {
                if (this.in_connections[i] === name) {
                    this.in_connections[i] = connection;
                    break;
                }
            }
            return connection;
        }
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                if (this.in_connections[i] === name) {
                    return this.in_connections[i];
                }
            }
            else if (this.in_connections[i].findInString(this) === name) {
                return this.in_connections[i];
            }
        }
        return '';
    }
    /**
     * Находит индекс входа по его имени.
     * @param name Имя входа.
     * @returns Индекс входа или -1, если не найдено.
     */
    inIndex(name) {
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                if (this.in_connections[i] === name) {
                    return i;
                }
            }
            else if (this.in_connections[i].findInString(this) === name) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Возвращает выходное соединение по имени.
     * @param name Имя выхода.
     * @returns Объект соединения.
     */
    out(name) {
        for (let i = 0; i < this.out_connections.length; i++) {
            if (this.out_connections[i].out.name === name) {
                return this.out_connections[i];
            }
        }
        return {};
    }
    /**
     * Генерирует состояние на выходах элемента. Про состояния подробнее см. {@link Types.DSSSArray}
     * @param array Массив сигналов.
     * @returns Обновленный массив состояний.
     */
    genState(array) {
        this.state = new Array(Math.pow(2, this.in_connections.length)).fill(new Array(this.out_connections.length).fill('z'));
        for (let i = 0; i < array.length; i++) {
            if (typeof array[i] === 'object' &&
                'in' in array[i] &&
                'out' in array[i]) {
                this.genStateDetailSignal(array[i]);
            }
            else if (typeof array[i] === 'object' &&
                'name' in array[i] &&
                'state' in array[i] &&
                'out' in array[i]) {
                this.genStateSignal(array[i]);
            }
            else {
                this.genSignal(array[i]);
            }
        }
        return this.state;
    }
    /**
     * Дополнительная функция для genState
     * @param state
     */
    genSignal(state) {
        const eqArray = new Array(this.out_connections.length).fill('z');
        for (let i = 0; i < this.state.length; i++) {
            if (JSON.stringify(this.state[i]) === JSON.stringify(eqArray)) {
                this.state[i] = state;
                break;
            }
        }
    }
    /**
     * Дополнительная функция для genState
     * @param state
     */
    genStateDetailSignal(state) {
        if (Array.isArray(state.in)) {
            state.in = state.in.join('');
        }
        const ie = this.getSignalGenerateVariations(state.in);
        if (typeof state.out === 'string') {
            state.out = this.genStateGenOutFromStr(state.out);
        }
        for (let i = 0; i < ie.length; i++) {
            this.state[parseInt(ie[i], 2)] = state.out;
        }
    }
    /**
     * Дополнительная функция для genState
     * @param s
     * @returns
     */
    getSignalGenerateVariations(s) {
        if (!s.includes('x')) {
            return [s]; // Если нет 'x', возвращаем строку как есть
        }
        const variations = [];
        const firstXIndex = s.indexOf('x');
        variations.push(...this.getSignalGenerateVariations(s.slice(0, firstXIndex) + '0' + s.slice(firstXIndex + 1)));
        variations.push(...this.getSignalGenerateVariations(s.slice(0, firstXIndex) + '1' + s.slice(firstXIndex + 1)));
        return variations;
    }
    /**
     * Дополнительная функция для genState
     * @param state
     * @param arri
     */
    genStateSignal(state, arri) {
        if (state.name === 'else') {
            const eqArray = new Array(this.out_connections.length).fill('z');
            for (let i = 0; i < this.state.length; i++) {
                if (JSON.stringify(this.state[i]) === JSON.stringify(eqArray)) {
                    this.state[i] = state.out;
                }
            }
            return;
        }
        if (typeof state.out === 'object' &&
            'name' in state.out &&
            'state' in state.out &&
            'out' in state.out) {
            if (arri) {
                arri.push([this.inIndex(state.name), state.state]);
                this.genStateSignal(state.out, arri);
            }
            else {
                this.genStateSignal(state.out, [
                    [this.inIndex(state.name), state.state]
                ]);
            }
            return;
        }
        const ie = new Array(this.in_connections.length).fill('x');
        if (arri) {
            for (let i = 0; i < arri.length; i++) {
                ie[arri[i][0]] = arri[i][1];
            }
        }
        ie[this.inIndex(state.name)] = state.state;
        this.genStateDetailSignal({ in: ie, out: state.out });
    }
    /**
     * Дополнительная функция для genState
     * @param outState
     * @returns
     */
    genStateGenOutFromStr(outState) {
        const result = [];
        for (let i = 0; i < outState.length; i++) {
            const char = outState[i]; // Получаем символ по индексу
            const num = parseInt(char, 10); // Пробуем преобразовать в число
            // Если это число, добавляем его в массив, иначе добавляем символ
            if (!isNaN(num)) {
                result.push(num);
            }
            else {
                result.push(char);
            }
        }
        return result;
    }
    /**
     * Клонирует текущий элемент.
     * Вместе с элементом клонируются его выходные соединения.
     * Входы отсоединяются.
     *
     * @returns Новый экземпляр элемента с теми же параметрами.
     */
    clone() {
        const newElement = new Element();
        for (let i = 0; i < this.out_connections.length; i++) {
            newElement.out_connections.push(this.out_connections[i].clone(newElement));
        }
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                newElement.in_connections.push(this.in_connections[i]);
            }
            else {
                newElement.in_connections.push(this.in_connections[i].findInString(this));
            }
        }
        newElement.state = [...this.state];
        return newElement;
    }
    /**
     * Проверяет, все ли входы элемента подключены.
     * @returns true, если все входы подключены, иначе false.
     */
    isAllInConnected() {
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                return false;
            }
        }
        return true;
    }
    /**
     * Проверяет, все ли сигналы элемента отличны от 'z'.
     * @returns true, если все сигналы известны, иначе false.
     */
    isAllSignalNotZ() {
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                if (this.state[i][j] === 'z') {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Проверяет, готов ли элемент для моделирования.
     * @returns true, если элемент готов, иначе false.
     */
    isReady() {
        return this.isAllInConnected() && this.isAllSignalNotZ();
    }
}
/**
 * Класс Generator представляет активный элемент цепи,
 * который генерирует сигнал (чередующийся меандр 0 и 1) с заданной частотой.
 * У генератора нет входных соединений, но есть одно выходное,
 * через которое передаётся сигнал.
 */
class Generator {
    /**
     * Основной конструктор, принимающий либо частоту, либо имя и частоту.
     * Если передано имя (строка), оно присваивается выходному соединению, и задаётся частота.
     * Если имя не передано, создаётся выходное соединение с пустым именем.
     *
     * @param arg1 - Имя (строка) выходного соединения или частота (число).
     * @param frequency - Частота переключения сигнала, если передано имя.
     */
    constructor(arg1, frequency) {
        if (typeof arg1 === 'string' && frequency) {
            this.frequency = frequency;
            this.out_connections = [Factories.Connection.create({ name: arg1, element: this })];
        }
        else {
            this.frequency = arg1;
            this.out_connections = [Factories.Connection.create({ name: '', element: this })];
        }
    }
    /**
     * Метод для получения выходного соединения.
     * Если передано имя, обновляет имя выхода, если оно отличается от текущего.
     *
     * @param name - Имя для выходного соединения (необязательно).
     * @returns Возвращает выходное соединение.
     */
    out(name) {
        if (name) {
            if (name !== this.out_connections[0].out.name) {
                this.out_connections[0].out.name = name;
            }
        }
        return this.out_connections[0];
    }
    /**
     * Метод для клонирования текущего генератора.
     * Клонирует частоту и имя выходного соединения.
     *
     * @returns Новый объект Generator с теми же параметрами.
     */
    clone() {
        const ne = new Generator(this.frequency);
        ne.out(this.out().out.name);
        return ne;
    }
    /**
     * Проверяет, подключено ли выходное соединение.
     * Если выходное соединение не подключено (значение `in` равно `false`),
     * возвращает `false`.
     *
     * @returns `true`, если выход подключён, иначе `false`.
     */
    isAllInConnected() {
        if (this.out_connections[0].in === false) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Проверяет, готов ли генератор к работе.
     * Генератор считается готовым, если его выходное соединение подключено и у него есть имя.
     *
     * @returns `true`, если генератор готов к работе, иначе `false`.
     */
    isReady() {
        return this.isAllInConnected() && this.out_connections[0].out.name !== '';
    }
}
export { Element, Generator };
