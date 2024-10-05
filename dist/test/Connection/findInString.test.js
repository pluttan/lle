import * as lle from '../../src/lle';
describe('InString functions', () => {
    test('should return an empty array when there are no connections', () => {
        const connect = new lle.Connection({ name: 'A', element: new lle.Element() }, []);
        expect(connect.getArrayInString()).toEqual([]);
    });
    test('should return an array of connection names', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection({ name: 'A', element: new lle.Element() }, [
            { name: 'A', element: elem },
            { name: 'B', element: elem }
        ]);
        expect(connect.getArrayInString()).toEqual(['A', 'B']);
    });
    test('should return the name of the matching element', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection({ name: 'A', element: new lle.Element() }, [
            { name: 'A', element: elem }
        ]);
        expect(connect.findInString(elem)).toBe('A');
    });
    test('should return an empty string when no matching element is found', () => {
        const elem = new lle.Element();
        const anotherElem = new lle.Element();
        const connect = new lle.Connection({ name: 'A', element: new lle.Element() }, [
            { name: 'A', element: elem }
        ]);
        expect(connect.findInString(anotherElem)).toBe('');
    });
});
