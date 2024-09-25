test('should correctly import module ldamle', () => {
    const { Element } = require('ldamle');
    let element = new Element();
    expect(typeof element).toBe('object'); 
    expect(element.out_connections).toStrictEqual([]);
    expect(element.in_connections).toStrictEqual([]);
});