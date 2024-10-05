import * as lle from '../../src/lle';
describe('Check getState function', () => {
    const element1 = new lle.Element(['A_1', 'A_0', 'E_n'], ['F_0', 'F_1', 'F_2', 'F_3'], [{ name: 'E_n', state: 0, out: '0000' }]);
    test('check stateSignal notation', () => {
        const elem = element1.clone();
        elem.genState([{ name: 'E_n', state: 0, out: '0000' }]);
        const expectedState = [
            [0, 0, 0, 0],
            ['z', 'z', 'z', 'z'],
            [0, 0, 0, 0],
            ['z', 'z', 'z', 'z'],
            [0, 0, 0, 0],
            ['z', 'z', 'z', 'z'],
            [0, 0, 0, 0],
            ['z', 'z', 'z', 'z']
        ];
        expect(elem.state).toEqual(expectedState);
    });
    test('check stateSignal nested notation', () => {
        const elem = element1.clone();
        elem.genState([
            {
                name: 'E_n',
                state: 0,
                out: { name: 'A_0', state: 1, out: '0001' }
            }
        ]);
        const expectedState = [
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            [0, 0, 0, 1],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            [0, 0, 0, 1],
            ['z', 'z', 'z', 'z']
        ];
        expect(elem.state).toEqual(expectedState);
    });
    test('check stateSignal second nested notation', () => {
        const elem = element1.clone();
        elem.genState([
            {
                name: 'E_n',
                state: 0,
                out: {
                    name: 'A_0',
                    state: 1,
                    out: { name: 'A_1', state: 0, out: '1100' }
                }
            }
        ]);
        const expectedState = [
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            [1, 1, 0, 0],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z']
        ];
        expect(elem.state).toEqual(expectedState);
    });
    test('check stateSignal notation with symv', () => {
        const elem = element1.clone();
        elem.genState([
            {
                name: 'E_n',
                state: 0,
                out: 'zz0x'
            }
        ]);
        const expectedState = [
            ['z', 'z', 0, 'x'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 0, 'x'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 0, 'x'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 0, 'x'],
            ['z', 'z', 'z', 'z']
        ];
        expect(elem.state).toEqual(expectedState);
    });
    test('check detailState notation', () => {
        const elem = element1.clone();
        elem.genState([
            {
                in: '110',
                out: '0000'
            }
        ]);
        const expectedState = [
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z'],
            [0, 0, 0, 0],
            ['z', 'z', 'z', 'z']
        ];
        expect(elem.state).toEqual(expectedState);
    });
    test('check signal notation', () => {
        const elem = element1.clone();
        elem.genState(['0000', '0001', '0000', '0010', '0000', '0100', '0000', '1000']);
        const expectedState = ['0000', '0001', '0000', '0010', '0000', '0100', '0000', '1000'];
        expect(elem.state).toEqual(expectedState);
    });
});
