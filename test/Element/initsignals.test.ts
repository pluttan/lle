describe('Element initialization by arrays of strings and signals', () => {
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
    test('in_connections should be set correctly', () => {
        const expectedInConnections = ['A_2', 'A_1', 'A_0', 'E_n'];
        expect(element1.in_connections).toEqual(expectedInConnections);
    });

    test('out_connections should be set correctly', () => {
        const expectedOutConnections = [
            { in: false, out: ['F_0', expect.anything()] },
            { in: false, out: ['F_1', expect.anything()] },
            { in: false, out: ['F_2', expect.anything()] },
            { in: false, out: ['F_3', expect.anything()] },
            { in: false, out: ['F_4', expect.anything()] },
            { in: false, out: ['F_5', expect.anything()] },
            { in: false, out: ['F_6', expect.anything()] },
            { in: false, out: ['F_7', expect.anything()] }
        ];
        expect(element1.out_connections).toEqual(expectedOutConnections);
    });
});