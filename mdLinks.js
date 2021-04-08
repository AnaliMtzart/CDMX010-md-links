const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const fetch = require("node-fetch");
const marked = require("marked");


//Obtener links en un array
const linksMd = (doc, data) => {
  // console.log(chalk.bgRed( 'Obtener links en un array'));
  let dirmd = path.dirname(__filename);
  // let filemd = path.basename(__filename);
  let arrLinks = [];

  const renderer = new marked.Renderer();
  renderer.link = (href, path, text) => {
    //if (href.charAt(0) !== "#") { //ignora el caracter en el indice 0 = # "si no es igual" sube
      arrLinks.push({
        href: href,
        text: text,
        //file: filemd,
        file: doc,
        path: dirmd,
      });
    //}
  };
  marked(data, { renderer: renderer });

  return arrLinks;
  // console.log(arrLinks);// objeto x link
  // return validateLink(arrLinks);
 // linkStats(arrLinks);
};


//validar el array de objetos de links
const validateLink = (arrLinks) => {
  // console.log(arrLinks); lee correctamente
  // console.log(chalk.bgCyan( 'validar el arreglo de objetos (links)'));
  const promises = arrLinks.map(link => {// esto produce un arreglo de promesas
    return fetch(link)
      .then((response) => {
        if(response.status){
            return {
                href: link.href,
                text: link.text,
                file: link.file,
                path: link.path,
                status: response.status,
                statusText: response.statusText
            };
        } else{
            return {
                href: link.href,
                text: link.text,
                file: link.file,
                path: link.path,
                status: response.status,
                statusText: 'FAIL'
            }
        }
      })
      .catch((err) => {
        // console.log('Este link esta roto: ', err );
        return {
            href: link.href,
            text: link.text,
            file: link.file,
            path: link.path,
            // status: undefined,
            status: 404,
            statusText: 'FAIL'
        }
      });
  });
  
   return Promise.all(promises)// el promise.all recibe como argumento un arreglo de promesas
  //.then(result => console.log(result))// el resultado de cada promesas [{ state: 'OK'}, { state: 'OK'}, { state: 'OK'}, ...]
 
};

//total de links, numero de fallido y numero de ok
const linkStats = (arrObjLinks) => {
  //console.log('Hola!!!'+ arrObjLinks);//lo realiza antesdel validate
  // const arrayLinks = arrObjLinks.length;
  // const totalLinks = `Total: ${arrayLinks}`;
  // console.log(chalk.bgGreen(totalLinks));
 let fails = [];
 let oks = [];
 let total = [];
 let resultLinks = {};
 arrObjLinks.forEach((element) => {
   total.push(element);
   if(element.statusText === 'OK') {
     oks.push(element);
   } else if (element.statusText === 'FAIL'){
     fails.push(element);
   }
 });
  resultLinks = {
    Total: total.length,
    Unique: oks.length,
    Broken: fails.length,
  }
  // console.log(resultLinks);
  return resultLinks;
};


// //leer un archivo md
const readFileMdValidate = (doc) => {
  const data = fs.readFileSync(doc, "utf-8");
  //console.log(chalk.magentaBright(data));
  const links = linksMd(doc, data)
  validateLink(links)
    .then(result => {
      //console.log(result)
      result.map((res) => {   // recorre arreglo de promesas
        if (res.statusText === "OK") {
          console.log(
            `${chalk.yellow(res.file)} ${chalk.blue(res.href)} ${" "} ${chalk.bgBlueBright(res.statusText)} ${chalk.bgBlue(res.status)} ${chalk.bold.blueBright(res.text)}`
          );
        } else {
          console.log(`${chalk.yellow(res.file)} ${chalk.red(res.href)} ${" "} ${chalk.bgRedBright(res.statusText)} ${chalk.bgRed(res.status)} ${chalk.bold.redBright(res.text)}`);
        }
      });
    })
};

// readFileMd("README.md");
const readFileMdStats = (doc) => {
  const data = fs.readFileSync(doc, "utf-8");
  //console.log(chalk.magentaBright(data));
  const links = linksMd(doc, data)
  validateLink(links)
    .then(result => {
      console.log(linkStats(result))
    })
};


module.exports = {
  readFileMdValidate,
  readFileMdStats,
  validateLink,
}