describe('Element initialization by two other elements', () => {
    var lle = require('../../src/lle');
    let element1 = new lle.Element(
        ["A_2", "A_1", "A_0", "E_n"],
        ["F_0", "F_1", "F_2", "F_3", "F_4", "F_5", "F_6", "F_7"],
        [
            { name: "E_n", state: 0, out: "00000000" },
            "10000000",
            "01000000",
            "00100000",
            "00010000",
            "00001000",
            "00000100",
            "00000010",
            "00000001",
        ]
    );
    let element2 = new lle.Element(['A_7', 'A_6', 'A_5', 'A_4', 'A_3', 'A_2', 'A_1', 'A_0', 'E_n'], ['F_2', 'F_1', 'F_0'], [
        { name: 'E_n', state: 0, out: '00000000' },
        { in: '000000011', out: '000' },
        { in: '000000101', out: '001' },
        { in: '000001001', out: '010' },
        { in: '000010001', out: '011' },
        { in: '000100001', out: '100' },
        { in: '001000001', out: '101' },
        { in: '010000001', out: '110' },
        { in: '100000001', out: '111' },
        { name: 'else', state: 'x', out: '' },
    ]);

    let element1c = element1.clone();
    let element2c = element2.clone();
    element1c.in_connections.pop();
    element1c.in_connections.pop();

    let element3 = new lle.Element(element1, element2);
    let element4 = new lle.Element(element2c, element1c);

    test('element3 in_connections should match expected values', () => {
        expect(element3.in_connections).toEqual(['A_2', 'A_1', 'A_0', 'E_n', 'E_n']);
    });

    test('element3 out_connections should match expected values', () => {
        expect(element3.out_connections).toEqual([
            { in: false, out: ['F_2', expect.any(Object)] },
            { in: false, out: ['F_1', expect.any(Object)] },
            { in: false, out: ['F_0', expect.any(Object)] },
        ]);
    });

    test('element4 in_connections should match expected values', () => {
        expect(element4.in_connections).toEqual([
            'A_7', 'A_6', 'A_5', 'A_4', 'A_3', 'A_2', 'A_1', 'A_0', 'E_n'
        ]);
    });

    test('element4 out_connections should match expected values', () => {
        expect(element4.out_connections).toEqual([
            { in: false, out: ['F_0', expect.any(Object)] },
            { in: false, out: ['F_1', expect.any(Object)] },
            { in: false, out: ['F_2', expect.any(Object)] },
            { in: false, out: ['F_3', expect.any(Object)] },
            { in: false, out: ['F_4', expect.any(Object)] },
            { in: false, out: ['F_5', expect.any(Object)] },
            { in: false, out: ['F_6', expect.any(Object)] },
            { in: false, out: ['F_7', expect.any(Object)] },
            { in: false, out: ['F_0', expect.any(Object)] }
        ]);
    });
});
