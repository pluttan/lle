import * as Interface from '../interface';
import * as Types from '../types';

/**
 * Класс `Connection` позволяет соединять входы и выходы различных элементов.
 * Соединение всегда имеет обязательный выход, а входы могут быть
 * как отсутствовать, так и быть в единственном или множественном числе.
 */
class Connection implements Interface.Connection {
    //--------------------------------- Connection:in --------------------------------//
    /**
     * * Массив подключенных входов или false, если входы отсутствуют
     */
    in: Types.SourcesArray | false;
    //--------------------------------- Connection:in --------------------------------//

    //--------------------------------- Connection:out --------------------------------//
    /**
     * * Выход соединения (только для чтения)
     */
    readonly out: Types.Sources;
    //--------------------------------- Connection:out --------------------------------//

    //--------------------------------- Connection:state --------------------------------//
    /**
     * * Текущий сигнал соединения
     */
    state: Types.Signal;
    //--------------------------------- Connection:state --------------------------------//

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
     * Основной конструктор, который позволяет создать соединение с
     * одним выходом и опциональными входами.
     *
     * Соединение обязательно должно иметь выход, но может не иметь входов
     * либо иметь один или несколько.
     *
     * У соединений есть состояния. Они доступны только если in подключен.
     *
     * @param outSource выход соединения
     * @param arg2 вход (или массив входов) соединения (не обязательно)
     * @param state Текущее состояние элемента
     */
    constructor(
        outSource: Types.Sources,
        arg2?: Types.Sources | Types.SourcesArray,
        state?: Types.Signal
    ) {
        this.in = false;
        this.out = outSource;
        this.state = 'z';
        if (arg2) {
            this.state = 'x';
            if (state) {
                this.state = state;
            }
            if (Array.isArray(arg2)) {
                this.in = arg2;
            } else {
                this.in = [arg2];
            }
        }
    }

    /**
     * Подключает вход другого элемента к текущему соединению.
     * @param inSource вход элемента
     * @returns текущее соединение
     */
    inConnect(inSource: Types.Sources): Interface.Connection {
        if (Array.isArray(this.in)) {
            this.in.push(inSource);
        } else {
            this.in = [inSource];
        }
        return this;
    }

    /**
     * Отключает вход от текущего соединения.
     * @param inSource вход, который нужно отсоединить
     * @returns текущее соединение
     */
    disConnect(inSource: Types.Sources): Interface.Connection {
        if (Array.isArray(this.in)) {
            for (let i = 0; i < this.in.length; i++) {
                if (this.in[i].name === inSource.name && this.in[i].element === inSource.element) {
                    this.in.splice(i, 1);
                    break;
                }
            }
            if (this.in.length === 0) {
                this.in = false;
            }
        }
        return this;
    }

    /**
     * Подключает несколько входов к текущему соединению.
     * @param inSourceArray массив входов
     * @returns текущее соединение
     */
    inConnects(inSourceArray: Types.SourcesArray): Interface.Connection {
        if (Array.isArray(this.in)) {
            this.in.push(...inSourceArray);
        } else {
            this.in = inSourceArray;
        }
        return this;
    }

    /**
     * Отключает несколько входов от текущего соединения.
     * @param inSourceArray массив входов, которые нужно отсоединить
     * @returns текущее соединение
     */
    disConnects(inSourceArray: Types.SourcesArray): Interface.Connection {
        if (Array.isArray(this.in)) {
            for (let i = 0; i < inSourceArray.length; i++) {
                this.disConnect(inSourceArray[i]);
            }
        }
        return this;
    }

    /**
     * Проверяет, подключено ли текущее соединение хотя бы к одному входу.
     * @returns true, если подключен хотя бы один вход
     */
    isConnected(): boolean {
        return Array.isArray(this.in) && this.in.length > 0;
    }

    /**
     * Возвращает количество подключенных входов.
     * @returns количество входов
     */
    lenInConnected(): number {
        return Array.isArray(this.in) ? this.in.length : 0;
    }

    /**
     * Клонирует текущее соединение, создавая новое с такими же входами,
     * но подключенное к другому элементу.
     * @param element элемент, к которому подключен выход нового соединения
     * @returns новое соединение с клонированными входами
     */
    clone(element: Interface.Element): Interface.Connection {
        return new Connection({name: this.out.name, element: element});
    }

    /**
     * Возвращает массив имен входов, подключенных к текущему соединению.
     * @returns массив строк с именами входов
     */
    getArrayInString(): string[] {
        const arr: string[] = [];
        if (Array.isArray(this.in)) {
            for (let i = 0; i < this.in.length; i++) {
                arr.push(this.in[i].name);
            }
        }
        return arr;
    }

    /**
     * Находит вход, который принадлежит указанному элементу.
     * @param element элемент, для которого нужно найти подключенный вход
     * @returns название входа
     */
    findInString(element: Interface.Element): string {
        if (Array.isArray(this.in)) {
            for (let i = 0; i < this.in.length; i++) {
                if (this.in[i].element === element) {
                    return this.in[i].name;
                }
            }
        }
        return '';
    }
}

export {Connection};
