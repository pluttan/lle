describe('Check function inConnect', () => {
    var lle = require('../../src/lle');

    test('Check connection without in', () => {
        let connect = new lle.Connection({name:'A', element:new lle.Element()});
        connect.inConnect({name:"A", element:new lle.Element()});
        expect(connect.in[0].name).toEqual('A');
    });

    test('Check connection with in', () => {
        let connect = new lle.Connection(
            {name:'A', element:new lle.Element()},
            {name:'B', element:new lle.Element()},
        );
        connect.inConnect({name:"A", element:new lle.Element()});
        expect(connect.in[0].name).toEqual('B');
        expect(connect.in[1].name).toEqual('A');
    });
    test('Check connection without in with array', () => {
        let connect = new lle.Connection(
            {name:'A', element:new lle.Element()},
        );
        connect.inConnects([
            {name:"A", element:new lle.Element()},
            {name:"B", element:new lle.Element()},
        ]);
        expect(connect.in[0].name).toEqual('A');
        expect(connect.in[1].name).toEqual('B');
    });

    test('Check connection with in with array', () => {
        let connect = new lle.Connection(
            {name:'A', element:new lle.Element()},
            {name:'B', element:new lle.Element()},
        );
        connect.inConnects([
            {name:"A", element:new lle.Element()},
            {name:"B", element:new lle.Element()},
        ]);
        expect(connect.in[0].name).toEqual('B');
        expect(connect.in[1].name).toEqual('A');
        expect(connect.in[2].name).toEqual('B');
    });
})