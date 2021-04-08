const process = require('process')

const {readFileMdValidate ,readFileMdStats} = require('./mdLinks.js')

const path = process.argv[2];
//console.log(hi);
let optionsMd = {}
if(process.argv[3] === 'validate' || process.argv[4] === 'validate'){
    optionsMd.validate = 'validate'
} 
if(process.argv[3] === 'stats' || process.argv[4] === 'stats'){
    optionsMd.stats = 'stats'
}
   
// console.log(optionsMd.validate)
//     console.log(optionsMd.stats);


if(optionsMd.validate === 'validate') {
    readFileMdValidate(path);
}
if(optionsMd.stats === 'stats'){
    readFileMdStats(path);
}

    // switch(optionsMd){
    //     case('validate'):
    //         //console.log(print('Validar los links'));
    //         readFileMd(doc);
    //         break;
    //     case('stats'):
    //         //console.log(print('Generar estadistica'));
    //         linkStats();
    //         break;
    //     default:
    //         console.log('Errrorrrrrrrr');
    // }

