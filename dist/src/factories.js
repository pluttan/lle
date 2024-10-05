import { Connection } from './controller/connection';
// ==================================== ConnectionFactory =====================================//
/**
 * Класс-шаблон, который предоставляет возможность другим классам создавать объект типа Interface.Connection
 */
class ConnectionFactory {
    /**
     * Конструктор фабрики, принимает класс, который необходимо создать
     * @param connectionClass класс который необходимо создать
     */
    constructor(connectionClass) {
        this.connectionClass = connectionClass;
    }
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     * @param outSource
     * @param arg2
     * @returns элемент Connection
     */
    create(outSource, arg2) {
        if (arg2) {
            return new this.connectionClass(outSource, arg2);
        }
        return new this.connectionClass(outSource);
    }
}
// ==================================== ConnectionFactory =====================================//
const Factories = {
    Connection: new ConnectionFactory(Connection)
};
export { Factories };
