describe('Check factories class', () => {
    var lle = require('../../src/lle');
    var factories = require('../../src/factories').default;


    test('check new connection with one arg', () => {
        let elem = new lle.Element();
        let conn = factories.Connection.create(
            {
                name: "A_4",
                element: elem
            }
        )
        expect(conn.out).toEqual({
            name: 'A_4',
            element: elem
        });
        expect(conn.in).toEqual(false);
    })

    test('check new connection with in as one', () => {
        let elem = new lle.Element();
        let elem2 = new lle.Element();
        let conn = factories.Connection.create(
            {
                name: "A_4",
                element: elem
            }, {
            name: "B_4",
            element: elem2
        });
        expect(conn.out).toEqual({
            name: 'A_4',
            element: elem
        });
        expect(conn.in).toEqual([{
            name: 'B_4',
            element: elem2
        }]);
    })

    test('check new connection with in as array', () => {
        let elem = new lle.Element();
        let elem2 = new lle.Element();
        let elem3 = new lle.Element();
        let conn = factories.Connection.create(
            {
                name: "A_4",
                element: elem
            }, [
            {
                name: "B_4",
                element: elem2
            },
            {
                name: "B_3",
                element: elem3
            }
        ]);
        expect(conn.out).toEqual({
            name: 'A_4',
            element: elem
        });
        expect(conn.in).toEqual([{
            name: 'B_4',
            element: elem2
        },
        {
            name: "B_3",
            element: elem3
        }]);
    })
})