import * as Interface from './interface';
import * as Types from './types';
import { Connection } from './controller/connection';
/**
 * Класс-шаблон, который предоставляет возможность другим классам создавать объект типа Interface.Connection
 */
declare class ConnectionFactory<ConnectionType extends Interface.Connection> {
    private connectionClass;
    /**
     * Конструктор фабрики, принимает класс, который необходимо создать
     * @param connectionClass класс который необходимо создать
     */
    constructor(connectionClass: new (outSource: Types.Sources, arg2?: (Types.Sources | Types.SourcesArray)) => ConnectionType);
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
}
declare const Factories: {
    Connection: ConnectionFactory<Connection>;
};
export { Factories };
//# sourceMappingURL=factories.d.ts.map