describe('Check function inConnect', () => {
    var lle = require('../../src/lle');

    test('Check disconnection', () => {
        let elem = new lle.Element();
        let connect = new lle.Connection(
            {name: 'A', element: new lle.Element()},
            {name: 'A', element: elem}
        );
        connect.disConnect({name: 'A', element: elem});
        expect(connect.in).toEqual(false);
    });

    test('Check disconnection array', () => {
        let elem = new lle.Element();
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, [
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
