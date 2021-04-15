/* eslint-disable no-undef */
/* eslint-disable linebreak-style */

const { readValidate, readStats, validateLink, linkStats, 
  htmlLinks, readFile, searchMd } = require('../mdLinks.js');

const exampleValidate = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
  },
  {
    href: '#8-pistas-tips-y-lecturas-complementarias',
    text: '8. Pistas, tips y lecturas complementarias',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
  },
];

const resultValidate = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
    status: 200,
    statusText: 'OK',
    // status: 404,
    // statusText: 'FAIL',
  },
  {
    href: '#8-pistas-tips-y-lecturas-complementarias',
    text: '8. Pistas, tips y lecturas complementarias',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
    status: 404,
    statusText: 'FAIL',
  },
];

const exampleFile = [ { file: 'prueba\\prueba.md' } ];

const exampleRoute = 'prueba\\prueba.md';

const resultRead = '[Markdown](https://es.wikipedia.org/wiki/Markdown)';

const exampleRouteS = './prueba';

describe('validateLink', () => {
  it('validateLink debería ser una función', () => {
    expect(typeof validateLink).toBe('function');
  });

  it('deberia retornar un arreglo de objetos que contienen las claves status y statusText', (done) => {
    validateLink(exampleValidate).then((expected) => {
      expect(resultValidate).toEqual(expect.arrayContaining(expected));
      done();
    });
  });
});

describe('linkStats', () => {
  it('linkStats debería ser una función', () => {
    expect(typeof linkStats).toBe('function');
  });

  it('deberia retornar un objeto que contenga total, unique y broken', () => {
    expect(linkStats(resultValidate)).toEqual([ { Total: 2, Ok: 1, Unique: 2, Broken: 1 } ]);
  });
});

describe('htmlLinks', () => {
  it('htmlLinks debería ser una función', () => {
    expect(typeof htmlLinks).toBe('function');
  });

  it('htmlLinks deberia retornar un array con objeto que contenga info del link dentro del doc md', () => {
    expect(htmlLinks(exampleFile)).toEqual([
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'prueba\\prueba.md',
        path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
      },
    ]);
  });
});

describe('readValidate', () => {
  it('readValidate debería ser una función', () => {
    expect(typeof readValidate).toBe('function');
  });
});

describe('readStats', () => {
  it('readFileMdStats debería ser una función', () => {
    expect(typeof readStats).toBe('function');
  });
});

describe('searchMd', () => {
  it('searchMd debería ser una función', () => {
    expect(typeof searchMd).toBe('function');
  });

  it('searchMd deberia retornar un array con un objeto de file', () => {
    expect(searchMd(exampleRouteS)).toEqual(exampleFile);
  });
});

describe('readFile', () => {
  it('readFile debería ser una función', () => {
    expect(typeof readFile).toBe('function');
  });

  it('readFile deberia retornar el contenido del archivo', () => {
    expect(readFile(exampleRoute)).toEqual(resultRead);
  });
});
