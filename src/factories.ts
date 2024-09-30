import * as Interface from './interface';
import * as Types from './types';
import {Connection} from './controller/connection';
// ==================================== ConnectionFactory =====================================//
/**
 * Класс-шаблон, который предоставляет возможность другим классам создавать объект типа Interface.Connection
 */
class ConnectionFactory<ConnectionType extends Interface.Connection> {
    private connectionClass: new (outSource: Types.Sources, arg2?: (Types.Sources|Types.SourcesArray)) => ConnectionType;

    /**
     * Конструктор фабрики, принимает класс, который необходимо создать
     * @param connectionClass класс который необходимо создать
     */
    constructor(connectionClass: new (outSource: Types.Sources, arg2?: (Types.Sources|Types.SourcesArray)) => ConnectionType) {
        this.connectionClass = connectionClass;
    }

    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.Sources): ConnectionType;
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.Sources, inSource: Types.Sources): ConnectionType;
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.Sources, inSourceArray: Types.SourcesArray): ConnectionType;

    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     * @param outSource
     * @param arg2
     * @returns элемент Connection
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

export {Factories};
