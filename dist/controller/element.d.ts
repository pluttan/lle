import * as Interface from '../interface';
import * as Types from '../types';
declare class Element implements Interface.Element {
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
    setParams(inName: string[], outName: string[], signals: Types.DSSSArray): Element;
    concat(elementOut: Element, elementIn: Element): Interface.Element;
    add(elementOut: Element): Element;
    in(name: string, connection: Interface.Connection): (Interface.Connection | string);
    in(name: string): (Interface.Connection | string);
    inIndex(name: string): number;
    out(name: string): Interface.Connection;
    genState(array: Types.DSSSArray): Types.SignalArray[];
    private genStateDetailSignal;
    private genStateSignal;
    private genStateGenOutFromStr;
    clone(): Element;
    isAllInConnected(): boolean;
    isAllSignalNotZ(): boolean;
    isReady(): boolean;
}
declare class Generator implements Interface.Element {
    out_connections: Interface.Connection[];
    frequency: number;
    constructor(frequency: number);
    constructor(name: string, frequency: number);
    out(name?: string): Interface.Connection;
    clone(): Generator;
    isAllInConnected(): boolean;
    isReady(): boolean;
}
export { Element, Generator };
//# sourceMappingURL=element.d.ts.map