module.exports = () => {
  // ...
};

// Desde este archivo debes exportar una función (mdLinks).

// const mdLinks = (path, options) => {   
// };

// leer archivo md
const fs = require('fs'); 

/* fs.readFile('README.md', 'utf-8', (error, data) => {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log(data);
  }
});

let path = require ('path');
console.log(path.extname('README.md'));

fs.readdir('./test', (error, data) => {
  if(error){
    onerror(error);
    return;
  }
  console.log(data);
}); */

// leer archivos de un directorio
let readMe = fs.readFileSync('./README.md', {encoding: 'utf-8'}); // path ruta donde se encuentra nuestro archivo
console.log(readMe);

/* console.log('iniciando lectura');
 //listar archivos de un directorio
 let files = fs.readdirSync('.'); //se ejecuta de forma sincrona
 // cualquier codigo que este despues de esa linea va a esperar hasta la
 // lectura del archivo
 console.log('finalizando lectura');
 console.log(files); */

 
 //listar archivos de un directorio
 fs.readdir('.', (error, files) => {//se ejecuta de forma asincrona
  if(error) {
      throw error 
  }
  console.log('finalizando lectura');
  console.log(files);
 }); 
  console.log('iniciando lectura');
 
// path module (root, dir, base, ext, name) 
const path = require ('path');

let pathObj = path.parse(__filename); 
console.log(pathObj); 

/* let paginaInicio = '\Users\\Anali\\Developer\\Laboratoria\\CDMX010-md-links\\README.md';
console.log(path.normalize(paginaInicio));
console.log(path.dirname(paginaInicio));// nombre de directorio
console.log(path.basename(paginaInicio));// nombre de la base
console.log(path.extname(paginaInicio)); // nombre de la extension */

console.log(__dirname);// trayectoria del archivo
console.log(__filename);// con nombre del archivo
