import * as lle from '../../src/lle';
describe('Clone function test', () => {
    const element1 = new lle.Element(['A_2', 'A_1', 'A_0', 'E_n'], ['F_0', 'F_1', 'F_2', 'F_3', 'F_4', 'F_5', 'F_6', 'F_7'], [
        { name: 'E_n', state: 0, out: '00000000' },
        '10000000',
        '01000000',
        '00100000',
        '00010000',
        '00001000',
        '00000100',
        '00000010',
        '00000001'
    ]);
    test('clone element', () => {
        expect(element1.clone()).toEqual(element1);
    });
    test('clone element with in connections', () => {
        element1.in('A_2', element1.out('F_0'));
        expect(element1.clone().in('A_2')).toEqual('A_2');
    });
});
