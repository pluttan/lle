import * as Interface from '../interface';
import * as Types from '../types';
import Factories from '../factories';

class Element implements Interface.Element {
    name: string;
    in_connections: (Interface.Connection | string)[];
    out_connections: Interface.Connection[];
    state: Types.SignalArray[];

    constructor();
    constructor(name: string);
    constructor(inName: string[], outName: string[], signals: Types.DSSSArray);
    constructor(name: string, inName: string[], outName: string[], signals: Types.DSSSArray);
    constructor(elementOut: Element, elementIn: Element);
    constructor(name: string, elementOut: Element, elementIn: Element);
    constructor(arg1?: any, arg2?: any, arg3?: any, signals?: Types.DSSSArray) {
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
        } else {
            if (arg1 instanceof Element && arg2 instanceof Element) {
                this.concat(arg1, arg2);
            }
            if (arg1 instanceof Array && arg2 instanceof Array && arg3 instanceof Array) {
                this.setParams(arg1, arg2, arg3);
            }
        }
    }

    setParams(inName: string[], outName: string[], signals: Types.DSSSArray): Element {
        for (let i = 0; i < outName.length; i++) {
            this.out_connections.push(
                Factories.Connection.create({name: outName[i], element: this})
            );
        }
        this.in_connections = inName;
        // this.state = this.genState(signals);
        return this;
    }

    concat(elementOut: Element, elementIn: Element): Interface.Element {
        let elementOutn = elementOut.clone();
        let elementInn = elementIn.clone();
        if (elementOutn.out_connections.length < elementInn.in_connections.length) {
            for (let i = 0; i < elementOutn.out_connections.length; i++) {
                elementInn.in(
                    elementInn.in_connections[i] as string,
                    elementOutn.out_connections[i]
                );
            }
            for (let i = 0; i < elementOutn.in_connections.length; i++) {
                this.in_connections.push(elementOutn.in_connections[i] as string);
            }
            for (
                let i = elementOutn.out_connections.length;
                i < elementInn.in_connections.length;
                i++
            ) {
                this.in_connections.push(elementInn.in_connections[i] as string);
            }
            for (let i = 0; i < elementInn.out_connections.length; i++) {
                this.out_connections.push(elementInn.out_connections[i]);
            }
        } else {
            for (let i = 0; i < elementInn.in_connections.length; i++) {
                elementInn.in(
                    elementInn.in_connections[i] as string,
                    elementOutn.out_connections[i]
                );
                // this.out_connections.push(elementIn.out_connections[i]);
            }
            for (let i = 0; i < elementInn.out_connections.length; i++) {
                this.out_connections.push(elementInn.out_connections[i]);
            }
            for (
                let i = elementInn.in_connections.length;
                i < elementOutn.out_connections.length;
                i++
            ) {
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

    add(elementOut: Element): Element {
        if (this.in_connections.length < elementOut.out_connections.length) {
            let len = this.in_connections.length;
            for (let i = 0; i < len; i++) {
                this.in(this.in_connections[i] as string, elementOut.out_connections[i]);
            }
        } else {
            for (let i = 0; i < elementOut.out_connections.length; i++) {
                this.in(this.in_connections[i] as string, elementOut.out_connections[i]);
            }
        }
        return this;
    }

    in(name: string, connection: Interface.Connection): Interface.Connection | string;
    in(name: string): Interface.Connection | string;
    in(name: string, connection?: Interface.Connection): Interface.Connection | string {
        if (connection) {
            connection.inConnect({name: name, element: this});
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
            } else if (
                (this.in_connections[i] as Interface.Connection).findInString(this) === name
            ) {
                return this.in_connections[i];
            }
        }
        return '';
    }

    inIndex(name: string): number {
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                if (this.in_connections[i] === name) {
                    return i;
                }
            } else if (
                (this.in_connections[i] as Interface.Connection).findInString(this) === name
            ) {
                return i;
            }
        }
        return -1;
    }

    out(name: string): Interface.Connection {
        for (let i = 0; i < this.out_connections.length; i++) {
            if (this.out_connections[i].out.name === name) {
                return this.out_connections[i];
            }
        }
        return {} as Interface.Connection;
    }

    genState(array: Types.DSSSArray): Types.SignalArray[] {
        this.state = new Array(2 ** this.in_connections.length).fill(
            new Array(this.out_connections.length).fill('z')
        );
        for (let i = 0; i < array.length; i++) {
            if (
                typeof array[i] === 'object' &&
                'in' in (array[i] as object) &&
                'out' in (array[i] as object)
            ) {
                this.genStateDetailSignal(array[i] as Types.DetailSignal);
            } else if (
                typeof array[i] === 'object' &&
                'name' in (array[i] as object) &&
                'state' in (array[i] as object) &&
                'out' in (array[i] as object)
            ) {
                this.genStateSignal(array[i] as Types.StateSignal);
            } else {
                let eqArray: Types.SignalArray = new Array(this.out_connections.length).fill('z');
                for (let i = 0; i < this.state.length; i++) {
                    if (JSON.stringify(this.state[i]) === JSON.stringify(eqArray)) {
                        this.state[i] = array[i] as Types.SignalArray;
                        break;
                    }
                }
            }
        }
        return [];
    }

    private genStateDetailSignal(state: Types.DetailSignal): void {
        if (Array.isArray(state.in)) {
            state.in = state.in.join('');
        }
        let flag = true;
        for (let i = 0; i < state.in.length; i++) {
            if (state.in[i] === 'x') {
                this.genStateDetailSignal({
                    in: state.in.slice(0, i) + 0 + state.in.slice(i + 1),
                    out: state.out
                });
                this.genStateDetailSignal({
                    in: state.in.slice(0, i) + 1 + state.in.slice(i + 1),
                    out: state.out
                });
                flag = false;
            }
        }
        if (flag) {
            if (typeof state.out === 'string') state.out = this.genStateGenOutFromStr(state.out);
            this.state[parseInt(state.in, 2)] = state.out as Types.SignalArray;
        }
    }

    private genStateSignal(state: Types.StateSignal, arri?: [number, Types.Signal][]): void {
        if (
            typeof state.out === 'object' &&
            'name' in (state.out as object) &&
            'state' in (state.out as object) &&
            'out' in (state.out as object)
        ) {
            if (arri) {
                arri.push([this.inIndex(state.name), state.state]);
                this.genStateSignal(state.out as Types.StateSignal, arri);
            } else {
                this.genStateSignal(state.out as Types.StateSignal, [
                    [this.inIndex(state.name), state.state]
                ]);
            }
            return;
        }
        let ie = new Array(this.in_connections.length).fill('x');

        if (arri) {
            for (let i = 0; i < arri.length; i++) {
                ie[arri[i][0]] = arri[i][1];
            }
        }
        ie[this.inIndex(state.name)] = state.state;
        this.genStateDetailSignal({in: ie, out: state.out as Types.StringSignalArray});
    }

    private genStateGenOutFromStr(outState: string): Types.SignalArray {
        const result: Types.SignalArray = [];
        for (let i = 0; i < outState.length; i++) {
            const char = outState[i]; // Получаем символ по индексу
            const num = parseInt(char, 10); // Пробуем преобразовать в число

            // Если это число, добавляем его в массив, иначе добавляем символ
            if (!isNaN(num)) {
                result.push(num as Types.Signal);
            } else {
                result.push(char as Types.Signal);
            }
        }
        return result;
    }

    clone(): Element {
        let newElement = new Element();
        for (let i = 0; i < this.out_connections.length; i++) {
            newElement.out_connections.push(this.out_connections[i].clone(newElement));
        }
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                newElement.in_connections.push(this.in_connections[i]);
            } else {
                newElement.in_connections.push(
                    (this.in_connections[i] as Interface.Connection).findInString(this)
                );
            }
        }
        newElement.state = [...this.state];
        return newElement;
    }

    isAllInConnected(): boolean {
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                return false;
            }
        }
        return true;
    }

    isAllSignalNotZ(): boolean {
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                if (this.state[i][j] === 'z') {
                    return false;
                }
            }
        }
        return true;
    }

    isReady(): boolean {
        return this.isAllInConnected() && this.isAllSignalNotZ();
    }
}

class Generator implements Interface.Element {
    out_connections: Interface.Connection[];
    frequency: number;
    constructor(frequency: number);
    constructor(name: string, frequency: number);
    constructor(arg1: any, frequency?: number) {
        if (typeof arg1 === 'string' && frequency) {
            this.frequency = frequency;
            this.out_connections = [Factories.Connection.create({name: arg1, element: this})];
        } else {
            this.frequency = arg1;
            this.out_connections = [Factories.Connection.create({name: '', element: this})];
        }
    }

    out(name?: string): Interface.Connection {
        if (name) {
            if (name !== this.out_connections[0].out.name) {
                this.out_connections[0].out.name = name;
            }
        }
        return this.out_connections[0];
    }

    clone(): Generator {
        let ne = new Generator(this.frequency);
        ne.out(this.out().out.name);
        return ne;
    }

    isAllInConnected(): boolean {
        if (this.out_connections[0].in === false) return false;
        else return true;
    }

    isReady(): boolean {
        return this.isAllInConnected() && this.out_connections[0].out.name !== '';
    }
}

export {Element, Generator};
