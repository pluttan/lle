import * as lle from '../../src/lle';
import {Factories} from '../../src/factories';
describe('Check factories class', () => {
    test('check new connection with one arg', () => {
        const elem = new lle.Element();
        const conn = Factories.Connection.create({
            name: 'A_4',
            element: elem
        });
        expect(conn.out).toEqual({
            name: 'A_4',
            element: elem
        });
        expect(conn.in).toEqual(false);
    });

    test('check new connection with in as one', () => {
        const elem = new lle.Element();
        const elem2 = new lle.Element();
        const conn = Factories.Connection.create(
            {
                name: 'A_4',
                element: elem
            },
            {
                name: 'B_4',
                element: elem2
            }
        );
        expect(conn.out).toEqual({
            name: 'A_4',
            element: elem
        });
        expect(conn.in).toEqual([
            {
                name: 'B_4',
                element: elem2
            }
        ]);
    });

    test('check new connection with in as array', () => {
        const elem = new lle.Element();
        const elem2 = new lle.Element();
        const elem3 = new lle.Element();
        const conn = Factories.Connection.create(
            {
                name: 'A_4',
                element: elem
            },
            [
                {
                    name: 'B_4',
                    element: elem2
                },
                {
                    name: 'B_3',
                    element: elem3
                }
            ]
        );
        expect(conn.out).toEqual({
            name: 'A_4',
            element: elem
        });
        expect(conn.in).toEqual([
            {
                name: 'B_4',
                element: elem2
            },
            {
                name: 'B_3',
                element: elem3
            }
        ]);
    });
});
