import express from 'express';
/**
 * Класс для открытия сервера для отрисовки и моделирования элементов
 */
class Server {
    /**
     * Открывает сервер на заданном порту
     * @param port порт(по умолчанию 3000)
     * @returns Приложение
     */
    constructor(port) {
        this.app = express();
        this.serv = this.app.listen(port ? port : 3000, () => {
            console.log(`Server is running at http://localhost:${port ? port : 3000}`);
        });
    }
    /**
     * Функция путь, передает по определенному
     * пути html
     * `let serv = (new lle.Server()).way('', body.html);`
     * @param way путь по которому будет передан html
     * @param html сам html
     * @returns сервер
     */
    way(way, html) {
        this.app.get('/' + way, (req, res) => {
            res.send(html);
        });
        return this;
    }
    /**
     * Закрываем сервер
     */
    close() {
        this.serv.close();
    }
}
export { Server };
