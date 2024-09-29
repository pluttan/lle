import * as Interface from './interface';
import * as Types from './types';
import Connection from './controller/connection';
// ==================================== ConnectionFactory =====================================//
/**
 *
 */
class ConnectionFactory<ConnectionType extends Interface.Connection> {
    private connectionClass: new (outSource: Types.Sources, arg2?: (Types.Sources|Types.SourcesArray)) => ConnectionType;

    /**
     *
     * @param connectionClass
     */
    constructor(connectionClass: new (outSource: Types.Sources, arg2?: (Types.Sources|Types.SourcesArray)) => ConnectionType) {
        this.connectionClass = connectionClass;
    }

    /**
     *
     */
    create(outSource: Types.Sources): ConnectionType;
    /**
     *
     */
    create(outSource: Types.Sources, inSource: Types.Sources): ConnectionType;
    /**
     *
     */
    create(outSource: Types.Sources, inSourceArray: Types.SourcesArray): ConnectionType;

    /**
     *
     * @param outSource
     * @param arg2
     */
    create(outSource: Types.Sources, arg2?: (Types.Sources|Types.SourcesArray)): ConnectionType {
        if (arg2){
            return new this.connectionClass(outSource, arg2);
        }
        return new this.connectionClass(outSource);
    }
}
// ==================================== ConnectionFactory =====================================//
const Factories = {
    Connection: new ConnectionFactory<Connection>(Connection)
};

export default Factories;
