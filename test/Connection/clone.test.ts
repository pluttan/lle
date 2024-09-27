describe('clone function', () => {
    var lle = require('../../src/lle');

    test('should clone the connection with a new element', () => {
        let elem = new lle.Element();
        let connect = new lle.Connection(
            {name: 'A', element: elem}
        );
        let clonedConnection = connect.clone(new lle.Element());
        expect(clonedConnection.out.name).toBe('A');
        expect(clonedConnection.out.element).not.toBe(elem); // Ensure it's a new element
    });
});