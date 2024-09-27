import * as Interface from '../interface';
import * as Types from '../types';
declare class Connection implements Interface.Connection {
    in: Types.SourcesArray | false;
    readonly out: Types.Sources;
    constructor(outSource: Types.Sources);
    constructor(outSource: Types.Sources, inSource: Types.Sources);
    constructor(outSource: Types.Sources, inSourceArray: Types.SourcesArray);
    inConnect(inSource: Types.Sources): Interface.Connection;
    disConnect(inSource: Types.Sources): Interface.Connection;
    inConnects(inSourceArray: Types.SourcesArray): Interface.Connection;
    disConnects(inSourceArray: Types.SourcesArray): Interface.Connection;
    isConnected(): boolean;
    lenInConnected(): number;
    clone(element: Interface.Element): Interface.Connection;
    getArrayInString(): string[];
    findInString(element: Interface.Element): string;
}
export default Connection;
//# sourceMappingURL=connection.d.ts.map