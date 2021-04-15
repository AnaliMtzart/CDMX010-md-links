/* eslint-disable max-len */
/* eslint-disable linebreak-style */

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const fetch = require('node-fetch');
const marked = require('marked'); // libreria js, parsea. Continenes reglas con RegEx

// console.log("Current directory:", __dirname);

// / leer directorio/carpeta
const searchMd = (route) => {
  const mdFiles = [];

  const stat = fs.lstatSync(route); // Valida si es un directorio
  if (stat.isDirectory()) {
    // console.log("Es Directorio");
    const readDirectory = fs.readdirSync(route); // leer el directorio
    // console.log(readDirectory); // muestra los documentos dentro del directorio
    readDirectory.forEach((file) => {
      const filesDirectory = path.join(route, file); // convierte el array en string
      // console.log(filesDirectory);
      const stateContent = fs.lstatSync(filesDirectory);
      if (path.extname(file) === '.md') {
        // valida que sea un md con la extension del archivo
        mdFiles.push({ file: filesDirectory });
      } else if (stateContent.isDirectory()) {
        searchMd(filesDirectory);
      }
    });
    // console.log(mdFiles); // arroja readme
    return mdFiles;
  }
};

const readFile = (route) => {
  const data = fs.readFileSync(route, 'utf-8');
  return data;
};

// Obtener links en un array
const htmlLinks = (files) => {
  // console.log(files)
  // const dirmd = path.dirname(__filename);
  const dirmd = __dirname;
  // console.log(dirmd);
  const arrLinks = [];
  files.forEach((element) => {
    const fileLink = element.file;
    const dir = readFile(fileLink);
    const renderer = new marked.Renderer();
    renderer.link = (href, path, text) => {
      arrLinks.push({
        href,
        text,
        // file: doc,
        file: fileLink,
        path: dirmd,
      });
    };
    marked(dir, { renderer });
  });
  return arrLinks;
};

// validar el array de objetos de links
const validateLink = (arrLinks) => {
  const promises = arrLinks.map((link) => // esto produce un arreglo de promesas
    // eslint-disable-next-line implicit-arrow-linebreak
    fetch(link)
      .then((response) => {
        if (response.status) {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            path: link.path,
            status: response.status,
            statusText: response.statusText,
          };
        }
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          path: link.path,
          status: response.status,
          statusText: "FAIL",
        };
      })
      .catch((err) =>
        // console.log('Este link esta roto: ', err );
        ({
          href: link.href,
          text: link.text,
          file: link.file,
          path: link.path,
          // status: undefined,
          status: 404,
          statusText: "FAIL",
        })
      )
  );

  return Promise.all(promises); // el promise.all recibe como argumento un arreglo de promesas
};

// total de links, numero de fallido y numero de ok
const linkStats = (arrObjLinks) => {
  const fails = [];
  const oks = [];
  let unique;
  const total = [];
  let resultLinks = {};
  arrObjLinks.forEach((element) => {
    total.push(element);
    if (element.statusText === 'OK') {
      oks.push(element);
    } else if (element.statusText === 'FAIL') {
      fails.push(element);
    }
  });
  unique = [...new Set(total)];
  resultLinks = [
    {
      Total: total.length,
      Ok: oks.length,
      Unique: unique.length,
      Broken: fails.length,
    },
  ];
  return resultLinks;
};

const readValidate = (route) => {
  const files = searchMd(route);
  const links = htmlLinks(files);
  validateLink(links).then((result) => {
    // console.log(result);
    result.map((res) => {
      // recorre arreglo de promesas
      if (res.statusText === 'OK') {
        console.log(
          `${chalk.yellow(res.file)} ${chalk.blue(
            res.href
          )} ${" "} ${chalk.bgBlueBright(res.statusText)} ${chalk.bgBlue(
            res.status
          )} ${chalk.bold.blueBright(res.text)}`
        );
      } else {
        console.log(
          `${chalk.yellow(res.file)} ${chalk.red(
            res.href
          )} ${" "} ${chalk.bgRedBright(res.statusText)} ${chalk.bgRed(
            res.status
          )} ${chalk.bold.redBright(res.text)}`
        );
      }
    });
  });
};

// readFileMd("README.md");
const readStats = (route) => {
  const files = searchMd(route);
  const links = htmlLinks(files);
  validateLink(links).then((result) => {
    console.log(linkStats(result));
  });
};

// readValidate("./prueba");
// readStats(".");

module.exports = {
  readValidate,
  readStats,
  validateLink,
  linkStats,
  htmlLinks,
  readFile,
  searchMd,
};
