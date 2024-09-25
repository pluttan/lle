import * as Interface from '../interface';
import * as Types from '../types';
import Factories from '../factories';

class Element implements Interface.Element {
    in_connections: (Interface.Connection | string)[];
    out_connections: Interface.Connection[];
    state: Types.SignalArray[];

    constructor();
    constructor(inName: string[], outName: string[], signals: Types.DSSSArray);
    constructor(elementOut: Element, elementIn: Element);
    constructor(arg1?: any, arg2?: any, signals?: Types.DSSSArray) {
        this.in_connections = [];
        this.out_connections = [];
        this.state = [];
        if (arg1 instanceof Element && arg2 instanceof Element) {
            this.concat(arg1, arg2);
        }
        if (arg1 instanceof Array && arg2 instanceof Array && signals instanceof Array) {
            this.setParams(arg1, arg2, signals);
        }
    }



    setParams(inName: string[], outName: string[], signals: Types.DSSSArray): Interface.Element {
        for (let i = 0; i < outName.length; i++) {
            this.out_connections.push(Factories.Connection.create([outName[i], this]));
        }
        this.in_connections = inName;
        this.state = this.genState(signals);
        return this;
    }

    concat(elementOut: Element, elementIn: Element): Interface.Element {
        if (elementOut.out_connections.length < elementIn.in_connections.length) { 
            for (let i = 0; i < elementOut.out_connections.length; i++) {
                elementOut.in(elementIn.in_connections[i] as string, elementOut.out_connections[i]);
                this.in_connections.push(elementOut.in_connections[i] as string);
            }
            for (let i = elementOut.out_connections.length; i < elementIn.in_connections.length; i++) {
                this.in_connections.push(elementIn.in_connections[i] as string);
            }
            for (let i = 0; i < elementIn.out_connections.length; i++) {
                this.out_connections.push(elementIn.out_connections[i]);
            }
        } else {
            for (let i = 0; i < elementIn.in_connections.length; i++) {
                elementOut.in(elementIn.in_connections[i] as string, elementOut.out_connections[i]);
                this.out_connections.push(elementIn.out_connections[i]);
            }
            for (let i = elementIn.in_connections.length; i < elementOut.out_connections.length; i++) {
                this.out_connections.push(elementOut.out_connections[i]);
            }
            for (let i = 0; i < elementIn.out_connections.length; i++) {
                this.in_connections.push(elementOut.in_connections[i]);
            }
        }
        // далее для state тут надо просимулировать
        return this;
    }

    add(elementOut: Element): Interface.Element {
        if (this.in_connections.length < elementOut.out_connections.length) { 
            for (let i = 0; i < this.in_connections.length; i++) {
                this.in(this.in_connections[i] as string, elementOut.out_connections[i]);
            }
        } else {
            for (let i = 0; i < elementOut.out_connections.length; i++) {
                this.in(this.in_connections[i] as string, elementOut.out_connections[i]);
            }
        }
        return this;
    }

    in(name: string, connection: Interface.Connection): (Interface.Connection | string);
    in(name: string): (Interface.Connection | string);
    in(name: string, connection?: Interface.Connection): (Interface.Connection | string) {
        if (connection) {
            connection.inConnect([name, this]);
            this.in_connections[this.in_connections.indexOf(name)] = connection;
            return connection;
        }
        return this.in_connections[this.in_connections.indexOf(name)];
    }

    out(name: string): Interface.Connection {
        for (let i = 0; i < this.out_connections.length; i++) {
            if (this.out_connections[i].out[0] === name) {
                return this.out_connections[i];
            }
        }
        return {} as Interface.Connection;
    }

    genState(array: Types.DSSSArray): Types.SignalArray[] {
        for (let i = 0; i < array.length; i++){
            console.log(typeof array[i]);
        }
        return []; 
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

export default Element;
