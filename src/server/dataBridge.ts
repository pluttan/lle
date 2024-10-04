import * as Types from '../types';
import fs from 'fs';

/**
 * Класс, создающий статичные страницы для фронта
 */
class DataBridge {
    /**
     * Создаем страницу с графом элементов из экспортированного графа
     * [@link Interface.ElementGraph.getDataElementGraph]
     * @param dataGraph экспортированный граф
     * @returns html, который необходимо отобразить
     */
    graphHtml(dataGraph: Types.dataElementGraph): string {
        const data = fs.readFileSync('dataBridge/graph.html', 'utf8');
        // eslint-disable-next-line quotes
        return data.replace("'~~paste tree here~~'", JSON.stringify(dataGraph));
    }
}

export {DataBridge};
