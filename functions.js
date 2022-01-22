// bot.on('text', (ctx) => {
//     let a = ctx.update.message.text;
//     a = a.replace(/[^\d]/g, '');                      
//          
//        })

let main = require('./index')

const yes = `Данные приняты, ожидаите ответа(запускается скрипт поиска по бд)`
const no = `Введите корректные данные`
let i = 0;
const a = main.a;

if (a.length == 10){
    i = 1
    module.exports.yes = yes
        
} else {
    i = 2
    module.exports.no = no
    }  

//console.log(typeof(a));

