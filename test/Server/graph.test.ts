import * as lle from '../../src/lle';
import * as http from 'http';
const g1 = new lle.Generator('g1', 1);
const g2 = new lle.Generator('g2', 2);
const g3 = new lle.Generator('g3', 3);
const g4 = new lle.Generator('g4', 4);
const e1 = new lle.Element('e1', ['A', 'B'], ['A', 'B', 'C'], []);
const e2 = new lle.Element('e2', ['A', 'B', 'C'], ['A', 'B'], []);
const e3 = new lle.Element('e3', ['A', 'B'], ['A', 'B'], []);
const e4 = new lle.Element('e4', ['A', 'B', 'C', 'D'], ['A', 'B', 'C'], []);
e1.in('A', g1.out());
e1.in('B', g2.out());
e2.in('A', e1.out('B'));
e2.in('B', e1.out('C'));
e2.in('C', g3.out());
e3.in('A', e2.out('B'));
e3.in('B', g4.out());
e4.in('A', e1.out('A'));
e4.in('B', e2.out('A'));
e4.in('C', e3.out('A'));
e4.in('D', e3.out('B'));
const eg = new lle.ElementGraph(e2);
describe('Check getDataElementGraph', () => {
    const serv = new lle.Server(3012);
    serv.way('graph', lle.dataBridge.graphHtml(eg.getDataElementGraph()));
    // test('123');
    it('should respond with a 200 status and "Hello, World!"', (done) => {
        const req = http.request(
            {hostname: 'localhost', port: 3012, path: '/graph', method: 'GET'},
            (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    expect(res.statusCode).toBe(200);
                    // expect(data).toBe('<h1>Hello!</h1>');
                    done();
                    console.log(data);
                    // serv.close();
                });
            }
        );

        req.on('error', (err) => {
            done(err);
            console.log(1);
        });

        req.end();
    });
    console.log(lle.dataBridge.graphHtml(eg.getDataElementGraph()));
});
new lle.Server(3013).way('graph', lle.dataBridge.graphHtml(eg.getDataElementGraph()));
