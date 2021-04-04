const fs = require("fs");
const chalk = require("chalk");
//const path = require('path');
const fetch = require("node-fetch");

//Obtener links en un array
const linksMd = (data) => {
  //return new Promise((resolve) => {
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regEx = new RegExp(expression);
  const links = data.match(regEx);//match()	Devuelve un arreglo que contiene todas las coincidencias, incluidos los grupos de captura, o null si no se encuentra ninguna coincidencia.

  for (let x = 0; x < links.length; x++) {
    links[x] = links[x].replace(/[(),"]+/g, "");
  }
  console.log(links);
  //resolve(links);
  //})
  const promises = links.map((link) => validateLink(link)); // esto produce un arreglo de promesas
  linksAndStatus(promises);
  LinkStats(promises);
};

// impimir link y status
const linksAndStatus = (promises) => {
  Promise.all(promises) // el promise.all recibe como argumento un arreglo de promesas
    //.then(result => console.log(result)); // el resultado de cada promesas [{ state: 'OK'}, { state: 'OK'}, { state: 'OK'}, ...]
    .then((result) => {// recorre arreglo de promesas
        result.map((res) => {
        if (res.status === "OK") {
          console.log(`${chalk.blue(res.href)} ${" "} ${chalk.bgBlue(res.status)}`);
        } else {
          console.log(`${chalk.red(res.href)} ${" "} ${chalk.bgRed(res.status)}`);
        }
      }) 
    });
}

//total de links, numero de fallido y numero de ok
const LinkStats = (promises) => {
  // eslint-disable-next-line no-undef
  Promise.all(promises)
  .then((result) => {
    const totalLinks = result.length;//links totales
    let counterOk = 0;
    let counterFail = 0;
    result.map((res) => {
      if (res.status === "OK") {
        counterOk++;
      } else {
        counterFail++;
      }
    });
    console.log(`${chalk.bgCyan('Total: ')}${chalk.cyan(totalLinks)}`);
    console.log(`${chalk.bgCyan('OK: ')}${chalk.cyan(counterOk)}`);
    console.log(`${chalk.bgCyan('FAIL: ')}${chalk.cyan(counterFail)}`);
  });
};


//status links
const validateLink = (url) =>
  fetch(url)
    .then((response) => {
      return { href: url, status: response.ok ? "OK" : "FAIL" };
    })
    .catch((err) => {
      // console.log('Este link esta roto: ', err );
      return { href: url, status: "FAIL" };
    });

//leer un archivo md funciona
const readFileMd = (doc) => {
  const data = fs.readFileSync(doc, "utf-8");
  console.log(chalk.magentaBright(data));
  linksMd(data);
};
readFileMd("README.md");
