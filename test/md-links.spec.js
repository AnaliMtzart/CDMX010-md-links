const { validateLink } = require ('../mdLinks.js');

const myData = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
      
  }
]

const resultado = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
    status: 200,
    statusText: 'OK'
    // status: 404,
    // statusText: 'FAIL'
  }
]


describe('validateLink', () => {
  it('validateLink debería ser una función', () => {
    expect(typeof validateLink).toBe('function');
  });

  it('deberia retornar un arreglo de objetos que contienen las claves status y statusText', (done) => {
    validateLink(myData)
      .then(expected => {
        expect(resultado).toEqual(expect.arrayContaining(expected));
        done();
      })
  })
});

