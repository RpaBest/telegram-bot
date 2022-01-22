const { 
     Markup
 } = require('telegraf');

function getMainKeyboard() {
    return Markup.keyboard([
        ['Финансовый вопрос', 'Организационный вопрос'],
        ['Документооборот']
    ]).resize();
    
}

function getToMainKeyboard() {
    return Markup.keyboard([
        ['На главную']
    ]).resize();
}

function getDocumentFlow(){
    return Markup.keyboard([
        ['Где сделать патент?', 'Справка по кори'],
        ['На главную']
    ]).resize();
}

function FinancialQuestion() {
    return Markup.keyboard([
        ['Будет ли сегодня зарплата?'],
        ['Я не получил заработную плату (деньги, аванс)'],
        ['Я получил мало денег'],
        ['На главную']
    ]).resize();
}




module.exports.getMainKeyboard = getMainKeyboard
module.exports.getToMainKeyboard = getToMainKeyboard
module.exports.getDocumentFlow = getDocumentFlow
module.exports.FinancialQuestion = FinancialQuestion

// keyboard.getTextFromUser()





// bot.on('text', async (ctx) => {
//     if(!isNaN(ctx.update.message.text)){
//     let a = ctx.update.message.text;
//     a = a.replace(/[^\d]/g, '');

//     module.exports.a = a     
//     const i = require('./functions')    
//     return  ctx.replyWithDocument({
//         source: './img/1.jpg'
//     })
                    
// }})