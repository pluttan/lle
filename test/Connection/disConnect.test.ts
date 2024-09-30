import * as lle from '../../src/lle';
describe('Check function inConnect', () => {
    test('Check disconnection', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element()},
            {name: 'A', element: elem}
        );
        connect.disConnect({name: 'A', element: elem});
        expect(connect.in).toEqual(false);
    });

    test('Check disconnection array', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection({name: 'A', element: new lle.Element()}, [
            {name: 'A', element: elem},
            {name: 'B', element: elem},
            {name: 'C', element: elem}
        ]);
        connect.disConnects([
            {name: 'A', element: elem},
            {name: 'B', element: elem}
        ]);
        expect(connect.in).toEqual([{name: 'C', element: elem}]);
    });
});
