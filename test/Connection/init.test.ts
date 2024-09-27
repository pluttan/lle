describe('Check constructor', () => {
    var lle = require('../../src/lle');

    test('Check constructor with out', () => {
        let connect = new lle.Connection({name:'A', element:new lle.Element()});
        expect(connect.out.name).toEqual('A');
    });

    test('Check constructor with in', () => {
        let connect = new lle.Connection(
            {name:'A', element:new lle.Element()}, 
            {name:'B', element:new lle.Element()}
        );
        console.log(connect);
        expect(connect.out.name).toEqual('A');
        expect(connect.in[0].name).toEqual('B');
    });

    test('Check constructor with Array in', () => {
        let connect = new lle.Connection(
            {name:'A', element:new lle.Element()}, 
            [
                {name:'B', element:new lle.Element()},
                {name:'C', element:new lle.Element()},
                {name:'D', element:new lle.Element()}
            ]
        );
        console.log(connect);
        expect(connect.out.name).toEqual('A');
        expect(connect.in[0].name).toEqual('B');
    });

});