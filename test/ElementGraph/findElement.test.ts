describe('Check findElement functions', () => {
    var lle = require('../../src/lle');
    let g1 = new lle.Generator('g1', 1);
    let g2 = new lle.Generator('g2', 2);
    let g3 = new lle.Generator('g3', 3);
    let g4 = new lle.Generator('g4', 4);
    let e1 = new lle.Element('e1', ['A', 'B'], ['A', 'B', 'C'], []);
    let e2 = new lle.Element('e2', ['A', 'B', 'C'], ['A', 'B'], []);
    let e3 = new lle.Element('e3', ['A', 'B'], ['A', 'B'], []);
    let e4 = new lle.Element('e4', ['A', 'B', 'C', 'D'], ['A', 'B', 'C'], []);
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
    let eg = new lle.ElementGraph(e2);

    test('check findElement with generators', () => {
        expect(eg.findElement(g1).element).toEqual(g1);
        expect(eg.findElement(g2).element).toEqual(g2);
        expect(eg.findElement(g3).element).toEqual(g3);
        expect(eg.findElement(g4).element).toEqual(g4);
    });

    test('check findElement with elements', () => {
        expect(eg.findElement(e1).element).toEqual(e1);
        expect(eg.findElement(e2).element).toEqual(e2);
        expect(eg.findElement(e3).element).toEqual(e3);
        expect(eg.findElement(e4).element).toEqual(e4);
    });
});
