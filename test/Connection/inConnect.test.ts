import * as lle from '../../src/lle';
import * as Types from '../../src/types';
describe('Check function inConnect', () => {
    test('Check connection without in', () => {
        const connect = new lle.Connection({
            name: 'A',
            element: new lle.Element()
        });
        connect.inConnect({name: 'A', element: new lle.Element()});
        expect((connect.in as Types.SourcesArray)[0].name).toEqual('A');
    });

    test('Check connection with in', () => {
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element()},
            {name: 'B', element: new lle.Element()}
        );
        connect.inConnect({name: 'A', element: new lle.Element()});
        expect((connect.in as Types.SourcesArray)[0].name).toEqual('B');
        expect((connect.in as Types.SourcesArray)[1].name).toEqual('A');
    });
    test('Check connection without in with array', () => {
        const connect = new lle.Connection({
            name: 'A',
            element: new lle.Element()
        });
        connect.inConnects([
            {name: 'A', element: new lle.Element()},
            {name: 'B', element: new lle.Element()}
        ]);
        expect((connect.in as Types.SourcesArray)[0].name).toEqual('A');
        expect((connect.in as Types.SourcesArray)[1].name).toEqual('B');
    });

    test('Check connection with in with array', () => {
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element()},
            {name: 'B', element: new lle.Element()}
        );
        connect.inConnects([
            {name: 'A', element: new lle.Element()},
            {name: 'B', element: new lle.Element()}
        ]);
        expect((connect.in as Types.SourcesArray)[0].name).toEqual('B');
        expect((connect.in as Types.SourcesArray)[1].name).toEqual('A');
        expect((connect.in as Types.SourcesArray)[2].name).toEqual('B');
    });
});
