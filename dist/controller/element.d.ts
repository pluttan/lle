import * as Interface from '../interface';
import * as Types from '../types';
declare class Element implements Interface.Element {
    in_connections: (Interface.Connection | string)[];
    out_connections: Interface.Connection[];
    state: Types.SignalArray[];
    constructor();
    constructor(inName: string[], outName: string[], signals: Types.DSSSArray);
    constructor(elementOut: Element, elementIn: Element);
    setParams(inName: string[], outName: string[], signals: Types.DSSSArray): Interface.Element;
    concat(elementOut: Element, elementIn: Element): Interface.Element;
    add(elementOut: Element): Interface.Element;
    in(name: string, connection: Interface.Connection): (Interface.Connection | string);
    in(name: string): (Interface.Connection | string);
    out(name: string): Interface.Connection;
    genState(array: Types.DSSSArray): Types.SignalArray[];
    clone(): Interface.Element;
    isAllInConnected(): boolean;
    isAllSignalNotZ(): boolean;
    isReady(): boolean;
}
export default Element;
//# sourceMappingURL=element.d.ts.map