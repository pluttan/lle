import * as lle from '../../src/lle';
describe('Check generator element', () => {
    const gen1 = new lle.Generator('g_1', 100);
    test('check constructor', () => {
        expect(gen1.out_connections).toEqual([{ in: false, out: { name: 'g_1', element: gen1 } }]);
    });
    test('check out function without args', () => {
        expect(gen1.out()).toEqual({
            in: false,
            out: {
                name: 'g_1',
                element: gen1
            }
        });
    });
    test('check out function with arg == name out', () => {
        expect(gen1.out('g_1')).toEqual({
            in: false,
            out: {
                name: 'g_1',
                element: gen1
            }
        });
    });
    test('check out function with arg != name out', () => {
        expect(gen1.out('g_2')).toEqual({
            in: false,
            out: {
                name: 'g_2',
                element: gen1
            }
        });
    });
    test('check clone', () => {
        const gen2 = gen1.clone();
        expect(gen2.out_connections).toEqual([{ in: false, out: { name: 'g_2', element: gen2 } }]);
    });
    test('check isAllInConnected => false', () => {
        expect(gen1.isAllInConnected()).toEqual(false);
    });
    test('check isReady => false', () => {
        expect(gen1.isReady()).toEqual(false);
    });
    test('check isAllInConnected => true', () => {
        const elem = new lle.Element(['A'], ['B'], ['1', '0']);
        elem.in('A', gen1.out());
        expect(gen1.isAllInConnected()).toEqual(true);
    });
    test('check isReady => true', () => {
        expect(gen1.isReady()).toEqual(true);
    });
});
