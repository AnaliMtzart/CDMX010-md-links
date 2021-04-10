const { validateLink, linkStats, linksMd, readFileMdValidate, readFileMdStats, data } = require ('../mdLinks.js');


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
  }
]

const resultValidate = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
    status: 200,
    statusText: 'OK'
    // status: 404,
    // statusText: 'FAIL'
  },
  {
    href: '#8-pistas-tips-y-lecturas-complementarias',
    text: '8. Pistas, tips y lecturas complementarias',
    file: 'README.md',
    path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',
    status: 404,
    statusText: 'FAIL'
  }
]

const exampleDoc = 'README.md';

const exampleText = `## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional)`;



describe('validateLink', () => {
  it('validateLink debería ser una función', () => {
    expect(typeof validateLink).toBe('function');
  });

  it('deberia retornar un arreglo de objetos que contienen las claves status y statusText', (done) => {
    validateLink(exampleValidate)
      .then(expected => {
        expect(resultValidate).toEqual(expect.arrayContaining(expected));
        done();
      })
  })
});


describe('linkStats', () => {
  it('linkStats debería ser una función', () => {
    expect(typeof linkStats).toBe('function');
  });

  it('deberia retornar un objeto que contenga total, unique y broken', () => {
    expect(linkStats(resultValidate)).toEqual({ Total: 2, Unique: 1, Broken: 1 });
  })
});


describe('linksMd', () => {
  it('linksMd debería ser una función', () => {
    expect(typeof linksMd).toBe('function');
  });

  it('deberia retornar un array con objeto que contenga info del link dentro del doc md', () => {
    expect(linksMd(exampleDoc, exampleText)).toEqual([
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'README.md',
        path: 'C:\\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links',  
      }
    ]);
  })
});


describe('readFileMdValidate', () => {
  it('readFileMdValidate debería ser una función', () => {
    expect(typeof readFileMdValidate).toBe('function');
  });
});


describe('readFileMdStats', () => {
  it('readFileMdStats debería ser una función', () => {
    expect(typeof readFileMdStats).toBe('function');
  });
});