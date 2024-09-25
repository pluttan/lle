import * as Interface from './interface';
import * as Types from './types';
import Connection from './controller/connection';
declare class ConnectionFactory<ConnectionType extends Interface.Connection> {
    private connectionClass;
    constructor(connectionClass: new (outSource: Types.Sources, arg2?: any) => ConnectionType);
    create(outSource: Types.Sources): ConnectionType;
    create(outSource: Types.Sources, inSource: Types.Sources): ConnectionType;
    create(outSource: Types.Sources, inSourceArray: Types.SourcesArray): ConnectionType;
}
declare const Factories: {
    Connection: ConnectionFactory<Connection>;
};
export default Factories;
//# sourceMappingURL=factories.d.ts.map