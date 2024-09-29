describe('InString functions', () => {
    var lle = require('../../src/lle');

    test('should return an empty array when there are no connections', () => {
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, []);
        expect(connect.getArrayInString()).toEqual([]);
    });

    test('should return an array of connection names', () => {
        let elem = new lle.Element();
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, [
            {name: 'A', element: elem},
            {name: 'B', element: elem}
        ]);
        expect(connect.getArrayInString()).toEqual(['A', 'B']);
    });

    test('should return the name of the matching element', () => {
        let elem = new lle.Element();
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, [
            {name: 'A', element: elem}
        ]);
        expect(connect.findInString(elem)).toBe('A');
    });

    test('should return an empty string when no matching element is found', () => {
        let elem = new lle.Element();
        let anotherElem = new lle.Element();
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, [
            {name: 'A', element: elem}
        ]);
        expect(connect.findInString(anotherElem)).toBe('');
    });
});
