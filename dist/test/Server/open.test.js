import * as lle from '../../src/lle';
import * as http from 'http';
describe('Check factories class', () => {
    const serv = new lle.Server(3011);
    serv.way('hello', '<h1>Hello!</h1>');
    it('should respond with a 200 status and "Hello, World!"', (done) => {
        const req = http.request({ hostname: 'localhost', port: 3011, path: '/hello', method: 'GET' }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                expect(res.statusCode).toBe(200);
                expect(data).toBe('<h1>Hello!</h1>');
                done();
                serv.close();
            });
        });
        req.on('error', (err) => {
            done(err);
        });
        req.end();
    });
});
